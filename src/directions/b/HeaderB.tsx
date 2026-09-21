import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";

// While the site is this one page, the navigation goes to its sections (founder, 2026-09-21).
const anchor = (href: string) => `/#${href.replace(/^\//, "")}`;
import styles from "./b.module.css";

// Direction B's header: a bar of panels — lockup · nav · Start.
export default function HeaderB({ current }: { current: string }) {
  const g = getGlobal();
  const nav = getNav();
  const links = nav.filter((n) => !n.cta);
  const start = nav.find((n) => n.cta)!;
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.barHome} aria-label={g.siteName}>
        <img className={styles.lockup} src="/brand/svg/bidaya-lockup-3-header.svg" alt="" width="1659" height="392" />
      </Link>
      <nav className={styles.barNav} aria-label={g.fields.navLabel}>
        <ul>{links.map((n) => <li key={n.href}><Link href={anchor(n.href)} aria-current={n.href === current ? "page" : undefined}>{n.label}</Link></li>)}</ul>
      </nav>
      <details className={styles.menuToggle}>
        <summary>{g.fields.menuOpen}</summary>
        <ul>{links.map((n) => <li key={n.href}><Link href={anchor(n.href)}>{n.label}</Link></li>)}</ul>
      </details>
      <div className={styles.barStart}><Link href={anchor(start.href)}>{start.label}</Link></div>
    </header>
  );
}
