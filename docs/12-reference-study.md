# Reference study — the six sites, 21 September 2026

Milestone 2. Each site opened at 1440px and 390px, scrolled in six frames, its script bundle read for the libraries it ships. Frames in `screenshots/refs/` (not committed), data in `screenshots/refs/report.json`. The founder's own notes are marked **Founder:**.

| Site | Palette | Stack found | JS shipped | What it actually does |
|---|---|---|---|---|
| orchid.security | dark navy, violet, paper | Webflow · GSAP + ScrollTrigger · Lenis · Rive · Spline · Lottie · Barba · SplitType | 9.1MB | Pinned chapters; cards and pill labels rise into place as you scroll; a product screenshot as the hero object; page transitions. A lead-magnet popup that cannot be dismissed. |
| aspensearch.com | white, black, mint, grey | Lenis · three.js · Framer · Rive · Spline · Lottie | 2.3MB | A hard edge-to-edge grid; every panel a full block of colour; halftone-dithered imagery through a WebGL shader; giant single-word type; monospace for facts (clocks, labels); zero empty space. |
| weevolveit.com | near-black, pink | GSAP + ScrollTrigger · Lenis · three.js · Rive · Spline · SplitType | 2.7MB | Monospace everywhere; a dotted three.js globe; particles that scatter and re-form into the next chapter; a scroll-progress percentage; ghost numerals 01–05 behind each chapter. |
| filmbot.com | paper hero, then black | GSAP + ScrollTrigger · Lenis · three.js · Framer · Barba | 2.5MB | Video masked into rounded vertical strips; huge condensed uppercase type; a dark gallery of stills; page transitions. Relies on film footage. |
| rapidkert.com | near-black, off-white, sage | none detected — hand-written | 51KB | Awwwards nominee. Giant type; project cards stacked in shallow 3D that fan out on scroll; chapter numbers; a 25,000px scroll story. Proof that the stack is not the point. |
| landonorris.com | off-white, lime | GSAP + ScrollTrigger · Lenis · three.js · Rive · Spline · SplitType | 2.0MB | A light page: animated topographic contour lines as the world behind everything; camouflage blobs; 21 small canvases (Rive) for the widgets; giant type; photos pinned and swapped by scroll. |

**Founder:** on Orchid — "Scrolling down and having these cards / pills move up is something I liked. What I disliked: this card coming up with the X at the top right (AI readiness checklist) — it looks cheap and can't even be removed anyway. It's also too dark of a site, but the movements are nice."

## What they share

1. **The whole viewport is the page.** None of them has a reading column with empty space beside it. Panels go edge to edge; type is sized to the screen, not to a paragraph.
2. **Scroll is the timeline.** Sections are pinned and things happen inside them while you scroll (GSAP ScrollTrigger); the wheel still moves the page. Lenis smooths it on five of six.
3. **One generative world per site.** Contour lines (Lando), halftone (Aspen), dotted globe and particles (WeEvolveIT), 3D card stacks (Rapidkert). It is drawn live, it is the brand, and it is the thing you remember.
4. **Type does the heavy lifting.** One display face used very large, one monospace face for facts and labels. No site uses a default web font at default sizes.
5. **Transitions between pages** on three of six (Barba), so the site feels like one object.
6. **Motion is orchestrated, not scattered.** A few big moments per page, each built once. The generic fade-up-on-scroll appears nowhere.

## What fits Bidaya, and what doesn't

Fits: the light world (Lando) — stone is already the page; edge-to-edge panels of the four colours (Aspen); cards and terms rising into place inside pinned chapters (Orchid, without the dark); a hand-drawn generative background that *is* the brand (Lando's contours → Bidaya's flow); giant type; monospace for the published terms and dates; page transitions.

Doesn't: photography and video (Filmbot, Lando, Rapidkert lean on it; the brief has none); the dark palette; the ghost chapter numerals (a numbered ladder is on the blacklist as primary structure); anything that requires a Rive or Spline editor.

## The mechanisms, named, to draw from

pinned chapter · rising cards and pills · edge-to-edge colour panel · halftone / dither shader · contour-line field · scatter-and-reform particles · 3D card fan · masked strips · split-text word and line reveals · monospace fact layer · page transition · scroll progress indicator · giant single-word type.

Each direction in milestone 3 picks three or four of these and makes them out of Bidaya's own material — the hilal, the flow, the four functions, the three terms — rather than copying a site.

## The founder's notes, site by site (21 September)

**Aspen** — "One of my favorites. Works very well for my line of work. The simplicity of it, its motion, its movement, but it's not photos. Takes advantage of the whole page, but not the whole page is filled with content — the design allows the page to feel full even though the text isn't covering it, easy to read and beautiful to look at. Each section works with the one before and after but still has different sizes, different ways of portraying the message and different graphic and linear visuals. That's the feel I want for Bidaya, maybe different colors, but a similar feel and energy. The font seems too straightforward, but still works. The header stays put and I don't mind it."

**WeEvolveIT** — "A top contender. My favorite part is 'the 5 method': the flow element comes in quickly, and as I scroll down it starts scrolling right like a slideshow presenting the 5 methods. That's what I really liked here — unique and having movement. Too dark at the start, but works well below. Visuals and animations that are easy, simple and make sense for their business. Cannot be 100% replicated for me, but that movement works."

**Lando Norris** — "An excellent design example, beautiful visuals and a storyline that takes us through the whole site so well. Very interactive with the mouse movements, every part flows. Excessive for a B2B business — would have to be toned down."

**Rapidkert** — "A nice way of layering, good animations, flows well, not slow. Similar to Orchid in the photos moving as you scroll — here forward, Orchid upwards. Both are a nice way to move cards / pills for Bidaya."

**Filmbot** — "Beautiful ways of animating the text onto the screen without being super fancy — different motions to present the text as you scroll make it unique. Opening a letter and going into it as a transition to the next section is a really nice one too."

**Orchid** — the rising cards and pills; not the darkness; never a popup.
