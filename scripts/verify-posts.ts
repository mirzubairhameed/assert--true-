/**
 * Verify the QA Learning Library data: exactly 100 posts, unique ids/nums/titles,
 * correct categories, valid difficulty, sensible dates/reads, block integrity.
 * Run: bun run scripts/verify-posts.ts
 */
import { ARCHIVE_DRAFTS, CATEGORIES, POSTS, type Post } from "../src/data/posts";
import { readdirSync } from "node:fs";
import { join } from "node:path";

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error("FAIL:", msg);
};

// 1. Count
if (POSTS.length !== 100) fail(`POSTS.length = ${POSTS.length}, expected 100`);
console.log(`POSTS: ${POSTS.length}`);

// 2. Uniqueness
const ids = new Set<string>(), nums = new Set<string>(), titles = new Set<string>();
for (const p of POSTS) {
  if (ids.has(p.id)) fail(`duplicate id: ${p.id}`);
  if (nums.has(p.num)) fail(`duplicate num: ${p.num}`);
  if (titles.has(p.title)) fail(`duplicate title: ${p.title}`);
  ids.add(p.id); nums.add(p.num); titles.add(p.title);
}

// 3. Numbering 001..100 complete
const numSet = new Set(POSTS.map((p) => p.num));
for (let i = 1; i <= 100; i++) {
  const n = String(i).padStart(3, "0");
  if (!numSet.has(n)) fail(`missing num ${n}`);
}

// 4. Field integrity
for (const p of POSTS) {
  if (!(CATEGORIES as readonly string[]).includes(p.category)) fail(`${p.num} bad category: ${p.category}`);
  if (!["beginner", "intermediate", "advanced"].includes(p.difficulty)) fail(`${p.num} bad difficulty: ${p.difficulty}`);
  if (p.status !== "green") fail(`${p.num} status not green`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) fail(`${p.num} bad date: ${p.date}`);
  if (!/^\d+ min$/.test(p.read)) fail(`${p.num} bad read: ${p.read}`);
  if (p.dek.length < 60) fail(`${p.num} dek too short (${p.dek.length} chars)`);
  if (p.tags.length < 2 || p.tags.length > 4) fail(`${p.num} tags count: ${p.tags.length}`);
  if (!Array.isArray(p.body) || p.body.length < 8) fail(`${p.num} body too small: ${p.body.length} blocks`);
  // body words
  const words = p.body.reduce((acc, b) => {
    if (b.type === "p" || b.type === "h" || b.type === "quote") return acc + b.text.split(/\s+/).length;
    if (b.type === "ul") return acc + b.items.join(" ").split(/\s+/).length;
    return acc; // code blocks not counted
  }, 0);
  if (words < 500) fail(`${p.num} body words too few: ${words}`);
  // banned phrases
  const allText = JSON.stringify(p.body).toLowerCase();
  for (const banned of ["coming soon", "lorem ipsum", "fast-paced world", "tapestry", "game-changer"]) {
    if (allText.includes(banned)) fail(`${p.num} banned phrase: ${banned}`);
  }
  // emoji check
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(JSON.stringify(p))) fail(`${p.num} contains emoji`);
}

// 5. Code blocks valid langs
const validLangs = ["ts", "python", "yaml", "bash", "sql", "java", "json"];
for (const p of POSTS) {
  for (const b of p.body) {
    if (b.type === "code") {
      if (!validLangs.includes(b.lang)) fail(`${p.num} bad code lang ${b.lang}`);
      if (!b.label || b.code.length < 15) fail(`${p.num} weak code block (${b.label})`);
    }
  }
}

// 6. Technical articles must contain at least one code block
const technicalCats = ["API Testing", "SQL & Databases", "Playwright", "Cypress"];
for (const p of POSTS) {
  const hasCode = p.body.some((b) => b.type === "code");
  if (technicalCats.includes(p.category) && !hasCode) fail(`${p.num} (${p.category}) has no code block`);
}

// 7. Archive drafts unique vs posts
for (const d of ARCHIVE_DRAFTS) {
  if (numSet.has(d.num)) fail(`draft num collides with post: ${d.num}`);
}

// 8. Files on disk all imported
const dir = join(process.cwd(), "src/data/articles");
const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
console.log(`article files on disk: ${files.length}`);
if (files.length !== 23) fail(`expected 23 article files, found ${files.length}`);

// 9. Category distribution
const byCat = new Map<string, number>();
for (const p of POSTS) byCat.set(p.category, (byCat.get(p.category) ?? 0) + 1);
console.log("\nCategory distribution:");
for (const c of CATEGORIES) console.log(`  ${c.padEnd(24)} ${byCat.get(c) ?? 0}`);

const diff = new Map<string, number>();
for (const p of POSTS) diff.set(p.difficulty, (diff.get(p.difficulty) ?? 0) + 1);
console.log("\nDifficulty:", Object.fromEntries(diff));

const totalWords = POSTS.reduce((acc, p) => acc + p.body.reduce((a, b) => {
  if (b.type === "p" || b.type === "h" || b.type === "quote") return a + b.text.split(/\s+/).length;
  if (b.type === "ul") return a + b.items.join(" ").split(/\s+/).length;
  return a;
}, 0), 0);
console.log(`Total body words: ${totalWords.toLocaleString()}`);

if (failures > 0) {
  console.error(`\n${failures} FAILURES`);
  process.exit(1);
}
console.log("\nALL CHECKS PASSED — 100 valid, unique, complete articles.");
