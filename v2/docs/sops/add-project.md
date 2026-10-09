# Add a project

1. Pick a `key` (lowercase, dashes, e.g. `pitchpoint`). It is the URL slug: `/work/<key>` and `/fr/work/<key>`.
2. Create `src/content/projects/en/<key>.mdx` and `src/content/projects/fr/<key>.mdx`. Copy an existing project of the
   same tier as a starting point (`dce-scraper.mdx` for featured, `mini-private-cloud.mdx` for a row).
3. Fill the frontmatter (schema: `src/content.config.ts`; the build fails on a missing field). Same values in both
   files except the text:
   - `key`, `lang` (`en` / `fr`), `order` (position on /work), `tier`: `featured` (a card on home and /work, max 3)
     or `more` (one row in "More projects", plus an entry in `moreProjects` in `src/data/site.ts`).
   - `title`, `description` (≤ 155 chars, used for SEO), `year`, `meta` ("Type · Context · Year").
   - `outcome`: one sentence, what changed.
   - Featured only: `metric` ("0.83 AUC · 85% accuracy, patient-level split") or `progress` ("In progress: …").
     Numbers only from the CVs or `docs/decisions.md`.
   - `role`, `timeline`, `team`, `status`, `constraint`, `stack`, `tags` (max 4), `links`, `next` (key of the next
     project). Unknown facts: `"[[todo:what is missing]]"`.
   - Media (featured): a `loop` (see `add-media.md`), or a `cover` image in `src/assets/covers/` + `coverAlt`
     (required with a cover), or `bars` (the two real before/after numbers). No illustrations.
   - `caseStudy: false` if there is no page yet; `draft: true` builds the page in dev only.
4. Body: chapters as in `add-case-study.md`, or leave empty with `caseStudy: false`.
5. `npm run dev` and look at the home page, /work and the project page in EN and FR, at 1440 and 390.
6. Run `npm run check`.
