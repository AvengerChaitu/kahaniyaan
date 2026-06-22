# ============================================================
# KAHANIYAAN — TTS Model Comparison Script
#
# IMPORTANT — TWO CELLS in Colab:
#   Cell 1: Run the INSTALL block → then Runtime → Restart runtime
#   Cell 2: Run the RUN block (paste from line marked ── RUN ──)
# ============================================================

# ════════════════════════════════════════════════════════════
# ── CELL 1: INSTALL (run this, then restart runtime) ────────
# ════════════════════════════════════════════════════════════
import subprocess, sys, os

def pip(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

pip("git+https://github.com/huggingface/parler-tts.git")
pip("git+https://github.com/ai4bharat/IndicF5.git")
pip("protobuf>=4.25.0")   # must come AFTER parler-tts which downgrades it
pip("cloudinary")
pip("soundfile")
pip("pydub")
pip("nltk")
pip("numpy<2.0")          # pin last — parler-tts pulls numpy 2.x which breaks C extensions

print("✓ All packages installed — restarting runtime now...")
import IPython
IPython.Application.instance().kernel.do_shutdown(True)
print("  Then run Cell 2 (everything below the ── RUN ── line)")

# ════════════════════════════════════════════════════════════
# ── CELL 2: RUN (paste from here into a new cell) ───────────
# ════════════════════════════════════════════════════════════

# ── CONFIG ──────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME = "dztsnxfgp"
CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
HF_TOKEN              = ""   # paste hf_xxx here

# ── STORY TEXT ───────────────────────────────────────────────
PLAIN_STORY = """అనగనగా ఒక అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి.

చిట్టికి ప్రతి రాత్రి నక్షత్రాలు చూడడం చాలా ఇష్టం. కానీ ఆ రాత్రి ఆకాశం మేఘాలతో నిండిపోయింది. ఒక్క నక్షత్రం కూడా కనిపించలేదు.

నా నక్షత్రాలు ఎక్కడికి వెళ్ళాయి అని చిట్టి దుఃఖంగా అడిగింది.

అప్పుడు అడవి నుండి ఒక పెద్ద శబ్దం వచ్చింది. గుండె ఆగేంత భయంకరమైన శబ్దం. చిట్టి వణికిపోయింది. చెట్టు చాటున దాక్కుంది.

కన్నా, తెలుసా? ఆ శబ్దం ఏమిటో? అది ఒక పెద్ద ఏనుగు తన పిల్లను పిలుస్తున్న శబ్దం!

ఏనుగు పిల్ల అడవిలో తప్పిపోయింది. అది ఏడుస్తూ అటు ఇటు తిరుగుతోంది.

చిట్టికి భయం పోయింది. దానికి ఆ ఏనుగు పిల్ల మీద జాలి కలిగింది.

చిట్టి మెల్లగా బయటకు వచ్చింది. భయపడకు, నేను సహాయం చేస్తాను అని గట్టిగా అరిచింది.

చూడు అని చిట్టి అడవి మొత్తం గంతులు వేస్తూ పరిగెత్తింది. దారిపొడవునా తన అడుగుల గుర్తులు వదిలింది.

తల్లి ఏనుగు ఆ గుర్తులు చూసి పరిగెత్తుకు వచ్చింది. తన పిల్లను చూసి ఆనందంతో కళ్ళనీళ్ళు పెట్టుకుంది.

కన్నా, అప్పుడు ఏమైందో తెలుసా? ఆకాశంలో మేఘాలు తొలగిపోయాయి. వెయ్యి నక్షత్రాలు ఒకేసారి మెరిశాయి!

అవి నీ కోసమే మెరుస్తున్నాయి చిట్టీ అని తల్లి ఏనుగు చెప్పింది.

ఆ రాత్రి చిట్టి నక్షత్రాల కింద హాయిగా నిద్రపోయింది. మంచి పని చేసినప్పుడు హృదయం వెలుతురులా ప్రకాశిస్తుంది, కన్నా.

నువ్వు కూడా ఇప్పుడు నిద్రపో. రేపు మరో కథ చెప్తాను."""

EMOTION_STORY = """అనగనగా ఒక అడవిలో, కన్నా, ఒక చిన్న కుందేలు పిల్ల ఉండేది. దాని పేరు చిట్టి.

చిట్టికి ప్రతి రాత్రి నక్షత్రాలు చూడడం చాలా ఇష్టం. కానీ ఆ రాత్రి ఆకాశం మేఘాలతో నిండిపోయింది. ఒక్క నక్షత్రం కూడా కనిపించలేదు.

నా నక్షత్రాలు ఎక్కడికి వెళ్ళాయి అని చిట్టి దుఃఖంగా అడిగింది. <sad>

అప్పుడు అడవి నుండి ఒక పెద్ద శబ్దం వచ్చింది. గుండె ఆగేంత భయంకరమైన శబ్దం. చిట్టి వణికిపోయింది. చెట్టు చాటున దాక్కుంది. <fear>

కన్నా, తెలుసా? ఆ శబ్దం ఏమిటో? అది ఒక పెద్ద ఏనుగు తన పిల్లను పిలుస్తున్న శబ్దం!

ఏనుగు పిల్ల అడవిలో తప్పిపోయింది. అది ఏడుస్తూ అటు ఇటు తిరుగుతోంది. <sad>

చిట్టి మెల్లగా బయటకు వచ్చింది. భయపడకు, నేను సహాయం చేస్తాను అని గట్టిగా అరిచింది. <happy>

చూడు అని చిట్టి అడవి మొత్తం గంతులు వేస్తూ పరిగెత్తింది. దారిపొడవునా తన అడుగుల గుర్తులు వదిలింది. <happy>

తల్లి ఏనుగు ఆ గుర్తులు చూసి పరిగెత్తుకు వచ్చింది. తన పిల్లను చూసి ఆనందంతో కళ్ళనీళ్ళు పెట్టుకుంది. <happy>

కన్నా, అప్పుడు ఏమైందో తెలుసా? ఆకాశంలో మేఘాలు తొలగిపోయాయి. వెయ్యి నక్షత్రాలు ఒకేసారి మెరిశాయి! <happy>

అవి నీ కోసమే మెరుస్తున్నాయి చిట్టీ అని తల్లి ఏనుగు చెప్పింది. <happy>

ఆ రాత్రి చిట్టి నక్షత్రాల కింద హాయిగా నిద్రపోయింది. మంచి పని చేసినప్పుడు హృదయం వెలుతురులా ప్రకాశిస్తుంది, కన్నా.

నువ్వు కూడా ఇప్పుడు నిద్రపో. రేపు మరో కథ చెప్తాను."""

# ── FIX PROTOBUF + NUMPY BEFORE ANY TRANSFORMERS IMPORT ──────
import subprocess, sys

subprocess.check_call([sys.executable, "-m", "pip", "install", "-q",
                       "--force-reinstall", "protobuf>=4.25.0", "numpy<2.0"])

# Flush cached modules so fresh versions load on next import
for _mod in list(sys.modules.keys()):
    if any(x in _mod for x in ("protobuf", "google.protobuf", "transformers", "numpy")):
        del sys.modules[_mod]

print("✓ protobuf + numpy fixed")

# ── CLOUDINARY UPLOAD HELPER ─────────────────────────────────
import io, numpy as np, soundfile as sf
import cloudinary, cloudinary.uploader
from pydub import AudioSegment

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
)

def upload_audio(audio_np, sample_rate, public_id):
    wav_buf = io.BytesIO()
    sf.write(wav_buf, audio_np.astype(np.float32), sample_rate, format="WAV")
    wav_buf.seek(0)
    mp3_buf = io.BytesIO()
    AudioSegment.from_wav(wav_buf).export(mp3_buf, format="mp3", bitrate="64k")
    mp3_buf.seek(0)
    result = cloudinary.uploader.upload(
        mp3_buf, public_id=public_id, resource_type="raw", overwrite=True
    )
    return result["secure_url"]

results = {}

# ════════════════════════════════════════════════════════════
# MODEL 1 — ai4bharat/indic-parler-tts
# ════════════════════════════════════════════════════════════
print("\n" + "="*60)
print("MODEL 1: indic-parler-tts (Lalitha voice)")
print("="*60)

try:
    import torch, nltk
    from transformers import AutoTokenizer
    from parler_tts import ParlerTTSForConditionalGeneration
    from nltk import sent_tokenize

    nltk.download("punkt_tab", quiet=True)
    nltk.download("punkt", quiet=True)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 if device == "cuda" else torch.float32

    m1 = ParlerTTSForConditionalGeneration.from_pretrained(
        "ai4bharat/indic-parler-tts",
        token=HF_TOKEN or None,
        attn_implementation="eager",
        torch_dtype=dtype,
    ).to(device)
    tok1      = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts", token=HF_TOKEN or None)
    desc_tok1 = AutoTokenizer.from_pretrained(m1.config.text_encoder._name_or_path, token=HF_TOKEN or None)
    SR1       = m1.config.sampling_rate

    DESCRIPTION = (
        "Lalitha speaks with a warm, calm tone in a very close-sounding environment. "
        "Her voice is clear and natural, with subtle emotional depth, slightly slow pace, "
        "and balanced pitch. Very high quality recording, no background noise."
    )

    def gen_parler(text):
        desc_in   = desc_tok1(DESCRIPTION, return_tensors="pt").to(device)
        sentences = sent_tokenize(text)
        chunk, chunks = "", []
        for s in sentences:
            candidate = (chunk + " " + s).strip()
            if len(candidate.split()) >= 25:
                if chunk: chunks.append(chunk)
                chunk = s
            else:
                chunk = candidate
        if chunk: chunks.append(chunk)
        parts = []
        with torch.inference_mode():
            for c in chunks:
                p_in = tok1(c, return_tensors="pt").to(device)
                gen  = m1.generate(
                    input_ids=desc_in.input_ids,
                    attention_mask=desc_in.attention_mask,
                    prompt_input_ids=p_in.input_ids,
                    prompt_attention_mask=p_in.attention_mask,
                    do_sample=True,
                    return_dict_in_generate=True,
                )
                audio = gen.sequences[0, :gen.audios_length[0]]
                parts.append(audio.float().cpu().numpy().squeeze())
        return np.concatenate(parts) if parts else np.zeros(100)

    audio1 = gen_parler(PLAIN_STORY)
    url1   = upload_audio(audio1, SR1, "tts-compare/model1_indic_parler")
    results["Model 1 — indic-parler-tts (Lalitha)"] = url1
    print(f"✓ Done  |  {len(audio1)/SR1:.0f}s")
    print(f"  {url1}")
    del m1; torch.cuda.empty_cache()

except Exception as e:
    print(f"✗ Failed: {e}")
    results["Model 1 — indic-parler-tts (Lalitha)"] = f"FAILED: {e}"


# ════════════════════════════════════════════════════════════
# MODEL 2 — kenpath/svara-tts-v1 (emotion tags)
# ════════════════════════════════════════════════════════════
print("\n" + "="*60)
print("MODEL 2: svara-tts-v1 (emotion tags)")
print("="*60)

try:
    import torch
    from transformers import pipeline

    pipe2 = pipeline(
        "text-to-speech",
        model="kenpath/svara-tts-v1",
        token=HF_TOKEN or None,
        device=0 if torch.cuda.is_available() else -1,
    )
    out2   = pipe2(EMOTION_STORY)
    audio2 = np.array(out2["audio"]).squeeze()
    SR2    = out2["sampling_rate"]

    url2 = upload_audio(audio2, SR2, "tts-compare/model2_svara_tts")
    results["Model 2 — svara-tts (emotion tags)"] = url2
    print(f"✓ Done  |  {len(audio2)/SR2:.0f}s")
    print(f"  {url2}")
    del pipe2; torch.cuda.empty_cache()

except Exception as e:
    print(f"✗ Failed: {e}")
    results["Model 2 — svara-tts (emotion tags)"] = f"FAILED: {e}"


# ════════════════════════════════════════════════════════════
# MODEL 3 — ai4bharat/IndicF5 (voice cloning)
# ════════════════════════════════════════════════════════════
print("\n" + "="*60)
print("MODEL 3: IndicF5 (voice cloning)")
print("="*60)

try:
    import torch, urllib.request
    from transformers import AutoModel

    REF_URL  = "https://huggingface.co/ai4bharat/IndicF5/resolve/main/prompts/PAN_F_HAPPY_00001.wav"
    REF_TEXT = "ਭਹੰਪੀ ਵਿੱਚ ਸਮਾਰਕਾਂ ਦੇ ਭਵਨ ਨਿਰਮਾਣ ਕਲਾ ਦੀਆਂ ਉੱਤਮ ਉਦਾਹਰਣਾਂ ਹਨ।"
    ref_path = "/tmp/indicf5_ref.wav"

    headers = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}
    req = urllib.request.Request(REF_URL, headers=headers)
    with urllib.request.urlopen(req) as r, open(ref_path, "wb") as f:
        f.write(r.read())
    print("✓ Reference audio downloaded")

    model3 = AutoModel.from_pretrained(
        "ai4bharat/IndicF5",
        trust_remote_code=True,
        token=HF_TOKEN or None,
    )
    audio3 = model3(PLAIN_STORY, ref_audio_path=ref_path, ref_text=REF_TEXT)
    audio3 = np.array(audio3, dtype=np.float32)
    if audio3.max() > 1.0:
        audio3 = audio3 / 32768.0
    SR3 = 24000

    url3 = upload_audio(audio3, SR3, "tts-compare/model3_indicf5")
    results["Model 3 — IndicF5 (voice clone)"] = url3
    print(f"✓ Done  |  {len(audio3)/SR3:.0f}s")
    print(f"  {url3}")
    del model3; torch.cuda.empty_cache()

except Exception as e:
    print(f"✗ Failed: {e}")
    results["Model 3 — IndicF5 (voice clone)"] = f"FAILED: {e}"


# ── SUMMARY ──────────────────────────────────────────────────
print("\n" + "="*60)
print("ALL RESULTS")
print("="*60)
for name, url in results.items():
    print(f"\n{name}\n  {url}")
