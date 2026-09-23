import Link from "next/link";
import { getGlobal } from "@/lib/content";
import nav from "../../../content/nav.json";
import styles from "./b.module.css";

// The footer, kept small (founder, 2026-09-23): the outlined mark, About, the "More" group
// (its name OPEN), the public address, and the two lines.
export default function FooterB() {
  const g = getGlobal();
  return (
    <footer className={`${styles.foot} ${styles.page}`} style={{ borderBlockStart: "1px solid var(--ink)" }}>
      <div className={styles.footMark}>
        <svg viewBox="180 192.5 640 640" className={styles.footArcs} aria-hidden="true"><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></svg>
      </div>
      <div className={styles.footRow}>
        <ul className={`${styles.footLinks} ${styles.mono}`}>
          <li><Link href="/about">About</Link></li>
          {nav.footerGroup.children.map((c) => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}
          <li><a href={`mailto:${nav.contactEmail}`}>{nav.contactEmail}</a></li>
        </ul>
      </div>
      <div className={`${styles.mono} ${styles.footLines}`}>
        <p>{g.fields.basedIn}</p>
        <p className={styles.quiet}>{g.fields.legal}</p>
      </div>
    </footer>
  );
}
