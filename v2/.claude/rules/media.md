---
paths: ["public/media/**", "src/assets/**"]
---
# Media

Follow `docs/sops/add-media.md`. In short:
- Video: H.264 MP4 (crf 30, `-movflags +faststart`) + VP9 WebM (crf 40), no audio, max 1280px wide, ≤ 6 MB each
  (loops ≤ 1 MB). Poster WebP from a meaningful frame. The first frame must be meaningful too.
- Embed with `poster`, `muted`, `playsinline`, `loop` for loops; never `autoplay` without `muted`.
- Changed file, same purpose → new name with a version suffix (`-v3`), never overwrite (caches keep old files).
  Update every reference and delete the old file.
- Images: source in `src/assets/` (Astro outputs WebP/AVIF with `width`/`height`), `alt` always set (empty only for
  decorative images inside `aria-hidden`). Any shipped image > 500 KB fails `check-media`; the hero should stay
  ≤ 200 KB.
- Real product only: screenshots, loops, or the project's real numbers. No illustrations, no stock, no AI images.
