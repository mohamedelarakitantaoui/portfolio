# Decisions (facts and choices Mamoun has confirmed)

Facts on the site come only from the three current CV PDFs in `public/cv/` (dated 7 Oct 2026) and this file.
When the two disagree, this file wins and the CV gets re-exported (see `docs/sops/update-cv.md`).
Newest first. Each line: date, decision, and where it shows.

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
  one "More projects" row, no repo link.
- The 6.4 MB file at the repo root is the AneuXplain capstone report, never a CV. Published compressed at
  `public/research/aneuxplain-capstone-report.pdf`, linked only from the AneuXplain case study.
- CV PDFs: `Mohamed-El-Araki-CV-{AI-ML,Data,Software}.pdf` (EN) and `-Conseil.pdf` (FR, /fr/cv only, not yet
  provided). A button is hidden until its file exists; every "Download CV" goes to /cv.
- Availability wording everywhere: "Based in Morocco, open to remote and relocation".
- Secure Government RAG project removed (not shown, EN or FR).
