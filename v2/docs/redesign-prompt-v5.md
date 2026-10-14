# Prompt: v5 visual redesign (black + champagne, Arik direction)

Paste everything below the line into Claude Code, opened in `Desktop/Po/portfolio/v2`.

---

We're doing a visual redesign of the portfolio: v5, "black + champagne". This is a **design change only**.
The content, routes, i18n, case studies and checks stay as they are. Read `CLAUDE.md`, `docs/decisions.md`,
`design-references/tokens.md` and `src/styles/tokens.css` before you touch anything.

## 0. Ground rules for this task
- Work on a new branch `v5-champagne`, created from `v4-design`. Don't touch `v4-design` or `redesign-2026`.
- **Content is frozen.** Don't edit any text in `src/data/site.ts`, `src/i18n/ui.ts` or `src/content/projects/**`,
  except the label changes listed in section 4. The design adapts to the content. Never shorten copy to fit a layout.
- Every existing guardrail still applies: facts only from the CVs + `docs/decisions.md`, EN/FR twins, no TODOs in
  production, banned list, a11y, Lighthouse budgets, effects kill switch and reduced motion.
- This task deliberately overrides some design rules in `CLAUDE.md`. Section 1 lists exactly which ones. Change those
  rules **in the same commit** as the code, so the repo never contradicts itself.

## 1. Rules this redesign changes (update CLAUDE.md, decisions.md, tokens.md)
Add a `## 2026-10-14 (v5 champagne)` entry at the top of `docs/decisions.md`:
- **Palette.** This replaces the ice-blue charcoal palette. It is black with a warm champagne/bone accent, taken from
  the Arik template the user approved. It is NOT the v4 saffron `#F2A900`: champagne is desaturated and used on thin
  lines and small text, never as a big bright fill. Starting tokens (tune them for contrast; keep the names):
  - `--bg #070605` · `--surface #0F0D0B` (panels) · `--line rgba(233,223,204,.12)`
  - `--text #E9DFCC` (bone) · `--text-muted` at least AA on `--bg` (check `#A6A6A6`-level luminance; warm it, e.g. `#ADA393`)
  - `--accent #C8B07E` (champagne) · `--accent-ink #0A0907` (text on an accent fill)
- **Type.** This replaces "one font family, DM Sans".
  - Display + UI: **Jost**, weights 200/300/400, self-hosted and subset (use `scripts/subset-fonts.py`).
    Headings at 200–300 with tracking -0.02em.
  - Accent: **Cormorant Garamond Italic** 400, used ONLY for the second line or second clause of a heading
    ("Projects with *numbers on them.*"). Never on a single emphasised word, never on body text, at most once per heading.
  - Small labels, nav, buttons and meta: Jost 400, 10.5–11px, uppercase, letter-spacing .2em.
  - Mono stays only inside the ask-mamoun terminal.
  - Update the "Never" list: remove "a second display font" and allow exactly this pairing.
- **Buttons and shapes.** No pills, and no rounded cards. Buttons are sharp rectangles: a 1px champagne border, 44px
  min height, uppercase 11px with .2em tracking, filling champagne on hover with a 0.35s ease-out. A secondary
  button has a `--line` border that turns bone on hover. Radius tokens are 0 for buttons, panels and nav.
  Panels (`--surface` + 1px line) are only for service cards and the two doors. Lists use hairline rows.
- Keep: the text logo "Mamoun El Araki", favicon "ME", no star/khatam, no light theme, dark only,
  native scrolling, the effects kill switch.

## 2. Layout per section (home first; other pages inherit the tokens)
Reference: the prototype the user approved (centred hero, HUD row, hairline project rows, sharp panels, giant
footer name). Match the composition, not pixel values.
1. **Nav**: a compact centred bar (1px line, `--surface` at 82% with backdrop blur). Text logo on the left,
   4 uppercase links, one sharp "Email me" button on the right. Same items and labels as now.
2. **Hero**: copy centred in the screen. The `hero.h1` is split as "I build ML that explains itself," (Jost 200) +
   "and the software that ships it." (Cormorant italic, same size, on its own line). Role/location label above it,
   the employers status line under it, and two buttons (See my work, Download CV).
   - The portrait stays the hero subject (CLAUDE.md "keep the portrait"). Put it behind the text in the Arik way:
     desaturated, darkened to about 35–45% brightness, given a warm duotone toward bone, faded into `--bg` at the
     edges with a radial mask. Keep the existing hero depth effect on it.
   - The bottom HUD row is separated by a hairline: the three `hero.stats` on the left (Jost 200, 30px numbers,
     uppercase captions), a scroll cue in the middle, a live Morocco clock (`Africa/Casablanca`) on the right.
3. **Proof strip**: the `proof` items in one hairline-bounded row. Alternate Jost uppercase with Cormorant italic.
   Static, not a marquee.
4. **About statement**: centred. Scroll-scrub the words from muted to bone (an effect, so it goes behind the kill
   switch). The rolling line stays.
5. **Work**: the heading on the left, the sub on the right. Featured projects become hairline rows in 3 columns
   (meta + title + tags | description + metric | "Case study →"). Keep the before/after result bars (DCE 2h30 → 15 min,
   PitchPoint ECE), redrawn as flat bars: the "before" in bone at 22%, the "after" in champagne, with the numbers
   right-aligned in tabular figures. The metric line is in champagne. The AneuXplain video and card light stay,
   inside the new row style. "More projects" becomes a plain hairline list (title | line | year).
6. **Experience, Capabilities, Now**: hairline rows with a champagne uppercase date/status column. Capabilities are
   three `--surface` panels with champagne `01/02/03`. The ask-mamoun terminal stays an optional disclosure.
7. **Doors**: two `--surface` panels, sharp corners, h3 in Jost 200 + one Cormorant clause.
8. **Footer**: the email big in Jost 200 with a sharp copy button, the giant name "Mamoun *El Araki*" with the
   surname in Cormorant italic champagne, and a hairline footer row.
9. **Case-study pages, /work, /about, /services, /cv, /creative, 404**: no layout changes. Apply the new tokens,
   type and button style only, and check that nothing breaks.

## 3. Motion (all behind `EFFECTS_ENABLED`, `?effects=off` and reduced motion; transform/opacity only)
Keep the existing effects and restyle them. Add only these:
- a hairline that grows to champagne across a project row on hover (0.7s)
- the arrow on buttons nudging 4px on hover
- the statement word scrub (section 2.4)
Don't add a fade-up on every element, and don't add a preloader.

## 4. Allowed copy edits (EN + FR together, via `docs/sops/edit-copy.md`)
None to the facts. Only: splitting each h1/h2 into the two spans the serif accent needs, done in markup, with
the text unchanged. If a heading can't be split naturally, leave it all in Jost.

## 5. Done means
1. `npm run check` passes (update `scripts/check-tokens.mjs` / Stylelint if they hard-code the old palette or fonts).
2. `npm run check:visual`: the baselines WILL change. Show me the diff images for home, work, aneuxplain, about, cv
   and 404 at 1440 and 390, in EN, plus home in FR. Don't update the baselines until I say OK.
3. Contrast table in `design-references/tokens.md` recomputed for every text token on `--bg` and `--surface`.
4. `npm run check:perf` within budgets (two font families: subset them, preload only Jost 300).
5. Screenshots of the home page with `?effects=off` and with reduced motion: same content, nothing hidden.
6. A short report: tokens before → after, rules changed in CLAUDE.md, files touched, anything you couldn't match.
