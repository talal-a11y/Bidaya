"use client";
// Six ways to make the seven squares of "We focus on" less plain (the founder, 2026-09-24:
// "there needs to be something more there"). Each keeps the squares, his colour order and the
// stage beneath; only what sits inside the squares changes. S1–S3 are his three ideas, S4–S6 mine.
import Link from "next/link";
import { useState } from "react";
import focus from "../../content/focus.json";
import { focusColor, focusSurface } from "@/directions/b/focusColors";
import s from "./squares.module.css";

export type SquareVariant = "words" | "marks" | "flow" | "onemark" | "initials" | "hilal";

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

// S3: one flowing line drawn through all seven, looping around them, repeating
function Flow() {
  return (
    <svg viewBox="0 0 700 100" preserveAspectRatio="none" className={s.flow} aria-hidden="true">
      <path className={s.flowGhost} d="M-10 60 C 40 10, 60 10, 100 55 S 160 100, 200 50 C 230 15, 250 15, 300 52 S 350 95, 400 50 C 430 10, 460 10, 500 52 S 560 95, 600 50 C 640 12, 670 12, 710 55" />
      <path className={s.flowLine} d="M-10 60 C 40 10, 60 10, 100 55 S 160 100, 200 50 C 230 15, 250 15, 300 52 S 350 95, 400 50 C 430 10, 460 10, 500 52 S 560 95, 600 50 C 640 12, 670 12, 710 55" />
      <path className={s.flowLoop} d="M-10 45 C 30 80, 70 80, 100 45 C 120 20, 130 70, 150 50 C 190 10, 210 90, 250 50 C 280 20, 300 80, 350 50 C 390 20, 400 85, 450 50 C 480 20, 500 80, 550 50 C 590 15, 610 90, 650 50 C 670 30, 690 30, 710 45" />
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

// S6: the hilal in seven phases — the inner circle slides across the outer, thin crescent to full ring and back
function Hilal({ i }: { i: number }) {
  const off = [30, 20, 10, 0, 10, 20, 30][i] ?? 0;
  const cy = 55 - off;
  return (
    <svg viewBox="0 0 100 100" className={s.crescent} aria-hidden="true">
      <path fillRule="evenodd" fill="currentColor" d={`M14 55a36 36 0 1 0 72 0a36 36 0 1 0-72 0ZM20 ${cy}a30 30 0 1 0 60 0a30 30 0 1 0-60 0Z`} />
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
            <Link href={x.href} style={{ background: focusColor(i) }} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
              {variant === "marks" && <Glyph id={x.id} />}
              {variant === "initials" && <span className={s.initial} aria-hidden="true">{x.title[0]}</span>}
              {variant === "onemark" && <OneMarkPiece i={i} />}
              {variant === "hilal" && <Hilal i={i} />}
              <span className={s.title}>{x.title}</span>
            </Link>
          </li>
        ))}
        {variant === "flow" && <Flow />}
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
