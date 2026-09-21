# Bidaya — the website

Next.js on Vercel. Every word comes from `docs/02-site-copy-deck.md` and lives in `content/`.
Read `CLAUDE.md` first; it is the contract for every session.

- `content/pages/*.md` — the copy, one file per page. Format in `content/pages/README.md`.
- `content/reports/`, `content/notes/` — the publishing tracks. Empty at launch; format in each README.
- `content/tool/` — *Where you stand*'s questions, blocks, register and rules. Authored data only.
- `src/styles/tokens.css` — the only place a colour is defined.
- `public/brand/` — the logo package. `public/fonts/` — Readex Pro, self-hosted.
- `scripts/check-copy.mjs` — the checklist. Runs before every commit that touches content, and in CI.
- `docs/` — the record. `docs/decisions.md` carries every ruling made in this repository.

```bash
npm install        # also points git at .githooks
npm run dev        # http://localhost:3000
npm run check-copy
npm run build && npm start && npm run screenshots
```
