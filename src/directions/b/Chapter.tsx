"use client";
// A chapter: a section's button unfolds a strip beneath the section that scrolls sideways,
// one screen per slide, with a `01 / 04` counter and the chapter's name in brackets.
// The wheel the reader was already using steps the slides; past the last slide the page
// continues down, before the first it continues up. Close folds it away. On phones it is a
// swipe row with scroll-snap.
// The button and the strip sit in different rows of the grid, so they share state through
// a context: <Chapters> wraps the page, <ChapterButton> opens, <ChapterStrip> shows.
// Lessons from the earlier sideways build (docs/decisions.md): no pinning; no snap fighting
// the smooth scroll — the strip is a real scroll container, moved one slide per wheel gesture.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./b.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

// Bring an unfolding panel into place: once as it starts to open, once more when the
// unfold has finished — at the foot of the page the first call cannot reach it yet.
const reveal = (id: string) => {
  const to = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  requestAnimationFrame(to);
  setTimeout(to, 680);
};

type Ctx = { open: Record<string, boolean>; presets: Record<string, string>; toggle: (id: string) => void; openWith: (id: string, preset: string) => void };
const ChapterContext = createContext<Ctx>({ open: {}, presets: {}, toggle: () => {}, openWith: () => {} });

export const useChapter = () => useContext(ChapterContext);

export function Chapters({ children, openIds = [] }: { children: ReactNode; openIds?: string[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => Object.fromEntries(openIds.map((i) => [i, true])));
  const [presets, setPresets] = useState<Record<string, string>>({});
  const toggle = useCallback((id: string) => setOpen((o) => ({ ...o, [id]: !o[id] })), []);
  // a door opens the one questionnaire with its first answer already given
  const openWith = useCallback((id: string, preset: string) => { setPresets((p) => ({ ...p, [id]: preset })); setOpen((o) => ({ ...o, [id]: true })); }, []);
  // a link from another page — /#form-business, /#chapter-programs — opens that panel on arrival
  useEffect(() => {
    const [id, preset] = window.location.hash.slice(1).split(":");
    if (!/^(form|chapter)-/.test(id) || !document.getElementById(id)) return;
    const t = setTimeout(() => { if (preset) setPresets((p) => ({ ...p, [id]: preset })); setOpen((o) => ({ ...o, [id]: true })); reveal(id); }, 200);
    return () => clearTimeout(t);
  }, []);
  return <ChapterContext.Provider value={{ open, presets, toggle, openWith }}>{children}</ChapterContext.Provider>;
}

export function ChapterButton({ id, openLabel, closeLabel, fill = true }: { id: string; openLabel: string; closeLabel: string; fill?: boolean }) {
  const { open, toggle } = useContext(ChapterContext);
  const isOpen = !!open[id];
  const onClick = () => {
    toggle(id);
    if (!isOpen) reveal(id);
  };
  return (
    <button type="button" className={`${styles.action} ${fill ? styles.actionFill : ""}`} aria-expanded={isOpen} aria-controls={id} onClick={onClick}>
      {isOpen ? closeLabel : openLabel}
    </button>
  );
}



type StripProps = { id: string; label: string; closeLabel: string; prevLabel: string; nextLabel: string; slides: ReactNode[]; tone?: string };

export function ChapterStrip({ id, label, closeLabel, prevLabel, nextLabel, slides, tone }: StripProps) {
  const { open, toggle } = useContext(ChapterContext);
  const isOpen = !!open[id];
  const [index, setIndex] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const acc = useRef(0);

  const go = useCallback((i: number) => {
    const el = strip.current; if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    busy.current = true; setTimeout(() => { busy.current = false; }, 900);
  }, [slides.length]);

  useEffect(() => {
    const el = strip.current;
    if (!el || !isOpen) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if ((i === 0 && delta < 0) || (i === slides.length - 1 && delta > 0)) return; // the page takes over
      e.preventDefault(); e.stopPropagation();
      if (busy.current) return;
      acc.current += delta;
      // a vertical wheel needs a deliberate push (founder: too sensitive); a sideways swipe moves at once
      const vertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (Math.abs(acc.current) > (vertical ? 160 : 40)) { go(i + (acc.current > 0 ? 1 : -1)); acc.current = 0; }
    };
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("keydown", onKey);
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("scroll", onScroll); el.removeEventListener("keydown", onKey); };
  }, [isOpen, go, index, slides.length]);

  return (
    <section id={id} className={styles.chapterShell} data-open={isOpen || undefined} aria-hidden={!isOpen} inert={!isOpen} aria-label={label}>
      <div className={styles.chapterInner}>
      <div className={styles.chapterHead}>
        <span className={styles.mono}>[ {label} ]</span>
        <span className={styles.mono} aria-live="polite">{pad(index + 1)} / {pad(slides.length)}</span>
        <span className={styles.chapterNav}>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index - 1)} disabled={index === 0} aria-label={prevLabel}>←</button>
          <button type="button" className={styles.chapterBtn} onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label={nextLabel}>→</button>
          <button type="button" className={styles.chapterBtn} onClick={() => toggle(id)}>{closeLabel}</button>
        </span>
      </div>
      <div ref={strip} className={styles.track} tabIndex={0}>
        {slides.map((s, i) => (
          <div key={i} className={`${styles.slide} ${i === 0 && tone ? tone : i % 2 ? styles.stone : styles.paper}`}>
            {s}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

// A door: a card that opens a panel beneath the row (the forms). Same state as the chapters.
export function Door({ id, preset, className, children }: { id: string; preset: string; className: string; children: ReactNode }) {
  const { openWith } = useContext(ChapterContext);
  const onClick = () => { openWith(id, preset); reveal(id); };
  return <button type="button" className={className} aria-controls={id} onClick={onClick}>{children}</button>;
}

// A panel that unfolds beneath its row; used for the forms behind the doors.
export function Panel({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const { open } = useContext(ChapterContext);
  const isOpen = !!open[id];
  return (
    <section id={id} className={styles.chapterShell} data-open={isOpen || undefined} aria-hidden={!isOpen} inert={!isOpen} aria-label={label}>
      <div className={styles.chapterInner}>{children}</div>
    </section>
  );
}

// A summary panel: opens beneath its row with three brief cards — who it is for, a line
// or two, Learn more to the full page — rising in one after another.
export function SummaryPanel({ id, label, closeLabel, learnMore, cards, tones }: { id: string; label: string; closeLabel: string; learnMore: string; cards: { for: string; brief: string; href: string; tone: string }[]; tones: Record<string, string> }) {
  const { open, toggle } = useContext(ChapterContext);
  const isOpen = !!open[id];
  return (
    <section id={id} className={styles.chapterShell} data-open={isOpen || undefined} aria-hidden={!isOpen} inert={!isOpen} aria-label={label}>
      <div className={styles.chapterInner}>
        <div className={styles.chapterHead}>
          <span className={styles.mono}>[ {label} ]</span>
          <span />
          <span className={styles.chapterNav}><button type="button" className={styles.chapterBtn} onClick={() => toggle(id)}>{closeLabel}</button></span>
        </div>
        <div className={styles.summary}>
          {cards.map((c, i) => (
            <div key={i} className={`${styles.mini} ${tones[c.tone] ?? styles.ink}`} style={{ animationDelay: `${180 + i * 140}ms` }}>
              <div className={styles.miniBody}>
                <h3 className={styles.miniFor}>{c.for}</h3>
                <p>{c.brief}</p>
              </div>
              <a href={c.href} className={`${styles.action} ${styles.miniCta}`}>{learnMore}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
