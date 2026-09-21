# Bidaya — Identity System Spec

**Phase 5 output, v1.0.** The assembled record of the visual identity as ruled on the identity board (Version 23) and delivered in the logo package, on `brand-identity`'s spec template. It locks what is decided and lists what is not. Part 1 (mood and colour, v2) carries the colour reasoning and the full contrast table; this document carries the rules for every element and points to Part 1 where the reasoning lives.

**Sources.** Draft 2 §9 as amended (ledger AI); the founder's rulings of 20–21 September (ledger AI–AR); the logo package of 21 September; the voice rulebook for the cross-reference in §7.

---

## System metadata

**Brand:** Bidaya — بداية
**Version:** 1.0
**Date:** 2026-09-21
**Owner:** Talal Abdel-Hamid
**Status:** Approved, with the open items in the last section

---

## 1. Logo system

### The mark

- **Form:** abstract symbol — an eccentric ring. Read as a hilal, the beginning of the month, and as the bowl of the ب. The founder's existing mark, kept exactly; the file's green is not the brand's.
- **Construction:** two circles, evenodd. Outer: radius 240 at (500, 530). Inner: radius 200 at (500, 455) — offset upward so the circles cross. The visible form is everything inside exactly one circle: a thick base (223 units), two cusps where the circles meet (width zero), and a cap at the top (35 units on a 480-unit diameter, 7%). Path: `M260 530a240 240 0 1 0 480 0a240 240 0 1 0-480 0ZM300 455a200 200 0 1 0 400 0a200 200 0 1 0-400 0Z`. Nothing is redrawn; a designer receives this construction as the whole brief for the mark.
- **Source files:** `svg/bidaya-mark.svg` (ink), `bidaya-mark-paper.svg`, `bidaya-mark-small.svg`, `bidaya-mark-watermark.svg` in the logo package (21 September).
- **Colour versions:** ink on stone, paper and white; paper on the aqua, teal and plum bands. No other colour. The four-tone version exists only as the end state of the four-functions build on the site (§6) — never a still, never the firm's logo.
- **Minimum size, pure form:** 32px on screen, 10mm in print. Below 32px, the small variant: the same construction carrying a minimum stroke of 32 units in its own colour, which rounds the cusps and keeps the cap. The package's 16 and 32 PNGs are the small variant.
- **Clear space:** one inner radius (0.388 × the mark's height) on all sides, measured from the outer circle.

### The lockups — decision 8, closed 21 September

Wordmark: Readex Pro 700, sentence case, tracking −2%. بداية: Readex Pro 600, at 0.893 × the Latin's size so the alif meets the cap height. Both converted to outlines in the files — no file depends on an installed font.

Geometry, every version: mark height = 1.75 × the wordmark's point size (2.5 × its cap height), centred on the cap height; gap mark → wordmark 0.4em; gap around the hairline 0.5em each side.

| Variant | Arrangement | When to use | Source file |
|---|---|---|---|
| **2 · Primary** | بداية · mark · Bidaya — each script reads outward from the mark | Default everywhere there is room: covers, decks, Programs, the kit | `bidaya-lockup-2-mirrored.svg`, `-paper.svg` |
| **Mark alone** | — | Always permitted; the hero, favicon, avatar, watermark, card front, report covers | `bidaya-mark.svg` |
| **3 · Header** | mark · Bidaya · hairline · بداية, one baseline | The site header only. Without the hairline this arrangement is rejected on every surface | `bidaya-lockup-3-header.svg`, `-paper.svg`, `-small.svg` |
| **1 · Stacked** | mark · Bidaya over بداية (Arabic at 0.55 × the Latin) | Proposals and their covers | `bidaya-lockup-1-stacked.svg` |
| **4 · Arabic lead** | mark · بداية over Bidaya | Reserved for Programs and Arabic-first partners. Unruled | `bidaya-lockup-4-arabic-lead.svg` |
| Descriptor | mark · Setup · Operations · Finance · Tech | Card back; document pages that name the four functions | set from the mark and Readex Pro 600 |

Header hairline: 0.04em wide, cap-height tall, `hairline` #B9B1BF on light, paper at 55% on bands. On phones the header keeps the mark and the wordmark and drops the Arabic — the mark alone is not enough for a firm nobody has heard of yet.

### Misuse rules

1. Never cropped, halved or fragmented — the mark appears whole or not at all.
2. Never rotated, never mirrored.
3. Never outlined, never a hairline ring.
4. Never a second colour inside the form outside the four-functions build.
5. Never yellow, saffron or green.
6. Never a gradient, shadow, emboss, glass or 3D.
7. Never repeated as a pattern or wallpaper.
8. Never used as an icon — bullets, checkboxes, spinners. It is the signature, not a glyph.
9. Never standing in for the B in Bidaya.
10. Never on a photograph.

Rejected on measurement, for the record: making the avatar's edge the outer circle. The cap rises above the outer circle, so any circular crop cuts it.

### Application examples

- **Web header:** lockup 3 with the hairline at mark 36px, wordmark 21px, Arabic 18px in muted, one baseline; mobile at mark 32px with the wordmark. How the hero's built mark and the header relate on scroll is deferred to Phase 8.
- **Hero:** the mark alone, built once by the flow, top-left, and it stays (§6).
- **Favicon:** the rounded aqua field with the paper mark at 62% of the field — `favicon.ico` (16/32/48) and PNGs; the small variant below 32. Founder ruling, 21 September, over the mark-alone recommendation.
- **App icon:** the same aqua field, square, at 180 and 512 (iOS and Android apply their own mask); a rounded version for other uses.
- **Social avatar:** the aqua field, circular, at 512 and 96.
- **Email signature:** mark at 32px; four lines — name, role and firm, the descriptor line. No banner, no image, no tagline. Locked.
- **Business card:** front, the mark alone centred on stone; back, the header lockup with the descriptor line. Locked. Print is light: cards and PDFs.
- **Proposals:** the stacked lockup top-left of the cover; watermark on inside pages. Templates built with the founder later.
- **Reports:** the mark alone top-left of the cover, an aqua ribbon at the foot; inside pages carry the mark and name in the header, the page number in the foot, the watermark bottom-right.
- **Decks:** title slide with the mark alone top-left and the title low; aqua section openers carry the paper mark.
- **Programs, beside a partner's mark:** Bidaya's mark in single colour at the partner's visual height, a hairline between, host first. Proposed; unruled.
- **Watermark:** the mark alone at 9% opacity, bottom-right, once per page. Never the typed name as a watermark.
- **Page titles:** under 30 characters so the tab shows them whole — *Bidaya* at home, *Where you stand — Bidaya* elsewhere; never the tagline. Risk on record: the title tag is the strongest on-page signal for search and AI citation; *Bidaya — executive management* (29) at home is the recommended exception, for the founder at Phase 8.

---

## 2. Colour

Reasoning, the full contrast table and the teal finding are in Part 1 v2. The tokens:

| Token | Hex | Usage |
|---|---|---|
| `stone` | #F4F1EC | The page |
| `paper` | #FCFBF9 | Cards, reading surfaces; never a page |
| `ink` | #241B2E | Text, the mark; the Tech tone |
| `muted` | #6A5F78 | Secondary text on light |
| `aqua` | #0B6F7A | Accent: actions, emphasis, the aqua band, the small-mark field; the Operations tone |
| `teal` | #2A8F99 | Band; the Setup tone; large text only |
| `plum` | #5A47A3 | Band; the Finance tone |
| `soft` | #DCD6CE | Hairlines, dividers, borders |
| `hairline` | #B9B1BF | The rule in the header lockup |

Semantic tokens: `text-primary` ink · `text-secondary` muted · `text-inverse` paper · `bg-page` stone · `bg-elevated` paper · `border-default` soft · `action-primary` aqua with paper text · `success` #237A55 · `warning` #8A5A06 · `error` #B33A3A (the three proposed, for the tool and form states only — not locked) · `info` plum.

Rules: stone is the page and white never is; aqua is the accent; teal and plum are bands, never text on light; no gradients anywhere; the mark is ink on light and paper on bands; teal bands carry large text only (Part 1, open question 1); semantic colours never stand alone; no new colour without a token proposal on the ledger. No dark mode — the bands are the dark (open for the founder's word).

---

## 3. Typography — decision 9, closed 20 September

| Role | Family | Weights | Licence |
|---|---|---|---|
| Display | Readex Pro | 700 | SIL Open Font License — web use unrestricted |
| Body | Readex Pro | 400 (600 for labels and emphasis) | same |
| Arabic wordmark | Readex Pro | 600 | same — one family, both scripts drawn together |
| Mono | none | — | no code or data contexts at launch; add a token when the tool's tables need one |

Chosen from three defended pairings (Bricolage Grotesque · Figtree · IBM Plex Sans Arabic; Fraunces · Figtree · Noto Naskh Arabic; Readex Pro alone) judged in the prototype. Plainness accepted on purpose: distinctiveness comes from motion, colour and shape. Upgrade path recorded, not adopted: 29LT Azer, a rounded Arabic-first family with a licence cost — a trial at Phase 8 if the founder wants it.

**Fallback stack:** `"Readex Pro", system-ui, -apple-system, "Segoe UI", sans-serif`. Self-host the variable font at Phase 8 rather than loading from Google Fonts — a malformed request silently failed an entire stylesheet during Phase 5; the site must not depend on a third-party stylesheet loading.

**Arabic:** no Arabic content is produced. بداية appears in the lockups and the name block only. An RTL page, if it ever exists, shares this family and its rhythm by design.

### Type scale — provisional, set for the prototype; Phase 8 confirms

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `display-1` | clamp(34px, 5vw, 68px) | 1.08 | 700 | Hero headline, max 15ch |
| `display-2` | clamp(28px, 3.2vw, 44px) | 1.1 | 700 | Section titles, max 20ch |
| `h1` | clamp(30px, 4vw, 48px) | 1.08 | 700 | Page titles |
| `h2` | 24–34px | 1.1 | 600 | Sub-sections |
| `h3` | 18px | 1.2 | 600 | Card titles |
| `body-lg` | 18px | 1.55 | 400 | Lead paragraphs, max 56ch |
| `body` | 16px | 1.55 | 400 | Default, max 66ch |
| `body-sm` | 14px | 1.5 | 400 | Captions, legal line |
| `label` | 13px | 1.3 | 600 | Chips, buttons at small sizes |
| `numbers` | 26px | 1.2 | 600, tabular | The published number, terms |

### Typography rules

- Sentence case everywhere — headlines, buttons, table headers. No title case; no letter-spaced small-caps labels (a template tell). There is no overline token on purpose.
- Numerals for money and time: AED 12,000; 30 days.
- Display weight only at display sizes; body never bolder than 600.
- One family on every page; a second is a ledger proposal.
- Line length 50–75 characters; the hero is capped by character count, not by width.

---

## 4. Iconography — proposed

- **Style:** outline; rounded caps and joins; single weight.
- **Stroke:** 1.75px on a 24px grid; 16 and 32 as the other sizes.
- **Source:** Phosphor (MIT). Not Lucide — it is what AI-built sites ship with and reads as such.
- **Rules:** icons sit beside labels by default; icon-only buttons carry an accessible name; decorative icons are `aria-hidden="true"`; functional icons inherit `currentColor`.
- **Naming:** `icon-[noun]-[modifier]`.
- **Status:** founder's note, "okay, could be better." Revisit when Phase 8 has real icons to place; the rule set stands, the set may change.

---

## 5. Imagery

- **Photography:** none at launch. If ever used — Programs, events — documentary, unposed, of real work, never a hero, never treated.
- **Stock photography:** banned. **AI-generated imagery:** banned.
- **The category's props, banned by §8 and ledger N:** skylines, boardrooms, handshakes, glass-walled meeting rooms, executive portraiture, rising arrows and growth charts, compass, key, puzzle, lightbulb and rocket icons, gradient-mesh heroes.
- **The visual language:** the flow — a background field of fine ink and aqua flow lines, low intensity, continuous in the hero, and the two builds (§6). Nothing else is illustrated.
- **Rules from the founder's review:** visuals never explain content — no words, calendars or diagrams inside a visual; not every section has a visual; a visual that carries no meaning is removed (the globe was); the mark is never cropped for effect.

---

## 6. Motion

- **Tokens:** `motion-fast` 120ms · `motion-standard` 200ms · `motion-reveal` 800ms · `motion-build` 1,300–1,500ms per group · `motion-easing-standard` `cubic-bezier(0.2, 0, 0, 1)` — starts, settles, stops.
- **The flow:** a background presence in the hero only, at low intensity; particles in ink with a share in aqua; trails fade to transparent so the canvas never tints the page. It continues faintly after the logo has formed.
- **The two builds — "flow that becomes":** (1) the logo, on first view, top-left: particles in the mark's colour gather into its shape; the real mark fades in as they fade out; it stays. (2) The four-functions mark, on first view: four currents in the four tones become the mark one sector at a time — Setup at the top, then Operations right, Finance at the base, Tech left; the words arrive with their sectors. Concept locked; execution still to fix (the slivers at the horns, the hard seams between colours) on the founder's word; the founder's note, "good enough for now, not final."
- **Everything else — quiet reveal:** rise 14–18px and fade, 800ms, ease-out; cards scale from .975. Once per element. No flow, nothing painted around it.
- **Rules:** particles take the colour of what they become; light particles on the coloured bands. A build changes nothing else on the page. Every build happens once and stays — never repeats, never disperses. No loops, no parallax, no scroll-jacking, no motion on every section. 60fps or it doesn't ship; canvases sized to the device; only the visible tab animates.
- **Reduced motion:** everything appears in place — no particles, no rises, no builds.
- **Deferred to Phase 8:** how the built hero mark and the header relate on scroll.

---

## 7. Voice — cross-reference

The voice lives in the rulebook (v1.5). Where it meets the visual system: sentence case is a voice rule and a type rule; the published number is set in `numbers`, never in a coloured chip; headlines never carry the tagline; the tool's read is typographic — three columns of judgment, no score, no percentage, no rising arrow. The visual identity is quiet so the specifics can be loud.

---

## 8. Sections, shapes and layout — locked 20 September

- **Section boundaries:** ribbons — cubic curves of varied profile and depth, one per boundary, never the same twice in a row; 96px tall on desktop, 56px on phones. No straight edges between sections.
- **Bands:** aqua, teal and plum carry sections; text on them is paper. Teal carries titles only (Part 1, open question 1).
- **Cards:** pill cards at radius 48 for the read and large panels; 28 for panels; 20 for small cards. Circles for terms (236px, 200px on phones). Blobs permitted, boxes not.
- **Radii:** 8 · 12 · 20 · 28 · 48 · pill.
- **Buttons:** pill; primary aqua with paper text; ghost transparent with an ink border.
- **Grid:** content width 1180px, 24px gutters (20px on phones); the hero's text column 720px.

---

## 9. Files

The logo package (21 September): `svg/` masters with outlined type; `png/mark/` 16–1024; `png/lockups/` at 2400px on stone, transparent, aqua and teal; `png/icons/` favicon.ico and PNGs on aqua, apple-touch-icon 180, icon 512, avatars 512 and 96; `motion-reference/` the four-tone end state, for the build only. The identity board (Version 23) is the visual record; the kit board (3200 × 2400 PNG, 24px ink gutters) is the one-page brief for a developer.

---

## Open questions

- [ ] **Teal and text** — title-only teal bands (recommended), the section moves to aqua, or teal darkens for bands (Part 1 §2).
- [ ] **Dark mode** — confirm none.
- [ ] **Lockup 4** — keep reserved for Programs, or retire.
- [ ] **Partner rule** — accept as proposed, or amend.
- [ ] **Icons** — the set, once Phase 8 has real icons to place.
- [ ] **Four-functions execution** — the slivers and seams, on the founder's word.
- [ ] **Header and the built mark on scroll** — Phase 8.
- [ ] **Home title tag** — *Bidaya* or *Bidaya — executive management* — Phase 8.
- [ ] **29LT Azer trial** — Phase 8, if wanted.
- [ ] **Print** — CMYK and Pantone when a print application is ordered; a printer's proof decides.

---

## Sign-off

- Founder: Talal Abdel-Hamid — colour, type, mark, lockups, shapes, motion rules, small marks, applications: ruled 20–21 September 2026.
- Design: none — no designer pass by ruling; the package holds the final files.
- Engineering (token implementability): Phase 8.

*Identity system spec v1.0. Add this to project knowledge.*
