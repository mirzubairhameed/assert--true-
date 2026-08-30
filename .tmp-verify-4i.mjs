import { PLAYWRIGHT } from "/home/z/my-project/src/data/articles/09-playwright.ts";
import { CYPRESS } from "/home/z/my-project/src/data/articles/10-cypress.ts";
import { readFileSync } from "node:fs";

const EXPECTED = [
  ["069", "playwright-first-test", "Playwright: From Install to Your First Green Test", "Playwright", "beginner", "2026-07-12"],
  ["070", "playwright-locators-actions", "Playwright Locators and Actions: Start With getByRole", "Playwright", "beginner", "2026-07-14"],
  ["071", "playwright-assertions-waits", "Playwright Assertions and Auto-Waiting", "Playwright", "beginner", "2026-07-15"],
  ["072", "playwright-fixtures-pom", "Playwright Fixtures and Page Objects in Practice", "Playwright", "intermediate", "2026-07-16"],
  ["073", "playwright-trace-debugging", "Debugging Playwright: Trace Viewer, Screenshots, UI Mode", "Playwright", "intermediate", "2026-07-18"],
  ["074", "playwright-in-github-actions", "Running Playwright in GitHub Actions", "Playwright", "intermediate", "2026-07-20"],
  ["075", "cypress-first-test", "Cypress: From Install to Your First Green Test", "Cypress", "beginner", "2026-07-21"],
  ["076", "cypress-query-and-interact", "Cypress: Querying and Interacting With cy.get and cy.contains", "Cypress", "beginner", "2026-07-22"],
  ["077", "cypress-intercept-stubbing", "Cypress: Controlling the Network With cy.intercept", "Cypress", "intermediate", "2026-07-24"],
  ["078", "cypress-custom-commands", "Cypress: Custom Commands and Aliases", "Cypress", "intermediate", "2026-07-26"],
  ["079", "playwright-vs-cypress", "Playwright vs Cypress: How to Choose, Honestly", "Cypress", "beginner", "2026-07-27"],
];

const BANNED = ["in today's fast-paced world", "delve", "seamless", "leverage", "game-changer", "moreover", "furthermore", "in conclusion", "it is worth noting", "comprehensive guide", "comprehensive", "navigate the complexities", "robust", "unlock", "realm", "tapestry"];
const PLACEHOLDERS = ["TODO", "TBD", "FIXME", "placeholder", "coming soon", "lorem ipsum", "xxx"];
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;

const wc = (s) => s.trim().split(/\s+/).filter(Boolean).length;

let fails = 0;
const fail = (msg) => { fails++; console.log("FAIL:", msg); };
const ok = (msg) => console.log("ok:", msg);

// 1. raw file checks
for (const [file, expName] of [["/home/z/my-project/src/data/articles/09-playwright.ts", "PLAYWRIGHT"], ["/home/z/my-project/src/data/articles/10-cypress.ts", "CYPRESS"]]) {
  const src = readFileSync(file, "utf8");
  const imports = src.split("\n").filter((l) => l.startsWith("import"));
  if (imports.length === 1 && imports[0] === 'import type { Post } from "../post-types";') ok(`${file}: single exact import`);
  else fail(`${file}: import line(s) = ${JSON.stringify(imports)}`);
  if (src.includes(`export const ${expName}: Post[]`)) ok(`${file}: export const ${expName}: Post[]`);
  else fail(`${file}: missing export declaration`);
  const ticks = (src.match(/`/g) || []).length;
  if (ticks % 2 !== 0) fail(`${file}: odd number of backticks (${ticks})`);
  else ok(`${file}: backtick count even (${ticks})`);
  const dollar = src.match(/(?<!\\)\$\{/g);
  if (expName === "CYPRESS" && dollar) fail(`${file}: unescaped \${ found`);
  else if (expName === "CYPRESS") ok(`${file}: all \${ escaped`);
  else if (!dollar) ok(`${file}: no \${ sequences`);
  else fail(`${file}: unexpected \${`);
}

const all = [...PLAYWRIGHT, ...CYPRESS];
if (all.length === 11) ok("11 articles total");
else fail(`total articles = ${all.length}`);

const seen = new Set();
for (const p of all) {
  const tag = `#${p.num}`;
  if (seen.has(p.id)) fail(`${tag} duplicate id ${p.id}`);
  seen.add(p.id);

  const exp = EXPECTED.find((e) => e[0] === p.num);
  if (!exp) { fail(`${tag} unexpected num`); continue; }
  if (p.id !== exp[1]) fail(`${tag} id ${p.id} != ${exp[1]}`);
  if (p.title !== exp[2]) fail(`${tag} title mismatch: ${p.title}`);
  if (p.category !== exp[3]) fail(`${tag} category ${p.category} != ${exp[3]}`);
  if (p.difficulty !== exp[4]) fail(`${tag} difficulty ${p.difficulty} != ${exp[4]}`);
  if (p.date !== exp[5]) fail(`${tag} date ${p.date} != ${exp[5]}`);
  if (p.status !== "green") fail(`${tag} status ${p.status}`);

  // dek
  const dw = wc(p.dek);
  if (dw < 18 || dw > 32) fail(`${tag} dek ${dw} words`);
  else ok(`${tag} dek ${dw} words`);

  // tags
  if (p.tags.length < 2 || p.tags.length > 4) fail(`${tag} tags count ${p.tags.length}`);
  for (const t of p.tags) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t)) fail(`${tag} tag '${t}' not lowercase-hyphenated`);

  // words: prose (p,h,ul,quote) and prose+code
  let prose = 0, codeWords = 0;
  for (const b of p.body) {
    if (b.type === "p" || b.type === "h" || b.type === "quote") prose += wc(b.text);
    else if (b.type === "ul") prose += b.items.reduce((a, i) => a + wc(i), 0);
    else if (b.type === "code") codeWords += wc(b.code);
  }
  const total = prose + codeWords;
  const read = Math.ceil(prose / 190);
  if (prose < 650 || prose > 950) fail(`${tag} prose ${prose} words (out of 650-950)`);
  else ok(`${tag} prose ${prose} words (+${codeWords} code = ${total}); read=${read} min (file says ${p.read})`);
  if (p.read !== `${read} min`) fail(`${tag} read should be ${read} min, is ${p.read}`);

  // banned / emoji / placeholders across dek+body text and code
  const texts = [p.dek, ...p.body.flatMap((b) => b.type === "ul" ? b.items : b.type === "code" ? [b.code, b.label] : [b.text ?? ""])];
  for (const t of texts) {
    const low = t.toLowerCase();
    for (const b of BANNED) if (low.includes(b)) fail(`${tag} banned phrase '${b}'`);
    for (const ph of PLACEHOLDERS) if (low.includes(ph.toLowerCase())) fail(`${tag} placeholder '${ph}'`);
    if (EMOJI_RE.test(t)) fail(`${tag} emoji found`);
  }

  // anatomy
  const b = p.body;
  const types = b.map((x) => x.type);
  const heads = b.filter((x) => x.type === "h").map((x) => x.text);
  if (types[0] !== "p" || types[1] !== "p") fail(`${tag} first two blocks must be p,p`);
  if (heads[0] !== "Why it matters") fail(`${tag} first heading is '${heads[0]}'`);
  if (b[3].type !== "p") fail(`${tag} block after 'Why it matters' must be p`);
  if (heads[1] !== "In practice" && heads[1] !== "A worked example" && heads[1] !== "Seeing it on a real page") fail(`${tag} second heading '${heads[1]}'`);
  if (types[types.length - 1] !== "quote") fail(`${tag} last block not quote`);
  const iCM = heads.indexOf("Common mistakes"), iBP = heads.indexOf("Best practices"), iKT = heads.indexOf("Key takeaways");
  if (iCM < 0 || iBP < 0 || iKT < 0) fail(`${tag} missing a required heading`);
  if (!(iCM < iBP && iBP < iKT)) fail(`${tag} heading order broken`);
  const hasCode = p.body.some((x) => x.type === "code");
  if (!hasCode) fail(`${tag} no code block`);
  for (const [h, min, max, required] of [["Step by step", 5, 7, false], ["Common mistakes", 4, 6, true], ["Best practices", 4, 6, true], ["Key takeaways", 3, 5, true]]) {
    const idx = b.findIndex((x) => x.type === "h" && x.text === h);
    if (idx >= 0) {
      const ul = b[idx + 1];
      if (!ul || ul.type !== "ul") fail(`${tag} no ul after '${h}'`);
      else if (ul.items.length < min || ul.items.length > max) fail(`${tag} '${h}' ul has ${ul.items.length} items (want ${min}-${max})`);
    } else if (required) fail(`${tag} missing '${h}'`);
  }
  // code rules
  for (const c of p.body.filter((x) => x.type === "code")) {
    if (!["ts", "python", "yaml", "bash", "sql", "java", "json"].includes(c.lang)) fail(`${tag} bad lang ${c.lang}`);
    if (c.code.split("\n").length > 26) fail(`${tag} code block '${c.label}' longer than ~25 lines (${c.code.split("\n").length})`);
    if (c.code.includes("`")) fail(`${tag} code '${c.label}' contains a backtick`);
    if (!c.label) fail(`${tag} code missing label`);
  }
}

console.log(fails === 0 ? "\nALL CHECKS PASSED" : `\n${fails} FAILURES`);
