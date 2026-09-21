# Bidaya — Identity System Spec, Part 1: Mood Direction and Colour

**Phase 5 document, v2 — final.** Replaces v1 (dark plum, saffron), which the founder rejected on sight on 20 September: too dark and dull; saffron "big no"; plum 950 and ink 950 too dark. v2 records the system as locked on the identity board (Version 23) — light and cool — with the reasoning, the tokens, the verified contrast and the rules. Produced by `brand-identity` on its spec template against Draft 2 §9 as amended by ledger AI, the lock, ledger N and Q, and the founder's rulings of 20–21 September.

**Constraints honoured.** §9 locked: rounded corners; motion below Plaid; rigorous responsive; semantic HTML. §9 amended by founder ruling (ledger AI): the primary is light, not dark — the escape clause exercised after the dark direction was built, shown and rejected. §9 excluded: orange primary, BCG green, pure white dominant, emoji, the Inter / Poppins / Montserrat / Open Sans stack. §8: navy-and-gold, skyline, gradient-mesh, rising arrows, three-column icon grids — none present. Ledger N: no skyline, boardroom, handshake or executive portraiture; advanced, not young.

---

## System metadata

**Brand:** Bidaya — بداية
**Version:** identity spec v1.0, Part 1 of 3 (Parts 2 and 3 are absorbed into the identity system spec)
**Date:** 2026-09-21
**Owner:** Talal Abdel-Hamid
**Status:** Approved — colour locked 20 September, "open to suggestions as we go"

---

## 0. The predictable directions, named and rejected

1. **Navy and gold, serif, skyline.** The category's premium default (Phase 2). Blacklisted three ways.
2. **Blue gradient, geometric sans, rounded cards.** The tech-forward tier. Reads young and vendor; the Inter stack is banned; gradients are the AI-startup tell.
3. **Deep green and mint.** The current identity. The founder's own diagnosis: the palette AI produces when given nothing. Retired; the mark's file colour is ignored.
4. **Terracotta, cream and a warm serif.** The "artisanal" anti-corporate move. Reads creative agency, not executive management.
5. **Electric violet on black.** The AI-company palette of 2024–26. Advanced, but theirs.
6. **Dark plum with a saffron light — this document's own v1.** Built first, within §9's dark-primary rule, and rejected by the founder: dark read dull rather than premium, saffron read as a warning colour, and the whole sat one step from direction 5. The lesson on record: §9's "dark reads premium" was a reaction to seven reference sites, not a law; when built for Bidaya it failed the founder's test.

---

## 1. Mood direction — light and cool

**The idea.** Warm stone surfaces, ink text, and deep aqua doing the work of an accent. The page is calm and full of light; colour arrives in bands — ribboned edges of aqua, teal and plum — and once, in the four-functions build, in the mark itself. Nothing is decorated. Motion is the identity's signature: a background flow that, twice on the site, gathers and becomes something solid.

**What this does for the position.** Executive management, from the beginning, is a promise of calm and anticipation. Light carries calm without the establishment's gravity; warm stone rather than white keeps it from reading as a template. The coloured bands carry the seriousness — deep, saturated, flat — and the softness of every edge carries Bouba: bold shapes, gentle edges, nothing pointed.

**Register.** Advanced, not young (ledger N). Advanced shows in precision: tokens, tidy grids, a single accent doing real work, motion that finishes before you notice. Young would show in gradients, playful illustration, saturated surfaces, many colours — none appear. Serious, not generic (ledger Q): the seriousness is carried by specifics, not by darkness.

**Bouba, specified.** Corner radii: 8 (controls) · 12 (inputs, cells) · 20 (small cards) · 28 (panels) · 48 (the read, large cards) · pill (buttons, tags). No sharp corners anywhere, including section boundaries: sections meet on ribbons, never on a straight edge. Inside a curved section nothing is a box — pill cards, circles, blobs.

**The "colorful" ruling (ledger Q), closed.** Colour as bands and as the one coloured build — not as surfaces everywhere and not as accents scattered through the copy. Colourful where a section changes; professional because the page itself stays stone.

**Dark mode.** None proposed. The primary is light; dark appears as the coloured bands and in ink text. The roadmap's "light and dark variants" is amended to one system. Open for the founder's word (see open questions).

**What the mood is not.** Not luxury (no gold, no serif gravity), not startup (no gradient, no violet-on-black), not craft (no texture, no cream-and-terracotta), not AI's default (no green), and not the category's dark-premium (v1, rejected).

---

## 2. Colour system

### Tokens

| Token | Hex | RGB | HSL | Usage |
|---|---|---|---|---|
| `stone` | #F4F1EC | 244 241 236 | 37° 27% 94% | **The page.** Warm off-white. Never pure white as a page. |
| `paper` | #FCFBF9 | 252 251 249 | 40° 33% 98% | Cards, reading surfaces, the read. The one near-white; never a page. |
| `ink` | #241B2E | 36 27 46 | 268° 26% 14% | Text, the mark. Not pure black — warm, slightly red. Also the Tech tone. |
| `muted` | #6A5F78 | 106 95 120 | 266° 12% 42% | Secondary text on light. |
| `aqua` | #0B6F7A | 11 111 122 | 186° 83% 26% | **The accent.** Actions, emphasis, the aqua band, the small-mark field. The Operations tone. |
| `teal` | #2A8F99 | 42 143 153 | 185° 57% 38% | Section band. The Setup tone. Large text only on light. |
| `plum` | #5A47A3 | 90 71 163 | 252° 39% 46% | Section band. The Finance tone. |
| `soft` | #DCD6CE | 220 214 206 | 34° 17% 84% | Hairlines, dividers, card borders on light. |
| `hairline` | #B9B1BF | 185 177 191 | 274° 10% 72% | The rule between the scripts in the header lockup. |

The four-functions build uses four of these as its tones: Setup teal, Operations aqua, Finance plum, Tech ink — Setup at the top, then clockwise. The four-tone mark exists only in motion (ledger AN).

### Semantic tokens

| Token | Resolves to | Usage |
|---|---|---|
| `text-primary` | ink | Body, headings |
| `text-secondary` | muted | Captions, supporting lines |
| `text-inverse` | paper | Text on the bands |
| `text-inverse-secondary` | paper at 85% | Supporting lines on the aqua and plum bands (see contrast) |
| `bg-page` | stone | Every page |
| `bg-elevated` | paper | Cards, panels, the read |
| `bg-band-1` / `-2` / `-3` | aqua / teal / plum | Coloured sections |
| `border-default` | soft | Card borders, dividers |
| `action-primary` | aqua, paper text | Primary buttons |
| `action-secondary` | transparent, ink text, `#8E847C` border | Ghost buttons |
| `success` | #237A55 — proposed | 4.7:1 on stone. Never the only signal — pair with a word or icon |
| `warning` | #8A5A06 — proposed | 5.3:1 on stone. Same rule |
| `error` | #B33A3A — proposed | 5.2:1 on stone. Same rule |
| `info` | plum | — |

The three semantic colours are proposed for the tool's read and form states, not locked; they are not on the identity board and appear nowhere in the brand's own surfaces.

### Contrast — verified (WCAG 2.1; 4.5:1 text, 3:1 large text and UI)

| Pair | Ratio | Requirement | Result |
|---|---|---|---|
| ink on stone | 14.7:1 | 4.5 | Pass AAA |
| ink on paper | 16.0:1 | 4.5 | Pass AAA |
| ink on white (others' surfaces) | 16.5:1 | 4.5 | Pass AAA |
| muted on stone | 5.3:1 | 4.5 | Pass |
| muted on paper | 5.8:1 | 4.5 | Pass |
| aqua text on stone | 5.2:1 | 4.5 | Pass — aqua may be text and links on light |
| plum text on stone | 6.5:1 | 4.5 | Pass |
| teal text on stone | 3.4:1 | 3.0 (large) | **Large text only** — never body text on light |
| paper on aqua | 5.7:1 | 4.5 | Pass — body text on the aqua band |
| paper at 85% on aqua | 4.6:1 | 4.5 | Pass — supporting lines on aqua |
| paper on plum | 7.1:1 | 4.5 | Pass |
| paper at 85% on plum | 5.6:1 | 4.5 | Pass |
| paper on teal | 3.7:1 | 3.0 (large) | **Large text only** — titles, not body |
| paper at 85% on teal | 3.1:1 | — | **Fails for text** — no supporting lines on teal |
| ink on teal | 4.3:1 | 4.5 | Fails narrowly — not a way round |
| muted on soft (labels on hairline surfaces) | 4.1:1 | 4.5 | Fails — no text on `soft` |
| soft on stone (border) | 1.3:1 | 3.0 (UI) | Decorative only — borders never carry meaning |
| hairline on paper | 2.0:1 | — | Decorative — the lockup rule, exempt as a logotype |
| aqua primary button, paper text | 5.7:1 | 4.5 | Pass |

**Finding on the record.** The teal band cannot carry body text in any colour: paper fails at 3.7:1, ink fails at 4.3:1. The prototype's "A few steps ahead" section sets a 16px supporting line on teal at 85% paper — 3.1:1 — and fails AA. Three ways out, for the founder to rule (open question 1): the teal band carries a title only and its supporting line moves onto stone; the section moves to aqua, where body text passes; or teal darkens to #217078 for bands, which passes at 5.8:1 but sits one step from aqua and loses the distinction. Recommendation: the first — teal bands carry titles alone, which also keeps the bands quiet.

**Colour-blindness.** Aqua and plum separate in greyscale (L 0.16 vs 0.13 — close; they are never asked to carry meaning against each other). Success and error are never distinguished by hue alone — a word or an icon is mandatory.

### Colour rules

1. Stone is the page; paper is for cards and reading. Pure white is never a page.
2. Aqua is the accent for actions and emphasis. Teal and plum are band and tone colours, never text on light; their darker variants are not needed because they are never text.
3. Ink is the text and the mark; muted is secondary text. On the bands, text is paper.
4. No gradients anywhere, ever. Every colour is flat.
5. The mark is ink on light and paper on the bands. In colour only inside the four-functions build, and only there (ledger AN).
6. The small-mark field — favicon, app icon, avatar — is aqua with the paper mark (ledger AP).
7. Teal bands carry large text only (see the finding). Aqua and plum bands carry body text in paper.
8. Semantic colours never stand alone; they are paired with a word or an icon.
9. Partner lockups on Programs: Bidaya's mark in single colour beside a partner's mark; never Bidaya's colour beside a partner's colour.
10. No new colour is invented for a use case. A gap is a token proposal on the ledger, not a hex in a file.

---

## 3. What follows from the mood — decided, specified in the identity system spec

**Type (Part 2, decision 9 — closed 20 September).** Readex Pro for everything: display 700, body 400, the Arabic wordmark 600. One family drawn with both scripts together. Plainness accepted on purpose; distinctiveness comes from motion, colour and shape. No Arabic content is produced.

**Mark and lockups (Part 3, decision 8 — closed 21 September).** The existing mark, exact from the founder's SVG; mirrored bilingual lockup as primary; one-line lockup with a hairline for the header; stacked for proposals. Full rules in the identity system spec §1.

**Imagery.** No photography at launch; no stock or generated imagery ever. The flow is the only visual language, used sparingly: a background presence in the hero, and the two builds. Visuals never explain content — no words, calendars or diagrams inside a visual — and not every section has one.

**Iconography.** Outline, rounded caps and joins, 1.75px on a 24px grid, single weight. Phosphor, not Lucide. Proposed; the founder's note: "okay, could be better."

**Motion.** The flow that becomes, twice only — the logo, once, top-left, and the four-functions mark, one function at a time. Everything else is a quiet reveal. Every build happens once and stays. Full rules in the identity system spec §6.

**Shapes.** Ribboned section boundaries of varied profile and depth; pill cards; circles; the radii above. Locked 20 September.

---

## Open questions

- [ ] **1. Teal and text** — title-only teal bands (recommended), move the section to aqua, or darken teal for bands to #217078.
- [ ] **2. Dark mode** — confirm none; the bands are the dark.
- [ ] Print: CMYK and Pantone equivalents deferred until a print application is ordered; the business card is the only likely one. A printer's proof decides, not a conversion table.

---

*Part 1, v2 — final. Supersedes v1 entirely; v1's tokens (plum-950, saffron, lilac) are retired and appear nowhere in the system. Add this to project knowledge.*
