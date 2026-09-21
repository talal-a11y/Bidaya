"use client";
// Direction A's world: a contour field — the ground before anything is built on it — drawn
// live across the viewport. Contours are marching-squares iso-lines over slow noise. The
// mark is a hill in the terrain: the lines bend around it. On a laptop the field leans away
// from the cursor; on a phone it drifts with the scroll. Trails: none — the canvas is
// redrawn each frame in ink at low opacity, so it never tints the page. Reduced motion:
// one still frame. Only the visible tab draws.
import { useEffect, useRef } from "react";

function makeNoise(seed: number) {
  const size = 64, grid = new Float32Array(size * size);
  let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < grid.length; i++) grid[i] = rnd();
  const at = (x: number, y: number) => grid[((y & 63) * size) + (x & 63)];
  const fade = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

export default function Field({ tone = "#241B2E", fixed = true, phone = true }: { tone?: string; fixed?: boolean; phone?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (!phone && innerWidth < 900) return; // a second field is too much for a phone
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = innerWidth < 900;
    const noise = makeNoise(20260921);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, cols = 0, rows = 0, cell = 18;
    let vals = new Float32Array(0);
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let scrollY = 0, t = 0, raf = 0, running = true;
    const hill = { x: 0.72, y: 0.5, r: 0.28 };
    const placeHill = () => { if (innerWidth < 900) { hill.x = 0.5; hill.y = 0.26; hill.r = 0.22; } else { hill.x = 0.72; hill.y = 0.5; hill.r = 0.28; } }; // the mark's place in the hero, as a fraction of the viewport
    const resize = () => {
      w = innerWidth; h = innerHeight; cell = small ? 30 : 18;
      cols = Math.ceil(w / cell) + 1; rows = Math.ceil(h / cell) + 1; vals = new Float32Array(cols * rows);
      canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    placeHill(); resize();
    const levels = small ? 6 : 9;
    const draw = () => {
      // sample the field
      const sc = 0.0045, hx = hill.x * w, hy = hill.y * h, hr = hill.r * Math.min(w, h);
      const inHero = scrollY < h * 0.9;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = i * cell, y = j * cell;
        let v = noise(x * sc + t * 0.15, y * sc + scrollY * 0.0006 - t * 0.1) * 0.75 + noise(x * sc * 2.3 - t * 0.05, y * sc * 2.3) * 0.25;
        if (inHero) { const d = Math.hypot(x - hx, y - hy) / hr; if (d < 1) v += (1 - d) * (1 - d) * 0.9; }
        const md = Math.hypot(x - mouse.x, y - mouse.y); if (md < 260) v -= (1 - md / 260) * (1 - md / 260) * 0.35;
        vals[j * cols + i] = v;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = tone; ctx.lineWidth = 1; ctx.lineCap = "round";
      ctx.beginPath();
      for (let L = 0; L < levels; L++) {
        const iso = 0.12 + (L / (levels - 1)) * 1.0;
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = vals[j * cols + i], b = vals[j * cols + i + 1], c = vals[(j + 1) * cols + i + 1], d = vals[(j + 1) * cols + i];
          const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * cell, y = j * cell;
          const lerp = (p: number, q: number) => (iso - p) / (q - p);
          const top = [x + cell * lerp(a, b), y], right = [x + cell, y + cell * lerp(b, c)], bottom = [x + cell * lerp(d, c), y + cell], left = [x, y + cell * lerp(a, d)];
          const seg = (p: number[], q: number[]) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
          switch (idx) {
            case 1: case 14: seg(left, bottom); break; case 2: case 13: seg(bottom, right); break; case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break; case 5: seg(top, left); seg(bottom, right); break; case 6: case 9: seg(top, bottom); break;
            case 7: case 8: seg(top, left); break; case 10: seg(top, right); seg(left, bottom); break;
          }
        }
      }
      ctx.globalAlpha = 0.22; ctx.stroke(); ctx.globalAlpha = 1;
    };
    let odd = false;
    const frame = () => {
      if (!running) return;
      odd = !odd; if (small && odd) { raf = requestAnimationFrame(frame); return; }
      t += small ? 0.032 : 0.016; mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08; scrollY = window.scrollY;
      draw(); raf = requestAnimationFrame(frame);
    };
    if (reduced) { draw(); return; }
    const onMove = (e: MouseEvent) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    const vis = () => { if (document.hidden) { running = false; cancelAnimationFrame(raf); } else if (!running) { running = true; frame(); } };
    addEventListener("mousemove", onMove); document.addEventListener("mouseleave", onLeave); addEventListener("resize", () => { placeHill(); resize(); }); document.addEventListener("visibilitychange", vis);
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    idle(() => { if (running) frame(); });
    return () => { running = false; cancelAnimationFrame(raf); removeEventListener("mousemove", onMove); document.removeEventListener("mouseleave", onLeave); removeEventListener("resize", resize); document.removeEventListener("visibilitychange", vis); };
  }, [tone, fixed, phone]);
  return <canvas ref={ref} aria-hidden="true" className="field" style={fixed ? undefined : { position: "absolute" }} />;
}
