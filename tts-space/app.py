import io
import os
import nltk
import torch
import soundfile as sf
from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import Response
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer

nltk.download("punkt_tab", quiet=True)

app = FastAPI()

device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if device != "cpu" else torch.float32

model = None
tokenizer = None
description_tokenizer = None
sampling_rate = 24000

LANG_CONFIG = {
    "Hindi": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Telugu": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Tamil": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Kannada": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Malayalam": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Marathi": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Bengali": {
        "speaker": "Grandma",
        "description": "An elderly grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Gujarati": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "Punjabi": {
        "speaker": "Grandma",
        "description": "An elderly Indian grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
    "English": {
        "speaker": "Grandma",
        "description": "An elderly grandmother speaks with a warm, gentle voice in a quiet room, at a slow pace with affectionate intonation, clear audio with no background noise.",
    },
}


hf_token = os.environ.get("HF_TOKEN")

@app.on_event("startup")
def load_model():
    global model, tokenizer, description_tokenizer, sampling_rate
    model = ParlerTTSForConditionalGeneration.from_pretrained(
        "ai4bharat/indic-parler-tts",
        token=hf_token,
        attn_implementation="eager",
        torch_dtype=torch_dtype,
    ).to(device)
    tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts", token=hf_token)
    description_tokenizer = AutoTokenizer.from_pretrained(
        model.config.text_encoder._name_or_path, token=hf_token
    )
    sampling_rate = model.config.sampling_rate


@app.get("/tts")
def generate(text: str = Query(...), lang: str = Query("Hindi")):
    if model is None:
        raise HTTPException(503, "Model not loaded yet")

    config = LANG_CONFIG.get(lang, LANG_CONFIG["Hindi"])
    description_inputs = description_tokenizer(
        config["description"], return_tensors="pt"
    ).to(device)

    sentences = nltk.sent_tokenize(text)
    chunks = []
    current = ""
    for sentence in sentences:
        candidate = (current + " " + sentence).strip()
        if len(candidate.split()) >= 25:
            if current:
                chunks.append(current)
            current = sentence
        else:
            current = candidate
    if current:
        chunks.append(current)

    audio_chunks = []
    for chunk in chunks:
        prompt_inputs = tokenizer(chunk, return_tensors="pt").to(device)
        generation = model.generate(
            input_ids=description_inputs.input_ids,
            attention_mask=description_inputs.attention_mask,
            prompt_input_ids=prompt_inputs.input_ids,
            prompt_attention_mask=prompt_inputs.attention_mask,
            do_sample=True,
            return_dict_in_generate=True,
        )
        if hasattr(generation, "sequences") and hasattr(generation, "audios_length"):
            audio = generation.sequences[0, : generation.audios_length[0]]
            audio_np = audio.to(torch.float32).cpu().numpy().squeeze()
            if len(audio_np.shape) > 1:
                audio_np = audio_np.flatten()
            audio_chunks.append(audio_np)

    if not audio_chunks:
        raise HTTPException(500, "No audio generated")

    combined = torch.cat(
        [torch.from_numpy(c) for c in audio_chunks]
    ).numpy()

    buf = io.BytesIO()
    sf.write(buf, combined, sampling_rate, format="WAV")
    buf.seek(0)
    return Response(content=buf.read(), media_type="audio/wav")


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}
