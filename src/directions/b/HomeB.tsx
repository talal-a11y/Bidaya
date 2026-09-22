// Direction B — the grid. The home page as edge-to-edge panels. Every word is the deck's or
// the founder's; the blocks come from content/pages/home.md in their order. Layout is this file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal, getPageByRoute, inlineToText } from "@/lib/content";
import functions from "../../../content/functions.json";
import forms from "../../../content/forms.json";
import styles from "./b.module.css";
import MotionB from "./MotionB";
import Typed from "./Typed";
import FunctionCard from "./FunctionCard";
import { Chapters, ChapterButton, Door, Panel, SummaryPanel } from "./Chapter";
import summaries from "../../../content/summaries.json";
import FormStrip from "./FormStrip";
import type { FormDef, Labels } from "./FormStrip";

const find = <T extends Block["type"]>(s: Section, type: T, n = 0) =>
  s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;

// the mark's own path (brand/svg/bidaya-mark.svg), for the card headers — never redrawn
const MARK = "M260 530a240 240 0 1 0 480 0a240 240 0 1 0-480 0ZM300 455a200 200 0 1 0 400 0a200 200 0 1 0-400 0Z";
function Mark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 1000 1000" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" transform="translate(-470.8,-495.1) scale(1.9417)" d={MARK} /></svg>;
}

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

// a button in copy: #form-… or #chapter-… opens a panel on this page; anything else is a link
function Btn({ href, label, fill = false, close }: { href: string; label: string; fill?: boolean; close: string }) {
  if (/^#(form|chapter)-/.test(href)) return <ChapterButton id={href.slice(1)} openLabel={label} closeLabel={close} fill={fill} />;
  return <Link href={href} className={`${styles.action} ${fill ? styles.actionFill : ""}`}>{label}</Link>;
}

const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink };

export default function HomeB({ page }: { page: Page }) {
  const g = getGlobal();
  const [hero, four, terms, story, programs, start] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourOut = find(four, "p", 1)!, fourBtn = find(four, "buttons")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtns = terms.blocks.filter((b) => b.type === "buttons").flatMap((b) => (b.type === "buttons" ? b.buttons : []));
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p");
  const progT = find(programs, "h2")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  const startT = find(start, "h2")!, doors = find(start, "rows")!;
  const kinds = ["business", "partners", "talent", "general"] as const;
  const close = g.fields.menuClose;
  const toneMap = { ...toneClass, aqua: styles.aqua };
  const summary = (key: "what-we-do" | "about" | "programs") => {
    const pg = getPageByRoute(`/${key}`)!;
    return { id: `chapter-${key}`, label: pg.nav ?? pg.title, cards: summaries.panels[key].cards, learnMore: summaries.learnMore, tones: toneMap, closeLabel: close };
  };
  const chWhat = summary("what-we-do"), chAbout = summary("about"), chProg = summary("programs");

  return (
    <Chapters>
    <div className={styles.page}>
      <MotionB />

      {/* 1 — the split: the name typed in; the mark's arcs drawn in on teal; the two lines typed after */}
      <section className={`${styles.row} ${styles.hero}`} aria-label={g.siteName}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={inlineToText(tagline.text)} delay={1100} speed={28} className={`${styles.mono} ${styles.monoLg}`} as="p" />
          <Typed text={g.siteName} delay={200} speed={110} className={styles.word} as="p" />
        </div>
        <div className={`${styles.panel} ${styles.tealDeep}`}>
          <Arcs />
          <span />
          <Typed text={inlineToText(aside.text)} delay={2300} speed={22} className={`${styles.mono} ${styles.monoLg} ${styles.asideTyped}`} as="p" />
        </div>
      </section>

      {/* 2 — the flip: the headline in ink, the lead on stone; About opens from here */}
      <section id="what-we-do" className={`${styles.row} ${styles.flip}`}>
        <div className={`${styles.panel} ${styles.ink}`} data-slide="left">
          <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>
          <div className={styles.actions} style={{ marginInline: -28, marginBlockEnd: -28 }}>
            <ChapterButton id={chAbout.id} openLabel={heroBtns.buttons[0].label} closeLabel={close} fill={false} />
            <Btn href={heroBtns.buttons[1].href} label={heroBtns.buttons[1].label} fill close={close} />
          </div>
        </div>
      </section>
      <SummaryPanel {...chAbout} />

      {/* 3 — One firm, four functions: four cards; each opens on hover with the mark, the long line and Learn more */}
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={fourT.text} /></h2>
          <p className={styles.lead}><InlineNodes nodes={fourP.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.four}`}>
        {functions.functions.map((f) => (
          <FunctionCard key={f.id} href={f.href} label={`${f.word}: ${functions.learnMore}`} className={`${styles.panel} ${styles.fn} ${toneClass[f.tone]}`}>
            <div className={styles.fnDefault}>
              <p className={styles.big} data-rise>{f.word}.</p>
              <p className={styles.mono} style={{ fontSize: 14, lineHeight: 1.5 }}>{f.short}</p>
            </div>
            <div className={styles.fnOpen} style={{ color: f.color }} id={`function-${f.id}`}>
              <div className={styles.fnHead}><Mark className={styles.fnMark} /><span>{f.word}</span></div>
              <p className={styles.fnLong}>{f.long}</p>
              <Link href={f.href} className={`${styles.action} ${styles.fnCta}`} style={{ background: f.color, borderColor: f.color }}>{functions.learnMore}</Link>
            </div>
          </FunctionCard>
        ))}
      </section>
      <section className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <p className={styles.lead}><InlineNodes nodes={fourOut.text} /></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <ChapterButton id={chWhat.id} openLabel={fourBtn.buttons[0].label} closeLabel={close} />
          </div>
        </div>
      </section>
      <SummaryPanel {...chWhat} />

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
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {termsBtns.map((b, i) => <Btn key={i} href={b.href} label={b.label} fill close={close} />)}
          </div>
        </div>
      </section>

      {/* 6 — Before it's big: the story */}
      <section id="about" className={`${styles.row} ${styles.story}`}>
        <div className={`${styles.panel} ${styles.plum}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={storyT.text} /></h2>
        </div>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
          <div className={styles.storyText}>{storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
      </section>

      {/* 7 — Programs: aqua, coming soon */}
      <section id="programs" className={`${styles.row} ${styles.programs}`}>
        <div className={`${styles.panel} ${styles.aqua}`} data-slide="left">
          <div>
            <h2 className={styles.titleHuge} data-rise><InlineNodes nodes={progT.text} /></h2>
          </div>
          <div className={styles.stack}>{progPs.map((p, i) => p.type === "p" && <p key={i} className={styles.lead} style={{ maxInlineSize: "34ch" }}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <Arcs ink />
          <span />
          <div style={{ position: "relative" }}><ChapterButton id={chProg.id} openLabel={progBtn.buttons[0].label} closeLabel={close} /></div>
        </div>
      </section>
      <SummaryPanel {...chProg} />

      {/* 8 — Start a conversation: four doors, each to its own form */}
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
        <Panel key={i} id={`form-${kinds[i]}`} label={inlineToText(it.lead).replace(/\.$/, "")}>
          <FormStrip id={`form-${kinds[i]}`} form={forms.forms[kinds[i]] as FormDef} labels={forms.labels as Labels} consent={forms.consent} notWired={g.fields.formNotWired} closeLabel={close} />
        </Panel>
      ))}
    </div>
    </Chapters>
  );
}
