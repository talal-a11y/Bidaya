# Bidaya — Where you stand: Product Spec

**Decision 4 deliverable, v1.3** — name chosen, incentive layer added, open questions answered; vocabulary per ledger AH (the executive layer in copy; tech). Produced with `product-management:write-spec` against Draft 2 §5–6, ledger Y (direction C), the founder's ruling (ungated), the "what I check" list, the six failure states, the voice rulebook and the naming rules. Design and build are Phase 8; this document is what Phase 8 builds.

**The product is named *Where you stand* (§10). *The read* is what it returns.**

> **Repository note (Phase 8):** §8's content-authoring answer (the voice-note method) does not happen in round one — ledger BC. The 40–60 content blocks and the obligations register are drafted from public sources, every row with a source and a verified date, marked *draft — founder to confirm*, and reviewed by the licensed tax consultancy before launch. Nothing regulatory is generated at runtime; everything is authored data in `/content/tool/`.

---

## 1. Problem statement

A founder or owner carrying a business alone cannot tell, without paying someone, which parts of their company are structurally exposed, what is legally due and when, and what they could fix themselves versus what needs an executive layer. Every tool the market offers them returns a score, a "which executive do you need," or a cost comparison — behind an email gate — and none of it is usable without a sales call. For Bidaya, the cost of not solving this is larger than a missed lead: with credentials withdrawn, no client nameable and no founder visible, the tool is the **only demonstrated proof of judgment on the site at launch** (proof asset 1) and the discovery step for most engagements (ledger A, C). If it is a form in a costume, the proof strategy fails at its top.

## 2. Goals

**User goals**
1. **A visitor gets a read on their own business they could act on tonight**, whether or not they ever contact Bidaya — measured by a one-tap "did this help" at ≥70% positive.
2. **The visitor knows what is due, when, and what missing it costs** — the obligations section returns at least one dated item with an AED penalty for every trading business.
3. **The visitor learns what they can do themselves, with the method** — every "yours to do" item carries steps, not a referral.

**Business goals**
4. **Calls that come through the tool are better qualified than calls that don't** — ≥50% of tool-originated calls reach proposal, against the site-wide target of ~6 calls from 50 enquiries.
5. **The tool's public page is cited by AI assistants for UAE small-business structure and obligation queries** within six months of launch — the GEO proof that the judgment is real (qualitative; tracked monthly).

## 3. Non-goals

- **No score, percentage, grade, tier or "readiness" — anywhere.** The predictable tool is blacklisted twice by §8 (rising-arrow, numbered-ladder) and disproves the judgment the tool exists to show.
- **No "which executive do you need."** Bidaya sells the executive layer, not seats (lock §14).
- **No cost calculator, no salary comparison.** The category's other default; and the salary math lives on intent pages with a named benchmark, not in a widget.
- **No email gate on the read.** Founder ruling. Proof held hostage is not proof; AI assistants don't fill in forms.
- **No Programs path.** The tool serves the executive-layer buyer (Rania, Khalid). Noor never sees it; institutions are reached by relationship (ledger O).
- **No accounts, logins, saved sessions or dashboards.** One visit, one read. Persistence is a P2 consideration, not a v1 feature.
- **No free-text AI narrative in v1.** Output is assembled from authored content blocks by deterministic rules. Regulatory content is never generated. (v2 may add narrative assist over the same rule outputs — §7.)
- **No Arabic output in v1.** Structure is bilingual-ready (§9); Arabic content follows when the institutional audience becomes a priority.

## 4. User stories

**Rania — founder, seed-funded, Dubai, monthly path**
- As an owner who has never seen a management report for my own company, I want to know which parts of my business have no one holding them, so that I can decide what to hire for and what to hand off.
- As someone who is careful with time, I want the read on screen without giving my email first, so that I can judge whether this firm knows what it's talking about before I talk to it.
- As someone who might engage, I want the call booking to already know what I told the tool, so that I don't repeat myself in the first ten minutes.

**Khalid — owner, twelve-year-old contracting business, Sharjah, one-time path**
- As an owner who resents being treated as a startup, I want the questions and the output to read as if written for an established business, so that I trust the firm understands mine.
- As someone who doesn't know what he needs, I want to be told which things are urgent because they carry a fine, so that I fix the expensive ones first.
- As someone who would rather do it himself where he can, I want the "yours to do" items to include how, so that the tool is worth my ten minutes even if I never call.

**The pre-capital founder — not a target, but a visitor**
- As someone with an idea and no company yet, I want to be told plainly that I don't need an executive layer yet and what to do instead, so that I leave with something useful rather than a pitch.

**Edge cases**
- As a visitor who abandons at question six, I want nothing stored and no email sent, so that trying the tool costs me nothing.
- As a visitor whose answers are contradictory (trading three years, revenue "none"), I want the tool to ask one clarifying question rather than produce a wrong read.
- As a visitor in a free zone with rules the register doesn't yet cover, I want the register to say "not covered for your zone yet" rather than guess.

## 5. Requirements

### P0 — must ship

**5.1 Intake: twelve questions, one screen or stepped, ≤ 4 minutes.**
Each question is justified by what it changes in the read; the qualification fields (budget, timeline, shape) are **not** asked here — they belong to the routing step (5.6), after the read.

| # | Question | Answer type | What it changes |
|---|---|---|---|
| 1 | Where the company stands | not registered yet / mainland / free zone (which) / more than one | Register applicability; Setup column |
| 2 | Stage | idea / setting up / trading under 1 year / 1–3 years / 3+ years | Whether an executive layer is warranted; tone of the read |
| 3 | Revenue, last 12 months | none / under AED 375K / 375K–1M / 1–5M / 5–20M / 20M+ | VAT and corporate-tax rules; scale of finance need |
| 4 | People, including you | 1 / 2–5 / 6–15 / 16–50 / 50+ | Payroll and labour obligations; Operations column |
| 5 | Who holds the finance today | you / a bookkeeper / an accounting firm / an in-house finance person / no one | Finance column |
| 6 | Monthly figures you trust — profit, cash | every month / sometimes / no | Failure state 5 |
| 7 | Where records and procedures live | your phone and inbox / a shared drive / a person / nowhere yet | Operations column |
| 8 | How new clients arrive | referrals / outbound / online / partners / not yet | Pipeline; whether the Tech column includes web presence |
| 9 | What your own week goes to | multi-select: finance and admin / people and hiring / compliance / sales / delivery / product | The load — opening line of the read; Rule 3 framing |
| 10 | What you're comfortable doing yourselves | multi-select: bookkeeping / setting up tools / hiring / contracts and paperwork / none of these | Which items land in "yours to do" versus "needs building" |
| 11 | Sector | contracting and fit-out / F&B / healthcare / retail and e-commerce / software / professional services / creative studio / real estate / logistics / other | Activity-specific obligations in section 2 (healthcare, F&B, education carry extra approvals); the worked example; P1 sector packs |
| 12 | The one thing you'd fix first, in your words | free text, optional, 200 chars | Quoted back at the top of the read; never scored |

*Acceptance:* Given a visitor answers 1–11, when they submit, then the read renders without an email, a login or a payment. Given a visitor stops before submitting, when they leave, then nothing is stored. Given answers 2 and 3 conflict (trading 3+ years, revenue none), when they submit, then one clarifying question is shown before the read.

**5.2 The read, section 1 — Where you stand.**
The firm's own judgment structure (the ESK proposal's table), for the visitor's business: four rows in the canonical order — **Setup, Operations, Finance, Tech** — and three columns — **covered / needs building / yours to do**. Each cell is an authored content block selected by rule. "Yours to do" blocks carry a method: two to four numbered steps and what "done" looks like. No scoring, no colour-coding by severity, no icons.

*Acceptance:* Given any complete intake, when the read renders, then all four rows are present and no cell is empty (an explicit "nothing needed here yet" is a valid block). Given answer 10 includes "bookkeeping," when the Finance row renders, then bookkeeping-related items appear under "yours to do" with a method, not under "needs building."

**5.3 The read, section 2 — What is due, and what missing it costs.**
The obligations register: a table of dated obligations that apply to this business, each with the trigger, the next date (absolute where derivable, relative otherwise — "within 3 months of licence issue"), the penalty in AED, the source, and the date the rule was last verified. Rules are data, not code: a maintained table with an owner and a review cadence (5.7). Rows are keyed by jurisdiction, revenue band, headcount and sector (question 11) where an activity carries its own approvals. Where the visitor's zone or activity isn't covered, the row says so.

*Acceptance:* Given a trading company with revenue above AED 375K, when section 2 renders, then a VAT row appears with threshold, filing cadence, penalty, source and verified date. Given a company with employees, then WPS and labour rows appear. Given a free zone the table doesn't cover, then a "not covered yet" row appears and no rule is invented. Given any row, then its "last verified" date is no older than the review cadence in 5.7, or the row shows "verification due."

**5.4 The read, section 3 — What to do first.**
Three items, ordered by cost of delay: obligations with penalties first, then visibility (failure state 5), then structure. Drawn from sections 1 and 2; no new content.

**5.5 The read, section 4 — The honest line.**
Exactly one of three closing blocks, selected by rule; never a score:
- **"You don't need an executive layer yet."** Stage ≤ setting up, or revenue none with headcount 1: three things to do yourselves, with method, and when it changes. The warmest copy on the site.
- **"One defined piece of work would cover this."** Needs-building items concentrated in one row, or the visitor is comfortable holding the rest: the project path, and what a quote covers.
- **"This is what an executive layer takes off your desk."** Needs-building across three or more rows, or answer 9 shows the owner's week in finance, admin and compliance: the monthly path, stated as load taken, never as inability.

*Acceptance:* Given every possible intake, when section 4 renders, then exactly one block appears. Given the first block, then no call-to-action to a monthly engagement appears on the page. Given any block, then the text passes the voice rulebook checklist — in particular Rule 3 (stretched, never incapable) and Rule 8 (no future-tense delivery promise).

**5.6 After the read — the files, the call, and where qualification actually happens.**
The read is complete on screen. Three actions beneath it, none required:

- **Send me this and the files** *(proposed — founder confirmation closes it).* Two things, delivered by email or WhatsApp, the visitor's choice, with consent: (1) the read as a PDF or link; (2) **the method files** for the items in their "yours to do" column — Bidaya's own templates, the ones it builds for clients: the renewal-and-expiry register, the monthly reporting pack, the lead and quotation register, the weekly review format, the project-process checklist. Only the files their read called for, not a generic pack. And (3) **updates when their register changes** — when a rule that affects their business moves (a deadline, a threshold), they are told. At v1 volume this is sent by hand from the Notes track; v1.1 automates it. This is the incentive: more of the same judgment, in a form that only works with their details. Never called a toolkit, a download or a newsletter.
- **Book the 30-minute call** — opens Start with the engagement shape pre-filled from section 4 and the intake attached. Start asks budget, timeline and shape — the qualification fields — here and only here.
- **Not now** — closes; nothing stored.

The DIY block (5.5, first case) shows the files and "Not now" only; no call-to-action to an engagement.

*Acceptance:* Given "Send me this and the files," when contact details are entered with consent, then the read and only the files matching the visitor's "yours to do" items are delivered, and the visitor is enrolled for register updates. Given "Book the call," when Start opens, then the shape is pre-selected and the intake attached. Given "Not now," then nothing persists beyond the session. Given the DIY block, then no engagement call-to-action renders.

**5.7 The rules and content are maintained, and it shows.**
- A content owner (founder, or the first hire) and a review cadence: the obligations table reviewed monthly; the read's content blocks reviewed quarterly.
- Every register row has a source and a verified date, visible to the visitor.
- **The licensed tax consultancy on Bidaya's bench (named in the ledger, never publicly) reviews the obligations table before launch and at each review.** This is the P0 that makes the register publishable.
- A disclaimer, in the voice: what the register is (a dated summary from public sources), what it isn't (advice on your specific position), and what to do if a date matters to you (confirm it).

**5.8 Voice and format.**
All output copy passes the voice rulebook checklist before launch. Sentence case; no stat triads; no icons or colour severity; the visitor's free-text answer quoted back in italics. Plural "we"; "you" for the visitor; "founders and owners" never "founders."

**5.9 The public page.**
*Where you stand* has a landing page that explains what the read contains, shows one worked example (a fictional business, clearly marked), and carries an FAQ block answering literal questions ("What obligations does a mainland LLC have in its first year?"). This page — not the per-visitor read — is what search and AI assistants index. Schema-marked; dated; updated with the register.

### P1 — should follow

- **PDF export** with Bidaya's identity (Phase 5 dependency); v1 may deliver a link instead.
- **Register updates automated** — the promise in 5.6 sent by rule rather than by hand; a returning visitor sees rows updated since their read.
- **A live session** — *Where you stand, live*: a one-hour session for founders and owners walking through reads, hosted monthly or inside a Programs cadence. A real incentive, deferred because it spends the founder's time, the scarcest resource at launch (§6). Revisit at the first hire.
- **Sector packs** — content blocks tuned to contracting, F&B, clinics, studios, software; the base read stays generic.
- **Intent-page embedding** — the intake launched from an intent page with question 1 or 2 pre-answered.

### P2 — design for, don't build

- **Arabic read.** Every content block keyed for a second language; layout RTL-capable from v1.
- **Narrative assist.** An LLM composes the opening and transitions over the rule-selected blocks; the register and the "yours to do" methods stay authored, never generated.
- **The platform.** The tool is the first thing a future platform would keep; content blocks and rules should be portable, not embedded in the site's page code.

## 6. Success metrics

**Leading (weeks)**
- Completion: intake started → read shown, **≥60%** (stretch 75%). Measured in analytics, 30 days post-launch.
- Usefulness: "did this help" **≥70% yes**, one tap, below section 4.
- Action rate: read → "Send me this" or "Book the call", **≥25%**.
- Honest-line distribution: the DIY block appears for **≥20%** of reads. If it never fires, the rules are selling, not judging.

**Lagging (quarter)**
- Tool-originated calls reaching proposal: **≥50%**, against the site's ~6-of-50 target.
- Engagements originating from the tool: **≥1 per quarter** in the first year.
- Citation: the public page appears in AI-assistant answers for at least three target queries by month six.
- Register accuracy: zero visitor-reported errors unresolved for more than seven days.

## 7. Phasing

- **v1 — at launch.** English; eleven questions; the four-section read; rules-based; obligations table reviewed by a licensed tax consultant; routing to Start; public page with FAQ. *This is a launch gate:* it is the only demonstrated proof the site will have (lock §11).
- **v1.1 — first month after.** PDF export; "what changed."
- **v2 — when the institutional audience becomes a priority.** Arabic; sector packs; narrative assist.

## 8. Open questions — answered

- **Content authoring (founder):** *decided.* The voice-note method (ledger W) doubles as content capture — the founder talks through what he checks and what he'd tell an owner to do; transcribed and edited into the 40–60 blocks. *(Round one: the voice note does not happen; see the repository note at the top and ledger BC.)*
- **Register review (tax):** *decided.* The licensed tax consultancy on Bidaya's bench reviews the obligations table before launch and at each review. Named in the ledger only. Cost is not a constraint.
- **Platform (engineering, Phase 8):** *deferred to the founder's file system.* Rules and content held as files in a Bidaya folder the founder will organise (with Cowork) so the first hire can edit them without a developer; Phase 8 builds against that structure. *(Phase 8: `/content/tool/` in the repository.)*
- **Storage and consent (legal):** *decided.* Session-only by default; stored only on "Send me this and the files," with consent language compliant with the UAE data-protection law.
- **Clarifying-question set (design):** *open — founder asked to be reminded.* Trigger: Phase 8 build kickoff.
- **Sector (design):** *decided.* Asked explicitly as question 11.

## 9. Timeline considerations

Content authoring is the long pole, not the build. Rules and blocks can be written now, in parallel with Phases 5–7, and are independent of design. The register's first review must complete before the Phase 9 audit. The public page's copy is Phase 7; its schema and FAQ structure are Phase 8.

## 10. The name

**Predictable and rejected:** Business Health Check · Readiness Assessment · Startup Scorecard · Fractional Executive Calculator · Diagnostic Tool. Each is blacklisted, on the never-list, or the category default.

**Convention (lock §13):** Bidaya + plain descriptor; says what it does; nothing from §8 or ledger M; not "assessment / scorecard / calculator / readiness."

**Candidates:**
- **Where you stand** — the firm's own section title from its proposals, now the product. Plain, second person, says what it returns. **Chosen by the founder.**
- **The first read** — carries the beginning thesis; "read" is exactly what it is. Risk: "first" invites "second."
- **The structure read** — precise; slightly cold.

**Section name inside the read:** *What is due* for the obligations register — plain; "register" stays internal.

---

*Decision 4 deliverable, v1.3. Name chosen; incentive layer confirmed by default (founder moved on without objection). Build is Phase 8; content authoring by draft-and-confirm in round one.*
