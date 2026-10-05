# design-tokens.md: Stage 5, "Marrakech editorial"

## The accent, with its reason
**Terracotta from the ramparts of Marrakech, *la ville rouge*.** The city's walls are
the reason the accent exists. Every neutral below is that red pulled toward black (ink)
or toward lime plaster (bone), so the greys read warm and chosen, not default.

Your starting value `#C4532D` measures **4.27:1 on the ink background**, which fails AA
for normal-size text. So it is split in two:

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--accent-wall` | `#C4532D` | the star, giant-word star, rules, focus ring, graphics (non-text) | 4.27 on ink-0 (≥ 3:1 non-text ✓) |
| `--accent` | `#D0603A` | small accent text, chapter labels, button fill | 5.00 on ink-0 ✓ · 4.72 on ink-1 ✓ |
| `--accent-hover` | `#E07048` | hover/active | 6.08 on ink-0 ✓ |
| `--accent-ink` | `#0F0D0C` | text on accent buttons | 5.00 on `--accent` ✓ |

Accent usage: CTAs, the star, chapter numbers, **one highlight per screen**. Never
large fills, never gradients.

## Colour: dark (default)

| Token | Hex | Role | vs text |
|---|---|---|---|
| `--ink-0` | `#0F0D0C` | page background (deep band) | bone 15.63 ✓ |
| `--ink-1` | `#181412` | tint band (alternating sections) | bone 14.75 ✓ |
| `--ink-2` | `#221C19` | raised surfaces (terminal, palette, sidebar) | bone 13.57 ✓ |
| `--bone-0` | `#EDE6DA` | primary text | — |
| `--bone-1` | `#A39A90` | muted text (meta, captions, body-secondary) | 7.00 ink-0 · 6.61 ink-1 · 6.07 ink-2 ✓ |
| `--bone-2` | `#9A9087` | quietest text allowed (mono labels) | 6.20 · 5.85 · 5.38 ✓ |
| `--bone-unlit` | `#6A6058` | statement words before the scroll highlight. **Large text only (≥ 28px)** | 3.16 (≥ 3:1 large ✓) |
| `--line` | `rgba(237,230,218,.10)` | hairlines | decorative |
| `--line-strong` | `rgba(237,230,218,.22)` | hover hairline, tag outlines | decorative (~1.9:1) |
| `--line-input` | `#6A6058` | form-field and button outlines (UI boundaries) | 3.16 on ink-0 (≥ 3:1 non-text ✓) |

No text colour in the system goes below 4.5:1 at body size. The old site's `#8FA3D1`
on white (2.25:1) has no equivalent here.

## Colour: light (ships only because it passes; toggle in header)
| Token | Hex | Check |
|---|---|---|
| bg `--bone-0` / band `--bone-band` | `#EDE6DA` / `#E4DBCC` | |
| text `--ink-0` | `#0F0D0C` | 15.63 ✓ |
| muted | `#625A52` | 5.46 on bone · 4.93 on band ✓ |
| accent (text + button fill) | `#9E3B1C` | 5.47 on bone ✓; bone text on it 5.47 ✓ |
| star / graphics | `#C4532D` | 3.66 on bone (non-text ✓) |
Default = dark (always, on first visit). The toggle saves the choice to localStorage. Shipped after dark QA; axe + contrast audit passes on 10 pages.

## Type
| Role | Family | Settings |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, OFL, `@fontsource-variable`) | wght 600-700, opsz 96 at display sizes, tracking **-0.05em**, line-height **0.95** |
| Body | **DM Sans** (variable, OFL) | 400/500, 1.6 line-height, max 68ch |
| Labels / meta | **JetBrains Mono** | 500, 12-13px, uppercase, tracking +0.08em |
| Arabic | **IBM Plex Sans Arabic** | 400/600, loaded on `lang="ar"` only |

Why Bricolage over Cabinet/Clash: OFL and npm-installable (self-hosted, subsettable);
it covers **ğ ç ş** for "Boğaziçi"; the opsz axis gets tighter and more characterful
at poster sizes. Cabinet Grotesk (Fontshare licence) is the fallback if you prefer
its look. `TODO(user): Bricolage OK?`
All fonts self-hosted, `font-display: swap`, latin + latin-ext subsets, size-adjusted
fallbacks to avoid layout shift. 2 families + 1 mono (+ Arabic on AR pages only).

**Scale** (`clamp(min, fluid, max)`):
| Token | Value | Use |
|---|---|---|
| `--fs-hero-word` | `clamp(5.5rem, 24vw, 26rem)` | M A M ✦ U N |
| `--fs-giant` | `clamp(3rem, 11vw, 11rem)` | footer name, "Next project" |
| `--fs-h1` | `clamp(2.75rem, 7vw, 6.5rem)` | page h1 |
| `--fs-h2` | `clamp(2rem, 4.6vw, 4.5rem)` | section h2 |
| `--fs-statement` | `clamp(1.75rem, 3.4vw, 3.25rem)` / 500 / lh 1.15 / -0.03em | statement |
| `--fs-h3` | `clamp(1.25rem, 1.8vw, 1.625rem)` | card titles |
| `--fs-stat` | `clamp(2.5rem, 5vw, 4.5rem)` | rail and outcome numbers |
| `--fs-body` | `1.0625rem` (17px) | body |
| `--fs-small` | `0.875rem` | captions |
| `--fs-label` | `0.75rem` mono | section labels, chapter labels, tags |

Hero `h1` (the name) is **not** the giant word: it's `--fs-h3`-size bold in the
mid-left corner. The headline under it is `clamp(1.75rem, 3vw, 2.75rem)`.

## Space, radius, lines
- Spacing scale: `4 8 12 16 24 32 48 64 96 128` → `--s-1 … --s-10`
- Section padding: `--s-9` (96) desktop / `--s-7` (48) mobile; gutter 16px mobile, 32px tablet, 48px desktop; max content 1360px
- Radius: `--r-pill: 999px` (buttons, tags, the Menu pill) · `--r-lg: 20px` (terminal, palette, case-study cover) · `0` for everything else. **Lists are hairline rows, not cards.**
- Hairlines: 1px `--line`; list rows separated by top border only
- No shadows except the floating Menu pill and the palette (`0 8px 32px rgba(0,0,0,.45)`); no blur/glass

## The six moves, concretely
1. **Sandwich hero:** back `M A M ✦ U N` in `--bone-0` at **opacity .92** with letter-spacing `.3em` (`.4em` < 600px) + equal padding-left; the ✦ is an inline SVG in `--accent-wall`, rotating 1 turn / 60 s. Middle: portrait (AVIF/WebP, `fetchpriority=high`, width/height set). Front: corner UI. The headline lives mid-left **below the word's baseline at ≥ 1024px and under the portrait at < 1024px**, never over letters. **No gradient on the word** (banned tell on the old site). Second, smaller sandwich: "SALAM" behind the star on `/contact` and in the footer CTA.
2. **One world + one accent:** above.
3. **Poster corners:** hero exactly as content.md §2.1. Below the hero: the DCE card is the large cell (symmetry break), the statement is offset to columns 3-11, bands alternate `ink-0` / `ink-1`.
4. **Symbol, the khatam (8-point star from two squares):** logo, favicon (SVG + 32px PNG), list bullets (8px), section dividers (`─── ✦ ───`), preloader, 404, OG images, statement glyphs, "Now building" card.
5. **Type with character:** above.
6. **Editorial details:** label + arrow above every h2 (`SELECTED WORK →` mono, `--bone-2`); `[01]` numbering for capabilities, packs and architecture rows; `Chapter 01` mono in `--accent` for case studies; pills for buttons and tags; one marquee (proof strip, 60 s loop, pauses on hover and focus, static under reduced motion); giant name in the footer.

## Motion (Lenis + GSAP, wired through `gsap.ticker` as the skill specifies)
Tokens: `--ease-out: cubic-bezier(.22,1,.36,1)` · `--dur-1: .4s` · `--dur-2: .8s` · `--dur-3: 1.2s` · stagger `.03s`/char, `.08s`/line.

Picked (6 of the vocabulary, nothing else moves):
| # | Motion | Where | Reduced-motion branch |
|---|---|---|---|
| 1 | Preloader: star draws (stroke-dashoffset) ≤ 0.9 s, sessionStorage skip, **overlay only, content already rendered beneath** | first visit | skipped |
| 2 | Hero settle: portrait scale 1.06 → 1 (1.2 s) + giant-word letter stagger (.03 s) | hero | static |
| 3 | Headline line-mask reveal (SplitText lines, yPercent 100 → 0) | h1/h2 on enter, **not** body copy | instant |
| 4 | Scroll-scrubbed word highlight `--bone-unlit` → `--bone-0` | home statement only | fully lit |
| 5 | Sticky title column + cards scroll; nav collapses to floating "Menu ✦" pill after the hero | home work, global nav | sticky stays (it's layout); pill appears without slide |
| 6 | Signature: ask-mamoun terminal typing the retrieval trace (20 ms/char, skippable with any key) | Now/Lab | prints instantly |

Rules: all content is in the HTML before JS; no element fades up by default; body copy
never animates; `ScrollTrigger.refresh()` after fonts + images; `lenis.scrollTo` for
anchors; `data-lenis-prevent` on terminal, palette and menu.

## Components (anatomy)
- **Button (pill):** 48px tall (≥ 44 tap), 0 24px padding, DM Sans 500 15px. Primary = `--accent` fill + `--accent-ink` text; secondary = 1px `--line-input` outline + bone text; arrow icon nudges 4px on hover.
- **Tag:** mono 12px uppercase, 1px `--line-strong` pill, 28px tall (not interactive).
- **Section label:** `LABEL →` mono 12px `--bone-2`, 16px above the h2.
- **List row:** `[01]` mono `--accent` · title (h3) · sentence (`--bone-1`) · mono stack, one row per item, top hairline, hover: hairline turns `--line-strong`, title shifts 8px.
- **Project card:** cover (16:10, `--r-lg`, clip-path reveal off), then `01` + title + role, **big number in `--fs-stat`** + caption, constraint line, tags, "Case study →". No box around the text.
- **Stat:** number `--fs-stat` Bricolage 600, caption `--bone-1` 14px, hairline above.
- **Case-study sidebar:** sticky at `top: 96px`, `--ink-1` band, definition list rows with hairlines, big number at the bottom.
- **Terminal:** `--ink-2`, `--r-lg`, JetBrains Mono 14px, prompt `$` in `--accent`, scores right-aligned, live region `aria-live="polite"`, input labelled.
- **Command palette:** `<dialog>`, `--ink-2`, 640px max, focus trapped, results as `role="listbox"`.
- **Focus ring:** 2px `--accent-wall` + 2px offset, everywhere.

## Breakpoints
360 (min) · 600 · 768 · 1024 · 1440. Mobile-first. Hero at < 768: word top, portrait
centred, name/headline/CTAs below, stat rail becomes a 3-column row, "Now building" card
full-width at the bottom. `overflow-x: clip` on hero, marquee and footer-name sections.

## Banned-tell self-check (target: 0, fail at 3)
Inter/Roboto display ✗ · purple ✗ · gradient text ✗ (removed from MAMOUN) · centred
hero + 3 icon cards ✗ · identical rounded cards ✗ (hairline rows) · default Tailwind ✗
(no Tailwind) · glass/neon ✗ · emoji icons ✗ (SVG star) · identical fade-up ✗ ·
blank first screen ✗ · Coming soon ✗ · stock people ✗ · invented metrics ✗ (TODO
markers) · lorem ✗. **Projected count: 0.**

## Changes made during the build (QA-driven)
- `--accent-on-surface: #e07048` added: plain `--accent` measured 4.34:1 on `--ink-2` (terminal), as predicted above.
- Body font switched to DM Sans **wght** axis only (63 → 37 KB); only the display font is preloaded.
- CSS is inlined per page (`inlineStylesheets: 'always'`): mobile FCP 2.2 s → ~1.5 s.
- Motion loads after `load` + idle; Lenis only on fine pointers; headings split lazily on reveal.
  AneuXplain mobile TBT 1,100 ms → 0 ms.
- Hero intro animates transform only (no opacity), so the portrait (the LCP image) paints at once.
- 1024–1279 px: smaller portrait with tighter side fade, so the shoulders never sit under text.
