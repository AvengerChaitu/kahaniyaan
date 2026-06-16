# ============================================================
# KAHANIYAAN — Story Generation Script (v9: Qwen2.5-7B-Instruct-AWQ)
#
# Model: Qwen/Qwen2.5-7B-Instruct-AWQ  (official pre-quantized INT4)
#   - AWQ INT4 = ~4GB on GPU — fits single T4 (16GB) with 12GB headroom
#   - No bitsandbytes, no custom architecture — transformers native AWQ
#   - No thinking mode (Qwen2.5, not Qwen3) — clean JSON output
#   - 29+ languages incl. Hindi, Telugu, Tamil, Kannada
#   - 128K context window
#
# Run on Kaggle:
#   Settings → Accelerator → GPU T4 x2
#   Settings → Internet → ON
#   Set LANGUAGE_FILTER below → Save Version → close laptop
#
# Schedule:
#   Session 1: ["Telugu", "Hindi"]   ~10h
#   Session 2: ["Tamil", "Kannada"]  ~10h
#   Session 3: ["English"]           ~5h
# ============================================================

SUPABASE_URL         = "YOUR_SUPABASE_URL"          # e.g. https://xxxx.supabase.co
SUPABASE_SERVICE_KEY = "YOUR_SUPABASE_SERVICE_KEY"  # Settings → API → service_role key
HF_TOKEN             = ""                            # optional

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
import subprocess, sys, importlib

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", pkg])

# gptqmodel must be installed before transformers is imported
install("gptqmodel")
importlib.invalidate_caches()

install("supabase")
install("transformers>=4.45.0")
install("accelerate")

print("✓ Packages installed")

# ── IMPORTS ──────────────────────────────────────────────────
import json, time, re as _re, torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from supabase import create_client

sb = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
print("✓ Supabase connected")

# ── LOAD MODEL ───────────────────────────────────────────────
MODEL_ID = "Qwen/Qwen2.5-7B-Instruct-AWQ"
print(f"Loading {MODEL_ID} (~4GB pre-quantized AWQ)...")

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, token=HF_TOKEN or None)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    device_map={"": 0},   # single GPU, ~4GB — 12GB free for generation
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
        f"- Use \"{term}\" directly — no placeholder text\n"
        f"- Avoid these already-written titles: {avoid}\n\n"
        f"Output format — use EXACTLY these three markers on their own lines:\n"
        f"TITLE: <story title in {lang_native}>\n"
        f"BODY:\n"
        f"<full story text, paragraphs separated by blank lines>\n"
        f"MORAL: <one sentence moral in {lang_native}>"
    )

    messages = [
        {
            "role": "system",
            "content": (
                f"You are a master children's storyteller specialising in {lang_native} literature. "
                "You write warm, vivid, emotionally resonant bedtime stories in grandmother narration style. "
                "You output ONLY the story using the TITLE/BODY/MORAL markers — no JSON, no code fences, no extra text."
            ),
        },
        {"role": "user", "content": instruction},
    ]

    try:
        return tokenizer.apply_chat_template(
            messages, tokenize=False, add_generation_prompt=True
        )
    except Exception:
        sys_msg = messages[0]["content"]
        usr_msg = messages[1]["content"]
        return f"<|system|>\n{sys_msg}\n<|user|>\n{usr_msg}\n<|assistant|>\n"

# ── PLAIN TEXT PARSER ────────────────────────────────────────
def parse_story_response(text):
    text = text.strip()

    # Extract TITLE
    title = ""
    m = _re.search(r'TITLE:\s*(.+)', text)
    if m:
        title = m.group(1).strip()

    # Extract MORAL
    moral = ""
    m = _re.search(r'MORAL:\s*(.+)', text)
    if m:
        moral = m.group(1).strip()

    # Extract BODY (between BODY: and MORAL:)
    body = ""
    m = _re.search(r'BODY:\s*\n(.*?)(?=\nMORAL:|\Z)', text, _re.DOTALL)
    if m:
        body = m.group(1).strip()

    # Fallback: if no markers found, use full text as body
    if not body:
        lines = text.split('\n')
        title = title or lines[0].strip()[:80]
        body  = text

    if not title:
        title = "Untitled Story"

    return {"title": title, "body": body, "moral": moral}

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

    inputs = tokenizer(prompt, return_tensors="pt").to("cuda:0")

    torch.cuda.empty_cache()
    output = model.generate(
        **inputs,
        max_new_tokens=8000,
        do_sample=True,
        temperature=0.75,
        top_p=0.9,
        repetition_penalty=1.1,
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
                    if body_len < 500:
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
