import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";
import styles from "./Header.module.css";

// The header lockup: mark · Bidaya · hairline · بداية (brand/svg/bidaya-lockup-3-header.svg).
// On phones the mark and Bidaya only (CLAUDE.md §5) — the same paths, hairline and Arabic dropped.
export default function Header({ current }: { current: string }) {
  const g = getGlobal();
  const nav = getNav();
  const f = g.fields;
  const items = nav.map((n) => (
    <li key={n.href}>
      <Link
        href={n.href}
        className={n.cta ? `btn btn-cta ${styles.cta}` : styles.link}
        aria-current={n.href === current ? "page" : undefined}
      >
        {n.label}
      </Link>
    </li>
  ));
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.home} aria-label={g.siteName}>
          <img className={styles.lockup} src="/brand/svg/bidaya-lockup-3-header.svg" alt="" width="1659" height="392" />
          <img className={styles.lockupPhone} src="/brand/svg/bidaya-lockup-3-header-phone.svg" alt="" width="1075" height="392" />
        </Link>
        <nav className={styles.nav} aria-label={f.navLabel}>
          <details className={styles.toggle}>
            <summary className={styles.summary}>
              <span className={styles.open}>{f.menuOpen}</span>
              <span className={styles.close}>{f.menuClose}</span>
            </summary>
            <ul className={styles.list}>{items}</ul>
          </details>
          <ul className={`${styles.list} ${styles.listWide}`}>{items}</ul>
        </nav>
      </div>
    </header>
  );
}
