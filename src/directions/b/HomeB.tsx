// Direction B — the grid. The home page as edge-to-edge panels. Every word is the deck's or
// the founder's; the blocks come from content/pages/home.md in their order. Layout is this file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal, getPageByRoute, inlineToText } from "@/lib/content";
import audiences from "../../../content/audiences.json";
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

const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink, aqua: styles.aqua };

export default function HomeB({ page }: { page: Page }) {
  const g = getGlobal();
  const [hero, consult, story, start] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p");
  const startT = find(start, "h2")!, doors = find(start, "rows")!;
  const kinds = ["business", "partners", "talent", "general"] as const;
  const close = g.fields.menuClose;
  const toneMap = { ...toneClass, aqua: styles.aqua };
  const summary = (key: "what-we-do" | "about" | "programs") => {
    const pg = getPageByRoute(`/${key}`)!;
    return { id: `chapter-${key}`, label: pg.nav ?? pg.title, cards: summaries.panels[key].cards, learnMore: summaries.learnMore, tones: toneMap, closeLabel: close };
  };
  const chAbout = summary("about");
  const consultT = find(consult, "h2")!, consultP = find(consult, "p", 0)!;
  const asideParts = inlineToText(aside.text).split(" | ").flatMap((t, i) => (i ? [{ text: "|", className: styles.pipe }, { text: t }] : [{ text: t, className: "ar" }]));

  return (
    <Chapters>
    <div className={styles.page}>
      <MotionB />

      {/* 1 — the split: the name typed in; the mark's arcs drawn in on teal; the two lines typed after */}
      <section className={`${styles.row} ${styles.hero}`} aria-label={g.siteName}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={inlineToText(tagline.text)} delay={1100} speed={28} className={`${styles.mono} ${styles.monoLg}`} as="p" />
          <Typed text={g.siteName} delay={200} speed={80} className={styles.word} as="p" />
        </div>
        <div className={`${styles.panel} ${styles.tealDeep}`}>
          <Arcs />
          <span />
          <Typed parts={asideParts} delay={2600} speed={70} className={`${styles.mono} ${styles.monoLg} ${styles.asideTyped}`} as="p" />
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

      {/* 3 — We consult: three audiences; each card opens on hover with the fuller line and Learn more */}
      <section id="we-consult" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={consultT.text} /></h2>
          <p className={styles.lead}><InlineNodes nodes={consultP.text} /></p>
        </div>
      </section>
      <section className={`${styles.row} ${styles.three}`}>
        {audiences.audiences.map((a) => (
          <FunctionCard key={a.id} href={a.href} label={`${a.word}: ${audiences.learnMore}`} className={`${styles.panel} ${styles.fn} ${toneClass[a.tone] ?? styles.ink}`}>
            <div className={styles.fnDefault}>
              <p className={styles.bigH} data-rise>{a.word}</p>
              <p className={styles.mono} style={{ fontSize: 14, lineHeight: 1.5 }}>{a.short}</p>
            </div>
            <div className={styles.fnOpen} style={{ color: a.color }}>
              <div className={styles.fnHead}><Mark className={styles.fnMark} /><span>{a.word}</span></div>
              <p className={styles.fnLong}>{a.long}</p>
              <Link href={a.href} className={`${styles.action} ${styles.fnCta}`} style={{ background: a.color, borderColor: a.color }}>{audiences.learnMore}</Link>
            </div>
          </FunctionCard>
        ))}
      </section>

      {/* 4 — Beyond the executive layer: the story */}
      <section id="about" className={`${styles.row} ${styles.story}`}>
        <div className={`${styles.panel} ${styles.plum}`} data-slide="left">
          <h2 className={styles.title}><InlineNodes nodes={storyT.text} /></h2>
        </div>
        <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
          <div className={styles.storyText}>{storyPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}</div>
        </div>
      </section>

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
