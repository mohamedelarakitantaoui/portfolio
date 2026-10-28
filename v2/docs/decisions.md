# Decisions (facts and choices Mamoun has confirmed)

Facts on the site come only from the three current CV PDFs in `public/cv/` (dated 7 Oct 2026) and this file.
When the two disagree, this file wins and the CV gets re-exported (see `docs/sops/update-cv.md`).
Newest first. Each line: date, decision, and where it shows.

## 2026-10-29 (Kaggle: RSNA knee MRI, final results)
- Final results, from the user's Kaggle Submissions and Leaderboard pages (read 2026-10-27). Supersedes the 2026-10-14
  "shown while open" state: no "In progress", no "closes 22 Oct", no Efficiency-track next step, no rank #1377, no
  0.954 or 0.877 as a headline.
- Private (public) macro ROC-AUC per submission: v0 ResNet18 0.811 (0.825); v1 ResNet18 + EfficientNet-B0 0.863
  (0.877); jiwei v11 public notebook 0.927 (0.943); jiwei + own EffNet 10% blend 0.926 (0.942, failed its pre-set
  threshold, dropped); versia5 public notebook 0.937 (0.954); versia7b public notebook 0.940 (0.956). 6 submissions,
  Aug–Oct 2026. Final picks: versia5 and versia7b, unmodified public notebooks, as a hedge (eligibility of their
  pretrained OAI weights not ruled on).
- Final rank #2135 of ~6,300 teams on the private leaderboard (top ~34%), with versia7b. Competition closed
  2026-10-22; private leaderboard preliminary until RSNA verifies winners (Nov 2026). 1st place 0.960 (Team Kangaroo),
  10th 0.957; gap from the final pick to 1st: 0.020.
- Public→private drop: own model −0.014, public notebooks −0.016 (no extra overfitting).
- Honesty rule unchanged: 0.940 and the rank belong to a reproduced public notebook, never "my model"; 0.863 is the
  user's own model. Shown separately everywhere (case study EN/FR, now-note, More projects row, ask-mamoun).
- Winners also treated it as a labelling problem, adding agent-driven ROI labelling and laterality-aware cropping.
  Next steps (user): rebuild own report labels and train on them, add laterality normalisation and knee-ROI cropping,
  close the 0.863 → 0.94 gap with his own pipeline before the next RSNA challenge.
- The Oct 14 Kaggle screenshots (public-only, rank #1377) are replaced by fresh captures taken 2026-10-29:
  `kaggle-submissions-final.webp` (all six, private + public; the competition's MRI thumbnail cropped out) and
  `kaggle-leaderboard-final.webp` (the user's own private-leaderboard row only; other competitors left out). The
  per-submission chart shows private scores with the public score beside each.

## 2026-10-15 (CV update label)
- User confirmed the CV page label: "Updated October 2026" / "Mis à jour en octobre 2026". Keep this month fixed until the user supplies a new month after re-exporting the CVs; do not derive it from the current date or file timestamps.

## 2026-10-15 (compact navigation restored)
- User requested the original compact floating boxed navigation back, with subtle interactions. Restored its layout; champagne link underlines appear on hover and keyboard focus, buttons lift slightly on mouse hover with effects enabled. Current-page links retain an underline. Reduced motion and the effects kill switch disable the added motion. Supersedes the briefly tried full-width header.

## 2026-10-15 (hero composition refinement)
- User explicitly confirmed that the portrait must stay in the middle. Centred portrait with a compact shoulder crop, then centred headline and actions below the face, HUD beneath. Supersedes the earlier overlapping composition.
- Copy and facts remain unchanged in EN and FR. Headline uses the existing Jost/Cormorant pairing, capped at 84px, with balanced line wrapping. The portrait remains visible without JavaScript or effects.

## 2026-10-15 (Shre7lia)
- Facts approved by the user: docs/hackathon-shre7lia.md. EN/FR poster page, home and /work rows (ML & AI, 2026), previous/next, sitemap, command palette, ask-mamoun and generated OG images.
- Subtitle: "an AI study assistant for university courses". Metric "2nd place", caption "Fusion AI Hackathon 2026 · team of 6" (translated in FR).
- Role only: team member, built one Fusion AI workflow. About and web CV include the hackathon activity.
- Certificate images in public/media/hackathon/ appear framed and dimmed if present. No files means no certificate block.

## 2026-10-15 (v5 final: every project reachable)
- Years (user, 2026-10-15): Quiz Game App 2024, Courses & Lessons App 2023 (pages, "More projects" rows, /cv,
  ask-mamoun notes).
- Every project has a page and every row links to it: case studies for AneuXplain, DCE Scraper, PitchPoint, RSNA knee
  MRI and Preparia; short project pages (`caseStudy: false`, `src/views/ProjectView.astro`) for eSaha, Mini Private
  Cloud, Quiz Game App (`/work/quiz-game-app`) and Courses & Lessons App (`/work/courses-lessons-app`). Short pages
  show only facts from `site.ts`, the CVs and this file: title, one-line summary, year, role, stack, the metric if one
  exists, "What it does" bullets and links; a field that is only a TODO is left out.
- **eSaha (user, 2026-10-15): supersedes "no public case study".** eSaha gets a short project page built from the
  facts in `site.ts` and the CVs (mental-health platform, GPT assistant in 4 languages, React, TypeScript, Flask,
  MongoDB, JWT; sentiment analysis, dashboards and appointment booking). Still no repo link. The old draft chapters and
  the architecture diagram (its modules are not on the CVs) are not shown.
- /work lists all projects (featured rows, then "More projects") with filter chips All · ML & AI · Automation ·
  Web & Mobile · Research (`category` in the frontmatter). Home shows the `home` "More projects" rows plus
  "All projects →". Case studies and short pages end with Previous / Next project, cycling through all projects in
  `order`. All project pages are in the sitemap, the ⌘K palette, the ask-mamoun notes and have their own OG image.

- Case-study template (user-approved on AneuXplain, 2026-10-15): poster title in Jost 200 (`--fs-poster`) with a
  Cormorant subtitle on its own line, **no comma** after the title (an exception to the first-comma split rule: the
  subtitle is the `subtitle` frontmatter field, a screen reader hears "Title: subtitle"); the outcome directly under
  it, the key metric on the right aligned to the outcome's top; big framed media; HUD row (Role · Timeline · Team ·
  Stack · Links); TL;DR in three columns; chapters as numbered hairline sections. Subtitles: AneuXplain "explainable
  AI for medical imaging", PitchPoint "evaluation-driven deep learning" (CV wording); DCE Scraper "an end-to-end
  Python data pipeline" (FR "un pipeline de données Python de bout en bout", Data CV wording); RSNA "raw knee MRI in,
  12 abnormality scores out" (FR "des IRM du genou brutes en entrée, 12 scores d’anomalies en sortie"; site.ts wording,
  confirmed by the user, not on the CVs); Preparia "interactive exam prep for 150+ students" (FR "une préparation aux
  examens interactive pour plus de 150 élèves"), chosen by the user so it doesn't repeat the outcome. All approved
  2026-10-15. Titles longer than 20 characters use `--fs-poster-long` so the metric and the top of the media fit the
  first screen at 1920×1080. Light screenshots dimmed to 75% (`--dim-screen`).

## 2026-10-14 (v5 champagne)
- Visual redesign v5, "black + champagne" (Arik direction, prototype `design-references/v5-prototype.html`), on branch
  `v5-champagne` from `1c4ca62` (the ice-blue snapshot on `refine-personal-portfolio`). Design only: content,
  routes, i18n, case studies and checks unchanged. Supersedes the ice-blue palette and "one font family, DM Sans".
- Palette: bg `#070605`, band `#0B0A08`, surface `#0F0D0B`; heading `#F2EBDD`, text `#E9DFCC`, muted `#BEB4A3`,
  quiet `#B0A696` (kept at or above the `#A6A6A6` luminance floor; the prompt's `#ADA393` fell just below it);
  champagne `#C8B07E`, hover `#D9C49A`, ink on champagne `#0A0907`; lines bone at 12% / 22%; UI borders `#75695A`.
- Type: Jost 200–400 (display + UI), Cormorant Garamond Italic 400 only for a heading's second clause, split in
  markup at the first comma (no natural split = all Jost). Both self-hosted and subset; only Jost is preloaded.
  Weights above 400 in old styles render at 400 (`font-synthesis-weight: none`), never as a fake bold.
- Shapes: sharp. Buttons: 1px champagne border, 44px, 11px uppercase .2em, champagne fill on hover (0.35s);
  secondary: hairline border turning bone. Panels only for service cards and the two doors. No film grain.
- Home kept its current structure (Hero → Work → About → Experience → Now → Doors; no proof strip or Capabilities).
  Hero: the h1 is `hero.h1` split "…itself," + Cormorant "and the software that ships it."; label "Mamoun El Araki ·
  AI and software engineer · Based in Morocco" (phones: name on line 1, role + location on line 2). Arik
  composition: a head-and-shoulders portrait, 78svh tall (55svh on phones), centred just under the nav, toned
  (grayscale, warm sepia, brightness 0.55), head and shoulders kept: bottom fade 62% → 96%, side fade reaching
  transparent at the image edges (ellipse 50% 94% at 50% 38%; wider leaves the image frame visible). The copy
  starts just under the chin, over the shoulders, never over the face, on a soft scrim (rgb 7 6 5 / .7, sized to its
  box so there is no seam); worst-case contrast on the brightest pixel behind it: label ≥ 5.1, h1 ≥ 4.8, status ≥ 11.7. h1 clamp(40px, 4.2vw + 2.2vh, 96px),
  line-height 1.02, one Jost line + one Cormorant line on desktop. The HUD row (three stats, a scroll cue, a live
  Africa/Casablanca clock, "My capstone project: AneuXplain ↗") closes the first screen; the whole hero fits one
  screen at 1920×1080, 1440×900, 1366×768 and 390×844.
- Home Work = hairline rows (meta + title + tags | media or flat before/after bars + outcome + champagne metric |
  "Case study →"); /work keeps its card layout. About = centred statement, no photo (the hero portrait is the only
  one on the home page). Header: fixed centred bar, all five links + EN/FR + "Email me"; the floating Menu pill is gone.
- Light screenshots and app recordings (project media, AneuXplain loop and stills, report pages, Kaggle figures):
  1px `--line` frame on `--surface`, dimmed to 85% (75% since 2026-10-15). Creative photography is not dimmed.
- No visa mention anywhere on the site (user, 2026-10-14): the employers status line ends at "open to remote and
  relocation" (EN and FR); the visa TODO is removed.
- 2026-10-15 polish: hero copy starts at --chin + 48px (the label sits on the collar, below the chin); HUD row
  top-aligned and held to the .wrap gutters (one minmax(0, 1fr) column); tighter copy under 820px tall so the stats
  row fits 1366×768 and 1536×730 (1920×1080 at 125%); phones use a stronger scrim (rgb 7 6 5 / .85) for the label.
  Body text Jost 400 at 16–17px; Jost subset widened to 200–500, 500 only for <strong>/<b>. /about photo toned
  (saturate .6, sepia .14, brightness .92). Favicon "ME" regenerated in Jost 500, bone on #070605, square.
- Motion added (behind the kill switch and reduced motion): champagne hairline across a project row on hover,
  4px arrow nudge on buttons, About word scrub (opacity). The visual test masks the live clock.

## 2026-10-14 (Kaggle: RSNA knee MRI)
- New "More projects" row + case study `/work/rsna-knee-mri` (EN/FR), from the user's case-study kit. Shown while the
  competition is still open (closes 22 Oct 2026); add the private-leaderboard result after that date.
- Facts: 4,407 studies, 12 findings, macro ROC-AUC, 58 expert-labelled studies, 4,349 reports; first cache 21,137
  series / 15.8 GiB in ~57 min on CPU; cache v2 = 150 mm crop, 288 px; parity 99/99; train 3,479 / val 870.
  LLM labeller v3 (Gemini): 82% macro balanced accuracy, MCL sensitivity 1.00, ~5x cheaper without thinking tokens.
  Own models, public LB: 0.825 (ResNet18) → 0.877 (ResNet18 + EfficientNet-B0). Best single model: EfficientNet-B0,
  gold 0.859, val 0.848, 2 h 59 min on 2×T4. Public rank #1377 on 14 Oct (shown only in the screenshot caption).
- Honesty rule: 0.954 is "a reproduced public ensemble (versia-5)", never "my model". 0.943 = reproduced jiweiliu
  ensemble; 0.942 = my model blended into it (dropped). Final training used a public LLM-label dataset
  (stevenleehans) after an SSD failure wiped the user's own labels.
- No competition MRI images anywhere (competition rule 2.4.b). Only the user's charts and Kaggle screenshots.

## 2026-10-14 (v2 visual refresh)
- User requested a bolder UI, more effects and an alternative to black-and-gold. Implemented charcoal with
  ice blue #A7C7FF, drawn from the portrait's blue shirt; this supersedes the earlier saffron choice.
- The target remains portfolio/v2. Reference sites inform visual quality, not copied layouts or assets.
- AneuXplain is the user's capstone and the project they are most proud of. The paper is accepted at ICOA 2026;
  publication is still pending, as confirmed by the user in this conversation.
- Keep native scrolling. Motion includes portrait depth, magnetic project link, result bars, media scale,
  and footer reveal, all behind the effects and reduced-motion checks.

## 2026-10-09 (v4)
- AUI IT / DevOps line removed everywhere (site, CV page, ask-mamoun notes).
- Intelcia title: "Software Engineer Intern" (FR "Stagiaire ingénieur logiciel").
- Mentoring: AUI Compete Organisation, "algorithmic problem solving", no dates (as on the CVs).
- Degree: BSc in Computer Science, minor in Communication Studies, Al Akhawayn University, Sep 2021 – Jul 2026.
  Boğaziçi University: exchange program in Computer Engineering, fall 2024.
- AneuXplain on cards and in the hero: "0.83 AUC · 85% accuracy, patient-level split" (CV rounding). The case study
  keeps the capstone report's exact figures: ROC-AUC 0.834, PR-AUC 0.626, accuracy 85%, cross-dataset 0.557.
- PitchPoint metric: "ECE 0.0038, down from 0.0464 · 444 tests passing", plus "In progress: the FastAPI + React web
  demo".
- DCE Scraper metric: "90% less processing time · 2h30 → 15 min for 300 consultations".
- Design v4: one font (DM Sans), saffron `#F2A900` accent, dark only, text logo, favicon "ME". No star or khatam
  mark, no Bricolage Grotesque, no light theme, no preloader.
- AneuXplain loop: `aneuxplain-loop-v3.{webm,mp4}` + `aneuxplain-poster-v3.webp` (18.7 s, opens on the heatmap).
- Effects (Lenis + GSAP), each behind the kill switch: hero depth, AneuXplain video grow, proof loop, rolling word,
  card light + tilt, Experience paper, capability previews, footer rise.
- Rolling line: "I build models that are explainable / calibrated / tested / shipped" (FR "Je construis des modèles
  explicables / calibrés / testés / livrés").

## 2026-10-07 / 08
- Visible name "Mamoun El Araki". Legal name "Mohamed Al Mamoun Tantaoui El Araki" only in JSON-LD `alternateName`.
- Canonical domain https://mamounelaraki.com.
- Intelcia result: "90% less processing time (2h30 → 15 min), 10+ hours saved per week". Never 95%: 2h30 → 15 min
  is a 90% cut. (The current CV PDFs still say "95 %": they must be re-exported; `npm run check:cv` blocks deploy.)
- eSaha stack: React, TypeScript, Flask, MongoDB, GPT API, JWT. Never Supabase. eSaha has no public case study (draft),
  one "More projects" row, no repo link. (Superseded 2026-10-15: short project page, still no repo link.)
- The 6.4 MB file at the repo root is the AneuXplain capstone report, never a CV. Published compressed at
  `public/research/aneuxplain-capstone-report.pdf`, linked only from the AneuXplain case study.
- CV PDFs: `Mohamed-El-Araki-CV-{AI-ML,Data,Software}.pdf` (EN) and `-Conseil.pdf` (FR, /fr/cv only, not yet
  provided). A button is hidden until its file exists; every "Download CV" goes to /cv.
- Availability wording everywhere: "Based in Morocco, open to remote and relocation".
- Secure Government RAG project removed (not shown, EN or FR).
