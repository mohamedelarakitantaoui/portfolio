---
paths: ["src/styles/**", "src/**/*.astro"]
---
# Styles

- Use tokens only: `var(--…)` from `src/styles/tokens.css` for colour, background, border colour, fill, font-family,
  font-size, z-index and transition-duration. Need a new value? Add a token to `tokens.css` and to
  `design-references/tokens.md` (the sync check compares them). Stylelint fails on raw values and hex outside tokens.
- No `!important`. The only exceptions live in `base.css` (`[hidden]`, `.sr-only`, reduced motion) with a
  `stylelint-disable-next-line` comment that says why.
- No fixed heights on text containers (`height`, `max-height` on anything holding text). Use `min-height`, padding
  or intrinsic sizing; text must be free to wrap, especially in French.
- Intrinsic layout first: `clamp()`, `minmax(0, 1fr)`, `flex-wrap`, `min-width: 0`, `overflow-wrap: anywhere` on long
  tokens (emails, URLs). Add a media query only when content breaks.
- Animate only `transform` and `opacity` (paint-only extras like a radius are allowed if they cause no layout).
- Focus must always be visible: never `outline: none` without a replacement `:focus-visible` style.
- Contrast: every text/background pair passes WCAG AA (4.5:1 body, 3:1 large text and UI). Muted text on dark is
  never darker than `#A6A6A6`. Saffron on the light "paper" state is `--paper-accent`, not `--accent`.
