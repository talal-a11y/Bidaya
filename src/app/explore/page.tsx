import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import { F1, F4, F7, C2, C3, C4 } from "@/explore/Variants";
import s from "@/explore/explore.module.css";

export const metadata: Metadata = { title: "Reserves — Bidaya Consulting", robots: { index: false, follow: false } };

// The reserves: variants the founder keeps for later (his list, 2026-09-24: F7, F1, F4, C2, C3, C4).
// Reached from the Explore dropdown, which is never on the published site.
const blocks: { id: string; name: string; note: string; el: React.ReactNode }[] = [
  { id: "f7", name: "We focus on — F7, the squares stay, the stage speaks", note: "On the home page now (with the colour order and the motion). Kept here as first built.", el: <F7 /> },
  { id: "f1", name: "We focus on — F1, list and stage", note: "Kept for a later section: the seven on the left, the hovered one slides its line into the stage on the right.", el: <F1 /> },
  { id: "f4", name: "We focus on — F4, rows that open", note: "Seven full-width rows; the hovered row opens and its colour sweeps in from the left.", el: <F4 /> },
  { id: "c2", name: "We consult for — C2, big names", note: "On the home page now. The three names stacked large; the block takes the hovered audience's colour.", el: <C2 /> },
  { id: "c3", name: "We consult for — C3, tabs and a typed line", note: "In use on the Creatives page for How we do it. Three tabs; the chosen one types its line.", el: <C3 /> },
  { id: "c4", name: "We consult for — C4, the diagonal accordion", note: "Three slanted panels; the hovered one widens and opens its line.", el: <C4 /> },
];

export default function Explore() {
  if (process.env.VERCEL_ENV === "production") notFound(); // the published site has no explorations (founder, 2026-09-24)
  return (
    <>
      <HeaderB current="/explore" />
      <main id="main" tabIndex={-1} className={s.wrap}>
        {blocks.map((b) => (
          <section key={b.id} id={b.id} className={s.block}>
            <div className={s.label}><strong>{b.name}</strong><span className={s.mono}>{b.note}</span></div>
            {b.el}
          </section>
        ))}
      </main>
      <FooterB />
    </>
  );
}
