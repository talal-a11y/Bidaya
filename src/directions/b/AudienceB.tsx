// An audience page (Founders, Creatives & Pre-preneurs, Institutions): the home page's own
// shapes, section by section, chosen by the page file's @kind — flip, functions, card,
// terms, story — with the ring bar above and below. Every word is the page file's.
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { getGlobal } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import functions from "../../../content/functions.json";
import audiences from "../../../content/audiences.json";
import styles from "./b.module.css";
import Typed from "./Typed";
import MotionB from "./MotionB";
import FunctionCard from "./FunctionCard";
import { Chapters } from "./Chapter";
import { Ring, BlockView, Mark } from "./PageB";

const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink, aqua: styles.aqua };
const find = <T extends Block["type"]>(s: Section, type: T, n = 0) => s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;

// a button in copy: #form-… goes to the home page and opens that form; anything else is a link
function Btn({ href, label, fill = true }: { href: string; label: string; fill?: boolean }) {
  return <Link href={/^#(form|chapter)-/.test(href) ? `/${href}` : href} className={`${styles.action} ${fill ? styles.actionFill : ""}`}>{label}</Link>;
}
const Buttons = ({ s }: { s: Section }) => {
  const b = s.blocks.filter((x) => x.type === "buttons").flatMap((x) => (x.type === "buttons" ? x.buttons : []));
  return b.length ? <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{b.map((x, i) => <Btn key={i} href={x.href} label={x.label} fill={x.style === "cta"} />)}</div> : null;
};

export default function AudienceB({ page }: { page: Page }) {
  const g = getGlobal();
  const au = audiences.audiences.find((a) => a.id === page.audience) ?? audiences.audiences[0];
  const tone = toneClass[au.tone] ?? styles.ink;
  const [hero, ...rest] = page.sections;
  const h1 = find(hero, "h1"), lead = find(hero, "lead");
  return (
    <Chapters>
    <div className={styles.page}>
      <MotionB />
      <Ring page={page} />
      {/* the hero, as the home page's: the name typed in on stone; the headline on the audience's colour */}
      <section className={`${styles.row} ${styles.intentHero}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={g.shortName} delay={200} speed={90} className={`${styles.mono} ${styles.intentSmall}`} as="p" />
          <div className={styles.intentMark} style={{ color: au.color }} aria-hidden="true">
            <svg viewBox="180 192.5 640 640" data-draw><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></svg>
          </div>
          <Typed text={au.name} delay={1500} speed={60} className={styles.intentName} as="p" />
        </div>
        <div className={`${styles.panel} ${tone}`}>
          {h1 && <h1 className={styles.h1}><InlineNodes nodes={h1.text} /></h1>}
          <div>
            {lead && <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>}
            <div style={{ marginBlockStart: 20 }}><Buttons s={hero} /></div>
          </div>
        </div>
      </section>

      {rest.map((s, i) => {
        const t = find(s, "h2");
        const ps = s.blocks.filter((b) => b.type === "p");
        const body = s.blocks.filter((b) => b.type !== "h2" && b.type !== "buttons");
        switch (s.kind) {
          case "functions":
            return (
              <div key={i}>
                <section className={`${styles.row} ${styles.lineRow}`}>
                  <div className={`${styles.panel} ${styles.stone}`}>
                    {t && <h2 className={styles.title}><InlineNodes nodes={t.text} /></h2>}
                    {ps[0] && ps[0].type === "p" && <p className={styles.lead}><InlineNodes nodes={ps[0].text} /></p>}
                  </div>
                </section>
                <section className={`${styles.row} ${styles.four}`}>
                  {functions.functions.map((f) => (
                    <FunctionCard key={f.id} href={f.href} label={`${f.word}: ${functions.learnMore}`} className={`${styles.panel} ${styles.fn} ${toneClass[f.tone]}`}>
                      <div className={styles.fnDefault}>
                        <p className={styles.big} data-rise>{f.word}.</p>
                        <p className={styles.mono} style={{ fontSize: 14, lineHeight: 1.5 }}>{f.short}</p>
                      </div>
                      <div className={styles.fnOpen} style={{ color: f.color }}>
                        <div className={styles.fnHead}><Mark className={styles.fnMark} /><span>{f.word}</span></div>
                        <p className={styles.fnLong}>{f.long}</p>
                        <Link href={f.href} className={`${styles.action} ${styles.fnCta}`} style={{ background: f.color, borderColor: f.color }}>{functions.learnMore}</Link>
                      </div>
                    </FunctionCard>
                  ))}
                </section>
                {ps[1] && ps[1].type === "p" && (
                  <section className={`${styles.row} ${styles.lineRow}`}>
                    <div className={`${styles.panel} ${styles.paper}`}><p className={styles.lead}><InlineNodes nodes={ps[1].text} /></p><Buttons s={s} /></div>
                  </section>
                )}
              </div>
            );
          case "terms": {
            const items = find(s, "terms");
            return (
              <div key={i} id="how-we-work">
                <section className={`${styles.row} ${styles.lineRow}`}>
                  <div className={`${styles.panel} ${styles.paper}`}>
                    {t && <h2 className={styles.title}><InlineNodes nodes={t.text} /></h2>}
                    {ps[0] && ps[0].type === "p" && <p className={styles.lead}><InlineNodes nodes={ps[0].text} /></p>}
                  </div>
                </section>
                {items && (
                  <section className={`${styles.row} ${styles.terms}`}>
                    {items.items.map((it, k) => (
                      <div key={k} className={`${styles.panel} ${[styles.ink, styles.stone, styles.paper][k]}`} data-slide={["left", "up", "right"][k]}>
                        <p className={styles.number} data-rise><InlineNodes nodes={it.lead} /></p>
                        <p className={styles.body}><InlineNodes nodes={it.rest} /></p>
                      </div>
                    ))}
                  </section>
                )}
                <section className={`${styles.row} ${styles.lineRow}`}><div className={`${styles.panel} ${styles.stone}`}><Buttons s={s} /></div></section>
              </div>
            );
          }
          case "story":
            return (
              <section key={i} className={`${styles.row} ${styles.story}`}>
                <div className={`${styles.panel} ${styles.plum}`} data-slide="left">{t && <h2 className={styles.title}><InlineNodes nodes={t.text} /></h2>}</div>
                <div className={`${styles.panel} ${styles.paper}`} data-slide="right">
                  <div className={styles.storyText}>{ps.map((p, k) => p.type === "p" && <p key={k}><InlineNodes nodes={p.text} /></p>)}</div>
                  <Buttons s={s} />
                </div>
              </section>
            );
          default: {
            const flip = i % 2 === 1;
            return (
              <section key={i} className={`${styles.row} ${styles.card} ${flip ? styles.cardFlip : ""}`} data-slide={flip ? "right" : "left"}>
                <div className={`${styles.panel} ${flip ? styles.paper : styles.stone} ${styles.cardTitlePanel}`}>{t && <h2 className={`${styles.cardTitle} ${styles.cardTitleM}`}><InlineNodes nodes={t.text} /></h2>}</div>
                <div className={`${styles.panel} ${styles.paper} ${styles.slideBody} ${styles.cardBody}`}>{body.map((b, j) => <BlockView key={j} b={b} />)}<Buttons s={s} /></div>
              </section>
            );
          }
        }
      })}
      <Ring page={page} />
    </div>
    </Chapters>
  );
}
