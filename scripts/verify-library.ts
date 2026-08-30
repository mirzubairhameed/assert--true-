import { POSTS, CATEGORIES, ARCHIVE_DRAFTS } from "../src/data/posts";

const expected: Record<string, number> = {
  "01-fundamentals-a.ts": 5,
  "01-fundamentals-b.ts": 5,
  "02-manual-a.ts": 5,
  "02-manual-b.ts": 4,
  "03-bugs-a.ts": 4,
  "03-bugs-b.ts": 3,
  "04-agile-a.ts": 4,
  "04-agile-b.ts": 4,
  "05-web-a.ts": 4,
  "05-web-b.ts": 4,
  "06-api-a.ts": 5,
  "06-api-b.ts": 5,
  "07-sql-a.ts": 4,
  "07-sql-b.ts": 4,
  "08-automation-a.ts": 4,
  "08-automation-b.ts": 4,
  "09-playwright.ts": 6,
  "10-cypress.ts": 5,
  "11-cicd-a.ts": 4,
  "11-cicd-b.ts": 3,
  "12-platforms-a.ts": 4,
  "12-platforms-b.ts": 3,
  "13-career.ts": 7,
};

console.log("=== POST COUNT ===");
console.log("Total posts:", POSTS.length, "(expected 100)");

const ids = new Set<string>();
const nums = new Set<string>();
const titles = new Set<string>();
let dupIds = 0, dupNums = 0, dupTitles = 0, emptyDeks = 0, shortBodies = 0, noTags = 0, badCategory = 0;

for (const p of POSTS) {
  if (ids.has(p.id)) { dupIds++; console.log("DUP id:", p.id); }
  if (nums.has(p.num)) { dupNums++; console.log("DUP num:", p.num); }
  if (titles.has(p.title.toLowerCase())) { dupTitles++; console.log("DUP title:", p.title); }
  ids.add(p.id); nums.add(p.num); titles.add(p.title.toLowerCase());
  if (!p.dek || p.dek.length < 30) emptyDeks++;
  const words = p.body.filter(b => b.type === "p").map(b => (b as any).text).join(" ").split(/\s+/).length;
  if (p.body.length < 8 || words < 150) shortBodies++;
  if (!p.tags || p.tags.length === 0) noTags++;
  if (!CATEGORIES.includes(p.category as any)) { badCategory++; console.log("BAD category:", p.category, p.id); }
}

const byCat: Record<string, number> = {};
for (const p of POSTS) byCat[p.category] = (byCat[p.category] ?? 0) + 1;

console.log("\n=== BY CATEGORY ===");
for (const c of CATEGORIES) console.log(`  ${c}: ${byCat[c] ?? 0}`);

console.log("\n=== HEALTH ===");
console.log("dup ids:", dupIds, "| dup nums:", dupNums, "| dup titles:", dupTitles);
console.log("thin deks (<30 chars):", emptyDeks, "| short bodies (<8 blocks or <150 words):", shortBodies);
console.log("no tags:", noTags, "| bad categories:", badCategory);

const numsList = POSTS.map(p => parseInt(p.num, 10)).sort((a, b) => a - b);
const missing: number[] = [];
for (let i = 1; i <= 100; i++) if (!numsList.includes(i)) missing.push(i);
console.log("missing numbers 001-100:", missing.length ? missing : "none");

// Placeholder scan
const bad = ["coming soon", "todo", "placeholder", "lorem ipsum", "tbd", "to be filled"];
let placeholderHits = 0;
for (const p of POSTS) {
  const hay = (p.title + " " + p.dek + " " + JSON.stringify(p.body)).toLowerCase();
  for (const b of bad) if (hay.includes(b)) { placeholderHits++; console.log("PLACEHOLDER:", b, "->", p.id); }
}
console.log("placeholder hits:", placeholderHits);

// Code blocks sanity for tech topics
const withCode = POSTS.filter(p => p.body.some(b => b.type === "code"));
console.log("\nposts with code blocks:", withCode.length);

// Difficulty & read time spread
const diff: Record<string, number> = {};
for (const p of POSTS) diff[p.difficulty] = (diff[p.difficulty] ?? 0) + 1;
console.log("difficulty spread:", diff);

console.log("\narchive drafts:", ARCHIVE_DRAFTS.length, "(expected 4)");
