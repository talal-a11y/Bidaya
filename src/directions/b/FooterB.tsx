import Link from "next/link";
import { getGlobal } from "@/lib/content";
import nav from "../../../content/nav.json";
import { resolveNav } from "./HeaderB";
import styles from "./b.module.css";

// The footer: the outlined mark in the footer's own colour (rework/rulings §13), every
// navigation group flat, the "From the firm" group (its name is OPEN — proposed), the two lines.
export default function FooterB() {
  const g = getGlobal();
  const groups = resolveNav();
  return (
    <footer className={`${styles.foot} ${styles.page}`} style={{ borderBlockStart: "1px solid var(--ink)" }}>
      <div className={styles.footMark}>
        <svg viewBox="180 192.5 640 640" className={styles.footArcs} aria-hidden="true"><circle cx="500" cy="530" r="240" /><circle cx="500" cy="455" r="200" /></svg>
      </div>
      <div className={styles.footGroups}>
        {groups.map((grp) => (
          <div key={grp.label} className={styles.footGroup}>
            <p className={styles.mono}>{grp.href ? <Link href={grp.href}>{grp.label}</Link> : grp.label}</p>
            {grp.children && <ul className={styles.footLinks}>{grp.children.map((c) => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}</ul>}
          </div>
        ))}
        <div className={styles.footGroup}>
          <p className={styles.mono}>{nav.footerGroup.label}</p>
          <ul className={styles.footLinks}>{nav.footerGroup.children.map((c) => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}</ul>
        </div>
      </div>
      <div className={`${styles.mono} ${styles.footLines}`}>
        <p>{g.fields.basedIn}</p>
        <p className={styles.quiet}>{g.fields.legal}</p>
      </div>
    </footer>
  );
}
