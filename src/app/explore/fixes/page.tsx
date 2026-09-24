import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import { Squares } from "@/explore/Squares";
import s from "@/explore/explore.module.css";

export const metadata: Metadata = { title: "Reserve fixes — Bidaya Consulting", robots: { index: false, follow: false } };

// The reserve fixes: variants for a section the founder has sent back (2026-09-24: the seven
// squares "look way too plain"). S1–S3 are his ideas, S4–S6 Claude Code's. Never on the published site.
const blocks: { id: string; name: string; note: string; el: React.ReactNode }[] = [
  { id: "s1", name: "S1 — the words take the square", note: "Your first idea: the titles large and bold; a thin paper frame around each square, which goes as the hovered card grows a little and joins the stage beneath.", el: <Squares variant="words" /> },
  { id: "s2", name: "S2 — a mark for each", note: "Your second idea: an outline drawing in each square for what it is.", el: <Squares variant="marks" /> },
  { id: "s2a", name: "S2a — the mark in the corner, as a watermark", note: "Setup and Tech redrawn; the mark sits in the top-right corner, part of it outside the square, fainter.", el: <Squares variant="marksCorner" /> },
  { id: "s2b", name: "S2b — the mark large, cropped", note: "The same marks drawn large, cropped by the square's top-right corner, fainter still.", el: <Squares variant="marksLarge" /> },
  { id: "s3", name: "S3 — circles as watermarks", note: "Rings and dots of different sizes in different spots, placed by hand so the row reads as random without being.", el: <Squares variant="circles" /> },
  { id: "s4", name: "S4 — one mark across all seven", note: "Claude Code: the two circles of the mark drawn once across the whole row; each square holds its slice, so the seven read as one.", el: <Squares variant="onemark" /> },
  { id: "s5", name: "S5 — the initial", note: "Claude Code: each square carries its first letter, large and faint, the title small beneath.", el: <Squares variant="initials" /> },
];

export default function Fixes() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return (
    <>
      <HeaderB current="/explore/fixes" />
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
