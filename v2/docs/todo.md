# TODO(user): everything the site still needs from you

Each item shows on the live page as a dashed orange `TODO(user):` tag until you fill it.
File paths say where to edit. EN and FR versions sit side by side.

## Blocking a good first impression (do these first)
1. ~~Private repos~~ **Done (2026-10-05):** ScraperBot and eSaha show "Code private (…). Walkthrough on request."; AneuXplain links to AneuXplain-; Courses & Lessons links to my-courses-lessons-app; wellbeing-hub is not linked.
2. **Domain.** Set `SITE_URL` (canonical, hreflang, sitemap and OG URLs currently use a placeholder Netlify URL). → `astro.config.mjs` / host env
3. **Form service.** Netlify Forms (wired) or Formspree? Without a service, the form falls back to opening the visitor's email app. → `src/views/ContactView.astro`, `src/views/SimpleView.astro`
4. **Availability wording.** Relocation vs remote-only for EU/US/CA from early 2027, and work-authorisation wording. → `src/data/site.ts` `status.employers`
5. **Phone.** Show +212 691713525 publicly or not (hidden for now). → `src/views/ContactView.astro`

## Facts to confirm
6. Graduation wording for Al Akhawayn (B.S. CS, minor Communication Studies, 2021–2026). → `site.ts` `education`
7. "Home is Marrakech" vs only "based in Marrakech". → `src/views/AboutView.astro`
8. The four "How I work" principles are drawn from your projects. Are they yours? → `site.ts` `principles`
9. Video title: the photo book opens on "Journey Through the Lens". Is that its name? → `src/views/CreativeView.astro`
10. Code-size reduction from the repo notes (shown only as a TODO, not as a number). → `dce-scraper.mdx` chapter 04
11. Repo-only stack details used on the site: Click CLI; Keycloak, Llama 3.2, Aya 8B, E5-Base, NGINX in Gov RAG. Confirm they're accurate and public.

## DCE Scraper (`src/content/projects/{en,fr}/dce-scraper.mdx`)
12. Team (solo or N people); still in use?; where it runs.
13. Chapter 05: your one-line lesson + honest answer (prompts are on the page).
14. Optional: a run-log screenshot or short terminal recording as a cover.

## Secure Government RAG (`secure-gov-rag.mdx`)
15. Your role, team, start date.
16. What documents, which users, can the organisation be named; which screenshots are public.
17. Done vs in progress; any eval numbers (answer accuracy, citation precision, latency).
18. Chapter 05.

## AneuXplain (`aneuxplain.mdx`)
19. Full author list; proceedings link / DOI when published.
20. The external-test result and what it measures. **0.557 is deliberately not published** until you confirm it.
21. Which deck slides may be exported as figures (heatmap, morphology report, 3D view).
22. The deck's intro statistics stay off the site unless you give a source.

## eSaha (`esaha.mdx`)
23. Live, demo or repo only; role (solo? course project?); dates; team.
24. Who it's for and why; one outcome number (testers, Lighthouse, …); screenshots.
25. Chapter 05.

## Preparia (`preparia.mdx`)
26. Team; budget / what existed before; which exams, for whom; one number (exams, H5P activities or students).
27. Chapter 05.

## Archive and Now (`site.ts`)
28. ~~Courses & Lessons App link~~ done.
29. Kaggle profile link and current score, if you want them shown.

## Services (`site.ts` `services`, `process`, `faq`)
30. Per-pack: number of portals included, timeline, and later a "from" price (shows "Price on request" now).
31. Process: is the first call free? Support period after handover.
32. FAQ: code ownership, NDA, payments (deposit / milestones / currency), maintenance offer.

## CV (`site.ts` `cvDownloads`, `src/views/CvView.astro`)
33. Update month.
34. PDFs for the AI/ML, Data and French "Conseil" tracks (only the software-engineering PDF exists).

## Creative
35. More photos, if you have them (the old site's 4 photo slots were empty files).
36. The movie-poster PDF is 68 MB; it's linked as-is with its size shown. Want a compressed copy?

## Translation
37. Review the French copy (written by me from the English): `site.ts` `fr` strings, `src/i18n/ui.ts`, `src/content/projects/fr/`.
