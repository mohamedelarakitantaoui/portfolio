---
paths: ["src/content/**", "src/i18n/**", "src/data/**"]
---
# Content

- EN/FR twins: `src/content/projects/en/<key>.mdx` always has `src/content/projects/fr/<key>.mdx` with the same
  `key`, `order`, `tier`, numbers and links. UI strings in `src/i18n/ui.ts` and copy in `src/data/site.ts` exist in
  both languages and are never empty. `npm run check` (check-i18n) fails otherwise.
- Frontmatter follows the schema in `src/content.config.ts` (the build fails on a missing field): `title`, one-sentence
  `outcome`, `meta`, `tags` (max 4), `lang`, `order`, `tier`. A featured project needs `metric` or `progress`.
  A `cover` needs `coverAlt`.
- Metric line format: `<number> <what> · <second fact>`, e.g. "0.83 AUC · 85% accuracy, patient-level split".
  Numbers only from the CVs or `docs/decisions.md`. Unknown → `[[todo:…]]` (shown in dev, removed in production).
- Voice: plain, specific, first person, past tense for shipped work. Every claim carries a number, a name, a date or
  a constraint. Never "passionate", "cutting-edge", "leveraging", "seamless", "robust", "innovative".
- French runs 20–30% longer: check new FR copy at 390px.
- Never: "95%" (it is 90%), "Supabase", Government RAG, phone numbers, Intelcia internal URLs or hostnames.
