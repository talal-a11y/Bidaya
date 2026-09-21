import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const g = getGlobal();
  const nav = getNav();
  return (
    <footer className={styles.footer}>
      <img className={styles.watermark} src="/brand/svg/bidaya-mark.svg" alt="" aria-hidden="true" width="1000" height="1000" />
      <div className={`wrap ${styles.inner}`}>
        <ul className={styles.list}>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={styles.link}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <p className={styles.based}>{g.fields.basedIn}</p>
        {/* the legal line: the one place "AED" appears outside How we work, the intent pages and FAQ — a legal notice, not copy */}
        <p className={styles.legal}>{g.fields.legal}</p>
      </div>
    </footer>
  );
}
