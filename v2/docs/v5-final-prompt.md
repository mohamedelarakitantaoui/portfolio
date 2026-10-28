# v5 final round: every project reachable, inner pages redesigned, ready to deploy

Branch: keep working on `v5-champagne`. Same rules as the v5 redesign: tokens only from `tokens.css`, Jost + Cormorant,
sharp shapes, facts only from the CVs + `docs/decisions.md`, EN and FR together, effects behind the kill switch and
reduced motion, nothing invented. Work in the order below and stop at every **STOP** with screenshots at
1920×1080 and 390×844 (fresh browser, no cache).

## 1. CV PDFs (unblocks deploy)
- Find the CV source files (RenderCV YAML, Typst, LaTeX or Word) anywhere under `Desktop/Po` or `Downloads`.
- Change every "95 %" / "95%" to "90% (2h30 → 15 min)", re-export AI-ML, Data and Software, and copy them into
  `v2/public/cv/` as `Mohamed-El-Araki-CV-AI-ML.pdf`, `-Data.pdf` and `-Software.pdf`.
- Run `npm run check:cv` until it passes.
- If there is no source, say so and stop this step; I'll edit the PDFs myself.

## 2. Every project is reachable
Right now some projects are dead ends: rows with no link, or no page at all. Make every project in `site.ts` and
`src/content/projects/` reachable from the home page and from /work:
- **/work lists ALL projects**: featured and "More projects", including Quiz Game App, Courses & Lessons App and
  Mini Private Cloud. Use the same hairline rows as the home page, filter chips (All · ML & AI · Automation ·
  Web & Mobile · Research), and a champagne hover line.
- **Every row is a link**, never a dead row:
  - If a case study exists, link to it.
  - Otherwise create a short project page `/work/<slug>` (EN + FR) using only facts already in `site.ts`,
    the CVs and `decisions.md`: title, one-line summary, year, role, stack, the metric if one exists, and its
    links (GitHub, Kaggle, live site).
  - Sections with no verified facts are left out; never show a TODO or a placeholder in production.
- **eSaha:** `decisions.md` currently says "no public case study, no repo link". I'm changing that: give eSaha a short
  project page built from the facts in `site.ts` (mental-health platform, GPT assistant in 4 languages, React,
  TypeScript, Flask, MongoDB, JWT). Still no repo link. Record the change in `decisions.md`.
- **Home "More projects" rows** link to those pages too. Add "All projects →" under the list, pointing to /work.
- **Case-study pages** end with "Previous / Next project" links that cycle through ALL projects, not only the
  featured ones.
- Add the new pages to the sitemap, the command palette (⌘K) and the ask-mamoun notes, and give each its own
  OG image.

**STOP:** show /work, the eSaha page and one other new short page.

## 3. Inner pages: real redesign (not only new tokens)
1. **Case studies** (aneuxplain, dce-scraper, pitchpoint, rsna-knee-mri, preparia):
   - A poster-style opening: the title in Jost 200 plus one Cormorant clause, the key metric large like the hero
     stats, and the project media big and framed below it.
   - A HUD-like meta row on a hairline: role · timeline · stack · links.
   - Chapters as numbered hairline sections.
   - **STOP after AneuXplain**, then do the rest.
2. **/about:** the toned portrait large on one side and the text on the other; Experience and Education as hairline rows.
3. **/services and /contact:** sharp `--surface` panels, the email large like in the footer, and the form styled to the tokens.
4. **/cv, /creative, /privacy, 404:** check the spacing and type scale match the home page; fix anything that still
   looks like v4.

**STOP:** show each page once.

## 4. Hero detail
- "My capstone project: AneuXplain ↗" in the HUD is clipped at the bottom on 1920×1080 at 125% scaling (1536×730).
  Put it on the same line as the clock, or move it above the hairline, so the full HUD fits at all five sizes.

## 5. Ready to deploy
- Run `npm run check` (`PW_PORT=4330`), `check:perf` and `check:cv`; all must pass.
- Commit and push `v5-champagne`.
- Open a pull request into `main` with a short summary and screenshots, and leave it **unmerged**.
- Tell me exactly what to set on Netlify for the v2 site:
  - base directory `v2`, build `npm run build`, publish `v2/dist`;
  - the Node version;
  - the redirects that `v2/netlify.toml` already contains;
  - whether the repo-root `netlify.toml` must be removed or overridden so the old v1 site isn't published.
- Don't touch the visual baselines; I'll render them on GitHub and unzip them into
  `v2/tests/visual.spec.ts-snapshots/` myself.
