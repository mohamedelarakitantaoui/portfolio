# content.md: Stage 3, copy before layout

> **Status (2026-10-04, build):** the decisions below are applied; this file is the approved plan. The live copy
> is in `src/data/site.ts` and `src/content/projects/`. Open items are tracked in `docs/todo.md`.
> - Stat: "10× faster: 2.5 h → 15 min for 300 consultations". 95% removed everywhere.
> - Intelcia: DCE documents from marchespublics.gov.ma, marocao.com and Intelcia's internal purchasing portal
>   (named, never linked), collected into an LLM training dataset for an AI chatbot (internship report).
> - Hero: h1 = "I cut a 2.5-hour procurement run to 15 minutes."; subline = option A's second sentence.
> - AneuXplain: capstone facts from the deck; 0.557 and the intro statistics not published.
> - Services: "Price on request". One marquee (institutions); stack as static lists.
> - Portrait: the new 1254 px headshot, background removed with rembg (isnet-general-use).

Sources: your brief + the repo (`content/cv.md`, `content/projects/*.md`, `assets/js/main.js`).
Nothing else. Missing facts are `TODO(user): …` and show up on the site as visible
TODO markers until filled. English is the master; French strings are given for the
hero, nav and CTAs, and the full FR translation is produced at build and listed for
your review.

---

## 0. Facts to fix before anything ships

1. **The 95% figure doesn't match its own numbers.** 2.5 h → 15 min is 150 → 15 minutes:
   **90% less time, or 10× faster**. "95%" would need ~7.5 min.
   Proposal: rail says **"10×"**, caption "2.5 h → 15 min for 300 consultations".
   `TODO(user): confirm 15 min (→ 10× / 90%) or give the real time (→ keep 95%).`
2. **Two different Intelcia stories.** CV: "automated procurement document extraction".
   Current Journey: "web scraping system that collects data automatically for AI chatbot
   training", and it says "Intelcia **IT** Solutions".
   `TODO(user): which is right (or both), and the exact company name?`
3. **Which portals?** Repo case study says "French procurement sites". "DCE" and
   "consultations" also match Morocco's public-procurement vocabulary.
   `TODO(user): Moroccan, French, or both? Can the portal be named?`
4. Repo claims not in your brief: "46% code reduction", "100% of silent failures
   eliminated", Click CLI, Keycloak / Llama 3.2 / Aya 8B / E5-Base / NGINX in Gov RAG.
   I use them. `TODO(user): confirm each is accurate and public.`
5. **"What did the 2.5 h measure?"** The old monolith's run, or manual work?
   `TODO(user): baseline for the before/after.`

---

## 1. Global

- **Name:** Mamoun Tantaoui El Araki (logo short form: "Mamoun T. El Araki")
- **Role line:** Software engineer, AI & automation. Marrakech, Morocco.
  FR: Ingénieur logiciel, IA & automatisation. Marrakech, Maroc.
- **Status (employers):** Open to junior AI, data and software engineering roles. Morocco
  and remote now; Europe, US and Canada from early 2027.
  `TODO(user): relocation vs remote-only for EU/US/CA? Work-authorisation wording?`
  FR: Ouvert aux postes junior en IA, data et génie logiciel. Maroc et à distance dès
  maintenant ; Europe, États-Unis et Canada à partir de début 2027.
- **Status (clients):** Taking freelance projects: automation, scraping, AI on your documents, web apps.
- **Email:** elaraki48@gmail.com (always shown as text)
- **GitHub:** github.com/mohamedelarakitantaoui
- **Phone:** `TODO(user): show +212 691713525 publicly? Default: hidden.`
- **Languages:** English, French, Arabic; Spanish (beginner)
- **Nav:** Work · About · Services · CV · Creative · Contact. FR: Projets · À propos ·
  Services · CV · Créatif · Contact
- **CTAs:** View work / Voir les projets · Download CV / Télécharger le CV · Hire me /
  Me recruter · Start a project / Démarrer un projet · Copy email / Copier l'e-mail

---

## 2. Home

### 2.1 Hero (100svh poster)
Back layer (decorative, `aria-hidden`): **M A M ✦ U N**, with the star replacing the O.
Middle: cutout portrait. Front, by corner:

- **top-left:** star + "Mamoun T. El Araki"
- **top-centre:** nav
- **top-right:** `EN | FR` · ⌘K · **Hire me**
- **mid-left (own corner, never over the letters):**
  - `h1`: **Mamoun Tantaoui El Araki**
  - role line (above)
  - **headline**, pick one (all three pass the cover-the-name test because each one
    holds a number or a constraint only you have):
    - **A (recommended):** "I cut a 2.5-hour procurement run to 15 minutes. Now I'm
      building AI that answers from files that never leave the server."
      FR: « J'ai ramené un traitement de 2 h 30 à 15 minutes. Aujourd'hui, je construis
      une IA qui répond à partir de fichiers qui ne quittent jamais le serveur. »
    - **B:** "300 procurement files in 15 minutes, not 2.5 hours. Then on-prem RAG
      that reads Arabic, French and English."
    - **C:** "I write the software between a stubborn portal and a clean spreadsheet:
      300 consultations, 15 minutes, no silent failures."
  - CTAs: **View work** · **Download CV**
- **mid-right, stat rail:**
  - **10×** (pending §0.1): faster procurement run, 2.5 h → 15 min for 300 consultations
  - **7**: microservices carved from a 3,643-line monolith
  - **EN·FR·AR**: interfaces shipped in three languages, right-to-left included
- **bottom-left:** GitHub · email · CV (icons with labels for screen readers)
- **bottom-centre:** MARRAKECH · IFRANE · ISTANBUL
- **bottom-right card:** "Now building ✦ Secure Government RAG →" (→ `/work/secure-gov-rag`)

### 2.2 Statement (scroll-scrubbed grey → bone, 3 star glyphs)
> I'm a software engineer based in Marrakech ✦ who studied computer science in Ifrane
> and Istanbul. I write Python that pulls documents off procurement portals without
> anyone watching, ✦ retrieval systems that answer from files that stay on your own
> servers, and the React, Flutter and Kotlin apps that sit on top. ✦

FR: « Je suis ingénieur logiciel, basé à Marrakech ✦, formé en informatique à Ifrane et à
Istanbul. J'écris du Python qui récupère les documents des portails de marchés publics
sans surveillance ✦, des systèmes de recherche qui répondent à partir de fichiers restés
sur vos serveurs, et les applications React, Flutter et Kotlin qui vont au-dessus. ✦ »

### 2.3 Proof strip (the only marquee)
Text wordmarks in mono, separated by ✦:
Al Akhawayn University ✦ Boğaziçi University ✦ Intelcia Solutions ✦ ITS Elaraki School
> **Conflict to resolve:** the skill allows **one** marquee and you asked to keep the stack
> marquee *and* add this proof strip. Proposal: the marquee carries the institutions, and the
> stack moves into Capabilities as static mono lists. `TODO(user): OK, or swap them?`

### 2.4 Selected work (sticky title left, cards right)
Label: `SELECTED WORK →`
h2: **Five projects, strongest first.**
Sub: "Each one shows what I did, the number that changed, and what I started from."
Link: All projects →

| # | Project | Role | One number | Constraint | Tags | Cover |
|---|---|---|---|---|---|---|
| 01 | **DCE Scraper**, Intelcia | Software development intern. `TODO(user): solo or team of N?` | **2.5 h → 15 min** for 300 consultations | Started from a 3,643-line monolith; one summer (Jun-Aug 2025) | Python 3.12 · Selenium · YAML · 10 workers | Architecture SVG of the 7 services. `TODO(user): a run-log screenshot or terminal recording?` |
| 02 | **Secure Government RAG** · *in development* | `TODO(user): role + team` | **0 external API calls**: model, vectors and files all on-prem | Data may never leave the building; AR/FR/EN with RTL | Ollama · pgvector · MinIO · FastAPI · Keycloak | Architecture SVG. `TODO(user): which screenshots are public; can the client be named?` |
| 03 | **AneuXplain** · *research paper* | Co-author. `TODO(user): exact contribution` | `TODO(user): key metric (e.g. AUC/accuracy on N cases)` | `TODO(user): dataset size / compute / timeline` | PyTorch · PointNet · explainability | `TODO(user): a figure from the paper you may show` (until then: typographic cover, no fake figure) |
| 04 | **eSaha**, mental-health platform | `TODO(user): solo? course project or own initiative?` | **7 modules** in one Supabase-backed app (auth, specialist directory, live chat, journaling, appointments, emergency contacts, resources). `TODO(user): a stronger number (testers, Lighthouse, load time)?` | Health data → privacy-first; protected routes | React · TypeScript · Vite · Tailwind · Supabase | `TODO(user): screenshots` |
| 05 | **Preparia**, ITS Elaraki School | Project intern (Jun-Aug 2024) | `TODO(user): number of exams covered / H5P activities / students` | No-code stack (WordPress + Elementor + H5P), groundwork for a mobile app | WordPress · Elementor · H5P | Screenshot of preparia.ma (I can capture it at build) |

DCE is labelled honestly as the strongest: its card is the large cell (the symmetry break).

### 2.5 Capabilities
Label: `WHAT I DO →` · h2: **Three things I get paid to build.**
- **[01] Automation & data extraction:** Bots that log into portals, fill the forms,
  download the files and tell you when something failed instead of failing quietly.
  `Python · Selenium WebDriver · YAML config · worker pools · retries & health checks`
- **[02] AI, RAG & ML:** Assistants that answer from your documents with citations,
  running on your own servers; ML research when the data is 3-D.
  `Ollama · PostgreSQL + pgvector · MinIO · FastAPI · PyTorch (PointNet)`
- **[03] Full-stack product (web + mobile):** The app people actually use: auth,
  dashboards, chat, scheduling, in three languages.
  `React · TypeScript · Supabase · Node.js · Flutter · Kotlin · WordPress · Docker`

### 2.6 Now / Lab
Label: `NOW →` · h2: **What's on the bench this month.**
- **Previously:** Intelcia, summer 2025: the DCE Scraper, monolith → 7 microservices.
- **In progress:** Secure Government RAG (on-prem, AR/FR/EN). Kaggle: RSNA Knee
  Abnormality Detection, building a lean model for the Efficiency track.
  `TODO(user): Kaggle profile link + current rank/score, if you want it shown.`
- **Next:** an AI-powered football analytics platform (idea stage).

**ask-mamoun terminal** (signature interaction)
Header: `ask-mamoun · client-side RAG demo, no LLM, no data leaves your browser`
Prompt chips: "what did you build at Intelcia?" · "which languages?" · "what's the RAG
stack?" · "are you available?" · "how do I hire you for scraping?"
Output, per query:
```
$ ask-mamoun "which languages?"
retrieved (BM25, top 3 of 34 chunks)
  0.82  languages        English, French, Arabic; Spanish (beginner).
  0.41  gov-rag/ui       Multilingual UI in Arabic, French and English, RTL included.
  0.19  about/story      … studied in Ifrane and Istanbul …
answer ─ English, French and Arabic, plus beginner Spanish. The government RAG UI
ships in all three, right-to-left included.
```
Answer = the top chunk's prepared answer sentence (extractive). Below 0.15, it says "I
don't have that in my notes. Email me: elaraki48@gmail.com". Scores normalised to the top score.

### 2.7 Two doors
- **For employers:** h3 "Hiring a junior AI, data or software engineer?"
  "I'm looking for a first full-time role where the work ships: AI/ML engineering,
  data engineering, or backend/full-stack. Morocco or remote now; Europe, the US or
  Canada from early 2027."
  Buttons: **Download CV** · Copy email
- **For clients:** h3 "Need a portal scraped, your documents searchable, or an MVP live?"
  "Three fixed-scope packs with a timeline and a starting price. Tell me what the data
  looks like today and what you want in your inbox tomorrow."
  Buttons: **Start a project** · See the packs

### 2.8 Footer (every page)
- Label `LET'S TALK →`, email as large text `elaraki48@gmail.com` + copy button, GitHub
- Nav repeated · `EN | FR` · Privacy
- Giant: **Mamoun Tantaoui El Araki**
- "Marrakech, Morocco · open to remote" · © 2026 · "No cookies, no tracking."

---

## 3. /work
h1: **Work** · intro: "Five case studies and the smaller things around them. Every card
shows the one number I'd defend in an interview."
Filter pills: All · AI & Data · Automation · Web & Mobile · Research
(DCE → Automation · Gov RAG → AI & Data · AneuXplain → Research, AI & Data ·
eSaha, Preparia, Quiz, Courses → Web & Mobile)

**Archive** (list rows, no case study):
- Quiz Game App: Kotlin, Firebase auth, real-time Q&A with a 15-second timer,
  coroutines, leaderboards, offline cache. Repo + QR to the Android build.
- Courses & Lessons App: Flutter with a WordPress backend. `TODO(user): repo or screenshot link (current link points to your GitHub profile)`
- AI football analytics: idea stage (listed under Now, not as a project)

---

## 4. Case studies (`/work/<slug>`)

Template: sticky sidebar (role, timeline, team, status, platforms, stack, languages,
links, one big number) + Chapter 01-05 + "Next project →".

### 4.1 DCE Scraper (`/work/dce-scraper`)
Sidebar: Role: Software development intern · Timeline: Jun-Aug 2025 · Team: `TODO(user)` ·
Status: delivered `TODO(user): still in use?` · Platform: CLI (Click) on `TODO(user): OS/server` ·
Stack: Python 3.12, Selenium WebDriver 4.15+, YAML, threading/async · Links: github.com/mohamedelarakitantaoui/ScraperBot ·
**Big number: 10× (2.5 h → 15 min)** (pending §0.1)

- **Chapter 01 · Problem.** h2: "300 consultations, 2.5 hours, and failures nobody saw."
  Each consultation's tender documents (DCE) had to be found, requested through a form,
  downloaded and filed. The existing tool was one 3,643-line script; when a download
  died, it died silently. `TODO(user): who waited on these files, and what for?`
- **Chapter 02 · Approach.** h2: "Split it by job, then run ten browsers at once."
  Monolith → 7 services, each with one responsibility; a worker pool of up to 10
  Selenium browsers; YAML config so new portals don't need code changes; retries with
  failure-pattern analysis.
  Pull quote: "A scraper that fails loudly is worth more than one that is fast." `TODO(user): is this your view? Rewrite in your words.`
- **Chapter 03 · Architecture.** h2: "Seven services, one orchestrator." SVG diagram +
  numbered rows: 01 HybridOrchestrator · 02 UrlExtractionService · 03 FormProcessingService
  · 04 DownloadManagementService · 05 WorkerPoolService · 06 FileManagementService · 07 RetryService.
- **Chapter 04 · Outcome.** h2: "Same 300 consultations, a coffee break instead of an afternoon."
  Stats: **2.5 h → 15 min** · **3,643 lines → 7 services** · **up to 10 workers** ·
  **0 silent failures** · **-46% code** (pending §0.4).
- **Chapter 05 · What I'd do differently.** `TODO(user): your honest answer.` Prompt
  ideas: tests before the split? queue (Redis/RQ) instead of threads? structured logs?
- Next project → Secure Government RAG

### 4.2 Secure Government RAG (`/work/secure-gov-rag`)
Sidebar: Role `TODO(user)` · Timeline `TODO(user): start date` → present · Team `TODO(user)` ·
Status: **in development** · Platform: web, on-prem (Docker Compose + NGINX) ·
Stack: React, TypeScript, Tailwind, FastAPI, Ollama (Llama 3.2, Aya 8B), E5-Base
embeddings, PostgreSQL + pgvector, MinIO, Keycloak · Languages: AR / FR / EN (RTL) ·
Links: `TODO(user): none public?` · **Big number: 0 external API calls**

- **01 Problem.** h2: "The documents can't leave the building, so neither can the model."
  A public body needs answers from its own files without sending them to a cloud API.
  `TODO(user): what kind of documents, which users, can the organisation be named?`
- **02 Approach.** h2: "Local models, cited answers, and a reason to trust each one."
  Ollama-served models, answers restricted to retrieved context with source links,
  prompt-injection protection, hallucination reduction, role-based document access,
  full audit log.
- **03 Architecture.** h2: "Six boxes, all on one network." SVG: React → FastAPI chat
  service → Ollama; FastAPI ↔ PostgreSQL/pgvector (vectors) + MinIO (files); Keycloak
  (auth); NGINX in front. Second pipeline: PDF → Excel with drag-and-drop + status tracking.
- **04 Outcome (so far).** h2: "What works today, and what's still open."
  Honest status list: built ✓ / in progress ◐. `TODO(user): which features are done, any
  eval numbers (answer accuracy, citation precision, latency per query)?`
- **05 What I'd do differently.** `TODO(user)`

### 4.3 AneuXplain (`/work/aneuxplain`)
Sidebar: Role: co-author · Venue `TODO(user)` · Year `TODO(user)` · Co-authors `TODO(user)` ·
Stack: PyTorch, PointNet, `TODO(user): explainability methods used` · Link/DOI `TODO(user)` ·
**Big number:** `TODO(user)`
- **01 Problem.** h2: "Will this aneurysm rupture, and can the model say why?"
  Predicting intracranial aneurysm rupture risk from 3-D vessel geometry, where a
  black-box score isn't enough for a clinician. `TODO(user): dataset, labels, size`
- **02 Approach.** h2: "PointNet on the vessel surface, then explain the prediction."
  `TODO(user): your part of the work`
- **03 Architecture.** SVG pipeline: mesh → point cloud → PointNet → risk score →
  explainability map. `TODO(user): confirm the steps`
- **04 Outcome.** `TODO(user): metrics, comparison to baseline`
- **05 What I'd do differently.** `TODO(user)`

### 4.4 eSaha (`/work/esaha`)
Sidebar: Role `TODO(user)` · Timeline `TODO(user)` · Team `TODO(user)` · Status `TODO(user): live?` ·
Platform: web · Stack: React, TypeScript, Vite, Tailwind, Lucide, React Router, Context
API, Axios, Supabase (Auth, DB, Storage) · Link: github.com/mohamedelarakitantaoui/eSaha ·
**Big number: 7 modules**
- **01 Problem.** h2: "Asking for help shouldn't mean giving up your privacy."
  `TODO(user): who it's for (students? Morocco?), why you built it`
- **02 Approach.** h2: "One login, seven places to go, nothing public by default."
  Protected routes; specialist directory; real-time chat with providers; private
  journal; appointment calendar; emergency contacts; resources library.
- **03 Architecture.** SVG: React SPA → Supabase Auth / Postgres / Storage / Realtime.
- **04 Outcome.** `TODO(user): users/testers, feedback, Lighthouse, what shipped`
- **05 What I'd do differently.** `TODO(user)`

### 4.5 Preparia (`/work/preparia`)
Sidebar: Role: project intern · Timeline: Jun-Aug 2024 · Client: ITS Elaraki School ·
Status: live · Platform: web · Stack: WordPress, Elementor, H5P · Link: preparia.ma ·
**Big number:** `TODO(user)`
- **01 Problem.** h2: "Exam prep students practise on, instead of reading."
  `TODO(user): which competitive exams, for whom`
- **02 Approach.** h2: "Interactive H5P exercises inside a site the school can edit."
- **03 Architecture.** WordPress + Elementor + H5P; groundwork for a companion mobile app.
- **04 Outcome.** `TODO(user): numbers`
- **05 What I'd do differently.** `TODO(user)`

---

## 5. /about
h1: **About**
Lede: "Computer science at Al Akhawayn in Ifrane, a semester of computer engineering at
Boğaziçi in Istanbul, two summers shipping software for real organisations. Home is Marrakech,
the red city."
`TODO(user): confirm you're from Marrakech, not only based there.`

**Experience** (date left · role + result right, hairlines):
- Jun-Aug 2025 · **Software Development Intern, Intelcia Solutions**: DCE Scraper:
  2.5 h → 15 min for 300 consultations; 3,643-line monolith → 7 microservices; retries
  and health checks ended silent failures.
- Jun-Aug 2024 · **Project Intern, ITS Elaraki School**: delivered Preparia (WordPress +
  Elementor + H5P), improved visuals and assets, prepared the groundwork for a mobile app.
- Jan-May 2023 · **Mentor, AUI Compete Organisation**: mentored peers on academic
  planning and competition readiness.

**Education:**
- 2021-2026 · Al Akhawayn University, Ifrane: B.S. Computer Science, minor in
  Communication Studies. `TODO(user): exact graduation wording (graduated May 2026? honours?)`
- Fall 2024 · Boğaziçi University, Istanbul: exchange student, Computer Engineering.

**Languages:** English · French · Arabic · Spanish (beginner)

**How I work** (`TODO(user): these are drawn from your projects; confirm they're yours`):
- [01] Make failure loud. Retries, health checks, a log someone reads.
- [02] Keep data where it lives. On-prem first when the documents are sensitive.
- [03] Ship in the user's language. Arabic, French or English, right-to-left done properly.
- [04] Name the number. Every project ends with a before and an after.

---

## 6. /services (for clients)
h1: **Three packs, fixed scope.**
Lede: "For teams that copy data by hand, can't search their own documents, or need a
working app before the next meeting. Each pack has a scope, a deliverable, a timeline and a
starting price. Anything bigger starts with a call."

| Pack | Scope | Deliverable | Timeline | From |
|---|---|---|---|---|
| **[01] Automation & scraping** | Python/Selenium bot for `TODO(user): N` portals: login, forms, downloads, retries, health checks, alert on failure | Repo + YAML config + clean Excel/CSV or database tables + a 1-page runbook | `TODO(user)` | `TODO(user)` |
| **[02] AI on your documents** | Private RAG assistant over your PDFs (AR/FR/EN), cited answers, access roles; on-prem (Ollama) or cloud | Deployed assistant + ingestion pipeline + admin guide | `TODO(user)` | `TODO(user)` |
| **[03] Web app MVP** | FastAPI + React (or Supabase) app: auth, dashboard, the 3 core screens, deployment | Live URL + repo + handover call | `TODO(user)` | `TODO(user)` |

Proof under each pack: [01] → DCE Scraper · [02] → Secure Government RAG · [03] → eSaha.

**Process** (`TODO(user): confirm`): 01 Call (30 min, free?) → 02 Written scope + fixed
quote → 03 Build with a demo every week → 04 Handover: code, docs, one month of fixes?

**FAQ:**
- Can it run on our own servers? Yes. The government RAG runs fully on-prem with local models.
- Which languages? Interfaces and documents in Arabic, French and English.
- Who owns the code? `TODO(user)`
- Do you sign an NDA? `TODO(user)`
- How do payments work? `TODO(user): deposit / milestones / currency`
- What if a portal changes its layout? `TODO(user): maintenance offer?`

---

## 7. /cv
h1: **CV** · "Updated `TODO(user): month 2026`"
Downloads (only real files are shown):
- **Software engineering (EN)**: `pdfCv/RenderCV_EngineeringResumes_Theme.pdf` ✓ exists
- AI / ML track (EN): `TODO(user): PDF`
- Data track (EN): `TODO(user): PDF`
- CV « Conseil » (FR): `TODO(user): PDF`
Web CV: same content as `content/cv.md`, rendered at build (no runtime fetch), with one `h1`.

## 8. /creative
h1: **Creative** · "Photography and layout work, made alongside the code."
- **"Creative Moment" (2025)**, video. `TODO(user): title (the video opens on "Journey Through the Lens"?)`. Compressed to ≤ 2 MB loop + poster (the source is 36 MB).
- **"Call for Duty"**, a six-frame photo series shot in a university lab (`featured-photo-1.png`).
- **Magazine app UI**, Adobe XD final project (PDF, 4.5 MB)
- **Movie poster**, Photoshop (PDF is 68 MB → I'll export a WebP preview + a compressed PDF; `TODO(user): OK to compress?`)
- **Newsletter**, InDesign layout (PDF, 0.2 MB)
No placeholders. `TODO(user): more photos to add (the 4 photo slots were empty files).`

## 9. /contact
h1: **Contact**
- Email as text, large: elaraki48@gmail.com (+ copy button)
- Form: name, email, "I'm a…" (recruiter / client / other), message → success state.
  `TODO(user): Netlify Forms (if you deploy on Netlify) or Formspree? mailto fallback stays.`
- Location: Marrakech, Morocco (GMT+1) · Availability: see status lines in §1
- GitHub · CV

## 10. /privacy
"This site sets no cookies and runs no analytics. Theme and language choices stay in
your browser's localStorage. The contact form sends your name, email and message to me
via `TODO(user): provider`; I use them only to reply."

## 11. 404
Big star, h1 **"Not on the map."**, "That page doesn't exist, maybe it moved when the
site was rebuilt." Links: Home · Work · Contact.

---

## 12. ask-mamoun knowledge base (`knowledge.json`)
~34 chunks, each `{id, title, text, answer, tags, lang}` built from §1-§9 only:
identity, location, availability (employers), availability (clients), languages, education
×2, experience ×3, each project ×(summary, stack, number, status) for the 5 top projects,
archive ×2, services ×3, process, contact, kaggle, next idea, this site's stack.
FR chunks mirror EN so FR visitors can ask in French.
TODO items are **excluded** from the corpus, so the terminal never says "TODO".

---

## 13. Copy hygiene check (run on this file)
- Banned words (unlock, elevate, empower, seamless, leverage, delve): **0**
- "It's not just X, it's Y": **0** · italic words in headings: **0**
- Em dashes: 0 in body copy (one in the ask-mamoun output mock, as a UI separator)
- Cover-the-name test on every h1/h2: each holds a number, a named place/organisation, or
  a constraint specific to you. Weakest: "Three things I get paid to build." (generic
  shape, saved by the three specific rows below it). `TODO(user): happy with it?`

---

## 14. TODO(user) list (everything above, in one place)
1. 95% vs 10×/90%: real figures (§0.1)
2. Intelcia: procurement vs chatbot-data story; exact company name (§0.2)
3. DCE portals: Moroccan / French; nameable? (§0.3)
4. Confirm repo-only claims: -46% code, 0 silent failures, Click, Keycloak/Llama 3.2/Aya 8B/E5/NGINX (§0.4)
5. DCE baseline: what the 2.5 h measured (§0.5)
6. Phone public or hidden
7. Relocation / work-authorisation wording for EU/US/CA 2027
8. Proof strip vs stack marquee (one marquee)
9. DCE: team size, still in use?, screenshot/recording, "what I'd do differently", pull quote in your words
10. Gov RAG: role, team, start date, public screenshots, client name, done vs in-progress list, eval numbers, chapter 05
11. AneuXplain: venue, year, co-authors, DOI/link, your contribution, metric, dataset, explainability methods, showable figure, chapter 05
12. eSaha: role/context, a stronger number, screenshots, live?, chapter 05
13. Preparia: exams covered, one number, chapter 05
14. Courses & Lessons App: real link
15. Kaggle: profile link and score to show
16. Graduation wording; "from Marrakech" vs "based in"
17. "How I work" principles: confirm
18. Services: per-pack scope count, timeline, starting price; process; FAQ answers (IP, NDA, payments, maintenance)
19. CV: update month; AI-ML, Data and FR "Conseil" PDFs
20. Creative: video title; OK to compress the 68 MB poster PDF; more photos
21. Contact form provider (Netlify Forms / Formspree)
22. Review the full FR translation once built
