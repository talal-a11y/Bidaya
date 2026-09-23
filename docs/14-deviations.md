# Deviations from the handoff pack — running log

Started 22 September 2026 on the founder's instruction: "Keep log of all the changes we're making / deviations from the rulebooks because I will need an MD file with all of those edits to go through in another chat later." Each line names the rule as the pack wrote it, what was done instead, and where the ruling is recorded (`docs/decisions.md` by date). Rulings that stayed inside the rules are not here.

## Name, structure, domain
- **The firm is "Bidaya Consulting"** (pack: "Bidaya"). The domain is bidaya.consulting; email addresses not yet moved — contact details unchanged until the founder says so. 2026-09-22.
- **The site's structure is three audiences** — Founders · Creatives & Pre-preneurs · Institutions — not the pack's sitemap (Where you stand · What we do · How we work · Programs · Reports and notes · About · Start). The old pages still build, out of the navigation and sitemap. 2026-09-22.
- **The home page's headline and lead are new** ("Consulting for founders, creatives and the institutions that back them." / "For founders… For creatives and pre-preneurs… For institutions…") — proposed, not from the deck. 2026-09-22.
- **The four functions are Founders' four functions**, not the firm's; they sit on /founders. "Operations" is "Ops." 2026-09-21/22.
- **Where you stand (the tool and its page) is off the site** until after launch (pack: proof asset 1, milestone 2). 2026-09-22.
- **Reports and notes is "Papers"**, out of the navigation until a paper exists. 2026-09-21.
- **Bilingual readiness dropped** — English only. 2026-09-21.
- **Start's Budget question cut**; the form is four in-page forms behind doors (Enquire for your business · Partnerships and programs · Bidaya Talent Partners · General inquiry), not the deck's one Start page. 2026-09-21/22.

## Coming (logged, not built — details owed by the founder)
- "We consult" → "We consult for"; a new "We focus on" section listing what Bidaya does (Setup & support, Executive management, Financial advisory, Programs & events, Workshops & trainings, more to come). 2026-09-22.
- One "reach us" questionnaire in place of four doors: the first questions route to one of the four forms behind it; same sideways format. 2026-09-22.

## Copy (docs/02, docs/04)
- **The founder rewrote About, What we do, Programs, the three terms and the story** in his own words (2026-09-22); the deck's versions are in git history. Titles set in sentence case.
- **"How we work" → "How Bidaya works"** — decided, not yet applied. 2026-09-22.
- **Tagline** "Executive management, from the beginning." → "from the start" → "from day one" → **"From day one."** (2026-09-23, his Vercel comment). The pack carried the thesis as "from the beginning" and kept "executive management" for the tagline alone; neither remains.
- **The Arabic line** "بداية means beginning. A business is decided at its start." → "بداية | means beginning." 2026-09-22.
- **Never-say words used on the founder's word:** "all under one roof"; "affordable"; "unlock the doors"; "the space"; "journey"; "fractional … at a fraction of the full time cost" outside the intent pages; "a young entrepreneur"; "partner for growth". Each allow-listed in `scripts/check-copy.allow.json` with the ruling as its reason.
- **Figures beyond the one number:** "50+ agencies … 10+ specialties"; "3 months to 24 months". (Pack: the only number on the site is AED 12,000.)
- **"Under one roof" replaced "and we manage them"** at the founder's instruction.
- **"What we don't do" cut from the site everywhere.**
- **Words written by Claude, marked proposed:** the summary cards' briefs (`content/summaries.json`), the audience cards (`content/audiences.json`), the forms' questions and sentences for three of the four forms (`content/forms.json`), "Learn more", "Explore", "Previous", "Next", "Back", "Check the email address", "Check the number", "Needed to send", "The form is not connected yet…", "Skip to the page", "Pages", "Menu", "Close", the read's framing (now removed).
- **Two deck lines that fail the deck's own checklist** kept as written ("custom platforms"; "the cost in AED of missing it") — now off the site with Where you stand / unchanged on the Tech page.

## Identity (docs/05, CLAUDE.md §5)
- **Type:** Geist and Geist Mono (pack: Readex Pro, provisional). Readex Pro remains only for the Arabic word in copy. 2026-09-21.
- **Shape:** hard-edged panels and square buttons (pack: "rounded everywhere… boxes not"). 2026-09-21.
- **Colours off the nine tokens:** #237C85 (deeper teal, small paper text and the Start block), #0A5C66 (Ops / Institutions), #7462B8 (General inquiry). Reason: contrast, and the founder's "Setup and Ops are far too similar". The token teal is used where only titles sit on it.
- **The construction mark** (two stroked circles, founder-supplied) used as a drawing, scaled past the panel, and in the footer — the pack allowed only the filled mark, never outlined. 2026-09-21.
- **Header lockup at every width** (pack: mark and Bidaya only on phones). 2026-09-21.
- **Motion concept:** docs/05 §6's two builds (the mark from particles; the four-tone mark) are not on the site; the founder rejected the first. The site's motion is typed text, panels sliding in once, arcs drawing in, cards opening on hover, panels unfolding, sideways strips. 2026-09-21.
- **Two-letter deviation from "no gradients / no dark mode":** none.

## Stack (CLAUDE.md §6)
- `playwright` as a dev dependency (screenshots, videos, the phone audit). Lighthouse via `npx`.
- `gsap` and `lenis` installed; `three` not yet.

## Process (CLAUDE.md §10)
- Skills used from the installed plugin, not `.claude/skills/` (which the pack did not ship).
- Rulings logged in `docs/decisions.md` per session as the pack asks; this file is the founder's requested digest of the deviations only.
