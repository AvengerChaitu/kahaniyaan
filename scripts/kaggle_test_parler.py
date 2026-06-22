# ── indic-parler-tts voice test — all 3 Telugu speakers ──────
# Kaggle: GPU T4 x2, Internet ON
# Outputs: /kaggle/working/parler_Lalitha.mp3
#          /kaggle/working/parler_Prakash.mp3
#          /kaggle/working/parler_Kiran.mp3

import subprocess, sys, os

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("git+https://github.com/huggingface/parler-tts.git")
pip("soundfile")
pip("pydub")
pip("nltk")
print("✓ installed")

os.environ["USE_TF"] = "0"
os.environ["USE_TORCH"] = "1"

import torch, io, numpy as np, soundfile as sf, nltk
from pydub import AudioSegment
from transformers import AutoTokenizer
from parler_tts import ParlerTTSForConditionalGeneration
from nltk import sent_tokenize

nltk.download("punkt_tab", quiet=True)
nltk.download("punkt", quiet=True)

device = "cuda" if torch.cuda.is_available() else "cpu"
dtype  = torch.float16 if device == "cuda" else torch.float32
print(f"Device: {device}")

print("Loading model...")
model = ParlerTTSForConditionalGeneration.from_pretrained(
    "ai4bharat/indic-parler-tts",
    attn_implementation="eager",
    torch_dtype=dtype,
).to(device)
tok      = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts")
desc_tok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
SR       = model.config.sampling_rate
print("✓ model loaded")

# ~10 min of story text (Telugu, grandmother narration style)
STORY = """అనగనగా ఒక పచ్చని అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి. చిట్టి చాలా చురుకైన పిల్ల. ప్రతి రోజు తెల్లవారుజామున లేచి, మంచులో గంతులు వేస్తూ, పువ్వులు వాసన చూస్తూ, సీతాకోకచిలుకలను తరుముతూ ఆడుకునేది.

కానీ ఒక రోజు, కన్నా, చిట్టికి ఒక పెద్ద సమస్య వచ్చింది. అడవిలో ఒక బావి ఉంది. ఆ బావిలో తియ్యని నీళ్ళు ఉంటాయి. కానీ బావి చాలా లోతుగా ఉంది. చిట్టికి దాహం వేసింది. కానీ నీళ్ళు తాగలేకపోయింది.

అప్పుడు చిట్టి ఏం చేసింది తెలుసా, కన్నా? అది ఒక తెలివైన పని చేసింది. దాని స్నేహితులను పిలిచింది. కోతి, ఏనుగు, నెమలి, అందరూ వచ్చారు. కలిసి పని చేస్తే కష్టమైన పని కూడా సులభం అవుతుంది అని చిట్టికి తెలుసు.

కోతి చెట్టు మీదకు ఎక్కింది. అక్కడ ఒక పొడవైన తీగ ఉంది. ఆ తీగను కిందకు వదిలింది. ఏనుగు తన తొండంతో మట్టి తీసింది. నెమలి తన రెక్కలతో గాలి వేసింది. చిట్టి చేతులతో తీగను పట్టుకుని నీళ్ళు తాగింది.

కన్నా, మనం ఒంటరిగా చేయలేని పనిని కలిసి చేయవచ్చు. అదే స్నేహం యొక్క శక్తి.

ఆ సాయంత్రం, అడవిలో ఒక వేడుక జరిగింది. అందరూ కలిసి ఆడారు, పాడారు, తిన్నారు. చిట్టి మధ్యలో కూర్చుని అందరి వైపు చూసింది. దాని గుండె ఆనందంతో నిండిపోయింది.

రాత్రి అయింది, కన్నా. ఆకాశంలో నక్షత్రాలు మెరిశాయి. చిట్టి తన తల్లి పక్కన పడుకుంది. ఆరోజు జరిగిన అన్నీ గుర్తుచేసుకుంటూ నెమ్మదిగా కళ్ళు మూసుకుంది.

ఇప్పుడు నువ్వు కూడా కళ్ళు మూసుకో, కన్నా. రేపు మరో కథ చెప్తాను.

మరొక రోజు, కన్నా, చిట్టి అడవిలో తిరుగుతూ ఒక అనాధ పక్షి పిల్లను చూసింది. అది గూడు నుండి పడిపోయింది. ఏడుస్తోంది. చిట్టికి దాని మీద చాలా జాలి కలిగింది.

చిట్టి దాన్ని తీసుకుని, మెల్లగా గూటి దగ్గరకు తీసుకెళ్ళింది. కానీ గూడు చాలా ఎత్తులో ఉంది. చిట్టికి చెట్టు ఎక్కడం రాదు.

అది విచారంగా కూర్చుంది. అప్పుడు కోతి వచ్చింది. కోతి నవ్వుతూ పక్షి పిల్లను తీసుకుని గూటిలో పెట్టింది.

కన్నా, ఒకళ్ళకు సాయం చేయడం చాలా గొప్ప పని. ఆ సంతోషం మరే సంతోషం కంటే పెద్దది.

అడవిలో ఇంకా చాలా కథలు ఉన్నాయి. ప్రతి చెట్టు ఒక కథ చెప్తుంది. ప్రతి పూవు ఒక రహస్యం దాచుకుంటుంది. ప్రతి నక్షత్రం ఒక కల చెప్తుంది.

నీకు నిద్ర వస్తోందా, కన్నా? అవును వస్తోంది కదా. అందుకే మెల్లగా పడుకో. నేను నీ పక్కనే ఉన్నాను. రేపు లేచినప్పుడు ఇంకో కథ చెప్తాను."""

# 3 Telugu speakers to compare
SPEAKERS = {
    "Lalitha": "Lalitha's voice is warm and calm, like a grandmother telling a bedtime story. Very close recording, no background noise, slightly slow pace.",
    "Prakash": "Prakash's voice is gentle and clear, with a warm storytelling tone. Very close recording, no background noise, slightly slow pace.",
    "Kiran":   "Kiran's voice is soft and expressive, with a soothing bedtime story quality. Very close recording, no background noise, slightly slow pace.",
}

def generate_audio(description):
    desc_in   = desc_tok(description, return_tensors="pt").to(device)
    sentences = sent_tokenize(STORY)
    chunk, chunks = "", []
    for s in sentences:
        candidate = (chunk + " " + s).strip()
        if len(candidate.split()) >= 20:
            if chunk: chunks.append(chunk)
            chunk = s
        else:
            chunk = candidate
    if chunk: chunks.append(chunk)

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
    return np.concatenate(parts)

for speaker, description in SPEAKERS.items():
    print(f"\n── Generating: {speaker} ──")
    audio_np = generate_audio(description)
    duration = len(audio_np) / SR
    out_path = f"/kaggle/working/parler_{speaker}.mp3"
    wav_buf = io.BytesIO()
    sf.write(wav_buf, audio_np.astype(np.float32), SR, format="WAV")
    wav_buf.seek(0)
    AudioSegment.from_wav(wav_buf).export(out_path, format="mp3", bitrate="64k")
    print(f"✓ {speaker}: {duration/60:.1f} min → {out_path}")

print("\n✓ All done — download from Files panel on the right →")
print("  parler_Lalitha.mp3 / parler_Prakash.mp3 / parler_Kiran.mp3")
