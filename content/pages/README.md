# content/pages — the copy

One file per page. These files are the site's words. Editing a file here changes the
page; nothing else has to be touched, and no one has to write code to do it.

The copy in these files comes from `docs/02-site-copy-deck.md` and must match it word
for word. The deck is the copy (CLAUDE.md §3). Adding, cutting or improving a line here
is a change to the deck, and it goes to the founder first.

## The shape of a file

A block of settings at the top between two `---` lines, then the page's blocks.

```
---
route: /how-we-work
title: How we work — Bidaya
description: One sentence for search results and link previews.
---

# The page's one h1

@lead The opening paragraph, set larger than the rest.

An ordinary paragraph. **Bold** and *italic* work. So do [links](/about).

## A sub-heading

@cta Start a conversation -> /start
@ghost See where you stand -> /where-you-stand
```

## Every marker

| Marker | What it makes |
|---|---|
| `# text` | the page's heading (one per page) |
| `## text` | a section heading |
| `### text` | a heading inside a section |
| `@tagline text` | the tagline that sits with the mark |
| `@lead text` | the opening paragraph, set larger |
| `@aside text` | a quieter line under the block above it |
| `@cta Label -> /route` | a solid button |
| `@ghost Label -> /route` | an outlined button |
| `@textlink Label -> /route` | a plain text link, on its own line |
| `@inline Label -> /route` | one of a row of links, separated by dots |
| `- text` | a bulleted list item |
| `@note text` | an instruction to the build. Never shown on the page. |
| `@assumed text` | a line the founder has still to confirm. Never shown. Kept so it stays visible. |
| `@band aqua` | puts the section that follows on a coloured band (`aqua`, `teal` or `plum`) |
| `@rows` … `@end` | the four functions, or any set of `**Name.** sentence` rows |
| `@terms` … `@end` | the three published terms, as circles |
| `@faq` … `@end` | questions and answers. Search engines read these as questions. |
| `@example` … `@end` | the worked example, marked on the page as fictional |
| `@quiet` … `@end` | a block set quietly, for machines to read |
| `---` on its own line | ends one section and starts the next |

Inside `@rows`, `@faq`, `@terms` and `@quiet`, each paragraph is one item and is written
`**The bold part.** The rest.`

## What not to put here

No prices outside How we work, the four intent pages and FAQ blocks. No client names, no
testimonials, no founder credentials. Everything on the never-say list in `docs/04` and the
blacklist in `CLAUDE.md §4`. `npm run check-copy` reads these files and stops a commit that
breaks those rules.
