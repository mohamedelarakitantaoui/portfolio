# UX v3 plan: layout, structure and copy (v2 → v3)

Branch `redesign-2026`, Astro site in `portfolio/v2/`. Colour system (saffron, true greys, khatam mark) is unchanged.
Nothing below is built yet. I start coding after your OK.

Status of the audit: I read every home component, the header, footer, layout, tokens, base CSS, `src/data/site.ts`,
`src/i18n/ui.ts`, the content schema, all six EN case studies, the views for work / CV / about / services / contact,
the motion script and `docs/todo.md`. Banned-word grep on `src/` today: **0 hits**. The unpublished 0.557 is not on the site.

---

## Decisions I need from you (everything else I can do without asking)

| # | Question | My recommendation |
|---|----------|-------------------|
| D1 | Hero h1: A, B or C? | **A** "I build ML that explains itself, and the software that ships it." B is 18 words and cannot fit beside the portrait at hero size; its three facts already live in the proof rail. C reads like any data engineer's site (fails cover-the-name). |
| D2 | Hero h1 size. The global h1 scale `clamp(2.5rem, 5.5vw, 5rem)` gives 80px at 1440. The hero text column is ~5 of 12 columns (~460px), so A at 80px wraps to 6–7 lines and pushes the CTA below the fold. | Global h1 scale everywhere **except** the hero, where h1 = `clamp(2.25rem, 3.6vw, 3.5rem)` (A = 4 lines at 1440). Case-study titles use the full 5rem. |
| D3 | Visa wording in the supporting line. | Ship "open to remote and relocation" with no visa clause until you decide; the TODO stays dev-only. |
| D4 | Legal name for JSON-LD `alternateName` and CV file names. The repo-root PDF is named "Mohamed_Al Mamoun_Tantaoui_El Araki"; CV links expect `Mohamed-El-Araki-CV-*.pdf`. | Visible brand "Mamoun El Araki" everywhere. JSON-LD `name: Mamoun El Araki`, `alternateName: Mohamed Al Mamoun Tantaoui El Araki`. CV files renamed `Mamoun-El-Araki-CV-<track>.pdf`. Please confirm the legal name spelling. |
| D5 | CV PDFs. `public/cv/` is empty, so today every "Download CV" button falls back to the /cv page, and in production /cv would show **no downloads at all** once TODOs are hidden. The only PDF is the 6.4 MB file in the repo root. | Tell me which track that file is (Software?). I compress it to < 500 KB and publish it. The AI-ML and Data PDFs stay TODO until you add them. |
| D6 | Canonical domain. | Set `SITE_URL` default to `https://mamounelaraki.com` now (canonical, hreflang, sitemap, OG). Harmless before the domain is live. |
| D7 | Thin case studies in production. eSaha has 9 TODO markers; with TODOs hidden, its page would be mostly empty. | Rule: a case study is built in production only if TL;DR, Problem, How it works and Results all have real content. Otherwise its row links to the repo / live site and the page is skipped. Today that skips **eSaha** only. |
| D8 | PitchPoint's big number is "50/50", which is a method, not a result. | Keep "50/50" with the caption "blend beats both models in CV and on out-of-distribution holdouts" until you give the metric vs a baseline. |

---

## 0. Research → where it lands

| Research point | Applied in |
|---|---|
| 1 Scan in seconds | Hero reduced to 6 elements; marquee replaced by a static row; shorter capability copy |
| 2 Layer-cake headings | Every h2 rewritten to name a real thing (list in §3.10); headings-only export in QA |
| 3 Name, discipline, action in 1 s | Role line + h1 + one primary CTA + proof rail; social icons, tagline, "Now building" card removed |
| 4 Fewer, deeper projects | 3 featured cards, the rest as one-line rows; Mini Private Cloud demoted (no real number) |
| 5 Model cards | `<ModelCard>` box in chapter 05 of AneuXplain and PitchPoint |
| 6 Decisions, not features | New chapter 04 "Key decisions and trade-offs" in every case study |
| 7 Real product | Outlined-letter thumbnails deleted; AneuXplain card uses the real app loop |
| 8 Email as text | Header "Email me", footer email as large selectable text, contact form cut to 3 fields |
| 9 Measure | `max-width: 66ch` on paragraph blocks, body 17/18px, measure check in QA |
| 10 Reference patterns | Experience rows (Brittany Chiang), plain intro + bullets (Eugene Yan), text lists (Emil Kowalski), split doors + chaptered case studies (Nossair), one signature interaction kept (terminal), scroll-highlight statement kept |

---

## 1. Global layout and type

Files: `src/styles/tokens.css`, `src/styles/base.css`, component `<style>` blocks.

| Rule | Today | v3 |
|---|---|---|
| Max content width | `--max: 1360px` | `1200px` |
| Side padding | 16 / 32 / 48px | 16px mobile, 24px from 768px |
| Grid | ad-hoc `4fr / 8fr` per component | new `.grid-12` utility (12 cols, 24px gap); work, now, hero, case study move onto it |
| Body | 17px everywhere | 17px mobile, 18px from 1024px; line-height 1.6 kept |
| Measure | `.prose` 68ch, others ad hoc | `main p, main li { max-width: 66ch }`; `.prose` 66ch; display text exempt |
| h1 | `clamp(2.75rem, 7vw, 6.5rem)`; case study `clamp(3rem, 10vw, 9rem)` | `clamp(2.5rem, 5.5vw, 5rem)` (hero exception, D2) |
| h2 | `clamp(2rem, 4.6vw, 4.5rem)` | `clamp(2rem, 3.5vw, 3.25rem)` |
| h3 | `clamp(1.25rem, 1.8vw, 1.625rem)`, cards up to 3.75rem | `1.375rem → 1.75rem`; large card title becomes an h3 at the h3 scale + one step |
| Mono minimum | tags, terminal label, kbd chip, cover caption, "Now" card at **11px** | 12px floor; tag and terminal label bumped, the other three are deleted |
| Section spacing | 64px / 96px | 80px mobile, 128px desktop (new `--section-y` token) |
| Alignment | `.hero__route` and reduced-motion marquee are centred | both removed; nothing centred beyond 2 lines |
| Buttons | up to 3 primaries in a section (doors) | one primary per section, audited |
| Section anatomy | label + h2 already on most sections | enforced on all: mono label says WHAT, h2 says something specific |

**TODO(user) gating** (new):
- `src/lib/rich.ts`: `rich()` strips `[[todo:…]]` when `!import.meta.env.DEV`; new `todoOnly(s)` helper.
- `src/components/mdx/Todo.astro` renders only in dev. The 10 hard-coded `<span class="todo">` in About, CaseStudy, Contact, Creative, CV and SimpleView views switch to it.
- Field rows (card facts, case-study sidebar, CV rows, service facts, FAQ items) are omitted in production when the value is TODO-only. A `<Chapter>` whose title is TODO-only is omitted (DCE chapter "What I'd do differently" today).
- Build guard: a small integration in `astro.config.mjs` runs on `astro:build:done`, scans `dist/**/*.{html,json}` for `TODO(user)`, `class="todo"` and `[[todo:`, and fails the build with the file list.
- `docs/todo.md` stays the single list of what's missing, renumbered for v3.

**Sticky "Selected work" heading clipping**: the line-mask reveal (`src/scripts/motion.ts`) uses SplitText `mask: 'lines'`. Each mask wrapper clips at the line box, and the h2 line-height is 0.95, so Bricolage ascenders and descenders get cut while the lines slide. Fix: mask wrappers get `overflow: clip` with `padding-block: 0.12em; margin-block: -0.12em`, and no ancestor of the sticky column carries overflow. I reproduce it at 1440 and 1024 first, then verify on scroll at both widths.

---

## 2. Header (`src/components/Header.astro`, `src/i18n/ui.ts`)

- Logo text "Mamoun T. El Araki" → **Mamoun El Araki**; `logo.label` updated.
- Nav: Work · About · Services · CV · Contact. **Creative** moves to the footer only (also out of the full-screen menu list).
- Right side: EN/FR link + one button **Email me** (`mailto:`), replacing "Hire me" → `/contact?for=role`.
- Removed from the header: the theme button and the visible "Ctrl K" chip. The Cmd/Ctrl+K shortcut and the palette stay (palette also keeps "Switch theme").
- Floating "Menu" pill after the hero: kept. Below 1100px the header shows logo, EN/FR and Menu; "Email me" lives in the menu.

---

## 3. Home page (`src/views/HomeView.astro`, `src/components/home/*`, `src/data/site.ts`)

New order: Hero → Statement → Proof row → Selected work → **Experience (new)** → What I do → Now → Two doors → Footer.

### 3.1 Hero (`Hero.astro`)
Keep: 100svh, giant M A M ✦ U N, cutout portrait, portrait settle + letter stagger.

| Element | Today | v3 |
|---|---|---|
| Name line | "Mamoun Tantaoui El Araki" small text | "Mamoun El Araki", kept above the role line (see note) |
| Role line | mono, "Software engineer, AI & automation. Marrakech / Casablanca, Morocco." | 18px body text: "AI and software engineer" |
| h1 | "I cut a 2.5-hour procurement run to 15 minutes." | D1 pick (A by default) |
| Supporting line | "Now I'm training a football xG model…" | "Computer science, Al Akhawayn University (2026). Paper accepted at ICOA 2026. Based in Morocco, open to remote and relocation." |
| CTAs | View work → /work · Download CV | **See my work** → #work (primary) · **Download CV** → /cv |
| Proof rail | 10× · 7 microservices · 0.834 | `10×` faster document pipeline at Intelcia · `0.834` ROC-AUC, AneuXplain internal test · `ICOA 2026` paper accepted |
| Removed | — | "Now building" card, MARRAKECH ✦ IFRANE ✦ ISTANBUL, the three social icons, Marrakech / Casablanca text |

Note on the name: the first-glance test needs the name readable without scrolling. "MAMOUN" in the giant word is decorative (`aria-hidden`) and lacks the surname, so I keep a visible **"Mamoun El Araki"** directly above the role line (17px, display font). Role line then reads as its subtitle.

Desktop: text block in columns 1–5 bottom-left, portrait centred, rail in columns 10–12. Mobile order: role → h1 → supporting line → CTAs → portrait with a smaller MAMOUN → rail as a 3-column row.

Note on 0.834: a metric without its baseline is the exact weakness research point 5 names. The caption keeps "internal test" until you give the baseline; then the caption becomes "ROC-AUC vs X on the internal test".

FR h1 (A): « Je construis du ML qui s'explique, et le logiciel qui le met en production. »

### 3.2 Statement (`Statement.astro`)
Replace the current 60-word paragraph with (26 words, 3 lines at desktop):
"I studied computer science in Ifrane and Istanbul. I build models that show their reasoning, and the software that keeps them running when nobody's watching."
Scroll highlight kept. Inline ✦ glyphs removed. Width capped at 32ch of display text, left-aligned in column 3.

### 3.3 Proof row (`ProofStrip.astro`, `proof` in `site.ts`)
Marquee and its keyframes deleted. One static, left-aligned row of mono wordmarks with ✦ separators, wrapping on mobile:
Al Akhawayn University · Boğaziçi University · Intelcia Solutions · ICOA 2026. (ITS Elaraki School leaves this row; it stays in Experience.)

### 3.4 Selected work (`SelectedWork.astro`, `ProjectCard.astro`, `ProjectCover.astro`, project frontmatter)
- Sticky left (cols 1–4): label "SELECTED WORK", h2 "Three projects, with the numbers.", line "What I built, what changed, and what I started from.", link "All projects".
- Right (cols 5–12): **AneuXplain** large card with the real loop (`aneuxplain-loop.webm` + `.mp4`, poster `aneuxplain-poster.webp`, muted, paused under reduced motion and off-screen). Below, **DCE Scraper** and **PitchPoint** side by side (the staggered offset on the pair is removed so both read at once).
- Card anatomy: media 16:10 → mono meta → title (h3) → one-sentence outcome → big number + caption → Role / Constraint rows → max 4 tags → "Read case study".
- `ProjectCover.astro`: the outlined-letter poster fallback is **deleted**. With no image, a card renders without a media block in production and a dashed "screenshot needed" box in dev.

| Card | Meta | Outcome sentence | Number |
|---|---|---|---|
| AneuXplain | RESEARCH · CAPSTONE · 2026 | Predicts aneurysm rupture risk from 3D vessel geometry and explains each prediction three ways. | 0.834 · ROC-AUC, internal test |
| DCE Scraper | INTERNSHIP · INTELCIA · 2025 | Cut a 2.5-hour document run to 15 minutes for 300 procurement consultations. | 10× · 2.5 h → 15 min, 10+ hours saved weekly |
| PitchPoint | ML · IN PROGRESS · 2026 | Expected goals from the positions of every player around the shot. | 50/50 (D8) |

TODO(user), dev-only: screenshots for DCE Scraper (terminal run or output folder, no client data) and PitchPoint (the pitch UI).

- "More projects" under the cards, one row each (title · one line · year · link): eSaha, Mini Private Cloud, Preparia, Quiz Game App, Courses & Lessons App. Years unknown today for Quiz and Courses → omitted in production.
- Schema (`src/content.config.ts`): `featured` boolean → `tier: 'featured' | 'more'`; new `year`, `meta`, `outcome`, `tldr` (exactly 3), optional `loop`. Mini Private Cloud moves to `more` and loses its "CLI" big number. The `archive` array in `site.ts` merges into one "more projects" list.

### 3.5 Experience (new `Experience.astro`)
Label "EXPERIENCE", h2 "Two internships that shipped, and a semester on university infrastructure." Rows: dates left (mono), right: "Role · Company ↗", 1–2 result lines, tags.

| Dates | Role · Company | Line |
|---|---|---|
| 2025 (Jun–Aug) | Software Development Intern · Intelcia Solutions, Rabat | Built the DCE Scraper: 2.5 h → 15 min for 300 consultations, 10+ hours saved weekly. |
| 2026 | IT / DevOps team · Al Akhawayn University | TODO(user): title, dates, one result (row shows dates + team + org in production) |
| 2024 (Jun–Aug) | Web Applications Intern · ITS Elaraki School, Marrakech | Delivered Preparia, a competitive-exam prep platform (WordPress, H5P). |

Education line: "Al Akhawayn University, B.S. Computer Science (2021–2026) · Boğaziçi University exchange (Fall 2024)" + "Full CV →".
The Mentor row (AUI Compete, 2023) stays on the CV only. `experience` in `site.ts` gains a short `homeLine`; the long result stays for the CV.

### 3.6 What I do (`Capabilities.astro`, `capabilities`)
Numbered rows kept, each = title, one sentence, stack in mono. h2 "Data pipelines, models you can check, and the apps around them."
- [01] Data collection and automation: "Bots that log in, fill forms, download files and report every failure." · Python · Selenium · YAML · worker pools
- [02] Machine learning that explains itself: "Models that return a reason with each prediction, served through an API." · PyTorch · LightGBM · FastAPI
- [03] Web and mobile apps: "The app people open: auth, dashboards, chat and 3D views." · React · TypeScript · Three.js · Flutter · Kotlin · Docker
Button stays "See services" (renamed from "See the packs").

### 3.7 Now (`NowLab.astro`, `now`)
Left: "In progress" only (Previously moves out; Experience covers it).
- **PitchPoint.** Done: the model, an attention set encoder over player positions blended 50/50 with LightGBM. Next: FastAPI inference and a drag-and-drop pitch in React.
- **Kaggle, RSNA knee abnormality detection.** A lean model for the Efficiency track. (Profile link and score: dev-only TODO.)
Right: ask-mamoun terminal, logic unchanged; its 11px label goes to 12px. h2 kept: "A football xG model and a Kaggle knee model."

### 3.8 Two doors (`TwoDoors.astro`, `doors`)
Delete "Hire me in Marrakech or remote, or hand me your PDFs." New label "WORK WITH ME", h2 "A full-time role, or a project with a fixed scope."
- h3 "Hiring a junior AI, ML or software engineer?" — "I'm looking for a first full-time role where the work ships. Remote, or relocating." Buttons: **Download CV** (primary), LinkedIn, Copy email.
- h3 "Need data collected or an MVP built?" — "Two fixed-scope packs, each with a deliverable and a timeline." Buttons: See services, Email me.
The hidden-with-JS email button in this section is removed (the footer carries the email as text).

### 3.9 Footer (`Footer.astro`)
- "LET'S TALK" + email as large selectable text + Copy button, then LinkedIn (linkedin.com/in/mohamed-al-mamoun-t-el-araki-27ab042a3) · GitHub · CV. LinkedIn is new (`person.linkedin`, also in JSON-LD `sameAs`).
- Nav: Home, Work, About, Services, CV, **Creative**, Contact, Lire en français, Privacy, **theme toggle** (moved here).
- Location: "Based in Morocco · remote worldwide" (EN) / « Basé au Maroc · à distance partout » (FR).
- Giant name: **Mamoun El Araki** ✦ (was "Mamoun Tantaoui / El Araki"). Legal line "© 2026 Mamoun El Araki".
- TODO(user), dev-only: switch to an @mamounelaraki.com address when the domain exists.

### 3.10 Home headings in order (what the headings-only test will show)
1. h1 · I build ML that explains itself, and the software that ships it.
2. h2 · Three projects, with the numbers.
3. h3 · AneuXplain · h3 · DCE Scraper · h3 · PitchPoint · h3 · More projects
4. h2 · Two internships that shipped, and a semester on university infrastructure.
5. h3 · Software Development Intern · Intelcia Solutions · h3 · IT / DevOps team · Al Akhawayn University · h3 · Web Applications Intern · ITS Elaraki School
6. h2 · Data pipelines, models you can check, and the apps around them.
7. h3 · Data collection and automation · Machine learning that explains itself · Web and mobile apps
8. h2 · A football xG model and a Kaggle knee model.
9. h2 · A full-time role, or a project with a fixed scope.
10. h3 · Hiring a junior AI, ML or software engineer? · Need data collected or an MVP built?

---

## 4. Case study template (`src/views/CaseStudyView.astro`, `src/components/mdx/*`, 10 MDX files)

| Part | Today | v3 |
|---|---|---|
| Header | breadcrumb, label, 9rem title, summary, tags | mono meta, h1 at the global scale, one-sentence outcome, hero image or loop |
| Sidebar | Role, Timeline, Team, Status, Venue, Supervision, Platforms, Languages, Stack, Links + big number | **Role · Timeline · Team · Stack · Status · Links** (repo / demo / paper / report PDF). Venue folds into Status, Supervision into Team, Platforms dropped. Big number kept at the bottom. Top block on mobile. |
| TL;DR | none | exactly 3 bullets from `tldr` frontmatter: problem, what I built, result with a number |
| Chapters | 4–6, mixed names | 01 Problem → 02 Constraints → 03 How it works → 04 Key decisions and trade-offs → 05 Results → 06 Limitations and what I'd do next. Mono "Chapter 0X" + an h2 that is a claim. |
| Model card | none | new `<ModelCard>` in chapter 05: intended use · out of scope · training data · evaluation vs a named baseline · limitations · one observed failure mode |
| Footer | "Next project →" big link | kept |
| Body rules | — | paragraphs ≤ 4 lines, bullets for 3+ items, bold only key numbers |

Chapter 04 writes each decision as "I chose X over Y because Z". I only write a reason that appears in the repo, your internship report or the capstone report; I'll mine the 53-page capstone PDF for AneuXplain's alternatives and the 0.834 baseline. Anything I can't source becomes a dev-only TODO.

Per project:
- **AneuXplain.** Constraints: one public training set (IntrA, 2,012 samples, 103 patients), an external set from another hospital (Lausanne TOF-MRA, 50 patients), predictions must be checkable, one semester. Decisions: three explanations over a single score (doctors must verify); an out-of-distribution flag over a silent score; a standalone PDF report over app-only output; PointNet on 2,048-point clouds (alternative and reason from the report or TODO). Model card: intended use "research decision support, not diagnosis"; out of scope: clinical diagnosis; failure mode: the "Out of distribution" badge on scans unlike the training data. TODO: the baseline for 0.834 and what 0.557 measures (still unpublished).
- **DCE Scraper.** Constraints: one summer, a 3,643-line starting script, three portals incl. one internal, private client data. Decisions: services split by job over one script; per-portal YAML over code (a changed selector is a config edit); a 10-browser pool over a sequential run; pattern-aware retries + health checks over blind retries (silent failures). Chapter 06 is your lesson (TODO, chapter hidden in production until written).
- **PitchPoint.** Decisions: a set encoder over fixed-order features (player order shouldn't matter); a 50/50 blend over either model (it beat both in CV and on out-of-distribution holdouts). Model card evaluation: "the 50/50 blend beats both models in cross-validation and on out-of-distribution holdouts", baseline TODO (e.g. StatsBomb xG). Limitations: my wrong hypothesis that attention would shift to out-of-cone players; occlusion tests said no.
- **Preparia.** Same template from existing content; built in production.
- **eSaha.** Same template; skipped in production per D7 until filled.

FR files mirror every change.

---

## 5. Other pages

- **About** (`AboutView.astro`): replaced by three short paragraphs (who, what I work on, how I work), the portrait, the "Now" list, and languages "Arabic, French, English; Spanish (beginner)". The experience and education blocks move out (home + CV). The four "How I work" principles are still unconfirmed by you, so "how I work" is written from project facts only; the principles list is removed.
- **CV** (`CvView.astro`, `lib/cv.ts`): web CV in Experience-row format (dates left, role · company, result, tags), education, skills, languages. Downloads: AI-ML, Data, Software (EN) on /cv; Conseil (FR) only on /fr/cv. No phone. Status line uses the new availability wording. "Updated" month is dev-only TODO.
- **Services** (`ServicesView.astro`, `services`, `faq`, `process`): keep "Automation & data collection" (renamed from "Automation & scraping") and "Web app MVP", each with scope, deliverable, timeline, "From" price in USD. Price shows "Price on request" until you set one; TODO-only timeline, process notes and FAQ answers are omitted in production.
- **Contact** (`ContactView.astro`): email as text first; form cut to name, email, message (the "I am…" select goes); success message shown on the page (existing `data-form-success`), with /contact/sent as the no-JS fallback. Phone row removed. No reply-time promise. Location "Based in Morocco (GMT+1)".
- **Work index** (`WorkView.astro`): the same three cards, then "More projects" rows for everything else. Filters removed (eight items don't need them). Intro lede and meta description rewritten for 3 + 5.

---

## 6. Copy rules, applied everywhere

- Brand name "Mamoun El Araki" in titles, OG images (`src/pages/og/[key].png.ts`), meta, JSON-LD, logo and footer. Meta title pattern: "Mamoun El Araki · AI and software engineer".
- "Marrakech / Casablanca" removed from role, footer, contact, meta descriptions and the terminal corpus; replaced by "Based in Morocco". The "Europe, the US and Canada from early 2027" line on CV / contact / status becomes "open to remote and relocation" so every page states the same availability.
- Same facts in hero, cards, CV, case studies, terminal notes (`src/data/knowledge.ts`) and FR pages.
- New `scripts/check-copy.mjs` (`npm run check:copy`): banned words, exclamation marks, more than one em dash per section. Runs in QA.

---

## 7. QA before I show you

Playwright is not in `node_modules`, but its Chromium is already cached; I add `playwright` and `@axe-core/playwright` as dev dependencies.

1. Screenshots at 1440 / 1024 / 768 / 390, EN + FR, of home, /work, /work/aneuxplain, /cv → `qa/out/v3/`.
2. First-glance test at 1440 and 390: name, role, one proof number and the primary button all visible without scrolling.
3. Headings-only export of the home page → `qa/out/v3/headings.txt`, pasted in my report.
4. Measure check: a script computes characters per line for every paragraph (≤ 75ch desktop, ≤ 50ch at 390).
5. Production build passes the TODO guard; `check:copy` clean; axe zero serious; Lighthouse mobile ≥ 90 on home and one case study; `scrollWidth === innerWidth` on every shot.
6. Sticky heading verified while scrolling at 1440 and 1024.

## Order of work after your OK

Data and copy → tokens and type → TODO gating + build guard → header and footer → home sections in order → cards and /work → case-study template + 10 MDX files → about, CV, services, contact → FR parity and terminal notes → QA. No commits unless you ask.
