import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import { H1, H2, H3, H4, H5, M1, M2, M3, M4 } from "@/explore/HomeMotion";
import s from "@/explore/explore.module.css";

export const metadata: Metadata = { title: "Home animations — Bidaya Consulting", robots: { index: false, follow: false } };

// Home animations (founder, 2026-09-24): the hero's right panel as a movie-style opening that shows
// the four colours and marks before settling on the teal one, then ways to keep it alive under the
// mouse. Each opening has a Replay button. Never on the published site.
const blocks: { id: string; name: string; note: string; el: React.ReactNode }[] = [
  { id: "h1", name: "H1 — the page flip", note: "Your idea: the four forms stacked; each flips away from a different corner, fast, and the teal one stays.", el: <H1 /> },
  { id: "h2", name: "H2 — the wipes", note: "Each colour sweeps in over the last from a different side, its mark riding with it; the teal is the last to land.", el: <H2 /> },
  { id: "h3", name: "H3 — the marks converge", note: "Four marks scattered and turning gather into one as the colours pass beneath; the line arrives last.", el: <H3 /> },
  { id: "h4", name: "H4 — the shuffle", note: "Four cards dealt onto a pile one by one; the last, the teal, grows to fill the panel.", el: <H4 /> },
  { id: "h5", name: "H5 — through the ring", note: "Each form rushes at you and you pass through its inner circle to the next; the teal arrives and holds.", el: <H5 /> },
  { id: "m1", name: "M1 — depth", note: "Under the mouse: the two circles drift toward the cursor at different depths, the line stays put.", el: <M1 /> },
  { id: "m2", name: "M2 — the trail", note: "Under the mouse: a fine paper line follows the cursor, waves as it goes, and fades.", el: <M2 /> },
  { id: "m3", name: "M3 — the ripples", note: "Under the mouse: rings open where the cursor passes and fade, the mark's own circle repeated.", el: <M3 /> },
  { id: "m4", name: "M4 — the mark looks", note: "Under the mouse: the inner circle leans toward the cursor inside the outer, and the panel tilts between the teal and the deep aqua with the cursor's height.", el: <M4 /> },
];

export default function HomeAnimations() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return (
    <>
      <HeaderB current="/explore/home" />
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
