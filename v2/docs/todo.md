# TODO(user): what the site still needs from you (v4)

Every item below shows as a dashed `TODO(user):` tag in `npm run dev` only. Production builds drop it, and
`npm run build` fails if one ever reaches a public page. Until you fill an item, its field, row or chapter is
simply not shown on the live site. EN and FR versions sit side by side in the same files.

## Highest impact
1. **CV PDFs.** AI-ML, Data and Software are in `public/cv/` (copied 2026-10-08 from Downloads) but still say "95 %": replace them with the corrected LaTeX exports before publishing. `-Conseil.pdf` (FR, /fr/cv only) is still missing; its button stays hidden until the file exists.
2. **Screenshots** for the DCE Scraper (terminal run or output folder, no client data) and PitchPoint (the pitch UI). Add as `cover` + `coverAlt` in the project's MDX frontmatter (both languages). Until then those two cards (and case-study headers) show a before/after bar panel drawn from their real numbers.
3. **PitchPoint:** competitions and seasons, one observed failure mode, role, repo link. → `src/content/projects/{en,fr}/pitchpoint.mdx`. (Metric done: ECE 0.0464 → 0.0038.)
4. **Visa wording** in the status line ("visa sponsorship required" or nothing). → `src/data/site.ts` `status.employers`
5. *(removed in v4: the AUI IT / DevOps line is off the site and out of the ask-mamoun notes.)*

## Case studies
6. AneuXplain: full ICOA author list; proceedings link / DOI once published.
7. DCE Scraper: team size; still in use?; chapter 06 lesson (the chapter is hidden until written); confirm the code-size reduction note.
8. Preparia: team; budget or what existed before; chapter 04 decisions and chapter 06 lesson. (Numbers done: 30+ modules, 6 subjects, 150+ students, 12 teachers.)
9. eSaha (dev-only page, never built in production): who it's for, role, team, status, outcome, lesson. (Stack done: React, TypeScript, Flask, MongoDB, GPT API, JWT.)
10. Mini Private Cloud (row only): role and the constraint it was built under.
11. Quiz Game App and Courses & Lessons App: the year for each row.

## Services and contact
12. Per pack: number of portals, timeline, and a "from" price in USD (the page shows "Price on request" now).
13. Process: is the first call free? Support period after handover.
14. FAQ: code ownership, NDA, payments, maintenance. Unanswered questions are hidden.
15. Form service: Netlify Forms (wired) or Formspree.
16. Email: switch to an @mamounelaraki.com address once the domain has mail (`person.email` in `site.ts`).

## Other
17. Kaggle profile link and score, if you want them shown.
18. CV "updated" month.
19. Creative: confirm the "Journey Through the Lens" title; more photos if you have them.
20. Review the French copy (`site.ts` `fr` strings, `src/i18n/ui.ts`, `src/content/projects/fr/`).

## Decided (2026-10-07 / 08 / 09)
- v4 (2026-10-09): AUI IT / DevOps removed everywhere. Intelcia title "Software Engineer Intern". Mentoring = "algorithmic problem solving" (AUI Compete Organisation, no dates, as on the CVs). Degree wording from the CVs: BSc Computer Science, minor in Communication Studies, Sep 2021 – Jul 2026.
- v4: no star mark, no Bricolage, no light theme, no preloader; favicon "ME".
- Intelcia result is "90% less processing time (2h30 → 15 min), 10+ hours saved per week". Never 95%.
- Site facts follow the 7 Oct 2026 CVs (AI-ML, Data, Software). No Supabase anywhere.
- Brand name "Mamoun El Araki"; legal name "Mohamed Al Mamoun Tantaoui El Araki" (JSON-LD `alternateName`).
- Canonical domain https://mamounelaraki.com.
- The capstone report (`public/research/aneuxplain-capstone-report.pdf`, compressed to 1.2 MB) is linked only from the AneuXplain case study, never as a CV.
- AneuXplain numbers follow the capstone report: PR-AUC 0.626 (the old site said 0.93), cross-dataset ROC-AUC 0.557 explained in chapter 06.
