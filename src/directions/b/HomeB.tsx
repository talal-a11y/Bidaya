// Direction B — the grid. The home page as edge-to-edge panels. Every word is the deck's;
// the blocks come from content/pages/home.md in their order. Layout is this file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal } from "@/lib/content";
import styles from "./b.module.css";
import MotionB from "./MotionB";

const find = <T extends Block["type"]>(s: Section, type: T, n = 0) =>
  s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;

function Arcs({ small = false, ink = false }: { small?: boolean; ink?: boolean }) {
  // the construction mark, as the founder supplied it: two stroked circles, no fill — always drawn in, never still
  return (
    <div className={`${styles.arcs} ${small ? styles.arcsSmall : ""} ${ink ? styles.arcsInk : ""}`} aria-hidden="true">
      <svg viewBox="180 192.5 640 640" data-draw>
        <circle cx="500" cy="530" r="240" />
        <circle cx="500" cy="455" r="200" />
      </svg>
    </div>
  );
}

function Action({ href, label, fill = false }: { href: string; label: string; fill?: boolean }) {
  return <Link href={href} className={`${styles.action} ${fill ? styles.actionFill : ""}`}>{label}</Link>;
}

export default function HomeB({ page }: { page: Page }) {
  const g = getGlobal();
  const [hero, four, band, line, terms, story, read, programs] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourRows = find(four, "rows")!, fourOut = find(four, "p", 1)!, fourBtn = find(four, "buttons")!;
  const bandT = find(band, "h2")!, lineP = find(line, "p")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtn = find(terms, "buttons")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p"), storyBtn = find(story, "buttons")!;
  const readT = find(read, "h2")!, readIntro = find(read, "p", 0)!, readLabels = read.blocks.filter((b) => b.type === "h3"), readPs = read.blocks.filter((b) => b.type === "p").slice(1), readBtn = find(read, "buttons")!;
  const progT = find(programs, "h2")!, progSoon = find(programs, "h3")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  const tones = [styles.tealDeep, styles.aqua, styles.plum, styles.ink];

  return (
    <div className={styles.page}>
      <MotionB />

      {/* 1 — the split: the name at screen scale; the mark's arcs drawn in on teal */}
      <section className={`${styles.row} ${styles.hero}`} aria-label={g.siteName}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <p className={styles.mono}><InlineNodes nodes={tagline.text} /></p>
          <p className={styles.word} data-letters>{g.siteName}</p>
        </div>
        <div className={`${styles.panel} ${styles.tealDeep}`}>
          <Arcs />
          <span />
          <p className={styles.mono} style={{ position: "relative", fontSize: 15 }}><InlineNodes nodes={aside.text} /></p>
        </div>
      </section>

      {/* 2 — the flip: the headline in ink, the lead on stone */}
      <section className={`${styles.row} ${styles.flip}`}>
        <div className={`${styles.panel} ${styles.ink}`} data-slide="left">
          <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>
          <div className={styles.actions} style={{ marginInline: -28, marginBlockEnd: -28 }}>
            {heroBtns.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} fill={b.style === "cta"} />)}
          </div>
        </div>
      </section>

      {/* 3 — One firm, four functions: four panels, four colours */}
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={fourT.text} /></h2>
          <p className={styles.lead}><InlineNodes nodes={fourP.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.four}`}>
        {fourRows.items.map((it, i) => (
          <div key={i} className={`${styles.panel} ${tones[i]}`} data-slide="up">
            <p className={styles.big} data-rise><InlineNodes nodes={it.lead} /></p>
            <p className={styles.mono} style={{ fontSize: 14, lineHeight: 1.5 }}><InlineNodes nodes={it.rest} /></p>
          </div>
        ))}
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <p className={styles.lead}><InlineNodes nodes={fourOut.text} /></p>
          {fourBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
        </div>
      </section>

      {/* 4 — A few steps ahead: teal, the title alone */}
      <section className={`${styles.row} ${styles.band}`}>
        <div className={`${styles.panel} ${styles.teal}`}>
          <h2 className={styles.titleHuge} data-rise><InlineNodes nodes={bandT.text} /></h2>
        </div>
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <p className={styles.lead}><InlineNodes nodes={lineP.text} /></p>
        </div>
      </section>

      {/* 5 — How we work: three terms, three panels */}
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <h2 className={styles.title}><InlineNodes nodes={termsT.text} /></h2>
          <p className={styles.lead}><InlineNodes nodes={termsP.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.terms}`}>
        {termsItems.items.map((it, i) => (
          <div key={i} className={`${styles.panel} ${[styles.ink, styles.stone, styles.paper][i]}`} data-slide={["left", "up", "right"][i]}>
            <p className={styles.number} data-rise><InlineNodes nodes={it.lead} /></p>
            <p className={styles.body}><InlineNodes nodes={it.rest} /></p>
          </div>
        ))}
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          {termsBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
        </div>
      </section>

      {/* 6 — Before it's big: the story */}
      <section className={`${styles.row} ${styles.story}`}>
        <div className={`${styles.panel} ${styles.plum}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={storyT.text} /></h2>
        </div>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
          <div className={styles.storyText}>{storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}</div>
          {storyBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
        </div>
      </section>

      {/* 7 — Where you stand: the reader knows the firm now; the read closes the page */}
      <section className={`${styles.row} ${styles.readIntro}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={readT.text} /></h2>
          <p className={styles.lead} style={{ maxInlineSize: "38ch" }}><InlineNodes nodes={readIntro.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.read}`}>
        {readPs.map((p, i) => (
          <div key={i} className={`${styles.panel} ${[styles.paper, styles.stone][i]} ${styles.readCell}`} data-slide={["left", "right"][i]}>
            <div>
              {readLabels[i]?.type === "h3" && <p className={styles.label}><InlineNodes nodes={readLabels[i].text} /></p>}
              <p className={styles.body}>{p.type === "p" && <InlineNodes nodes={p.text} />}</p>
            </div>
          </div>
        ))}
        <div className={`${styles.panel} ${styles.ink}`} data-slide="up">
          <span />
          <div className={styles.actions} style={{ marginInline: -28, marginBlockEnd: -28, borderColor: "var(--paper)" }}>
            {readBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
          </div>
        </div>
      </section>

      {/* 8 — Programs: aqua, coming soon */}
      <section className={`${styles.row} ${styles.programs}`}>
        <div className={`${styles.panel} ${styles.aqua}`} data-slide="left">
          <div>
            <h2 className={styles.titleHuge} data-rise><InlineNodes nodes={progT.text} /></h2>
            <p className={styles.comingSoon} style={{ marginBlockStart: 20 }}><InlineNodes nodes={progSoon.text} /></p>
          </div>
          <div className={styles.stack}>{progPs.map((p, i) => p.type === "p" && <p key={i} className={styles.lead} style={{ maxInlineSize: "34ch" }}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <Arcs ink />
          <span />
          {progBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} fill />)}
        </div>
      </section>
    </div>
  );
}
