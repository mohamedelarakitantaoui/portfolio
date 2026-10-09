# Add a case study

1. The project exists in EN and FR (`add-project.md`) with `caseStudy: true` and a 3-bullet `tldr`
   (problem, what I built, result with a number), each starting with **Problem:**, **Built:**, **Result:**.
2. Body sections, in this order, as `<Chapter n="0X" label="…" title="…">` blocks. Each title is a claim, not a label:
   01 Problem · 02 Constraints · 03 How it works (or Approach) · 04 Decisions · 05 Results · 06 What I'd do
   differently. A chapter whose body is only a `<Todo>` is hidden in production.
3. Results: a `<Stats items={[{ value, caption }]}/>` row with real numbers, then the comparison that makes them
   honest (baseline, split, dataset).
4. ML projects add a model card in chapter 05:
   `<ModelCard use="…" outOfScope="…" data="training data, split" evaluation="metric vs a named baseline"
   limitations="…" failure="one observed failure mode" />`.
5. Media: real product only. A loop at the top (frontmatter `loop`), stills or a walkthrough inside a chapter
   (`add-media.md`), architecture as `<Diagram>` only if it explains something the text can't.
6. Sidebar facts come from the frontmatter (role, timeline, team, stack, status, links); fill or mark `[[todo:…]]`.
7. Write the FR file with the same structure and numbers (`edit-copy.md`).
8. Check the page in EN and FR at 1440 and 390; then run `npm run check`.
