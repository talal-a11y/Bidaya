# Bidaya — logo package (21 September 2026)

Built from the exact mark (two circles, evenodd: outer r 240 at 500,530; inner r 200 at 500,455) and Readex Pro
(wordmark 700, بداية 600), converted to outlines so no file depends on an installed font.

Decision 8 ruled 21 September. Lockup 2 (mirrored: Arabic · mark · Latin) is the primary lockup, and the mark alone is
always permitted. Lockup 3 is the header lockup only, and only with the hairline between the scripts — the one-line
arrangement without it is rejected on every surface. Lockup 1 (stacked) is the proposal lockup. Lockup 4 (Arabic lead)
is unruled, kept for Programs. No designer pass: these are the final files.

## Rules carried in these files
- Mark: whole or not at all. Never rotated, mirrored, cropped, outlined, or given a second colour.
- Colour: ink #241B2E on stone #F4F1EC, paper #FCFBF9 and white. Paper on the aqua #0B6F7A, teal #2A8F99 and plum #5A47A3 bands.
  Never yellow, saffron or green. The four-tone mark exists only in motion, as the end state of the four-functions build on
  the site — never as a still, never as the firm's logo. Where documents name the four functions, use the descriptor lockup
  (ink mark + "Setup · Operations · Finance · Tech"). The end-state file is kept under motion-reference/ for the build only.
- Sizes: the pure form at 32 px and above (10 mm in print). Below 32 px use `bidaya-mark-small.svg` or the PNGs at 16/32,
  which carry a minimum stroke that rounds the cusps and keeps the cap.
- Clear space: one inner radius (0.388 × the mark's height) on all sides, measured from the outer circle.
- Lockup geometry, all versions: mark height = 1.75 × the wordmark's point size (2.5 × its cap height), centred on the cap
  height; gap mark→wordmark 0.4 em; wordmark tracking −2 %; بداية at 0.893 × the Latin size so the alif meets the cap height.
- Header hairline (lockup 3): 0.04 em wide, cap-height tall, half an em either side; #B9B1BF on light, paper at 55 % on bands.
- Small marks: favicon, app icon and avatar all sit on the aqua field with the paper mark at 62 % of the field (ruled).
- Page titles: under 30 characters so a tab shows them whole — "Bidaya" at home, "Where you stand — Bidaya" elsewhere.
- Watermark: the mark alone at 9 % opacity, bottom-right, one per page.

## Files
svg/  — masters (vector, outlines, no font dependency)
  bidaya-mark.svg · bidaya-mark-paper.svg · bidaya-mark-small.svg · bidaya-mark-watermark.svg
  bidaya-lockup-1-stacked.svg (proposals) · bidaya-lockup-2-mirrored(-paper).svg (primary)
  bidaya-lockup-3-header(-paper).svg (header, with hairline) · bidaya-lockup-3-header-small.svg · bidaya-lockup-4-arabic-lead.svg
  favicon-aqua.svg · favicon-aqua-small.svg · icon-square-aqua/stone.svg · icon-rounded-aqua/stone.svg · avatar-aqua/stone.svg · avatar-aqua-small.svg
png/mark/     bidaya-mark-16…1024.png (16 and 32 are the small variant), paper-on-aqua 512
png/lockups/  lockups 1, 2, 3-header and 4 at 2400 px wide on stone and transparent; 3-header on aqua; 2-mirrored on teal
png/icons/    favicon.ico (16/32/48) and favicon-16/32/48.png on the aqua field (ruled; favicon-mark-only-16/32.png kept as the
              rejected alternative) · apple-touch-icon-180.png and icon-512.png (aqua field, paper mark; square — iOS/Android
              apply their own mask) · icon-rounded-aqua-512.png · avatar-aqua-512.png · avatar-aqua-96.png (small variant).
              The stone versions stay only as the rejected comparison.
motion-reference/  four-tone-end-state.svg / -1024.png — for the site build only; not a logo file

Not included on purpose: an outline version, a grey version, a pattern, any gradient, the mark on a photograph,
and the one-line lockup without the hairline.
