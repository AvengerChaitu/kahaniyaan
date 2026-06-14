# ============================================================
# KAHANIYAAN — TTS Pre-generation Script
# Run this on Google Colab or Kaggle (one language per account)
#
# SETUP:
#   Colab:  Runtime → Change runtime type → T4 GPU
#   Kaggle: Settings → Accelerator → GPU P100
#           Settings → Internet → ON  (required!)
#
# USAGE:
#   1. Change LANGUAGE below to your assigned language
#   2. Fill in your API keys (Supabase + Cloudinary)
#   3. Runtime → Run all
#   4. Takes ~20-30 min per language
#
# ACCOUNTS SPLIT:
#   Colab  Account 1  →  LANGUAGE = "English"
#   Colab  Account 2  →  LANGUAGE = "Hindi"
#   Kaggle Account 1  →  LANGUAGE = "Tamil"
#   Kaggle Account 2  →  LANGUAGE = "Telugu"
# ============================================================

# ── CELL 1: CONFIG ──────────────────────────────────────────
LANGUAGE = "Telugu"   # ← CHANGE THIS per account

SUPABASE_URL         = "YOUR_SUPABASE_URL"          # e.g. https://xxxx.supabase.co
SUPABASE_SERVICE_KEY = "YOUR_SUPABASE_SERVICE_KEY"  # Settings → API → service_role key

CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"

HF_TOKEN = ""  # Optional — leave blank, model is public

# ── CELL 2: INSTALL ─────────────────────────────────────────
import subprocess, sys

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

install("supabase")
install("cloudinary")
install("soundfile")
install("nltk")
install("pydub")
install("git+https://github.com/huggingface/parler-tts.git")
# transformers + torch already on Colab/Kaggle

print("✓ Packages installed")

# ── CELL 3: IMPORTS & CLOUDINARY SETUP ──────────────────────
import io, hashlib, re, time, torch, numpy as np, soundfile as sf, nltk
from transformers import AutoTokenizer
from parler_tts import ParlerTTSForConditionalGeneration
import cloudinary, cloudinary.uploader, cloudinary.api
from supabase import create_client

nltk.download("punkt_tab", quiet=True)
nltk.download("punkt", quiet=True)

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
)

sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
print("✓ Cloudinary + Supabase connected")

# ── CELL 4: LOAD MODEL ──────────────────────────────────────
device = "cuda" if torch.cuda.is_available() else "cpu"
dtype  = torch.float16 if device == "cuda" else torch.float32
print(f"Device: {device}  |  dtype: {dtype}")

print("Loading ai4bharat/indic-parler-tts  (first time ~3 min)...")
model = ParlerTTSForConditionalGeneration.from_pretrained(
    "ai4bharat/indic-parler-tts",
    token=HF_TOKEN or None,
    attn_implementation="eager",
    torch_dtype=dtype,
).to(device)

tokenizer      = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts", token=HF_TOKEN or None)
desc_tokenizer = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path, token=HF_TOKEN or None)
SAMPLE_RATE    = model.config.sampling_rate

print(f"✓ Model loaded  |  sample_rate={SAMPLE_RATE}")

# ── CELL 5: HELPERS ─────────────────────────────────────────
TERM_MAP = {
    "Hindi":     "बेटा",
    "Telugu":    "బాబు",
    "Tamil":     "கண்ணு",
    "Kannada":   "ಮುದ್ದು",
    "Malayalam": "കുഞ്ഞേ",
    "Marathi":   "बाळ",
    "Bengali":   "সোনা",
    "Gujarati":  "બેટા",
    "Punjabi":   "ਪੁੱਤ",
    "English":   "sweetie",
}

DESCRIPTION = (
    "A warm-voiced elderly woman narrates a children's bedtime story. "
    "Her tone is soft, melodic and deeply soothing, like a loving grandmother "
    "sitting beside a lamp at night. She speaks slowly and clearly, "
    "pausing gently between sentences so children can follow every word. "
    "Her voice carries quiet joy and tenderness. "
    "The recording is intimate and close, with no background noise."
)

def tts_public_id(body: str, language: str) -> str:
    """Must match computeTtsUrl() in app/api/generate-story/route.ts"""
    h = hashlib.md5(f"{language}:{body}".encode()).hexdigest()
    return f"tts/{language}/{h}.mp3"

def already_uploaded(public_id: str) -> bool:
    try:
        cloudinary.api.resource(public_id, resource_type="raw")
        return True
    except Exception:
        return False

def split_chunks(text: str, max_words: int = 25):
    """Mirrors the chunking logic in tts-space/app.py"""
    sentences = nltk.sent_tokenize(text)
    chunks, current = [], ""
    for s in sentences:
        candidate = (current + " " + s).strip()
        if len(candidate.split()) >= max_words:
            if current:
                chunks.append(current)
            current = s
        else:
            current = candidate
    if current:
        chunks.append(current)
    return chunks or [text]

@torch.inference_mode()
def generate_audio(text: str) -> np.ndarray:
    desc_in = desc_tokenizer(DESCRIPTION, return_tensors="pt").to(device)
    parts   = []

    for chunk in split_chunks(text):
        prompt_in = tokenizer(chunk, return_tensors="pt").to(device)
        gen = model.generate(
            input_ids=desc_in.input_ids,
            attention_mask=desc_in.attention_mask,
            prompt_input_ids=prompt_in.input_ids,
            prompt_attention_mask=prompt_in.attention_mask,
            do_sample=True,
            return_dict_in_generate=True,
        )
        audio = gen.sequences[0, : gen.audios_length[0]]
        parts.append(audio.float().cpu().numpy().squeeze())

    return np.concatenate(parts) if parts else np.zeros(100)

def upload_audio(audio_np: np.ndarray, public_id: str) -> str:
    from pydub import AudioSegment
    wav_buf = io.BytesIO()
    sf.write(wav_buf, audio_np, SAMPLE_RATE, format="WAV")
    wav_buf.seek(0)
    mp3_buf = io.BytesIO()
    AudioSegment.from_wav(wav_buf).export(mp3_buf, format="mp3", bitrate="64k")
    mp3_buf.seek(0)
    result = cloudinary.uploader.upload(
        mp3_buf,
        public_id=public_id,
        resource_type="raw",
        overwrite=False,
    )
    return result["secure_url"]

print("✓ Helpers ready")

# ── CELL 6: FETCH STORIES ───────────────────────────────────
res     = sb.table("story_templates").select("id, body, theme, language").eq("language", LANGUAGE).execute()
stories = res.data
print(f"✓ Fetched {len(stories)} stories for {LANGUAGE}")

# ── CELL 7: GENERATE & UPLOAD ───────────────────────────────
term = TERM_MAP.get(LANGUAGE, "beta")
done, skipped, failed = 0, 0, 0

print(f"\nStarting TTS generation for {LANGUAGE}...")
print(f"Grandmother term: {term}\n")

for i, story in enumerate(stories, 1):
    raw_body = story["body"]
    tts_body = raw_body.replace("{childname}", term)
    pub_id   = tts_public_id(raw_body, LANGUAGE)
    label    = f"[{i:>3}/{len(stories)}] {story['theme']:<15}"

    if already_uploaded(pub_id):
        print(f"{label} SKIP")
        skipped += 1
        continue

    try:
        t0    = time.time()
        audio = generate_audio(tts_body)
        url   = upload_audio(audio, pub_id)
        secs  = time.time() - t0
        dur   = len(audio) / SAMPLE_RATE
        print(f"{label} OK  {dur:.0f}s audio in {secs:.0f}s  →  {url[-40:]}")
        done += 1
    except Exception as e:
        print(f"{label} FAIL  {e}")
        failed += 1

print(f"\n{'='*50}")
print(f"Language : {LANGUAGE}")
print(f"Done     : {done}")
print(f"Skipped  : {skipped}  (already existed)")
print(f"Failed   : {failed}")
print(f"{'='*50}")
print("All audio is live on Cloudinary. Stories will play instantly now.")
