import { createHash } from "crypto";
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { v2 as cloudinary } from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──
const HF_API_BASE = "https://Chaitanyadasari99-daadima.hf.space";
const CHUNK_MAX_WORDS = 30;
const BATCH_SIZE = 15;
const FFMPEG_PATH = resolve(__dirname, "../ffmpeg-temp/ffmpeg-8.1.1-essentials_build/bin/ffmpeg.exe");
const CHECKPOINT_FILE = resolve(__dirname, "../.pregen-checkpoint.json");

const envRaw = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n").filter(Boolean).map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
const LANG = "Telugu";
const THEMES = ["Panchatantra", "Birbal", "Tenali Raman", "Festival", "Moral Story"];
const STORIES_DIR = resolve(__dirname, `stories/${LANG.toLowerCase()}`);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// ── Helpers ──
function hashKey(text) {
  return createHash("md5").update(`${LANG}:${text}`).digest("hex");
}

function splitChunks(text) {
  const sentences = text.split(/(?<=[.!?।])\s+/).map(s => s.trim()).filter(s => s.length > 0);
  const chunks = [];
  for (const s of sentences) {
    const words = s.split(/\s+/);
    if (words.length <= CHUNK_MAX_WORDS) { chunks.push(s); }
    else {
      for (let i = 0; i < words.length; i += CHUNK_MAX_WORDS) {
        chunks.push(words.slice(i, i + CHUNK_MAX_WORDS).join(" "));
      }
    }
  }
  return chunks;
}

function getTtsUrl(body) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/tts/${LANG}/${hashKey(body)}.mp3`;
}

function cloudinaryPublicId(body) {
  return `tts/${LANG}/${hashKey(body)}`;
}

async function chunkExists(body) {
  try {
    await cloudinary.api.resource(cloudinaryPublicId(body), { resource_type: "raw" });
    return true;
  } catch { return false; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Process 1 story ──
async function processStory(story, index, total) {
  const { title, body } = story;
  const shortTitle = title.replace(/\{childname\}/g, "Child").slice(0, 40);

  // Check if already cached
  if (await chunkExists(body)) {
    console.log(`  [${index}/${total}] ✓ Cached — ${shortTitle}`);
    return { status: "cached", url: getTtsUrl(body) };
  }

  console.log(`  [${index}/${total}] Generating — ${shortTitle}`);

  const chunks = splitChunks(body);
  console.log(`    → ${chunks.length} chunks`);

  const chunkPaths = [];
  const workDir = resolve(tmpdir(), "pregen-tts-" + Date.now());
  mkdirSync(workDir, { recursive: true });

  try {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkPath = resolve(workDir, `chunk-${i}.wav`);
      const hfUrl = `${HF_API_BASE}/tts?text=${encodeURIComponent(chunk)}&lang=${encodeURIComponent(LANG)}`;

      process.stdout.write(`    Chunk ${i + 1}/${chunks.length}... `);
      const start = Date.now();

      const res = await fetch(hfUrl);
      if (!res.ok) throw new Error(`HF Space returned ${res.status} for chunk ${i}`);

      const arrayBuffer = await res.arrayBuffer();
      writeFileSync(chunkPath, Buffer.from(arrayBuffer));
      const elapsed = ((Date.now() - start) / 1000).toFixed(0);
      console.log(`${(fsize(chunkPath) / 1024).toFixed(0)}KB (${elapsed}s)`);
      chunkPaths.push(chunkPath);

      // Small delay between chunks to let model breathe
      if (i < chunks.length - 1) await sleep(1000);
    }

    // Merge & convert to 128kbps MP3
    const mergedPath = resolve(workDir, "merged.mp3");
    console.log(`    Merging ${chunkPaths.length} chunks → 128kbps MP3...`);

    // Create concat list
    const listPath = resolve(workDir, "concat.txt");
    const listContent = chunkPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join("\n");
    writeFileSync(listPath, listContent);

    const cmd = `"${FFMPEG_PATH}" -y -f concat -safe 0 -i "${listPath}" -c:a libmp3lame -b:a 128k -ar 24000 -ac 1 "${mergedPath}"`;
    execSync(cmd, { stdio: "pipe", timeout: 120000 });

    // Upload to Cloudinary
    console.log(`    Uploading to Cloudinary...`);
    const mp3Buffer = readFileSync(mergedPath);
    const url = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: cloudinaryPublicId(body), resource_type: "raw" },
        (err, result) => { if (err) reject(err); else resolve(result.secure_url); }
      );
      const { Readable } = require("stream");
      Readable.from(mp3Buffer).pipe(stream);
    });

    console.log(`    ✓ Done — ${(fsize(mergedPath) / 1024 / 1024).toFixed(1)}MB`);
    return { status: "generated", url };

  } finally {
    // Cleanup temp files
    for (const p of chunkPaths) { try { unlinkSync(p); } catch {} }
    try { unlinkSync(resolve(workDir, "merged.mp3")); } catch {}
    try { unlinkSync(resolve(workDir, "concat.txt")); } catch {}
    try { rmSync(workDir, { recursive: true, force: true }); } catch {}
  }
}

function fsize(path) {
  try { return (readFileSync(path) || Buffer.alloc(0)).length; } catch { return 0; }
}

// Need proper rmSync
import { rmSync } from "fs";

// ── Main ──
async function main() {
  const batchArg = parseInt(process.argv[2] || "0");

  // Load all stories
  const allStories = [];
  for (const theme of THEMES) {
    const filePath = resolve(STORIES_DIR, `${theme}.json`);
    const stories = JSON.parse(readFileSync(filePath, "utf8"));
    stories.forEach(s => allStories.push({ ...s, theme }));
  }
  console.log(`Loaded ${allStories.length} stories total`);

  // Determine batch range
  const startIdx = batchArg * BATCH_SIZE;
  const endIdx = Math.min(startIdx + BATCH_SIZE, allStories.length);
  const batch = allStories.slice(startIdx, endIdx);

  console.log(`\nBatch ${batchArg}: stories ${startIdx + 1}–${endIdx} of ${allStories.length}\n`);

  const results = [];
  for (let i = 0; i < batch.length; i++) {
    const globalIdx = startIdx + i + 1;
    const result = await processStory(batch[i], globalIdx, allStories.length);
    results.push(result);

    // Save checkpoint
    writeFileSync(CHECKPOINT_FILE, JSON.stringify({
      batch: batchArg,
      completed: i + 1,
      total: batch.length,
      results,
      timestamp: new Date().toISOString(),
    }, null, 2));

    // Warm-up gap between stories
    if (i < batch.length - 1) await sleep(2000);
  }

  // Summary
  const cached = results.filter(r => r.status === "cached").length;
  const generated = results.filter(r => r.status === "generated").length;
  console.log(`\n✓ Batch ${batchArg} complete`);
  console.log(`  ${cached} cached, ${generated} generated`);
  console.log(`  Total: ${results.length} stories`);
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
