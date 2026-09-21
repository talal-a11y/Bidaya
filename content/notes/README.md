# content/notes — the notes track

Empty at launch. One file per note, named `2026-11-04-short-name.md` — the date first, so
the folder sorts itself.

Notes are short: what changed, what it means for a business like yours, and what to do by
when. A deadline moved. A threshold changed. A rule that carries a fine. One a month, at
least.

## The shape of a file

```
---
title: The title, sentence case
date: 2026-11-04
summary: One line: what changed.
sources:
  - Federal Tax Authority, Decision 3 of 2026 — https://tax.gov.ae/ — read 2026-11-03
affects:
  - vat-return
---

The body, in the same markers as content/pages. See content/pages/README.md.
```

`affects` is optional and lists the ids of rows in `content/tool/register.json` that this
note is about. It is what lets a reader who asked for the files be told when a rule on
their own list changes.

A note that states a rule, a penalty, a threshold or a date carries a source for it. No
exceptions: the rule is the same one the register runs on.
