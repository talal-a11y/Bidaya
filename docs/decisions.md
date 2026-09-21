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
