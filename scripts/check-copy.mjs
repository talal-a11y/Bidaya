#!/usr/bin/env node
// The mechanical checklist: docs/04 "The pre-ship checklist" and the banned lists in
// CLAUDE.md §4, run over content/ and src/. Not over docs/ or CLAUDE.md, which quote the
// banned words on purpose. Exit 1 on any hit that is not in scripts/check-copy.allow.json
// — and every allowed line there points at an entry in docs/decisions.md.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const allow = JSON.parse(fs.readFileSync(path.join(root, "scripts/check-copy.allow.json"), "utf8"));

// ---- the lists --------------------------------------------------------------
const bannedPhrases = [
  // §8 category clichés
  "gateway to the middle east", "gateway to the uae", "in 3 easy steps", "in three easy steps", "trusted partner",
  "end-to-end", "seamless", "hassle-free", "stress-free", "we handle the paperwork", "focus on your business",
  "focus on the core business", "from vision to reality", "turning ideas into reality", "empowering entrepreneurs",
  "your success is our success", "bridging east and west", "land of opportunity", "begin right", "start right",
  "the right beginning", "build it right", "build something real",
  // consultancy clichés
  "strategic partner", "tailored solution", "bespoke solution", "customised solution", "customized solution",
  "data-driven", "holistic", "unlock your potential", "unlock growth", "next level", "world-class", "best-in-class",
  "proven track record", "passionate about",
  // AI-era tells
  "ai-powered", "ai-first", "delve", "fast-paced", "navigate the complexities", "transform", "revolutioni",
  "game-changing", "elevate", "robust", "streamline", "supercharge",
  // never-say list (docs/04 §08)
  "under one roof", "one roof", "one-stop shop", "all your business needs", "at a fraction of the cost",
  "without the full-time", "senior leadership", "senior financial", "senior operational", "more than bookkeeping",
  "scale up or down", "from brief to deployment", "an operator who embeds", "your growth partner", "hustle",
  "empower", "journey", "affordable", "cheap", "under one license", "under one licence", "in-house", "the only",
  "one of the only", "the first firm", "the first consultancy", "the first to", "assessment", "scorecard",
  "readiness", "technology", "new school", "people person", "reads rooms", "gets things done fast",
  "we care", "we're here for you", "we deliver excellence", "you don't know how", "we do it better",
  "your company is a mess", "let the experts handle it", "leave it to us",
  "management and it consultancy for smes", "trusted by",
];
// whole words that are banned on their own (the never-say list); tested with word boundaries
const bannedWords = ["hub", "platform", "platforms", "space", "license", "solutions", "solution", "leverage", "unlock"];
// "scale" the verb/noun about growth — "at both scales" is a measure, not the claim; test the singular
const bannedWordsExact = ["scale"];
// self-description tells: banned when said of Bidaya, not of the people it was started for
const selfDescription = /\b(we are|we're|a|the|our) (young|fresh)\b/i;

const intentPages = ["fractional-coo-uae.md", "fractional-cfo-uae.md", "tech-and-projects.md", "feasibility-and-advisory.md"];
const aedPages = ["how-we-work.md", ...intentPages, "global.md"];

// ---- helpers ----------------------------------------------------------------
const hits = [];
function hit(file, line, rule, text) {
  const rel = path.relative(root, file);
  const allowed = allow.find((a) => a.file === rel && a.rule === rule && text.includes(a.contains));
  if (allowed) return;
  hits.push({ file: rel, line, rule, text: text.trim().slice(0, 140) });
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "brand", "fonts"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(md|json|tsx?|txt)$/.test(e.name) && !e.name.startsWith("README")) out.push(p);
  }
  return out;
}

const files = [...walk(path.join(root, "content")), ...walk(path.join(root, "src")), path.join(root, "public/llms.txt")];

// In content files, @note / @assumed / @verify lines and JSON "$comment" fields are instructions,
// not copy, and are skipped. Italics (*...*) are owner quotes: exempt from the "I / my" check only.
const isInstruction = (t) => /^\s*@(note|assumed|verify)\b/.test(t) || /"\$comment"|"changes"|"\$comment":/.test(t);

for (const file of files) {
  const rel = path.relative(root, file);
  const base = path.basename(file);
  const isContent = rel.startsWith("content/");
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let inGroup = null;
  let xNotYCount = 0;

  lines.forEach((raw, i) => {
    const n = i + 1;
    if (isInstruction(raw)) return;
    // in content, route names are not copy. In code, only what can reach a reader is copy:
    // quoted strings and JSX text — never identifiers, comments or CSS.
    const t = isContent
      ? raw.replace(/->\s*\/\S+/g, "").replace(/\]\(\/[^)]+\)/g, "]()")
      : [...raw.matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`|>([^<>{}]+)</g)].map((m) => m[1] ?? m[2] ?? m[3] ?? m[4]).join(" ");
    const low = t.toLowerCase();
    if (/^@(faq|example|rows|terms|quiet|form)$/.test(t.trim())) inGroup = t.trim().slice(1);
    if (t.trim() === "@end") inGroup = null;

    // 1. the §08 lists and CLAUDE.md §4
    for (const p of bannedPhrases) if (low.includes(p)) hit(file, n, `banned: "${p}"`, t);
    for (const w of bannedWords) if (new RegExp(`\\b${w}\\b`, "i").test(t)) hit(file, n, `banned word: "${w}"`, t);
    for (const w of bannedWordsExact) if (new RegExp(`\\b${w}\\b`, "i").test(t)) hit(file, n, `banned word: "${w}"`, t);
    if (selfDescription.test(t)) hit(file, n, 'self-description: "young" / "fresh"', t);
    // emoji
    if (/\p{Extended_Pictographic}/u.test(t)) hit(file, n, "emoji", t);

    if (!isContent) return;

    // 2. "X, not Y" — at most one per page
    if (/, not \w/.test(t)) { xNotYCount++; if (xNotYCount > 1) hit(file, n, '"X, not Y" more than once on the page', t); }

    // 3. em dashes per sentence — at most one; no three-part rhythm
    for (const s of t.split(/(?<=[.!?])\s+/)) {
      const dashes = (s.match(/—/g) || []).length;
      if (dashes > 1) hit(file, n, "more than one em dash in a sentence", s);
    }

    // 4. "I " and "my " — plural only, owner quotes in italics exempt
    const noItalics = t.replace(/\*[^*]+\*/g, "");
    if (/(^|[^\w*])(I|my)\s/.test(noItalics) && !/^(title|description):/.test(t)) hit(file, n, '"I" or "my" outside an owner quote', t);

    // 8. fractional / outsourced / part-time — intent pages, FAQ, metadata only
    if (/\b(fractional|outsourced|part-time)\b/i.test(t) && !intentPages.includes(base) && inGroup !== "faq") hit(file, n, '"fractional/outsourced/part-time" outside the intent pages', t);

    // 9. AED — How we work, intent pages, FAQ blocks, the worked example, the legal line
    if (/\bAED\b/.test(t) && !aedPages.includes(base) && !["faq", "example"].includes(inGroup) && !rel.startsWith("content/tool/")) hit(file, n, '"AED" outside How we work, the intent pages and FAQ', t);

    // 10. Programs: service, price, from AED — zero
    if (base === "programs.md" && /\b(service|services|price|prices|from AED)\b/i.test(t)) hit(file, n, 'Programs carries no "service" or price', t);

    // 11. "executive management" — tagline and home title only
    if (/executive management/i.test(t) && !(base === "home.md" && (/^title:/.test(t) || /^@tagline/.test(t)))) hit(file, n, '"executive management" outside the tagline and home title', t);
    // the category sentence
    if (/consultancy for smes, startups and creators/i.test(t)) hit(file, n, "the category sentence", t);

    // 12. headlines say what follows — no question marks, no title case
    if (/^#{1,3} /.test(t)) {
      if (/\?/.test(t)) hit(file, n, "question mark in a heading", t);
      const words = t.replace(/^#+ /, "").split(/\s+/);
      const caps = words.slice(1).filter((w) => /^[A-Z][a-z]+$/.test(w) && !["Bidaya", "UAE", "COO", "CFO", "CEO", "Programs", "Setup", "Operations", "Finance", "Tech", "VAT"].includes(w));
      if (caps.length >= 3 && caps.length >= words.length / 2) hit(file, n, "title case in a heading", t);
    }
    // the deck's sentence-case rule and the never-say "founder credentials": nothing to search mechanically here.
  });
}

if (hits.length) {
  console.error(`check-copy: ${hits.length} hit${hits.length > 1 ? "s" : ""}\n`);
  for (const h of hits) console.error(`${h.file}:${h.line}  ${h.rule}\n    ${h.text}\n`);
  process.exit(1);
}
console.log(`check-copy: clean (${files.length} files)`);
