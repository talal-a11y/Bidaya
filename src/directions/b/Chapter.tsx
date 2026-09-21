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

type Ctx = { open: Record<string, boolean>; toggle: (id: string) => void };
const ChapterContext = createContext<Ctx>({ open: {}, toggle: () => {} });

export function Chapters({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = useCallback((id: string) => setOpen((o) => ({ ...o, [id]: !o[id] })), []);
  return <ChapterContext.Provider value={{ open, toggle }}>{children}</ChapterContext.Provider>;
}

export function ChapterButton({ id, openLabel, closeLabel, fill = true }: { id: string; openLabel: string; closeLabel: string; fill?: boolean }) {
  const { open, toggle } = useContext(ChapterContext);
  const isOpen = !!open[id];
  const onClick = () => {
    toggle(id);
    if (!isOpen) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <button type="button" className={`${styles.action} ${fill ? styles.actionFill : ""}`} aria-expanded={isOpen} aria-controls={id} onClick={onClick}>
      {isOpen ? closeLabel : openLabel}
    </button>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

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
    busy.current = true; setTimeout(() => { busy.current = false; }, 650);
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
      if (Math.abs(acc.current) > 40) { go(i + (acc.current > 0 ? 1 : -1)); acc.current = 0; }
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
export function Door({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const { open, toggle } = useContext(ChapterContext);
  const isOpen = !!open[id];
  const onClick = () => { toggle(id); if (!isOpen) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  return <button type="button" className={className} aria-expanded={isOpen} aria-controls={id} onClick={onClick}>{children}</button>;
}

// A panel that unfolds beneath its row; used for the forms behind the doors.
export function Panel({ id, label, closeLabel, children }: { id: string; label: string; closeLabel: string; children: ReactNode }) {
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
        {children}
      </div>
    </section>
  );
}
