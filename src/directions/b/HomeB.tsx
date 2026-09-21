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

function Arcs({ small = false }: { small?: boolean }) {
  // the construction mark, as the founder supplied it: two stroked circles, no fill
  return (
    <div className={`${styles.arcs} ${small ? styles.arcsSmall : ""}`} aria-hidden="true">
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
  const [hero, read, four, band, line, terms, story, programs] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const readT = find(read, "h2")!, readP = find(read, "p", 0)!, readLine = find(read, "p", 1)!, readBtn = find(read, "buttons")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourRows = find(four, "rows")!, fourOut = find(four, "p", 1)!, fourBtn = find(four, "buttons")!;
  const bandT = find(band, "h2")!, lineP = find(line, "p")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtn = find(terms, "buttons")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p"), storyBtn = find(story, "buttons")!;
  const progT = find(programs, "h2")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  const tones = [styles.teal, styles.aqua, styles.plum, styles.ink];

  return (
    <div className={styles.page}>
      <MotionB />

      {/* 1 — the split: the name at screen scale; the mark's arcs in teal */}
      <section className={`${styles.row} ${styles.hero}`} aria-label={g.siteName}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <p className={styles.mono}><InlineNodes nodes={tagline.text} /></p>
          <p className={styles.word} data-letters>{g.siteName}</p>
        </div>
        <div className={`${styles.panel} ${styles.teal}`}>
          <Arcs />
          <span />
          <p className={`${styles.mono} ${styles.strip}`}><InlineNodes nodes={aside.text} /></p>
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

      {/* 3 — Where you stand: title in paper, the read in three cells */}
      <section className={`${styles.row} ${styles.read}`}>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={readT.text} /></h2>
          <div style={{ marginInline: -28, marginBlockEnd: -28 }} className={styles.actions}>
            {readBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} fill />)}
          </div>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="up">
          <p className={styles.body}><InlineNodes nodes={readP.text} /></p>
        </div>
        <div className={`${styles.panel} ${styles.soft}`} data-slide="right">
          <p className={`${styles.mono}`} style={{ fontSize: 15, lineHeight: 1.5 }}><InlineNodes nodes={readLine.text} /></p>
        </div>
      </section>

      {/* 4 — One firm, four functions: four panels, four colours */}
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={fourT.text} /></h2>
          <p className={styles.lead} style={{ maxInlineSize: "22ch" }}><InlineNodes nodes={fourP.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.four}`}>
        {fourRows.items.map((it, i) => (
          <div key={i} className={`${styles.panel} ${tones[i]}`} data-slide="up">
            <p className={styles.big} data-rise><InlineNodes nodes={it.lead} /></p>
            <p className={`${styles.mono} ${i === 0 ? styles.strip : ""}`} style={{ fontSize: 14, lineHeight: 1.5 }}><InlineNodes nodes={it.rest} /></p>
          </div>
        ))}
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <p className={styles.lead}><InlineNodes nodes={fourOut.text} /></p>
          {fourBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
        </div>
      </section>

      {/* 5 — A few steps ahead: teal, the title alone */}
      <section className={`${styles.row} ${styles.band}`}>
        <div className={`${styles.panel} ${styles.teal}`}>
          <Arcs small />
          <h2 className={styles.titleHuge} style={{ position: "relative" }} data-rise><InlineNodes nodes={bandT.text} /></h2>
        </div>
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <p className={styles.lead} style={{ maxInlineSize: "40ch" }}><InlineNodes nodes={lineP.text} /></p>
        </div>
      </section>

      {/* 6 — How we work: three terms, three panels, the numbers in mono */}
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <h2 className={styles.title}><InlineNodes nodes={termsT.text} /></h2>
          <p className={styles.lead} style={{ maxInlineSize: "24ch" }}><InlineNodes nodes={termsP.text} /></p>
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

      {/* 7 — Before it's big: the story as a broadsheet */}
      <section className={`${styles.row} ${styles.story}`}>
        <div className={`${styles.panel} ${styles.plum}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={storyT.text} /></h2>
        </div>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
          <div className={styles.storyText}>{storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}</div>
          {storyBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} />)}
        </div>
      </section>

      {/* 8 — Programs: aqua */}
      <section className={`${styles.row} ${styles.programs}`}>
        <div className={`${styles.panel} ${styles.aqua}`} data-slide="left">
          <h2 className={styles.titleHuge} data-rise><InlineNodes nodes={progT.text} /></h2>
          <div className={styles.stack}>{progPs.map((p, i) => p.type === "p" && <p key={i} className={styles.lead} style={{ maxInlineSize: "30ch" }}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <span />
          {progBtn.buttons.map((b, i) => <Action key={i} href={b.href} label={b.label} fill />)}
        </div>
      </section>
    </div>
  );
}
