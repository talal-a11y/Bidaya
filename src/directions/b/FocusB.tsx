"use client";
// "We focus on" on the home page (from exploration F7, the founder's pick, 2026-09-23): the title
// types itself once reached; seven squares in his colour order rise in; the hovered square lifts
// and the stage beneath eases to its colour and shows its line. Nothing shifts, every line fits.
// On a phone the first tap opens, the second goes to the page.
import Link from "next/link";
import { useRef, useState } from "react";
import focus from "../../../content/focus.json";
import styles from "./b.module.css";
import Typed from "./Typed";
import { focusColor } from "./focusColors";

export default function FocusB({ title }: { title: string }) {
  const [on, setOn] = useState(0);
  const [shown, setShown] = useState(false);
  const armed = useRef<number | null>(null);
  const f = focus.items[on];
  const tap = (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (armed.current === i) return;
    e.preventDefault(); armed.current = i; setOn(i);
  };
  return (
    <>
      <section id="we-focus-on" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.paper}`}>
          <Typed text={title} speed={55} className={styles.title} as="h2" onView onDone={() => setShown(true)} />
        </div>
      </section>
      <section className={styles.row}>
        <div className={styles.focus7} style={{ background: focusColor(on) }} data-shown={shown || undefined}>
          <ul className={styles.focusRow}>
            {focus.items.map((x, i) => (
              <li key={x.id} style={{ transitionDelay: `${i * 90}ms` }}>
                <Link href={x.href} style={{ background: focusColor(i) }} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={tap(i)}>{x.title}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.focusStage}>
            <svg viewBox="180 192.5 640 640" className={styles.consultMark} aria-hidden="true"><g><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></g></svg>
            {focus.items.map((x, i) => (
              <div key={x.id} className={styles.focusText} data-on={on === i || undefined} aria-hidden={on !== i || undefined}>
                <h3>{x.title}</h3>
                <p className={styles.consultLine}>{x.line}</p>
                <Link href={x.href} className={styles.consultGo} tabIndex={on === i ? 0 : -1}>{focus.learnMore}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
