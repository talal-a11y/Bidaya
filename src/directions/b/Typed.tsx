"use client";
// Text typed in, one character at a time, after a delay. The full text is in the markup
// for readers and machines; only the visible copy is typed. Reduced motion: shown at once.
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./b.module.css";

export type Part = { text: string; className?: string };

export type Tag = "span" | "p" | "h1" | "h2" | "h3";
// onView: wait until the element scrolls into view before typing (once). onDone: called when the last character lands.
export default function Typed({ text, parts, delay = 0, speed = 60, className, as: Tag = "span", onView = false, onDone }: { text?: string; parts?: Part[]; delay?: number; speed?: number; className?: string; as?: Tag; onView?: boolean; onDone?: () => void }) {
  const list: Part[] = parts ?? [{ text: text ?? "" }];
  const full = list.map((p) => p.text).join("");
  return <TypedInner list={list} text={full} delay={delay} speed={speed} className={className} Tag={Tag} onView={onView} onDone={onDone} />;
}

function TypedInner({ list, text, delay, speed, className, Tag, onView, onDone }: { list: Part[]; text: string; delay: number; speed: number; className?: string; Tag: Tag; onView: boolean; onDone?: () => void }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [seen, setSeen] = useState(!onView);
  const el = useRef<HTMLElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => { doneRef.current = onDone; });
  useEffect(() => {
    if (!onView || seen) return;
    const node = el.current; if (!node) return;
    if (!("IntersectionObserver" in window)) { const r = requestAnimationFrame(() => setSeen(true)); return () => cancelAnimationFrame(r); }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, [onView, seen]);
  useEffect(() => {
    if (!seen) return;
    if (reduced) { const r = requestAnimationFrame(() => { setN(text.length); setDone(true); doneRef.current?.(); }); return () => cancelAnimationFrame(r); }
    let i = 0;
    let iv = 0;
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => { i++; setN(i); if (i >= text.length) { clearInterval(iv); setDone(true); doneRef.current?.(); } }, speed);
    }, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, delay, speed, reduced, seen]);
  // the typed characters, handed out to the parts in order so each keeps its own style
  const starts = list.map((_, i) => list.slice(0, i).reduce((a, p) => a + p.text.length, 0));
  return (
    <Tag className={className} ref={el as never}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {list.map((p, i) => <span key={i} className={p.className}>{p.text.slice(0, Math.max(0, Math.min(p.text.length, n - starts[i])))}</span>)}
        {!done && <span className={styles.caret} />}
      </span>
    </Tag>
  );
}
