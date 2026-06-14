# ============================================================
# KAHANIYAAN — Voice Test Script
# Generates 10 voice variations for ONE Telugu story
# so you can listen and pick the best voice.
#
# Run on Kaggle T4 GPU:
#   Settings → Accelerator → GPU T4 x2
#   Settings → Internet → ON
#   Paste this file → Run All
# ============================================================

# ── CONFIG ──────────────────────────────────────────────────
SUPABASE_URL         = "YOUR_SUPABASE_URL"          # e.g. https://xxxx.supabase.co
SUPABASE_SERVICE_KEY = "YOUR_SUPABASE_SERVICE_KEY"  # Settings → API → service_role key

CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"

HF_TOKEN = ""  # paste your hf_xxx token here

# ── 10 VOICE OPTIONS ─────────────────────────────────────────
# Using named speakers the model was trained on (Lalitha = female Telugu speaker).
# Descriptions use model-understood vocabulary only — no metaphors.
# Goal: warm, unhurried voice that makes you remember your mother/grandmother.
VOICES = {
    1: {
        "name": "Lalitha — Warm, Slightly Slow",
        "description": (
            "Lalitha speaks with a warm, calm tone in a very close-sounding environment. "
            "Her voice is clear and natural, with subtle emotional depth, slightly slow pace, "
            "and balanced pitch. Very high quality recording, no background noise."
        ),
    },
    2: {
        "name": "Lalitha — Gentle, Very Slow, Lower Pitch",
        "description": (
            "Lalitha speaks with a gentle, warm tone in a very close-sounding environment. "
            "Her voice is soft and clear, with deep emotional warmth, very slow pace, "
            "and slightly lower pitch. Very clear audio, no background noise."
        ),
    },
    3: {
        "name": "Lalitha — Soothing, Slightly Slow, Intimate",
        "description": (
            "Lalitha speaks with a soothing, tender tone in an intimate confined environment. "
            "Her voice is expressive and natural, with subtle emotional depth, slightly slow pace, "
            "and balanced pitch. Very high quality, no background noise."
        ),
    },
    4: {
        "name": "Lalitha — Nurturing, Normal Pace",
        "description": (
            "Lalitha speaks with a warm, nurturing tone in a very close recording environment. "
            "Her voice is calm and slightly expressive, with gentle emotional depth, "
            "normal pace, and balanced pitch. Very clear audio."
        ),
    },
    5: {
        "name": "Lalitha — Rich, Slow, Lower Pitch",
        "description": (
            "Lalitha speaks with a rich, warm tone in a very close-sounding environment. "
            "Her voice is full and clear, with deep emotional warmth, slow pace, "
            "and slightly lower pitch. Very high quality recording, no background noise."
        ),
    },
    6: {
        "name": "Lalitha — Soft, Very Slow, Whisper-close",
        "description": (
            "Lalitha speaks with a soft, calm tone in a very intimate recording. "
            "Her voice is gentle and clear, with subtle emotional depth, very slow pace, "
            "and slightly lower pitch. Extremely clear audio, no background noise."
        ),
    },
    7: {
        "name": "Lalitha — Melodic, Slightly Slow",
        "description": (
            "Lalitha speaks with a warm, melodic tone in a confined close-sounding environment. "
            "Her voice is clear and expressive, with gentle emotional depth, slightly slow pace, "
            "and natural pitch. Very high quality, no background noise."
        ),
    },
    8: {
        "name": "Lalitha — Calm, Deliberate, Deep Warmth",
        "description": (
            "Lalitha speaks with a calm, deliberate tone in a very close-sounding environment. "
            "Her voice is natural and warm, with deep emotional depth, slow pace, "
            "and balanced pitch. Very clear audio, no background noise."
        ),
    },
    9: {
        "name": "Kiran — Warm, Slightly Slow (male baseline)",
        "description": (
            "Kiran speaks with a warm, calm tone in a very close-sounding environment. "
            "His voice is clear and natural, with subtle emotional depth, slightly slow pace, "
            "and balanced pitch. Very high quality recording, no background noise."
        ),
    },
    10: {
        "name": "Prakash — Warm, Soothing (male baseline)",
        "description": (
            "Prakash speaks with a warm, soothing tone in an intimate close-sounding environment. "
            "His voice is calm and clear, with gentle emotional depth, slightly slow pace, "
            "and slightly lower pitch. Very clear audio."
        ),
    },
}

# ── INSTALL ─────────────────────────────────────────────────
import subprocess, sys

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

install("supabase")
install("cloudinary")
install("soundfile")
install("nltk")
install("pydub")
install("git+https://github.com/huggingface/parler-tts.git")
print("✓ Packages installed")

# ── IMPORTS ─────────────────────────────────────────────────
import io, time, torch, numpy as np, soundfile as sf, nltk
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

# ── LOAD MODEL ───────────────────────────────────────────────
device = "cuda" if torch.cuda.is_available() else "cpu"
dtype  = torch.float16 if device == "cuda" else torch.float32
print(f"Device: {device}")

print("Loading ai4bharat/indic-parler-tts...")
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

# ── FETCH ONE TELUGU STORY ───────────────────────────────────
res = sb.table("story_templates").select("body").eq("language", "Telugu").eq("theme", "Panchatantra").limit(1).execute()
story = res.data[0]
raw_body = story["body"]
tts_body = raw_body.replace("{childname}", "బాబు")
print(f"✓ Story loaded  |  {len(tts_body.split())} words")
print(f"\nStory preview:\n{tts_body[:200]}...\n")

# ── HELPERS ──────────────────────────────────────────────────
def split_chunks(text, max_words=25):
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
def generate_audio(text, description):
    desc_in = desc_tokenizer(description, return_tensors="pt").to(device)
    parts   = []
    for chunk in split_chunks(text):
        prompt_in = tokenizer(chunk, return_tensors="pt").to(device)
        gen = model.generate(
            input_ids=desc_in.input_ids,
            attention_mask=desc_in.attention_mask,
            prompt_input_ids=prompt_in.input_ids,
            prompt_attention_mask=prompt_in.attention_mask,
            do_sample=True,
            min_new_tokens=10,
            return_dict_in_generate=True,
        )
        audio = gen.sequences[0, : gen.audios_length[0]]
        parts.append(audio.float().cpu().numpy().squeeze())
    return np.concatenate(parts) if parts else np.zeros(100)

def upload_audio(audio_np, public_id):
    from pydub import AudioSegment
    # write WAV to memory
    wav_buf = io.BytesIO()
    sf.write(wav_buf, audio_np, SAMPLE_RATE, format="WAV")
    wav_buf.seek(0)
    # convert to MP3 at 64kbps (~500KB for 1 min) — well under 10MB limit
    mp3_buf = io.BytesIO()
    AudioSegment.from_wav(wav_buf).export(mp3_buf, format="mp3", bitrate="64k")
    mp3_buf.seek(0)
    result = cloudinary.uploader.upload(
        mp3_buf,
        public_id=public_id,
        resource_type="raw",
        overwrite=True,
    )
    return result["secure_url"]

# ── GENERATE ALL 10 VOICES ───────────────────────────────────
print("=" * 60)
print("Generating 10 voice samples...")
print("Each takes ~2 min. Total ~20 min.")
print("=" * 60)

urls = {}
for num, voice in VOICES.items():
    print(f"\n[{num}/10] {voice['name']}...")
    t0    = time.time()
    audio = generate_audio(tts_body, voice["description"])
    pub_id = f"tts-test/Telugu/voice_{num}"
    url   = upload_audio(audio, pub_id)
    secs  = time.time() - t0
    dur   = len(audio) / SAMPLE_RATE
    urls[num] = url
    print(f"  ✓ {dur:.0f}s audio in {secs:.0f}s")
    print(f"  URL: {url}")

# ── SUMMARY ─────────────────────────────────────────────────
print("\n" + "=" * 60)
print("ALL 10 VOICES READY — Copy URLs and listen:")
print("=" * 60)
for num, voice in VOICES.items():
    print(f"\nVoice {num}: {voice['name']}")
    print(f"  {urls[num]}")
print("\nShare the URLs with Claude and say which voice you like!")
