# sitemap.md

Astro static output, i18n routing: English at `/`, French at `/fr/`. Arabic is wired
(`dir="rtl"`, IBM Plex Sans Arabic, logical CSS properties) but not published until the
AR copy exists.

```
/                         Home
/work                     All projects + archive (filter pills)
/work/dce-scraper         Case study: DCE Scraper (Intelcia)            ← strongest, first
/work/secure-gov-rag      Case study: Secure Government RAG (in development)
/work/aneuxplain          Case study: AneuXplain (research paper)
/work/esaha               Case study: eSaha
/work/preparia            Case study: Preparia (ITS Elaraki)
/about                    Story, experience list, education, languages, how I work
/services                 3 packs + process + FAQ (for clients)
/cv                       Web CV + downloads
/creative                 Photography + design work (real items only)
/contact                  Email as text, form, location, availability
/privacy                  Short privacy note (no cookies, what the form stores)
/404                      Star symbol, "this page isn't on the map", links home
/fr/...                   French mirror of every page above (slugs stay English)
/sitemap-index.xml        @astrojs/sitemap, with hreflang en/fr
/robots.txt
/og/<page>.png            generated at build: star + page title
/knowledge.json           ask-mamoun terminal corpus (built from content collections)
```

## Navigation (6 items + logo, ≤ 7)
Logo (star + "Mamoun T. El Araki") → `/`
**Work · About · Services · CV · Creative · Contact**
Top-right: `EN | FR` · theme toggle (only if light theme ships) · **Hire me** (→ `/contact?for=role`)
After the hero the bar collapses into a floating **"Menu ✦"** pill (bottom-centre on
mobile, top-right on desktop). The pill opens a full-screen menu with the same 6 links plus
email-as-text.

## Primary CTA per audience (repeated hero → mid → footer)
| Audience | CTA | Hero | Mid | Footer |
|---|---|---|---|---|
| Employers | **Download CV** / "Hire me" | ✓ | Two doors | ✓ |
| Clients | **Start a project** (→ `/services`) | — (hero is employer-first) | Two doors, Capabilities | ✓ |

## Cmd/Ctrl+K palette entries
Go to: Home, Work, each case study, About, Services, CV, Creative, Contact ·
Actions: Copy email, Download CV (PDF), Switch to FR/EN, Toggle theme, Open GitHub,
Ask the terminal ("ask-mamoun …" focuses the terminal with the query typed in).
Keyboard: `Ctrl/⌘+K` opens, `↑↓` moves, `Enter` runs, `Esc` closes; it also opens from a
visible "⌘K" pill in the header, so mouse and touch users can find it.
