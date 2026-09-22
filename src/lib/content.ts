// Reads content/pages/*.md — the copy deck as data — into typed blocks.
// The format is documented in content/pages/README.md. No markdown library:
// the format is small on purpose, and the tokens are the only design system.
import fs from "node:fs";
import path from "node:path";

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "strong"; children: Inline[] }
  | { kind: "em"; children: Inline[] }
  | { kind: "link"; href: string; children: Inline[] };

export type Button = { style: "cta" | "ghost" | "textlink"; label: string; href: string };

export type Item = { lead: Inline[]; rest: Inline[]; verify?: string; raw: string };

export type FormField =
  | { type: "radio"; name: string; label: string; options: string[]; hint?: Inline[] }
  | { type: "text" | "email" | "tel" | "textarea"; name: string; label: string; optional: boolean; hint?: Inline[] }
  | { type: "consent"; name: string; label: string };

export type Block =
  | { type: "h1"; text: Inline[]; raw: string }
  | { type: "h2"; text: Inline[]; raw: string; id: string }
  | { type: "h3"; text: Inline[]; raw: string }
  | { type: "tagline"; text: Inline[] }
  | { type: "lead"; text: Inline[] }
  | { type: "aside"; text: Inline[] }
  | { type: "p"; text: Inline[] }
  | { type: "list"; items: Inline[][] }
  | { type: "buttons"; buttons: Button[] }
  | { type: "inline"; links: Button[] }
  | { type: "rows"; items: Item[] }
  | { type: "terms"; items: Item[] }
  | { type: "faq"; items: Item[] }
  | { type: "example"; intro: Inline[]; items: Item[] }
  | { type: "quiet"; items: Inline[][] }
  | { type: "form"; fields: FormField[]; submit: string };

export type Section = { band?: "aqua" | "teal" | "plum"; kind?: string; blocks: Block[] };

export type Page = {
  slug: string;
  route: string;
  title: string;
  description: string;
  order: number;
  nav?: string;
  navCta: boolean;
  intent?: string;
  faqSchema: boolean;
  serviceSchema: boolean;
  serviceName?: string;
  organizationSchema: boolean;
  hidden: boolean;
  fn?: string;
  audience?: string;
  sections: Section[];
  notes: string[];
  assumed: string[];
};

const CONTENT = path.join(process.cwd(), "content");

// ---- inline --------------------------------------------------------------

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let i = 0;
  let buf = "";
  const flush = () => { if (buf) { out.push({ kind: "text", text: buf }); buf = ""; } };
  while (i < src.length) {
    if (src.startsWith("**", i)) {
      const end = src.indexOf("**", i + 2);
      if (end > -1) { flush(); out.push({ kind: "strong", children: parseInline(src.slice(i + 2, end)) }); i = end + 2; continue; }
    }
    if (src[i] === "*" && src[i + 1] !== "*") {
      const end = src.indexOf("*", i + 1);
      if (end > -1) { flush(); out.push({ kind: "em", children: parseInline(src.slice(i + 1, end)) }); i = end + 1; continue; }
    }
    if (src[i] === "[") {
      const m = /^\[([^\]]+)\]\(([^)]+)\)/.exec(src.slice(i));
      if (m) { flush(); out.push({ kind: "link", href: m[2], children: parseInline(m[1]) }); i += m[0].length; continue; }
    }
    buf += src[i]; i++;
  }
  flush();
  return out;
}

export function inlineToText(nodes: Inline[]): string {
  return nodes.map((n) => (n.kind === "text" ? n.text : inlineToText(n.children))).join("");
}

// `**Lead.** rest` → an item with a bold lead and the rest.
function parseItem(raw: string): Item {
  const m = /^\*\*([^]+?)\*\*\s*([^]*)$/.exec(raw);
  if (m) return { lead: parseInline(m[1]), rest: parseInline(m[2]), raw };
  return { lead: [], rest: parseInline(raw), raw };
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9؀-ۿ]+/g, "-").replace(/^-|-$/g, "");
}

// ---- frontmatter ---------------------------------------------------------

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return { data, body: src.slice(m[0].length) };
}

// ---- body ----------------------------------------------------------------

function parseButton(style: Button["style"], rest: string): Button {
  const m = /^(.*?)\s*->\s*(\S+)\s*$/.exec(rest);
  if (!m) throw new Error(`Button needs "Label -> /route": ${rest}`);
  return { style, label: m[1], href: m[2] };
}

function parseForm(lines: string[]): Block {
  const fields: FormField[] = [];
  let submit = "Send";
  let last: FormField | undefined;
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("@assumed") || t.startsWith("@note")) continue;
    if (t.startsWith("@field ")) {
      const m = /^@field\s+(radio|text|email|tel|textarea|consent)\s+"([^"]+)"\s*(optional)?/.exec(t);
      if (!m) throw new Error(`Bad field: ${t}`);
      const type = m[1] as FormField["type"];
      const label = m[2];
      const name = slugify(label);
      if (type === "radio") last = { type, name, label, options: [] };
      else if (type === "consent") last = { type, name, label };
      else last = { type, name, label, optional: Boolean(m[3]) };
      fields.push(last);
    } else if (t.startsWith("- ") && last?.type === "radio") {
      last.options.push(t.slice(2));
    } else if (t.startsWith("@hint ") && last && last.type !== "consent") {
      last.hint = parseInline(t.slice(6));
    } else if (t.startsWith("@submit ")) {
      submit = t.slice(8).trim();
    }
  }
  return { type: "form", fields, submit };
}

function parseBody(body: string, page: Pick<Page, "notes" | "assumed">): Section[] {
  const sections: Section[] = [];
  let current: Section = { blocks: [] };
  let para: string[] = [];
  let list: string[] = [];
  let buttons: Button[] = [];
  let inlineLinks: Button[] = [];
  let group: { type: "rows" | "terms" | "faq" | "example" | "quiet" | "form"; lines: string[] } | null = null;

  const flushPara = () => {
    if (para.length) { current.blocks.push({ type: "p", text: parseInline(para.join(" ")) }); para = []; }
  };
  const flushList = () => {
    if (list.length) { current.blocks.push({ type: "list", items: list.map(parseInline) }); list = []; }
  };
  const flushButtons = () => {
    if (buttons.length) { current.blocks.push({ type: "buttons", buttons }); buttons = []; }
    if (inlineLinks.length) { current.blocks.push({ type: "inline", links: inlineLinks }); inlineLinks = []; }
  };
  const flushAll = () => { flushPara(); flushList(); flushButtons(); };
  const endSection = () => {
    flushAll();
    if (current.blocks.length || current.band || current.kind) sections.push(current);
    current = { blocks: [] };
  };
  const closeGroup = () => {
    if (!group) return;
    const { type, lines } = group;
    group = null;
    if (type === "form") { current.blocks.push(parseForm(lines)); return; }
    // paragraphs separated by blank lines; a @verify line attaches to the item above it
    const paras: string[] = [];
    const verifies: Record<number, string> = {};
    let acc: string[] = [];
    for (const l of lines) {
      const t = l.trim();
      if (t.startsWith("@verify ")) { verifies[paras.length - (acc.length ? 0 : 1)] = t.slice(8); continue; }
      if (t.startsWith("@note ")) { page.notes.push(t.slice(6)); continue; }
      if (!t) { if (acc.length) { paras.push(acc.join(" ")); acc = []; } continue; }
      acc.push(t);
    }
    if (acc.length) paras.push(acc.join(" "));
    if (type === "quiet") {
      current.blocks.push({ type: "quiet", items: paras.map((p) => parseInline(p.replace(/^- /, ""))) });
      return;
    }
    const items = paras.map((p, i) => ({ ...parseItem(p), verify: verifies[i] }));
    if (type === "example") {
      const [intro, ...rest] = items;
      current.blocks.push({ type: "example", intro: intro.rest, items: rest });
      return;
    }
    current.blocks.push({ type, items });
  };

  for (const rawLine of body.split("\n")) {
    const line = rawLine.replace(/\s+$/, "");
    const t = line.trim();

    if (group) {
      if (t === "@end") closeGroup();
      else group.lines.push(line);
      continue;
    }
    if (t === "---") { endSection(); continue; }
    if (t === "") { flushAll(); continue; }

    if (t.startsWith("@note ")) { flushAll(); page.notes.push(t.slice(6)); continue; }
    if (t.startsWith("@assumed ")) { flushAll(); page.assumed.push(t.slice(9)); continue; }
    if (t.startsWith("@band ")) { flushAll(); current.band = t.slice(6).trim() as Section["band"]; continue; }
    if (t.startsWith("@kind ")) { flushAll(); current.kind = t.slice(6).trim(); continue; }
    if (/^@(rows|terms|faq|example|quiet|form)$/.test(t)) { flushAll(); group = { type: t.slice(1) as never, lines: [] }; continue; }

    if (t.startsWith("# ")) { flushAll(); current.blocks.push({ type: "h1", text: parseInline(t.slice(2)), raw: t.slice(2) }); continue; }
    if (t.startsWith("## ")) { flushAll(); current.blocks.push({ type: "h2", text: parseInline(t.slice(3)), raw: t.slice(3), id: slugify(t.slice(3)) }); continue; }
    if (t.startsWith("### ")) { flushAll(); current.blocks.push({ type: "h3", text: parseInline(t.slice(4)), raw: t.slice(4) }); continue; }
    if (t.startsWith("@tagline ")) { flushAll(); current.blocks.push({ type: "tagline", text: parseInline(t.slice(9)) }); continue; }
    if (t.startsWith("@lead ")) { flushAll(); current.blocks.push({ type: "lead", text: parseInline(t.slice(6)) }); continue; }
    if (t.startsWith("@aside ")) { flushAll(); current.blocks.push({ type: "aside", text: parseInline(t.slice(7)) }); continue; }
    if (t.startsWith("@cta ")) { flushPara(); flushList(); buttons.push(parseButton("cta", t.slice(5))); continue; }
    if (t.startsWith("@ghost ")) { flushPara(); flushList(); buttons.push(parseButton("ghost", t.slice(7))); continue; }
    if (t.startsWith("@textlink ")) { flushPara(); flushList(); buttons.push(parseButton("textlink", t.slice(10))); continue; }
    if (t.startsWith("@inline ")) { flushPara(); flushList(); inlineLinks.push(parseButton("textlink", t.slice(8))); continue; }
    if (t.startsWith("- ")) { flushPara(); flushButtons(); list.push(t.slice(2)); continue; }
    flushList(); flushButtons();
    para.push(t);
  }
  if (group) closeGroup();
  endSection();
  return sections;
}

// ---- pages ---------------------------------------------------------------

function loadPage(file: string): Page {
  const src = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(src);
  const page: Page = {
    slug: path.basename(file, ".md"),
    route: data.route,
    title: data.title,
    description: data.description,
    order: Number(data.order ?? 99),
    nav: data.nav || undefined,
    navCta: data.navCta === "true",
    intent: data.intent || undefined,
    faqSchema: data.faqSchema === "true",
    serviceSchema: data.serviceSchema === "true",
    serviceName: data.serviceName || undefined,
    organizationSchema: data.organizationSchema === "true",
    hidden: data.hidden === "true",
    fn: data.function || undefined,
    audience: data.audience || undefined,
    sections: [],
    notes: [],
    assumed: [],
  };
  if (!page.route || !page.title || !page.description) throw new Error(`${file}: route, title and description are required`);
  page.sections = parseBody(body, page);
  return page;
}

let cache: Page[] | null = null;

export function getPages(): Page[] {
  if (cache) return cache;
  const dir = path.join(CONTENT, "pages");
  cache = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => loadPage(path.join(dir, f)))
    .sort((a, b) => a.order - b.order);
  return cache;
}

export function getPageByRoute(route: string): Page | undefined {
  return getPages().find((p) => p.route === route);
}

// ---- global --------------------------------------------------------------

export type Global = {
  siteName: string;
  shortName: string;
  alternateName: string;
  areaServed: string;
  founder: string;
  navOrder: string[];
  fields: Record<string, string>;
  notes: string[];
};

let globalCache: Global | null = null;

export function getGlobal(): Global {
  if (globalCache) return globalCache;
  const src = fs.readFileSync(path.join(CONTENT, "global.md"), "utf8");
  const { data, body } = parseFrontmatter(src);
  const fields: Record<string, string> = {};
  const notes: string[] = [];
  for (const line of body.split("\n")) {
    const t = line.trim();
    const f = /^@field\s+(\w+)\s+(.*)$/.exec(t);
    if (f) fields[f[1]] = f[2];
    else if (t.startsWith("@note ")) notes.push(t.slice(6));
  }
  globalCache = {
    siteName: data.siteName,
    shortName: data.shortName || data.siteName,
    alternateName: data.alternateName,
    areaServed: data.areaServed,
    founder: data.founder,
    navOrder: data.navOrder.split(",").map((s) => s.trim()),
    fields,
    notes,
  };
  return globalCache;
}

export function getNav(): { label: string; href: string; cta: boolean }[] {
  const pages = getPages();
  return getGlobal().navOrder.map((route) => {
    const p = pages.find((x) => x.route === route);
    if (!p || !p.nav) throw new Error(`Nav route ${route} has no page or no nav label`);
    return { label: p.nav, href: p.route, cta: p.navCta };
  });
}

// ---- reports and notes (empty at launch; the format is defined) -----------

export type Entry = { slug: string; title: string; date: string; summary: string; sources: string[]; number?: string; sections: Section[] };

function loadEntries(kind: "reports" | "notes"): Entry[] {
  const dir = path.join(CONTENT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => {
      const src = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, body } = parseFrontmatter(src);
      const sources = (src.match(/^\s+-\s+(.*)$/gm) ?? []).map((s) => s.replace(/^\s+-\s+/, ""));
      const scratch = { notes: [], assumed: [] };
      return { slug: path.basename(f, ".md"), title: data.title, date: data.date, summary: data.summary, sources, number: data.number, sections: parseBody(body, scratch) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getReports = () => loadEntries("reports");
export const getNotes = () => loadEntries("notes");
