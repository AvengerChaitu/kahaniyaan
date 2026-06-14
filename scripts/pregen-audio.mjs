import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = resolve(__dirname, "..", ".env.local");
const envContent = await readFile(envPath, "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const HF_API_BASE = "https://Chaitanyadasari99-daadima.hf.space";

const TERM_MAP = {
  Hindi: { term: "बेटा", script: "beta" },
  Telugu: { term: "బాబు", script: "babu" },
  Tamil: { term: "கண்ணு", script: "kannu" },
  Kannada: { term: "ಮುದ್ದು", script: "muddu" },
  Malayalam: { term: "കുഞ്ഞേ", script: "kunje" },
  Marathi: { term: "बाळ", script: "baal" },
  Bengali: { term: "সোনা", script: "shona" },
  Gujarati: { term: "બેટા", script: "beta" },
  Punjabi: { term: "ਪੁੱਤ", script: "putt" },
  English: { term: "sweetie", script: "sweetie" },
};

function getTerm(language) {
  return TERM_MAP[language]?.term || "beta";
}

function hashKey(text, lang) {
  return createHash("md5").update(`${lang}:${text}`).digest("hex");
}

function splitChunks(text, maxWords = 30) {
  const sentences = text
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const chunks = [];
  for (const s of sentences) {
    const words = s.split(/\s+/);
    if (words.length <= maxWords) {
      chunks.push(s);
    } else {
      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
      }
    }
  }
  return chunks;
}

function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: publicId, resource_type: "raw" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}

async function checkExists(publicId) {
  try {
    await cloudinary.api.resource(publicId, { resource_type: "raw" });
    return true;
  } catch {
    return false;
  }
}

async function processTemplate(template) {
  const { title, body, language } = template;
  const term = getTerm(language);
  const ttsBody = body.replace(/\{childname\}/g, term);
  const ttsTitle = title.replace(/\{childname\}/g, term);
  const fullText = `${ttsTitle}. ${ttsBody}`;
  const chunks = splitChunks(fullText.replace(/<[^>]*>/g, ""));
  const results = [];

  for (const chunk of chunks) {
    const h = hashKey(chunk, language);
    const publicId = `tts/${language}/${h}`;

    const exists = await checkExists(publicId);
    if (exists) {
      results.push({ chunk, publicId, cached: true });
      continue;
    }

    process.stdout.write(`  Generating: "${chunk.slice(0, 50)}..." `);
    try {
      const url = `${HF_API_BASE}/tts?text=${encodeURIComponent(chunk)}&lang=${encodeURIComponent(language)}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`FAILED (${res.status})`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const uploadedUrl = await uploadToCloudinary(buffer, publicId);
      results.push({ chunk, publicId, url: uploadedUrl, cached: false });
      console.log("OK");
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  return results;
}

const { data: templates, error } = await supabase
  .from("story_templates")
  .select("*");

if (error) {
  console.error("Failed to fetch templates:", error);
  process.exit(1);
}

console.log(`\nFound ${templates.length} templates. Starting pre-generation...\n`);

let totalChunks = 0;
let cachedChunks = 0;
let newChunks = 0;

for (const template of templates) {
  console.log(`\n[${template.language}] ${template.title} (age: ${template.age_group}, theme: ${template.theme})`);
  const results = await processTemplate(template);
  totalChunks += results.length;
  cachedChunks += results.filter((r) => r.cached).length;
  newChunks += results.filter((r) => !r.cached).length;
}

console.log(`\n=== Done ===`);
console.log(`Templates processed: ${templates.length}`);
console.log(`Total chunks: ${totalChunks}`);
console.log(`Cached: ${cachedChunks}`);
console.log(`Newly generated: ${newChunks}`);
process.exit(0);
