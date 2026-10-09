# Update the CVs

1. Edit the CV sources (outside this repo) so they match `docs/decisions.md`. In particular: Intelcia is
   "90% less processing time (2h30 → 15 min)", never 95%; no Supabase; no Government RAG; title
   "Software Engineer Intern"; mentoring "algorithmic problem solving".
2. Export three PDFs and save them with exactly these names in `public/cv/` (replace the old files):
   - `Mohamed-El-Araki-CV-AI-ML.pdf`
   - `Mohamed-El-Araki-CV-Data.pdf`
   - `Mohamed-El-Araki-CV-Software.pdf`
   - optional French version: `Mohamed-El-Araki-CV-Conseil.pdf` (appears on /fr/cv only, once the file exists)
3. Run `npm run check:cv`: it reads the text inside every PDF and fails on "95%", "Supabase" or "Government RAG".
4. If the CV changed a fact shown on the site, update `docs/decisions.md` and the site copy (`edit-copy.md`).
5. `npm run build`, open /cv and check the download buttons show the new file sizes.
6. Run `npm run check`.
