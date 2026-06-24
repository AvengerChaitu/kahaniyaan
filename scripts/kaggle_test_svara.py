# ── svara-tts-v1 voice test (emotion tags) ───────────────────
# Kaggle: GPU T4 x2, Internet ON
# Output: /kaggle/working/svara_voice_test.wav

HF_TOKEN = ""   # paste hf_xxx — needed for full download speed (model is ~6GB)

import subprocess, sys, os

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("snac")
pip("soundfile")
pip("pydub")
print("✓ installed")

from huggingface_hub import login
if HF_TOKEN:
    login(HF_TOKEN)
    print("✓ HF logged in")

import torch, io, numpy as np, soundfile as sf
from snac import SNAC
from transformers import AutoModelForCausalLM, AutoTokenizer
from pydub import AudioSegment

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Device: {device}")

print("Loading SNAC decoder...")
snac_model = SNAC.from_pretrained("hubertsiuzdak/snac_24khz", token=HF_TOKEN or None).to(device)

print("Loading svara-tts-v1...")
model     = AutoModelForCausalLM.from_pretrained("kenpath/svara-tts-v1", token=HF_TOKEN or None).to(device)
tokenizer = AutoTokenizer.from_pretrained("kenpath/svara-tts-v1", token=HF_TOKEN or None)
print("✓ models loaded")

SR = 24000

def generate_audio(text, language="Telugu", gender="Female"):
    voice          = f"{language} ({gender})"
    formatted_text = f"<|audio|> {voice}: {text}<|eot_id|>"
    prompt         = "<custom_token_3>" + formatted_text + "<custom_token_4><custom_token_5>"

    input_ids  = tokenizer(prompt, return_tensors="pt").input_ids
    start_tok  = torch.tensor([[128259]], dtype=torch.int64)
    end_toks   = torch.tensor([[128009, 128260, 128261, 128257]], dtype=torch.int64)
    input_ids  = torch.cat([start_tok, input_ids, end_toks], dim=1).to(device)

    with torch.no_grad():
        generated_ids = model.generate(
            input_ids=input_ids,
            max_new_tokens=800,
            do_sample=True,
            temperature=0.7,
            top_p=0.95,
            repetition_penalty=1.2,
            eos_token_id=128258,
        )

    START_OF_SPEECH = 128257
    END_OF_SPEECH   = 128258
    AUDIO_BASE      = 128266
    AUDIO_MAX       = AUDIO_BASE + (7 * 4096) - 1

    row          = generated_ids[0]
    start_idxs   = (row == START_OF_SPEECH).nonzero(as_tuple=True)[0]
    if len(start_idxs) == 0:
        raise ValueError("No speech tokens found")

    audio_tokens = row[start_idxs[-1].item() + 1:]
    audio_tokens = audio_tokens[audio_tokens != END_OF_SPEECH]
    audio_tokens = audio_tokens[audio_tokens != 128263]
    audio_tokens = audio_tokens[(audio_tokens >= AUDIO_BASE) & (audio_tokens <= AUDIO_MAX)]
    snac_tokens  = [t - AUDIO_BASE for t in audio_tokens.tolist()]
    snac_tokens  = snac_tokens[:(len(snac_tokens) // 7) * 7]

    # De-interleave into 3 SNAC levels
    offsets    = [i * 4096 for i in range(7)]
    lvl0, lvl1, lvl2 = [], [], []
    for i in range(0, len(snac_tokens), 7):
        lvl0.append(snac_tokens[i]   - offsets[0])
        lvl1.append(snac_tokens[i+1] - offsets[1])
        lvl1.append(snac_tokens[i+4] - offsets[4])
        lvl2.append(snac_tokens[i+2] - offsets[2])
        lvl2.append(snac_tokens[i+3] - offsets[3])
        lvl2.append(snac_tokens[i+5] - offsets[5])
        lvl2.append(snac_tokens[i+6] - offsets[6])

    codes = [
        torch.tensor(lvl0, dtype=torch.long, device=device).unsqueeze(0),
        torch.tensor(lvl1, dtype=torch.long, device=device).unsqueeze(0),
        torch.tensor(lvl2, dtype=torch.long, device=device).unsqueeze(0),
    ]
    with torch.no_grad():
        audio_hat = snac_model.decode(codes)

    return audio_hat.detach().squeeze().cpu().numpy()


# ── STORY with emotion tags ───────────────────────────────────
STORY = (
    "అనగనగా ఒక పచ్చని అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి. <happy> "
    "చిట్టికి ప్రతి రాత్రి నక్షత్రాలు చూడడం చాలా ఇష్టం. కానీ ఆ రాత్రి ఆకాశం మేఘాలతో నిండిపోయింది. "
    "నా నక్షత్రాలు ఎక్కడికి వెళ్ళాయి అని చిట్టి దుఃఖంగా అడిగింది. <sad> "
    "అప్పుడు అడవి నుండి ఒక పెద్ద భయంకరమైన శబ్దం వచ్చింది. చిట్టి వణికిపోయింది. <fear> "
    "ఏనుగు పిల్ల అడవిలో తప్పిపోయింది. అది ఏడుస్తూ తిరుగుతోంది. <sad> "
    "చిట్టి మెల్లగా బయటకు వచ్చింది. భయపడకు, నేను సహాయం చేస్తాను అని అరిచింది. <happy> "
    "తల్లి ఏనుగు తన పిల్లను చూసి ఆనందంతో కళ్ళనీళ్ళు పెట్టుకుంది. <happy> "
    "ఆకాశంలో వెయ్యి నక్షత్రాలు ఒకేసారి మెరిశాయి! <happy> "
    "నువ్వు కూడా ఇప్పుడు నిద్రపో కన్నా. రేపు మరో కథ చెప్తాను."
)

print("Generating audio...")
audio = generate_audio(STORY, language="Telugu", gender="Female")
print(f"✓ {len(audio)/SR:.0f}s of audio at 24kHz")

out_path = "/kaggle/working/svara_voice_test.wav"
sf.write(out_path, audio.astype(np.float32), SR)
print(f"✓ Saved: {out_path}")
print("  Download from the Files panel →")
