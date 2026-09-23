// A learn-more page: the full text, in the founder's order, as cards stacked down the page —
// the title on the left of one, on the right of the next, at different sizes — rising in as
// they arrive. Above them a ring bar: arrows to the previous and next page, and a dropdown
// to pick any part. The four function pages open with "Bidaya" typed, the mark drawn in,
// and the function's name typed in its colour.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { getGlobal, getPages } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import functions from "../../../content/functions.json";
import summaries from "../../../content/summaries.json";
import audiences from "../../../content/audiences.json";
import ExploreOn from "./ExploreOn";
import styles from "./b.module.css";
import { resolveHref } from "./hrefs";
import Typed from "./Typed";
import MotionB from "./MotionB";

// the mark's own path (brand/svg/bidaya-mark.svg) — never redrawn
const MARK = "M260 530a240 240 0 1 0 480 0a240 240 0 1 0-480 0ZM300 455a200 200 0 1 0 400 0a200 200 0 1 0-400 0Z";
export function Mark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 1000 1000" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" transform="translate(-470.8,-495.1) scale(1.9417)" d={MARK} /></svg>;
}

const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink, aqua: styles.aqua };

export function BlockView({ b }: { b: Block }) {
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
      // a button to a panel on the home page goes there and opens it on arrival
      return <div className={styles.slideActions}>{b.buttons.map((x, i) => <Link key={i} href={resolveHref(x.href, false)} className={`${styles.action} ${x.style === "cta" ? styles.actionFill : ""}`}>{x.label}</Link>)}</div>;
    case "form": return null;
  }
}

const titleOf = (s: Section) => s.blocks.find((b) => b.type === "h1" || b.type === "h2");

function nameOf(p: Page) {
  const fn = functions.functions.find((f) => f.id === p.fn);
  const au = audiences.audiences.find((a) => a.id === p.audience);
  return fn ? fn.name : au ? au.word : (p.nav ?? p.title.replace(/ — .*$/, ""));
}

// the ring: arrows to the previous and next page, and the dropdown
export function Ring({ page }: { page: Page }) {
  const g = getGlobal();
  const pages = getPages();
  const ring = summaries.ring.pages.map((r) => pages.find((p) => p.route === r)!).filter(Boolean);
  const i = ring.findIndex((p) => p.route === page.route);
  const prev = ring[(i - 1 + ring.length) % ring.length], next = ring[(i + 1) % ring.length];
  return (
    <nav className={styles.ring} aria-label={summaries.explore}>
      <Link href={prev.route} className={styles.ringArrow} rel="prev">
        <span className={styles.ringGlyph} aria-hidden="true">←</span>
        <span><span className={styles.mono}>{g.fields.explorePrev}</span><br />{summaries.explore} {nameOf(prev)}</span>
      </Link>
      <details className={styles.ringMenu}>
        <summary>{summaries.explore} <span aria-hidden="true">↓</span></summary>
        <ul>{ring.map((p) => <li key={p.route}><Link href={p.route} aria-current={p.route === page.route ? "page" : undefined}>{nameOf(p)}</Link></li>)}</ul>
      </details>
      <Link href={next.route} className={`${styles.ringArrow} ${styles.ringNext}`} rel="next">
        <span><span className={styles.mono}>{g.fields.exploreNext}</span><br />{summaries.explore} {nameOf(next)}</span>
        <span className={styles.ringGlyph} aria-hidden="true">→</span>
      </Link>
    </nav>
  );
}

export default function PageB({ page }: { page: Page }) {
  const g = getGlobal();
  const fn = functions.functions.find((f) => f.id === page.fn);
  const tone = fn ? (toneClass[fn.tone] ?? styles.ink) : styles.ink;
  const h1 = page.sections[0].blocks.find((b) => b.type === "h1");
  const sizes = [styles.cardTitleL, styles.cardTitleM, styles.cardTitleS];
  return (
    <div className={styles.page}>
      <MotionB />
      <Ring page={page} />
      <section className={`${styles.row} ${styles.intentHero}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={g.shortName} delay={200} speed={90} className={`${styles.mono} ${styles.intentSmall}`} as="p" />
          {fn ? (
            <>
              <div className={styles.intentMark} style={{ color: fn.color }} aria-hidden="true">
                <svg viewBox="180 192.5 640 640" data-draw><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></svg>
              </div>
              <Typed text={fn.name} delay={1500} speed={70} className={styles.intentName} as="h2" />
            </>
          ) : (
            <Typed text={page.nav ?? page.title} delay={900} speed={70} className={styles.intentName} as="p" />
          )}
        </div>
        <div className={`${styles.panel} ${tone}`}>
          <span />
          {h1 && h1.type === "h1" && <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>}
        </div>
      </section>
      {page.sections.map((s, i) => {
        const t = titleOf(s);
        const body = s.blocks.filter((b) => b.type !== "h1" && b.type !== "h2");
        if (!body.length) return null;
        const flip = i % 2 === 1;
        const title = t && i > 0 ? <h2 className={`${styles.cardTitle} ${sizes[i % 3]}`}><InlineNodes nodes={t.text} /></h2> : <p className={styles.slideLabel}>{nameOf(page)}</p>;
        return (
          <section key={i} className={`${styles.row} ${styles.card} ${flip ? styles.cardFlip : ""}`} data-slide={flip ? "right" : "left"}>
            <div className={`${styles.panel} ${flip ? styles.paper : styles.stone} ${styles.cardTitlePanel}`}>{title}</div>
            <div className={`${styles.panel} ${styles.paper} ${styles.slideBody} ${styles.cardBody}`}>{body.map((b, j) => <BlockView key={j} b={b} />)}</div>
          </section>
        );
      })}
      {fn && <section className={`${styles.row} ${styles.lineRow}`}><div className={`${styles.panel} ${styles.paper}`}><ExploreOn audience="founders" exclude={page.route} withLine /></div></section>}
      <Ring page={page} />
    </div>
  );
}
