# Mamoun El Araki · portfolio (v2/)

## What this is
Personal portfolio of Mamoun El Araki, https://mamounelaraki.com, for recruiters and clients worldwide, in EN and FR.
Branch `v5-champagne` holds the current design (black + champagne); `refine-personal-portfolio` holds the ice-blue
fallback, `v4-design` the saffron v4 and `redesign-2026` the v3.

## Stack and commands
Astro (static), content collections in MDX (`src/content/projects/{en,fr}/`), i18n EN at `/` and FR at `/fr/`.
GSAP only for the optional effects in `src/scripts/effects/` (kill switch below); scrolling is native.
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
- Type (v5): Jost for display and UI; headings at 200–300, tracking -0.02em; paragraphs and list text Jost 400 at
  16–17px; 500 only for `<strong>`/`<b>`. Cormorant Garamond Italic
  400 only for the second clause or second line of a heading (split in markup at the first comma; text unchanged),
  never a single emphasised word, never body text, at most once per heading; no natural split = all Jost. Small
  labels, nav, buttons and meta: Jost 400, 10.5–11px, uppercase, .2em. The mono exists only inside the ask-mamoun
  terminal. Why: the approved Arik direction (`design-references/v5-prototype.html`).
- Palette (v5): near-black `#070605` with bone text `#E9DFCC` and a desaturated champagne `#C8B07E`, used on thin
  lines, small text, the "after" bar and a button fill on hover only, never as a big bright fill. It is not the v4
  saffron. Light screenshots sit in a 1px line frame, dimmed to 75% (`--dim-screen`). Keep the portrait (behind the
  hero copy, toned), project media and restrained accent hierarchy.
- Shapes (v5): sharp. No pills, no rounded cards, radius tokens are 0. Panels (`--surface` + 1px line) only for
  service cards and the two doors; lists use hairline rows. Every section uses `--section-y`.
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
- Purple/blue gradients, Inter, any font beyond the Jost + Cormorant Garamond Italic pair (and the terminal mono),
  AI stock images, emoji icons, film grain. Why: generic AI look.
- Pills or rounded corners on buttons, cards, panels or the nav. Why: v5 is sharp by rule.
- "95%" (correct: 90%, 2h30 → 15 min), "Supabase", Government RAG (EN or FR), Mamoun's phone number, any Intelcia
  internal URL or hostname. Why: wrong or private. `scripts/check-banned.mjs` enforces it.
- Demo or filler text ("Lorem", fake counters, "10+ years"), visible TODOs in production.
- Copying another site's HTML, CSS or text (including loangoatinc.com and abdelilahnossair.com).
- `git commit --no-verify`, `git push --no-verify` or `SKIP_SIMPLE_GIT_HOOKS=1`, or editing guardrail files (snapshots, `lighthouserc.cjs`,
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
