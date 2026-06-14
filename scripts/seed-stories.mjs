import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env.local manually
const envRaw = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n").filter(Boolean).map(line => {
    const idx = line.indexOf("=");
    return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
  })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];

async function deleteExisting(language) {
  const { count } = await supabase.from("story_templates").select("*", { count: "exact", head: true }).eq("language", language);
  if (count > 0) {
    const { error } = await supabase.from("story_templates").delete().eq("language", language);
    if (error) {
      console.error(`Failed to delete ${language} templates:`, error);
      process.exit(1);
    }
    console.log(`Deleted ${count} existing ${language} templates`);
  } else {
    console.log(`No existing ${language} templates to delete`);
  }
}

async function seed(language) {
  const dir = resolve(__dirname, `stories/${language.toLowerCase()}`);
  if (!existsSync(dir)) {
    console.log(`No story directory for ${language}, skipping`);
    return;
  }

  await deleteExisting(language);

  const files = readdirSync(dir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const theme = file.replace(".json", "");
    if (!THEMES.includes(theme)) {
      console.warn(`Unknown theme: ${theme}, skipping ${file}`);
      continue;
    }

    const content = JSON.parse(readFileSync(resolve(dir, file), "utf8"));

    if (!Array.isArray(content)) {
      console.error(`${file} must contain an array of stories`);
      continue;
    }

    const stories = content.map(s => ({
      title: s.title,
      body: s.body,
      language: language,
      theme: theme,
      moral: s.moral || "",
    }));

    const { error } = await supabase.from("story_templates").insert(stories);
    if (error) {
      console.error(`Failed to seed ${theme} for ${language}:`, error);
    } else {
      console.log(`Seeded ${stories.length} ${theme} stories for ${language}`);
    }
  }
}

const lang = process.argv[2];
if (!lang) {
  console.log("Usage: node scripts/seed-stories.mjs <Language>");
  console.log("Example: node scripts/seed-stories.mjs Telugu");
  process.exit(1);
}

seed(lang).catch(console.error);
