// Direction B — the grid. The home page as edge-to-edge panels. Every word is the deck's;
// the blocks come from content/pages/home.md in their order. Layout is this file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal, inlineToText } from "@/lib/content";
import styles from "./b.module.css";
import MotionB from "./MotionB";
import { Chapters, ChapterButton, ChapterStrip, Door, Panel } from "./Chapter";
import FormStrip from "./FormStrip";
import type { FormDef, Labels } from "./FormStrip";
import forms from "../../../content/forms.json";
import { slidesFor } from "./ChapterSlides";
import { getPageByRoute } from "@/lib/content";

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
  const [hero, four, band, line, terms, story, read, programs, start] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourRows = find(four, "rows")!, fourOut = find(four, "p", 1)!, fourAside = find(four, "aside")!, fourBtn = find(four, "buttons")!;
  const startT = find(start, "h2")!, doors = find(start, "rows")!;
  const kinds = ["business", "partners", "talent", "general"] as const;
  const bandT = find(band, "h2")!, lineP = find(line, "p")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtn = find(terms, "buttons")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p");
  const readT = find(read, "h2")!, readIntro = find(read, "p", 0)!, readLabels = read.blocks.filter((b) => b.type === "h3"), readPs = read.blocks.filter((b) => b.type === "p").slice(1), readBtn = find(read, "buttons")!;
  const progT = find(programs, "h2")!, progSoon = find(programs, "h3")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  const tones = [styles.tealDeep, styles.opsDeep, styles.plum, styles.ink];
  // the four chapters: each section's button unfolds its page as sideways slides
  const chapter = (route: string, tone: string) => {
    const pg = getPageByRoute(route)!;
    return { label: pg.nav ?? pg.title, slides: slidesFor(pg), tone, id: `chapter-${route.slice(1)}` };
  };
  const chWhat = chapter("/what-we-do", styles.ink), chHow = chapter("/how-we-work", styles.plum), chAbout = chapter("/about", styles.tealDeep), chProg = chapter("/programs", styles.aqua);
  const close = g.fields.menuClose, prevLabel = g.fields.chapterPrev, nextLabel = g.fields.chapterNext;

  return (
    <Chapters>
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
      <section id="what-we-do" className={`${styles.row} ${styles.flip}`}>
        <div className={`${styles.panel} ${styles.ink}`} data-slide="left">
          <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>
          <div className={styles.actions} style={{ marginInline: -28, marginBlockEnd: -28 }}>
            <ChapterButton id={chAbout.id} openLabel={heroBtns.buttons[0].label} closeLabel={close} />
          </div>
        </div>
      </section>
      <ChapterStrip {...chAbout} closeLabel={close} prevLabel={prevLabel} nextLabel={nextLabel} />

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
          <div>
            <p className={styles.mono} style={{ marginBlockEnd: 14 }}><InlineNodes nodes={fourAside.text} /></p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <ChapterButton id={chWhat.id} openLabel={fourBtn.buttons[0].label} closeLabel={close} />
              <Action href={fourBtn.buttons[1].href} label={fourBtn.buttons[1].label} fill />
            </div>
          </div>
        </div>
      </section>
      <ChapterStrip {...chWhat} closeLabel={close} prevLabel={prevLabel} nextLabel={nextLabel} />

      {/* 4 — A few steps ahead: teal, the title alone */}
      <section className={`${styles.row} ${styles.band}`}>
        <div className={`${styles.panel} ${styles.teal}`}>
          <Arcs small />
          <h2 className={styles.title} style={{ position: "relative" }} data-rise><InlineNodes nodes={bandT.text} /></h2>
        </div>
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <p className={styles.lead}><InlineNodes nodes={lineP.text} /></p>
        </div>
      </section>

      {/* 5 — How we work: three terms, three panels */}
      <section id="how-we-work" className={`${styles.row} ${styles.lineRow}`}>
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
          <div><ChapterButton id={chHow.id} openLabel={termsBtn.buttons[0].label} closeLabel={close} /></div>
        </div>
      </section>
      <ChapterStrip {...chHow} closeLabel={close} prevLabel={prevLabel} nextLabel={nextLabel} />

      {/* 6 — Before it's big: the story */}
      <section id="about" className={`${styles.row} ${styles.story}`}>
        <div className={`${styles.panel} ${styles.plum}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={storyT.text} /></h2>
        </div>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
          <div className={styles.storyText}>{storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
      </section>

      {/* 7 — Where you stand: the reader knows the firm now; the read closes the page */}
      <section id="where-you-stand" className={`${styles.row} ${styles.readIntro}`}>
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
      <section id="programs" className={`${styles.row} ${styles.programs}`}>
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
          <div style={{ position: "relative" }}><ChapterButton id={chProg.id} openLabel={progBtn.buttons[0].label} closeLabel={close} /></div>
        </div>
      </section>
      <ChapterStrip {...chProg} closeLabel={close} prevLabel={prevLabel} nextLabel={nextLabel} />

      {/* 9 — Start a conversation: four doors, each to its own form (for now, all to /start) */}
      <section id="start" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={startT.text} /></h2>
        </div>
      </section>
      <section className={`${styles.row} ${styles.doors}`}>
        {doors.items.map((it, i) => (
          <Door key={i} id={`form-${kinds[i]}`} className={`${styles.door} ${[styles.doorBusiness, styles.doorPartners, styles.doorTalent, styles.doorGeneral][i]}`}>
            <div className={styles.doorBody}>
              <strong><InlineNodes nodes={it.lead} /></strong>
              <p className={styles.body}><InlineNodes nodes={it.rest} /></p>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Door>
        ))}
      </section>
      {doors.items.map((it, i) => (
        <Panel key={i} id={`form-${kinds[i]}`} label={inlineToText(it.lead).replace(/\.$/, "")} closeLabel={close}>
          <FormStrip id={`form-${kinds[i]}`} form={forms.forms[kinds[i]] as FormDef} labels={forms.labels as Labels} consent={forms.consent} notWired={g.fields.formNotWired} />
        </Panel>
      ))}
    </div>
    </Chapters>
  );
}
