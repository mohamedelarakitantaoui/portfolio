// Utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// i18n dictionary (headings/labels only; project content remains EN to keep style concise)
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
    'footer.built': 'Built with HTML, CSS & JS'
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
    'footer.built': 'Créé avec HTML, CSS & JS'
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
    'footer.built': 'تم بناؤه بـ HTML وCSS وJS'
  }
};

// Project data
const projects = [
  // Priority 1: Government RAG
  {
    id: 'gov-rag',
    title: 'Secure Government RAG',
    description: 'On‑prem RAG with local LLM, role‑based access, full audit logging, multilingual UI (AR/FR/EN), citation‑based chatbot, and PDF→Excel document extraction.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL+pgvector', 'MinIO', 'Keycloak', 'Docker', 'AI'],
    caseStudy: 'content/projects/gov-rag.md',
    links: {
      github: 'https://github.com/mohamedelarakitantaoui',
      demo: '#'
    }
  },
  // Priority 2: DCE Scraper
  {
    id: 'dce-scraper',
    title: 'DCE Scraper — Microservices',
    description: 'Advanced procurement scraper refactored from monolith to 7 microservices with 90%+ speed gains and zero silent failures.',
    tech: ['Python 3.12', 'Selenium', 'Microservices', 'Multithreading', 'Async', 'Click CLI', 'YAML config'],
    caseStudy: 'content/projects/dce-scraper.md',
    links: {
      github: 'https://github.com/mohamedelarakitantaoui',
    }
  },
  // Priority 3: eSaha
  {
    id: 'esaha',
    title: 'eSaha — Mental Health Platform',
    description: 'Privacy‑first healthcare platform: secure auth, real‑time chat, journaling, scheduling, and resources library.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Axios'],
    caseStudy: 'content/projects/esaha.md',
    links: {
      github: 'https://github.com/mohamedelarakitantaoui',
    }
  },
  // Other Projects (concise cards)
  {
    id: 'quiz-game',
    title: 'Quiz Game App',
    description: 'Kotlin + Firebase with coroutines, real-time questions, leaderboards, and offline cache.',
    tech: ['Kotlin', 'Firebase', 'Coroutines'],
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
  {
    id: 'preparia',
    title: 'Preparia Platform',
    description: 'WordPress e-learning platform using Elementor and interactive H5P content.',
    tech: ['WordPress', 'Elementor', 'H5P'],
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
  {
    id: 'courses-lessons',
    title: 'Courses & Lessons App',
    description: 'Flutter app with WordPress backend for browsing courses, lessons, and media.',
    tech: ['Flutter', 'Dart', 'WordPress'],
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
  // Note: Keep this list clean; avoid empty items that can break rendering.
];

// Render project cards
function renderProjects() {
  const grid = $('#projectsGrid');
  if (!grid) return;
  // Filter out any incomplete entries to avoid runtime errors
  const safe = projects.filter(p => p && p.title && p.description);
  grid.innerHTML = safe.map(p => `
    <article class="project-card" data-reveal data-id="${p.id}">
      <div class="project-media" aria-hidden="true">
        <span>${String(p.title).split(' ').map(w=>w[0]).join('').slice(0,4).toUpperCase()}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="tech-list">
          ${(p.tech||[]).map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
        <div class="card-actions">
          ${p.links?.github ? `<a class="btn btn-secondary" href="${p.links.github}" target="_blank" rel="noopener">${t('cta.exploreCode')}</a>` : ''}
          ${p.links?.demo ? `<a class="btn btn-secondary" href="${p.links.demo}" target="_blank" rel="noopener">${labelForLink('demo')}</a>` : ''}
          ${p.caseStudy ? `<button class="btn btn-primary btn-case" data-case="${p.caseStudy}" data-title="${escapeHtml(p.title)}">${t('cta.readCase')}</button>` : ''}
        </div>
      </div>
    </article>
  `).join('');
  initCaseStudyButtons();
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
  if(!currentBtn || !menu) return; // graceful if controls missing
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

// Hide PDF download if the file isn't present
async function initCvDownloads(){
  const pdfLink = document.querySelector('a[href="content/cv.pdf"]');
  if(!pdfLink) return;
  try{
    const res = await fetch('content/cv.pdf', { method: 'HEAD' });
    if(!res.ok){
      pdfLink.style.display = 'none';
    }
  }catch(err){
    pdfLink.style.display = 'none';
  }
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

function t(key){
  const lang = document.documentElement.lang || 'en';
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function escapeHtml(str){
  const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' };
  return str.replace(/[&<>'"]/g, c => map[c]);
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
  initCvDownloads();
  initYear();
  renderGalleries();
  renderTimeline();
  initLightbox();
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

// Case Study Modal
function initCaseStudyButtons(){
  $$('.btn-case').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const path = btn.getAttribute('data-case');
      const title = btn.getAttribute('data-title') || 'Case Study';
      openCaseModal(title);
      try{
        const res = await fetch(path);
        const md = await res.text();
        $('#modalBody').innerHTML = markdownToHtml(md);
      }catch(err){
        $('#modalBody').innerHTML = '<p>Unable to load case study right now.</p>';
      }
    });
  });
}

function openCaseModal(title){
  const modal = $('#caseModal');
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = '<div class="loading">Loading…</div>';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-modal', 'true');
  // close events
  const onClose = (e) => {
    if(e.target.hasAttribute?.('data-close') || e.target === $('.modal-backdrop', modal)){
      closeCaseModal();
    }
  };
  modal.addEventListener('click', onClose, { once: true });
  $('.modal-close', modal)?.addEventListener('click', closeCaseModal, { once: true });
}

function closeCaseModal(){
  const modal = $('#caseModal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-modal', 'false');
}

// Creative galleries data (placeholders)
const galleryPhoto = [
  { src: 'assets/img/photo-1.jpg', alt: 'City lights' },
  { src: 'assets/img/photo-2.jpg', alt: 'Desert dunes' },
  { src: 'assets/img/photo-3.jpg', alt: 'Forest trail' },
  { src: 'assets/img/photo-4.jpg', alt: 'Ocean horizon' }
];
const galleryDesign = [
  { src: 'assets/img/design-1.jpg', alt: 'Logo concept' },
  { src: 'assets/img/design-2.jpg', alt: 'Poster graphic' },
  { src: 'assets/img/design-3.jpg', alt: 'UI wireframe' }
];

function renderGalleries(){
  const p = $('#galleryPhoto');
  const d = $('#galleryDesign');
  if(p){ p.innerHTML = galleryPhoto.map(i => `<div class="gallery-item" data-img="${i.src}" aria-label="${escapeHtml(i.alt)}"><img src="${i.src}" alt="${escapeHtml(i.alt)}"/></div>`).join(''); }
  if(d){ d.innerHTML = galleryDesign.map(i => `<div class="gallery-item" data-img="${i.src}" aria-label="${escapeHtml(i.alt)}"><img src="${i.src}" alt="${escapeHtml(i.alt)}"/></div>`).join(''); }
}

// Lightbox
function initLightbox(){
  if(!$('.lightbox')){
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt=""/>';
    document.body.appendChild(lb);
  }
  const lb = $('.lightbox');
  document.body.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if(item){
      const src = item.getAttribute('data-img');
      $('.lightbox img').src = src;
      lb.classList.add('show');
    }else if(e.target === lb){
      lb.classList.remove('show');
    }
  });
}

// Resume timeline (placeholder data)
const timeline = [
  { title: 'Software Engineer', meta: '2023 — Present', desc: 'Building AI and automation projects across government and healthcare.' },
  { title: 'B.S. Computer Science', meta: '2019 — 2023', desc: 'University education with focus on systems and applied AI.' }
];
function renderTimeline(){
  const el = $('#timeline');
  if(!el) return;
  el.innerHTML = timeline.map(it => `
    <div class="timeline-item">
      <h4 class="timeline-title">${escapeHtml(it.title)}</h4>
      <div class="timeline-meta">${escapeHtml(it.meta)}</div>
      <p>${escapeHtml(it.desc)}</p>
    </div>
  `).join('');
}
