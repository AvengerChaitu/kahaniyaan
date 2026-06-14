import { readFileSync, writeFileSync, existsSync } from "fs";

const file = process.argv[2];
const action = process.argv[3];

if (!file || !action) {
  console.log("Usage:");
  console.log("  node scripts/build-stories.mjs <file.json> init");
  console.log("  node scripts/build-stories.mjs <file.json> add '{\"title\":...,\"body\":...,\"moral\":...}'");
  console.log("  node scripts/build-stories.mjs <file.json> count");
  process.exit(1);
}

if (action === "init") {
  writeFileSync(file, "[]\n", "utf8");
  console.log(`Initialized ${file}`);
} else if (action === "add") {
  const storyRaw = process.argv[4];
  if (!storyRaw) { console.error("Missing story JSON"); process.exit(1); }
  const story = JSON.parse(storyRaw);
  const existing = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  existing.push(story);
  writeFileSync(file, JSON.stringify(existing, null, 2), "utf8");
  console.log(`Added story ${existing.length}: ${story.title}`);
} else if (action === "count") {
  const existing = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  console.log(`Stories in ${file}: ${existing.length}`);
}
