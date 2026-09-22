// A function's page (the four intent pages). The hero: "Bidaya" typed in small, the mark
// drawn in, then the function's name typed in its colour. Beneath, the page's sections as
// cards — the title on the left, the paragraphs on the right with dividers — the same
// shapes as the home page, so a reader or a machine can trace it.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import functions from "../../../content/functions.json";
import styles from "./b.module.css";
import Typed from "./Typed";
import MotionB from "./MotionB";

const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink };

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h1": case "h2": return null;
    case "h3": return <h3><InlineNodes nodes={b.text} /></h3>;
    case "lead": case "p": case "aside": return <p><InlineNodes nodes={b.text} /></p>;
    case "tagline": return <p className={styles.slideLabel}><InlineNodes nodes={b.text} /></p>;
    case "list": case "quiet": return <ul>{b.items.map((it, i) => <li key={i}><InlineNodes nodes={it} /></li>)}</ul>;
    case "rows": case "terms":
      return <ul>{b.items.map((it, i) => <li key={i}><p><strong><InlineNodes nodes={it.lead} /></strong> <InlineNodes nodes={it.rest} /></p></li>)}</ul>;
    case "faq":
      return <>{b.items.map((it, i) => <div key={i} className={styles.slidePart}><h3><InlineNodes nodes={it.lead} /></h3><p><InlineNodes nodes={it.rest} /></p></div>)}</>;
    case "example":
      return <ul><li><p><em><InlineNodes nodes={b.intro} /></em></p></li>{b.items.map((it, i) => <li key={i}><p><strong><InlineNodes nodes={it.lead} /></strong> <InlineNodes nodes={it.rest} /></p></li>)}</ul>;
    case "inline": return <ul>{b.links.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>;
    case "buttons":
      return <div className={styles.slideActions}>{b.buttons.map((x, i) => <Link key={i} href={x.href} className={`${styles.action} ${x.style === "cta" ? styles.actionFill : ""}`}>{x.label}</Link>)}</div>;
    case "form": return null;
  }
}

const titleOf = (s: Section) => s.blocks.find((b) => b.type === "h1" || b.type === "h2");

export default function IntentB({ page }: { page: Page }) {
  const fn = functions.functions.find((f) => f.id === page.fn) ?? functions.functions[0];
  const tone = toneClass[fn.tone] ?? styles.ink;
  return (
    <div className={styles.page}>
      <MotionB />
      <section className={`${styles.row} ${styles.intentHero}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text="Bidaya" delay={200} speed={90} className={`${styles.mono} ${styles.intentSmall}`} as="p" />
          <div className={styles.intentMark} style={{ color: fn.color }} aria-hidden="true">
            <svg viewBox="180 192.5 640 640" data-draw><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></svg>
          </div>
          <Typed text={fn.name} delay={1500} speed={70} className={styles.intentName} as="h2" />
        </div>
        <div className={`${styles.panel} ${tone}`}>
          <span />
          {(() => { const h = page.sections[0].blocks.find((b) => b.type === "h1"); return h && h.type === "h1" ? <h1 className={styles.h1}><InlineNodes nodes={h.text} /></h1> : null; })()}
        </div>
      </section>
      {page.sections.map((s, i) => {
        const t = titleOf(s);
        const body = s.blocks.filter((b) => b.type !== "h1" && b.type !== "h2");
        if (!body.length) return null;
        return (
          <section key={i} className={`${styles.row} ${styles.card}`}>
            <div className={`${styles.panel} ${i % 2 ? styles.stone : styles.paper}`}>
              {t && i > 0 && <h2 className={styles.slideTitle}><InlineNodes nodes={t.text} /></h2>}
              {i === 0 && <p className={styles.slideLabel}>{fn.name}</p>}
            </div>
            <div className={`${styles.panel} ${styles.paper} ${styles.slideBody} ${styles.cardBody}`}>
              {body.map((b, j) => <BlockView key={j} b={b} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
