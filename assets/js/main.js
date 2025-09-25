// Utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// i18n dictionary (headings/labels only; project content remains EN to keep style concise)
const I18N = {
  en: {
    brandName: 'Mamoun Tantaoui El Araki',
    'nav.projects': 'Projects',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Portfolio',
    'hero.role': 'Software Engineer',
    'hero.tagline': 'Turning ideas into working apps & intelligent bots.',
    'hero.available': 'Available for opportunities',
    'cta.viewProjects': 'View Projects',
    'cta.viewCV': 'Read CV',
    'sections.projects': 'Projects',
    'sections.projectsSub': 'Selected work — case study cards with tech stacks and links.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'contact.sub': 'Let’s build something great together.',
    'cv.downloadTxt': 'Download CV (txt)',
  'cv.downloadPdf': 'Download PDF',
    'cv.loading': 'Loading CV…',
    'footer.built': 'Built with HTML, CSS & JS'
  },
  fr: {
    brandName: 'Mamoun Tantaoui El Araki',
    'nav.projects': 'Projets',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Portfolio',
    'hero.role': 'Ingénieur Logiciel',
    'hero.tagline': 'Transformer des idées en applis et bots intelligents.',
    'hero.available': 'Disponible pour opportunités',
    'cta.viewProjects': 'Voir les projets',
    'cta.viewCV': 'Lire le CV',
    'sections.projects': 'Projets',
    'sections.projectsSub': 'Sélection — cartes d’études de cas, stacks et liens.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'contact.sub': 'Construisons quelque chose de génial.',
    'cv.downloadTxt': 'Télécharger CV (txt)',
  'cv.downloadPdf': 'Télécharger PDF',
    'cv.loading': 'Chargement du CV…',
    'footer.built': 'Créé avec HTML, CSS & JS'
  },
  ar: {
    brandName: 'مامون تنتاوي العرَقي',
    'nav.projects': 'المشاريع',
    'nav.cv': 'السيرة الذاتية',
    'nav.contact': 'تواصل',
    'hero.eyebrow': 'ملفّ أعمال',
    'hero.role': 'مهندس برمجيات',
    'hero.tagline': 'نحوّل الأفكار إلى تطبيقات وعُمّال ذكيين.',
    'hero.available': 'متاح لفرص جديدة',
    'cta.viewProjects': 'استعراض المشاريع',
    'cta.viewCV': 'قراءة السيرة',
    'sections.projects': 'المشاريع',
    'sections.projectsSub': 'مختارات — بطاقات دراسة حالة مع التقنيات والروابط.',
    'sections.cv': 'السيرة الذاتية',
    'sections.contact': 'تواصل',
    'contact.sub': 'لنصنع شيئًا رائعًا معًا.',
    'cv.downloadTxt': 'تنزيل السيرة (نص)',
  'cv.downloadPdf': 'تنزيل PDF',
    'cv.loading': 'جارٍ تحميل السيرة…',
    'footer.built': 'تم بناؤه بـ HTML وCSS وJS'
  }
};

// Project data
const projects = [
  {
    id: 'quiz-game',
    title: 'Quiz Game App',
    description: 'Kotlin app powered by Firebase and coroutines. Real-time questions, leaderboards, and offline cache.',
    tech: ['Kotlin', 'Firebase', 'Coroutines'],
    links: { github: '#', demo: '#' },
  },
  {
    id: 'preparia',
    title: 'Preparia Platform',
    description: 'WordPress-based learning platform using Elementor and H5P interactive content.',
    tech: ['WordPress', 'Elementor', 'H5P'],
    links: { site: '#'},
  },
  {
    id: 'courses-lessons',
    title: 'Courses & Lessons App',
    description: 'Flutter mobile app with WordPress backend — browse courses, lessons, and media content.',
    tech: ['Flutter', 'Dart', 'WordPress'],
    links: { github: '#', demo: '#' },
  },
  {
    id: 'essaha',
    title: 'Essaha App',
    description: 'Self-developed mobile app. Clean architecture, robust state management, and polished UI.',
    tech: ['Mobile', 'Design', 'Clean Architecture'],
    links: { demo: '#' },
  },
  {
    id: 'dce-scraper',
    title: 'DCE Scraper Bot',
    description: 'Automation bot that scrapes and downloads consultation files end-to-end.',
    tech: ['Python', 'Playwright/Selenium', 'Scraping'],
    links: { github: '#'},
  },
  {
    id: 'ai-chatbot-pdf-excel',
    title: 'AI Chatbot & PDF→Excel Converter',
    description: 'Chatbot with citation-based answers plus a utility to convert PDF documents into Excel tables.',
    tech: ['AI', 'Embeddings', 'ETL'],
    links: { demo: '#', github: '#' },
  },
];

// Render project cards
function renderProjects() {
  const grid = $('#projectsGrid');
  if (!grid) return;
  grid.innerHTML = projects.map(p => `
    <article class="project-card" data-reveal data-id="${p.id}">
      <div class="project-media" aria-hidden="true">
        <span>${p.title.split(' ').map(w=>w[0]).join('').slice(0,4).toUpperCase()}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="tech-list">
          ${p.tech.map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
        <div class="card-actions">
          ${Object.entries(p.links).map(([k,v]) => `<a class="btn btn-secondary" href="${v}" target="_blank" rel="noopener">${labelForLink(k)}</a>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function labelForLink(kind){
  switch(kind){
    case 'github': return 'GitHub';
    case 'demo': return 'Live Demo';
    case 'site': return 'Website';
    default: return 'Link';
  }
}

// Theme toggle
function initTheme(){
  const btn = $('#themeToggle');
  const ls = localStorage.getItem('theme');
  if (ls) document.documentElement.setAttribute('data-theme', ls);
  btn?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// Language switcher (LTR/RTL aware)
function initLang(){
  const currentBtn = $('#langCurrent');
  const menu = $('#langMenu');
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
  currentBtn.textContent = saved.toUpperCase() === 'AR' ? 'AR' : saved.toUpperCase();
  currentBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('show');
    menu.classList.toggle('show', !isOpen);
    currentBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  menu.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const lang = li.dataset.lang;
    setLang(lang);
    currentBtn.textContent = lang === 'ar' ? 'AR' : lang.toUpperCase();
    menu.classList.remove('show');
    currentBtn.setAttribute('aria-expanded', 'false');
    localStorage.setItem('lang', lang);
  });
  document.addEventListener('click', (e)=>{
    if(!menu.contains(e.target) && e.target !== currentBtn) menu.classList.remove('show');
  })
}

function setLang(lang){
  const dict = I18N[lang] || I18N.en;
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

// Scroll reveal
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  $$('[data-reveal]').forEach(el => io.observe(el));
}

// Load CV markdown (simple fetch and render minimal)
async function loadCV(){
  const el = $('#cvContent');
  if(!el) return;
  try{
    const res = await fetch('content/cv.md');
    const md = await res.text();
    el.innerHTML = markdownToHtml(md);
    el.removeAttribute('aria-busy');
  }catch(err){
    el.innerHTML = '<p>Unable to load CV. Please download instead.</p>';
  }
}

function markdownToHtml(md){
  // very small MD -> HTML: headings, bold, italics, links, lists, paragraphs
  let html = md
    .replace(/^###\s?(.*)$/gim, '<h3>$1</h3>')
    .replace(/^##\s?(.*)$/gim, '<h2>$1</h2>')
    .replace(/^#\s?(.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1<\/a>')
    .replace(/\n-\s(.*)/gim, '<ul><li>$1</li></ul>')
    .replace(/\n\n/g, '<br/><br/>' );
  // merge consecutive <ul>
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  return html;
}

function initYear(){
  const el = $('#year'); if(el) el.textContent = new Date().getFullYear();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initTilt();
  initTheme();
  initLang();
  initReveal();
  loadCV();
  initYear();
});

// 3D tilt on cards
function initTilt(){
  const maxTilt = 8; // degrees
  const cards = $$('.project-card');
  cards.forEach(card => {
    let raf = null;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (r.width/2);
      const dy = (e.clientY - cy) / (r.height/2);
      const rx = (-dy * maxTilt).toFixed(2);
      const ry = (dx * maxTilt).toFixed(2);
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const reset = () => {
      if(raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  });
}
