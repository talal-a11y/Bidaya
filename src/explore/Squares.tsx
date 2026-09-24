"use client";
// Six ways to make the seven squares of "We focus on" less plain (the founder, 2026-09-24:
// "there needs to be something more there"). Each keeps the squares, his colour order and the
// stage beneath; only what sits inside the squares changes. S1–S3 are his three ideas, S4–S6 mine.
import Link from "next/link";
import { useState } from "react";
import focus from "../../content/focus.json";
import { focusColor, focusSurface } from "@/directions/b/focusColors";
import s from "./squares.module.css";

export type SquareVariant = "words" | "marks" | "marksCorner" | "marksLarge" | "circles" | "onemark" | "initials";

// S2: a mark for each of the seven — outline, single weight, drawn from circles and squares
function Glyph({ id }: { id: string }) {
  const c = "none", k = "currentColor";
  switch (id) {
    case "executive-management": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true"><circle cx="50" cy="56" r="32" fill={c} stroke={k} strokeWidth="3" /><circle cx="50" cy="46" r="26" fill={c} stroke={k} strokeWidth="3" /></svg>;
    case "setup-and-structure": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true">{[[20, 20], [56, 20], [20, 56], [56, 56]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="24" height="24" rx="4" fill={c} stroke={k} strokeWidth="3" />)}</svg>;
    case "finance-and-accounting": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true">{[40, 54, 68].map((y) => <ellipse key={y} cx="50" cy={y} rx="28" ry="9" fill={c} stroke={k} strokeWidth="3" />)}</svg>;
    case "tech-and-automation": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true"><path d="M26 32L74 32L50 74Z" fill={c} stroke={k} strokeWidth="3" /><circle cx="26" cy="32" r="9" fill={c} stroke={k} strokeWidth="3" /><circle cx="74" cy="32" r="9" fill={c} stroke={k} strokeWidth="3" /><circle cx="50" cy="74" r="9" fill={c} stroke={k} strokeWidth="3" /></svg>;
    case "programs-events-campaigns": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true"><circle cx="38" cy="42" r="21" fill={c} stroke={k} strokeWidth="3" /><circle cx="62" cy="42" r="21" fill={c} stroke={k} strokeWidth="3" /><circle cx="50" cy="62" r="21" fill={c} stroke={k} strokeWidth="3" /></svg>;
    case "workshops-and-training": return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true">{[14, 27, 40].map((r) => <path key={r} d={`M${50 - r * 0.94} ${64 + r * 0.34}A${r} ${r} 0 0 1 ${50 + r * 0.94} ${64 + r * 0.34}`} fill={c} stroke={k} strokeWidth="3" />)}</svg>;
    default: return <svg viewBox="0 0 100 100" className={s.glyph} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <circle key={i} cx={50 + 30 * Math.cos(a)} cy={50 + 30 * Math.sin(a)} r="6" fill={c} stroke={k} strokeWidth="3" />; })}<circle cx="50" cy="50" r="8" fill={c} stroke={k} strokeWidth="3" /></svg>;
  }
}

// S2a / S2b: the same marks with two redrawn (Setup: a square within a square; Tech: nodes joined at right angles)
function Glyph2({ id, className }: { id: string; className?: string }) {
  const c = "none", k = "currentColor";
  if (id === "setup-and-structure") return <svg viewBox="0 0 100 100" className={className} aria-hidden="true"><rect x="16" y="16" width="68" height="68" rx="4" fill={c} stroke={k} strokeWidth="3" /><rect x="34" y="34" width="32" height="32" rx="3" fill={c} stroke={k} strokeWidth="3" /></svg>;
  if (id === "tech-and-automation") return <svg viewBox="0 0 100 100" className={className} aria-hidden="true"><path d="M26 26H50V74H74" fill={c} stroke={k} strokeWidth="3" /><circle cx="26" cy="26" r="8" fill={c} stroke={k} strokeWidth="3" /><circle cx="50" cy="50" r="8" fill={c} stroke={k} strokeWidth="3" /><circle cx="74" cy="74" r="8" fill={c} stroke={k} strokeWidth="3" /></svg>;
  return <span className={className}><Glyph id={id} /></span>;
}

// S3: circles as watermarks — one to three rings per square, sized and placed by hand so the row reads as random without being
const CIRCLES: { cx: number; cy: number; r: number; fill?: boolean }[][] = [
  [{ cx: 78, cy: 22, r: 34 }, { cx: 22, cy: 70, r: 9, fill: true }],
  [{ cx: 30, cy: 30, r: 22 }, { cx: 86, cy: 74, r: 30 }],
  [{ cx: 70, cy: 62, r: 40 }],
  [{ cx: 18, cy: 18, r: 14, fill: true }, { cx: 80, cy: 40, r: 26 }, { cx: 56, cy: 86, r: 10 }],
  [{ cx: 50, cy: 20, r: 44 }],
  [{ cx: 84, cy: 84, r: 36 }, { cx: 26, cy: 42, r: 12, fill: true }],
  [{ cx: 24, cy: 78, r: 28 }, { cx: 74, cy: 24, r: 18 }],
];
function Circles({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={s.circles} aria-hidden="true">
      {CIRCLES[i].map((c, k) => <circle key={k} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={c.fill ? 0 : 2} opacity={c.fill ? 0.18 : 0.32} />)}
    </svg>
  );
}

// S4: one mark drawn across all seven — each square shows its slice of the same two circles
function OneMarkPiece({ i }: { i: number }) {
  return (
    <svg viewBox={`${i * 1000} 0 1000 1000`} preserveAspectRatio="xMidYMid slice" className={s.piece} aria-hidden="true">
      <circle cx="3500" cy="9200" r="9000" fill="none" stroke="currentColor" strokeWidth="36" />
      <circle cx="3500" cy="8700" r="8200" fill="none" stroke="currentColor" strokeWidth="36" />
    </svg>
  );
}

export function Squares({ variant }: { variant: SquareVariant }) {
  const [on, setOn] = useState(0);
  const f = focus.items[on];
  return (
    <div className={`${s.wrap} ${s[variant]}`} style={{ background: focusSurface(on) }}>
      <ul className={s.row}>
        {focus.items.map((x, i) => (
          <li key={x.id}>
            <Link href={x.href} style={{ background: variant === "words" && on === i ? focusSurface(i) : focusColor(i) }} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
              {variant === "marks" && <Glyph id={x.id} />}
              {variant === "marksCorner" && <Glyph2 id={x.id} className={s.glyphCorner} />}
              {variant === "marksLarge" && <Glyph2 id={x.id} className={s.glyphLarge} />}
              {variant === "circles" && <Circles i={i} />}
              {variant === "initials" && <span className={s.initial} aria-hidden="true">{x.title[0]}</span>}
              {variant === "onemark" && <OneMarkPiece i={i} />}
              <span className={s.title}>{x.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={s.stage}>
        <div key={f.id} className={s.text}>
          <h3>{f.title}</h3>
          <p>{f.line}</p>
          <Link href={f.href} className={s.go} aria-label={`${focus.learnMore}: ${f.title}`}>{focus.learnMore}</Link>
        </div>
      </div>
    </div>
  );
}
