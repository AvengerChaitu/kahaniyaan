# ── IndicF5 voice cloning test ───────────────────────────────
# Kaggle: GPU T4 x2, Internet ON
# Requires: accept license at huggingface.co/ai4bharat/IndicF5
# Output: /kaggle/working/indicf5_voice_test.mp3

HF_TOKEN = ""   # paste your hf_xxx token here

import subprocess, sys, os, urllib.request

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("git+https://github.com/ai4bharat/IndicF5.git")
pip("soundfile")
pip("pydub")
print("✓ installed")

os.environ["USE_TF"]    = "0"
os.environ["USE_TORCH"] = "1"

import torch, io, numpy as np, soundfile as sf
from pydub import AudioSegment
from transformers import AutoModel

# Download reference audio (Telugu female voice sample)
REF_URL  = "https://huggingface.co/ai4bharat/IndicF5/resolve/main/prompts/TEL_F_HAPPY_00001.wav"
REF_TEXT = "నేను చాలా సంతోషంగా ఉన్నాను."
ref_path = "/tmp/ref_telugu.wav"

print("Downloading Telugu reference audio...")
headers = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}
req = urllib.request.Request(REF_URL, headers=headers)
try:
    with urllib.request.urlopen(req) as r, open(ref_path, "wb") as f:
        f.write(r.read())
    print("✓ Telugu reference audio downloaded")
except Exception as e:
    # Fallback to Punjabi sample if Telugu not available
    print(f"Telugu sample failed ({e}), trying Punjabi fallback...")
    REF_URL  = "https://huggingface.co/ai4bharat/IndicF5/resolve/main/prompts/PAN_F_HAPPY_00001.wav"
    REF_TEXT = "ਭਹੰਪੀ ਵਿੱਚ ਸਮਾਰਕਾਂ ਦੇ ਭਵਨ ਨਿਰਮਾਣ ਕਲਾ ਦੀਆਂ ਉੱਤਮ ਉਦਾਹਰਣਾਂ ਹਨ।"
    req = urllib.request.Request(REF_URL, headers=headers)
    with urllib.request.urlopen(req) as r, open(ref_path, "wb") as f:
        f.write(r.read())
    print("✓ Punjabi reference audio downloaded")

print("Loading IndicF5...")
model = AutoModel.from_pretrained("ai4bharat/IndicF5",
                                  trust_remote_code=True,
                                  token=HF_TOKEN or None)
print("✓ model loaded")

STORY = """అనగనగా ఒక పచ్చని అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి. చిట్టి చాలా చురుకైన పిల్ల. ప్రతి రోజు తెల్లవారుజామున లేచి, మంచులో గంతులు వేస్తూ, పువ్వులు వాసన చూస్తూ ఆడుకునేది. కానీ ఒక రోజు, కన్నా, చిట్టికి ఒక పెద్ద సమస్య వచ్చింది. అడవిలో ఒక బావి ఉంది. చిట్టికి దాహం వేసింది. కానీ నీళ్ళు తాగలేకపోయింది. అప్పుడు చిట్టి దాని స్నేహితులను పిలిచింది. కోతి, ఏనుగు, నెమలి, అందరూ వచ్చారు. కలిసి పని చేస్తే కష్టమైన పని కూడా సులభం అవుతుంది అని చిట్టికి తెలుసు. అందరూ కలిసి పని చేశారు. చిట్టి నీళ్ళు తాగింది. కన్నా, మనం ఒంటరిగా చేయలేని పనిని కలిసి చేయవచ్చు. అదే స్నేహం యొక్క శక్తి. ఆ సాయంత్రం, అడవిలో ఒక వేడుక జరిగింది. అందరూ కలిసి ఆడారు, పాడారు, తిన్నారు. రాత్రి అయింది, కన్నా. ఆకాశంలో నక్షత్రాలు మెరిశాయి. చిట్టి తన తల్లి పక్కన పడుకుంది. నీకు నిద్ర వస్తోందా, కన్నా? మెల్లగా పడుకో. రేపు మరో కథ చెప్తాను."""

print("Generating audio...")
audio = model(STORY, ref_audio_path=ref_path, ref_text=REF_TEXT)
audio = np.array(audio, dtype=np.float32)
if audio.max() > 1.0:
    audio = audio / 32768.0
SR = 24000
duration = len(audio) / SR
print(f"✓ {duration/60:.1f} minutes of audio")

wav_buf = io.BytesIO()
sf.write(wav_buf, audio, SR, format="WAV")
wav_buf.seek(0)
AudioSegment.from_wav(wav_buf).export("/kaggle/working/indicf5_voice_test.mp3",
                                      format="mp3", bitrate="64k")
print("✓ Saved: /kaggle/working/indicf5_voice_test.mp3")
print("  Download from the Files panel on the right →")
