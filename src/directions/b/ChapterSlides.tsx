// Turns a content page (content/pages/*.md) into the slides of a chapter: one slide per
// section — the section's heading on the left, its blocks on the right. Every word is the
// page file's; only the arrangement is this file's. Server-rendered; the Chapter is the client.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import styles from "./b.module.css";

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
      return <div className={styles.slideActions}>{b.buttons.map((x, i) => <Link key={i} href={x.href} className={`${styles.action} ${x.style === "cta" ? styles.actionFill : ""}`}>{x.label}</Link>)}</div>;
    case "form": return null; // the Start form is not a slide
  }
}

function titleOf(s: Section) {
  return s.blocks.find((b) => b.type === "h1" || b.type === "h2");
}

export function slidesFor(page: Page) {
  return page.sections
    .filter((s) => s.blocks.some((b) => b.type !== "buttons"))
    .map((s, i) => {
      const t = titleOf(s);
      return (
        <div key={i} style={{ display: "contents" }}>
          <div>
            <p className={styles.slideLabel}>{page.nav ?? page.title}</p>
            {t && (t.type === "h1" || t.type === "h2") && <h2 className={styles.slideTitle}><InlineNodes nodes={t.text} /></h2>}
          </div>
          <div className={styles.slideBody}>
            {s.blocks.map((b, j) => <BlockView key={j} b={b} />)}
          </div>
        </div>
      );
    });
}
