"use client";
// "We consult for" on the home page (from exploration C2, the founder's pick, 2026-09-23): the
// title types itself once the section is reached, then the three names rise in one after the
// other. Hovering a name turns the block that audience's colour (eased), and its line and mark
// cross-fade in on the right. On a phone the first tap opens, the second goes to the page.
// The names are sized to the column so each sits on one line, as large as the column allows.
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import audiences from "../../../content/audiences.json";
import styles from "./b.module.css";
import Typed from "./Typed";

const Arcs = () => (
  <svg viewBox="180 192.5 640 640" className={styles.consultMark} aria-hidden="true"><g><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></g></svg>
);

export default function ConsultB({ title }: { title: string }) {
  const [on, setOn] = useState(0);
  const [named, setNamed] = useState(false);
  const armed = useRef<number | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const a = audiences.audiences[on];
  const tap = (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (armed.current === i) return;
    e.preventDefault(); armed.current = i; setOn(i);
  };
  useLayoutEffect(() => {
    const el = list.current; if (!el) return;
    const fit = () => {
      const spans = Array.from(el.querySelectorAll("span"));
      const avail = el.clientWidth - 2 * 28 - 18;
      spans.forEach((sp) => { sp.style.fontSize = "100px"; sp.style.whiteSpace = "nowrap"; });
      const widest = Math.max(...spans.map((sp) => sp.offsetWidth));
      const size = Math.max(22, Math.floor((100 * avail) / widest));
      spans.forEach((sp) => { sp.style.fontSize = `${size}px`; sp.style.whiteSpace = ""; });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <>
      <section id="we-consult" className={`${styles.row} ${styles.lineRow}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={title} speed={55} className={styles.title} as="h2" onView onDone={() => setNamed(true)} />
        </div>
      </section>
      <section className={styles.row}>
        <div className={styles.consult} style={{ background: a.color }} data-named={named || undefined}>
          <ul ref={list} className={styles.consultNames}>
            {audiences.audiences.map((x, i) => (
              <li key={x.id} style={{ transitionDelay: `${i * 140}ms` }}>
                <Link href={x.href} data-on={on === i || undefined} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={tap(i)}><span>{x.word}</span></Link>
              </li>
            ))}
          </ul>
          <div className={styles.consultStage}>
            {audiences.audiences.map((x, i) => (
              <div key={x.id} className={styles.consultText} data-on={on === i || undefined} aria-hidden={on !== i || undefined}>
                <Arcs />
                <p className={styles.mono}>{x.name}</p>
                <p className={styles.consultLine}>{x.long}</p>
                <Link href={x.href} className={styles.consultGo} tabIndex={on === i ? 0 : -1} aria-label={`${audiences.learnMore}: ${x.word}`}>{audiences.learnMore}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
