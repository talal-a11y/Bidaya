"use client";
// Text typed in, one character at a time, after a delay. The full text is in the markup
// for readers and machines; only the visible copy is typed. Reduced motion: shown at once.
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./b.module.css";

export default function Typed({ text, delay = 0, speed = 60, className, as: Tag = "span" }: { text: string; delay?: number; speed?: number; className?: string; as?: "span" | "p" | "h1" | "h2" }) {
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
  return (
    <Tag className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{text.slice(0, n)}{!done && <span className={styles.caret} />}</span>
    </Tag>
  );
}
