# Decisions (facts and choices Mamoun has confirmed)

Facts on the site come only from the three current CV PDFs in `public/cv/` (dated 7 Oct 2026) and this file.
When the two disagree, this file wins and the CV gets re-exported (see `docs/sops/update-cv.md`).
Newest first. Each line: date, decision, and where it shows.

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
  one "More projects" row, no repo link.
- The 6.4 MB file at the repo root is the AneuXplain capstone report, never a CV. Published compressed at
  `public/research/aneuxplain-capstone-report.pdf`, linked only from the AneuXplain case study.
- CV PDFs: `Mohamed-El-Araki-CV-{AI-ML,Data,Software}.pdf` (EN) and `-Conseil.pdf` (FR, /fr/cv only, not yet
  provided). A button is hidden until its file exists; every "Download CV" goes to /cv.
- Availability wording everywhere: "Based in Morocco, open to remote and relocation".
- Secure Government RAG project removed (not shown, EN or FR).
