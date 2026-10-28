# Design tokens: black + champagne (v5)

Source of truth: src/styles/tokens.css. v5 (2026-10-14) replaces the ice-blue charcoal palette with the Arik
direction the user approved (`v5-prototype.html` in this folder): near-black, bone text, and a desaturated
champagne used on thin lines and small text, never as a big bright fill. It is not the v4 saffron.

Page #070605; bands #0B0A08; panels #0F0D0B. Heading #F2EBDD, text #E9DFCC, muted #BEB4A3,
quiet #B0A696. Accent (champagne) #C8B07E, hover #D9C49A, dark text on champagne #0A0907.
Lines are bone at 12% and 22%; UI borders #75695A. The "before" result bar is bone at 22%, the "after" bar champagne.
Light screenshots are dimmed to 75% in a 1px line frame. The legacy paper token #F2F0EA is retained but unused.

Type: Jost for display and UI (headings at 200–300, tracking -0.02em; paragraphs and lists 400 at 16–17px;
500 only for <strong>); Cormorant Garamond Italic 400
only for the second clause of a heading; labels, nav, buttons and meta in Jost 400 at 10.5–11px, uppercase, .2em.
The mono font exists only in the terminal. Shapes are sharp: every radius token is 0. Container 1750px;
intrinsic grids and 24px mobile gutters; every section uses --section-y. Native scrolling, transform/opacity-only
motion, reduced-motion and effects-off fallbacks.

## Contrast (WCAG 2.x, computed)
AA needs 4.5 for body text, 3 for large text and UI boundaries. Every text token passes AAA (7) on all three
surfaces. Rendered pages are also checked with axe (`npm run check`).

| Token | Value | on `--bg` | on `--bg-band` | on `--surface` | Use |
|---|---|---|---|---|---|
| `--heading` (`--white`) | `#f2ebdd` | 17.1 | 16.7 | 16.4 | headings |
| `--text` (`--bone-0`) | `#e9dfcc` | 15.3 | 15.0 | 14.7 | body text |
| `--text-muted` (`--bone-1`) | `#beb4a3` | 9.9 | 9.7 | 9.5 | secondary text |
| `--text-quiet` (`--bone-2`) | `#b0a696` | 8.4 | 8.2 | 8.1 | meta, captions (floor: `#A6A6A6` luminance) |
| `--accent` | `#c8b07e` | 9.6 | 9.4 | 9.2 | labels, metric lines, status columns, links |
| `--accent-hover` | `#d9c49a` | 11.9 | 11.6 | 11.4 | hover text |
| `--line-input` | `#75695a` | 3.8 | 3.7 | 3.6 | UI boundaries (needs 3:1) |
| `--accent-ink` on `--accent` | `#0a0907` | 9.4 (on the champagne fill) | | | button text on hover |
| `--accent-ink` on `--accent-hover` | `#0a0907` | 11.7 | | | |

## Token table
| Token | Value | Note |
|---|---|---|
| `--ink-0` | `#070605` | |
| `--ink-1` | `#0b0a08` | |
| `--ink-2` | `#0f0d0b` | |
| `--white` | `#f2ebdd` | |
| `--bone-0` | `#e9dfcc` | |
| `--bone-1` | `#beb4a3` | |
| `--bone-2` | `#b0a696` | |
| `--line` | `rgba(233, 223, 204, 0.12)` | |
| `--line-strong` | `rgba(233, 223, 204, 0.22)` | |
| `--line-input` | `#75695a` | |
| `--accent` | `#c8b07e` | |
| `--accent-hover` | `#d9c49a` | |
| `--accent-ink` | `#0a0907` | |
| `--accent-surface` | `#13110d` | |
| `--portrait-surface` | `#1a1611` | |
| `--accent-line` | `rgba(200, 176, 126, 0.35)` | |
| `--bar-before` | `rgba(233, 223, 204, 0.22)` | |
| `--dim-screen` | `brightness(0.75)` | |
| `--photo-tone` | `saturate(0.6) sepia(0.14) brightness(0.92)` | |
| `--fs-name` | `clamp(3.375rem, 13vw, 13.125rem)` | |
| `--fs-email` | `clamp(1.625rem, 1rem + 2.6vw, 3rem)` | email headline (footer, /contact) |
| `--fs-feature` | `clamp(2.75rem, 4.5vw, 5rem)` | |
| `--fs-index` | `clamp(3rem, 5vw, 6rem)` | |
| `--fs-poster` | `clamp(3.25rem, 1.25rem + 7vw, 9.5rem)` | case-study poster title |
| `--fs-poster-long` | `clamp(2.75rem, 1rem + 4.6vw, 6.5rem)` | poster titles over 20 characters |
| `--fs-poster-clause` | `0.4em` | Cormorant clause under a poster title |
| `--paper` | `#f2f0ea` | |
| `--paper-ink` | `#111111` | |
| `--paper-muted` | `#4a4a45` | |
| `--paper-quiet` | `#5a5a55` | |
| `--paper-accent` | `#765300` | |
| `--paper-line` | `rgba(17, 17, 17, 0.14)` | |
| `--paper-line-strong` | `rgba(17, 17, 17, 0.26)` | |
| `--paper-line-input` | `#8a8a85` | |
| `--bg` | `var(--ink-0)` | |
| `--bg-band` | `var(--ink-1)` | |
| `--surface` | `var(--ink-2)` | |
| `--text` | `var(--bone-0)` | |
| `--heading` | `var(--white)` | |
| `--text-muted` | `var(--bone-1)` | |
| `--text-quiet` | `var(--bone-2)` | |
| `--nav-surface` | `rgba(15, 13, 11, 0.82)` | |
| `--hero-scrim` | `rgb(7 6 5 / 0.7)` | |
| `--hero-scrim-strong` | `rgb(7 6 5 / 0.85)` | |
| `--font-body` | `'Jost Variable', 'Jost Fallback', 'Century Gothic', 'Segoe UI', Arial, sans-serif` | |
| `--font-accent` | `'Cormorant Garamond Variable', 'Cormorant Fallback', Georgia, 'Times New Roman', serif` | |
| `--font-code` | `'JetBrains Mono Variable', ui-monospace, 'Cascadia Mono', Consolas, monospace` | |
| `--font-arabic` | `'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif` | |
| `--fw-thin` | `200` | |
| `--fw-light` | `300` | |
| `--fw-regular` | `400` | |
| `--fw-medium` | `500` | |
| `--fs-display` | `clamp(3.25rem, 1.6rem + 3.9vw, 5.75rem)` | |
| `--fs-h1-hero` | `clamp(2.5rem, 4.5vw, 5.25rem)` | |
| `--fs-h1-page` | `clamp(2.5rem, 1.2rem + 2.6vw, 4rem)` | |
| `--fs-h2` | `clamp(2.5rem, 1.2rem + 3.2vw, 4.5rem)` | |
| `--fs-statement` | `clamp(2.125rem, 1rem + 2.8vw, 4rem)` | |
| `--fs-card` | `clamp(1.625rem, 1.2rem + 0.9vw, 2.125rem)` | |
| `--fs-row` | `clamp(1.25rem, 1.1rem + 0.3vw, 1.375rem)` | |
| `--fs-sub` | `clamp(1.5rem, 1.3rem + 0.4vw, 1.75rem)` | |
| `--fs-lede` | `clamp(1.125rem, 1.05rem + 0.2vw, 1.25rem)` | |
| `--fs-body` | `clamp(1rem, 0.96rem + 0.12vw, 1.0625rem)` | |
| `--fs-small` | `0.875rem` | |
| `--fs-label` | `0.6875rem` | |
| `--fs-giant` | `clamp(4.5rem, 24vw, 30rem)` | |
| `--fs-2xs` | `0.625rem` | |
| `--fs-xs` | `0.75rem` | |
| `--fs-tag` | `0.8125rem` | |
| `--fs-cap` | `0.65625rem` | |
| `--fs-nav` | `0.9375rem` | |
| `--fs-md` | `1.0625rem` | |
| `--fs-lg` | `1.25rem` | |
| `--fs-xl` | `1.5rem` | |
| `--fs-stat` | `1.875rem` | |
| `--fs-stat-sm` | `clamp(1.25rem, 5.4vw, 1.875rem)` | |
| `--fs-marker` | `0.85em` | |
| `--fs-serif` | `1.02em` | |
| `--fs-hero-word` | `21.5vw` | |
| `--fs-diagram-group` | `10px` | |
| `--fs-diagram-title` | `12.5px` | |
| `--fs-diagram-sub` | `11px` | |
| `--track-display` | `-0.02em` | |
| `--track-h` | `-0.02em` | |
| `--track-body` | `0` | |
| `--track-label` | `0.2em` | |
| `--s-1` | `4px` | |
| `--s-2` | `8px` | |
| `--s-3` | `12px` | |
| `--s-4` | `16px` | |
| `--s-5` | `24px` | |
| `--s-6` | `32px` | |
| `--s-7` | `48px` | |
| `--s-8` | `64px` | |
| `--s-9` | `96px` | |
| `--s-10` | `128px` | |
| `--max` | `1750px` | |
| `--gutter` | `24px` | |
| `--grid-gap` | `24px` | |
| `--section-y` | `clamp(72px, 7.5vw, 144px)` | |
| `--measure` | `60ch` | |
| `--r-btn` | `0` | |
| `--r-img` | `0` | |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | |
| `--dur-1` | `0.3s` | |
| `--dur-2` | `0.6s` | |
| `--dur-3` | `0.9s` | |
| `--dur-btn` | `0.35s` | |
| `--dur-row` | `0.7s` | |
| `--header-h` | `76px` | |
| `--z-behind` | `-1` | |
| `--z-raised` | `1` | |
| `--z-portrait` | `2` | |
| `--z-hero-text` | `3` | |
| `--z-preview` | `20` | |
| `--z-header` | `30` | |
| `--z-pill` | `40` | |
| `--z-menu` | `60` | |
| `--z-skip` | `100` | |
| `--black` | `#000000` | |
| `--page-white` | `#ffffff` | |
| `--mask-solid` | `#000000` | |
| `--dur-instant` | `0.01ms` | |
