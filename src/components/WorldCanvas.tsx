"use client";
// The world canvas: a flow field of fine ink and aqua lines behind the page — its world,
// not a decoration (CLAUDE.md §9). 2D canvas first; three.js only if this cannot hold
// 60fps on a phone. Trails fade to transparent, so the canvas never tints the page.
// Only the visible tab animates. Reduced motion: nothing is drawn.
import { useEffect, useRef } from "react";

const INK = "36, 27, 46";
const AQUA = "11, 111, 122";

// small value noise — enough for a slow, smooth field; no library
function makeNoise(seed: number) {
  const size = 64;
  const grid = new Float32Array(size * size);
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < grid.length; i++) grid[i] = rnd();
  const at = (x: number, y: number) => grid[((y & (size - 1)) * size + (x & (size - 1)))];
  const fade = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = fade(x - xi), yf = fade(y - yi);
    const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

export default function WorldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const noise = makeNoise(20260921);
    const phone = window.innerWidth < 700;
    const count = phone ? 140 : 340;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    const px = new Float32Array(count), py = new Float32Array(count), life = new Float32Array(count);
    const aqua = new Uint8Array(count);

    const spawn = (i: number) => {
      px[i] = Math.random() * w; py[i] = Math.random() * h;
      life[i] = 400 + Math.random() * 900;
      aqua[i] = Math.random() < 0.28 ? 1 : 0;
    };
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < count; i++) spawn(i);
    };
    resize();

    let raf = 0, last = 0, t = 0, running = true;
    const scale = 0.0016;
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 50); last = now; t += dt * 0.00006;
      // fade what is there toward transparent
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.03)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 0.9;
      ctx.lineCap = "round";
      const step = dt * 0.05;
      for (let i = 0; i < count; i++) {
        const x = px[i], y = py[i];
        const n = noise(x * scale + t, y * scale - t * 0.6);
        const a = n * Math.PI * 2.4;
        const nx = x + Math.cos(a) * step, ny = y + Math.sin(a) * step;
        ctx.strokeStyle = aqua[i] ? `rgba(${AQUA},0.22)` : `rgba(${INK},0.14)`;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke();
        px[i] = nx; py[i] = ny;
        if ((life[i] -= dt * 0.06) < 0 || nx < -2 || ny < -2 || nx > w + 2 || ny > h + 2) spawn(i);
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const onVis = () => (document.hidden ? stop() : start());
    running = false; start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="world" />;
}
