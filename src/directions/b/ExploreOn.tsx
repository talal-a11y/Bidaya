// "Explore our work on:" — the seven of We focus on as buttons, filtered to an audience
// where a page has one (the mapping is rework/we-focus-on.md's). Each button carries the colour its square has on the home page (focusColors.ts).
import Link from "next/link";
import focus from "../../../content/focus.json";
import { focusSurface } from "./focusColors";
import styles from "./b.module.css";

export default function ExploreOn({ audience, exclude, withLine = false }: { audience?: string; exclude?: string; withLine?: boolean }) {
  const items = focus.items.map((f, i) => ({ ...f, color: focusSurface(i) })).filter((f) => (!audience || f.audiences.includes(audience)) && f.href !== exclude);
  return (
    <div className={styles.explore}>
      {withLine && <p className={styles.lead}>{focus.exploreOn}</p>}
      <div className={styles.exploreRow}>
        {items.map((f) => <Link key={f.id} href={f.href} className={`${styles.action} ${styles.actionFill} ${styles.exploreBtn}`} style={{ background: f.color, borderColor: f.color }}>{f.title}</Link>)}
      </div>
    </div>
  );
}
