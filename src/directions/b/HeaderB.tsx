import Link from "next/link";
import AnchorLink from "./AnchorLink";
import { getGlobal, getPages } from "@/lib/content";
import nav from "../../../content/nav.json";
import audiences from "../../../content/audiences.json";
import focus from "../../../content/focus.json";
import styles from "./b.module.css";

// The header: About | Consulting For ▾ | Consulting On ▾ | Resources ▾ | Enquire
// (the founder's Vercel comment, 2026-09-23). Dropdowns open on hover or focus; on the phone
// the menu lists every group flat and closes when a link is tapped.
export type NavGroup = { label: string; href?: string; children?: { label: string; href: string }[] };

export function resolveNav(): NavGroup[] {
  const pages = getPages();
  return nav.items.map((it) => {
    if ("group" in it && it.group === "audiences") return { label: it.label, children: audiences.audiences.map((a) => ({ label: a.word, href: a.href })) };
    if ("group" in it && it.group === "focus") return { label: it.label, children: focus.items.map((f) => ({ label: f.title, href: f.href })) };
    if ("children" in it && it.children) return { label: it.label, children: it.children.filter((c) => pages.some((p) => p.route === c.href)) };
    return { label: it.label, href: (it as { href: string }).href };
  });
}

export const showExplore = process.env.VERCEL_ENV !== "production";

export default function HeaderB({ current }: { current: string }) {
  const g = getGlobal();
  // the Explore dropdown: the reserves (kept variants) and the reserve fixes (variants for a section under review); never on the published site
  const groups: NavGroup[] = [...resolveNav(), ...(showExplore ? [{ label: "Explore", children: [{ label: "Reserves", href: "/explore" }, { label: "Reserve fixes", href: "/explore/fixes" }] }] : [])];
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.barHome} aria-label={g.siteName}>
        <img className={styles.lockup} src="/brand/svg/outlined/bidaya-lockup-3-header-outlined.svg" alt="" width="1659" height="392" />
      </Link>
      <nav className={styles.barNav} aria-label={g.fields.navLabel}>
        <ul>
          {groups.map((grp) => grp.children ? (
            <li key={grp.label} className={styles.dd}>
              <button type="button" className={styles.ddBtn} aria-haspopup="true">{grp.label} <span aria-hidden="true">▾</span></button>
              <ul className={styles.ddList}>{grp.children.map((c) => <li key={c.href}><Link href={c.href} aria-current={c.href === current ? "page" : undefined}>{c.label}</Link></li>)}</ul>
            </li>
          ) : (
            <li key={grp.label}><Link href={grp.href!} aria-current={grp.href === current ? "page" : undefined}>{grp.label}</Link></li>
          ))}
        </ul>
      </nav>
      <details className={styles.menuToggle}>
        <summary>{g.fields.menuOpen}</summary>
        <ul>
          {groups.map((grp) => grp.children ? (
            <li key={grp.label} className={styles.menuGroup}>
              <span className={styles.mono}>{grp.label}</span>
              <ul>{grp.children.map((c) => <li key={c.href}><AnchorLink href={c.href}>{c.label}</AnchorLink></li>)}</ul>
            </li>
          ) : (
            <li key={grp.label}><AnchorLink href={grp.href!}>{grp.label}</AnchorLink></li>
          ))}
        </ul>
      </details>
      <div className={styles.barStart}><AnchorLink href={nav.cta.href}>{nav.cta.label}</AnchorLink></div>
    </header>
  );
}
