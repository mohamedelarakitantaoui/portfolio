# Design tokens (v4, measured system)

The source of truth is `src/styles/tokens.css`. This page says the same thing in plain words, and the table at the
bottom is checked against `tokens.css` by `npm run check` (`scripts/check-tokens.mjs`): if a value changes in one
file and not the other, the check fails. Change both together, on purpose.

## In plain words
- **Colour.** Page `#0C0C0C`, hero panel and bands `#111111`, raised surfaces `#181818`. Text `#EFEFEF`, headings
  `#FFFFFF`, muted `#B3B3B3`, quietest grey `#A6A6A6` (never darker on dark: AA). Hairlines white at 10% (20% strong).
  One accent, Taliouine saffron `#F2A900`: the primary button, small labels and one highlight per screen. The
  Experience "paper" state uses `#F2F0EA` with ink `#111111`, muted `#4A4A45` and a darker saffron `#765300`.
- **Contrast (WCAG AA, measured).** On `#0C0C0C` / `#111111` / `#181818`: headings 19.6 / 18.9 / 17.8, text
  17.0 / 16.4 / 15.4, muted 9.3 / 9.0 / 8.5, quiet 8.0 / 7.8 / 7.3, saffron 9.7 / 9.4 / 8.8, outline pills 3.7 / 3.5 /
  3.3 (UI). Ink on saffron 9.7. On paper: ink 16.6, muted 7.8, quiet 6.1, accent 6.1.
- **Type.** One family, DM Sans, weights 400/500/600/700 (the mono lives only inside the ask-mamoun terminal).
  Desktop → 390px: display 92 → 52 (700, line-height 0.94, −0.065em), h2 72 → 40 (700, 1.02, −0.05em), statement
  64 → 34 (700, 1.2), card titles 34 → 26 (500), list rows 22 → 20 (500), sub-heads 28 → 24 (700), lead 20 → 18
  (500, 1.7), body 16 (500, 1.6, −0.02em), labels 13 → 14 (600, uppercase, +0.02em) followed by ↗, capability
  numbers 28 (400, muted). Descriptive text is 16px; only labels, meta lines and tags are 13–14px.
- **Layout.** Container 1750px; side padding 24px on phones, `clamp(12px, 2.6vw, 48px)` from 1024px, 12px from 1920px.
  12-column grid, 24px gap. Section padding `clamp(72px, 7.5vw, 144px)`. Work section: 4/12 sticky column + cards
  from column 6 (7/12). Experience and case studies use the same 4 + 7 split.
- **Shape.** Images and media 10px radius; buttons and tags are pills (999px). Primary = saffron pill; secondary =
  text link + ↗; header CTA = white pill.
- **Motion.** 0.3 / 0.6 / 0.9 s, `cubic-bezier(0.22, 1, 0.36, 1)`. Transform and opacity only.

## Token table (checked against tokens.css)
| Token | Value | Note |
|---|---|---|
| `--ink-0` | `#0c0c0c` | page |
| `--ink-1` | `#111111` | hero panel, bands |
| `--ink-2` | `#181818` | raised surface: media frames, terminal |
| `--white` | `#ffffff` | headings: 19.6 page · 18.9 panel · 17.8 surface |
| `--bone-0` | `#efefef` | text: 17.0 · 16.4 · 15.4 |
| `--bone-1` | `#b3b3b3` | muted: 9.3 · 9.0 · 8.5 |
| `--bone-2` | `#a6a6a6` | quietest allowed: 8.0 · 7.8 · 7.3 |
| `--line` | `rgba(255, 255, 255, 0.1)` |  |
| `--line-strong` | `rgba(255, 255, 255, 0.2)` |  |
| `--line-input` | `#6b6b6b` | UI boundaries (inputs, outline pills): 3.7 · 3.5 · 3.3 |
| `--accent` | `#f2a900` | 9.7 · 9.4 · 8.8 |
| `--accent-hover` | `#ffc233` |  |
| `--accent-ink` | `#0c0c0c` | text on accent fill: 9.7 |
| `--paper` | `#f2f0ea` |  |
| `--paper-ink` | `#111111` |  |
| `--paper-muted` | `#4a4a45` |  |
| `--paper-quiet` | `#5a5a55` |  |
| `--paper-accent` | `#765300` |  |
| `--paper-line` | `rgba(17, 17, 17, 0.14)` |  |
| `--paper-line-strong` | `rgba(17, 17, 17, 0.26)` |  |
| `--paper-line-input` | `#8a8a85` |  |
| `--bg` | `var(--ink-0)` |  |
| `--bg-band` | `var(--ink-1)` |  |
| `--surface` | `var(--ink-2)` |  |
| `--text` | `var(--bone-0)` |  |
| `--heading` | `var(--white)` |  |
| `--text-muted` | `var(--bone-1)` |  |
| `--text-quiet` | `var(--bone-2)` |  |
| `--font-body` | `'DM Sans Variable', 'DM Sans Fallback', 'Segoe UI', Arial, sans-serif` |  |
| `--font-code` | `'JetBrains Mono Variable', ui-monospace, 'Cascadia Mono', Consolas, monospace` |  |
| `--font-arabic` | `'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif` |  |
| `--fs-display` | `clamp(3.25rem, 1.6rem + 3.9vw, 5.75rem)` | 92 → 52 |
| `--fs-h1-hero` | `clamp(2.5rem, 1.2rem + 2.6vw, 4rem)` | 64 → 40 |
| `--fs-h2` | `clamp(2.5rem, 1.2rem + 3.2vw, 4.5rem)` | 72 → 40 |
| `--fs-statement` | `clamp(2.125rem, 1rem + 2.8vw, 4rem)` | 64 → 34 |
| `--fs-card` | `clamp(1.625rem, 1.2rem + 0.9vw, 2.125rem)` | 34 → 26 |
| `--fs-row` | `clamp(1.25rem, 1.1rem + 0.3vw, 1.375rem)` | 22 → 20 |
| `--fs-sub` | `clamp(1.5rem, 1.3rem + 0.4vw, 1.75rem)` | 28 → 24 |
| `--fs-lede` | `clamp(1.125rem, 1.05rem + 0.2vw, 1.25rem)` | 20 → 18 |
| `--fs-body` | `1rem` | 16 |
| `--fs-small` | `0.875rem` | 14 |
| `--fs-label` | `0.8125rem` | 13 → 14 at desktop |
| `--fs-giant` | `clamp(4.5rem, 24vw, 30rem)` | MAMOUN behind the portrait |
| `--fs-2xs` | `0.625rem` | 10: numbered pins on the report pages |
| `--fs-xs` | `0.75rem` | 12: terminal prompt, video captions, palette kind |
| `--fs-tag` | `0.8125rem` | 13: tags, toggles, terminal text |
| `--fs-nav` | `0.9375rem` | 15: nav links, buttons |
| `--fs-md` | `1.0625rem` | 17: logo, palette input, CV entry titles |
| `--fs-lg` | `1.25rem` | 20: FAQ questions |
| `--fs-xl` | `1.5rem` | 24: numbers in the capability previews |
| `--fs-marker` | `0.85em` | list markers, relative to their text |
| `--fs-hero-word` | `21.5vw` | MAMOUN on phones (desktop: min(24vw, 34svh, 30rem) in Hero.astro) |
| `--fs-diagram-group` | `10px` | SVG diagram labels, in viewBox units |
| `--fs-diagram-title` | `12.5px` |  |
| `--fs-diagram-sub` | `11px` |  |
| `--track-display` | `-0.065em` |  |
| `--track-h` | `-0.05em` |  |
| `--track-body` | `-0.02em` |  |
| `--track-label` | `0.02em` |  |
| `--s-1` | `4px` |  |
| `--s-2` | `8px` |  |
| `--s-3` | `12px` |  |
| `--s-4` | `16px` |  |
| `--s-5` | `24px` |  |
| `--s-6` | `32px` |  |
| `--s-7` | `48px` |  |
| `--s-8` | `64px` |  |
| `--s-9` | `96px` |  |
| `--s-10` | `128px` |  |
| `--max` | `1750px` |  |
| `--gutter` | `24px` |  |
| `--grid-gap` | `24px` |  |
| `--section-y` | `clamp(72px, 7.5vw, 144px)` |  |
| `--measure` | `60ch` |  |
| `--r-pill` | `999px` |  |
| `--r-img` | `10px` |  |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |  |
| `--dur-1` | `0.3s` |  |
| `--dur-2` | `0.6s` |  |
| `--dur-3` | `0.9s` |  |
| `--header-h` | `76px` |  |
| `--z-raised` | `1` | content above a decorative layer in the same section |
| `--z-portrait` | `2` | hero photo over the giant word |
| `--z-hero-text` | `3` | hero text and proof over the photo |
| `--z-preview` | `20` | capability hover previews |
| `--z-header` | `30` |  |
| `--z-pill` | `40` | floating Menu pill |
| `--z-menu` | `60` | full-screen menu |
| `--z-skip` | `100` | skip link |
| `--black` | `#000000` | video letterbox |
| `--page-white` | `#ffffff` | printed report pages shown as images |
| `--mask-solid` | `#000000` | opaque stop in CSS masks (only alpha matters) |
| `--dur-instant` | `0.01ms` | reduced motion: transitions end at once |
