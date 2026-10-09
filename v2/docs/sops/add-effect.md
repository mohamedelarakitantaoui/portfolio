# Add a motion effect

Rules: `.claude/rules/motion.md`. Pattern: one file, one attribute, one commit.

1. Write `src/scripts/effects/fx/<name>.ts` exporting `default function (el: HTMLElement, { gsap, ScrollTrigger, fine })`.
   It runs only when `el` is half a screen away, only if effects are on (kill switch, `?effects=off` and reduced
   motion are already checked by the loader).
2. Mark the existing element: `data-fx="<name>"` (several effects: space-separated, `data-fx="media-grow card-tilt"`).
   Put any CSS the effect needs in that component's `<style>`, scoped to a class the effect adds (e.g. `.is-looping`)
   or under `html.fx-on`, so the static page never changes.
3. Animate `transform` and `opacity` only. Mouse effects return early unless `fine` is true. Anything that moves
   on its own pauses off screen and on hover. If the effect changes an element's height, reserve the static height.
4. Check the four states with `node qa/fx-states.mjs` (JS off, reduced motion, `?effects=off`, effects on): no text
   left at opacity 0, no horizontal scroll, no effect running when it should be off.
5. Check the JS budget (effects ≤ 60 KB gzipped) and `npm run check:perf` (Lighthouse mobile ≥ 90, CLS ≤ 0.1).
6. Commit the effect alone (`feat(effects): N <what>`), so it can be reverted alone.
7. Run `npm run check`, then `npm run check:visual` and show the diffs.
