# Design tokens: charcoal and ice blue

Source of truth: src/styles/tokens.css. The user requested replacing the gold accent
with a colour that accompanies black. Ice blue comes from the real portrait's shirt.

Page #0C0C0C; bands #111111; surfaces #181818. Text #EFEFEF, muted #B3B3B3,
quiet #A6A6A6. Accent #A7C7FF, hover #C4D9FF, dark text #0C0C0C.
The portrait backdrop is #263449; the working-method section is #182333.
The legacy paper token #F2F0EA is retained but its scroll effect is not mounted.

One type family: DM Sans, with a monospace font only in the terminal. The name uses
a dedicated responsive size; body and UI use the established scale. Container
1750px; intrinsic grids and 24px mobile gutters. Native scrolling, transform-only
motion, reduced-motion and effects-off fallbacks.

All text and control contrast is checked in rendered pages with axe.
The token table and the exact palette assertions remain enforced by check-tokens.

## Token table
| Token | Value | Note |
|---|---|---|
| `--ink-0` | `#0c0c0c` | |
| `--ink-1` | `#111111` | |
| `--ink-2` | `#181818` | |
| `--white` | `#ffffff` | |
| `--bone-0` | `#efefef` | |
| `--bone-1` | `#b3b3b3` | |
| `--bone-2` | `#a6a6a6` | |
| `--line` | `rgba(255, 255, 255, 0.1)` | |
| `--line-strong` | `rgba(255, 255, 255, 0.2)` | |
| `--line-input` | `#6b6b6b` | |
| `--accent` | `#a7c7ff` | |
| `--accent-hover` | `#c4d9ff` | |
| `--accent-ink` | `#0c0c0c` | |
| `--accent-surface` | `#182333` | |
| `--portrait-surface` | `#263449` | |
| `--accent-line` | `rgba(167, 199, 255, 0.3)` | |
| `--fs-name` | `clamp(3.5rem, 9.2vw, 10.5rem)` | |
| `--fs-feature` | `clamp(2.75rem, 4.5vw, 5rem)` | |
| `--fs-index` | `clamp(3rem, 5vw, 6rem)` | |
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
| `--font-body` | `'DM Sans Variable', 'DM Sans Fallback', 'Segoe UI', Arial, sans-serif` | |
| `--font-code` | `'JetBrains Mono Variable', ui-monospace, 'Cascadia Mono', Consolas, monospace` | |
| `--font-arabic` | `'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif` | |
| `--fs-display` | `clamp(3.25rem, 1.6rem + 3.9vw, 5.75rem)` | |
| `--fs-h1-hero` | `clamp(2.5rem, 1.2rem + 2.6vw, 4rem)` | |
| `--fs-h2` | `clamp(2.5rem, 1.2rem + 3.2vw, 4.5rem)` | |
| `--fs-statement` | `clamp(2.125rem, 1rem + 2.8vw, 4rem)` | |
| `--fs-card` | `clamp(1.625rem, 1.2rem + 0.9vw, 2.125rem)` | |
| `--fs-row` | `clamp(1.25rem, 1.1rem + 0.3vw, 1.375rem)` | |
| `--fs-sub` | `clamp(1.5rem, 1.3rem + 0.4vw, 1.75rem)` | |
| `--fs-lede` | `clamp(1.125rem, 1.05rem + 0.2vw, 1.25rem)` | |
| `--fs-body` | `1rem` | |
| `--fs-small` | `0.875rem` | |
| `--fs-label` | `0.8125rem` | |
| `--fs-giant` | `clamp(4.5rem, 24vw, 30rem)` | |
| `--fs-2xs` | `0.625rem` | |
| `--fs-xs` | `0.75rem` | |
| `--fs-tag` | `0.8125rem` | |
| `--fs-nav` | `0.9375rem` | |
| `--fs-md` | `1.0625rem` | |
| `--fs-lg` | `1.25rem` | |
| `--fs-xl` | `1.5rem` | |
| `--fs-marker` | `0.85em` | |
| `--fs-hero-word` | `21.5vw` | |
| `--fs-diagram-group` | `10px` | |
| `--fs-diagram-title` | `12.5px` | |
| `--fs-diagram-sub` | `11px` | |
| `--track-display` | `-0.065em` | |
| `--track-h` | `-0.05em` | |
| `--track-body` | `-0.02em` | |
| `--track-label` | `0.02em` | |
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
| `--r-pill` | `999px` | |
| `--r-img` | `10px` | |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | |
| `--dur-1` | `0.3s` | |
| `--dur-2` | `0.6s` | |
| `--dur-3` | `0.9s` | |
| `--header-h` | `76px` | |
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
