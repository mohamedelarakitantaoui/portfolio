# Mamoun El Araki · portfolio (v2/)

## What this is
Personal portfolio of Mamoun El Araki, https://mamounelaraki.com, for recruiters and clients worldwide, in EN and FR.
Branch `v4-design` holds the current design; `redesign-2026` holds the v3 fallback.

## Stack and commands
Astro (static), content collections in MDX (`src/content/projects/{en,fr}/`), i18n EN at `/` and FR at `/fr/`.
Lenis + GSAP only for the optional effects in `src/scripts/effects/` (kill switch below).
- `npm run dev`: local site with TODO(user) tags visible
- `npm run build`: production build (fails on any TODO(user) left in a page)
- `npm run check`: everything that must pass before a task is done (table printed at the end)
- `npm run check:visual`: screenshot diffs against committed baselines (runs in the Playwright Docker image)
- `npm run check:perf`: Lighthouse CI, mobile, budgets
- `npm run check:cv`: text inside the CV PDFs (blocks deploy, not commits)

## Definition of done
Never say a task is done until `npm run check` passes. If you changed anything visible, also run
`npm run check:visual` and show Mamoun the diff images. Before a deploy, `check:visual`, `check:perf` and `check:cv`
must all pass (`docs/sops/release.md`).

## Design rules
- Colours, fonts, sizes, spacing, radii, z-index and durations come only from `src/styles/tokens.css`.
  Why: one source of truth; raw values drift and make the site look AI-made. Stylelint enforces it.
- One font family, DM Sans (the mono exists only inside the ask-mamoun terminal). Why: the measured reference system.
- Saffron `#F2A900` only for the primary button, small labels and one highlight per screen. Why: an accent everywhere
  stops being an accent.
- Muted text never darker than `#A6A6A6` on dark. Why: WCAG AA (contrast table in `design-references/tokens.md`).
- Layouts are intrinsic: `clamp()`, `minmax()`, `flex-wrap`, `min-width: 0`. Add a breakpoint only when content
  actually breaks. Why: fewer breakpoints, fewer places to break.
- Animate only `transform` and `opacity`; every effect is off under reduced motion and with the kill switch.
- Full scale and the approved look: `design-references/` (match `approved/`, never `dont/`).

## Content rules
- Facts come only from the three current CV PDFs (`public/cv/`) and `docs/decisions.md`. No invented numbers,
  clients, testimonials or logos. Unknown facts are `[[todo:…]]` markers (dev only).
- Every EN page and project has an FR twin with the same slug; change both together (`docs/sops/edit-copy.md`).
- Every featured project shows a real metric, or a `progress` line ("In progress: …"). Never an invented number.
- Voice: plain and specific. No "passionate", "cutting-edge", "leveraging", "seamless", "robust".

## Never
- A star, khatam or symbol logo. Text logo "Mamoun El Araki" only; favicon "ME". Why: rejected in v4.
- Clay orange or cream backgrounds (`#D97757`, `#CC785C`, `#F0EEE6`-type tones). Why: reads as Claude/Anthropic.
- Purple/blue gradients, Inter or a second display font, AI stock images, emoji icons. Why: generic AI look.
- "95%" (correct: 90%, 2h30 → 15 min), "Supabase", Government RAG (EN or FR), Mamoun's phone number, any Intelcia
  internal URL or hostname. Why: wrong or private. `scripts/check-banned.mjs` enforces it.
- Demo or filler text ("Lorem", fake counters, "10+ years"), visible TODOs in production.
- Copying another site's HTML, CSS or text (including loangoatinc.com and abdelilahnossair.com).
- `git commit --no-verify` or `git push --no-verify`, or editing guardrail files (snapshots, `lighthouserc.js`,
  `scripts/banned.json`, `.github/workflows/`) without Mamoun's OK. Why: checks must not be loosened quietly.

## Effects kill switch
`EFFECTS_ENABLED` in `src/config.ts`, or `?effects=off` in the URL, or `prefers-reduced-motion`: the site renders its
static version (same content and layout). New effects follow `docs/sops/add-effect.md`.

## Where things are
- `src/content/projects/{en,fr}/*.mdx`: projects and case studies (schema in `src/content.config.ts`)
- `src/data/site.ts`: page copy (EN + FR side by side); `src/data/knowledge.ts`: ask-mamoun notes
- `src/i18n/ui.ts`: UI strings; `src/components/`, `src/views/`, `src/pages/`: markup
- `src/styles/tokens.css`: every design value; `src/styles/base.css`: shared type and pieces
- `src/scripts/main.ts`: progressive enhancement; `src/scripts/effects/`: optional motion
- `public/media/`: videos and posters; `public/cv/`: CV PDFs; `public/research/`: capstone report
- `docs/`: decisions, SOPs, todo; `design-references/`: tokens, approved and rejected looks
- `scripts/`: checks (`check.mjs` runs them all); `tests/`: Playwright (smoke, resilience, a11y, visual)

## SOPs
@docs/sops/README.md
