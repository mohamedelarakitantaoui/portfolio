---
paths: ["src/scripts/**", "src/components/effects/**"]
---
# Motion

- HTML first: every page is complete and usable without JavaScript. Never hide content in CSS waiting for JS; an
  initial hidden state is set by the effect itself (or scoped under `html.js` / `html.fx-on`).
- Each effect is one file `src/scripts/effects/fx/<name>.ts`, attached with `data-fx="<name>"` and loaded only when
  its element is half a screen away. Removing an effect = delete its file and its `data-fx`.
- Kill switch: `EFFECTS_ENABLED` in `src/config.ts`, `?effects=off`, and `prefers-reduced-motion: reduce` all keep the
  static version (content visible, final state, no GSAP/Lenis download). The site must look correct in both states.
- Animate only `transform` and `opacity`. No layout properties, so no CLS. If an effect changes an element's height,
  reserve the static height first.
- Cursor/hover effects only under `(hover: hover) and (pointer: fine)`.
- GSAP and Lenis load lazily after first paint; total effects JS ≤ 60 KB gzipped.
- No scroll-jacking that breaks anchors, keyboard scrolling or find-in-page. Nested scroll areas must hand the wheel
  back to the page (Lenis `allowNestedScroll`).
- Text stays selectable and readable mid-animation. No letter-by-letter animation on body text.
- Content that moves on its own for more than 5 s pauses off screen and on hover (WCAG 2.2.2).
- Colour states (e.g. the Experience paper) keep AA at every visible step: hide text across the mid-grey band.
