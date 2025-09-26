# Personal Portfolio

A modern, creative, and responsive portfolio to showcase your CV and projects.

## Features
- Sleek design with light/dark theme
- EN/FR/AR language switch for core UI labels
- Sections: Hero, Services, Projects, Creative, Testimonials, CV, FAQ, Contact
- Testimonials slider (keyboard-accessible, reduced motion aware)
- Sticky “Hire Me” call-to-action and Back-to-top button
- Subtle scroll-reveal animations
- Data-driven cards (edit in `assets/js/main.js`)

## Customize
1. Open `index.html` and set your name, email, GitHub, and LinkedIn links.
2. Replace placeholder images in `assets/img/` or add real screenshots.
3. Edit data in `assets/js/main.js`:
	- `projects` for project cards
	- `services` for services
	- `testimonials` for quotes
	- `faq` for frequent questions
4. Put your real CV text into `content/cv.md`. Optionally add `content/cv.pdf`.
5. Tweak colors/spacing in `assets/css/styles.css`.

## Run locally
Opening `index.html` directly works, but a local server is recommended so `cv.md` fetches.

- On Windows PowerShell (optional):

```
python -m http.server 5500
```

Then open http://localhost:5500

If Python isn’t installed, use VS Code’s Live Server extension or any simple static server.

## Deploy
You have several free options:

### GitHub Pages (free)
1. Create a new GitHub repo and push this folder’s contents.
2. Commit includes `.nojekyll` (already added) to prevent Jekyll processing.
3. In repo Settings → Pages: Source = `Deploy from a branch`, Branch = `main` (or `master`), Folder = `/root`.
4. Wait a minute; your site will be live at `https://<username>.github.io/<repo>/`.

### Netlify (free tier)
Option A — Drag & Drop
1. Go to https://app.netlify.com/drop and drag the entire folder.

Option B — Connect Repo
1. New site from Git, select your repo.
2. Build command: (leave empty). Publish directory: `.`
3. Our `netlify.toml` already sets the publish dir; no build needed.

### Vercel (free hobby)
1. `Import Project` in https://vercel.com → choose your repo/folder.
2. No build command. Output directory: `.`
3. `vercel.json` is included; it deploys as a static site.

Notes:
- Because `content/cv.md` is fetched at runtime, ensure the file is deployed. All hosts above serve it correctly.
- If you change the subpath on GitHub Pages, your absolute links should still work because we use relative paths.

## Notes
- The language switch translates headings and labels. Feel free to extend the dictionary.
- Replace `#` links in project cards with real URLs.
