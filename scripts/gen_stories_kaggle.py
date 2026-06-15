# ============================================================
# KAHANIYAAN — Story Generation Script (v6: Qwen3-8B)
#
# Model: Qwen/Qwen3-8B
#   - 8B params, 4-bit NF4 ≈ 5GB VRAM after load
#   - Loading peak: ~16GB (fits single T4 — no OOM)
#   - Strong Hindi + Telugu/Tamil/Kannada multilingual quality
#   - 32K context, ~2-4 min per story
#   - Thinking mode disabled (/no_think) for clean JSON output
#
# Why not 14B? bitsandbytes loads fp16 first then quantizes.
# 14B × 2 bytes = 28GB loading peak → squeezed T4 x2 → OOM.
# 8B × 2 bytes = 16GB loading peak → fits one T4 with headroom.
#
# Run on Kaggle:
#   Settings → Accelerator → GPU T4 x2
#   Settings → Internet → ON
#   Set LANGUAGE_FILTER below → Save Version → close laptop
#
# Schedule:
#   Session 1: ["Telugu", "Hindi"]   ~8h
#   Session 2: ["Tamil", "Kannada"]  ~8h
#   Session 3: ["English"]           ~4h
# ============================================================

SUPABASE_URL         = "YOUR_SUPABASE_URL"          # e.g. https://xxxx.supabase.co
SUPABASE_SERVICE_KEY = "YOUR_SUPABASE_SERVICE_KEY"  # Settings → API → service_role key
HF_TOKEN             = ""                            # optional, leave blank if model is public

LANGUAGE_FILTER = ["Telugu", "Hindi"]

TARGET_PER_SLOT = 30
AGE_GROUP       = "5-6"

LANGUAGES = {
    "Telugu":  {"term": "కన్నా",   "native": "Telugu (తెలుగు)"},
    "Hindi":   {"term": "बेटा",    "native": "Hindi (हिंदी)"},
    "Tamil":   {"term": "கண்ணு",  "native": "Tamil (தமிழ்)"},
    "Kannada": {"term": "ಮುದ್ದು", "native": "Kannada (ಕನ್ನಡ)"},
    "English": {"term": "sweetie", "native": "English"},
}

THEMES = [
    "Panchatantra", "Birbal", "Tenali Raman", "Festival",
    "Moral Story", "Jataka Tales", "Grandma Stories", "Nature & Animals",
]

THEME_CONTEXT = {
    "Panchatantra":    "Ancient Indian animal fables where clever animals teach wisdom. Animals talk and scheme.",
    "Birbal":          "Mughal court stories. Emperor Akbar poses tricky questions; witty minister Birbal solves them with clever wordplay.",
    "Tenali Raman":    "South Indian court of King Krishnadevaraya. Clever jester Tenali Raman outsmarts greedy courtiers and pompous priests.",
    "Festival":        "Indian festivals (Diwali, Pongal, Ugadi, Onam, Holi, etc.) — stories where the festival itself plays a central role.",
    "Moral Story":     "Original stories set in Indian villages, forests, or towns. Everyday characters learning life lessons through experience.",
    "Jataka Tales":    "Buddhist birth stories of the Bodhisattva (often as an animal). Compassion, wisdom, and selflessness as core themes.",
    "Grandma Stories": "A grandmother narrates personal family memories or local legends to grandchildren sitting beside her at night.",
    "Nature & Animals":"Stories set in Indian forests, rivers, farms. Animals, birds, insects as main characters learning from nature.",
}

# ── INSTALL ──────────────────────────────────────────────────
import subprocess, sys

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

install("supabase")
install("transformers")
install("accelerate")
install("bitsandbytes")
print("✓ Packages installed")

# ── IMPORTS ──────────────────────────────────────────────────
import json, time, torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from supabase import create_client

sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
print("✓ Supabase connected")

# ── LOAD MODEL ───────────────────────────────────────────────
MODEL_ID = "Qwen/Qwen3-8B"
print(f"Loading {MODEL_ID} in 4-bit NF4...")

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.bfloat16,  # Qwen3 prefers bfloat16
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
)

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, token=HF_TOKEN or None)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=bnb_config,
    device_map="auto",
    token=HF_TOKEN or None,
)
model.eval()
print("✓ Model loaded")

# ── PROMPT BUILDER ───────────────────────────────────────────
def build_prompt(lang_native, term, theme, theme_ctx, existing_titles):
    avoid = ", ".join(f'"{t}"' for t in existing_titles[-20:]) or "none yet"
    instruction = (
        f"Write a children's bedtime story in {lang_native}.\n\n"
        f"Theme: {theme}\n"
        f"Theme context: {theme_ctx}\n"
        f"Address the child listener as \"{term}\" — use it naturally at least 4 times.\n"
        f"Target length: 8000–9000 characters.\n"
        f"Age group: 5–8 years.\n\n"
        f"Story rules:\n"
        f"- 5-beat arc: vivid sensory hook → clear problem → 3 rising complications → climax → warm resolution\n"
        f"- Short punchy sentences at tense moments; long flowing sentences at calm moments\n"
        f"- Rich sensory detail: smells, sounds, textures, colours specific to Indian settings\n"
        f"- Moral emerges from the character's own realisation — never state it as a lecture\n"
        f"- Narrator voice: warm grandmother telling this story from memory\n"
        f"- Paragraphs separated by \\n\\n (escaped newlines, not actual line breaks)\n"
        f"- Wrap 3–5 key story words in <strong>word</strong> tags\n"
        f"- Use \"{term}\" directly — no placeholder text\n"
        f"- Avoid these already-written titles: {avoid}\n\n"
        f"CRITICAL JSON rules — failure to follow these causes an error:\n"
        f"- Return ONLY a single valid JSON object. No markdown, no code fences, no explanation.\n"
        f"- Do NOT use double-quote characters (\") anywhere inside the title, body, or moral text.\n"
        f"  For character dialogue or emphasis use single quotes (') instead.\n"
        f"- All newlines inside the body MUST be written as the two characters \\n (backslash + n),\n"
        f"  NOT as actual line breaks.\n"
        f"- The JSON must be parseable by Python's json.loads() with no modification.\n\n"
        f"Output format (copy this structure exactly):\n"
        f'{{"title": "story title in {lang_native}", '
        f'"body": "full story text using \\\\n\\\\n between paragraphs", '
        f'"moral": "one sentence moral in {lang_native}"}}'
    )

    messages = [
        {
            "role": "system",
            "content": (
                f"You are a master children's storyteller specialising in {lang_native} literature. "
                "You write warm, vivid, emotionally resonant bedtime stories in grandmother narration style. "
                "You ALWAYS return a single valid JSON object with no extra text before or after it. "
                "You NEVER use double-quote characters inside string values — you use single quotes for dialogue."
            ),
        },
        # /no_think disables Qwen3 chain-of-thought → clean JSON output, 2x faster
        {"role": "user", "content": "/no_think\n\n" + instruction},
    ]
    return tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True, enable_thinking=False
    )

# ── JSON PARSER (multi-strategy, handles malformed output) ────
import re as _re

def parse_story_response(text):
    start = text.find("{")
    end   = text.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError("No JSON object found in response")
    raw = text[start:end]

    # Strategy 1 — direct parse
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass

    # Strategy 2 — escape bare newlines that sit inside string values
    try:
        fixed = _re.sub(
            r'("(?:[^"\\]|\\.)*")',
            lambda m: m.group(0).replace('\n', '\\n').replace('\r', ''),
            raw,
            flags=_re.DOTALL,
        )
        return json.loads(fixed)
    except json.JSONDecodeError:
        pass

    # Strategy 3 — brute-force replace all bare newlines
    try:
        return json.loads(raw.replace('\r\n', '\\n').replace('\r', '\\n').replace('\n', '\\n'))
    except json.JSONDecodeError:
        pass

    # Strategy 4 — regex field extraction (works on very broken JSON)
    result = {}
    for key in ('title', 'body', 'moral'):
        m = _re.search(
            rf'"{key}"\s*:\s*"((?:[^"\\]|\\.|\n)*?)"(?=\s*[,}}])',
            raw, _re.DOTALL,
        )
        if m:
            result[key] = m.group(1).replace('\\n', '\n').strip()

    if all(k in result for k in ('title', 'body', 'moral')):
        return result

    raise ValueError(f"All parse strategies failed. Keys recovered: {list(result.keys())}")

# ── GENERATION ───────────────────────────────────────────────
@torch.inference_mode()
def generate_story(lang_info, theme, language):
    existing_res = sb.table("story_templates") \
        .select("title") \
        .eq("language", language) \
        .eq("theme", theme) \
        .execute()
    existing_titles = [r["title"] for r in existing_res.data]

    prompt = build_prompt(
        lang_info["native"],
        lang_info["term"],
        theme,
        THEME_CONTEXT[theme],
        existing_titles,
    )

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    torch.cuda.empty_cache()
    output = model.generate(
        **inputs,
        max_new_tokens=6000,    # Qwen3 tokens are efficient; 6k → ~9000 chars
        do_sample=True,
        temperature=0.7,        # Qwen3 is expressive; lower temp = tighter JSON
        top_p=0.9,
        top_k=20,               # Qwen3 recommended setting
        repetition_penalty=1.05,
        pad_token_id=tokenizer.eos_token_id,
    )

    raw = tokenizer.decode(
        output[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True
    )
    return parse_story_response(raw)

# ── MAIN LOOP ────────────────────────────────────────────────
if isinstance(LANGUAGE_FILTER, str):
    LANGUAGE_FILTER = [LANGUAGE_FILTER]

total_written = 0
total_failed  = 0

for language in LANGUAGE_FILTER:
    lang_info = LANGUAGES[language]
    print(f"\n{'='*60}")
    print(f"Language: {language}  |  Term: {lang_info['term']}")
    print(f"{'='*60}")

    for theme in THEMES:
        existing_res = sb.table("story_templates") \
            .select("id") \
            .eq("language", language) \
            .eq("theme", theme) \
            .execute()
        already = len(existing_res.data)
        needed  = TARGET_PER_SLOT - already

        print(f"\n── {theme} ── ({already} exist, need {needed} more)")

        for i in range(needed):
            attempt = 0
            success = False
            while attempt < 3 and not success:
                try:
                    t0   = time.time()
                    data = generate_story(lang_info, theme, language)

                    if not all(k in data for k in ("title", "body", "moral")):
                        raise ValueError(f"Missing keys: {list(data.keys())}")

                    body_len = len(data["body"])
                    if body_len < 5000:
                        raise ValueError(f"Body too short: {body_len} chars")

                    sb.table("story_templates").insert({
                        "title":             data["title"],
                        "body":              data["body"],
                        "moral":             data["moral"],
                        "language":          language,
                        "theme":             theme,
                        "age_group":         AGE_GROUP,
                        "reading_time_mins": 8,
                    }).execute()

                    total_written += 1
                    success = True
                    elapsed = time.time() - t0
                    print(f"  ✓ [{i+1}/{needed}] {data['title'][:60]}  ({body_len} chars, {elapsed:.0f}s)")

                except Exception as e:
                    attempt += 1
                    print(f"  ✗ attempt {attempt}/3 failed: {e}")
                    if attempt < 3:
                        time.sleep(5 * attempt)

            if not success:
                total_failed += 1
                print(f"  ✗ [{i+1}/{needed}] SKIPPED after 3 failures")

print(f"\n{'='*60}")
print(f"SESSION COMPLETE — {', '.join(LANGUAGE_FILTER)}")
print(f"  Written : {total_written}")
print(f"  Failed  : {total_failed}")
print(f"{'='*60}")
