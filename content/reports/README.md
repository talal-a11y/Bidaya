# content/reports — the reports track

Empty at launch. One file per report, named `01-short-name.md`. The number in the file
name is the report's number and the order it lists in.

Reports are few and substantial: numbered, dated, on one question about running a business
in the UAE, with a named source for every figure. One a quarter.

## The shape of a file

```
---
number: 01
title: The title, sentence case
date: 2026-11-04
summary: One line on the question it answers.
sources:
  - Federal Tax Authority, corporate tax registration deadlines — https://tax.gov.ae/ — read 2026-10-30
  - Cooper Fitch, UAE Salary Guide 2026 — read 2026-10-30
---

The body, in the same markers as content/pages. See content/pages/README.md.
```

`date` is the day it published, written year-month-day. `sources` carries a named source
for every figure in the report; a figure without one does not go in.

Nothing here is general business commentary. Every report is written by the firm, from its
own work.
