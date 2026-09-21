# Decisions made in this repository

The repository's half of the record. Every ruling the founder makes in a Claude Code session is appended here the same session — dated, in his words where he gave them, with the consequence. The founder mirrors entries to the project's amendment ledger at round two. Statuses as the ledger uses them: **DECIDED**, **ASSUMED — founder to confirm**, **PROPOSED — awaiting the founder**.

Format:

```
YYYY-MM-DD — Subject. STATUS.
What was ruled, in the founder's words where possible. Consequence for the build. Files touched.
```

---

2026-09-21 — Route. DECIDED.
"Yes everything through code so 2." Next.js on Vercel, GitHub repository `talal-a11y/Bidaya`, Claude Code as the workbench, no other platform. (Ledger AZ.)

2026-09-21 — No creative developer. DECIDED, risk on record.
"I don't have a freelancer and cannot afford to; this will need to be done only with Claude and different connectors." The motion layer is built by Claude Code in code — GSAP, Lenis, three/@react-three/fiber, SVG and canvas. Rive is dropped from the stack; the two builds move to code. The risk stands: the reference sites' polish came from studios; expect more iterations and a lower ceiling on hand-crafted WebGL, and ship each motion piece only on the founder's yes. (Ledger BA.)

2026-09-21 — Skills for the build. DECIDED (founder may overrule).
`frontend-design-code` leads design; `ux-designer` for the tool, forms, accessibility and RTL; `web-design-guidelines` and `accessibility-scan` review before each merge; `brand-audit` at pre-launch. `design-taste-frontend` not used as the lead. Copies bundled in `.claude/skills/`. (Ledger AZ.)

2026-09-21 — Tool content authoring. ASSUMED — founder to confirm.
The voice-note method does not happen in round one. Content blocks and the obligations register are drafted by Claude from the spec and public sources, every row sourced and dated, marked draft, confirmed by the founder in a review session, reviewed by the licensed tax consultancy before launch. (Ledger BC.)

2026-09-21 — Domain and hosting. DECIDED for now; one item OPEN.
bidayahub.ae stays on its current cPanel hosting with the old site live until launch day; nothing in DNS changes before milestone 9. OPEN: the domain carries the word "hub", which the site is never allowed to say; whether to launch on a cleaner .ae domain is the founder's call before milestone 9. (Ledger BB.)

2026-09-21 — Route slugs. ASSUMED — founder to confirm.
From the copy deck's llms.txt: `/where-you-stand` `/what-we-do` `/how-we-work` `/programs` `/reports-and-notes` `/about` `/start` `/fractional-coo-uae` `/fractional-cfo-uae` `/tech-and-projects` `/feasibility-and-advisory`.

2026-09-21 — Milestone 1, the skeleton. Session record.
Built on branch `build/01-skeleton`: Next.js 16 (App Router, TypeScript, plain CSS, no Tailwind), the twelve pages from the copy deck, header with the hairline lockup (mark and Bidaya only on phones — the same paths as the master file, hairline and بداية dropped), footer with the watermark mark, navigation, type scale, titles, descriptions, schema (Organization, FAQPage, Service; Article template ready), `llms.txt`, sitemap, robots. Readex Pro self-hosted as one variable file per script. `content/` laid out as CLAUDE.md §6. `scripts/check-copy.mjs` runs on every commit that touches content and in CI. Everything below was found while building; nothing was changed silently.

2026-09-21 — The bundled skills. NOTED.
`.claude/skills/` is not in the repository, although CLAUDE.md §10 and the build guide say it is. Equivalent skills are installed on the founder's machine as a plugin (`frontend-design-code`, `ux-designer`, `web-design-guidelines`, `accessibility-scan`, `brand-audit`); those are used and named inline. If the founder wants copies inside the repository, that is a separate step.

2026-09-21 — Tokens path. DECIDED by rank.
The build guide says `/src/tokens.css`; CLAUDE.md §6 says `src/styles/tokens.css`. CLAUDE.md outranks: `src/styles/tokens.css`.

2026-09-21 — "only" in the checklist. PROPOSED — awaiting the founder.
Checklist item 11 says search "only", zero hits. The approved deck uses plain "only" throughout ("no email required" is not the issue; "Only the files your read called for" is). The never-say list's actual item is the exclusivity claim: "the only", "one of the only", "the first". `check-copy.mjs` tests the claim, not the word. Founder to confirm.

2026-09-21 — Two deck lines that fail the deck's own checklist. FLAGGED — awaiting the founder.
(a) Tech and one-time projects, description: "…from websites to custom platforms." Checklist 11 bans "platform"; the deck's own §14 says "custom platform" was rewritten out, and this one remains. (b) Where you stand, "What the read contains": "…the cost in AED of missing it…" sits in body copy, outside the FAQ and the worked example where checklist 9 allows AED. Both shipped verbatim, because the deck is the copy; both listed in `scripts/check-copy.allow.json` with this entry as the reason. The founder strikes, rewrites or keeps each.

2026-09-21 — "Get your read" before the tool exists. FLAGGED.
The Where you stand page's two "Get your read" buttons point at the page itself until milestone 2 builds the intake. No copy changed. Site-wide "See where you stand" points at /where-you-stand.

2026-09-21 — Words not in the deck. PROPOSED — awaiting the founder.
Written for the build, each passing the docs/04 checklist; none is a heading or a button label from a page:
- Skip link: "Skip to the page". Navigation's accessible name: "Pages". Phone menu button: "Menu" / "Close".
- Start, under the disabled Send button until milestone 6 wires it: "The form is not connected yet. It sends nothing until it is."
- Start, the optional field marker: "(optional)" — the deck's own word.
- Where you stand's intake: the twelve questions' option labels in `content/tool/questions.json` follow the spec's short forms ("Not registered yet", "Mainland", "Free zone", "More than one"…) and the one clarifying question for the contradiction (trading a year or more, revenue none). Marked draft in the file.
All in `content/global.md` or `content/tool/questions.json`, editable without code.

2026-09-21 — The site's address. OPEN.
Canonical URLs and the sitemap use `NEXT_PUBLIC_SITE_URL` when set, otherwise Vercel's own URL. Set it in Vercel once the domain question (ledger BB) is decided. Until then the preview link is the address.

2026-09-21 — Dev-only tooling. NOTED.
`playwright` added as a development dependency for the screenshot step CLAUDE.md §10 requires; it ships nothing to the site. Lighthouse is run through `npx`, not installed.

2026-09-21 — Shape and layout choices, provisional (CLAUDE.md §5). NOTED.
The three published terms as paper circles (236px, 200px on phones); bands as rounded panels inside the content column with paper text; the four-function rows as plain text with a hairline on the leading edge, no icons; the worked example as a paper card; About's "At a glance" list set small in muted ink. Any of it may be replaced by the motion work; each replacement is logged here.

2026-09-21 — Navigation order. DECIDED.
"Where you stand shouldn't be first. It should be What we do, How we work, Where you stand, Programs, and then Reports." Consequence: header and footer now run What we do · How we work · Where you stand · Programs · Reports and notes · About · Start. Overrides the deck §0 order. The homepage's section order is unchanged (Where you stand is still the first section after the hero) — the founder ruled on the navigation, not the page. `content/global.md`.

2026-09-21 — The name "Reports and notes". OPEN — founder to name it.
"Reports should have a different name like publishings or something else that makes it sound less professional but still explaining in one word that these are our publishings." The page is built and stays in the navigation until named; the founder expects to hide it until there is groundwork. Candidate names go to the founder; the nav label, page title, h1, route and llms.txt change together when he rules.

2026-09-21 — The publishing page is named "Papers". DECIDED.
"Papers is a good one." Consequence: nav label Papers; title "Papers — Bidaya"; h1 "Papers"; route `/papers` (entries at `/papers/[slug]`); llms.txt updated. The two tracks inside it keep their names, Reports and Notes, and their folders `content/reports/` and `content/notes/`. Overrides deck §6's assumed name (ledger AU). Still open: whether it is hidden from the navigation until the first paper exists.

2026-09-21 — The Budget question on Start is cut. DECIDED.
"Asking for budget might not be the best one… monthly at the floor but not mentioning is pointless." The founder chose option 1: cut the question. Consequence: Start asks shape, stage, people, timing, the free line and contact details; the price stays on How we work. Overrides deck §8's assumed budget wording (ledger AU) and tool spec 5.6's "budget, timeline and shape" — qualification on Start is now shape and timeline. `content/pages/start.md`.

2026-09-21 — Default branch. NOTED.
GitHub's default branch is `build/01-skeleton` (main is empty); Vercel imports from it. When the founder approves the preview, this commit becomes `main` and the default switches back.

2026-09-21 — Milestone 1 approved on the preview. DECIDED, with the scope stated.
"I will say yes to the words, titles, phrasing, and where everything will be placed and titles. Colors are also acceptable, semi locked, but still open to explore others. Header, footer, fonts, etc. are not locked, these CAN be changed and will be assumed open for now. Works on the phone, but looks too crowded so not finalizing for the phone. Animations, font type, font color, font size may need to be changed."
Consequence: the copy, the page titles, the navigation order and the placement of sections are approved. Colours: acceptable, semi-locked, open to exploration (softens ledger AX's lock — a change is still a token proposal here, then the founder's word). Header, footer, type family, type sizes and colours of type: open. The phone layout is not approved — it is too crowded and is reworked with the motion. `build/01-skeleton` becomes `main`.

2026-09-21 — Motion piece 1: the hero. BUILT on `build/04-hero` — awaiting the founder's yes.
The predictable version named first (text fades up, a blob drifts); the built version: the world canvas (a flow field of fine ink and aqua lines, 2D canvas, trails fading to transparent, paused when the tab is hidden, nothing under reduced motion) behind the whole page; the mark formed once from ink particles arriving out of the flow and settling into the master SVG, which is what stays; the tagline and headline written in word by word as it lands. Measured 60fps at 390px and 1440px in headless Chromium; the real test is the founder's phone. The hero takes the first screen; phone sections were given more air in answer to "too crowded". `gsap` installed (CLAUDE.md §6); `lenis` and `three` not yet — not needed for this piece.

2026-09-21 — The header lockup on phones. DECIDED.
"The logo there is only in English not both, why? Didn't ask for that." Consequence: the full header lockup — mark · Bidaya · hairline · بداية — at every width. Overrides CLAUDE.md §5 and deck §0 ("on phones the mark and Bidaya only"). The derived phone file is removed. The header is now sticky, so the menu cannot scroll away.

2026-09-21 — Motion and visual direction: exploration opened. DECIDED.
"I want to explore different ones than what you see in the files… the point of all these connectors is to explore different ways to create a unique page with animations and a lot more motion than previously expected. We need to explore how to make this the most visually appealing and unique experience, while remaining professional and a B2B service website. Visuals should be the priority… before locking in the rest." Consequence: docs/05 §6's two builds are no longer the only concept on record; they are one candidate. Motion piece 1 (the hero mark from the flow) is not approved: "I only see the logo one, and I don't like it so far." Directions are explored as whole home-page prototypes, each on its own branch and preview, before anything else is locked. §8 and the copy still bind; colours semi-locked; type, layout, header, footer open.

2026-09-21 — Milestones reordered. PROPOSED — awaiting the founder.
See the proposal put to the founder in this session; recorded here once he rules.

2026-09-21 — Milestones reordered. DECIDED.
"Yes go ahead." The order now: 1 skeleton (done) · 2 reference study of the six sites · 3 three directions as complete home pages, each on its own preview · 4 lock the chosen direction (header, footer, type, layout, motion language, phone and laptop) · 5 apply it across all pages with scroll chapters and page transitions · 6 Where you stand · 7 tax review of the register · 8 Papers and the Start form wired · 9 pre-launch audit · 10 launch. Supersedes docs/00 Part 4.

2026-09-21 — Type is open. DECIDED.
"Even fonts will be re-explored." Readex Pro is a candidate, not the choice; each direction in milestone 3 may propose its own family, self-hosted, never a third-party stylesheet. Overrides CLAUDE.md §5's provisional type.

2026-09-21 — English only. DECIDED.
"No need for bilingual readiness anymore — site will be in English only." The bilingual milestone is dropped. بداية stays in the lockups and in the two lines of copy that name it. Logical CSS properties stay because they cost nothing; RTL is not tested or promised.

2026-09-21 — The directions for milestone 3. DECIDED.
"Replace the stack with whatever weevolveit.com is on… Then also add one more direction — completely up to you to decide and merge: taking different elements from different sites and putting it all into one in a way that you believe works for Bidaya." Four directions: A the field (Lando's light world, toned down) · B the grid (Aspen's discipline) · C the method (WeEvolveIT's scroll-through-the-process, light) · D the synthesis (Claude's call). The founder's site-by-site notes are in docs/12. Storyboards in docs/13.

2026-09-21 — Build order and licence to break rules. DECIDED.
"Keep D till the end — I will give notes on what I liked and didn't like in the rest, which you'll take note of, then develop D. Start with B, C, A, D. It's fine if you have to break some of the branding rules on anything — colour, sizes, shapes, fonts, whatever you need to do." Consequence: the directions may break docs/05 (shape, type, mark rules) where the direction needs it; each break is named in the direction's notes here. §8 (the blacklist) and the copy still bind. Order: B → C → A → D.

2026-09-21 — The construction mark. DECIDED.
"Use the gridlines logo, I feel that would work so well here. You can change the colours, make the lines thinner if needed." The founder supplied `bidaya-mark-construction.svg` (the two circles as strokes, no fill); saved at `public/brand/svg/bidaya-mark-construction.svg`. Direction B uses it as its drawing.

2026-09-21 — Direction B, the grid. BUILT on `build/03-direction-b` — awaiting the founder's notes.
What it is: Aspen's discipline in Bidaya's colours. Hard-edged panels filling the viewport; the name at screen scale beside the construction mark's arcs drawing themselves in teal; the headline flipped into an ink panel; the four functions as four full-height colour panels with the words set vertically; A few steps ahead alone on teal; the three terms as three panels with the number in mono; the story as a broadsheet; Programs on aqua. Header: a bar of panels with the time in the UAE. Footer: the bar's mirror, the construction mark in it. Lenis smooth scroll; panels slide in from their side once; nothing fades, so text is always readable.
Rules broken on the founder's licence, for this direction only: shape — square panels and square buttons (docs/05 "boxes not"); type — Geist and Geist Mono, self-hosted, in place of Readex Pro (Arabic still falls back to Readex Pro); the mark — the construction (stroke) version used as a drawing, scaled past the panel so only arcs show, and in the footer in place of the watermark; colour — small text on teal sits on a paper strip because ink and paper on teal both fail contrast at small sizes. One word added: the header clock's label is "UAE", the deck's own word. Measured: Lighthouse mobile 98 / 100 / 100 / 92; 60fps at both widths.
