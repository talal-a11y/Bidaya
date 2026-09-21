import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";
import styles from "./b.module.css";

export default function FooterB() {
  const g = getGlobal();
  return (
    <footer className={`${styles.foot} ${styles.page}`} style={{ borderBlockStart: "1px solid var(--ink)" }}>
      <div className={styles.footMark}><img src="/brand/svg/bidaya-mark-construction.svg" alt="" width="1000" height="1000" /></div>
      <ul className={`${styles.footLinks} ${styles.mono}`} style={{ fontSize: 14 }}>
        {getNav().map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
      </ul>
      <div className={`${styles.mono} ${styles.footLines}`}>
        <p>{g.fields.basedIn}</p>
        <p className={styles.quiet}>{g.fields.legal}</p>
      </div>
    </footer>
  );
}
