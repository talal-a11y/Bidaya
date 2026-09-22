"use client";
// Text typed in, one character at a time, after a delay. The full text is in the markup
// for readers and machines; only the visible copy is typed. Reduced motion: shown at once.
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./b.module.css";

export type Part = { text: string; className?: string };

export default function Typed({ text, parts, delay = 0, speed = 60, className, as: Tag = "span" }: { text?: string; parts?: Part[]; delay?: number; speed?: number; className?: string; as?: "span" | "p" | "h1" | "h2" }) {
  const list: Part[] = parts ?? [{ text: text ?? "" }];
  const full = list.map((p) => p.text).join("");
  return <TypedInner list={list} text={full} delay={delay} speed={speed} className={className} Tag={Tag} />;
}

function TypedInner({ list, text, delay, speed, className, Tag }: { list: Part[]; text: string; delay: number; speed: number; className?: string; Tag: "span" | "p" | "h1" | "h2" }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (reduced) { const r = requestAnimationFrame(() => { setN(text.length); setDone(true); }); return () => cancelAnimationFrame(r); }
    let i = 0;
    let iv = 0;
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => { i++; setN(i); if (i >= text.length) { clearInterval(iv); setDone(true); } }, speed);
    }, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, delay, speed, reduced]);
  // the typed characters, handed out to the parts in order so each keeps its own style
  const starts = list.map((_, i) => list.slice(0, i).reduce((a, p) => a + p.text.length, 0));
  return (
    <Tag className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {list.map((p, i) => <span key={i} className={p.className}>{p.text.slice(0, Math.max(0, Math.min(p.text.length, n - starts[i])))}</span>)}
        {!done && <span className={styles.caret} />}
      </span>
    </Tag>
  );
}
