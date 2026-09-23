// Turns a content page (content/pages/*.md) into the slides of a chapter: one slide per
// section — the section's heading on the left, its blocks on the right. Every word is the
// page file's; only the arrangement is this file's. Server-rendered; the Chapter is the client.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import styles from "./b.module.css";
import { resolveHref } from "./hrefs";
import { ChapterButton } from "./Chapter";

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h1": return null; // the chapter's first slide carries the page title itself
    case "h2": return null; // the slide's own title
    case "h3": return <h3><InlineNodes nodes={b.text} /></h3>;
    case "lead": case "p": case "aside": return <p><InlineNodes nodes={b.text} /></p>;
    case "tagline": return <p className={styles.slideLabel}><InlineNodes nodes={b.text} /></p>;
    case "list": case "quiet": return <ul>{b.items.map((it, i) => <li key={i}><InlineNodes nodes={it} /></li>)}</ul>;
    case "rows": case "terms": case "faq":
      return <ul>{b.items.map((it, i) => <li key={i}><p>{it.lead.length > 0 && <><strong><InlineNodes nodes={it.lead} /></strong> </>}<InlineNodes nodes={it.rest} /></p></li>)}</ul>;
    case "example":
      return <ul><li><p><em><InlineNodes nodes={b.intro} /></em></p></li>{b.items.map((it, i) => <li key={i}><p><strong><InlineNodes nodes={it.lead} /></strong> <InlineNodes nodes={it.rest} /></p></li>)}</ul>;
    case "inline": return <ul>{b.links.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>;
    case "buttons":
      // a button to #form-… or #chapter-… opens that panel on this page; anything else is a link
      return <div className={styles.slideActions}>{b.buttons.map((x, i) => /^#chapter-/.test(x.href)
        ? <ChapterButton key={i} id={x.href.slice(1)} openLabel={x.label} closeLabel={x.label} fill={x.style === "cta"} />
        : <Link key={i} href={resolveHref(x.href, true)} className={`${styles.action} ${x.style === "cta" ? styles.actionFill : ""}`}>{x.label}</Link>)}</div>;
    case "form": return null; // the Start form is not a slide
  }
}

function titleOf(s: Section) {
  return s.blocks.find((b) => b.type === "h1" || b.type === "h2");
}

// A long page is folded to at most MAX slides: after the first, neighbouring sections share
// a slide (founder: "above 5–7 is too many"). Each shared slide keeps every section's heading.
const MAX = 6;

function group(sections: Section[]): Section[][] {
  const groups = sections.map((s) => [s]);
  while (groups.length > MAX) {
    // merge the pair (never the first slide) whose combined block count is smallest
    let best = 1, bestSize = Infinity;
    for (let i = 1; i < groups.length - 1; i++) {
      const size = groups[i].reduce((n, x) => n + x.blocks.length, 0) + groups[i + 1].reduce((n, x) => n + x.blocks.length, 0);
      if (size < bestSize) { bestSize = size; best = i; }
    }
    groups.splice(best, 2, [...groups[best], ...groups[best + 1]]);
  }
  return groups;
}

export function slidesFor(page: Page) {
  const sections = page.sections.filter((s) => s.blocks.some((b) => b.type !== "buttons"));
  return group(sections).map((gs, i) => (
    <div key={i} style={{ display: "contents" }}>
      <div>
        <p className={styles.slideLabel}>{page.nav ?? page.title}</p>
        {gs.map((s, k) => { const t = titleOf(s); return t && (t.type === "h1" || t.type === "h2") ? <h2 key={k} className={`${styles.slideTitle} ${gs.length > 1 ? styles.slideTitleSmall : ""}`}><InlineNodes nodes={t.text} /></h2> : null; })}
      </div>
      <div className={styles.slideBody}>
        {gs.map((s, k) => (
          <div key={k} className={styles.slidePart}>
            {gs.length > 1 && (() => { const t = titleOf(s); return t && (t.type === "h1" || t.type === "h2") ? <h3><InlineNodes nodes={t.text} /></h3> : null; })()}
            {s.blocks.map((b, j) => <BlockView key={j} b={b} />)}
          </div>
        ))}
      </div>
    </div>
  ));
}
