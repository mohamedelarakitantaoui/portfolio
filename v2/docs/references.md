# references.md: Stage 1 reference audit

Captured 2026-10-04 with Playwright (Chromium) at 1440x900 and 390x844. I took a frame at
600 ms for first paint, a frame after load, and viewport-by-viewport scroll shots, then ran
the skill's extraction snippet plus a contrast sampler.
Screenshots are in the session scratchpad (`tools/audit/`). I extracted **patterns only**:
no copy, images, logos or layouts are reused.

---

## 0. My current site (http://localhost:5500, working copy on `main`)

| | |
|---|---|
| Palette | bg `#060C1E` / navy bands `#0B1530`, text `#EEF2FB`, accent orange `~#FF6B2C`, light bands `#EEF2FB` |
| Type | Unbounded 700 display (h2 57.6px, -0.025em), DM Sans body, Noto Kufi Arabic |
| Libraries | none (vanilla JS, IntersectionObserver reveal) |
| Page | one 10,524px-tall page, 1 `h1` in the working copy (**HEAD on GitHub still renders 2**: `cv.md`'s `# Name` becomes an `<h1>` in the committed `main.js:428`; the working copy demotes it) |
| First paint | full hero at 600 ms, good |
| Load | `hero-video.mp4` is **36 MB**, `movie-poster-design.pdf` is **68 MB**, 7 images in `assets/img` are **0-byte** files |

**Section anatomy:** sticky header pill nav -> poster hero -> stack ticker -> 01 Projects
(2 large navy cards + 3 white cards) -> 02 About (photo in star, skill cards, Journey) ->
03 Creative (video, 1 photo + 5 "Coming soon" tiles, 3 design cards) -> 04 CV (markdown
fetched at runtime) -> 05 Contact ("SALAM" sandwich + mailto form) -> footer. A floating
"Like what you see?" bar and a back-to-top button sit on top of the content.

### KEEP (signature, verified on screen)
- Layered hero: giant MAMOUN behind the cutout portrait (`IMG-20250509-WA0012-removebg-preview.png`, 353x364, edges are clean).
- 8-point star (`#i-star`, two overlapping squares) used as logo, bullets and halo.
- Right stat rail: 95% / 7 microservices / EN·FR·AR. **The 95% must be corrected, see content.md §0.**
- "Now building: Secure Government RAG" card, bottom-right.
- Bottom-centre "MARRAKECH · IFRANE · ISTANBUL".
- Stack marquee. Previously / In progress / Next journey.
- CV section with PDF download.
- The second sandwich ("SALAM" behind the star) is a good, reusable idea. Keep it, at smaller scale.

### DROP / FIX (verified)
| Issue | Evidence |
|---|---|
| Headline overlapping MAMOUN | **Already fixed in the working copy** at 1440 and 390 (headline sits below the word). In v2 it gets its own corner anyway. |
| MAMOUN filled with a blue gradient (`background-clip:text`) | Banned tell: "gradient-filled headline text". |
| Navy + orange palette | Banned default ("navy + orange startup combo"). |
| Identical rounded cards everywhere | Projects, skills, contact, design: all boxed. Banned tell. |
| 5 "Coming soon" photo tiles | Banned tell. 0-byte `photo-1..4.jpg` / `design-1..3.jpg` behind them. |
| **Banned-tell count: 4** (gradient headline, identical cards, Coming soon, plus the navy/orange default) | QA would fail at >= 3. |
| Two `h1` on the live (committed) site | `main.js` HEAD line 428: `# ` becomes `<h1>`. |
| Low contrast | Project kind/description text `#8FA3D1` on white cards is **2.25:1** (fails AA). |
| Floating "Like what you see?" bar | Covers CV text while you read (seen in 4 of 12 scroll shots). |
| One long page | No project URLs, no case studies. The "case study" is a modal over a markdown file. |
| AneuXplain missing | Not anywhere in the repo. |
| Contact | mailto form. Email *is* visible as text in the contact head, but not in the footer. |
| "Intelcia IT Solutions: data collection for AI chatbot training" (Journey) | Contradicts the CV ("procurement document extraction"). See TODO in content.md. |

---

## 1. abdelilahnossair.com (the reference you like)

Pages audited: `/`, `/portfolio`, `/portfolio-peerfit`, `/about`, `/services`.

| | |
|---|---|
| Palette | **Correction to your notes:** body bg is **white `#FEFEFE`**, text `#1D1D1D`. Only the hero, footer and "Let's Connect" band are near-black (`#121212`). Accent: a dark red photo grade in the hero; small orange-red `#E2552B`-ish "CHAPTER 01" labels and pull-quote rule on case studies. |
| Type | DM Sans only, for display and body. Display 72-150px, weight 600-700, tracking **-5%** (`-4.68px` at 72px), line-height **0.94-1.0**. Case-study h2 44px/500. Labels ~11px uppercase. |
| Libraries | GSAP, Swiper, jQuery. No Lenis (custom smooth scroll not detected). |
| Load | ~8-9 s to `load` event. |

**Home anatomy:** dark hero (name top-left in caps, statement top-right, round "Let's
Talk" button, socials, two CTAs) -> discipline links strip -> About me (h2 + "Explore my
experience" pill) -> logo strip of schools/employers -> **Selected Work: sticky title
column left, project cards scroll right** -> **[01]-[03] capabilities with hairline
dividers** -> **split "For employers / For clients" block** -> Insights (4 articles) ->
dark "Let's discuss what's next" footer with **giant name** and big email.

**/portfolio:** big h1 + right-aligned intro, **filter pills** (All / Digital Platforms /
AI Products / Research) + "Featured" sort, 2-column image grid with title, one line and
tags. **No numbers on any card.**

**/portfolio-peerfit (case study):** breadcrumb, h1 + one line + tag pills -> **sticky
"Project info" sidebar** (Status, Version, Role, Platforms, Stack, Languages, Services
list, "Explore app" button, cover) -> right column **"CHAPTER 01 · PRODUCT OVERVIEW"
mono label + h2 claim + prose** -> **pull quote with an accent left rule** -> Chapter 03
Architecture as **numbered rows (01 Mobile client / 02 ... ) with hairlines** -> Chapter 04
Outcome with **3 big numbers** (15+ / 4 / 3) -> full-bleed device mockups -> centred
quote band -> **"Next project ->" giant link** (LucidLink at 180px).

**/about:** "About me" h1 + two CTAs -> full-bleed photo -> paragraph -> **Experience as
a dated list (date left, role + result right, hairline between rows)** -> "How I approach
engineering" 4 steps with images -> FAQ -> footer.

**/services:** huge h1 ("Systems that ...", 150px), email + phone top-right -> full-bleed
abstract image -> **6 numbered packs as a list ([01]-[06], name + thumbnail)** -> "17+
shipped products" counter -> FAQ accordion with a portrait -> contact form + 2 offices.

**Patterns to take:** -5% tracking / 0.95 line-height display; uppercase label + arrow
above each h2; sticky title column with scrolling cards; [01] numbered rows with
hairlines; employer/client split; sticky meta sidebar + "Chapter 0X" chapters + pull
quote; dated experience list; floating "MENU" pill after the hero; giant name in the
footer; productized packs as a numbered list; filter pills on /work.

**Weak spots (where v2 wins):**
1. **Blank first paint.** At 600 ms the hero shows only the logo, empty circles and two
   empty white boxes. Name, headline and button labels arrive later (GSAP-gated). v2 is
   static HTML: name, headline and CTAs exist before JS.
2. **Contrast.** Grey intro copy on the white hero areas and grey footer meta are faint.
   The "Let's Discuss What's Next" footer greys look roughly 2-3:1 by eye on `#121212`.
   v2 computes every text colour (see design-tokens.md).
3. **No numbers on the portfolio grid.** Only one home card (Phishing, 98.1% F1) carries
   a metric in its sentence. v2: one result per card, as a separate stat.
4. **Counters render "0+" before animating.** "17+ shipped" reads "0+" in a static
   screenshot. v2 never animates a number up from 0 in the HTML.
5. **12 projects on /portfolio.** The weakest items dilute the strongest. v2 has 5 plus an archive list.
6. **Generic stock imagery** (AI laptop renders, abstract red particles). v2 uses real
   screenshots and SVG diagrams only.

---

## 2. bryangarage.dev (Awwwards-recognised, "AI Garage")

| | |
|---|---|
| Palette | bg `#141414`, text `#FFFFFF`, accent amber/orange glow (CRT look), sepia/terracotta full-bleed in the timeline scene |
| Type | Geist Sans, **Instrument Serif** accents, Geist Mono for labels/meta |
| Stack | Next.js (Turbopack), no GSAP/Lenis globals |

**Anatomy:** intro paragraph with employer names in bold (BMW, Volkswagen, Google, Apple)
and a live local clock "AFRICA/CASABLANCA" -> **"Garage CLI" interactive terminal
("PRESS ANY KEY")** + "HIDE TERMINAL / SAY HI" toggles -> **horizontal career timeline
(2020-2027 Gantt bars with company logos)** -> project cards in a 2x2 hairline grid
(name, WIP pill, one line, mono tags) -> immersive 3D card carousel ("scroll or arrows to
travel"). **"Jump to ⌘K" palette pill** fixed top-right.

**Patterns:** Cmd/Ctrl+K command palette as a visible pill; terminal as the signature
interaction; career timeline with dated bars; mono tags.
**Weak spots:** most of the bio is a paragraph, not scannable; the "????" coming-soon
tile is a placeholder; the terminal is a toy (doesn't prove the skill he sells).
v2's terminal does real retrieval and shows its scores.

---

## 3. kstoimenov.com (Awwwards-recognised UX portfolio)

| | |
|---|---|
| Palette | bg `#121212`, text `#FFFFFF`, acid green accent (glyphs and hero) |
| Type | Lausanne (grotesk) + Manier (serif italic accents) |

**Anatomy:** full-screen animated hero with a short line -> **statement paragraph whose
words light up grey -> white as you scroll, with inline coloured glyphs between phrases**
-> showreel band -> **4-stat row with hairline separators (12 / 87 / 3+ / 6k)** ->
"Services+" list as a giant centred typographic list with symbols -> case-study cards
with tags -> pricing page. Floating pill nav (Work / Services / Pricing / About / Let's talk).

**Patterns:** scroll-scrubbed word highlight with inline glyphs (v2 uses the khatam star
as the glyph); stat row with hairlines; services as a typographic list.
**Weak spots:** the h1 is a 24px generic line ("From Wireframes to Wow's"), which fails
the cover-the-name test. The statement is generic ("holistic approach", "breathe life").

---

## 4. dennissnellenberg.com (Awwwards SOTD portfolio)

| | |
|---|---|
| Palette | grey photo bg, white type, near-black `#1C1D20` pills |
| Type | custom "Dennis Sans" grotesk, weight ~450 |
| Libraries | GSAP + ScrollTrigger + Locomotive Scroll, jQuery |

**Anatomy:** preloader cycling "Hello / Bonjour / स्वागत हे / ..." -> hero = full-bleed
portrait with **the name as a giant horizontal marquee across the body**, location pill
("Located in the Netherlands" + globe) on the left edge, role top-right.

**Patterns:** multilingual greeting preloader (v2: star draws itself, plus an optional
"Salam / Bonjour / Hello" line, max 1 s); location pill.
**Weak spots:** **2 `h1`**, 20+ `h2` used for the greeting words and nav. The preloader
gates the content. The email is 1:1 contrast until hovered.

---

## 5. brittanychiang.com (the classic engineer portfolio)

| | |
|---|---|
| Palette | bg `#0F172A` (slate navy), body `#94A3B8`, headings `#E2E8F0`, teal accent |
| Type | Inter only |

**Anatomy:** **sticky left column** (name, role, one line, in-page nav with a growing
line indicator, socials) + right column scrolling About -> **Experience as a dated list
(date left, role · company, result, tag pills)** -> Projects with thumbnail + one number
(★ 722, 100k+ installs) -> "View full project archive" -> writing.

**Patterns:** date-left experience list; one honest number per project; project archive
link; sticky identity column.
**Weak spots:** this is the template everyone copied. Inter + slate navy + teal pills now
*reads* as a template. v2 borrows only the information design.

---

## Pattern inventory → where it lands in v2

| Pattern | Source | v2 location |
|---|---|---|
| Layered poster hero, star replaces the O | current site | Home hero |
| -5% tracking / 0.95 lh heavy display | Abdelilah | all h1/h2 |
| Uppercase label + arrow above h2 | Abdelilah | every section |
| Sticky title column + scrolling cards | Abdelilah, Brittany | Home "Selected work" |
| [01]-[03] rows with hairlines | Abdelilah, Kstoimenov | Capabilities, services packs, architecture chapter |
| Employer / client split | Abdelilah | Home "Two doors" |
| Sticky meta sidebar + Chapter 0X + pull quote + Next project | Abdelilah | `/work/<slug>` |
| Dated experience list | Abdelilah, Brittany | `/about`, `/cv` |
| Floating Menu pill after hero | Abdelilah, Kstoimenov | global |
| Giant name in footer | Abdelilah | global |
| Filter pills | Abdelilah | `/work` |
| Scroll-scrubbed statement with glyphs | Kstoimenov | Home statement |
| Stat row with hairlines | Kstoimenov | case-study Outcome chapter |
| Cmd/Ctrl+K palette | Bryan | global |
| Terminal as signature interaction | Bryan | Home Now/Lab (`ask-mamoun`) |
| Career timeline | Bryan | `/about` (dated list; horizontal bars on ≥1024px) |
| Location pill / greeting preloader | Dennis | hero, preloader |
| One number per project + archive link | Brittany | `/work` |
