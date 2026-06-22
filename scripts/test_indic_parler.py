# ── CONFIG ──────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME = "dztsnxfgp"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
HF_TOKEN              = ""

# ── INSTALL ───────────────────────────────────────────────────
import subprocess, sys

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("git+https://github.com/huggingface/parler-tts.git")
pip("cloudinary")
pip("soundfile")
pip("pydub")
pip("nltk")

print("✓ Installed — restarting runtime...")
import IPython
IPython.Application.instance().kernel.do_shutdown(True)

# ════════════════════════════════════════════════════════════
# AFTER RESTART — paste everything below into a new cell
# ════════════════════════════════════════════════════════════

CLOUDINARY_CLOUD_NAME = "dztsnxfgp"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
HF_TOKEN              = ""

STORY = """అనగనగా ఒక అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి.

చిట్టికి ప్రతి రాత్రి నక్షత్రాలు చూడడం చాలా ఇష్టం. కానీ ఆ రాత్రి ఆకాశం మేఘాలతో నిండిపోయింది. ఒక్క నక్షత్రం కూడా కనిపించలేదు.

నా నక్షత్రాలు ఎక్కడికి వెళ్ళాయి అని చిట్టి దుఃఖంగా అడిగింది.

అప్పుడు అడవి నుండి ఒక పెద్ద శబ్దం వచ్చింది. గుండె ఆగేంత భయంకరమైన శబ్దం. చిట్టి వణికిపోయింది. చెట్టు చాటున దాక్కుంది.

కన్నా, తెలుసా? ఆ శబ్దం ఏమిటో? అది ఒక పెద్ద ఏనుగు తన పిల్లను పిలుస్తున్న శబ్దం!

ఏనుగు పిల్ల అడవిలో తప్పిపోయింది. అది ఏడుస్తూ అటు ఇటు తిరుగుతోంది.

చిట్టి మెల్లగా బయటకు వచ్చింది. భయపడకు, నేను సహాయం చేస్తాను అని గట్టిగా అరిచింది.

తల్లి ఏనుగు ఆ గుర్తులు చూసి పరిగెత్తుకు వచ్చింది. తన పిల్లను చూసి ఆనందంతో కళ్ళనీళ్ళు పెట్టుకుంది.

ఆకాశంలో మేఘాలు తొలగిపోయాయి. వెయ్యి నక్షత్రాలు ఒకేసారి మెరిశాయి!

ఆ రాత్రి చిట్టి నక్షత్రాల కింద హాయిగా నిద్రపోయింది. మంచి పని చేసినప్పుడు హృదయం వెలుతురులా ప్రకాశిస్తుంది, కన్నా.

నువ్వు కూడా ఇప్పుడు నిద్రపో. రేపు మరో కథ చెప్తాను."""

import torch, io, numpy as np, soundfile as sf, nltk
import cloudinary, cloudinary.uploader
from pydub import AudioSegment
from transformers import AutoTokenizer
from parler_tts import ParlerTTSForConditionalGeneration
from nltk import sent_tokenize

nltk.download("punkt_tab", quiet=True)
nltk.download("punkt", quiet=True)

cloudinary.config(cloud_name=CLOUDINARY_CLOUD_NAME,
                  api_key=CLOUDINARY_API_KEY,
                  api_secret=CLOUDINARY_API_SECRET)

device = "cuda" if torch.cuda.is_available() else "cpu"
dtype  = torch.float16 if device == "cuda" else torch.float32

print("Loading indic-parler-tts...")
model = ParlerTTSForConditionalGeneration.from_pretrained(
    "ai4bharat/indic-parler-tts",
    token=HF_TOKEN or None,
    attn_implementation="eager",
    torch_dtype=dtype,
).to(device)
tok      = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts", token=HF_TOKEN or None)
desc_tok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path, token=HF_TOKEN or None)
SR       = model.config.sampling_rate

DESCRIPTION = (
    "Lalitha speaks with a warm, calm tone in a very close-sounding environment. "
    "Her voice is clear and natural, with subtle emotional depth, slightly slow pace, "
    "and balanced pitch. Very high quality recording, no background noise."
)

desc_in = desc_tok(DESCRIPTION, return_tensors="pt").to(device)
sentences = sent_tokenize(STORY)
chunk, chunks = "", []
for s in sentences:
    candidate = (chunk + " " + s).strip()
    if len(candidate.split()) >= 25:
        if chunk: chunks.append(chunk)
        chunk = s
    else:
        chunk = candidate
if chunk: chunks.append(chunk)

print(f"Generating audio in {len(chunks)} chunks...")
parts = []
with torch.inference_mode():
    for i, c in enumerate(chunks):
        print(f"  chunk {i+1}/{len(chunks)}...", end=" ", flush=True)
        p_in = tok(c, return_tensors="pt").to(device)
        gen  = model.generate(
            input_ids=desc_in.input_ids,
            attention_mask=desc_in.attention_mask,
            prompt_input_ids=p_in.input_ids,
            prompt_attention_mask=p_in.attention_mask,
            do_sample=True,
            return_dict_in_generate=True,
        )
        audio = gen.sequences[0, :gen.audios_length[0]]
        parts.append(audio.float().cpu().numpy().squeeze())
        print("✓")

audio_np = np.concatenate(parts)
print(f"✓ Generated {len(audio_np)/SR:.0f}s of audio")

wav_buf = io.BytesIO()
sf.write(wav_buf, audio_np.astype(np.float32), SR, format="WAV")
wav_buf.seek(0)
mp3_buf = io.BytesIO()
AudioSegment.from_wav(wav_buf).export(mp3_buf, format="mp3", bitrate="64k")
mp3_buf.seek(0)
result = cloudinary.uploader.upload(mp3_buf, public_id="tts-compare/indic_parler_telugu",
                                    resource_type="raw", overwrite=True)
print(f"\n✓ Uploaded!")
print(f"Listen here: {result['secure_url']}")
