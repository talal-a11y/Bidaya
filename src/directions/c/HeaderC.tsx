import Link from "next/link";
import { getGlobal, getNav } from "@/lib/content";
import styles from "./c.module.css";

export default function HeaderC({ current }: { current: string }) {
  const g = getGlobal(); const nav = getNav();
  const links = nav.filter((n) => !n.cta); const start = nav.find((n) => n.cta)!;
  return (
    <header className={styles.bar}>
      <Link href="/" aria-label={g.siteName}><img className={styles.lockup} src="/brand/svg/bidaya-lockup-3-header.svg" alt="" width="1659" height="392" /></Link>
      <nav className={styles.nav} aria-label={g.fields.navLabel}><ul>{links.map((n) => <li key={n.href}><Link href={n.href} aria-current={n.href === current ? "page" : undefined}>{n.label}</Link></li>)}</ul></nav>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <details className={styles.menu}><summary>{g.fields.menuOpen}</summary><ul>{links.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></details>
        <Link href={start.href} className={styles.start}>{start.label}</Link>
      </div>
    </header>
  );
}
