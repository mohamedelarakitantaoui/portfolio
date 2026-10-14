# Design references

**When unsure how something should look, match `approved/`. Never match `dont/`.**

> **v5 (2026-10-14):** the approved direction is now `v5-prototype.html` (black + champagne, Arik composition:
> match its composition, not its pixel values or text). The images in `approved/` still show the previous look until
> Mamoun approves the v5 visual diffs; then regenerate them with `node qa/design-refs.mjs`.

- `tokens.md`: the measured system in plain words, plus the token table that `npm run check` compares with
  `src/styles/tokens.css` (they must agree).
- `approved/`: the current approved pages, full page, effects off: `page-width-lang.png` for home, /work, the
  AneuXplain case study, /cv, /about and 404 at 1440 and 390, plus the French home. Regenerate after an approved
  design change with `node qa/design-refs.mjs` (against `astro preview`). These are references for people and
  sessions; the pixel-exact gate is `npm run check:visual` (baselines rendered in Docker).
- `dont/`: rejected looks. Showing a past failure keeps it from coming back. Reconstructed from the old code in git
  history (star polygon, poster cover) and from the banned values; not live pages.

| File | Rejected look | Why |
|---|---|---|
| `dont/star-logo.png` | Khatam / {8/3} star as logo, as the O in MAMOUN, as a filled mark | v4 uses a text logo only (favicon "ME"); the star read as decoration, the filled one as a known brand |
| `dont/clay-on-cream.png` | Clay orange (`#D97757`, `#CC785C`) on a cream background (`#F0EEE6`) | Reads as Claude/Anthropic branding |
| `dont/outlined-letter-thumbnail.png` | Outlined giant letters + star + mono flow line as a project thumbnail | Says nothing about the work; real media or real numbers only |
| `dont/flowchart-as-card-media.png` | An architecture flowchart used as a project card's image | An illustration, not the product; diagrams belong inside a case study chapter, only when they explain something |
