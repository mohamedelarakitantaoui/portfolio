// Site copy. Facts come only from the brief, the repo, the Intelcia internship report and the
// AneuXplain capstone deck. Missing facts are [[todo:…]] markers (rendered visibly, excluded
// from the ask-mamoun corpus). ✦ renders as the khatam star glyph. **x** renders bold.
import type { Lang } from '../i18n/ui';

export type L<T = string> = Record<Lang, T>;

export const person = {
  name: 'Mamoun Tantaoui El Araki',
  short: 'Mamoun T. El Araki',
  email: 'elaraki48@gmail.com',
  github: 'https://github.com/mohamedelarakitantaoui',
  githubLabel: 'github.com/mohamedelarakitantaoui',
  role: { en: 'Software engineer, AI & automation. Marrakech, Morocco.', fr: 'Ingénieur logiciel, IA & automatisation. Marrakech, Maroc.' } as L,
  jobTitle: 'Software Engineer, AI & Automation',
  cvHref: '/cv/mamoun-tantaoui-el-araki-cv-software-en.pdf',
  route: 'MARRAKECH ✦ IFRANE ✦ ISTANBUL',
};

export const status = {
  employers: {
    en: 'Open to junior AI, data and software engineering roles. Morocco and remote now; Europe, the US and Canada from early 2027. [[todo:relocation vs remote-only for EU/US/CA, and work-authorisation wording]]',
    fr: 'Ouvert aux postes junior en IA, data et génie logiciel. Maroc et à distance dès maintenant ; Europe, États-Unis et Canada à partir de début 2027. [[todo:relocalisation ou distance uniquement pour UE/US/CA, et mention du permis de travail]]',
  } as L,
  clients: {
    en: 'Taking freelance projects: automation, scraping, AI on your documents, web apps.',
    fr: 'Disponible en freelance : automatisation, scraping, IA sur vos documents, applications web.',
  } as L,
};

export const hero = {
  h1: { en: 'I cut a 2.5-hour procurement run to 15 minutes.', fr: "J'ai fait passer une collecte de marchés publics de 2 h 30 à 15 minutes." } as L,
  sub: { en: "Now I'm building AI that answers from files that never leave the server.", fr: "Aujourd'hui, je construis une IA qui répond à partir de fichiers qui ne quittent jamais le serveur." } as L,
  stats: [
    { value: '10×', label: { en: 'faster: 2.5 h → 15 min for 300 consultations', fr: 'plus rapide : 2 h 30 → 15 min pour 300 consultations' } as L },
    { value: '7', label: { en: 'microservices carved from a 3,643-line monolith', fr: 'microservices extraits d’un monolithe de 3 643 lignes' } as L },
    { value: 'EN·FR·AR', label: { en: 'interfaces shipped in three languages, right-to-left included', fr: 'interfaces livrées en trois langues, droite-à-gauche comprise' } as L },
  ],
  now: { label: { en: 'Now building', fr: 'En cours' } as L, title: 'Secure Government RAG', href: '/work/secure-gov-rag' },
};

export const statement: L = {
  en: "I'm a software engineer based in Marrakech ✦ who studied computer science in Ifrane and Istanbul. I write Python that pulls documents off procurement portals without anyone watching, ✦ retrieval systems that answer from files that stay on your own servers, and the React, Flutter and Kotlin apps that sit on top. ✦",
  fr: "Je suis ingénieur logiciel, basé à Marrakech ✦, formé en informatique à Ifrane et à Istanbul. J'écris du Python qui récupère les documents des portails de marchés publics sans surveillance ✦, des systèmes de recherche qui répondent à partir de fichiers restés sur vos serveurs, et les applications React, Flutter et Kotlin qui vont au-dessus. ✦",
};

export const proof = ['Al Akhawayn University', 'Boğaziçi University', 'Intelcia Solutions', 'ITS Elaraki School'];

export const capabilities = [
  {
    n: '01',
    title: { en: 'Automation & data extraction', fr: 'Automatisation & extraction de données' } as L,
    text: {
      en: 'Bots that log into portals, fill the forms, download the files and tell you when something failed instead of failing quietly.',
      fr: 'Des robots qui se connectent aux portails, remplissent les formulaires, téléchargent les fichiers et signalent les échecs au lieu d’échouer en silence.',
    } as L,
    stack: ['Python', 'Selenium WebDriver', 'YAML config', 'Worker pools', 'Retries & health checks'],
  },
  {
    n: '02',
    title: { en: 'AI, RAG & ML', fr: 'IA, RAG & ML' } as L,
    text: {
      en: 'Assistants that answer from your documents with citations, running on your own servers; ML research when the data is 3-D.',
      fr: 'Des assistants qui répondent à partir de vos documents, sources à l’appui, sur vos propres serveurs ; de la recherche en ML quand les données sont en 3D.',
    } as L,
    stack: ['Ollama', 'PostgreSQL + pgvector', 'MinIO', 'FastAPI', 'PyTorch (PointNet)'],
  },
  {
    n: '03',
    title: { en: 'Full-stack product, web + mobile', fr: 'Produit full-stack, web + mobile' } as L,
    text: {
      en: 'The app people actually open: auth, dashboards, chat, scheduling, in three languages.',
      fr: 'L’application que les gens ouvrent vraiment : authentification, tableaux de bord, chat, rendez-vous, en trois langues.',
    } as L,
    stack: ['React', 'TypeScript', 'Supabase', 'Node.js', 'Flutter', 'Kotlin', 'WordPress', 'Docker'],
  },
];

export const now = {
  previously: [
    {
      en: '**Intelcia, summer 2025.** The DCE Scraper: procurement documents collected into an LLM training dataset, monolith → 7 microservices.',
      fr: '**Intelcia, été 2025.** Le DCE Scraper : documents de marchés publics collectés pour un jeu de données d’entraînement de LLM, monolithe → 7 microservices.',
    },
    {
      en: '**AUI capstone, spring 2026.** AneuXplain, explainable rupture-risk prediction; paper accepted at ICOA 2026.',
      fr: '**Projet de fin d’études AUI, printemps 2026.** AneuXplain, prédiction explicable du risque de rupture ; article accepté à ICOA 2026.',
    },
  ] as L[],
  inProgress: [
    {
      en: '**Secure Government RAG.** On-prem assistant over Arabic, French and English documents.',
      fr: '**Secure Government RAG.** Assistant on-premise sur des documents en arabe, français et anglais.',
    },
    {
      en: '**Kaggle: RSNA Knee Abnormality Detection.** Building a lean model for the Efficiency track. [[todo:Kaggle profile link and current score, if you want them shown]]',
      fr: '**Kaggle : RSNA Knee Abnormality Detection.** Un modèle léger pour la catégorie Efficiency. [[todo:lien du profil Kaggle et score actuel, si vous voulez les afficher]]',
    },
  ] as L[],
  next: [
    {
      en: '**An AI-powered football analytics platform.** Idea stage.',
      fr: '**Une plateforme d’analyse football assistée par IA.** Au stade de l’idée.',
    },
  ] as L[],
};

export const doors = {
  employers: {
    label: { en: 'For employers', fr: 'Pour les recruteurs' } as L,
    title: { en: 'Hiring a junior AI, data or software engineer?', fr: 'Vous recrutez un ingénieur junior en IA, data ou logiciel ?' } as L,
    text: {
      en: "I'm looking for a first full-time role where the work ships: AI/ML engineering, data engineering, or backend/full-stack. Morocco or remote now; Europe, the US or Canada from early 2027.",
      fr: 'Je cherche un premier poste à temps plein où le travail part en production : ingénierie IA/ML, data engineering ou backend/full-stack. Maroc ou à distance dès maintenant ; Europe, États-Unis ou Canada à partir de début 2027.',
    } as L,
  },
  clients: {
    label: { en: 'For clients', fr: 'Pour les clients' } as L,
    title: { en: 'Need a portal scraped, your documents searchable, or an MVP live?', fr: 'Un portail à automatiser, des documents à interroger, un MVP à mettre en ligne ?' } as L,
    text: {
      en: 'Three fixed-scope packs with a deliverable and a timeline. Tell me what the data looks like today and what you want in your inbox tomorrow.',
      fr: 'Trois offres au périmètre fixe, avec un livrable et un délai. Dites-moi à quoi ressemblent vos données aujourd’hui et ce que vous voulez recevoir demain.',
    } as L,
  },
};

export const experience = [
  {
    dates: { en: 'Jun–Aug 2025', fr: 'juin–août 2025' } as L,
    role: { en: 'Software Development Intern', fr: 'Stagiaire en développement logiciel' } as L,
    org: 'Intelcia Solutions',
    result: {
      en: 'Built the DCE Scraper to collect public-procurement documents into an LLM training dataset for an AI chatbot: 2.5 h → 15 min for 300 consultations (10× faster); a 3,643-line monolith split into 7 microservices; retries and health checks ended silent failures.',
      fr: 'Conception du DCE Scraper pour collecter des documents de marchés publics et constituer un jeu de données d’entraînement pour un chatbot IA : 2 h 30 → 15 min pour 300 consultations (10× plus rapide) ; un monolithe de 3 643 lignes découpé en 7 microservices ; reprises et contrôles de santé pour en finir avec les échecs silencieux.',
    } as L,
    href: '/work/dce-scraper',
  },
  {
    dates: { en: 'Jun–Aug 2024', fr: 'juin–août 2024' } as L,
    role: { en: 'Project Intern', fr: 'Stagiaire chef de projet' } as L,
    org: 'ITS Elaraki School',
    result: {
      en: 'Delivered Preparia, a competitive-exam prep platform (WordPress + Elementor + H5P); improved visuals and assets; prepared the groundwork for a companion mobile app.',
      fr: 'Livraison de Preparia, plateforme de préparation aux concours (WordPress + Elementor + H5P) ; amélioration des visuels ; bases posées pour une application mobile.',
    } as L,
    href: '/work/preparia',
  },
  {
    dates: { en: 'Jan–May 2023', fr: 'janv.–mai 2023' } as L,
    role: { en: 'Mentor', fr: 'Mentor' } as L,
    org: 'AUI Compete Organisation',
    result: {
      en: 'Mentored peers on academic planning and competition readiness.',
      fr: 'Accompagnement d’étudiants dans leur planification académique et leur préparation aux compétitions.',
    } as L,
  },
];

export const education = [
  {
    dates: '2021–2026',
    school: 'Al Akhawayn University, Ifrane',
    degree: {
      en: 'B.S. Computer Science, minor in Communication Studies. Capstone: AneuXplain (spring 2026). [[todo:exact graduation wording]]',
      fr: 'Licence (B.S.) en informatique, mineure en communication. Projet de fin d’études : AneuXplain (printemps 2026). [[todo:intitulé exact du diplôme]]',
    } as L,
  },
  {
    dates: { en: 'Fall 2024', fr: 'automne 2024' } as L,
    school: 'Boğaziçi University, Istanbul',
    degree: { en: 'Exchange student, Computer Engineering.', fr: 'Étudiant en échange, génie informatique.' } as L,
  },
];

export const spoken = {
  en: ['English', 'French', 'Arabic', 'Spanish (beginner)'],
  fr: ['Anglais', 'Français', 'Arabe', 'Espagnol (débutant)'],
} as L<string[]>;

export const principles = [
  { n: '01', title: { en: 'Make failure loud.', fr: 'Rendre les échecs visibles.' } as L, text: { en: 'Retries, health checks, and a log someone actually reads.', fr: 'Des reprises, des contrôles de santé, et un journal que quelqu’un lit vraiment.' } as L },
  { n: '02', title: { en: 'Keep data where it lives.', fr: 'Garder les données chez elles.' } as L, text: { en: 'On-prem first when the documents are sensitive.', fr: 'On-premise d’abord quand les documents sont sensibles.' } as L },
  { n: '03', title: { en: 'Ship in the user’s language.', fr: 'Livrer dans la langue de l’utilisateur.' } as L, text: { en: 'Arabic, French or English, with right-to-left done properly.', fr: 'Arabe, français ou anglais, avec un droite-à-gauche bien fait.' } as L },
  { n: '04', title: { en: 'Name the number.', fr: 'Donner le chiffre.' } as L, text: { en: 'Every project ends with a before and an after.', fr: 'Chaque projet se termine par un avant et un après.' } as L },
];

const priceOnRequest: L = { en: 'Price on request', fr: 'Prix sur demande' };
export const services = [
  {
    n: '01',
    name: { en: 'Automation & scraping', fr: 'Automatisation & scraping' } as L,
    scope: {
      en: 'A Python/Selenium bot for your portals: login, forms, downloads, retries, health checks, and an alert when something fails. [[todo:how many portals per pack]]',
      fr: 'Un robot Python/Selenium pour vos portails : connexion, formulaires, téléchargements, reprises, contrôles de santé et alerte en cas d’échec. [[todo:nombre de portails inclus]]',
    } as L,
    deliverable: {
      en: 'Repo + YAML config + clean Excel/CSV or database tables + a one-page runbook.',
      fr: 'Dépôt + configuration YAML + tableaux Excel/CSV ou base de données propres + une fiche d’exploitation d’une page.',
    } as L,
    timeline: { en: '[[todo:timeline]]', fr: '[[todo:délai]]' } as L,
    price: priceOnRequest,
    proof: { slug: 'dce-scraper', label: 'DCE Scraper' },
  },
  {
    n: '02',
    name: { en: 'AI on your documents', fr: 'L’IA sur vos documents' } as L,
    scope: {
      en: 'A private RAG assistant over your PDFs in Arabic, French or English: cited answers and access roles, on your servers (Ollama) or in the cloud.',
      fr: 'Un assistant RAG privé sur vos PDF en arabe, français ou anglais : réponses sourcées et droits d’accès, sur vos serveurs (Ollama) ou dans le cloud.',
    } as L,
    deliverable: {
      en: 'Deployed assistant + ingestion pipeline + admin guide.',
      fr: 'Assistant déployé + pipeline d’ingestion + guide d’administration.',
    } as L,
    timeline: { en: '[[todo:timeline]]', fr: '[[todo:délai]]' } as L,
    price: priceOnRequest,
    proof: { slug: 'secure-gov-rag', label: 'Secure Government RAG' },
  },
  {
    n: '03',
    name: { en: 'Web app MVP', fr: 'MVP d’application web' } as L,
    scope: {
      en: 'A FastAPI + React (or Supabase) app: auth, a dashboard, the three screens that matter, and deployment.',
      fr: 'Une application FastAPI + React (ou Supabase) : authentification, tableau de bord, les trois écrans qui comptent, et la mise en ligne.',
    } as L,
    deliverable: {
      en: 'Live URL + repo + a handover call.',
      fr: 'URL en ligne + dépôt + un appel de passation.',
    } as L,
    timeline: { en: '[[todo:timeline]]', fr: '[[todo:délai]]' } as L,
    price: priceOnRequest,
    proof: { slug: 'esaha', label: 'eSaha' },
  },
];

export const process = [
  { n: '01', title: { en: 'Call', fr: 'Appel' } as L, text: { en: 'Thirty minutes on what the data looks like and what “done” means. [[todo:free or paid?]]', fr: 'Trente minutes sur vos données et ce que « terminé » veut dire. [[todo:gratuit ou payant ?]]' } as L },
  { n: '02', title: { en: 'Written scope', fr: 'Périmètre écrit' } as L, text: { en: 'One page: what gets built, what doesn’t, the deliverable and the date.', fr: 'Une page : ce qui est construit, ce qui ne l’est pas, le livrable et la date.' } as L },
  { n: '03', title: { en: 'Build', fr: 'Construction' } as L, text: { en: 'A working demo every week, so nothing is a surprise at the end.', fr: 'Une démo fonctionnelle chaque semaine, pour éviter les surprises à la fin.' } as L },
  { n: '04', title: { en: 'Handover', fr: 'Passation' } as L, text: { en: 'Code, docs and a walkthrough. [[todo:support period after handover]]', fr: 'Code, documentation et démonstration. [[todo:période de support après la passation]]' } as L },
];

export const faq = [
  { q: { en: 'Can it run on our own servers?', fr: 'Est-ce que ça peut tourner sur nos serveurs ?' } as L, a: { en: 'Yes. The government RAG project runs fully on-prem with local models (Ollama), local vectors (pgvector) and local file storage (MinIO).', fr: 'Oui. Le projet RAG gouvernemental tourne entièrement on-premise : modèles locaux (Ollama), vecteurs locaux (pgvector), stockage local (MinIO).' } as L },
  { q: { en: 'Which languages?', fr: 'Quelles langues ?' } as L, a: { en: 'Interfaces and documents in Arabic, French and English, right-to-left included.', fr: 'Interfaces et documents en arabe, français et anglais, droite-à-gauche comprise.' } as L },
  { q: { en: 'Who owns the code?', fr: 'À qui appartient le code ?' } as L, a: { en: '[[todo:IP / ownership policy]]', fr: '[[todo:politique de propriété intellectuelle]]' } as L },
  { q: { en: 'Do you sign an NDA?', fr: 'Signez-vous un accord de confidentialité ?' } as L, a: { en: '[[todo:NDA policy]]', fr: '[[todo:politique NDA]]' } as L },
  { q: { en: 'How do payments work?', fr: 'Comment se passe le paiement ?' } as L, a: { en: '[[todo:deposit / milestones / currency]]', fr: '[[todo:acompte / jalons / devise]]' } as L },
  { q: { en: 'What if a portal changes its layout?', fr: 'Et si un portail change sa mise en page ?' } as L, a: { en: 'Selectors and portal settings live in YAML config, so most changes are a config edit, not a rewrite. [[todo:maintenance offer]]', fr: 'Les sélecteurs et paramètres des portails sont dans une configuration YAML : la plupart des changements se règlent par une modification de configuration, pas une réécriture. [[todo:offre de maintenance]]' } as L },
];

export const cvDownloads = [
  { label: { en: 'Software engineering (EN)', fr: 'Génie logiciel (EN)' } as L, href: '/cv/mamoun-tantaoui-el-araki-cv-software-en.pdf', size: '126 KB' },
  { label: { en: 'AI / ML track (EN)', fr: 'Parcours IA / ML (EN)' } as L, href: null, todo: { en: 'AI/ML CV PDF', fr: 'CV IA/ML en PDF' } as L },
  { label: { en: 'Data track (EN)', fr: 'Parcours data (EN)' } as L, href: null, todo: { en: 'Data CV PDF', fr: 'CV data en PDF' } as L },
  { label: { en: 'CV « Conseil » (FR)', fr: 'CV « Conseil » (FR)' } as L, href: null, todo: { en: 'French “Conseil” CV PDF', fr: 'CV « Conseil » en PDF' } as L },
];

export const skills = [
  { group: { en: 'Languages', fr: 'Langages' } as L, items: 'Python, JavaScript/TypeScript, Kotlin, C, Java, SQL' },
  { group: { en: 'Frameworks', fr: 'Frameworks' } as L, items: 'React, FastAPI, Node.js, Flutter, WordPress, Docker' },
  { group: { en: 'Data & infra', fr: 'Données & infra' } as L, items: 'PostgreSQL (pgvector), MinIO, Ollama, Supabase' },
  { group: { en: 'ML', fr: 'ML' } as L, items: 'PyTorch (PointNet)' },
  { group: { en: 'Tooling', fr: 'Outils' } as L, items: 'Git, Selenium WebDriver, Tailwind, Vite, Figma' },
];

export const archive = [
  {
    title: 'Quiz Game App',
    kind: { en: 'Android · Kotlin', fr: 'Android · Kotlin' } as L,
    text: {
      en: 'Firebase auth, real-time Q&A with a 15-second timer, coroutines, leaderboards, offline cache.',
      fr: 'Authentification Firebase, questions en temps réel avec minuteur de 15 secondes, coroutines, classements, cache hors ligne.',
    } as L,
    links: [{ label: 'GitHub', href: 'https://github.com/mohamedelarakitantaoui/game-app' }],
    qr: true,
    category: 'web',
  },
  {
    title: 'Courses & Lessons App',
    kind: { en: 'Mobile · Flutter', fr: 'Mobile · Flutter' } as L,
    text: {
      en: 'Flutter app with a WordPress backend for browsing courses, lessons and media.',
      fr: 'Application Flutter avec un back-end WordPress pour parcourir cours, leçons et médias.',
    } as L,
    links: [{ label: 'GitHub', href: 'https://github.com/mohamedelarakitantaoui/my-courses-lessons-app' }],
    qr: false,
    category: 'web',
  },
];

export const workFilters = [
  { key: 'all', label: { en: 'All', fr: 'Tout' } as L },
  { key: 'ai', label: { en: 'AI & Data', fr: 'IA & data' } as L },
  { key: 'automation', label: { en: 'Automation', fr: 'Automatisation' } as L },
  { key: 'web', label: { en: 'Web & Mobile', fr: 'Web & mobile' } as L },
  { key: 'research', label: { en: 'Research', fr: 'Recherche' } as L },
];
