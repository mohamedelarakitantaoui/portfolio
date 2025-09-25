import { useEffect, useRef, useState } from 'react'

// Basic i18n dictionary copied from current app
const I18N = {
  en: {
    brandName: 'Mamoun Tantaoui El Araki',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.creative': 'Creative',
    'nav.projects': 'Projects',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Portfolio',
    'hero.role': 'Software Engineer',
    'hero.tagline': 'Turning ideas into working apps & intelligent bots.',
    'hero.available': 'Available for opportunities',
    'cta.viewProjects': 'View Projects',
    'cta.viewCV': 'Read CV',
    'cta.exploreCode': 'Explore Code',
    'cta.readCase': 'Read Technical Details',
    'sections.projects': 'Projects',
    'sections.about': 'About Me',
    'sections.creative': 'Creative Work',
    'sections.projectsSub': 'Selected work — case study cards with tech stacks and links.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'contact.sub': 'Let’s build something great together.',
    'about.sub': 'A quick intro — who I am, what I study, and how I think.',
    'about.bio': 'I’m Mamoun, a builder who blends software engineering with creative thinking. I enjoy shipping clean, robust systems and telling compelling product stories.',
    'creative.sub': 'Photography & Design selections.',
    'creative.photo': 'Photography',
    'creative.design': 'Design Showcase',
    'hero.name': 'Mamoun Tantaoui El Araki',
    'contact.email': 'Email',
    'cv.downloadTxt': 'Download CV (txt)',
    'cv.downloadPdf': 'Download PDF',
    'cv.loading': 'Loading CV…',
    'footer.built': 'Built with React, Vite & Tailwind'
  },
  fr: {
    brandName: 'Mamoun Tantaoui El Araki',
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.creative': 'Créatif',
    'nav.projects': 'Projets',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Portfolio',
    'hero.role': 'Ingénieur Logiciel',
    'hero.tagline': 'Transformer des idées en applis et bots intelligents.',
    'hero.available': 'Disponible pour opportunités',
    'cta.viewProjects': 'Voir les projets',
    'cta.viewCV': 'Lire le CV',
    'cta.exploreCode': 'Voir le code',
    'cta.readCase': 'Lire l’étude technique',
    'sections.projects': 'Projets',
    'sections.about': 'À propos de moi',
    'sections.creative': 'Travaux créatifs',
    'sections.projectsSub': 'Sélection — cartes d’études de cas, stacks et liens.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'contact.sub': 'Construisons quelque chose de génial.',
    'about.sub': 'Présentation rapide — qui je suis, ce que j’étudie et ma façon de penser.',
    'about.bio': 'Je suis Mamoun, un bâtisseur qui mêle ingénierie logicielle et pensée créative. J’aime livrer des systèmes propres et robustes et raconter de belles histoires produit.',
    'creative.sub': 'Sélection de Photographie & Design.',
    'creative.photo': 'Photographie',
    'creative.design': 'Design',
    'hero.name': 'Mamoun Tantaoui El Araki',
    'contact.email': 'Email',
    'cv.downloadTxt': 'Télécharger CV (txt)',
    'cv.downloadPdf': 'Télécharger PDF',
    'cv.loading': 'Chargement du CV…',
    'footer.built': 'Créé avec React, Vite & Tailwind'
  },
  ar: {
    brandName: 'مامون تنتاوي العرَقي',
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة',
    'nav.creative': 'الأعمال الإبداعية',
    'nav.projects': 'المشاريع',
    'nav.cv': 'السيرة الذاتية',
    'nav.contact': 'تواصل',
    'hero.eyebrow': 'ملفّ أعمال',
    'hero.role': 'مهندس برمجيات',
    'hero.tagline': 'نحوّل الأفكار إلى تطبيقات وعُمّال ذكيين.',
    'hero.available': 'متاح لفرص جديدة',
    'cta.viewProjects': 'استعراض المشاريع',
    'cta.viewCV': 'قراءة السيرة',
    'cta.exploreCode': 'استعراض الشيفرة',
    'cta.readCase': 'قراءة التفاصيل التقنية',
    'sections.projects': 'المشاريع',
    'sections.about': 'نبذة عني',
    'sections.creative': 'الأعمال الإبداعية',
    'sections.projectsSub': 'مختارات — بطاقات دراسة حالة مع التقنيات والروابط.',
    'sections.cv': 'السيرة الذاتية',
    'sections.contact': 'تواصل',
    'contact.sub': 'لنصنع شيئًا رائعًا معًا.',
    'about.sub': 'نبذة سريعة — من أنا، ماذا أدرس، وكيف أفكر.',
    'about.bio': 'أنا مامون، أبني حلولًا تمزج بين هندسة البرمجيات والتفكير الإبداعي. أستمتع ببناء أنظمة نظيفة ومتينة وسرد قصص منتج مقنعة.',
    'creative.sub': 'مختارات من التصوير والتصميم.',
    'creative.photo': 'التصوير',
    'creative.design': 'عرض التصميم',
    'hero.name': 'مامون تنتاوي العرَقي',
    'contact.email': 'البريد الإلكتروني',
    'cv.downloadTxt': 'تنزيل السيرة (نص)',
    'cv.downloadPdf': 'تنزيل PDF',
    'cv.loading': 'جارٍ تحميل السيرة…',
    'footer.built': 'تم بناؤه بـ React وVite وTailwind'
  }
}

type Lang = keyof typeof I18N
type Dict = typeof I18N.en
type I18nKey = keyof Dict

const useLocalStorage = <T,>(key: string, initial: T) => {
  const [val, setVal] = useState<T>(() => {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : initial
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [key, val])
  return [val, setVal] as const
}

const useLang = () => {
  const [lang, setLang] = useLocalStorage<Lang>('lang', 'en')
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])
  return {
    lang,
    setLang,
    t: (k: I18nKey) => (I18N[lang] as Dict)[k] ?? (I18N.en as Dict)[k] ?? String(k),
  }
}

const projects = [
  {
    id: 'gov-rag',
    title: 'Secure Government RAG',
    description:
      'On‑prem RAG with local LLM, role‑based access, full audit logging, multilingual UI (AR/FR/EN), citation‑based chatbot, and PDF→Excel document extraction.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL+pgvector', 'MinIO', 'Keycloak', 'Docker', 'AI'],
    caseStudy: '/content/projects/gov-rag.md',
    links: { github: 'https://github.com/mohamedelarakitantaoui', demo: '#' },
  },
  {
    id: 'dce-scraper',
    title: 'DCE Scraper — Microservices',
    description: 'Advanced procurement scraper refactored from monolith to 7 microservices with 90%+ speed gains and zero silent failures.',
    tech: ['Python 3.12', 'Selenium', 'Microservices', 'Multithreading', 'Async', 'Click CLI', 'YAML config'],
    caseStudy: '/content/projects/dce-scraper.md',
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
  {
    id: 'esaha',
    title: 'eSaha — Mental Health Platform',
    description: 'Privacy‑first healthcare platform: secure auth, real‑time chat, journaling, scheduling, and resources library.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Axios'],
    caseStudy: '/content/projects/esaha.md',
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
]

function useIntersectionReveal<T extends Element>() {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add('opacity-100', 'translate-y-0')),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

const Chip = ({ children }: { children: string }) => (
  <span className="inline-block rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2 py-1 mr-1 mb-1">
    {children}
  </span>
)

const SectionHead = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {sub && <p className="text-slate-600 dark:text-slate-400">{sub}</p>}
  </div>
)

export default function App() {
  const { lang, setLang, t } = useLang()
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark')
  const [modalMd, setModalMd] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('Case Study')
  const [cvHtml, setCvHtml] = useState<string>('')
  const revealRef = useIntersectionReveal<HTMLDivElement>()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    fetch('/content/cv.md')
      .then((r) => r.text())
      .then((md) => setCvHtml(markdownToHtml(md)))
      .catch(() => setCvHtml('<p>Unable to load CV. Please download instead.</p>'))
  }, [])

  const onOpenCase = async (path: string, title: string) => {
    setModalMd('Loading…')
    setModalTitle(title)
    try {
      const md = await fetch(path).then((r) => r.text())
      setModalMd(markdownToHtml(md))
    } catch {
      setModalMd('Unable to load case study right now.')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span>{t('brandName')}</span>
          </a>
          <nav className="hidden md:flex gap-4 text-sm">
            <a href="#top">{t('nav.home')}</a>
            <a href="#about">{t('nav.about')}</a>
            <a href="#projects">{t('nav.projects')}</a>
            <a href="#creative">{t('nav.creative')}</a>
            <a href="#cv">{t('nav.cv')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className="relative">
              <select
                aria-label="Language"
                className="bg-transparent border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
                value={lang}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value as Lang)}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
            <div>
              <p className="uppercase tracking-wide text-slate-500">{t('hero.eyebrow')}</p>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <span>{t('hero.name')}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">—</span>
                <span className="text-indigo-500">{t('hero.role')}</span>
              </h1>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{t('hero.tagline')}</p>
              <div className="mt-5 flex gap-3">
                <a href="#projects" className="px-4 py-2 rounded bg-indigo-600 text-white">
                  {t('cta.viewProjects')}
                </a>
                <a href="#cv" className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700">
                  {t('cta.viewCV')}
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-40 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 opacity-80" />
            </div>
          </div>
        </section>

        <section id="projects" className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHead title={t('sections.projects')} sub={t('sections.projectsSub')} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={revealRef}>
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur"
                >
                  <div className="h-28 rounded bg-slate-100 dark:bg-slate-800 mb-3 flex items-center justify-center text-slate-400">
                    {p.title
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 4)
                      .toUpperCase()}
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{p.description}</p>
                  <div className="mt-2">
                    {p.tech?.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {p.links?.github && (
                      <a
                        className="px-3 py-1 text-sm rounded border border-slate-300 dark:border-slate-700"
                        href={p.links.github}
                        target="_blank"
                        rel="noopener"
                      >
                        {t('cta.exploreCode')}
                      </a>
                    )}
                    {p.caseStudy && (
                      <button
                        className="px-3 py-1 text-sm rounded bg-indigo-600 text-white"
                        onClick={() => onOpenCase(p.caseStudy!, p.title)}
                      >
                        {t('cta.readCase')}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800 h-48" />
            <div>
              <SectionHead title={t('sections.about')} sub={t('about.sub')} />
              <p className="text-slate-700 dark:text-slate-300">{t('about.bio')}</p>
              <ul className="list-disc ml-5 mt-3 text-slate-700 dark:text-slate-300">
                <li>EN • FR • AR</li>
                <li>Software Engineering & AI</li>
                <li>Photography & Visual Design</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="creative" className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHead title={t('sections.creative')} sub={t('creative.sub')} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['photo-1','photo-2','photo-3','photo-4','design-1','design-2'].map((k) => (
                <div key={k} className="aspect-video rounded bg-slate-100 dark:bg-slate-800" />
              ))}
            </div>
          </div>
        </section>

        <section id="cv" className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{t('sections.cv')}</h2>
              <div className="flex gap-2">
                <a className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700" href="/content/cv.md" download>
                  {t('cv.downloadTxt')}
                </a>
                <a className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700" href="/content/cv.pdf" download>
                  {t('cv.downloadPdf')}
                </a>
              </div>
            </div>
            <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cvHtml || `<div>${t('cv.loading')}</div>` }} />
          </div>
        </section>

        <section id="contact" className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHead title={t('sections.contact')} sub={t('contact.sub')} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a className="rounded border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3" href="mailto:you@example.com" target="_blank" rel="noopener">
                <span>✉️</span>
                <div>
                  <div className="text-sm text-slate-500">{t('contact.email')}</div>
                  <div>you@example.com</div>
                </div>
              </a>
              <a className="rounded border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3" href="https://github.com/yourhandle" target="_blank" rel="noopener">
                <span>🐙</span>
                <div>
                  <div className="text-sm text-slate-500">GitHub</div>
                  <div>github.com/yourhandle</div>
                </div>
              </a>
              <a className="rounded border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3" href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noopener">
                <span>💼</span>
                <div>
                  <div className="text-sm text-slate-500">LinkedIn</div>
                  <div>linkedin.com/in/yourhandle</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {modalMd && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.currentTarget === e.target) setModalMd(null)
          }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-3xl w-full p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{modalTitle}</h3>
              <button onClick={() => setModalMd(null)} aria-label="Close">×</button>
            </div>
            <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: modalMd }} />
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-sm text-slate-500">
          <span>
            © {new Date().getFullYear()} {t('brandName')}
          </span>
          <span>•</span>
          <span>{t('footer.built')}</span>
        </div>
      </footer>
    </div>
  )
}

function markdownToHtml(md: string) {
  let html = md
    .replace(/^###\s?(.*)$/gim, '<h3>$1</h3>')
    .replace(/^##\s?(.*)$/gim, '<h2>$1</h2>')
    .replace(/^#\s?(.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n-\s(.*)/gim, '<ul><li>$1</li></ul>')
    .replace(/\n\n/g, '<br/><br/>' )
  html = html.replace(/<\/ul>\s*<ul>/g, '')
  return html
}
