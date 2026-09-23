// Direction B — the home page. Every word is the deck's or the founder's; the blocks come
// from content/pages/home.md in their order, the cards from content/audiences.json and
// content/focus.json. Layout is this file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { getGlobal, getPageByRoute, inlineToText } from "@/lib/content";
import focus from "../../../content/focus.json";
import forms from "../../../content/forms.json";
import summaries from "../../../content/summaries.json";
import booking from "../../../content/booking.json";
import nav from "../../../content/nav.json";
import styles from "./b.module.css";
import { C2, F5 } from "@/explore/Variants";
import MotionB from "./MotionB";
import Typed from "./Typed";
import { Chapters, ChapterButton, Door, Panel, SummaryPanel } from "./Chapter";
import FormStrip from "./FormStrip";
import type { FormDef, Labels, Routing } from "./FormStrip";
import { FORM_PRESETS } from "./hrefs";

const find = <T extends Block["type"]>(s: Section, type: T, n = 0) =>
  s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;

export function Arcs({ small = false, ink = false }: { small?: boolean; ink?: boolean }) {
  // the outlined mark — the founder's preferred logo (rework/rulings §13) — drawn in where large
  return (
    <div className={`${styles.arcs} ${small ? styles.arcsSmall : ""} ${ink ? styles.arcsInk : ""}`} aria-hidden="true">
      <svg viewBox="180 192.5 640 640" data-draw>
        <circle cx="500" cy="530" r="240" />
        <circle cx="500" cy="455" r="200" />
      </svg>
    </div>
  );
}

function Btn({ href, label, fill = false, close }: { href: string; label: string; fill?: boolean; close: string }) {
  if (FORM_PRESETS[href]) return <Door id="form-reach" className={`${styles.action} ${fill ? styles.actionFill : ""}`}>{label}</Door>;
  if (/^#(form|chapter)-/.test(href)) return <ChapterButton id={href.slice(1)} openLabel={label} closeLabel={close} fill={fill} />;
  return <Link href={href} className={`${styles.action} ${fill ? styles.actionFill : ""}`}>{label}</Link>;
}

export const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink, aqua: styles.aqua };

export default function HomeB({ page }: { page: Page }) {
  const g = getGlobal();
  const [hero, consult, , start] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, leadList = find(hero, "list"), heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const consultT = find(consult, "h2")!;
  const startT = find(start, "h2")!, doors = find(start, "rows")!;
  const close = g.fields.menuClose;
  const about = getPageByRoute("/about")!;
  const chAbout = { id: "chapter-about", label: about.nav ?? about.title, cards: summaries.panels.about.cards, learnMore: summaries.learnMore, tones: toneClass, closeLabel: close };
  const asideParts = inlineToText(aside.text).split(" | ").flatMap((t, i) => (i ? [{ text: "|", className: styles.pipe }, { text: t }] : [{ text: t, className: "ar" }]));

  return (
    <Chapters>
    <div className={styles.page}>
      <MotionB />

      {/* 1 — the split: the name typed in; the arcs drawn in on teal; the two lines typed after */}
      <section className={`${styles.row} ${styles.hero}`} aria-label={g.siteName}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={inlineToText(tagline.text)} delay={1100} speed={60} className={`${styles.mono} ${styles.monoLg}`} as="p" />
          <Typed text={g.siteName} delay={200} speed={80} className={styles.word} as="p" />
        </div>
        <div className={`${styles.panel} ${styles.tealDeep}`}>
          <Arcs />
          <span />
          <Typed parts={asideParts} delay={2200} speed={70} className={`${styles.mono} ${styles.monoLg} ${styles.asideTyped}`} as="p" />
        </div>
      </section>

      {/* 2 — the flip: the headline in ink; "Bidaya was born to:" and its three lines on stone */}
      <section id="what-we-do" className={`${styles.row} ${styles.flip}`}>
        <div className={`${styles.panel} ${styles.ink}`} data-slide="left">
          <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>
        </div>
        <div className={`${styles.panel} ${styles.stone}`} data-slide="right">
          <div>
            <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>
            {leadList && <ul className={styles.bornTo}>{leadList.items.map((it, i) => <li key={i}><InlineNodes nodes={it} /></li>)}</ul>}
          </div>
          <div className={`${styles.actions} ${styles.actionsFlush}`}>
            <ChapterButton id={chAbout.id} openLabel={heroBtns.buttons[0].label} closeLabel={close} fill={false} />
            <Btn href={heroBtns.buttons[1].href} label={heroBtns.buttons[1].label} fill close={close} />
          </div>
        </div>
      </section>
      <SummaryPanel {...chAbout} />

      {/* 3 — We consult for: three audiences; each card opens on hover with the fuller line and Learn more */}
      <section id="we-consult" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={consultT.text} /></h2>
        </div>
      </section>
      {/* exploration branch: C2, the founder's pick — the three names large, the block takes the hovered audience's colour */}
      <section className={styles.row}><C2 /></section>

      {/* 4 — We focus on: the seven, in the founder's words; each opens the page that best matches it */}
      <section id="we-focus-on" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <h2 className={styles.title}>{focus.title}</h2>
        </div>
      </section>
      {/* exploration branch: F5, the founder's pick — the seven as a diagonal accordion, each in its division's colour */}
      <section className={styles.row}><F5 /></section>

      {/* 6 — Start a conversation: one form, or a booking */}
      <section id="enquire" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <h2 className={styles.title}><InlineNodes nodes={startT.text} /></h2>
        </div>
      </section>
      <section id="start" className={`${styles.row} ${styles.doors} ${styles.doorsTwo}`}>
        {doors.items.map((it, i) => (
          <Door key={i} id={i === 0 ? "form-reach" : "booking"} className={`${styles.door} ${i === 0 ? styles.doorBusiness : styles.doorPartners}`}>
            <div className={styles.doorBody}>
              <strong><InlineNodes nodes={it.lead} /></strong>
              <p className={styles.body}><InlineNodes nodes={it.rest} /></p>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Door>
        ))}
      </section>
      <Panel id="form-reach" label={forms.reach.title}>
        <FormStrip id="form-reach" forms={forms.forms as unknown as Record<string, FormDef>} routing={forms.routing as unknown as Routing} title={forms.reach.title} labels={forms.labels as Labels} consent={forms.consent} consentNote={forms.consentNote} notWired={g.fields.formNotWired} closeLabel={close} />
      </Panel>
      <Panel id="booking" label={booking.label} closeLabel={close}>
        {booking.url ? (
          <iframe src={booking.url} title={booking.label} className={styles.bookingFrame} loading="lazy" />
        ) : (
          <div className={`${styles.panel} ${styles.paper}`}><p className={styles.lead}>{g.fields.bookingSoon}</p><p className={styles.body}><a href={`mailto:${nav.contactEmail}`}>{nav.contactEmail}</a></p></div>
        )}
      </Panel>
    </div>
    </Chapters>
  );
}
