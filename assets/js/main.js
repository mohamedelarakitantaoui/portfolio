// Utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function store(key, value){
  try{
    if(value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  }catch(err){ return null; }
}

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
    'hero.eyebrow': 'Software engineer · Marrakech, Morocco',
    'hero.role': 'Software Engineer',
    'hero.tagline': 'Turning ideas into working apps & intelligent bots.',
    'hero.lede': 'Secure on-prem RAG, Python automation that runs 95% faster, and polished React & Flutter apps.',
    'hero.available': 'Available for opportunities',
    'hero.route': 'Marrakech · Ifrane · Istanbul',
    'hero.now': 'Now building',
    'hero.nowTitle': 'Secure Government RAG',
    'stat.speed': 'faster document pipeline — 2.5 h down to 15 min',
    'stat.services': 'microservices carved from a 3,643-line monolith',
    'stat.langs': 'works and ships in three languages',
    'cta.hire': 'Hire me',
    'cta.emailMe': 'Email me',
    'cta.stickyText': 'Like what you see?',
    'cta.viewProjects': 'View Projects',
    'cta.viewCV': 'Read CV',
    'cta.exploreCode': 'Explore Code',
    'cta.visitWebsite': 'Visit Website',
    'cta.downloadApp': 'Download App',
    'cta.readCase': 'Read Technical Details',
    'cta.scanQr': 'Scan the QR code with your phone camera to download the Android app.',
    'sections.projects': 'Projects',
    'sections.about': 'About Me',
    'sections.creative': 'Creative Work',
    'sections.projectsSub': 'Selected work — case study cards with tech stacks and links.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'sections.skills': 'Skills & Expertise',
    'sections.journey': 'Journey',
    'about.sub': 'A quick intro — who I am, what I study, and how I think.',
    'about.bio': 'I’m Mamoun, a builder who blends software engineering with creative thinking. I enjoy shipping clean, robust systems and telling compelling product stories.',
    'about.item1': 'B.S. Computer Science, Al Akhawayn University — 2026',
    'about.item2': 'Exchange semester, Boğaziçi University, Istanbul',
    'about.item3': 'Software Engineering & AI · Photography & Visual Design',
    'skills.backend': 'Backend & DevOps',
    'skills.ai': 'AI & RAG',
    'skills.creative': 'Creative / Photography',
    'journey.prevLabel': 'Previously',
    'journey.prev': 'Intern at Intelcia IT Solutions — built a web scraping system that collects data automatically for AI chatbot training.',
    'journey.nowLabel': 'In progress',
    'journey.now': 'Secure Government RAG — an enterprise AI system with complete data sovereignty.',
    'journey.nextLabel': 'Next',
    'journey.next': 'An AI-powered football analytics platform.',
    'creative.sub': 'Photography & Design selections.',
    'creative.photo': 'Photography',
    'creative.design': 'Design Showcase',
    'creative.intro': 'Beyond code, I\'m passionate about photography and visual design. Here\'s a selection of my creative work.',
    'creative.filterAll': 'All',
    'creative.filterPhoto': 'Photography',
    'creative.filterDesign': 'Design',
    'creative.soon': 'Coming soon',
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
    'contact.formName': 'Your name',
    'contact.formEmail': 'Your email',
    'contact.formMsg': 'Message',
    'contact.send': 'Send message',
    'contact.note': 'Opens your email app with the message ready to send.',
    'contact.sent': 'Your email app should now be open with the message ready. Talk soon!',
    'contact.errName': 'Please enter your name.',
    'contact.errEmail': 'Please enter a valid email address.',
    'contact.errMsg': 'Please write a short message (at least 10 characters).',
    'cv.downloadTxt': 'Download CV (txt)',
    'cv.downloadPdf': 'Download PDF',
    'cv.loading': 'Loading CV…',
    'cv.updated': 'Updated September 2025',
    'cv.base': 'Based in',
    'cv.study': 'Studying',
    'cv.langs': 'Languages',
    'footer.built': 'Built with HTML, CSS & JS',
    'footer.privacy': 'No cookies, no tracking — theme and language are saved in your browser only.'
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
    'hero.eyebrow': 'Ingénieur logiciel · Marrakech, Maroc',
    'hero.role': 'Ingénieur Logiciel',
    'hero.tagline': 'Transformer des idées en applis et bots intelligents.',
    'hero.lede': 'RAG sécurisé sur site, automatisation Python 95 % plus rapide, et applis React & Flutter soignées.',
    'hero.available': 'Disponible pour opportunités',
    'hero.route': 'Marrakech · Ifrane · Istanbul',
    'hero.now': 'En cours',
    'hero.nowTitle': 'RAG gouvernemental sécurisé',
    'stat.speed': 'de temps gagné sur le traitement — de 2 h 30 à 15 min',
    'stat.services': 'microservices issus d’un monolithe de 3 643 lignes',
    'stat.langs': 'je travaille et livre en trois langues',
    'cta.hire': 'Me recruter',
    'cta.emailMe': 'M’écrire',
    'cta.stickyText': 'Ça vous plaît ?',
    'cta.viewProjects': 'Voir les projets',
    'cta.viewCV': 'Lire le CV',
    'cta.exploreCode': 'Voir le code',
    'cta.visitWebsite': 'Visiter le site',
    'cta.downloadApp': 'Télécharger l\'app',
    'cta.readCase': 'Lire l’étude technique',
    'cta.scanQr': 'Scannez le QR code avec l’appareil photo de votre téléphone pour télécharger l’app Android.',
    'sections.projects': 'Projets',
    'sections.about': 'À propos de moi',
    'sections.creative': 'Travaux créatifs',
    'sections.projectsSub': 'Sélection — cartes d’études de cas, stacks et liens.',
    'sections.cv': 'Curriculum Vitae',
    'sections.contact': 'Contact',
    'sections.skills': 'Compétences',
    'sections.journey': 'Parcours',
    'about.sub': 'Présentation rapide — qui je suis, ce que j’étudie et ma façon de penser.',
    'about.bio': 'Je suis Mamoun, un bâtisseur qui mêle ingénierie logicielle et créativité. J’aime livrer des systèmes propres et raconter des histoires produit.',
    'about.item1': 'Licence en informatique, Université Al Akhawayn — 2026',
    'about.item2': 'Semestre d’échange, Université Boğaziçi, Istanbul',
    'about.item3': 'Génie logiciel & IA · Photographie & design visuel',
    'skills.backend': 'Backend & DevOps',
    'skills.ai': 'IA & RAG',
    'skills.creative': 'Créatif / Photographie',
    'journey.prevLabel': 'Avant',
    'journey.prev': 'Stagiaire chez Intelcia IT Solutions — système de web scraping qui collecte automatiquement des données pour entraîner un chatbot IA.',
    'journey.nowLabel': 'En cours',
    'journey.now': 'RAG gouvernemental sécurisé — un système d’IA d’entreprise avec souveraineté totale des données.',
    'journey.nextLabel': 'Ensuite',
    'journey.next': 'Une plateforme d’analyse football propulsée par l’IA.',
    'creative.sub': 'Sélection de Photographie & Design.',
    'creative.photo': 'Photographie',
    'creative.design': 'Vitrine Design',
    'creative.intro': 'Au-delà du code, je suis passionné par la photographie et le design visuel. Voici une sélection de mon travail créatif.',
    'creative.filterAll': 'Tout',
    'creative.filterPhoto': 'Photographie',
    'creative.filterDesign': 'Design',
    'creative.soon': 'Bientôt',
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
    'contact.formName': 'Votre nom',
    'contact.formEmail': 'Votre email',
    'contact.formMsg': 'Message',
    'contact.send': 'Envoyer',
    'contact.note': 'Ouvre votre messagerie avec le message prêt à envoyer.',
    'contact.sent': 'Votre messagerie devrait s’ouvrir avec le message prêt. À très vite !',
    'contact.errName': 'Veuillez indiquer votre nom.',
    'contact.errEmail': 'Veuillez saisir une adresse email valide.',
    'contact.errMsg': 'Écrivez un court message (au moins 10 caractères).',
    'cv.downloadTxt': 'Télécharger CV (txt)',
    'cv.downloadPdf': 'Télécharger PDF',
    'cv.loading': 'Chargement du CV…',
    'cv.updated': 'Mis à jour en septembre 2025',
    'cv.base': 'Basé à',
    'cv.study': 'Études',
    'cv.langs': 'Langues',
    'footer.built': 'Créé avec HTML, CSS & JS',
    'footer.privacy': 'Aucun cookie, aucun suivi — le thème et la langue sont enregistrés uniquement dans votre navigateur.'
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
    'hero.eyebrow': 'مهندس برمجيات · مراكش، المغرب',
    'hero.role': 'مهندس برمجيات',
    'hero.tagline': 'نحوّل الأفكار إلى تطبيقات وعُمّال ذكيين.',
    'hero.lede': 'أنظمة RAG آمنة محلية، وأتمتة بايثون أسرع بنسبة 95٪، وتطبيقات React وFlutter متقنة.',
    'hero.available': 'متاح لفرص جديدة',
    'hero.route': 'مراكش · إفران · إسطنبول',
    'hero.now': 'أعمل الآن على',
    'hero.nowTitle': 'نظام RAG حكومي آمن',
    'stat.speed': 'أسرع في معالجة الوثائق — من ساعتين ونصف إلى 15 دقيقة',
    'stat.services': 'خدمات مصغّرة انطلاقًا من كتلة برمجية من 3,643 سطرًا',
    'stat.langs': 'أعمل وأُنجز بثلاث لغات',
    'cta.hire': 'وظّفني',
    'cta.emailMe': 'راسلني',
    'cta.stickyText': 'هل أعجبك ما رأيت؟',
    'cta.viewProjects': 'استعراض المشاريع',
    'cta.viewCV': 'قراءة السيرة',
    'cta.exploreCode': 'استعراض الشيفرة',
    'cta.visitWebsite': 'زيارة الموقع',
    'cta.downloadApp': 'تحميل التطبيق',
    'cta.readCase': 'قراءة التفاصيل التقنية',
    'cta.scanQr': 'امسح رمز QR بكاميرا هاتفك لتحميل تطبيق أندرويد.',
    'sections.projects': 'المشاريع',
    'sections.about': 'نبذة عني',
    'sections.creative': 'الأعمال الإبداعية',
    'sections.projectsSub': 'مختارات — بطاقات دراسة حالة مع التقنيات والروابط.',
    'sections.cv': 'السيرة الذاتية',
    'sections.contact': 'تواصل',
    'sections.skills': 'المهارات والخبرات',
    'sections.journey': 'المسار',
    'about.sub': 'نبذة سريعة — من أنا، ماذا أتعلم، وكيف أفكر.',
    'about.bio': 'أنا مامون، أمزج بين هندسة البرمجيات والتفكير الإبداعي. أستمتع ببناء أنظمة متينة وسرد قصص منتج مميزة.',
    'about.item1': 'بكالوريوس علوم الحاسوب، جامعة الأخوين — 2026',
    'about.item2': 'فصل تبادل طلابي، جامعة بوغازيتشي، إسطنبول',
    'about.item3': 'هندسة البرمجيات والذكاء الاصطناعي · التصوير والتصميم البصري',
    'skills.backend': 'الواجهة الخلفية وDevOps',
    'skills.ai': 'الذكاء الاصطناعي وRAG',
    'skills.creative': 'الإبداع / التصوير',
    'journey.prevLabel': 'سابقًا',
    'journey.prev': 'متدرّب في Intelcia IT Solutions — نظام لجمع البيانات آليًا من الويب لتدريب روبوت محادثة ذكي.',
    'journey.nowLabel': 'قيد الإنجاز',
    'journey.now': 'نظام RAG حكومي آمن — نظام ذكاء اصطناعي مؤسسي بسيادة كاملة على البيانات.',
    'journey.nextLabel': 'التالي',
    'journey.next': 'منصة تحليلات كرة قدم مدعومة بالذكاء الاصطناعي.',
    'creative.sub': 'مختارات من التصوير والتصميم.',
    'creative.photo': 'التصوير',
    'creative.design': 'عرض التصميم',
    'creative.intro': 'ما وراء البرمجة، أنا شغوف بالتصوير والتصميم البصري. إليكم مجموعة مختارة من أعمالي الإبداعية.',
    'creative.filterAll': 'الكل',
    'creative.filterPhoto': 'التصوير',
    'creative.filterDesign': 'التصميم',
    'creative.soon': 'قريبًا',
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
    'contact.formName': 'اسمك',
    'contact.formEmail': 'بريدك الإلكتروني',
    'contact.formMsg': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.note': 'يفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.',
    'contact.sent': 'يُفترض أن تطبيق البريد قد فُتح والرسالة جاهزة. إلى اللقاء قريبًا!',
    'contact.errName': 'يرجى إدخال اسمك.',
    'contact.errEmail': 'يرجى إدخال بريد إلكتروني صالح.',
    'contact.errMsg': 'يرجى كتابة رسالة قصيرة (10 أحرف على الأقل).',
    'cv.downloadTxt': 'تنزيل السيرة (نص)',
    'cv.downloadPdf': 'تنزيل PDF',
    'cv.loading': 'جارٍ تحميل السيرة…',
    'cv.updated': 'آخر تحديث: سبتمبر 2025',
    'cv.base': 'مقيم في',
    'cv.study': 'الدراسة',
    'cv.langs': 'اللغات',
    'footer.built': 'تم بناؤه بـ HTML وCSS وJS',
    'footer.privacy': 'لا ملفات تعريف ارتباط ولا تتبّع — يُحفظ المظهر واللغة في متصفحك فقط.'
  }
};

// Project data
const projects = [
  // Priority 1: DCE Scraper
  {
    id: 'dce-scraper',
    title: 'DCE Scraper — Microservices',
    kind: 'Automation · Intelcia internship',
    featured: true,
    metric: { value: '95%', label: 'faster — 2.5 h → 15 min for 300 consultations' },
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
    kind: 'Full-stack · Healthcare',
    featured: true,
    metric: { value: '7', label: 'core features — secure auth, live chat, journaling, scheduling & more' },
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
    kind: 'Mobile · Android',
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
    kind: 'Web · E-learning',
    description: 'WordPress e-learning platform using Elementor and interactive H5P content.',
    tech: ['WordPress', 'Elementor', 'H5P'],
    links: { github: 'https://preparia.ma/fr_fr' },
  },
  {
    id: 'courses-lessons',
    title: 'Courses & Lessons App',
    kind: 'Mobile · Flutter',
    description: 'Flutter app with WordPress backend for browsing courses, lessons, and media.',
    tech: ['Flutter', 'Dart', 'WordPress'],
    links: { github: 'https://github.com/mohamedelarakitantaoui' },
  },
  // Note: Keep this list clean; avoid empty items that can break rendering.
];

const ICON_ARROW = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow"/></svg>';

// Render project cards
function renderProjects() {
  const grid = $('#projectsGrid');
  if (!grid) return;
  // Filter out any incomplete entries to avoid runtime errors
  const safe = projects.filter(p => p && p.title && p.description);
  grid.innerHTML = safe.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const isSite = p.id === 'preparia';
    const metric = p.featured && p.metric
      ? `<p class="project-metric">${escapeHtml(p.metric.value)}<small>${escapeHtml(p.metric.label)}</small></p>`
      : '';
    return `
    <article class="project-card${p.featured ? ' featured' : ''}" data-reveal data-id="${escapeHtml(String(p.id||''))}">
      <div class="project-top">
        <span class="project-num">${num}</span>
        <span class="project-kind">${escapeHtml(String(p.kind || ''))}</span>
      </div>
      ${metric}
      <h3 class="project-title">${escapeHtml(String(p.title))}</h3>
      <p class="project-desc">${escapeHtml(String(p.description))}</p>
      <ul class="tags">${(p.tech||[]).map(tg => `<li>${escapeHtml(String(tg))}</li>`).join('')}</ul>
      <div class="card-actions">
        ${p.caseStudy ? `<button type="button" class="btn btn-primary btn-sm btn-case" data-case="${escapeHtml(p.caseStudy)}" data-title="${escapeHtml(p.title)}">${escapeHtml(t('cta.readCase'))}</button>` : ''}
        ${p.links?.github ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(p.links.github)}" target="_blank" rel="noopener">${escapeHtml(isSite ? t('cta.visitWebsite') : t('cta.exploreCode'))}${ICON_ARROW}</a>` : ''}
        ${p.links?.qr ? `<button type="button" class="btn btn-primary btn-sm btn-qr" data-qr="${escapeHtml(p.links.qr)}" data-title="${escapeHtml(p.title)}">${escapeHtml(t('cta.downloadApp'))}</button>` : ''}
        ${p.links?.demo ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(p.links.demo)}" target="_blank" rel="noopener">${labelForLink('demo')}</a>` : ''}
      </div>
    </article>`;
  }).join('');
  observeReveal($$('[data-reveal]', grid));
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
  const saved = store('theme');
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved || (systemLight ? 'light' : 'dark'), false);
  btn?.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
  });
  function setTheme(mode, persist){
    document.documentElement.setAttribute('data-theme', mode);
    if(persist) store('theme', mode);
    btn?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function getTheme(){ return document.documentElement.getAttribute('data-theme') || 'dark'; }
}

// Language switcher (LTR/RTL aware)
function initLang(){
  const currentBtn = $('#langCurrent');
  const label = $('#langLabel');
  const menu = $('#langMenu');
  const saved = store('lang') || 'en';
  applyLang(saved);
  if(!currentBtn || !menu) return; // graceful if controls missing

  const open = (state) => {
    menu.hidden = !state;
    currentBtn.setAttribute('aria-expanded', String(state));
  };
  currentBtn.addEventListener('click', () => open(menu.hidden));
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if (!b) return;
    applyLang(b.dataset.lang);
    store('lang', b.dataset.lang);
    open(false);
    currentBtn.focus();
  });
  document.addEventListener('click', (e) => {
    if(!menu.hidden && !menu.contains(e.target) && !currentBtn.contains(e.target)) open(false);
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !menu.hidden){ open(false); currentBtn.focus(); }
  });

  function applyLang(lang){
    setLang(lang);
    if(label) label.textContent = lang.toUpperCase();
    $$('button[data-lang]', menu).forEach(b => b.setAttribute('aria-current', String(b.dataset.lang === lang)));
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
  renderProjects(); // card button labels are translated too
}

function t(key){
  const lang = document.documentElement.lang || 'en';
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function escapeHtml(str){
  const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' };
  return String(str).replace(/[&<>'"]/g, c => map[c]);
}

// Scroll reveal
let revealObserver = null;
function observeReveal(els){
  if(!('IntersectionObserver' in window) || reduceMotion){
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  if(!revealObserver){
    revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  }
  els.forEach(el => { if(!el.classList.contains('visible')) revealObserver.observe(el); });
}
function initReveal(){ observeReveal($$('[data-reveal]')); }

// Mobile menu toggle
function initMenu(){
  const btn = $('#menuToggle');
  const nav = $('#primaryNav');
  if(!btn || !nav) return;
  const openClass = 'nav-open';
  const set = (state) => {
    btn.setAttribute('aria-expanded', String(state));
    btn.setAttribute('aria-label', state ? 'Close menu' : 'Open menu');
    nav.classList.toggle(openClass, state);
    document.body.classList.toggle('menu-open', state);
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  // Close on link click (for mobile UX)
  nav.addEventListener('click', (e) => {
    if(e.target.closest('a') && nav.classList.contains(openClass)) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && nav.classList.contains(openClass)){ set(false); btn.focus(); }
  });
  window.addEventListener('resize', () => { if(window.innerWidth > 1100 && nav.classList.contains(openClass)) set(false); });
}

// Scroll spy (active nav link)
function initScrollSpy(){
  const links = $$('.nav-link');
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY + 140;
    let current = null;
    sections.forEach(sec => { if(y >= sec.offsetTop) current = sec.id; });
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', on);
      if(on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });

    // Mark body as scrolled for header background styling
    document.body.classList.toggle('scrolled', (window.scrollY || 0) > 10);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if(ticking) return; ticking = true; requestAnimationFrame(onScroll);
  }, { passive: true });

  onScroll(); // initial
}

// Load CV markdown
async function loadCV(){
  const el = $('#cvContent');
  if(!el) return;
  try{
    const res = await fetch('content/cv.md');
    if(!res.ok) throw new Error(res.status);
    el.innerHTML = markdownToHtml(await res.text());
    el.removeAttribute('aria-busy');
  }catch(err){
    el.innerHTML = '<p>Unable to load CV. Please download the PDF instead.</p>';
    el.removeAttribute('aria-busy');
  }
}

// Small block-level markdown renderer: headings, lists, paragraphs, bold, italics, links.
// Input is escaped first, so markdown files can't inject HTML.
function markdownToHtml(md){
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = null; // 'ul' | 'ol'
  let para = [];

  const inline = (s) => escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s(])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
    .replace(/(^|[\s(])([\w.+-]+@[\w-]+\.[\w.]+)/g, '$1<a href="mailto:$2">$2</a>');
  const flushPara = () => { if(para.length){ out.push(`<p>${para.map(inline).join('<br/>')}</p>`); para = []; } };
  const flushList = () => { if(list){ out.push(`</${list}>`); list = null; } };

  lines.forEach(raw => {
    const line = raw.trimEnd();
    let m;
    if(!line.trim()){ flushPara(); flushList(); return; }
    if((m = line.match(/^(#{1,4})\s+(.*)$/))){
      flushPara(); flushList();
      const lvl = Math.min(m[1].length + 1, 5); // demote: the page owns the only h1
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      return;
    }
    if((m = line.match(/^\s*[-*]\s+(.*)$/))){
      flushPara();
      if(list !== 'ul'){ flushList(); out.push('<ul>'); list = 'ul'; }
      out.push(`<li>${inline(m[1])}</li>`);
      return;
    }
    if((m = line.match(/^\s*\d+\.\s+(.*)$/))){
      flushPara();
      if(list !== 'ol'){ flushList(); out.push('<ol>'); list = 'ol'; }
      out.push(`<li>${inline(m[1])}</li>`);
      return;
    }
    flushList();
    para.push(line.trim());
  });
  flushPara(); flushList();
  return out.join('\n');
}

function initYear(){
  const el = $('#year'); if(el) el.textContent = new Date().getFullYear();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang(); // renders projects
  initMenu();
  initScrollSpy();
  initHeaderAutoHide();
  initReveal();
  loadCV();
  initYear();
  initModal();
  initStickyCta();
  initBackToTop();
  initCreativeSection();
  initContactForm();
});

// ---------- Case Study / QR Modal ----------
let lastFocus = null;
function initModal(){
  const modal = $('#caseModal');
  if(!modal) return;
  document.addEventListener('click', async (e) => {
    const caseBtn = e.target.closest('.btn-case');
    const qrBtn = e.target.closest('.btn-qr');
    if(caseBtn){
      openModal(caseBtn.getAttribute('data-title') || 'Case Study');
      try{
        const res = await fetch(caseBtn.getAttribute('data-case'));
        if(!res.ok) throw new Error(res.status);
        $('#modalBody').innerHTML = markdownToHtml(await res.text());
      }catch(err){
        $('#modalBody').innerHTML = '<p>Unable to load case study right now.</p>';
      }
    }else if(qrBtn){
      const title = qrBtn.getAttribute('data-title') || 'App';
      openModal(`${title} — ${t('cta.downloadApp')}`);
      $('#modalBody').innerHTML = `
        <div class="qr-box">
          <img src="${escapeHtml(qrBtn.getAttribute('data-qr'))}" alt="QR code to download ${escapeHtml(title)}" width="220" height="220"/>
          <p>${escapeHtml(t('cta.scanQr'))}</p>
          <ul class="tags"><li>Android</li><li>Free</li></ul>
        </div>`;
    }else if(e.target.closest('[data-close]')){
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function openModal(title){
  const modal = $('#caseModal');
  lastFocus = document.activeElement;
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = '<p class="loading">Loading…</p>';
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('.modal-close', modal)?.focus();
}

function closeModal(){
  const modal = $('#caseModal');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus?.();
}

// Header auto-hide on scroll
function initHeaderAutoHide(){
  const header = $('#siteHeader');
  if(!header) return;

  let lastY = window.scrollY || 0;
  const downThresh = 24;   // require a bit more movement to hide
  const showTop = 40;      // always show near top
  const isMenuOpen = () => document.body.classList.contains('menu-open');

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (y <= showTop || isMenuOpen() || header.contains(document.activeElement)) {
      header.classList.remove('is-hidden');
    } else if (y > lastY + downThresh) {
      header.classList.add('is-hidden');
    } else if (y < lastY) {
      header.classList.remove('is-hidden');
    }
    if (Math.abs(y - lastY) > downThresh || y < lastY) lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}

// Sticky CTA shows after scrolling past hero, hides again at the contact section
function initStickyCta(){
  const bar = $('#stickyCta');
  if(!bar) return;
  const hero = $('.hero');
  const contact = $('#contact');
  const onScroll = () => {
    const pastHero = (hero?.getBoundingClientRect().bottom || 0) < 0;
    const atContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.8;
    const show = pastHero && !atContact;
    bar.classList.toggle('show', show);
    bar.setAttribute('aria-hidden', String(!show));
    $$('a', bar).forEach(a => a.tabIndex = show ? 0 : -1);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Back to top
function initBackToTop(){
  const btn = $('#backToTop');
  if(!btn) return;
  const onScroll = () => { btn.classList.toggle('show', (window.scrollY||0) > 600); };
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  onScroll();
}

// =========================================
// CREATIVE SECTION
// =========================================

function initCreativeLightbox() {
  const modal = $('#lightboxModal');
  if (!modal) return;
  const img = $('#lightboxImage');
  const title = $('#lightboxTitle');
  const caption = $('#lightboxCaption');
  let opener = null;
  let index = 0;

  const items = () => $$('[data-lightbox="photography"]').map(el => ({
    src: $('img', el)?.getAttribute('src'),
    alt: $('img', el)?.getAttribute('alt') || '',
    title: $('.gallery-title', el)?.textContent || '',
    caption: $('.gallery-caption', el)?.textContent || ''
  }));

  function show() {
    const list = items();
    const item = list[index];
    if (!item) return;
    img.src = item.src;
    img.alt = item.alt;
    title.textContent = item.title;
    caption.textContent = item.caption;
    const single = list.length < 2;
    $('.lightbox-prev', modal).hidden = single;
    $('.lightbox-next', modal).hidden = single;
  }
  function open(i) {
    opener = document.activeElement;
    index = i;
    show();
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.lightbox-close', modal).focus();
  }
  function close() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    opener?.focus?.();
  }
  function step(dir) {
    const n = items().length;
    index = (index + dir + n) % n;
    show();
  }

  $$('[data-lightbox-close]', modal).forEach(b => b.addEventListener('click', close));
  $('.lightbox-prev', modal)?.addEventListener('click', () => step(-1));
  $('.lightbox-next', modal)?.addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
    if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
  });
  $$('[data-lightbox="photography"]').forEach((el, i) => el.addEventListener('click', () => open(i)));
}

function initCreativeFilters() {
  const tabs = $$('.filter-tab');
  const groups = $$('.creative-group[data-category]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      tabs.forEach(x => {
        x.classList.toggle('active', x === tab);
        x.setAttribute('aria-pressed', String(x === tab));
      });
      groups.forEach(g => g.classList.toggle('filter-hidden', !(filter === 'all' || filter === g.dataset.category)));
    });
  });
}

// Video: only download the 35 MB file when it scrolls near, and don't autoplay for reduced motion
function initCreativeVideo() {
  const video = $('.hero-video');
  const btn = $('.video-play-btn');
  if (!video || !btn) return;

  const load = () => {
    if (video.dataset.src && !video.src) {
      video.src = video.dataset.src;
    }
  };
  const sync = () => {
    const playing = !video.paused;
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
  };

  btn.addEventListener('click', () => {
    load();
    if (video.paused) video.play().catch(() => {}); else video.pause();
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { load(); video.play().catch(() => {}); }
        else if (!video.paused) video.pause();
      });
    }, { rootMargin: '200px 0px' });
    io.observe(video);
  }
  sync();
}

function initCreativeSection() {
  initCreativeLightbox();
  initCreativeFilters();
  initCreativeVideo();
}

// ---------- Contact form (mailto, no backend needed) ----------
function initContactForm(){
  const form = $('#contactForm');
  if(!form) return;
  const success = $('#cfSuccess');
  const fields = {
    name: { el: $('#cfName'), err: $('#cfNameErr'), ok: v => v.trim().length > 1, msg: 'contact.errName' },
    email: { el: $('#cfEmail'), err: $('#cfEmailErr'), ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'contact.errEmail' },
    message: { el: $('#cfMsg'), err: $('#cfMsgErr'), ok: v => v.trim().length >= 10, msg: 'contact.errMsg' }
  };
  const check = (f) => {
    const valid = f.ok(f.el.value);
    f.err.textContent = valid ? '' : t(f.msg);
    f.el.setAttribute('aria-invalid', String(!valid));
    f.el.closest('.field').classList.toggle('has-error', !valid);
    return valid;
  };
  Object.values(fields).forEach(f => f.el.addEventListener('blur', () => { if(f.el.value) check(f); }));
  Object.values(fields).forEach(f => f.el.addEventListener('input', () => { if(f.el.getAttribute('aria-invalid') === 'true') check(f); }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.hidden = true;
    const results = Object.values(fields).map(check);
    const firstBad = Object.values(fields).find((f, i) => !results[i]);
    if(firstBad){ firstBad.el.focus(); return; }
    const name = fields.name.el.value.trim();
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${fields.message.el.value.trim()}\n\n— ${name} (${fields.email.el.value.trim()})`);
    window.location.href = `mailto:elaraki48@gmail.com?subject=${subject}&body=${body}`;
    success.hidden = false;
    form.reset();
    Object.values(fields).forEach(f => f.el.removeAttribute('aria-invalid'));
  });
}
