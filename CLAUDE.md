# Bidaya website — rules for every session

Read this file completely before doing anything. It is the contract between the founder, the record in `docs/`, and you.

## 1. What this is

Bidaya (بداية, Arabic for *beginning*) is a UAE consultancy that acts as the executive layer for funded startups and established SMEs that don't have one yet — setup, operations, finance and tech, run inside the business by one firm. This repository is its website: a Next.js site on Vercel, built entirely through Claude Code, with no developer and no agency. The founder is Talal. He is not a developer. He approves every change from a Vercel preview link on his phone.

**The bar.** The founder named six sites as the standard for motion, interactivity and storytelling: orchid.security, aspensearch.com, weevolveit.com, filmbot.com, rapidkert.com, landonorris.com. He rejected an earlier prototype as "not unique and crazy enough" and its code as "not good enough." Those sites were built by studios with GSAP, Lenis, Rive and hand-written WebGL. You are building without the studio. That means: aim at the bar, ship in small approved pieces, measure everything, and never ship something that merely functions.

**How to work with the founder.** Plain words, no jargon. Say what a thing does in one line before asking him to click it. Never ask him to run a command — run it. When something needs his hands (a Vercel setting, a GitHub click, a key), give the exact clicks. Ask before anything in §11. Don't pad, don't recap, don't flatter. If his instruction contradicts the record, say so once, then do what he rules and log it (§10).

## 2. Where the truth lives

`docs/` in rank order. Later rulings beat earlier documents.

| File | What it is | Status |
|---|---|---|
| `docs/09-amendment-ledger.md` | Every decision of the rebrand, lettered. The latest ruling on any question is here. | Binding |
| `docs/01-positioning-input-draft2.md` | What Bidaya is. §8 is the blacklist — law. | Binding |
| `docs/02-site-copy-deck.md` | **The copy. Every page, every heading, every button.** | Binding — see §3 |
| `docs/03-tool-spec.md` | *Where you stand* — the product spec with acceptance tests. | Binding |
| `docs/04-voice-rulebook.md` | Fifteen rules, the never-say list, the thirteen-item checklist. | Binding on any words you write |
| `docs/05-identity-system-spec.md` | Mark, lockups, colour, type, motion, layout. | Colours and mark locked; the rest provisional |
| `docs/06-identity-spec-part1-mood-colour.md` | Why the colours; the contrast table. | Reference |
| `docs/07-brand-guidelines.md` | The consolidated guide. | Reference |
| `docs/08-messaging-framework.md` | The messages behind the copy. | Reference |
| `docs/00-build-guide.md` | Phase 8 plan: milestones and done-criteria. | Plan |
| `docs/decisions.md` | Rulings made in this repository. **You append to this.** | Living |

`brand/` is the logo package — the only source for the mark. `tokens/tokens.css` is the design-token file; it moves to `src/styles/tokens.css` at scaffold and is the only place a colour is defined.

## 3. The copy deck is the copy

Every word on the site comes from `docs/02-site-copy-deck.md`. You do not write copy. You do not improve copy. You do not add a heading, a button label, a placeholder, a tooltip or an error message the deck doesn't contain without marking it `[proposed]` in `docs/decisions.md` and telling the founder. If a line cannot be built as written, build the nearest faithful version, flag it, and wait.

The deck's `[note: …]` lines are layout suggestions, not rules. Its `[assumed]` labels are the founder's to confirm; keep them visible in the code as comments.

Any word you do write — a form's validation message, an empty state, alt text, the tool's clarifying question — passes the rulebook's checklist (`docs/04`, "The pre-ship checklist") before commit. Sentence case everywhere. Plural "we", never "I". No emoji anywhere.

## 4. The blacklist — §8, verbatim, never negotiable

Every headline, subhead, section title, label and slogan is checked against this before it is committed. A hit is replaced, never caveated. It applies to code comments that could surface (alt text, aria labels, metadata) and to every visual choice.

**Category clichés — UAE business services:** "Your gateway to the Middle East" / "Gateway to the UAE" · "Set up your business in 3 easy steps" · "Your trusted partner in…" · "End-to-end solutions" · "Seamless" anything · "Hassle-free" / "stress-free" setup · "We handle the paperwork so you can focus on your business" (and the variant "we manage all the headaches so you can focus on the core business") · "From vision to reality" / "turning ideas into reality" · "Empowering entrepreneurs" · "Your success is our success" · "Bridging East and West" · "The land of opportunity" · "Begin right" / "start right" / "the right beginning" · "Build something real, build it right".

**Consultancy clichés — generic:** "Strategic partner" · "Tailored / bespoke / customised solutions" · "Data-driven insights" · "Holistic approach" · "We don't just X, we Y" · "Unlock your potential" / "unlock growth" · "Take your business to the next level" · "World-class" · "Best-in-class" · "Proven track record" · "Passionate about".

**AI-era tells:** "AI-powered consultancy" / "AI-first" · "Leverage" as a verb · "Delve into" · "In today's fast-paced landscape" · "Navigate the complexities of" · "Transform / transformative / transformation" · "Revolutionise" · "Game-changing" · "Elevate" · "Robust" · "Streamline" · "Supercharge" · em-dash-heavy triadic rhythm ("not just X — but Y — and Z") · opening a section with a rhetorical question the copy then answers.

**Visual and structural clichés:** navy and gold as the primary palette · Burj Khalifa or Dubai skyline silhouettes · handshake photography · stock photography of diverse people in a glass-walled meeting room · rising-arrow, upward-graph or growth-chart iconography · compass, key, puzzle-piece, lightbulb or rocket-ship icons · gradient-mesh purple/blue hero backgrounds · Inter, Poppins, Montserrat, Open Sans as display type · three-column feature grid with icon-heading-paragraph · "Trusted by" logo strip · numbered process ladder as the primary structure (1. Consult → 2. Setup → 3. Grow).

**The rulebook's never-say list (docs/04 §08) also binds:** under one roof · one-stop shop · all your business needs · at a fraction of the cost · without the full-time cost / commitment / overhead · senior leadership · senior financial / operational leadership · more than bookkeeping · scale up or down · not just an adviser — an operator who embeds · your growth partner · hustle · scale · empower · journey · solutions · affordable · cheap · hub · platform · space · license (as a claim) · in-house · the only / one of the only / the first · assessment · scorecard · readiness · technology (the word is "tech") · young · fresh · we care · we're here for you · we deliver excellence · you don't know how · let the experts handle it · leave it to us · any promised first-month outcome · the category sentence "management and IT consultancy for SMEs, startups and creators" anywhere but About's machine-readable block.

**Standing constraints from the founder, verbatim where he gave them:** no client names, logos, testimonials or case-study attributions anywhere; **"FOUNDER CREDENTIALS SHOULD NOT BE USED!"** — no photo, no bio, no credentials, the founder never on the homepage, named once on About and nowhere else; "don't say under one license ever anywhere… don't make the in-house claim either. We don't need to say the only person / the only business"; "don't mention that we're virtual anywhere"; never name the emirate or an office; never name the tax consultancy on the bench; "Bidaya is not me, and I am not Bidaya"; no hub / platform / space language; never "affordable"; the only number on the site is *monthly from AED 12,000*, on How we work, the four intent pages and FAQ blocks only (plus the footer's legal line) — never on the homepage, About, the story or Programs; Programs carries no price and no "services".

## 5. Identity — what is locked and what is not

**Locked (ledger AX): the colours and the mark.** Everything else in `docs/05` is provisional and may be replaced by the build — by a logged decision, never a silent one. §8 binds regardless.

**Colour.** The nine tokens in `tokens/tokens.css`. Stone `#F4F1EC` is the page; paper `#FCFBF9` is a surface, never a page; white is never a page. Ink `#241B2E` is text and the mark. Aqua `#0B6F7A` is the accent and the only action colour. Teal `#2A8F99` and plum `#5A47A3` are bands with paper text; teal bands carry titles only; neither is text on light. No gradients anywhere. No dark mode. No new colour without a token proposal in `docs/decisions.md`.

**The mark.** Two circles, evenodd: outer r240 at (500,530), inner r200 at (500,455); path `M260 530a240 240 0 1 0 480 0a240 240 0 1 0-480 0ZM300 455a200 200 0 1 0 400 0a200 200 0 1 0-400 0Z`. Files in `brand/svg/` — use them; never redraw. Ink on light, paper on bands; below 32px the small variant (`bidaya-mark-small.svg`). Clear space one inner radius. Never cropped, rotated, mirrored, outlined, shadowed, gradiented, patterned, used as an icon or bullet, standing in for the B, or on a photograph. The four-tone version (`brand/motion-reference/`) is the end state of one animation on the site — never a still, never the logo.

**Lockups.** Header: `bidaya-lockup-3-header.svg` — mark · Bidaya · hairline · بداية on one baseline; on phones the mark and Bidaya only (drop the Arabic). Without the hairline this arrangement is rejected. Primary everywhere else: `bidaya-lockup-2-mirrored.svg` (بداية · mark · Bidaya). Favicon, app icon, avatar: the paper mark at 62% on a rounded aqua field — `brand/png/icons/favicon.ico`, `apple-touch-icon-180.png`, `icon-512.png`. Page titles under 30 characters except the four intent pages (deck §13).

**Type (provisional).** Readex Pro, self-hosted from `public/fonts/` — 400 body, 600 labels, 700 display; sentence case everywhere; no title case, no letter-spaced small-caps labels, no overline eyebrows. Never Inter, Poppins, Montserrat, Open Sans. A different family is a proposal in `docs/decisions.md` with a defence, then the founder's word. Never load a third-party stylesheet; a Google Fonts request silently failed once and took a whole stylesheet with it.

**Imagery.** None. No photography at launch, no stock, no AI-generated images, none of §8's props. The visual language is motion and colour and shape, not pictures. Icons, if any: outline, rounded, single weight, Phosphor — not Lucide.

**Shape (provisional).** Rounded everywhere: pill buttons, radii 8/12/20/28/48, section boundaries as curved ribbons rather than straight edges, blobs permitted, boxes not.

## 6. Stack and structure

- **Next.js, App Router, TypeScript.** Plain CSS with custom properties. **No Tailwind, no UI kit, no component library, no CSS-in-JS.** The tokens are the design system.
- **Motion:** `gsap` (with ScrollTrigger, SplitText — all plugins are free), `lenis`, `three` + `@react-three/fiber` for the world canvas. Nothing else until it is needed and logged.
- **Email:** `resend`. **Analytics:** `@vercel/analytics` only. **No CMS** — content is files.
- **Content as files, editable without a developer:**
  - `content/pages/*.md` — the copy deck, one file per page, headings and buttons as data.
  - `content/reports/`, `content/notes/` — empty at launch; frontmatter `title, date, sources[]`.
  - `content/tool/questions.json`, `blocks.json`, `register.json`, `rules.json` — the tool's data (§8 below).
- `public/brand/` — the logo package as delivered. `public/fonts/` — Readex Pro (OFL). `public/llms.txt` — from deck §13, dated.
- `src/styles/tokens.css` — the tokens. `src/styles/global.css` — reset and base. Component styles as CSS modules.
- `scripts/check-copy.mjs` — the mechanical checklist (§4 lists, "X, not Y" count, em-dash count, "I "/"my ", "AED" placement, "fractional/outsourced/part-time" placement, "hub/platform/space/license/in-house/only/technology"). Runs in CI and before every commit that touches content.
- **Secrets never enter the repository or a chat.** `.env.local` is gitignored; production keys live in Vercel's environment variables, entered by the founder himself.

**Routes (from the deck's llms.txt):** `/` · `/where-you-stand` · `/what-we-do` · `/how-we-work` · `/programs` · `/reports-and-notes` and `/reports-and-notes/[slug]` · `/about` · `/start` · intent pages `/fractional-coo-uae` · `/fractional-cfo-uae` · `/tech-and-projects` · `/feasibility-and-advisory`. Navigation order: Where you stand · What we do · How we work · Programs · Reports and notes · About · Start (button).

**Bilingual-ready.** Logical CSS properties (`margin-inline`, `padding-inline-start`, not left/right). `dir` on `<html>`, never assumed. The header mirrors correctly under `dir="rtl"`. No Arabic content is produced; بداية appears only in the lockups.

## 7. Quality floor — not negotiable

- Lighthouse mobile ≥ 90 on performance, accessibility, best practices and SEO for every page, measured on the Vercel preview, before a merge.
- 60fps for every animation on a mid-range phone; canvases sized to the device; only the visible tab animates; nothing animates off-screen.
- WCAG 2.2 AA: contrast, keyboard, focus visible, touch targets ≥ 44px, accessible names, no motion that cannot be turned off.
- `prefers-reduced-motion`: everything appears in place — no particles, no reveals, no builds, no smooth scroll.
- Semantic HTML; one `h1` per page; schema per deck §13 (Organization, FAQPage, Article, Service); `llms.txt`; sitemap; canonical URLs.
- Responsive at every width from 320px up; no horizontal scroll; no layout that reads as a template pasted on a background.
- No console errors. No external stylesheet or script from a third party. No cookie banner is needed unless something requires consent — analytics is cookieless.

## 8. *Where you stand* — the tool's hard rules

From `docs/03`. These are acceptance tests, not preferences.

- **Never a score, percentage, grade, tier, "readiness", progress meter, rising arrow or colour-coded severity — anywhere, including as a placeholder.** The read is typographic: four rows (setup, operations, finance, tech) × three columns (covered / needs building / yours to do), then *What is due* (the obligations register), *What to do first* (three items), and one closing block of three.
- **No email gate.** The read renders in full without contact details. Nothing is stored unless the visitor asks for "Send me this and the files" and consents. "Not now" leaves nothing behind.
- **Everything regulatory is authored data, never generated.** Every row of `register.json` carries `source`, `sourceUrl`, `verifiedOn`. A row older than the review cadence shows "verification due". A jurisdiction or activity the register doesn't cover shows "not covered yet" — never a guess. The register is reviewed by a licensed tax consultancy before launch; until then every row is marked `draft: true` and the page says so in the voice.
- **Contradictory answers** (trading 3+ years, revenue none) trigger one clarifying question, not a wrong read.
- **The DIY block** ("You don't need an executive layer yet") shows the files and "Not now" only — no call-to-action to an engagement. If the rules never produce it, the rules are selling, not judging.
- **Qualification fields** (budget, timeline, shape) are asked on Start only, after the read, with the intake attached and the shape pre-selected.
- **Content blocks** (40–60) and rules are drafted by you from the spec and public sources, each marked `draft — founder to confirm`, in the voice, passing the checklist; the founder confirms in a review session before launch. Rule 3 (stretched, never incapable) and Rule 8 (no future-tense promise) are tested on every block.

## 9. Motion — where the site earns its difference

The old "restrained, below Plaid" ceiling is lifted (ledger AX). The bar is the six sites in §1. Motion is the signature; the copy is quiet so the motion and the specifics can be loud. What still binds:

- The two builds from `docs/05 §6` are the concept on record — *flow that becomes*: (1) the hero mark forms from particles in its own colour on first view and stays; (2) the four-functions mark forms one sector at a time in the four tones (Setup top, Operations right, Finance base, Tech left), the words arriving with their sectors. Concept locked; execution open. Both are built in code (SVG + canvas + GSAP); there is no Rive, no motion designer.
- The world canvas — a flow field of fine ink and aqua lines, low intensity, the page's world rather than a decoration — in `three`/`@react-three/fiber` or a 2D canvas if WebGL cannot hold 60fps on a phone. Trails fade to transparent; the canvas never tints the page.
- Every build happens once and stays. Nothing loops, repeats, disperses or resets on scroll-back. No scroll-jacking: the wheel always moves the page. No motion on every section for its own sake; an orchestrated moment beats scattered effects.
- Particles take the colour of what they become; light particles on the bands. A build changes nothing else on the page.
- Reduced motion shows the finished state instantly. Performance budget as §7. Text is never unreadable while animating; a reader who arrives mid-animation can still read.
- Page transitions, text reveals and scroll chapters are welcome — designed, screenshot, measured, and approved on the founder's phone one piece at a time.
- Before proposing any motion direction: name the predictable version first (the fade-up-on-scroll every AI site ships), then the one you are proposing, and why it is specific to Bidaya's world (the hilal, the ب, the beginning, the flow that becomes).

## 10. How a session runs

1. Start by reading this file, `docs/decisions.md`, and the milestone you are on in `docs/00-build-guide.md`. State the session's goal in one line.
2. Work on a branch: `build/NN-short-name`. Never commit to `main`. Small commits, plain messages.
3. Screenshot what you build at 390px and 1440px with Playwright and look at it before you say it is done. Run `scripts/check-copy.mjs` and Lighthouse on the preview.
4. Push, open a pull request, and tell the founder: what is built, the preview link, what he should look at, what is flagged, what needs his hands. Plain words.
5. He answers on his phone. Fix on the same branch until he says yes. Then merge. `main` is always the last thing he approved.
6. **Every ruling he makes goes into `docs/decisions.md`** the same session, dated, in his words where he gave them: `2026-09-22 — Hero: the founder rules … — Consequence: …`. The founder mirrors these to the project ledger; this file is the repository's half of the record.
7. Never touch the old site, its hosting or the domain's DNS. Launch is milestone 9 and is his hand on the switch.

**Skills.** If `frontend-design-code`, `ux-designer`, `web-design-guidelines`, `accessibility-scan` and `brand-audit` are available (they are bundled in `.claude/skills/`): `frontend-design-code` leads every design decision — its "name the default, then beat it" discipline is this project's own rule; `ux-designer` for the tool's interface, forms, accessibility and RTL; `web-design-guidelines` and `accessibility-scan` as the review before each merge; `brand-audit` at pre-launch. Name the skill inline when you use it: `[using frontend-design-code]`. If a skill is unavailable, say so and continue.

## 11. Ask first — never assume

- Adding a dependency beyond §6's list.
- Changing or adding a colour token; changing the type family; anything under §5 marked provisional.
- Changing, adding or cutting any copy from the deck (§3) — including headings and button labels.
- Breaking a §9 constraint of the positioning document (the escape clause: name the constraint, why it blocks, what breaking it buys, then wait).
- Anything that ships to `main`, points the domain, sends a real email, stores a visitor's data, or costs money.
- Deleting files, force-pushing, rewriting history.
- Any claim about a regulation, a penalty, a threshold or a date that is not in `register.json` with a source.

Nothing in §4 is ever asked about. It is replaced.

## 12. Definition of done, per milestone

The done-criteria are in `docs/00-build-guide.md` Part 4. A milestone is done when its criteria pass on the Vercel preview, the checklist script is clean, Lighthouse is ≥ 90 on mobile, the founder has said yes on the preview, and `docs/decisions.md` carries every ruling made along the way.
