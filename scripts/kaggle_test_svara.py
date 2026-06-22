# ── svara-tts-v1 voice test (emotion tags) ───────────────────
# Kaggle: GPU T4 x2, Internet ON
# Output: /kaggle/working/svara_voice_test.mp3

HF_TOKEN = ""   # paste your hf_xxx token here

import subprocess, sys, os

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("soundfile")
pip("pydub")
print("✓ installed")

os.environ["USE_TF"]    = "0"
os.environ["USE_TORCH"] = "1"

import torch, io, numpy as np, soundfile as sf
from pydub import AudioSegment
from transformers import pipeline

device = 0 if torch.cuda.is_available() else -1
print(f"Device: {'GPU' if device == 0 else 'CPU'}")

print("Loading svara-tts-v1...")
pipe = pipeline("text-to-speech", model="kenpath/svara-tts-v1",
                token=HF_TOKEN or None, device=device)
print("✓ model loaded")

# Same story with emotion tags at end of each sentence
STORY = (
    "అనగనగా ఒక పచ్చని అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి. <happy> "
    "చిట్టి చాలా చురుకైన పిల్ల. ప్రతి రోజు తెల్లవారుజామున లేచి, మంచులో గంతులు వేస్తూ ఆడుకునేది. <happy> "
    "కానీ ఒక రోజు, కన్నా, చిట్టికి ఒక పెద్ద సమస్య వచ్చింది. <sad> "
    "అడవిలో ఒక బావి ఉంది. చిట్టికి దాహం వేసింది. కానీ నీళ్ళు తాగలేకపోయింది. <sad> "
    "అప్పుడు చిట్టి ఏం చేసింది తెలుసా, కన్నా? అది ఒక తెలివైన పని చేసింది. <happy> "
    "దాని స్నేహితులను పిలిచింది. కోతి, ఏనుగు, నెమలి, అందరూ వచ్చారు. <happy> "
    "కోతి చెట్టు మీదకు ఎక్కింది. అక్కడ ఒక పొడవైన తీగ ఉంది. <happy> "
    "అందరూ కలిసి పని చేశారు. చిట్టి నీళ్ళు తాగింది. <happy> "
    "కన్నా, మనం ఒంటరిగా చేయలేని పనిని కలిసి చేయవచ్చు. అదే స్నేహం యొక్క శక్తి. <happy> "
    "ఆ సాయంత్రం, అడవిలో ఒక వేడుక జరిగింది. అందరూ కలిసి ఆడారు, పాడారు. <happy> "
    "రాత్రి అయింది, కన్నా. ఆకాశంలో నక్షత్రాలు మెరిశాయి. <happy> "
    "మరొక రోజు, కన్నా, చిట్టి ఒక అనాధ పక్షి పిల్లను చూసింది. అది ఏడుస్తోంది. <sad> "
    "చిట్టికి దాని మీద చాలా జాలి కలిగింది. <sad> "
    "చిట్టి దాన్ని తీసుకుని, మెల్లగా గూటి దగ్గరకు తీసుకెళ్ళింది. <happy> "
    "కానీ గూడు చాలా ఎత్తులో ఉంది. చిట్టికి చెట్టు ఎక్కడం రాదు. <fear> "
    "అది విచారంగా కూర్చుంది. అప్పుడు కోతి వచ్చింది. <sad> "
    "కోతి నవ్వుతూ పక్షి పిల్లను తీసుకుని గూటిలో పెట్టింది. <happy> "
    "కన్నా, ఒకళ్ళకు సాయం చేయడం చాలా గొప్ప పని. <happy> "
    "ఆ సంతోషం మరే సంతోషం కంటే పెద్దది. <happy> "
    "నీకు నిద్ర వస్తోందా, కన్నా? మెల్లగా పడుకో. రేపు మరో కథ చెప్తాను. <happy>"
)

print("Generating audio (short test first)...")
TEST = "నమస్కారం కన్నా. <happy>"
out  = pipe(TEST, generate_kwargs={"max_new_tokens": 512})

print("── DEBUG ──")
print("type(out):", type(out))
print("keys:", out.keys() if hasattr(out, "keys") else "no keys")
print("out:", out)
import sys; sys.exit(0)   # stop here — share the debug output
duration = len(audio) / sr
print(f"✓ {duration/60:.1f} minutes of audio")

wav_buf = io.BytesIO()
sf.write(wav_buf, audio, sr, format="WAV")
wav_buf.seek(0)
AudioSegment.from_wav(wav_buf).export("/kaggle/working/svara_voice_test.mp3",
                                      format="mp3", bitrate="64k")
print("✓ Saved: /kaggle/working/svara_voice_test.mp3")
print("  Download from the Files panel on the right →")
