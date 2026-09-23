import type { Metadata } from "next";
import HeaderB from "@/directions/b/HeaderB";
import FooterB from "@/directions/b/FooterB";
import { F1, F2, F3, F4, F6, F7, C2, C3, C4 } from "@/explore/Variants";
import s from "@/explore/explore.module.css";

export const metadata: Metadata = { title: "Explorations — Bidaya Consulting", robots: { index: false, follow: false } };

// The explorations page (branch build/03b-explorations): four ways to show "We focus on",
// three new ways for "We consult for". Not linked from the site.
const blocks: { id: string; name: string; note: string; el: React.ReactNode }[] = [
  { id: "f6", name: "We focus on — F6, squares that take over", note: "Your idea: seven squares; the hovered one takes over most of the row and the rest slide aside. This one is on the home page.", el: <F6 /> },
  { id: "f7", name: "We focus on — F7, the squares stay, the stage speaks", note: "Claude Code's take: the seven squares stay put; the stage beneath takes the hovered one's colour and shows its line. Nothing shifts.", el: <F7 /> },
  { id: "f1", name: "We focus on — F1, list and stage", note: "Your idea: the seven on the left; hovering one slides its line into the stage on the right in its colour; click goes to the page.", el: <F1 /> },
  { id: "f2", name: "We focus on — F2, expanding columns", note: "Seven strips side by side, titles standing; the hovered strip opens wide and lays its title flat with the line beneath.", el: <F2 /> },
  { id: "f3", name: "We focus on — F3, the ring", note: "The seven around the outlined mark; the hovered one speaks from the centre. No order implied.", el: <F3 /> },
  { id: "f4", name: "We focus on — F4, rows that open", note: "Seven full-width rows; the hovered row opens and its colour sweeps in from the left.", el: <F4 /> },
  { id: "c2", name: "We consult for — C2, big names", note: "The three names stacked large; hovering one turns the whole block that audience's colour and shows its line and mark.", el: <C2 /> },
  { id: "c3", name: "We consult for — C3, tabs and a typed line", note: "Three tabs; the chosen one types its line as the block takes its colour.", el: <C3 /> },
  { id: "c4", name: "We consult for — C4, the diagonal accordion", note: "Three slanted panels; the hovered one widens and opens its line.", el: <C4 /> },
];

export default function Explore() {
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
