# Bidaya — Phase 8 Build Guide: everything through code

**Phase 8 opening document, v1.1 — 21 September 2026.** The founder's ruling: route 2 — Next.js on Vercel, fully custom, everything through code (ledger AZ). This is the step-by-step for doing that: accounts, the repository, how Claude Code is used, the order the site is built in, and how each step is checked. Written for a founder who does not write code and runs his work through Claude. **v1.1 amends v1.0 on the founder's word the same day:** there is no creative developer and no budget for one (ledger BA) — Part 3 is rewritten; the accounts exist (ledger BB) — Part 1 records them; Rive drops from the stack. The handoff pack (`bidaya-claude-code-pack.zip`) carries this guide into the repository with `CLAUDE.md`, `FIRST-SESSION.md` and `README-FIRST.md`, which are the operational steps.

**The boundary, stated as the roadmap asks:** Phase 8 leaves this project. The site is built in a repository, through the Claude desktop app's Code tab, with a live preview for every change. This project stays the record — the ledger, the copy deck, the identity system — and every ruling still lands here.

**What is fixed going in (ledger AX):** the colour tokens and the mark with its lockups. Everything else — type, ribbons, no-photography, the motion ceiling, the prototype's layouts — is provisional and can be replaced by the build. §8 binds regardless of tool. The copy deck is the copy.

---

## 0. The shape of it, in one paragraph

A Next.js site in a GitHub repository, deployed by Vercel every time a change is saved, with a preview link you approve from your phone before anything goes live. The content — every page's copy, the reports and notes, the tool's questions, blocks and obligations register — lives as files in the repository, so you or the first hire edit them through Claude, never through a developer. Claude Code is the workbench and the whole crew: it scaffolds the site, builds the pages from the copy deck and the tool from its spec, writes the motion layer — the world canvas, the logo build, the four functions, the scroll chapters, the page transitions — and checks its own work in a browser. The stack is the code half of what your six reference sites share: GSAP with ScrollTrigger, Lenis, hand-written WebGL through three.js. Rive is out — it is a visual editor and there is no one to sit at it.

---

## Part 1 — Accounts and tools (as of 21 September)

| # | Item | State | What remains |
|---|---|---|---|
| 1 | **GitHub** | Done — `github.com/talal-a11y/Bidaya`, under the personal account. Kept as is; the earlier `bidaya/bidaya-site` name is superseded. | Two-factor on, if not already. |
| 2 | **Vercel** | Done — Pro trial. | Import the repository after the first session pushes (README-FIRST, step 5). Pro at USD 20 a month when the trial ends; the free plan's terms exclude commercial sites. |
| 3 | **Domain** | `bidayahub.ae`, on cPanel, old site live. | Change nothing until milestone 9. Decide before then whether to launch on a cleaner .ae (ledger BB — the word "hub"). Check where email runs before the hosting is ever cancelled. |
| 4 | **Resend** | Done. | Create the API key and enter it in Vercel's environment variables yourself, never in a chat (README-FIRST, step 6). |
| 5 | **Rive** | Not needed — dropped (ledger BA). | — |
| 6 | **Node.js LTS** | Not yet. | nodejs.org → the green LTS button → run the installer with defaults (README-FIRST, step 1). |
| 7 | **GitHub Desktop** | New item. | Signs you into GitHub once and clones the repository to your computer so Claude Code never needs your password (README-FIRST, step 2). |
| 8 | **The Claude desktop app** | Have it. | The Code tab, opened on the cloned folder (README-FIRST, step 4). |

Nothing here touches your existing site. The old site stays up until Phase 9's switch-over day.

---

## Part 2 — The repository (the first Claude Code session, I drive)

Open the Code tab on the cloned `Bidaya` folder with the handoff pack inside it and paste the message in `FIRST-SESSION.md`. In that session Claude Code:

1. **Scaffolds** Next.js with the App Router and TypeScript. Plain CSS with custom properties, not a utility framework — the tokens are the design system, and the motion layer must not fight a framework's defaults.
2. **Installs the motion stack:** `gsap` (free, every plugin), `lenis`, and `three` with `@react-three/fiber` for the world canvas. Nothing else until it is needed and logged.
3. **Lays the structure:**
   - `/content/pages/` — one file per page, the copy deck pasted in as it stands, headings and buttons as data.
   - `/content/reports/` and `/content/notes/` — empty, with the format defined: title, date, sources.
   - `/content/tool/` — `questions.json`, `blocks.json`, `register.json`, `rules.json` from the tool spec. The register carries a source and a verified date on every row.
   - `/public/brand/` — the logo package, as delivered.
   - `/src/tokens.css` — the nine colours, the radii, the type scale.
   - `CLAUDE.md` — the rules the machine reads before every session: §8 in full, the never-say list, the standing constraints, the tokens, the mark's construction, "the copy deck is the copy," "never invent a regulatory fact," the performance budget, reduced motion, the ask-first list. Written; in the pack.
   - `docs/decisions.md` — every ruling made in a Code session, dated (ledger R17). Started; in the pack.
   - `scripts/check-copy.mjs` — the rulebook's checklist as a script, run before every commit that touches content.
4. **Builds every page** from the copy deck with the header, footer, navigation and the typographic scale — no motion yet. Plain, correct, responsive, semantic HTML with the schema and the `llms.txt`.
5. **Pushes to GitHub and deploys to Vercel.** You receive a preview link the same day. It will look unfinished. That is the point: from now on every change is a diff on a working site.

**Skills in the Code tab, ruled here:** the roadmap asks for one of `design-taste-frontend` or `frontend-design`. **Choose `frontend-design-code`** — its brief is written for a client who "has already rejected proposals that felt templated," which is you; `design-taste-frontend` is a pre-flight against slop, useful as a review, not as the design lead. Plus `ux-designer` for forms, the tool's interface, accessibility and RTL. `web-design-guidelines` runs as a review before each merge.

**Connections in Claude Code:** GitHub (through git, with GitHub Desktop holding the sign-in), Vercel (its MCP for deployments and logs, or the dashboard), Playwright for screenshots and 60fps checks, Lighthouse for the budget. No Rive. The five skills are bundled in the repository's `.claude/skills/`.

---

## Part 3 — The motion layer, without a developer

v1.0 said no platform makes the motion, a person does, and priced the person. The founder's ruling the same day: "I don't have a freelancer and cannot afford to; this will need to be done only with Claude and different connectors." So the person is Claude Code, and the method changes to fit.

**What Claude Code builds, and how:** the world canvas (a flow field of fine ink and aqua lines, as a shader in three.js, with a 2D-canvas fallback if a mid-range phone cannot hold 60fps); the logo build and the four-functions build in code — SVG paths animated with GSAP, particles on a canvas, the mark's own path and the four-tone end state as the targets; the scroll chapters on the homepage with GSAP and ScrollTrigger; page transitions; text reveals with SplitText. Everything behind `prefers-reduced-motion`, everything measured.

**The method that replaces the studio:** one piece per session. Claude Code names the predictable version first, proposes the specific one, builds it on a branch, screenshots it at phone and desktop widths, measures frame rate and Lighthouse, and puts the preview on your phone. You say yes or what's wrong. It iterates on the same branch. Nothing merges on function alone. Milestone 4 is therefore several sessions, not one, and it runs in parallel with the tool.

**The risk, on the record (ledger BA):** the six reference sites were built by studios. With Claude alone, the ceiling on hand-crafted WebGL is lower and the iteration count is higher. If a piece cannot reach the bar after genuine attempts, you are told and you decide — a signature that is merely adequate is cut, not shipped. What this route buys: zero cost, every piece in your repository, and no one to chase.

---

## Part 4 — The order of build, with what "done" means

| # | Milestone | Built by | Done when |
|---|---|---|---|
| 1 | Skeleton — every page from the copy deck, navigation, header and footer, fonts self-hosted, tokens, schema, llms.txt, deployed | Claude Code | Preview link works on phone and desktop; every page passes the rulebook checklist as rendered; Lighthouse mobile ≥ 90 on performance, accessibility and SEO |
| 2 | *Where you stand* — the twelve questions, the rules, the four-section read, the honest line, "Send me this and the files" through Resend, routing to Start with the intake attached, nothing stored without consent | Claude Code, from the spec | Every acceptance test in tool spec §5 passes; the DIY block fires on the pre-capital intake; the register's every row shows a source and a verified date |
| 3 | The tax review of the register | The licensed tax consultancy on the bench (internal, never named) | Every row signed off; "verification due" appears on nothing |
| 4 | The motion layer — world canvas, logo build, four functions, chapters, transitions, text reveals; one piece per session, each on your yes | Claude Code | 60fps on a mid-range phone; reduced motion shows everything in place; the builds happen once and stay; nothing repeats or disperses; Lighthouse performance stays ≥ 90 |
| 5 | Reports and notes — the collection, the list page, the article template, dates and sources | Claude Code | The first note publishes from a file you edited yourself, without a developer |
| 6 | Start — the form, the routing, the reply commitment, the consent | Claude Code | A test enquiry reaches you with the shape, stage and budget answer attached |
| 7 | Bilingual readiness — RTL layout switch tested with placeholder Arabic on one page, then removed | Claude Code | Nothing breaks when direction flips; the header mirrors correctly |
| 8 | Pre-launch audit — Phase 9's `web-design-guidelines`, `accessibility-scan`, `brand-audit` on the built site; the switch-over list | Claude Code, with you | The audit's immediate items closed; the old identity's touchpoints replaced on one day |
| 9 | Launch — domain pointed at Vercel; old site retired | You, with Claude Code | The site is live at the domain; the old one redirects |

Milestones 2 and 4 run in parallel: the tool does not wait for the motion, and the motion does not wait for the tool.

---

## Part 5 — How a working session goes

1. You open the Code tab on the repository and say what the session is for — one milestone, or one fix.
2. Claude Code makes a branch, does the work, screenshots it in the browser, and pushes. Vercel posts a preview link.
3. You open the link on your phone. You say yes, or what's wrong, in plain words — "the hero is too slow," "this section is boring," "the read feels like a form."
4. Claude Code fixes on the same branch until you say yes, then merges. Main is always the last thing you approved.
5. Rulings that change the record — a rule, a token, a piece of copy — come back to this project and land on the ledger. The repository's `CLAUDE.md` is updated to match, so the two never drift.

Milestone 4's sessions run the same way, one motion piece at a time, with the predictable version named before the proposed one.

---

## Part 6 — Running costs

| Item | Cost |
|---|---|
| Vercel Pro | USD 20 a month |
| Domain | about USD 10–15 a year |
| Resend | free to 3,000 emails a month; USD 20 beyond |
| GSAP, Lenis, Three.js | free |
| GitHub, GitHub Desktop, Node | free |
| Creative developer | none (ledger BA) |

No platform subscription, no CMS licence, no per-seat fees, no developer. The site's running cost is under USD 25 a month; the build's cost is your time on the phone saying yes.

---

## Part 7 — What exists now, and what comes next

**Delivered with this version:** the handoff pack — `CLAUDE.md`, `FIRST-SESSION.md`, `README-FIRST.md`, `docs/` (the record in rank order, with `decisions.md` started), `brand/`, `tokens/tokens.css`, `.claude/skills/`. The founder's seven setup steps are in README-FIRST; the first session's message is in FIRST-SESSION.

**Next, in order:** (1) the founder runs the setup steps and the first session — milestone 1; (2) Vercel import; (3) milestone 2 opens with the tool's clarifying-question set (ledger AC) put to the founder in that session; milestones 2 and 4 then run in parallel; (4) the register goes to the tax review (milestone 3) before the Phase 9 audit; (5) the domain question (ledger BB) is decided before milestone 9.

**Phase 8 kickoff reminders the roadmap owed:** the skill pair — ruled as `frontend-design-code` plus `ux-designer` (ledger AZ), yours to overrule; the clarifying-question set — raised at milestone 2's first session; save the next real client proposal and email for the voice extraction at round two.

*Phase 8 build guide v1.1. Add this to project knowledge.*
