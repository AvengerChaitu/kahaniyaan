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
SYSTEM_MSG = lambda lang: (
    f"You are a master children's storyteller specialising in {lang} literature. "
    "You write warm, vivid, emotionally resonant bedtime stories in grandmother narration style. "
    "Output ONLY what is asked — no JSON, no code fences, no extra commentary."
)

def build_part_prompt(lang_native, term, theme, theme_ctx, part, prev_ending="", existing_titles=None):
    avoid = ", ".join(f'"{t}"' for t in (existing_titles or [])[-20:]) or "none yet"

    base_rules = (
        f"Story theme: {theme}\n"
        f"Theme context: {theme_ctx}\n"
        f"Address the child as \"{term}\" naturally.\n"
        f"Age group: 5–8 years. Narrator: warm grandmother voice.\n"
        f"Rich sensory detail — smells, sounds, colours of Indian settings.\n"
        f"Short punchy sentences at tense moments; flowing sentences at calm moments.\n"
    )

    if part == 1:
        instruction = (
            f"Write Part 1 of 4 of a children's bedtime story in {lang_native}.\n\n"
            + base_rules +
            f"Avoid these already-written titles: {avoid}\n\n"
            f"Part 1 must:\n"
            f"- Introduce the main character and setting vividly\n"
            f"- Establish the central problem or quest\n"
            f"- End with a gentle cliffhanger that makes the child eager for Part 2\n"
            f"- Be about 1800–2000 characters long\n\n"
            f"Output format:\n"
            f"TITLE: <story title in {lang_native}>\n"
            f"BODY:\n"
            f"<Part 1 story text>\n"
            f"HOOK: <one exciting sentence hinting at Part 2>"
        )
    elif part in (2, 3):
        instruction = (
            f"Continue the bedtime story in {lang_native}. This is Part {part} of 4.\n\n"
            f"The previous part ended with:\n\"{prev_ending}\"\n\n"
            + base_rules +
            f"Part {part} must:\n"
            f"- Continue naturally from where Part {part-1} ended\n"
            f"- {'Deepen the problem and add a complication' if part == 2 else 'Build to the climax — the most tense moment of the story'}\n"
            f"- End with a hook that makes the child need to hear Part {part+1}\n"
            f"- Be about 1800–2000 characters long\n\n"
            f"Output format:\n"
            f"BODY:\n"
            f"<Part {part} story text>\n"
            f"HOOK: <one exciting sentence hinting at Part {part+1}>"
        )
    else:  # part 4
        instruction = (
            f"Write the final part (Part 4 of 4) of the bedtime story in {lang_native}.\n\n"
            f"The previous part ended with:\n\"{prev_ending}\"\n\n"
            + base_rules +
            f"Part 4 must:\n"
            f"- Resolve all story threads warmly and satisfyingly\n"
            f"- Have the character learn their lesson through their own experience\n"
            f"- End with a gentle, sleepy, comforting closing\n"
            f"- Be about 1800–2000 characters long\n\n"
            f"Output format:\n"
            f"BODY:\n"
            f"<Part 4 story text>\n"
            f"MORAL: <one sentence moral in {lang_native}>"
        )

    messages = [
        {"role": "system", "content": SYSTEM_MSG(lang_native)},
        {"role": "user",   "content": instruction},
    ]
    try:
        return tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    except Exception:
        return f"<|system|>\n{SYSTEM_MSG(lang_native)}\n<|user|>\n{instruction}\n<|assistant|>\n"

# ── RAW GENERATION ───────────────────────────────────────────
@torch.inference_mode()
def generate_text(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda:0")
    torch.cuda.empty_cache()
    output = model.generate(
        **inputs,
        max_new_tokens=2000,
        do_sample=True,
        temperature=0.75,
        top_p=0.9,
        repetition_penalty=1.1,
        pad_token_id=tokenizer.eos_token_id,
    )
    return tokenizer.decode(output[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True).strip()

def extract_field(text, marker):
    m = _re.search(rf'{marker}:\s*\n?(.*?)(?=\n[A-Z]+:|\Z)', text, _re.DOTALL)
    return m.group(1).strip() if m else ""

# ── 4-PART STORY GENERATION ──────────────────────────────────
def generate_story(lang_info, theme, language):
    existing_res = sb.table("story_templates") \
        .select("title") \
        .eq("language", language) \
        .eq("theme", theme) \
        .execute()
    existing_titles = [r["title"] for r in existing_res.data]

    parts_text = []
    title  = ""
    moral  = ""
    hook   = ""

    for part in range(1, 5):
        print(f"    part {part}/4...", end=" ", flush=True)
        prompt = build_part_prompt(
            lang_info["native"], lang_info["term"],
            theme, THEME_CONTEXT[theme],
            part, prev_ending=hook,
            existing_titles=existing_titles if part == 1 else None,
        )
        raw = generate_text(prompt)

        if part == 1:
            title = extract_field(raw, "TITLE") or raw.split('\n')[0][:80]
        body_part = extract_field(raw, "BODY") or raw
        hook      = extract_field(raw, "HOOK") or raw[-200:]
        if part == 4:
            moral = extract_field(raw, "MORAL")

        parts_text.append(body_part)
        print(f"{len(body_part)} chars")

    full_body = "\n\n---\n\n".join(parts_text)
    return {"title": title or "Untitled Story", "body": full_body, "moral": moral}

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
