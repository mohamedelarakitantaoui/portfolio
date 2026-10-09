# design-tokens.md

> ## v4, 2026-10-09: "Calm dark editorial" (supersedes everything below)
> Branch `v4-design`. The quality level of a designer-made dark portfolio, built from measured numbers and our own
> layout. No star mark anywhere (logo, favicon "ME", bullets, 404, OG images); no light theme; no preloader;
> no smooth-scroll library; one font family.
>
> **Colour** (contrast measured, WCAG AA everywhere)
>
> | Token | Value | on page `#0C0C0C` · panel `#111111` · surface `#181818` |
> |---|---|---|
> | headings | `#FFFFFF` | 19.56 · 18.88 · 17.76 |
> | text | `#EFEFEF` | 17.01 · 16.42 · 15.44 |
> | muted | `#B3B3B3` | 9.33 · 9.01 · 8.47 |
> | quiet (darkest grey allowed) | `#A6A6A6` | 8.04 · 7.76 · 7.29 |
> | accent: primary button, small labels, one highlight per screen | `#F2A900` | 9.73 · 9.40 · 8.84 |
> | outline pills, inputs | `#6B6B6B` | 3.67 · 3.54 · 3.33 (UI, ≥ 3:1) |
> | hairlines | `rgba(255,255,255,.10)` | decorative |
> | ink on accent / page ink on white pill | | 9.73 / 19.56 |
>
> **Type:** DM Sans only (self-hosted subset, 400/500/600/700). JetBrains Mono survives only inside the ask-mamoun
> terminal screen. Display 92 / 700 / 0.94 / −0.065em · h2 72 / 700 / 1.02 / −0.05em · statement 64 / 700 / 1.2 ·
> card 34 / 500 / 1.2 · rows 22 / 500 · sub-heads 28 / 700 · lead 20 / 500 / 1.7 · body 16 / 500 / 1.6 / −0.02em ·
> label 13–14 / 600 / uppercase / 0.02em + ↗ · capability numbers 28 / 400 / muted. Everything clamps down to
> ≈ 48–56 display, 40 h2, 16 body at 390px.
>
> **Layout:** 1750px container, 24px column gap. Side padding 24px on phones, `clamp(12px, 2.6vw, 48px)` from 1024px,
> 12px at ≥ 1920 (the measured value; at 1440 a 12px page edge was too tight, so it scales). Sections
> `clamp(72px, 7.5vw, 144px)`. Work: 4/12 sticky column + 7/12 cards from column 6.
>
> **Shape:** images 10px radius, pills 999px. Primary = saffron pill; secondary = text link + ↗; header CTA = white pill.
>
> **Motion:** a 16px fade-rise once per block below the fold (IntersectionObserver, skipped under reduced motion,
> visible without JS, in print and after any jump); 1.03 image scale on hover. No preloader, no scroll-jacking,
> no letter animation.
>
> **Card media rule:** a real app loop or screenshot; if none exists yet, the project's two real numbers as a
> before/after bar pair (DCE Scraper 2h30 → 15 min, PitchPoint ECE 0.0464 → 0.0038). Never an illustration.

## History: Saffron (2026-10-05)

> ## Rebrand 2026-10-05: "Saffron" (supersedes the colour and symbol sections below)
> The clay orange on cream and the filled 8-point star read too close to Claude/Anthropic's brand, so both
> were replaced everywhere: tokens, logo, favicon, preloader, bullets, dividers, 404, OG images, light theme.
>
> **Accent with a reason:** Taliouine saffron, the spice grown in the Souss south of Marrakech.
> **Mark:** one continuous {8/3} star polygon, stroke only (`50,10 78.3,78.3 10,50 78.3,21.7 50,90 21.7,21.7 90,50 21.7,78.3`),
> never filled. Stroke scales with size (`weight` in viewBox units); marks under ~20px use a 1.5px non-scaling stroke.
> It still replaces the O in M A M _ U N.
>
> | Token | Dark | contrast (bg · band · surface) | Light | contrast |
> |---|---|---|---|---|
> | bg / band / surface | `#111111` / `#191919` / `#222222` | | `#F4F4F1` / `#EAEAE6` / `#FFFFFF` | |
> | text | `#F2F0EA` | 16.57 · 15.43 · 13.96 | `#111111` | 17.14 · 15.66 · 18.88 |
> | muted | `#A3A39E` (brief's `#8A8A85` = 4.59 on surface, lightened) | 7.45 · 6.94 · 6.28 | `#55554F` | 6.81 · 6.22 · 7.50 |
> | quiet | `#9C9C97` | 6.85 · 6.38 · 5.77 | `#5E5E58` | 5.92 · 5.41 · 6.53 |
> | unlit (large text only) | `#74746F` | 4.02 · 3.74 · 3.39 | `#84847E` | 3.41 · 3.12 · 3.76 |
> | field/button outline | `#6E6E69` | 3.68 · 3.43 · 3.10 | `#7E7E78` | 3.71 · 3.39 · 4.08 |
> | accent text, mark, focus | `#F2A900` | 9.40 · 8.75 · 7.92 | `#7F5900` (saffron darkened) | 5.72 · 5.23 · 6.30 |
> | button fill / text | `#F2A900` / `#111111` | 9.40 | `#F2A900` / `#111111` | 9.40 |
>
> No cream or beige backgrounds and no orange anywhere. Verified on 26 pages × 2 widths × 2 themes:
> axe 0 serious, 0 text pairs under AA.

## Original v1 of this file: "Marrakech editorial"

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
