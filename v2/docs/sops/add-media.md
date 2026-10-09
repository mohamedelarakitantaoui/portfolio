# Add media (video, poster, image)

These are the house settings. Earlier files were encoded outside this repo; re-encode new ones with exactly this.

**Video loop (silent, ≤ 20 s):** trim from the source, then encode both formats, max 1280px wide, no audio:
```
ffmpeg -ss 00:01:38 -t 19 -i source.mp4 -an -vf "scale='min(1280,iw)':-2,fps=30" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart name-loop-v1.mp4
ffmpeg -ss 00:01:38 -t 19 -i source.mp4 -an -vf "scale='min(1280,iw)':-2,fps=30" -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 name-loop-v1.webm
```
**Poster:** from a meaningful frame (the same frame the loop opens on), WebP:
```
ffmpeg -ss 1 -i name-loop-v1.mp4 -frames:v 1 -c:v libwebp -quality 80 name-poster-v1.webp
```
1. The first frame must be meaningful (it shows before playback and in reduced motion). Check it.
2. Budgets: loop ≤ 1 MB per format, any video ≤ 6 MB, poster ≤ 60 KB.
3. Names: `<project>-loop-v<N>.{mp4,webm}`, `<project>-poster-v<N>.webp`, in `public/media/<project>/`. A changed
   file gets the next `vN` (never overwrite: browsers and CDNs cache old files). Update every reference (frontmatter
   `loop`, `src/components/mdx/*`), then delete the old files.
4. Embed: `<video muted loop playsinline preload="none" poster=…>` with WebM first, then MP4. Never `autoplay`
   without `muted`. Alt text (`aria-label`) describes the sequence in order, with the duration.
5. **Images:** put sources in `src/assets/…` and render with Astro `<Image>` / `getImage` (WebP or AVIF, `widths`,
   `sizes`, `width`/`height` set). `alt` always; empty only inside an `aria-hidden` decorative block. Shipped image
   ≤ 500 KB (fails above), hero ≤ 200 KB (warns above).
6. Real product only: screenshots, recordings, or the real numbers as bars. No illustrations, no stock, no AI images.
7. Run `npm run check` (check-media enforces sizes and video attributes).
