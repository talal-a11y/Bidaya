import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";
import styles from "./c.module.css";

export default function FooterC() {
  const g = getGlobal();
  return (
    <footer className={`wrap ${styles.foot} ${styles.page}`}>
      <img className={styles.watermark} src="/brand/svg/bidaya-mark.svg" alt="" aria-hidden="true" width="1000" height="1000" />
      <ul className={styles.footLinks}>{getNav().map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
      <p>{g.fields.basedIn}</p>
      <p className={styles.footSmall}>{g.fields.legal}</p>
    </footer>
  );
}
