// Direction A — the field. Every word is the deck's; the layout and motion are this file's.
import Link from "next/link";
import type { Block, Inline, Page, Section } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import { inlineToText } from "@/lib/content";
import styles from "./a.module.css";
import Field from "./Field";
import MotionA from "./MotionA";

const find = <T extends Block["type"]>(s: Section, type: T, n = 0) =>
  s.blocks.filter((b) => b.type === type)[n] as Extract<Block, { type: T }> | undefined;
const Btn = ({ href, label, ghost = false }: { href: string; label: string; ghost?: boolean }) => (
  <Link href={href} className={`btn ${ghost ? "btn-ghost" : "btn-cta"}`}>{label}</Link>
);
// the headline split into its lines for the reveal; the deck's dash starts a line
function Lines({ nodes }: { nodes: Inline[] }) {
  const text = inlineToText(nodes);
  const lines = text.split(/(?= — )/).flatMap((chunk) => chunk.split(/(?<=,)\s/));
  return <>{lines.map((l, i) => <span key={i} className={styles.line}><span data-line>{l.trim()}</span></span>)}</>;
}
const Construction = ({ stroke, ...rest }: { stroke?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="180 192.5 640 640" data-draw {...rest}>
    <circle cx="500" cy="530" r="240" style={stroke ? { stroke } : undefined} />
    <circle cx="500" cy="455" r="200" style={stroke ? { stroke } : undefined} />
  </svg>
);

export default function HomeA({ page }: { page: Page }) {
  const [hero, read, four, band, line, terms, story, programs] = page.sections;
  const h1 = find(hero, "h1")!, tagline = find(hero, "tagline")!, lead = find(hero, "lead")!, heroBtns = find(hero, "buttons")!, aside = find(hero, "aside")!;
  const readT = find(read, "h2")!, readP = find(read, "p", 0)!, readLine = find(read, "p", 1)!, readBtn = find(read, "buttons")!;
  const fourT = find(four, "h2")!, fourP = find(four, "p", 0)!, fourRows = find(four, "rows")!, fourOut = find(four, "p", 1)!, fourBtn = find(four, "buttons")!;
  const bandT = find(band, "h2")!, lineP = find(line, "p")!;
  const termsT = find(terms, "h2")!, termsP = find(terms, "p")!, termsItems = find(terms, "terms")!, termsBtn = find(terms, "buttons")!;
  const storyT = find(story, "h2")!, storyPs = story.blocks.filter((b) => b.type === "p"), storyBtn = find(story, "buttons")!;
  const progT = find(programs, "h2")!, progPs = programs.blocks.filter((b) => b.type === "p"), progBtn = find(programs, "buttons")!;
  // "The read — Covered, needs building, yours to do, by function. Then…" — the three columns are the deck's words
  const cols = ["Covered", "Needs building", "Yours to do"];
  const pos = [styles.fnTop, styles.fnRight, styles.fnBottom, styles.fnLeft];
  const tone = [styles.setup, styles.operations, styles.finance, styles.tech];
  const strokes = ["#2A8F99", "#0B6F7A", "#5A47A3", "#241B2E"];

  return (
    <div className={styles.page}>
      <Field />
      <MotionA />

      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-after><InlineNodes nodes={tagline.text} /></p>
          <h1 className={styles.h1}><Lines nodes={h1.text} /></h1>
          <p className={styles.lead} data-after><InlineNodes nodes={lead.text} /></p>
          <div className={styles.buttons} data-after>{heroBtns.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost={b.style !== "cta"} />)}</div>
        </div>
        <div className={styles.hill} aria-hidden="true">
          <Construction />
          <p className={`${styles.aside} ${styles.hillLabel}`}><InlineNodes nodes={aside.text} /></p>
        </div>
      </section>

      <section className={`wrap ${styles.chapter}`}>
        <div className={styles.split}>
          <div style={{ display: "grid", gap: 20 }}>
            <p className={styles.eyebrow}>{readT.raw}</p>
            <h2 className={styles.title} data-enter><InlineNodes nodes={readT.text} /></h2>
            <p className={styles.body}><InlineNodes nodes={readP.text} /></p>
            <div className={styles.buttons}>{readBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} />)}</div>
          </div>
          <div className={styles.pills} data-rise>
            {cols.map((c, i) => <div key={c} className={styles.pill}><span className={styles.mono}>0{i + 1}</span><strong>{c}</strong></div>)}
            <div className={styles.pill}><span className={styles.mono}>—</span><span><InlineNodes nodes={readLine.text} /></span></div>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.chapter}`}>
        <div className={styles.split}>
          <div style={{ display: "grid", gap: 20 }}>
            <p className={styles.eyebrow}>{fourT.raw}</p>
            <h2 className={styles.title} data-enter><InlineNodes nodes={fourT.text} /></h2>
            <p className={styles.body}><InlineNodes nodes={fourP.text} /></p>
            <p className={styles.body}><InlineNodes nodes={fourOut.text} /></p>
            <div className={styles.buttons}>{fourBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost />)}</div>
            <div className={styles.fnList}>
              {fourRows.items.map((it, i) => <div key={i} className={`${styles.fn} ${tone[i]}`}><strong><InlineNodes nodes={it.lead} /></strong><p><InlineNodes nodes={it.rest} /></p></div>)}
            </div>
          </div>
          <div className={styles.compass} data-rise>
            <svg className={styles.ring} viewBox="180 192.5 640 640" aria-hidden="true">
              <circle cx="500" cy="530" r="240" stroke={strokes[0]} strokeDasharray="377 1131" transform="rotate(-135 500 530)" />
              <circle cx="500" cy="530" r="240" stroke={strokes[1]} strokeDasharray="377 1131" transform="rotate(-45 500 530)" />
              <circle cx="500" cy="530" r="240" stroke={strokes[2]} strokeDasharray="377 1131" transform="rotate(45 500 530)" />
              <circle cx="500" cy="530" r="240" stroke={strokes[3]} strokeDasharray="377 1131" transform="rotate(135 500 530)" />
              <circle cx="500" cy="455" r="200" stroke="#241B2E" strokeWidth="2" />
            </svg>
            {fourRows.items.map((it, i) => <div key={i} className={`${styles.fn} ${pos[i]} ${tone[i]}`}><strong><InlineNodes nodes={it.lead} /></strong><p><InlineNodes nodes={it.rest} /></p></div>)}
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className={styles.band}>
          <div className={styles.bandField}><Field tone="#FCFBF9" fixed={false} phone={false} /></div>
          <h2 className={styles.title} data-enter><InlineNodes nodes={bandT.text} /></h2>
        </div>
        <p className={styles.body}><InlineNodes nodes={lineP.text} /></p>
      </section>

      <section className={`wrap ${styles.chapter}`}>
        <p className={styles.eyebrow}>{termsT.raw}</p>
        <h2 className={styles.title} data-enter><InlineNodes nodes={termsT.text} /></h2>
        <p className={styles.body}><InlineNodes nodes={termsP.text} /></p>
        <div className={styles.circles} data-rise>
          {termsItems.items.map((it, i) => <div key={i} className={styles.circle}><strong><InlineNodes nodes={it.lead} /></strong><p><InlineNodes nodes={it.rest} /></p></div>)}
        </div>
        <div className={styles.buttons}>{termsBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost />)}</div>
      </section>

      <section className={`wrap ${styles.chapter} ${styles.story}`}>
        <div className={styles.split}>
          <h2 className={styles.title} data-enter><InlineNodes nodes={storyT.text} /></h2>
          <div style={{ display: "grid", gap: 16 }}>
            {storyPs.map((p, i) => p.type === "p" && <p key={i} className={styles.body}><InlineNodes nodes={p.text} /></p>)}
            <div className={styles.buttons}>{storyBtn.buttons.map((b, i) => <Btn key={i} href={b.href} label={b.label} ghost />)}</div>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className={styles.programs}>
          <h2 className={styles.title} data-enter><InlineNodes nodes={progT.text} /></h2>
          {progPs.map((p, i) => p.type === "p" && <p key={i}><InlineNodes nodes={p.text} /></p>)}
          <div className={styles.buttons}>{progBtn.buttons.map((b, i) => <Link key={i} href={b.href} className={`btn ${styles.btn}`}>{b.label}</Link>)}</div>
        </div>
      </section>
    </div>
  );
}
