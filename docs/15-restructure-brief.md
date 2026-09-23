# Bidaya → Bidaya Consulting: the restructure, for the brand-systems chat

**Written 23 September 2026 by the founder's Claude Code session, at his request, to be pasted into the chat that built Bidaya's brand systems (positioning, copy deck, voice, identity, tool spec). This document explains what changed while the website was being built, why, and what the founder now intends — so that chat can rework the strategy and the record to match.**

**To the chat reading this:** the founder wants two things back from you before anything else. (1) Say back, in your own words, everything you understood from this document — the new structure, every change, the intent. (2) List everything that is still unclear or that this document doesn't settle, as questions for him. Do not propose new copy or a new structure until he has answered those questions. You have the same file access as the session that wrote this; every claim below points to where it is recorded.

---

## 1. Where things stand

- The site is built and on a Vercel preview, branch `build/03-direction-b`, pull request #2 in `talal-a11y/Bidaya`. `main` still holds the approved skeleton from milestone 1; nothing since has been merged, on purpose — the founder approves each round on the preview and merges when the direction is settled.
- The founder chose one of four design directions ("B — the grid", Aspen-style edge-to-edge panels) and has been iterating on it since; the other three were dropped. The full record of every ruling is `docs/decisions.md` (chronological, in his words where he gave them). The digest of every departure from the pack is `docs/14-deviations.md`. The reference study is `docs/12-reference-study.md`; the four direction storyboards are `docs/13-directions.md`.
- Screenshots of the site as it stands are in `docs/screens/` (home, the three audience pages, a summary panel, a form, phone views). The copy on the site is entirely in `content/` — `content/pages/*.md` (one file per page, a documented plain format), `content/audiences.json`, `content/summaries.json`, `content/functions.json`, `content/forms.json`, `content/global.md`. Reading `content/` is reading the site's words.

## 2. Why the restructure

In the founder's words (22 September): "When shown to another person, they don't understand right away what this is or what exactly we do. It's not structured right from the get go — we're pitching the four divisions and executive management but then talk about culture and programs right away like we expect them to know why without explaining it. The four divisions explained on the main page also makes it confusing: are these Bidaya's divisions, or only divisions for the executive management work?"

## 3. The new structure

1. **The firm is Bidaya Consulting.** The domain is bidaya.consulting (registered; not yet pointed at the site). Email addresses have not moved; contact details on the site are unchanged until he says so. The mark and lockups are unchanged (the wordmark still reads "Bidaya"); whether the wordmark should change is open.
2. **Three audiences, not four divisions.** The home page says what Bidaya Consulting does and who it consults for, then presents three audiences under the heading "We consult" (to become "We consult for"):
   - **Founders** — everything that was the executive-layer pitch: the headline "Setup, operations, finance and tech — run inside your business by one firm.", the four functions (Setup, Ops, Finance, Tech — these are *Founders'* four functions, not the firm's), the "What we do" text, the published terms. Page: `/founders`, copy in `content/pages/founders.md`.
   - **Creatives & Pre-preneurs** — the support a first business needs: workshops, trainings and advisory, programs with institutions, a community of small businesses, and the Talent Network (the professionals Bidaya brings in). Page: `/creatives-and-pre-preneurs`. The founder will add more.
   - **Institutions** — Programs and partnerships: business support inside the programs cultural and educational institutions already run; project management from ideation to launch. Page: `/institutions`. The founder will add more.
   - **About** stays; **Start** is the enquiry section at the foot of the home page.
3. **Navigation:** Founders · Creatives & Pre-preneurs · Institutions · About · Start. The old pages (What we do, How we work, Programs) still exist, unlinked, until their content is fully absorbed.
4. **Every inner page** carries arrows to the previous and next page ("Explore Institutions") and a dropdown listing all parts, in this order: Founders → Creatives & Pre-preneurs → Institutions → About → Bidaya Setup → Bidaya Ops → Bidaya Finance → Bidaya Tech. The four function pages are the former intent pages (Fractional COO/CFO, Tech, Feasibility), reframed as "Bidaya Setup/Ops/Finance/Tech".

## 4. What changed along the way (the short list — details in docs/14-deviations.md and docs/decisions.md)

**Structure and product**
- *Where you stand* (the tool, proof asset 1) is off the site until after launch. Its page still builds, unlinked; its data files (`content/tool/`) are laid out and empty.
- *Reports and notes* is named **Papers**, out of the navigation until a paper exists.
- Bilingual readiness dropped: English only.
- The Start page's one form became four in-page forms behind four cards: Enquire for your business · Partnerships and programs · Bidaya Talent Partners · General inquiry (hello@bidayahub.ae). The Budget question was cut. Each form is a sideways strip, one question per screen, every option a full-height tile, and a sentence on the left that fills in as the visitor answers. Name, email and phone required; company optional. Not yet wired to send.
- The founder intends to **merge the four forms into one "reach us" questionnaire** whose first questions route to the right form behind it (not built; details owed).
- He intends a new home section **"We focus on"** listing what Bidaya does — Setup & support, Executive management, Financial advisory, Programs & events, Workshops & trainings, and more (not built; list owed).

**Copy**
- The founder rewrote About, What we do, Programs, the three published terms and the home story in his own words (22 September); the deck's versions are in git history. His new terms: "Trial month, no notice" · "Pay monthly, cancel anytime" · "Discovery first, in writing".
- Tagline: "Executive management, from day one." (was "from the beginning"). The Arabic line: "بداية | means beginning."
- "How we work" is to become **"How Bidaya works"** (decided, not yet applied).
- "What we don't do" is cut from the site everywhere.
- Words on the never-say list that he chose to use: "all under one roof", "affordable", "unlock the doors", "the space", "journey", "fractional … at a fraction of the full time cost" outside the intent pages, "a young entrepreneur", "partner for growth"; and figures beyond the one number ("50+ agencies … 10+ specialties", "3 months to 24 months").
- Copy written by the build and still **proposed** (his to confirm or replace): the home headline and lead ("Consulting for founders, creatives and the institutions that back them." / "For founders… For creatives and pre-preneurs… For institutions…"); the three audience cards' short and long lines (`content/audiences.json`); the summary cards (`content/summaries.json`); the questions, options and sentences of three of the four forms (`content/forms.json`); the creatives page headline "The support a first business needs, from day one."; small interface words (Learn more, Explore, Previous, Next, Back, Close, Menu, the validation lines).

**Identity**
- Type: Geist and Geist Mono (Readex Pro stays only for the Arabic word). Shape: hard-edged panels and square buttons, not rounded. Colours: the nine tokens plus three off-palette shades for contrast (#237C85 deeper teal, #0A5C66 Ops/Institutions, #7462B8 General inquiry). The construction mark (two stroked circles) is used as a drawing and in the footer. Header lockup at every width.
- Motion: the pack's two builds (mark from particles; four-tone mark) were rejected. The site's motion is: text typed in, panels sliding in once, arcs drawing in, cards opening on hover, panels unfolding, sideways strips.

## 5. What is still open (the founder's decisions to make, or details owed)

1. The full "We focus on" list, and whether Claude may propose the rest.
2. The routing questions for the single "reach us" form, and the reworded questions and left-hand sentences.
3. Copy for Creatives & Pre-preneurs and Institutions beyond what is there now.
4. Whether the wordmark/lockups change to "Bidaya Consulting".
5. The email domain move (bidaya.consulting) — when.
6. The mobile audit's twelve findings (in `docs/decisions.md`, 22 September) — which to fix.
7. Confirmation or replacement of every line marked proposed above.
8. "How Bidaya works" — when to apply.
9. Which of the never-say words stay.
10. The wording of the three audience names ("Pre-preneurs" is the founder's coinage).

## 6. How to see the site

- **Live preview:** the Vercel preview URL is posted on pull request #2 (`talal-a11y/Bidaya`); it updates with every push to `build/03-direction-b`. Open it on a phone and a laptop.
- **Without a browser:** `docs/screens/` holds screenshots; `content/` holds every word; `src/directions/b/` holds the build (HomeB.tsx, AudienceB.tsx, PageB.tsx, Chapter.tsx, FormStrip.tsx, b.module.css).
- **To run it locally:** `npm install`, `npm run dev`, open http://localhost:3000.
