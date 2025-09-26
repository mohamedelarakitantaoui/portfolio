// Utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// i18n dictionary (headings/labels only; project content remains EN to keep style concise)
const I18N = {
  en: {
    brandName: 'Mamoun Tantaoui El Araki',
    'hero.name': 'Mamoun Tantaoui El Araki',
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
    'cta.visitWebsite': 'Visit Website',
    'cta.downloadApp': 'Download App',
    'cta.readCase': 'Read Technical Details',
    'sections.projects': 'Projects',
    'sections.about': 'About Me',
    'sections.creative': 'Creative Work',
    'sections.projectsSub': 'Selected work — case study cards with tech stacks and links.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'about.sub': 'A quick intro — who I am, what I study, and how I think.',
    'about.bio': 'I’m Mamoun, a builder who blends software engineering with creative thinking. I enjoy shipping clean, robust systems and telling compelling product stories.',
    'creative.sub': 'Photography & Design selections.',
    'creative.photo': 'Photography',
    'creative.design': 'Design Showcase',
    'creative.intro': 'Beyond code, I\'m passionate about photography and visual design. Here\'s a selection of my creative work.',
    'creative.filterAll': 'All',
    'creative.filterPhoto': 'Photography',
    'creative.filterDesign': 'Design',
    'photo.featured.title': 'Creative Moment',
    'photo.featured.caption': 'Captured during creative process, 2025',
    'photo.placeholder1': 'City sunset',
    'photo.placeholder2': 'Street photography',
    'photo.placeholder3': 'Portrait session',
    'photo.placeholder4': 'Architecture study',
    'photo.placeholder5': 'Nature composition',
    'design.project1.title': 'Magazine',
    'design.project1.desc': 'UI/UX design for a complete mobile application project',
    'design.project2.title': 'Movie Poster',
    'design.project2.desc': 'Original movie poster design concept with bold visual storytelling',
    'design.project3.title': 'Newsletter Design',
    'design.project3.desc': 'Magazine-style newsletter layout experiment with typography focus',
    'design.viewPdf': 'View PDF',
    'design.download': 'Download',
    'contact.sub': 'Let’s build something great together.',
    'contact.email': 'Email',
    'cv.downloadTxt': 'Download CV (txt)',
    'cv.downloadPdf': 'Download PDF',
    'cv.loading': 'Loading CV…',
    'footer.built': 'Built with HTML, CSS & JS'
  },
  fr: {
    brandName: 'Mamoun Tantaoui El Araki',
    'hero.name': 'Mamoun Tantaoui El Araki',
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
    'cta.visitWebsite': 'Visiter le site',
    'cta.downloadApp': 'Télécharger l\'app',
    'cta.readCase': 'Lire l’étude technique',
    'sections.projects': 'Projets',
    'sections.about': 'À propos de moi',
    'sections.creative': 'Travaux créatifs',
    'sections.projectsSub': 'Sélection — cartes d’études de cas, stacks et liens.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'about.sub': 'Présentation rapide — qui je suis, ce que j’étudie et ma façon de penser.',
    'about.bio': 'Je suis Mamoun, un bâtisseur qui mêle ingénierie logicielle et créativité. J’aime livrer des systèmes propres et raconter des histoires produit.',
    'creative.sub': 'Sélection de Photographie & Design.',
    'creative.photo': 'Photographie',
    'creative.design': 'Vitrine Design',
    'creative.intro': 'Au-delà du code, je suis passionné par la photographie et le design visuel. Voici une sélection de mon travail créatif.',
    'creative.filterAll': 'Tout',
    'creative.filterPhoto': 'Photographie',
    'creative.filterDesign': 'Design',
    'photo.featured.title': 'Moment Créatif',
    'photo.featured.caption': 'Capturé pendant le processus créatif, 2025',
    'photo.placeholder1': 'Coucher de soleil urbain',
    'photo.placeholder2': 'Photographie de rue',
    'photo.placeholder3': 'Session portrait',
    'photo.placeholder4': 'Étude d\'architecture',
    'photo.placeholder5': 'Composition naturelle',
    'design.project1.title': 'Magazine',
    'design.project1.desc': 'Design UI/UX pour un projet d\'application mobile complet',
    'design.project2.title': 'Affiche de Film',
    'design.project2.desc': 'Concept d\'affiche de film original avec narration visuelle audacieuse',
    'design.project3.title': 'Design de Newsletter',
    'design.project3.desc': 'Expérimentation de mise en page newsletter style magazine avec focus typographique',
    'design.viewPdf': 'Voir PDF',
    'design.download': 'Télécharger',
    'contact.sub': 'Construisons quelque chose de génial.',
    'contact.email': 'Email',
    'cv.downloadTxt': 'Télécharger CV (txt)',
    'cv.downloadPdf': 'Télécharger PDF',
    'cv.loading': 'Chargement du CV…',
    'footer.built': 'Créé avec HTML, CSS & JS'
  },
  ar: {
    brandName: 'مامون تنتاوي العرَقي',
    'hero.name': 'مامون تنتاوي العرَقي',
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
    'cta.visitWebsite': 'زيارة الموقع',
    'cta.downloadApp': 'تحميل التطبيق',
    'cta.readCase': 'قراءة التفاصيل التقنية',
    'sections.projects': 'المشاريع',
    'sections.about': 'نبذة عني',
    'sections.creative': 'الأعمال الإبداعية',
    'sections.projectsSub': 'مختارات — بطاقات دراسة حالة مع التقنيات والروابط.',
    'sections.cv': 'السيرة الذاتية',
    'sections.contact': 'تواصل',
    'about.sub': 'نبذة سريعة — من أنا، ماذا أتعلم، وكيف أفكر.',
    'about.bio': 'أنا مامون، أمزج بين هندسة البرمجيات والتفكير الإبداعي. أستمتع ببناء أنظمة متينة وسرد قصص منتج مميزة.',
    'creative.sub': 'مختارات من التصوير والتصميم.',
    'creative.photo': 'التصوير',
    'creative.design': 'عرض التصميم',
    'creative.intro': 'ما وراء البرمجة، أنا شغوف بالتصوير والتصميم البصري. إليكم مجموعة مختارة من أعمالي الإبداعية.',
    'creative.filterAll': 'الكل',
    'creative.filterPhoto': 'التصوير',
    'creative.filterDesign': 'التصميم',
    'photo.featured.title': 'لحظة إبداعية',
    'photo.featured.caption': 'تم التقاطها أثناء العملية الإبداعية، 2025',
    'photo.placeholder1': 'غروب المدينة',
    'photo.placeholder2': 'تصوير الشارع',
    'photo.placeholder3': 'جلسة تصوير شخصي',
    'photo.placeholder4': 'دراسة معمارية',
    'photo.placeholder5': 'تكوين طبيعي',
    'design.project1.title': 'مجلة',
    'design.project1.desc': 'تصميم واجهة وتجربة المستخدم لمشروع تطبيق جوال كامل',
    'design.project2.title': 'ملصق فيلم',
    'design.project2.desc': 'مفهوم تصميم ملصق فيلم أصلي مع سرد بصري جريء',
    'design.project3.title': 'تصميم النشرة الإخبارية',
    'design.project3.desc': 'تجربة تخطيط نشرة إخبارية بنمط المجلة مع التركيز على الطباعة',
    'design.viewPdf': 'عرض PDF',
    'design.download': 'تحميل',
    'contact.sub': 'لنصنع شيئًا رائعًا معًا.',
    'contact.email': 'البريد الإلكتروني',
    'cv.downloadTxt': 'تنزيل السيرة (نص)',
    'cv.downloadPdf': 'تنزيل PDF',
    'cv.loading': 'جارٍ تحميل السيرة…',
    'footer.built': 'تم بناؤه بـ HTML وCSS وJS'
  }
};

// Project data
const projects = [
  // Priority 1: DCE Scraper
  {
    id: 'dce-scraper',
    title: 'DCE Scraper — Microservices',
    description: 'Advanced procurement scraper refactored from monolith to 7 microservices with 90%+ speed gains and zero silent failures.',
    tech: ['Python 3.12', 'Selenium', 'Microservices', 'Multithreading', 'Async', 'Click CLI', 'YAML config'],
    caseStudy: 'content/projects/dce-scraper.md',
    links: {
      github: 'https://github.com/mohamedelarakitantaoui/ScraperBot',
    }
  },
  // Priority 2: eSaha
  {
    id: 'esaha',
    title: 'eSaha — Mental Health Platform',
    description: 'Privacy‑first healthcare platform: secure auth, real‑time chat, journaling, scheduling, and resources library.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Axios'],
    caseStudy: 'content/projects/esaha.md',
    links: {
      github: 'https://github.com/mohamedelarakitantaoui/eSaha',
    }
  },
  // Other Projects (concise cards)
  {
    id: 'quiz-game',
    title: 'Quiz Game App',
    description: 'Kotlin + Firebase with coroutines, real-time questions, leaderboards, and offline cache.',
    tech: ['Kotlin', 'Firebase', 'Coroutines'],
    links: { 
      github: 'https://github.com/mohamedelarakitantaoui/game-app',
      qr: 'assets/img/quiz-app-qr.png'
    },
  },
  {
    id: 'preparia',
    title: 'Preparia Platform',
    description: 'WordPress e-learning platform using Elementor and interactive H5P content.',
    tech: ['WordPress', 'Elementor', 'H5P'],
    links: { github: 'https://preparia.ma/fr_fr' },
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
    <article class="project-card" data-reveal data-id="${escapeHtml(String(p.id||''))}">
      <div class="project-media" aria-hidden="true">
        <span>${escapeHtml(String(p.title).split(' ').map(w=>w[0]).join('').slice(0,4).toUpperCase())}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(String(p.title))}</h3>
        <p class="project-desc">${escapeHtml(String(p.description))}</p>
        <div class="tech-list">
          ${(p.tech||[]).map(tg => `<span class="chip">${escapeHtml(String(tg))}</span>`).join('')}
        </div>
        <div class="card-actions">
          ${p.links?.github ? `<a class="btn btn-secondary" href="${p.links.github}" target="_blank" rel="noopener">${p.id === 'preparia' ? t('cta.visitWebsite') || t('cta.exploreCode') : t('cta.exploreCode')}</a>` : ''}
          ${p.links?.qr ? `<button class="btn btn-secondary btn-qr" data-qr="${p.links.qr}" data-title="${escapeHtml(p.title)}">${t('cta.downloadApp')}</button>` : ''}
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
  // Prefer saved theme, else system preference, default to dark
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (systemDark ? 'dark' : 'light');
  setTheme(initial);
  btn?.addEventListener('click', () => {
    const cur = getTheme();
    const next = cur === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
  // Update icon
  function updateIcon(mode){ const icon = btn?.querySelector('.icon'); if(icon) icon.textContent = mode === 'dark' ? '🌙' : '☀️'; }
  function setTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if(meta){ meta.setAttribute('content', mode === 'dark' ? '#0b1020' : '#f7f7fb'); }
    updateIcon(mode);
  }
  function getTheme(){ return document.documentElement.getAttribute('data-theme') || 'dark'; }
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

// Mobile menu toggle
function initMenu(){
  const btn = $('#menuToggle');
  const nav = $('#primaryNav');
  if(!btn || !nav) return;
  const openClass = 'nav-open';
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle(openClass, !expanded);
  });
  // Close on link click (for mobile UX)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a && nav.classList.contains(openClass)){
      nav.classList.remove(openClass);
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll spy (active nav link)
function initScrollSpy(){
  const links = $$('.nav-link');
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = null;
    sections.forEach(sec => { if(y >= sec.offsetTop) current = sec.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

    // Mark body as scrolled for header shadow styling
    document.body.classList.toggle('scrolled', (window.scrollY || 0) > 10);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if(ticking) return; ticking = true; requestAnimationFrame(onScroll);
  }, { passive: true });

  onScroll(); // initial
}

// Load CV markdown (simple fetch and render minimal)
async function loadCV(){
  const el = $('#cvContent');
  if(!el) return;
  try{
    const res = await fetch('content/cv.md');
    let md = await res.text();
    // Normalize CRLF to LF for consistent parsing across Windows
    md = md.replace(/\r\n/g, '\n');
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
  initMenu();
  initScrollSpy();
  initHeaderAutoHide();
  initLang();
  initReveal();
  loadCV();
  initCvDownloads();
  initYear();
  renderGalleries();
  renderTimeline();
  initLightbox();
  initStickyCta();
  initBackToTop();
  initCreativeSection(); // Creative section functionality
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

  // QR Code Modal
  $$('.btn-qr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qrPath = btn.getAttribute('data-qr');
      const title = btn.getAttribute('data-title') || 'Download App';
      openQRModal(title, qrPath);
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

function openQRModal(title, qrPath){
  const modal = $('#caseModal');
  $('#modalTitle').textContent = `${title} - ${t('cta.downloadApp')}`;
  $('#modalBody').innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="display: inline-block; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin-bottom: 20px;">
        <img src="${qrPath}" alt="QR Code to download ${title}" style="width: 200px; height: 200px; display: block;"/>
      </div>
      <h3 style="margin: 16px 0 8px; color: var(--text);">📱 ${t('cta.downloadApp')}</h3>
      <p style="color: var(--muted); margin: 0 0 16px;">Scan the QR code with your phone camera to download the Android app</p>
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--muted); font-size: 14px;">
        <span>📱</span>
        <span>Android App</span>
        <span>•</span>
        <span>Free Download</span>
      </div>
    </div>
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-modal', 'true');
  const onClose = (e) => { if(e.target.hasAttribute?.('data-close') || e.target === $('.modal-backdrop', modal)){ closeCaseModal(); } };
  modal.addEventListener('click', onClose, { once: true });
  $('.modal-close', modal)?.addEventListener('click', closeCaseModal, { once: true });
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

// Header auto-hide on scroll
function initHeaderAutoHide(){
  const header = document.querySelector('.site-header');
  if(!header) return;

  let lastY = window.pageYOffset || window.scrollY || 0;
  const upThresh = 0;      // show on any upward movement
  const downThresh = 24;   // require a bit more movement to hide
  const showTop = 40;      // always show near top

  const nav = document.getElementById('primaryNav');
  const menuBtn = document.getElementById('menuToggle');
  const isMenuOpen = () => nav?.classList.contains('nav-open') || menuBtn?.getAttribute('aria-expanded') === 'true';

  const show = () => header.classList.remove('is-hidden');
  const hide = () => header.classList.add('is-hidden');

  let ticking = false;
  const onScroll = () => {
    const y = window.pageYOffset || window.scrollY || 0;

    // Always show when near the top or when menu is open
    if (y <= showTop || isMenuOpen()) {
      show();
      lastY = y;
      ticking = false;
      return;
    }

    if (y > lastY + downThresh) {
      // scrolling down (enough)
      hide();
    } else if (y < lastY - upThresh) {
      // any upward movement shows it
      show();
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });

  // Wheel fallback: if user scrolls up but the page is at/bottom edge and barely moves,
  // still show the header for responsiveness.
  window.addEventListener('wheel', (e) => {
    if (e.deltaY < 0 && (window.scrollY || 0) > showTop && !isMenuOpen()) {
      show();
    }
  }, { passive: true });
}

// Sticky CTA shows after scrolling past hero
function initStickyCta(){
  const bar = $('#stickyCta');
  if(!bar) return;
  const hero = document.querySelector('.hero');
  const showAt = () => (hero?.getBoundingClientRect().bottom || 0) < 0;
  const onScroll = () => { bar.classList.toggle('show', showAt()); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Back to top
function initBackToTop(){
  const btn = $('#backToTop');
  if(!btn) return;
  const onScroll = () => { btn.classList.toggle('show', (window.scrollY||0) > 400); };
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
  onScroll();
}

// ========================================= 
// CREATIVE SECTION FUNCTIONALITY 
// ========================================= 

// Creative Gallery Lightbox
function initCreativeLightbox() {
  const modal = $('#lightboxModal');
  const modalImage = $('#lightboxImage');
  const modalTitle = $('#lightboxTitle');
  const modalCaption = $('#lightboxCaption');
  const closeButtons = $$('[data-lightbox-close]');
  const prevButton = $('.lightbox-prev');
  const nextButton = $('.lightbox-next');
  
  if (!modal) return;

  let currentGallery = [];
  let currentIndex = 0;

  // Gallery data
  const galleryData = [
    {
      src: 'assets/img/featured-photo-1.png',
      title: 'Creative Moment',
      caption: 'Captured during creative process, 2025',
      category: 'photography'
    }
  ];

  // Open lightbox
  function openLightbox(index, gallery = galleryData) {
    currentGallery = gallery;
    currentIndex = index;
    showImage();
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
  }

  // Show current image
  function showImage() {
    const item = currentGallery[currentIndex];
    if (!item) return;
    
    modalImage.src = item.src;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalCaption.textContent = item.caption;
  }

  // Navigate gallery
  function navigateGallery(direction) {
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % currentGallery.length;
    } else {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    }
    showImage();
  }

  // Event listeners
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeLightbox);
  });

  prevButton?.addEventListener('click', () => navigateGallery('prev'));
  nextButton?.addEventListener('click', () => navigateGallery('next'));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateGallery('prev');
        break;
      case 'ArrowRight':
        navigateGallery('next');
        break;
    }
  });

  // Gallery item click handlers
  $$('[data-lightbox="photography"]').forEach((item, index) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('placeholder')) {
        openLightbox(index);
      }
    });
  });
}

// Creative Filter Functionality
function initCreativeFilters() {
  const filterTabs = $$('.filter-tab');
  const creativeGroups = $$('.creative-group[data-category]');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter content
      creativeGroups.forEach(group => {
        const category = group.dataset.category;
        if (filter === 'all' || filter === category) {
          group.classList.remove('filter-hidden');
        } else {
          group.classList.add('filter-hidden');
        }
      });
    });
  });
}

// Hero Video Controls
function initHeroVideoControls() {
  const video = $('.hero-video');
  const playBtn = $('.video-play-btn');
  
  if (!video || !playBtn) return;
  
  let isPlaying = video.autoplay;
  
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      video.pause();
      video.removeAttribute('autoplay');
      isPlaying = false;
    } else {
      video.play();
      video.setAttribute('autoplay', '');
      isPlaying = true;
    }
    updatePlayButton();
  });
  
  function updatePlayButton() {
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    if (isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }
  
  // Handle video events
  video.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
  });
  
  video.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
  });
  
  updatePlayButton();
}

// Reveal Animation for Creative Section
function initCreativeRevealAnimation() {
  const revealElements = $$('[data-reveal]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Initialize Creative Section
function initCreativeSection() {
  initCreativeLightbox();
  initCreativeFilters();
  initHeroVideoControls();
  initCreativeRevealAnimation();
}
