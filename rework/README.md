# rework/ — from the brand-systems chat, for Claude Code

**What this folder is.** The brand-systems chat (the one that built the positioning, copy deck, voice, identity and tool spec) writes here and nowhere else in this repository. Nothing under `src/`, `content/`, `public/`, `docs/` or the root is touched by it. Claude Code reads this folder only when the founder points it here, applies what a file says, and logs the result in `docs/decisions.md` as usual.

**Statuses used in these files:** DECIDED (the founder's ruling — apply it) · FOUNDER'S WORDS (copy he wrote — apply verbatim, never edit) · PROVISIONAL (apply, and the founder reviews later) · OPEN (do not apply; a question for the founder).

**Files, in the order they arrived:**

| File | What it is | Apply now? |
|---|---|---|
| `we-focus-on.md` | The seven "We focus on" items, in the founder's words, for the home page | Yes — FOUNDER'S WORDS, PROVISIONAL for later review |
| `rulings-2026-09-23.md` | The founder's rulings of 23 September that change the site now | Yes, item by item; two items are OPEN |
| `claude-skills.zip` | The five skills the handoff pack meant to ship in `.claude/skills/` | Yes — unzip at the repository root so the folder lands at `.claude/skills/` |

Later files from the same chat will be: the three audience profiles, the copy deck v2 (every page, from `content/` as it stands plus the new sections), the identity spec v2 with the outlined mark, and one prompt that ties them together. Each will say what it replaces.

**Two rules that hold for every file here:** the never-say list and the §8 blacklist bind Claude's drafting, not the founder's writing — a word he wrote or asked for is used as written and allow-listed with the ruling as its reason (`scripts/check-copy.allow.json`). And nothing on the site promises what is not always delivered.
