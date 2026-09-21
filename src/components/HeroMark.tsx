"use client";
// The hero mark forms from particles in its own colour on first view, and stays
// (docs/05 §6, build 1; CLAUDE.md §9). Particles are ink because the mark is ink.
// The final state is the master SVG itself, crossfaded in when the particles land,
// so what stays on the page is the real mark, never a redrawing of it.
// Reduced motion: the SVG is shown at once and no canvas is drawn.
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";
import { useReducedMotion } from "@/lib/useReducedMotion";

// The mark's geometry, from brand/svg/bidaya-mark.svg: two circles, evenodd, in a 1000-unit box.
// outer (500,530) r240 and inner (500,455) r200, after translate(-470.8,-495.1) scale(1.9417).
const S = 1.9417, TX = -470.8, TY = -495.1;
const OX = 500 * S + TX, OY = 530 * S + TY, OR = 240 * S;
const IX = 500 * S + TX, IY = 455 * S + TY, IR = 200 * S;
const inMark = (x: number, y: number) => {
  const o = (x - OX) ** 2 + (y - OY) ** 2 < OR * OR;
  const i = (x - IX) ** 2 + (y - IY) ** 2 < IR * IR;
  return o !== i; // evenodd
};

export default function HeroMark({ onLand }: { onLand?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [landed, setDone] = useState(false);
  const done = reduced || landed;

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas || !wrap.current) return;
    const size = wrap.current.getBoundingClientRect().width; // the size is CSS's decision
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // the canvas is larger than the mark so particles can arrive from outside it
    const pad = size * 1.2;
    const w = size + pad * 2, h = size + pad * 2;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    canvas.style.margin = `${-pad}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = size > 160 ? 1500 : 900;
    const tx = new Float32Array(n), ty = new Float32Array(n);
    const sx = new Float32Array(n), sy = new Float32Array(n);
    const cx = new Float32Array(n), cy = new Float32Array(n);
    const delay = new Float32Array(n);
    let seed = 7;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < n; i++) {
      let x = 0, y = 0;
      do { x = rnd() * 1000; y = rnd() * 1000; } while (!inMark(x, y));
      tx[i] = pad + (x / 1000) * size; ty[i] = pad + (y / 1000) * size;
      // arrive from the flow: below-left, on a curve
      const a = Math.PI * (0.55 + rnd() * 0.5);
      const d = size * (0.9 + rnd() * 1.1);
      sx[i] = tx[i] + Math.cos(a) * d; sy[i] = ty[i] + Math.sin(a) * d;
      cx[i] = (sx[i] + tx[i]) / 2 + (rnd() - 0.5) * size * 0.9;
      cy[i] = (sy[i] + ty[i]) / 2 + (rnd() - 0.5) * size * 0.9;
      delay[i] = rnd() * 0.45;
    }
    const state = { p: 0 };
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const r = Math.max(0.9, size / 190);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#241B2E";
      for (let i = 0; i < n; i++) {
        const k = Math.min(1, Math.max(0, (state.p - delay[i]) / (1 - 0.45)));
        if (k <= 0) continue;
        const e = ease(k);
        const u = 1 - e;
        const x = u * u * sx[i] + 2 * u * e * cx[i] + e * e * tx[i];
        const y = u * u * sy[i] + 2 * u * e * cy[i] + e * e * ty[i];
        ctx.globalAlpha = 0.25 + 0.75 * e;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    // the words start arriving while the particles are still landing, so the page reads
    // within about 1.5s of load; the mark finishes and the SVG takes over just after.
    const tween = gsap.to(state, {
      p: 1, duration: 1.3, ease: "none", delay: 0.15, onUpdate: draw,
      onComplete: () => setDone(true),
    });
    const words = gsap.delayedCall(0.75, () => onLand?.());
    return () => { tween.kill(); words.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div ref={wrap} className={styles.markWrap}>
      {!reduced && <canvas ref={ref} aria-hidden="true" className={`${styles.markCanvas} ${done ? styles.markCanvasOut : ""}`} />}
      <img src="/brand/svg/bidaya-mark.svg" alt="" width="1000" height="1000" className={`${styles.markSvg} ${done ? styles.markSvgIn : ""}`} />
    </div>
  );
}
