"""
GPU-accelerated TTS pre-generation using ai4bharat/indic-parler-tts.
Generates grandmotherly-voice audio for stories → merges → 128kbps MP3 → Cloudinary.

Usage:
  python scripts/pregen-tts-gpu.py --start 0 --count 15
  python scripts/pregen-tts-gpu.py --start 15 --count 15 --lang Telugu

Designed for Google Colab / Kaggle free GPU tiers.
"""

import argparse
import hashlib
import io
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

import cloudinary
import cloudinary.api
import cloudinary.uploader
import requests
import torch
from nltk import sent_tokenize
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer

# ── Config ──────────────────────────────────────────────
LANG_DESCRIPTION = (
    "An elderly Indian grandmother speaks with a warm, gentle voice "
    "in a quiet room, at a slow pace with affectionate intonation, "
    "clear audio with no background noise."
)

THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"]
CHUNK_MAX_WORDS = 25
SAMPLE_RATE = 24000
FFMPEG_TIMEOUT = 120_000  # ms

SCRIPT_DIR = Path(__file__).parent.resolve()
REPO_RAW = "https://raw.githubusercontent.com/AvengerChaitu/kahaniyaan/main"

# ── Helpers ─────────────────────────────────────────────


def md5_hash(text: str, lang: str = "Telugu") -> str:
    return hashlib.md5(f"{lang}:{text}".encode()).hexdigest()


def cloudinary_public_id(body: str, lang: str = "Telugu") -> str:
    return f"tts/{lang}/{md5_hash(body, lang)}"


def cloudinary_url(body: str, lang: str = "Telugu") -> str:
    return (
        f"https://res.cloudinary.com/{os.environ['CLOUDINARY_CLOUD_NAME']}"
        f"/raw/upload/{cloudinary_public_id(body, lang)}.mp3"
    )


def story_exists(body: str, lang: str = "Telugu") -> bool:
    """Check if this story's audio is already uploaded to Cloudinary."""
    pid = cloudinary_public_id(body, lang)
    try:
        cloudinary.api.resource(pid, resource_type="raw")
        return True
    except cloudinary.exceptions.NotFound:
        return False
    except Exception as e:
        print(f"  ⚠ Cloudinary check error: {e}")
        return False


def split_chunks(text: str) -> list[str]:
    """Split story body into chunks of ~CHUNK_MAX_WORDS words, sentence-aware."""
    sentences = re.split(r"(?<=[.!?।])\s+", text.strip())
    sentences = [s.strip() for s in sentences if s.strip()]
    chunks = []
    for sent in sentences:
        words = sent.split()
        if len(words) <= CHUNK_MAX_WORDS:
            chunks.append(sent)
        else:
            for i in range(0, len(words), CHUNK_MAX_WORDS):
                chunks.append(" ".join(words[i : i + CHUNK_MAX_WORDS]))
    return chunks


def merge_wav_to_mp3(wav_paths: list[str], output_path: str, ffmpeg_path: str = "ffmpeg"):
    """Concatenate WAV files and convert to 128kbps mono MP3."""
    with tempfile.TemporaryDirectory() as tmpdir:
        list_file = os.path.join(tmpdir, "concat.txt")
        with open(list_file, "w", encoding="utf-8") as f:
            for p in wav_paths:
                f.write(f"file '{p.replace(os.sep, '/')}'\n")
        cmd = [
            ffmpeg_path,
            "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", list_file,
            "-c:a", "libmp3lame",
            "-b:a", "128k",
            "-ar", str(SAMPLE_RATE),
            "-ac", "1",
            output_path,
        ]
        subprocess.run(cmd, check=True, capture_output=True, timeout=FFMPEG_TIMEOUT / 1000)


def upload_to_cloudinary(mp3_path: str, public_id: str) -> str:
    """Upload MP3 to Cloudinary as raw resource."""
    result = cloudinary.uploader.upload(mp3_path, public_id=public_id, resource_type="raw")
    return result["secure_url"]


def download_story_file(theme: str, lang: str = "Telugu") -> list[dict]:
    """Download story JSON from GitHub raw."""
    url = f"{REPO_RAW}/scripts/stories/{lang.lower()}/{theme}.json"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.json()


def load_stories(lang: str = "Telugu") -> list[dict]:
    """Load all stories for a language."""
    all_stories = []
    for theme in THEMES:
        try:
            stories = download_story_file(theme, lang)
            for s in stories:
                s["theme"] = theme
            all_stories.extend(stories)
            print(f"  ✓ {theme}: {len(stories)} stories")
        except Exception as e:
            print(f"  ✗ {theme}: failed to load — {e}")
    return all_stories


def load_checkpoint(checkpoint_path: str) -> dict:
    if os.path.exists(checkpoint_path):
        with open(checkpoint_path, "r") as f:
            return json.load(f)
    return {"completed": [], "results": []}


def save_checkpoint(checkpoint_path: str, data: dict):
    os.makedirs(os.path.dirname(checkpoint_path) or ".", exist_ok=True)
    with open(checkpoint_path, "w") as f:
        json.dump(data, f, indent=2)


# ── Model ───────────────────────────────────────────────


def load_model(device: str = "cuda"):
    """Load the indic-parler-tts model on the specified device."""
    print(f"\nLoading model on {device.upper()}...")
    t0 = time.time()

    torch_dtype = torch.float16 if device == "cuda" else torch.float32

    model = ParlerTTSForConditionalGeneration.from_pretrained(
        "ai4bharat/indic-parler-tts",
        attn_implementation="eager",
        torch_dtype=torch_dtype,
    ).to(device)

    tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts")
    description_tokenizer = AutoTokenizer.from_pretrained(
        model.config.text_encoder._name_or_path
    )

    print(f"  Model loaded in {time.time() - t0:.1f}s")
    return model, tokenizer, description_tokenizer


@torch.no_grad()
def generate_chunk(model, description_tokenizer, tokenizer, description, text, device):
    """Generate audio for one text chunk using the grandmotherly description."""
    description_inputs = description_tokenizer(description, return_tensors="pt").to(device)
    prompt_inputs = tokenizer(text, return_tensors="pt").to(device)

    generation = model.generate(
        input_ids=description_inputs.input_ids,
        attention_mask=description_inputs.attention_mask,
        prompt_input_ids=prompt_inputs.input_ids,
        prompt_attention_mask=prompt_inputs.attention_mask,
        do_sample=True,
        return_dict_in_generate=True,
    )

    audio_seq = generation.sequences[0, : generation.audios_length[0]]
    audio_np = audio_seq.to(torch.float32).cpu().numpy().squeeze()
    if audio_np.ndim > 1:
        audio_np = audio_np.flatten()
    return audio_np


# ── Story Processing ────────────────────────────────────


def process_story(
    story: dict,
    model,
    description_tokenizer,
    tokenizer,
    description: str,
    lang: str,
    device: str,
    ffmpeg_path: str,
) -> str | None:
    """Generate TTS for one story and upload to Cloudinary. Returns URL or None."""
    title = story.get("title", "?")[:50]
    body = story["body"]

    # Check if already on Cloudinary
    if story_exists(body, lang):
        url = cloudinary_url(body, lang)
        print(f"  ✓ Cached — {title}")
        return url

    print(f"  Generating — {title}")

    chunks = split_chunks(body)
    print(f"    → {len(chunks)} chunks")

    wav_paths = []
    tmpdir = None

    try:
        tmpdir = tempfile.mkdtemp(prefix="pregen-tts-")

        for i, chunk_text in enumerate(chunks):
            out_path = os.path.join(tmpdir, f"chunk-{i:03d}.wav")

            print(f"    Chunk {i + 1}/{len(chunks)}... ", end="", flush=True)
            t0 = time.time()

            audio_np = generate_chunk(
                model, description_tokenizer, tokenizer,
                description, chunk_text, device,
            )

            import soundfile as sf
            sf.write(out_path, audio_np, SAMPLE_RATE, format="WAV")
            elapsed = time.time() - t0

            file_size = os.path.getsize(out_path)
            print(f"{file_size // 1024}KB ({elapsed:.0f}s)")
            wav_paths.append(out_path)

            # Clear GPU cache between chunks
            if device == "cuda":
                torch.cuda.empty_cache()

        # Merge → MP3
        mp3_path = os.path.join(tmpdir, "merged.mp3")
        print(f"    Merging {len(wav_paths)} chunks → 128kbps MP3...")
        merge_wav_to_mp3(wav_paths, mp3_path, ffmpeg_path)

        # Upload to Cloudinary
        pid = cloudinary_public_id(body, lang)
        print(f"    Uploading to Cloudinary...")
        url = upload_to_cloudinary(mp3_path, pid)
        mp3_size = os.path.getsize(mp3_path)
        print(f"    ✓ Done — {mp3_size // 1024 // 1024}.{mp3_size // 1024 % 1024:03d}MB")
        return url

    except Exception as e:
        print(f"    ✗ Error: {e}")
        return None

    finally:
        # Cleanup temp files
        if tmpdir and os.path.exists(tmpdir):
            import shutil
            shutil.rmtree(tmpdir, ignore_errors=True)


# ── Main ────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="GPU TTS pre-generation → Cloudinary")
    parser.add_argument("--start", type=int, default=0, help="Starting story index (0-based)")
    parser.add_argument("--count", type=int, default=15, help="Number of stories to process")
    parser.add_argument("--lang", default="Telugu", help="Language code (default: Telugu)")
    parser.add_argument(
        "--device", default="cuda",
        help="Device: cuda or cpu (default: cuda)"
    )
    parser.add_argument(
        "--ffmpeg", default="ffmpeg",
        help="ffmpeg path (default: ffmpeg)"
    )
    parser.add_argument(
        "--checkpoint-dir", default=str(SCRIPT_DIR),
        help="Directory for checkpoint file"
    )
    parser.add_argument(
        "--checkpoint", default=None,
        help="Specific checkpoint file path (overrides --checkpoint-dir)"
    )
    parser.add_argument(
        "--stories-dir", default=None,
        help="Local directory with story JSONs (skips GitHub download)"
    )
    args = parser.parse_args()

    # Validate device
    if args.device == "cuda" and not torch.cuda.is_available():
        print("⚠ CUDA not available, falling back to CPU")
        args.device = "cpu"

    device = args.device
    lang = args.lang
    description = LANG_DESCRIPTION
    ffmpeg_path = args.ffmpeg

    print("=" * 60)
    print("  TTS Pre-generation (GPU)")
    print("=" * 60)
    print(f"  Language:    {lang}")
    print(f"  Stories:     #{args.start} – #{args.start + args.count - 1}")
    print(f"  Device:      {device.upper()}")
    print(f"  Description: {description[:60]}...")
    print()

    # Cloudinary config
    cloudinary.config(
        cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
        api_key=os.environ.get("CLOUDINARY_API_KEY"),
        api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    )

    # Load stories
    if args.stories_dir:
        stories_dir = Path(args.stories_dir)
        all_stories = []
        for theme in THEMES:
            fp = stories_dir / f"{theme}.json"
            if fp.exists():
                stories = json.loads(fp.read_text(encoding="utf-8"))
                for s in stories:
                    s["theme"] = theme
                all_stories.extend(stories)
                print(f"  ✓ {theme}: loaded from {fp}")
            else:
                print(f"  ✗ {theme}: not found at {fp}")
    else:
        print("Downloading story files from GitHub...")
        all_stories = load_stories(lang)

    if not all_stories:
        print("✗ No stories loaded. Exiting.")
        sys.exit(1)

    print(f"\nLoaded {len(all_stories)} stories total")

    # Determine batch
    start = args.start
    end = min(start + args.count, len(all_stories))
    batch = all_stories[start:end]

    if not batch:
        print(f"✗ No stories in range {start}–{end}")
        sys.exit(1)

    print(f"\nBatch: stories #{start + 1}–{end} of {len(all_stories)} ({len(batch)} stories)\n")

    # Load model
    model, tokenizer, description_tokenizer = load_model(device)
    # Warm up by generating for the description alone? Not needed, first chunk warms up.

    # Checkpoint
    cp_path = args.checkpoint or os.path.join(args.checkpoint_dir, ".pregen-gpu-checkpoint.json")
    cp = load_checkpoint(cp_path)
    completed_ids = set(cp.get("completed", []))

    # Process each story
    results = []
    for i, story in enumerate(batch):
        global_idx = start + i

        # Skip if already in checkpoint
        story_key = f"{lang}:{story['theme']}:{story.get('title', '')}"
        if story_key in completed_ids:
            print(f"  [{global_idx + 1}/{len(all_stories)}] ⏭ Skipped (checkpoint) — {story['title'][:40]}")
            continue

        print(f"\n  [{global_idx + 1}/{len(all_stories)}] ", end="")
        url = process_story(
            story, model, description_tokenizer, tokenizer,
            description, lang, device, ffmpeg_path,
        )

        if url:
            results.append({"index": global_idx, "url": url, "status": "generated"})
            completed_ids.add(story_key)
        else:
            results.append({"index": global_idx, "url": None, "status": "failed"})

        # Save checkpoint after each story
        cp = {
            "completed": list(completed_ids),
            "results": results,
            "start": args.start,
            "count": args.count,
            "batch_start": start,
            "batch_end": end,
            "lang": lang,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
        save_checkpoint(cp_path, cp)

    # Summary
    generated = sum(1 for r in results if r["status"] == "generated")
    failed = sum(1 for r in results if r["status"] == "failed")
    print(f"\n{'=' * 60}")
    print(f"  Batch complete: {len(results)} processed, {generated} generated, {failed} failed")
    print(f"  Checkpoint saved to: {cp_path}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
