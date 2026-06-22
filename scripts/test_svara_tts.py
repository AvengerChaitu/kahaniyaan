# ── CONFIG ───────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME = "dztsnxfgp"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
HF_TOKEN              = ""

# ── INSTALL ───────────────────────────────────────────────────
import subprocess, sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "-q",
                       "cloudinary", "soundfile", "pydub"])

# ── PREVENT transformers from importing tensorflow (fixes protobuf error) ──
import os
os.environ["USE_TF"]    = "0"
os.environ["USE_TORCH"] = "1"

# ── IMPORTS ───────────────────────────────────────────────────
import torch, io, numpy as np, soundfile as sf
import cloudinary, cloudinary.uploader
from pydub import AudioSegment
from transformers import pipeline

print("✓ imports OK")

# ── STORY ─────────────────────────────────────────────────────
STORY = (
    "అనగనగా ఒక అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి. "
    "చిట్టికి ప్రతి రాత్రి నక్షత్రాలు చూడడం చాలా ఇష్టం. కానీ ఆ రాత్రి ఆకాశం మేఘాలతో నిండిపోయింది. "
    "నా నక్షత్రాలు ఎక్కడికి వెళ్ళాయి అని చిట్టి దుఃఖంగా అడిగింది. <sad> "
    "అప్పుడు అడవి నుండి ఒక పెద్ద శబ్దం వచ్చింది. గుండె ఆగేంత భయంకరమైన శబ్దం. <fear> "
    "ఏనుగు పిల్ల అడవిలో తప్పిపోయింది. అది ఏడుస్తూ అటు ఇటు తిరుగుతోంది. <sad> "
    "చిట్టి మెల్లగా బయటకు వచ్చింది. భయపడకు, నేను సహాయం చేస్తాను అని అరిచింది. <happy> "
    "తల్లి ఏనుగు తన పిల్లను చూసి ఆనందంతో కళ్ళనీళ్ళు పెట్టుకుంది. <happy> "
    "ఆకాశంలో మేఘాలు తొలగిపోయాయి. వెయ్యి నక్షత్రాలు ఒకేసారి మెరిశాయి! <happy> "
    "నువ్వు కూడా ఇప్పుడు నిద్రపో. రేపు మరో కథ చెప్తాను."
)

# ── CLOUDINARY ────────────────────────────────────────────────
cloudinary.config(cloud_name=CLOUDINARY_CLOUD_NAME,
                  api_key=CLOUDINARY_API_KEY,
                  api_secret=CLOUDINARY_API_SECRET)

# ── RUN MODEL ─────────────────────────────────────────────────
device = 0 if torch.cuda.is_available() else -1
print(f"Device: {'GPU' if device == 0 else 'CPU (slow ~10min)'}")

print("Loading svara-tts-v1...")
pipe = pipeline("text-to-speech", model="kenpath/svara-tts-v1",
                token=HF_TOKEN or None, device=device)

print("Generating audio...")
out   = pipe(STORY)
audio = np.array(out["audio"]).squeeze().astype(np.float32)
sr    = out["sampling_rate"]
print(f"✓ {len(audio)/sr:.0f}s of audio generated")

# ── UPLOAD ────────────────────────────────────────────────────
wav_buf = io.BytesIO()
sf.write(wav_buf, audio, sr, format="WAV")
wav_buf.seek(0)
mp3_buf = io.BytesIO()
AudioSegment.from_wav(wav_buf).export(mp3_buf, format="mp3", bitrate="64k")
mp3_buf.seek(0)

result = cloudinary.uploader.upload(mp3_buf, public_id="tts-compare/svara_tts_telugu",
                                    resource_type="raw", overwrite=True)
print(f"\n✓ DONE — listen here:\n{result['secure_url']}")
