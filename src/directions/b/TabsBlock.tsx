"use client";
// A section's rows as tabs, in the manner of exploration C3 (the founder's pick, 2026-09-23):
// the chosen tab and the stage take the row's division colour; the title types itself and the
// paragraph rises beneath it. Hover or click chooses; every row stays reachable by keyboard.
import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./b.module.css";
import Typed from "./Typed";

export type TabItem = { title: string; body: ReactNode; tone: string; color: string };
const toneClass: Record<string, string> = { tealDeep: styles.tealDeep, opsDeep: styles.opsDeep, plum: styles.plum, ink: styles.ink, aqua: styles.aqua, teal: styles.teal };

export default function TabsBlock({ items }: { items: TabItem[] }) {
  const [on, setOn] = useState(0);
  const a = items[on];
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {items.map((it, i) => (
          <button key={i} type="button" role="tab" aria-selected={on === i} className={`${styles.tab} ${on === i ? toneClass[it.tone] ?? styles.ink : ""}`} onClick={() => setOn(i)} onMouseEnter={() => setOn(i)}>{it.title}</button>
        ))}
      </div>
      <div className={`${styles.panel} ${styles.tabStage} ${toneClass[a.tone] ?? styles.ink}`}>
        <Typed key={on} text={a.title} delay={80} speed={28} className={styles.tabTitle} as="h3" />
        <div key={`b${on}`} className={styles.tabBody} style={{ animationDelay: `${a.title.length * 28 + 200}ms` }}>{a.body}</div>
      </div>
    </div>
  );
}
