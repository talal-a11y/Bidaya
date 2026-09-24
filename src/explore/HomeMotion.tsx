"use client";
// Home animations (the founder, 2026-09-24): the hero's right panel — the outlined mark on the
// deep teal with "بداية means beginning." — as a movie-style opening that shows the four colours
// and the four marks of Bidaya before settling on this one (H1 is his page-flip idea, H2–H5 are
// Claude Code's), then four ways to keep the panel alive under the mouse once the opening is done.
// Every opening plays once and stays; reduced motion shows the final state at once.
import { useEffect, useRef, useState } from "react";
import s from "./home-motion.module.css";

// the four forms: Tech ink, Finance plum, Ops deep aqua, Setup teal — the teal is the one that stays
const FORMS = [
  { id: "tech", color: "#241B2E" },
  { id: "finance", color: "#5A47A3" },
  { id: "ops", color: "#0A5C66" },
  { id: "setup", color: "#237C85" },
];

const Arcs = ({ className, draw }: { className?: string; draw?: boolean }) => (
  <svg viewBox="180 192.5 640 640" className={`${s.arcs} ${className ?? ""}`} data-draw={draw || undefined} aria-hidden="true">
    <circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" />
  </svg>
);
const Line = () => <p className={s.line}><span className={s.arabic}>بداية</span> means beginning.</p>;

// one form of the panel: a colour, the mark, the line
function Form({ color, className, style, children }: { color: string; className?: string; style?: React.CSSProperties; children?: React.ReactNode }) {
  return <div className={`${s.form} ${className ?? ""}`} style={{ background: color, ...style }}><Arcs /><Line />{children}</div>;
}

// a block with a Replay button: the opening re-mounts and plays again
function Opening({ children }: { children: (key: number) => React.ReactNode }) {
  const [k, setK] = useState(0);
  return (
    <div className={s.stageWrap}>
      <div className={s.stage} key={k}>{children(k)}</div>
      <button type="button" className={s.replay} onClick={() => setK((x) => x + 1)}>Replay</button>
    </div>
  );
}

// H1 — his idea: the four forms stacked; each flips away from a different corner, fast, and the last stays
export function H1() {
  const corners = [s.flipTL, s.flipBR, s.flipTR];
  return (
    <Opening>{() => (
      <div className={s.deck}>
        {FORMS.map((f, i) => (
          <Form key={f.id} color={f.color} className={i < 3 ? `${s.flip} ${corners[i]}` : ""} style={{ zIndex: 4 - i, animationDelay: `${0.5 + i * 0.55}s` }} />
        ))}
      </div>
    )}</Opening>
  );
}

// H2 — the wipes: each colour sweeps in from a different side over the last, the mark riding with it
export function H2() {
  const sides = [s.wipeL, s.wipeT, s.wipeR, s.wipeB];
  return (
    <Opening>{() => (
      <div className={s.deck}>
        {FORMS.map((f, i) => (
          <Form key={f.id} color={f.color} className={`${s.wipe} ${sides[i]}`} style={{ zIndex: i + 1, animationDelay: `${0.3 + i * 0.5}s` }} />
        ))}
      </div>
    )}</Opening>
  );
}

// H3 — the four marks converge: one mark in each colour, scattered and turning, gathers into one
export function H3() {
  return (
    <Opening>{() => (
      <div className={s.deck} style={{ background: FORMS[3].color }}>
        {FORMS.map((f, i) => (
          <svg key={f.id} viewBox="180 192.5 640 640" className={`${s.arcs} ${s.converge}`} style={{ color: i === 3 ? "#FCFBF9" : "#FCFBF9", animationDelay: `${i * 0.12}s`, ["--rot" as string]: `${[-160, 120, -70, 40][i]}deg`, ["--dx" as string]: `${[-60, 70, 40, -30][i]}%`, ["--dy" as string]: `${[50, -40, 60, -70][i]}%` }} aria-hidden="true">
            <circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" />
          </svg>
        ))}
        {/* the four colours pass beneath as the marks gather */}
        {FORMS.slice(0, 3).map((f, i) => <div key={f.id} className={s.flash} style={{ background: f.color, animationDelay: `${0.2 + i * 0.45}s` }} />)}
        <p className={`${s.line} ${s.lineLate}`}><span className={s.arabic}>بداية</span> means beginning.</p>
      </div>
    )}</Opening>
  );
}

// H4 — the shuffle: four cards fanned out on the table, dealt onto the pile one by one; the last one grows to fill the panel
export function H4() {
  return (
    <Opening>{() => (
      <div className={`${s.deck} ${s.table}`}>
        {FORMS.map((f, i) => (
          <Form key={f.id} color={f.color} className={`${s.card} ${i === 3 ? s.cardLast : ""}`} style={{ zIndex: i + 1, animationDelay: `${0.2 + i * 0.5}s`, ["--fan" as string]: `${[-22, -8, 8, 22][i]}deg`, ["--fx" as string]: `${[-46, -16, 16, 46][i]}%` }} />
        ))}
      </div>
    )}</Opening>
  );
}

// H5 — through the ring: each form rushes at the viewer and passes through its own inner circle, the next behind it
export function H5() {
  return (
    <Opening>{() => (
      <div className={s.deck}>
        {FORMS.map((f, i) => (
          <Form key={f.id} color={f.color} className={i < 3 ? s.through : s.arrive} style={{ zIndex: 4 - i, animationDelay: `${0.4 + i * 0.6}s` }} />
        ))}
      </div>
    )}</Opening>
  );
}

// ---- mouse: the panel after the opening, alive under the cursor

function useMouse(ref: React.RefObject<HTMLDivElement | null>, onMove: (x: number, y: number, el: HTMLDivElement) => void) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = (e: MouseEvent) => { const r = el.getBoundingClientRect(); onMove((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, el); };
    el.addEventListener("mousemove", h);
    return () => el.removeEventListener("mousemove", h);
  }, [ref, onMove]);
}

// M1 — depth: the two circles drift toward the cursor at different depths; the line stays put
export function M1() {
  const ref = useRef<HTMLDivElement>(null);
  useMouse(ref, (x, y, el) => { el.style.setProperty("--mx", String(x - 0.5)); el.style.setProperty("--my", String(y - 0.5)); });
  return (
    <div ref={ref} className={`${s.stage} ${s.form} ${s.depth}`} style={{ background: FORMS[3].color }}>
      <svg viewBox="180 192.5 640 640" className={`${s.arcs} ${s.deep1}`} aria-hidden="true"><circle cx="500" cy="530" r="240" /></svg>
      <svg viewBox="180 192.5 640 640" className={`${s.arcs} ${s.deep2}`} aria-hidden="true"><circle cx="500" cy="455" r="200" /></svg>
      <Line />
    </div>
  );
}

// M2 — the trail: a fine paper line follows the cursor, waves as it goes, and fades — the flow that becomes
export function M2() {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pts = useRef<{ x: number; y: number; t: number }[]>([]);
  useMouse(ref, (x, y, el) => { pts.current.push({ x: x * el.clientWidth, y: y * el.clientHeight, t: performance.now() }); if (pts.current.length > 90) pts.current.shift(); });
  useEffect(() => {
    const c = canvas.current; const el = ref.current; if (!c || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const size = () => { c.width = el.clientWidth * devicePixelRatio; c.height = el.clientHeight * devicePixelRatio; };
    size(); window.addEventListener("resize", size);
    const ctx = c.getContext("2d")!;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); ctx.scale(1, 1);
      const now = performance.now(); const p = pts.current.filter((q) => now - q.t < 1400); pts.current = p;
      for (let i = 1; i < p.length; i++) {
        const a = 1 - (now - p[i].t) / 1400; const w = Math.sin(now / 260 + i * 0.6) * 6;
        ctx.beginPath(); ctx.moveTo((p[i - 1].x + w) * devicePixelRatio, p[i - 1].y * devicePixelRatio); ctx.lineTo((p[i].x + w) * devicePixelRatio, p[i].y * devicePixelRatio);
        ctx.strokeStyle = `rgba(252,251,249,${a * 0.9})`; ctx.lineWidth = 1.6 * devicePixelRatio * (0.4 + a); ctx.lineCap = "round"; ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return (
    <div ref={ref} className={`${s.stage} ${s.form}`} style={{ background: FORMS[3].color }}>
      <Arcs /><canvas ref={canvas} className={s.canvas} aria-hidden="true" /><Line />
    </div>
  );
}

// M3 — the ripples: rings open where the cursor passes and fade, the mark's own circle repeated
export function M3() {
  const ref = useRef<HTMLDivElement>(null);
  const [rings, setRings] = useState<{ id: number; x: number; y: number }[]>([]);
  const last = useRef(0); const n = useRef(0);
  useMouse(ref, (x, y) => {
    const now = performance.now(); if (now - last.current < 140) return; last.current = now;
    const id = ++n.current; setRings((r) => [...r.slice(-10), { id, x, y }]);
    setTimeout(() => setRings((r) => r.filter((q) => q.id !== id)), 1600);
  });
  return (
    <div ref={ref} className={`${s.stage} ${s.form}`} style={{ background: FORMS[3].color }}>
      <Arcs />
      {rings.map((r) => <span key={r.id} className={s.ring} style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%` }} aria-hidden="true" />)}
      <Line />
    </div>
  );
}

// M4 — the mark looks: the inner circle leans toward the cursor inside the outer, and the panel's colour tilts
// between the teal and the deep aqua with the cursor's height
export function M4() {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<SVGCircleElement>(null);
  useMouse(ref, (x, y, el) => {
    const dx = (x - 0.5) * 2, dy = (y - 0.5) * 2; const len = Math.min(1, Math.hypot(dx, dy));
    const ang = Math.atan2(dy, dx);
    if (inner.current) { inner.current.setAttribute("cx", String(500 + Math.cos(ang) * 38 * len)); inner.current.setAttribute("cy", String(455 + 75 * (1 - len) + Math.sin(ang) * 38 * len)); }
    const mix = (a: string, b: string, t: number) => { const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`; };
    el.style.background = mix("#237C85", "#0A5C66", Math.max(0, Math.min(1, y)));
  });
  return (
    <div ref={ref} className={`${s.stage} ${s.form} ${s.looks}`} style={{ background: FORMS[3].color }}>
      <svg viewBox="180 192.5 640 640" className={s.arcs} aria-hidden="true"><circle cx="500" cy="530" r="240" /><circle ref={inner} cx="500" cy="455" r="200" className={s.eye} /></svg>
      <Line />
    </div>
  );
}
