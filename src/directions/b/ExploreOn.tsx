// "Explore our work on:" — the seven of We focus on as buttons, filtered to an audience
// where a page has one (the mapping is rework/we-focus-on.md's). On the home page, all seven.
import Link from "next/link";
import focus from "../../../content/focus.json";
import styles from "./b.module.css";

export default function ExploreOn({ audience, exclude, withLine = false }: { audience?: string; exclude?: string; withLine?: boolean }) {
  const items = (audience ? focus.items.filter((f) => f.audiences.includes(audience)) : focus.items).filter((f) => f.href !== exclude);
  return (
    <div className={styles.explore}>
      {withLine && <p className={styles.lead}>{focus.exploreOn}</p>}
      <div className={styles.exploreRow}>
        {items.map((f) => <Link key={f.id} href={f.href} className={`${styles.action} ${styles.exploreBtn}`}>{f.title}</Link>)}
      </div>
    </div>
  );
}
