# Edit copy (EN and FR together)

1. Find where the text lives:
   - Page copy: `src/data/site.ts` (every string is `{ en, fr }`).
   - UI strings (buttons, nav, labels): `src/i18n/ui.ts` (`strings.en` / `strings.fr`, same keys).
   - Projects and case studies: `src/content/projects/en/*.mdx` and `fr/*.mdx`.
   - Page titles and meta descriptions: the `meta` objects in `src/views/*.astro` (title ≤ 60, description ≤ 155).
   - ask-mamoun notes: `src/data/knowledge.ts` (keep them in step with the page facts).
2. Change EN and FR in the same commit. Facts only from the CVs and `docs/decisions.md`; a new fact goes into
   `docs/decisions.md` first.
3. Voice: plain and specific (see `.claude/rules/content.md`). No exclamation marks, no banned words.
4. French runs 20–30% longer. Check the changed spot in `npm run dev` at 390px wide in FR: no overflow, no orphan
   word on a heading's last line if you can avoid it.
5. Run `npm run check` (check-i18n catches a missing or empty twin; check-banned catches banned strings).
