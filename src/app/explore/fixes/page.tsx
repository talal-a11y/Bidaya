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
  { id: "s1", name: "S1 — the words take the square", note: "Your first idea: the titles large and bold, from the top, filling most of each square.", el: <Squares variant="words" /> },
  { id: "s2", name: "S2 — a mark for each", note: "Your second idea: an outline drawing in each square for what it is — the two circles, a grid, coins, three nodes, three rings, arcs, a ring of people.", el: <Squares variant="marks" /> },
  { id: "s3", name: "S3 — one flowing line", note: "Your third idea: a wavy line drawn through all seven, looping around them, flowing on repeat, to show they are one.", el: <Squares variant="flow" /> },
  { id: "s4", name: "S4 — one mark across all seven", note: "Claude Code: the two circles of the mark drawn once across the whole row; each square holds its slice, so the seven read as one.", el: <Squares variant="onemark" /> },
  { id: "s5", name: "S5 — the initial", note: "Claude Code: each square carries its first letter, large and faint, the title small beneath.", el: <Squares variant="initials" /> },
  { id: "s6", name: "S6 — the hilal in seven phases", note: "Claude Code: the inner circle slides across the outer from square to square — thin crescent to full ring and back — the beginning, in the mark's own language.", el: <Squares variant="hilal" /> },
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
