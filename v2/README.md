# Mamoun Tantaoui El Araki: portfolio v2

Static Astro site, English at `/`, French at `/fr/`. The v1 site in the parent folder is untouched.

## Run

Requires Node 22+ (built with Node 24). If `node` isn't on your PATH on Windows, add
`C:\Program Files\nodejs` to it first. npm and astro scripts start with `#!/usr/bin/env node`.

```bash
cd v2
npm install
npm run dev       # http://localhost:4321, hot reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

Set the real domain before deploying (used for canonical URLs, hreflang, sitemap, OG images):

```bash
SITE_URL=https://your-domain.example npm run build
```

## Deploy

**Netlify** (recommended: the contact form is wired for Netlify Forms)
- New site from Git → base directory `v2`, build command `npm run build`, publish directory `v2/dist`.
- Environment variable `SITE_URL` = your Netlify URL or custom domain.
- `netlify.toml` in this folder sets this up. Forms are detected at deploy time (`name="contact"`).

**Vercel**
- Import the repo → Root Directory `v2`, framework preset Astro (auto), add `SITE_URL`.
- Vercel has no built-in forms. Use Formspree (set the form `action`), or keep the mailto fallback,
  which opens the visitor's email app with the message filled in.

**GitHub Pages**
- Add `base: '/portfolio'` to `astro.config.mjs` if served from a project subpath, then publish `dist/`
  with the official `withastro/action`.

## Where things live

| What | Where |
|---|---|
| Design tokens (colours, type, spacing, motion) | `src/styles/tokens.css` (+ `docs/design-tokens.md`) |
| Page copy, both languages | `src/data/site.ts` |
| Case studies | `src/content/projects/{en,fr}/*.mdx` |
| Architecture diagrams (SVG from data) | `src/lib/diagrams.ts` |
| ask-mamoun corpus | `src/data/knowledge.ts` → `/knowledge.json`, `/fr/knowledge.json` |
| BM25 retrieval (build + browser) | `src/lib/bm25.ts` |
| Motion (GSAP + Lenis, loaded after idle, skipped for reduced motion) | `src/scripts/motion.ts` |
| Interactions (menu, Ctrl/⌘+K palette, terminal, filters, form) | `src/scripts/main.ts` |
| OG images (generated at build) | `src/pages/og/[key].png.ts` |
| Planning docs | `docs/` (references, research, sitemap, content, design tokens, TODO list) |

## Fonts

Fonts are self-hosted and subset to the characters the site uses (`src/assets/fonts/`, generated
with `src/styles/fonts.css`). After changing copy, especially new accented letters, re-run:

```bash
pip install fonttools brotli
python scripts/subset-fonts.py && npm run build
```

Characters outside the subset still render, from the extended-Latin file or the fallback font.

## Hero portrait

`src/assets/portrait-2026-10.png` (background removed with rembg `isnet-general-use`, 1px defringe).
`src/lib/portrait.ts` builds the AVIF/WebP srcsets and the matching `<link rel="preload">`. To change
the photo, save the new cutout under a **new file name** and update the import in `portrait.ts`, so no cache
can serve the old one.

## Filling a TODO

Unknown facts are written as `[[todo:…]]` in `src/data/site.ts` and frontmatter, or `<Todo>…</Todo>`
in MDX. They render as dashed orange `TODO(user):` tags on the page, so nothing invented ever
ships. Replace the marker with the real text and rebuild. The full list is in `docs/todo.md`.

## Arabic

RTL is prepared: logical CSS properties, `dir` on `<html>`, IBM Plex Sans Arabic in the token
set, and `rtlLangs` in `src/i18n/ui.ts`. To publish, add `ar` to `astro.config.mjs` locales and the
`L` dictionaries, install `@fontsource/ibm-plex-sans-arabic`, set `dir="rtl"` for `ar` in
`src/layouts/Base.astro`, then screenshot every page in RTL.
