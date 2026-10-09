# Release (deploy checklist)

**Before every deploy, all green:**
1. `npm run check` (types, styles, banned strings, i18n, tokens, build, HTML, links, media, smoke, resilience, a11y).
2. `npm run check:visual`: diffs reviewed and approved by Mamoun (update baselines only after that:
   `npm run check:visual:update`, in Docker or via the CI "update baselines" run).
3. `npm run check:perf`: Lighthouse mobile performance ≥ 0.90, accessibility ≥ 0.95, CLS ≤ 0.1, budgets.
4. `npm run check:cv`: no "95%", "Supabase" or "Government RAG" inside the CV PDFs.
5. Spot checks on the built site: `/sitemap-index.xml`, `/robots.txt`, `/404`, OG image of the home page
   (`/og/home-en.png`), canonical and hreflang on a page, the domain in `astro.config.mjs` (`SITE_URL`).

**One-time GitHub setup (Mamoun):**
1. Push the repo to GitHub; the workflow `.github/workflows/ci.yml` runs on every push and pull request.
2. Settings → Branches → Add rule for `main`: require a pull request, require status checks to pass
   (`check`, `visual`, `perf`, `cv`), require branches to be up to date, block force pushes.
3. Deploy only from `main` (Netlify/Vercel: production branch = `main`, base directory `v2`, build command
   `npm run build`, publish directory `dist`). Preview deploys from other branches are fine.
4. Visual baselines: run the workflow manually with "update baselines" once, download the `visual-baselines` artifact,
   review the images, and commit them into `tests/visual.spec.ts-snapshots/`.

Never deploy with a red check, and never use `--no-verify`.
