# Portfolio (React + Vite + Tailwind)

This is a React adaptation of your existing static portfolio. It preserves the same logic:

- i18n (EN/FR/AR, with RTL support)
- Theme toggle (light/dark, persisted)
- Projects grid with tech chips and case study modal
- CV loader that fetches Markdown and renders it
- Creative placeholders (you can replace with your images)

## Project structure

- `src/App.tsx` — UI + logic (i18n, theme, projects, modal, CV)
- `public/content` — Markdown content copied from your static site
- `tailwind.config.js` — Tailwind + typography plugin for nice Markdown rendering

## Run locally

```powershell
# from the repo root
npm --prefix .\project install
npm --prefix .\project run dev
```

Open http://localhost:5173/

## Build

```powershell
npm --prefix .\project run build
```

Build output goes to `project/dist`.

## Using your existing images

Copy your current assets into `project/public/assets` to serve them directly:

- From `assets/img/*` → `project/public/assets/img/*`
- From `assets/favicon.svg` → `project/public/assets/favicon.svg`

Then update the hero and galleries in `App.tsx` to reference `/assets/img/...` instead of placeholders if you like.

## Content

Your Markdown files are already placed here:

- `project/public/content/cv.md`
- `project/public/content/projects/*.md`

You can edit them in place; the app fetches them at runtime.

## Notes

- The app uses a tiny Markdown-to-HTML transform similar to your original logic. For richer Markdown, you can swap in a library later.
- Deployment: `dist/` is a static bundle, so you can host on Netlify, Vercel, or any static host.
