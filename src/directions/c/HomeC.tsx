// Direction C — the method. The home page as a scroll story: vertical, then sideways for
// the read, the four functions and the terms. Every word is the deck's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal } from "@/lib/content";
import styles from "./c.module.css";
import MotionC from "./MotionC";
import Stream from "./Stream";

const find = <T extends Block["type"]>(s: Section, type: T, n = 0) =>
  s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;

const Btn = ({ href, label, ghost = false }: { href: string; label: string; ghost?: boolean }) => (
  <Link href={href} className={`btn ${ghost ? "btn-ghost" : "btn-cta"}`}>{label}</Link>
);

export default function HomeC({ page }: { page: Page }) {
  const g = getGlobal();
  const [hero, read, four, band, line, terms, story, programs] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const readT = find(read, "h2")!, readP = find(read, "p", 0)!, readLine = find(read, "p", 1)!, readBtn = find(read, "buttons")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourRows = find(four, "rows")!, fourOut = find(four, "p", 1)!, fourBtn = find(four, "buttons")!;
  const bandT = find(band, "h2")!, lineP = find(line, "p")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtn = find(terms, "buttons")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p"), storyBtn = find(story, "buttons")!;
  const progT = find(programs, "h2")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  const tones = [styles.teal, styles.aqua, styles.plum, styles.ink];
  // the read's three columns, as the deck names them in "The read — Covered, needs building, yours to do"
  const cols = ["Covered", "Needs building", "Yours to do"];

  return (
    <div className={styles.page}>
      <Stream />
      <MotionC />
      <div className={styles.progress} data-progress aria-hidden="true">000%</div>

      <section className={`wrap ${styles.hero}`} data-shape="stream">
        <p className={styles.label}><InlineNodes nodes={tagline.text} /></p>
        <h1 className={styles.h1} data-arrive><InlineNodes nodes={h1.text} /></h1>
        <p className={styles.lead} data-arrive><InlineNodes nodes={lead.text} /></p>
        <div className={styles.buttons} data-arrive>{heroBtns.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost={b.style !== "cta"} />)}</div>
        <p className={styles.aside}><InlineNodes nodes={aside.text} /></p>
      </section>

      {/* Where you stand — vertical intro, then three slides for the three columns */}
      <section className={`wrap ${styles.chapter}`} data-shape="three">
        <p className={styles.label}>{readT.raw}</p>
        <h2 className={styles.title} data-arrive><InlineNodes nodes={readT.text} /></h2>
        <p className={styles.body}><InlineNodes nodes={readP.text} /></p>
      </section>
      <section className={styles.sideways} data-sideways aria-label={readT.raw}>
        <div className={styles.head}><span className={styles.counter}><span data-counter>01</span> / 03</span><span className={styles.label}>{readT.raw}</span></div>
        <div className={styles.track} data-track>
          {cols.map((c, i) => (
            <div key={c} className={styles.slide}>
              <p className={styles.word}>{c}</p>
              {i === 2 && <p className={styles.slideText}><InlineNodes nodes={readLine.text} /></p>}
              {i === 2 && <div className={styles.buttons}>{readBtn.buttons.map((b, j) => <Btn key={j} href={b.href} label={b.label} />)}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* One firm, four functions — four slides, each with its tone */}
      <section className={`wrap ${styles.chapter}`} data-shape="four">
        <p className={styles.label}>{fourT.raw}</p>
        <h2 className={styles.title} data-arrive><InlineNodes nodes={fourT.text} /></h2>
        <p className={styles.body}><InlineNodes nodes={fourP.text} /></p>
      </section>
      <section className={styles.sideways} data-sideways aria-label={fourT.raw}>
        <div className={styles.head}><span className={styles.counter}><span data-counter>01</span> / 04</span><span className={styles.label}>{fourT.raw}</span></div>
        <div className={styles.track} data-track>
          {fourRows.items.map((it, i) => (
            <div key={i} className={`${styles.slide} ${i === 0 ? styles.onTeal : styles.onTone}`}>
              <div className={`${styles.tone} ${tones[i]}`} aria-hidden="true" />
              <p className={styles.word}><InlineNodes nodes={it.lead} /></p>
              <p className={styles.slideText}><InlineNodes nodes={it.rest} /></p>
            </div>
          ))}
        </div>
      </section>
      <section className={`wrap ${styles.chapter}`} data-shape="mark" style={{ paddingBlockStart: 48 }}>
        <p className={styles.body}><InlineNodes nodes={fourOut.text} /></p>
        <div className={styles.buttons}>{fourBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost />)}</div>
      </section>

      <section className="wrap">
        <div className={styles.band}><h2 className={styles.title} data-arrive><InlineNodes nodes={bandT.text} /></h2></div>
        <p className={styles.body}><InlineNodes nodes={lineP.text} /></p>
      </section>

      {/* How we work — three terms, three slides */}
      <section className={`wrap ${styles.chapter}`} data-shape="three">
        <p className={styles.label}>{termsT.raw}</p>
        <h2 className={styles.title} data-arrive><InlineNodes nodes={termsT.text} /></h2>
        <p className={styles.body}><InlineNodes nodes={termsP.text} /></p>
      </section>
      <section className={styles.sideways} data-sideways aria-label={termsT.raw}>
        <div className={styles.head}><span className={styles.counter}><span data-counter>01</span> / 03</span><span className={styles.label}>{termsT.raw}</span></div>
        <div className={styles.track} data-track>
          {termsItems.items.map((it, i) => (
            <div key={i} className={styles.slide}>
              <p className={styles.term}><InlineNodes nodes={it.lead} /></p>
              <p className={styles.termText}><InlineNodes nodes={it.rest} /></p>
              {i === 2 && <div className={styles.buttons}>{termsBtn.buttons.map((b, j) => <Btn key={j} href={b.href} label={b.label} ghost />)}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.story}`} data-shape="stream">
        <h2 className={styles.title} data-arrive><InlineNodes nodes={storyT.text} /></h2>
        <div className={styles.storyText}>
          {storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}
          <div className={styles.buttons} style={{ marginBlockStart: 24 }}>{storyBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost />)}</div>
        </div>
      </section>

      <section className="wrap">
        <div className={styles.programs}>
          <h2 className={styles.title} data-arrive><InlineNodes nodes={progT.text} /></h2>
          {progPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}
          <div className={styles.buttons}>{progBtn.buttons.map((b, i) => <Link key={i} href={b.href} className={`btn ${styles.btn}`}>{b.label}</Link>)}</div>
        </div>
      </section>
      <span hidden>{g.siteName}</span>
    </div>
  );
}
