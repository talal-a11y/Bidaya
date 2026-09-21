"use client";
// Direction C's world: a stream of ink dots that travels across the page and gathers into
// whatever the current chapter is about — the figure four, the mark, three circles — then
// loosens and travels on. It sits behind the page; chapters tell it what to form through a
// data attribute on the section that currently owns the viewport. Reduced motion: no canvas.
import { useEffect, useRef } from "react";

type Shape = "stream" | "four" | "mark" | "three";
const N = typeof window !== "undefined" && window.innerWidth < 900 ? 320 : 700;

// the mark's geometry from brand/svg/bidaya-mark.svg, in a unit box
const S = 1.9417, TX = -470.8, TY = -495.1;
const inMark = (x: number, y: number) => {
  const ox = 500 * S + TX, oy = 530 * S + TY, orr = 240 * S, ix = 500 * S + TX, iy = 455 * S + TY, ir = 200 * S;
  const o = (x - ox) ** 2 + (y - oy) ** 2 < orr * orr, i = (x - ix) ** 2 + (y - iy) ** 2 < ir * ir;
  return o !== i;
};

function targetsFor(shape: Shape, w: number, h: number, rnd: () => number): Float32Array<ArrayBuffer> {
  const t = new Float32Array(new ArrayBuffer(N * 2 * 4));
  const phone = w < 900; const cx = phone ? w * 0.7 : w * 0.68, cy = phone ? h * 0.72 : h * 0.5, size = Math.min(w, h) * (phone ? 0.5 : 0.62);
  for (let i = 0; i < N; i++) {
    let x = 0, y = 0;
    if (shape === "stream") { x = (phone ? w * 0.45 : w * 0.62) + rnd() * w * 0.6; y = rnd() * h * (phone ? 0.28 : 0.5) - h * 0.12 + (x / w) * h * 0.35; }
    else if (shape === "mark") { let u = 0, v = 0; do { u = rnd() * 1000; v = rnd() * 1000; } while (!inMark(u, v)); x = cx + (u / 1000 - 0.5) * size; y = cy + (v / 1000 - 0.5) * size; }
    else if (shape === "three") { const k = i % 3; const r = size * [0.2, 0.15, 0.25][k]; const a = rnd() * Math.PI * 2; const rr = r * Math.sqrt(rnd()); x = cx + (k - 1) * size * 0.42 + Math.cos(a) * rr; y = cy + Math.sin(a) * rr; }
    else { // four: four columns of dots, one per function
      const k = i % 4; x = cx - size * 0.45 + k * size * 0.3 + (rnd() - 0.5) * size * 0.1; y = cy - size * 0.35 + rnd() * size * 0.7;
    }
    t[i * 2] = x; t[i * 2 + 1] = y;
  }
  return t;
}

export default function Stream() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0; let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pos = new Float32Array(N * 2), vel = new Float32Array(N * 2), drift = new Float32Array(N);
    let targets: Float32Array<ArrayBuffer> = new Float32Array(new ArrayBuffer(N * 2 * 4)); let shape: Shape = "stream";
    const resize = () => { w = innerWidth; h = innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + "px"; canvas.style.height = h + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); targets = targetsFor(shape, w, h, rnd); };
    resize();
    for (let i = 0; i < N; i++) { pos[i * 2] = targets[i * 2] + (rnd() - 0.5) * 300; pos[i * 2 + 1] = targets[i * 2 + 1] + (rnd() - 0.5) * 300; drift[i] = rnd() * Math.PI * 2; }
    const setShape = (s: Shape) => { if (s === shape) return; shape = s; targets = targetsFor(s, w, h, rnd); };
    // the chapter that owns the viewport decides the shape
    const owners = [...document.querySelectorAll<HTMLElement>("[data-shape]")];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setShape(e.target.getAttribute("data-shape") as Shape); }, { rootMargin: "-40% 0px -40% 0px" });
    owners.forEach((o) => io.observe(o));
    let raf = 0, running = true, t = 0;
    const frame = () => {
      if (!running) return; t += 0.016;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#241B2E";
      const loose = shape === "stream";
      ctx.globalAlpha = loose ? 0.3 : 0.55;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const ix = i * 2, iy = ix + 1;
        const tx = targets[ix] + (loose ? Math.sin(t * 0.7 + drift[i]) * 40 : Math.sin(t * 1.3 + drift[i]) * 2.5);
        const ty = targets[iy] + (loose ? Math.cos(t * 0.5 + drift[i]) * 26 : Math.cos(t * 1.1 + drift[i]) * 2.5);
        vel[ix] = vel[ix] * 0.86 + (tx - pos[ix]) * 0.03; vel[iy] = vel[iy] * 0.86 + (ty - pos[iy]) * 0.03;
        pos[ix] += vel[ix]; pos[iy] += vel[iy];
        ctx.moveTo(pos[ix] + 1.7, pos[iy]); ctx.arc(pos[ix], pos[iy], 1.7, 0, Math.PI * 2);
      }
      ctx.fill();
      raf = requestAnimationFrame(frame);
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 400));
    idle(() => frame());
    const vis = () => { if (document.hidden) { running = false; cancelAnimationFrame(raf); } else if (!running) { running = true; frame(); } };
    document.addEventListener("visibilitychange", vis); addEventListener("resize", resize);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener("visibilitychange", vis); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="stream" />;
}
