"use client";
// The home hero. Server-side the words are all in the markup, in order; the client only
// times how they appear. A reader who arrives mid-animation reads the finished page within
// about two seconds; with reduced motion, at once.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import type { Block, Button, Inline } from "@/lib/content";
import { InlineNodes } from "./Inline";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroMark from "./HeroMark";
import styles from "./Hero.module.css";

function Words({ nodes }: { nodes: Inline[] }) {
  // split plain text into words for the reveal; keep inline markup intact
  return (
    <>
      {nodes.map((n, i) => {
        if (n.kind !== "text") return <span key={i} className={styles.word}><InlineNodes nodes={[n]} /></span>;
        return n.text.split(/(\s+)/).map((w, j) => (w.trim() ? <span key={`${i}-${j}`} className={styles.word}>{w}</span> : w));
      })}
    </>
  );
}

export default function Hero({ blocks }: { blocks: Block[] }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [landedState, setLanded] = useState(false);
  const landed = reduced || landedState;

  const tagline = blocks.find((b) => b.type === "tagline");
  const h1 = blocks.find((b) => b.type === "h1");
  const lead = blocks.find((b) => b.type === "lead");
  const buttons = blocks.find((b) => b.type === "buttons");
  const aside = blocks.find((b) => b.type === "aside");

  useEffect(() => {
    if (!landed || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    const words = el.querySelectorAll(`.${styles.word}`);
    const rest = el.querySelectorAll(`.${styles.lead}, .${styles.buttons}, .${styles.aside}`);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(words, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.035 }, 0)
      .fromTo(rest, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.45);
    return () => { tl.kill(); };
  }, [landed]);

  const cls = (b: Button) => (b.style === "cta" ? "btn btn-cta" : b.style === "ghost" ? "btn btn-ghost" : "btn btn-text");

  return (
    <section ref={root} className={`wrap ${styles.hero} ${landed ? "" : styles.pending}`}>
      <div className={styles.top}>
        <HeroMark onLand={() => setLanded(true)} />
        {tagline?.type === "tagline" && <p className={styles.tagline}><Words nodes={tagline.text} /></p>}
      </div>
      {h1?.type === "h1" && <h1 className={styles.h1}><Words nodes={h1.text} /></h1>}
      {lead?.type === "lead" && <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>}
      {buttons?.type === "buttons" && (
        <div className={styles.buttons}>{buttons.buttons.map((b, i) => <Link key={i} href={b.href} className={cls(b)}>{b.label}</Link>)}</div>
      )}
      {aside?.type === "aside" && <p className={styles.aside}><InlineNodes nodes={aside.text} /></p>}
    </section>
  );
}
