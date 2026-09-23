"use client";
// Four ways to show "We focus on" (F1–F4) and three new ways for "We consult for" (C2–C4),
// beside the current cards (C1). Hover or focus opens; a click goes to the page. Each variant
// is one block; the words are content/focus.json and content/audiences.json, unchanged.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import focus from "../../content/focus.json";
import audiences from "../../content/audiences.json";
import s from "./explore.module.css";

// every item of "We focus on" carries its division's colour (content/focus.json 'function')
// on a phone the first tap opens a panel and the second goes to its page
// on a phone the first tap opens a panel (a tap also focuses and "hovers" it, so the click
// alone decides), the second tap on the same panel goes to its page
function useTap(setOn: (i: number) => void) {
  const armed = useRef<number | null>(null);
  return (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (armed.current === i) return;
    e.preventDefault(); armed.current = i; setOn(i);
  };
}
const fnTone: Record<string, string> = { setup: s.teal, ops: s.ops, finance: s.plum, tech: s.ink };
const toneOf = (f: { function: string }) => fnTone[f.function] ?? s.ink;
const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="180 192.5 640 640" className={className} aria-hidden="true"><g className={s.arcs}><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></g></svg>
);

export function F1() {
  const [on, setOn] = useState(0);
  return (
    <div className={s.f1}>
      <ul>{focus.items.map((f, i) => <li key={f.id}><Link href={f.href} className={toneOf(f)} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>{f.title}</Link></li>)}</ul>
      <div className={s.f1Stage}>
        {focus.items.map((f, i) => (
          <div key={f.id} className={`${s.f1Card} ${toneOf(f)}`} data-on={on === i || undefined}>
            <Mark />
            <h3>{f.title}</h3>
            <p className={s.line}>{f.line}</p>
            <Link href={f.href} className={s.go} tabIndex={on === i ? 0 : -1}>Learn more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function F2() {
  const [on, setOn] = useState(0);
  return (
    <div className={s.f2}>
      {focus.items.map((f, i) => (
        <Link key={f.id} href={f.href} className={toneOf(f)} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
          <span className={s.f2Title}>{f.title}</span>
          <div className={s.f2Body}><p className={s.line}>{f.line}</p><span className={s.go}>Learn more</span></div>
        </Link>
      ))}
    </div>
  );
}

export function F3() {
  const [on, setOn] = useState(0);
  const n = focus.items.length;
  return (
    <div className={`${s.f3} ${s.stone}`}>
      <Mark className={s.f3Mark} />
      <div className={s.f3Centre}>
        <h3>{focus.items[on].title}</h3>
        <p>{focus.items[on].line}</p>
        <Link href={focus.items[on].href} className={s.go}>Learn more</Link>
      </div>
      <ul>
        {focus.items.map((f, i) => {
          const a = (-Math.PI / 2) + (i / n) * Math.PI * 2;
          return <li key={f.id} style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }}><Link href={f.href} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>{f.title}</Link></li>;
        })}
      </ul>
    </div>
  );
}

export function F4() {
  const [on, setOn] = useState<number | null>(null);
  return (
    <div className={s.f4}>
      {focus.items.map((f, i) => (
        <Link key={f.id} href={f.href} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)} onFocus={() => setOn(i)}>
          <h3>{f.title}</h3>
          <div className={s.f4Line}><p className={s.line}>{f.line}</p></div>
          <span className={s.arrow} aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}

// F5: the seven as a diagonal accordion (the founder's pick, from C4): each panel in its division's
// colour; the hovered one widens, lays its title flat and opens its line. Earlier panels sit above
// later ones so the slanted edge shows.
export function F5() {
  const [on, setOn] = useState(0);
  const tap = useTap(setOn);
  const n = focus.items.length;
  return (
    <div className={s.f5}>
      {focus.items.map((f, i) => (
        <Link key={f.id} href={f.href} className={toneOf(f)} style={{ zIndex: n - i }} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={tap(i)}>
          <span className={s.f5Title}>{f.title}</span>
          <div className={s.f5Body}><p className={s.line}>{f.line}</p><span className={s.go}>{focus.learnMore}</span></div>
        </Link>
      ))}
    </div>
  );
}

const aTone: Record<string, string> = { ink: s.ink, plum: s.plum, opsDeep: s.ops, tealDeep: s.teal, aqua: s.aqua };

export function C2() {
  const [on, setOn] = useState(0);
  const tap = useTap(setOn);
  const a = audiences.audiences[on];
  return (
    <div className={`${s.c2} ${aTone[a.tone]}`}>
      <ul>{audiences.audiences.map((x, i) => <li key={x.id}><Link href={x.href} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={tap(i)}>{x.word}</Link></li>)}</ul>
      <div className={s.c2Stage}>
        <Mark />
        {audiences.audiences.map((x, i) => on === i && (
          <div key={x.id} className={s.c2Text} data-on>
            <p className={s.mono}>{x.name}</p>
            <p className={s.line} style={{ fontSize: "clamp(18px, 1.6vw, 26px)" }}>{x.long}</p>
            <Link href={x.href} className={s.go}>Learn more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => { let i = 0; const iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, 18); return () => clearInterval(iv); }, [text]);
  return <p className={s.c3Typed}>{text.slice(0, n)}{n < text.length && <span className={s.caret} />}</p>;
}

export function C3() {
  const [on, setOn] = useState(0);
  const a = audiences.audiences[on];
  return (
    <div className={s.c3}>
      <div className={s.c3Tabs} role="tablist">
        {audiences.audiences.map((x, i) => <button key={x.id} role="tab" aria-selected={on === i} className={on === i ? aTone[x.tone] : ""} onClick={() => setOn(i)} onMouseEnter={() => setOn(i)}>{x.word}</button>)}
      </div>
      <div className={`${s.c3Stage} ${aTone[a.tone]}`}>
        <div><Mark key={a.id} /><p className={s.mono}>{a.name}</p></div>
        <div><Typed key={a.id} text={a.long} /><Link href={a.href} className={s.go}>Learn more</Link></div>
      </div>
    </div>
  );
}

export function C4() {
  const [on, setOn] = useState(0);
  return (
    <div className={s.c4}>
      {audiences.audiences.map((x, i) => (
        <Link key={x.id} href={x.href} className={aTone[x.tone]} style={{ zIndex: 3 - i }} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
          <p className={s.c4Word}>{x.word}</p>
          <div className={s.c4Body}><p className={s.line}>{x.long}</p><span className={s.go}>Learn more</span></div>
        </Link>
      ))}
    </div>
  );
}
