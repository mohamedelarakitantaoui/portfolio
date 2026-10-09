// Site copy. Facts come only from the brief, the repo, the Intelcia internship report and the
// AneuXplain capstone report. Missing facts are [[todo:…]] markers: shown in `astro dev`, removed from
// production builds, excluded from the ask-mamoun corpus. **x** renders bold.
// Facts follow the three CVs dated 7 Oct 2026 (public/cv/) and decisions recorded since.
import type { Lang } from '../i18n/ui';

export type L<T = string> = Record<Lang, T>;

export const person = {
  name: 'Mamoun El Araki',
  legalName: 'Mohamed Al Mamoun Tantaoui El Araki',
  // TODO(user): switch to an @mamounelaraki.com address once the domain has mail.
  email: 'elaraki48@gmail.com',
  github: 'https://github.com/mohamedelarakitantaoui',
  githubLabel: 'github.com/mohamedelarakitantaoui',
  linkedin: 'https://www.linkedin.com/in/mohamed-al-mamoun-t-el-araki-27ab042a3',
  role: { en: 'AI and software engineer', fr: 'Ingénieur IA et logiciel' } as L,
  jobTitle: 'AI and Software Engineer',
  location: { en: 'Based in Morocco · open to remote and relocation', fr: 'Basé au Maroc · ouvert au travail à distance et à la relocalisation' } as L,
};

export const status = {
  employers: {
    en: 'Open to junior AI, ML and software engineering roles. Based in Morocco, open to remote and relocation. [[todo:visa wording, e.g. “visa sponsorship required”, or nothing]]',
    fr: 'Ouvert aux postes junior en IA, ML et génie logiciel. Basé au Maroc, ouvert au travail à distance et à la relocalisation. [[todo:mention du visa, par ex. « parrainage de visa nécessaire », ou rien]]',
  } as L,
  clients: {
    en: 'Taking freelance projects: automation, data collection and web app MVPs.',
    fr: 'Disponible en freelance : automatisation, collecte de données et MVP d’applications web.',
  } as L,
};

export const hero = {
  h1: {
    en: 'I build ML that explains itself, and the software that ships it.',
    fr: 'Je construis du ML qui s’explique, et le logiciel qui le met en production.',
  } as L,
  stats: [
    { value: { en: '90%', fr: '90 %' } as L, label: { en: 'less processing time at Intelcia', fr: 'de temps de traitement en moins chez Intelcia' } as L },
    { value: { en: '0.83', fr: '0,83' } as L, label: { en: 'AUC, AneuXplain', fr: 'AUC, AneuXplain' } as L },
    { value: { en: 'ICOA 2026', fr: 'ICOA 2026' } as L, label: { en: 'paper accepted', fr: 'article accepté' } as L },
  ],
};

// Home "About" statement: one claim (≤ 3 lines at 64px), one lead (≤ 3 lines), then a link to /about.
export const aboutStatement = {
  h: {
    en: 'I measure before I trust a model, and I make its failures visible.',
    fr: 'Je mesure avant de faire confiance à un modèle, et je rends ses échecs visibles.',
  } as L,
  lead: {
    en: 'At Intelcia that meant retries and health checks instead of silent gaps. In AneuXplain, an “out of distribution” warning instead of a confident wrong answer.',
    fr: 'Chez Intelcia, des reprises et des contrôles de santé plutôt que des trous silencieux. Dans AneuXplain, un avertissement « hors distribution » plutôt qu’une mauvaise réponse sûre d’elle.',
  } as L,  // Rolling line under the claim. Each word has a project behind it: explainable (AneuXplain), calibrated
  // (PitchPoint ECE 0.0038), tested (444 PitchPoint tests), shipped (DCE Scraper at Intelcia).
  // Without JS or with reduced motion the full sentence shows; screen readers always get the sentence.
  roll: {
    lead: { en: 'I build models that are', fr: 'Je construis des modèles' } as L,
    words: { en: ['explainable', 'calibrated', 'tested', 'shipped'], fr: ['explicables', 'calibrés', 'testés', 'livrés'] } as L<string[]>,
    sentence: {
      en: 'I build models that are explainable, calibrated, tested and shipped.',
      fr: 'Je construis des modèles explicables, calibrés, testés et livrés.',
    } as L,
  },
};

export const proof = ['Al Akhawayn University', 'Boğaziçi University', 'Intelcia Solutions', 'ICOA 2026'];

export const capabilities = [
  {
    n: '01',
    title: { en: 'Automation & data pipelines', fr: 'Automatisation & pipelines de données' } as L,
    text: {
      en: 'Python services that collect, clean and reconcile data from web portals, with retries, health checks and a log line for every failure.',
      fr: 'Des services Python qui collectent, nettoient et rapprochent les données de portails web, avec reprises, contrôles de santé et une trace pour chaque échec.',
    } as L,
    stack: ['Python', 'Selenium', 'YAML config', 'Worker pools', 'ETL'],
  },
  {
    n: '02',
    title: { en: 'Machine learning & evaluation', fr: 'Machine learning & évaluation' } as L,
    text: {
      en: 'The evaluation harness comes first: calibration, out-of-distribution holdouts and significance tests. Then a model that explains each prediction.',
      fr: 'Le banc d’évaluation d’abord : calibration, jeux hors distribution et tests de significativité. Puis un modèle qui explique chaque prédiction.',
    } as L,
    stack: ['PyTorch', 'scikit-learn', 'LightGBM', 'Calibration', 'FastAPI'],
  },
  {
    n: '03',
    title: { en: 'Full-stack products', fr: 'Produits full-stack' } as L,
    text: {
      en: 'The app people open: a React front end on a FastAPI or Flask API, with auth, dashboards and 3D views, shipped in Docker.',
      fr: 'L’application que les gens ouvrent : une interface React sur une API FastAPI ou Flask, avec authentification, tableaux de bord et vues 3D, livrée dans Docker.',
    } as L,
    stack: ['React', 'TypeScript', 'FastAPI', 'Flask', 'Three.js', 'Docker', 'Kubernetes'],
  },
];

// Home "Now": in-progress work only (past work lives in Experience).
export const now = {
  inProgress: [
    {
      en: '**PitchPoint.** Done: the model, an attention set encoder over player positions blended 50/50 with LightGBM. Next: FastAPI inference and a drag-and-drop pitch in React.',
      fr: '**PitchPoint.** Fait : le modèle, un encodeur d’ensembles à attention sur les positions des joueurs, mélangé à 50/50 avec LightGBM. Ensuite : l’inférence FastAPI et un terrain en glisser-déposer en React.',
    },
    {
      en: '**Kaggle, RSNA knee abnormality detection.** A lean model for the Efficiency track. [[todo:Kaggle profile link and current score, if you want them shown]]',
      fr: '**Kaggle, détection d’anomalies du genou (RSNA).** Un modèle léger pour la catégorie Efficiency. [[todo:lien du profil Kaggle et score actuel, si vous voulez les afficher]]',
    },
  ] as L[],
};

export const doors = {
  employers: {
    title: { en: 'Hiring?', fr: 'Vous recrutez ?' } as L,
    text: {
      en: 'Junior AI, ML or software engineering. I want a first full-time role where the work ships. Based in Morocco, open to remote and relocation.',
      fr: 'Ingénieur junior en IA, ML ou logiciel. Je cherche un premier poste à temps plein où le travail part en production. Basé au Maroc, ouvert au travail à distance et à la relocalisation.',
    } as L,
  },
  clients: {
    title: { en: 'Need something built?', fr: 'Un projet à construire ?' } as L,
    text: {
      en: 'A bot that collects your data from web portals, or a web app MVP. Two fixed-scope packs, each with a deliverable and a timeline.',
      fr: 'Un robot qui collecte vos données sur des portails web, ou un MVP d’application web. Deux offres au périmètre fixe, chacune avec un livrable et un délai.',
    } as L,
  },
};

// Experience rows. `home: true` = on the home page; every row is on the CV.
export const experience = [
  {
    home: true,
    year: '2025',
    span: { en: 'Jun–Aug', fr: 'juin–août' } as L,
    role: { en: 'Software Engineer Intern', fr: 'Stagiaire ingénieur logiciel' } as L,
    org: 'Intelcia Solutions',
    orgUrl: 'https://www.intelcia.com',
    location: 'Rabat',
    line: {
      en: 'Built the DCE Scraper: 90% less processing time (2h30 → 15 min), 10+ hours saved per week.',
      fr: 'Conception du DCE Scraper : 90 % de temps de traitement en moins (2 h 30 → 15 min), plus de 10 heures gagnées par semaine.',
    } as L,
    result: {
      en: 'Built the DCE Scraper, which collects public-procurement documents into an LLM training dataset for an AI chatbot: 90% less processing time (2h30 → 15 min for 300 consultations), 10+ hours saved per week. Split a 3,643-line script into 7 services; retries and health checks ended silent failures.',
      fr: 'Conception du DCE Scraper, qui collecte des documents de marchés publics pour constituer le jeu de données d’entraînement d’un chatbot IA : 90 % de temps de traitement en moins (2 h 30 → 15 min pour 300 consultations), plus de 10 heures gagnées par semaine. Un script de 3 643 lignes découpé en 7 services ; reprises et contrôles de santé pour en finir avec les échecs silencieux.',
    } as L,
    tags: ['Python', 'Selenium', 'Microservices'],
    href: '/work/dce-scraper',
  },
  {
    home: true,
    year: '2024',
    span: { en: 'Jun–Aug', fr: 'juin–août' } as L,
    role: { en: 'Web Applications Intern', fr: 'Stagiaire en applications web' } as L,
    org: 'ITS Elaraki School',
    location: 'Marrakech',
    line: {
      en: 'Built Preparia: 30+ interactive modules across 6 baccalaureate subjects, 150+ students and 12 teachers onboarded.',
      fr: 'Conception de Preparia : plus de 30 modules interactifs sur 6 matières du baccalauréat, plus de 150 élèves et 12 enseignants formés.',
    } as L,
    result: {
      en: 'Built Preparia, an exam-prep platform on WordPress and H5P: 30+ interactive modules across 6 baccalaureate subjects. Ran the documentation, support and training that onboarded 150+ students and 12 teachers without follow-up IT support.',
      fr: 'Conception de Preparia, plateforme de préparation aux examens sur WordPress et H5P : plus de 30 modules interactifs sur 6 matières du baccalauréat. Documentation, support et formation qui ont permis à plus de 150 élèves et 12 enseignants de l’utiliser sans support informatique ensuite.',
    } as L,
    tags: ['WordPress', 'Elementor', 'H5P'],
    href: '/work/preparia',
  },
  {
    home: false,
    // The CVs list mentoring under Activities, without dates.
    year: '',
    span: { en: 'Activity', fr: 'Activité' } as L,
    role: { en: 'Mentor', fr: 'Mentor' } as L,
    org: 'AUI Compete Organisation',
    location: 'Ifrane',
    line: { en: 'Mentored students in algorithmic problem solving.', fr: 'Mentorat d’étudiants en résolution de problèmes algorithmiques.' } as L,
    result: {
      en: 'Mentored students in algorithmic problem solving.',
      fr: 'Mentorat d’étudiants en résolution de problèmes algorithmiques.',
    } as L,
    tags: [] as string[],
  },
] as {
  home: boolean; year: string; span: L; role: L; org: string; orgUrl?: string; location: string;
  line: L; result: L; tags: string[]; href?: string;
}[];

export const education = [
  {
    dates: { en: 'Sep 2021 – Jul 2026', fr: 'sept. 2021 – juil. 2026' } as L,
    school: 'Al Akhawayn University, Ifrane',
    short: { en: 'Al Akhawayn University, BSc Computer Science (2021–2026)', fr: 'Université Al Akhawayn, licence (BSc) en informatique (2021–2026)' } as L,
    degree: {
      en: 'BSc in Computer Science, minor in Communication Studies. Capstone: AneuXplain (spring 2026).',
      fr: 'Licence (BSc) en informatique, mineure en communication. Projet de fin d’études : AneuXplain (printemps 2026).',
    } as L,
  },
  {
    dates: { en: 'Fall 2024', fr: 'automne 2024' } as L,
    school: 'Boğaziçi University, Istanbul',
    short: { en: 'Boğaziçi University exchange (Fall 2024)', fr: 'Échange à l’Université Boğaziçi (automne 2024)' } as L,
    degree: { en: 'Exchange program in Computer Engineering.', fr: 'Programme d’échange en génie informatique.' } as L,
  },
];

export const spoken = {
  en: ['Arabic', 'French', 'English', 'Spanish (beginner)'],
  fr: ['Arabe', 'Français', 'Anglais', 'Espagnol (débutant)'],
} as L<string[]>;

// About page: three short paragraphs (who, what I work on, how I work). Facts only from the projects.
export const about = {
  who: {
    en: "I'm Mamoun El Araki, an AI and software engineer based in Morocco. I studied computer science at Al Akhawayn University in Ifrane, with an exchange semester at Boğaziçi University in Istanbul.",
    fr: 'Je suis Mamoun El Araki, ingénieur IA et logiciel, basé au Maroc. J’ai étudié l’informatique à l’Université Al Akhawayn, à Ifrane, avec un semestre d’échange à l’Université Boğaziçi, à Istanbul.',
  } as L,
  what: {
    en: 'I work on machine learning that explains its predictions, like AneuXplain, my capstone on aneurysm rupture risk (paper accepted at ICOA 2026). I also build the software around it: data pipelines, APIs and web apps.',
    fr: 'Je travaille sur du machine learning qui explique ses prédictions, comme AneuXplain, mon projet de fin d’études sur le risque de rupture d’anévrisme (article accepté à ICOA 2026). Je construis aussi le logiciel autour : pipelines de données, API et applications web.',
  } as L,
  how: {
    en: 'I measure before and after, and I make failures visible. At Intelcia that meant retries and health checks instead of silent gaps. In AneuXplain it meant an “out of distribution” warning instead of a confident wrong answer.',
    fr: 'Je mesure avant et après, et je rends les échecs visibles. Chez Intelcia, cela voulait dire des reprises et des contrôles de santé plutôt que des trous silencieux. Dans AneuXplain, un avertissement « hors distribution » plutôt qu’une mauvaise réponse sûre d’elle.',
  } as L,
};

const priceOnRequest: L = { en: 'Price on request', fr: 'Prix sur demande' };
export const services = [
  {
    n: '01',
    name: { en: 'Automation & data collection', fr: 'Automatisation & collecte de données' } as L,
    scope: {
      en: 'A Python/Selenium bot for your portals: login, forms, downloads, retries, health checks, and an alert when something fails. [[todo:how many portals per pack]]',
      fr: 'Un robot Python/Selenium pour vos portails : connexion, formulaires, téléchargements, reprises, contrôles de santé et alerte en cas d’échec. [[todo:nombre de portails inclus]]',
    } as L,
    deliverable: {
      en: 'Repo + YAML config + clean Excel/CSV or database tables + a one-page runbook.',
      fr: 'Dépôt + configuration YAML + tableaux Excel/CSV ou base de données propres + une fiche d’exploitation d’une page.',
    } as L,
    timeline: { en: '[[todo:timeline]]', fr: '[[todo:délai]]' } as L,
    // TODO(user): a "from" price in USD per pack; until then the page shows "Price on request".
    price: priceOnRequest,
    proof: { slug: 'dce-scraper', label: 'DCE Scraper' },
  },
  {
    n: '02',
    name: { en: 'Web app MVP', fr: 'MVP d’application web' } as L,
    scope: {
      en: 'A FastAPI or Flask back end with a React front end: auth, a dashboard, the three screens that matter, and deployment.',
      fr: 'Un back-end FastAPI ou Flask avec une interface React : authentification, tableau de bord, les trois écrans qui comptent, et la mise en ligne.',
    } as L,
    deliverable: {
      en: 'Live URL + repo + a handover call.',
      fr: 'URL en ligne + dépôt + un appel de passation.',
    } as L,
    timeline: { en: '[[todo:timeline]]', fr: '[[todo:délai]]' } as L,
    price: priceOnRequest,
    proof: { slug: 'aneuxplain', label: 'AneuXplain (FastAPI + React)' },
  },
];

export const process = [
  { n: '01', title: { en: 'Call', fr: 'Appel' } as L, text: { en: 'Thirty minutes on what the data looks like and what “done” means. [[todo:free or paid?]]', fr: 'Trente minutes sur vos données et ce que « terminé » veut dire. [[todo:gratuit ou payant ?]]' } as L },
  { n: '02', title: { en: 'Written scope', fr: 'Périmètre écrit' } as L, text: { en: 'One page: what gets built, what doesn’t, the deliverable and the date.', fr: 'Une page : ce qui est construit, ce qui ne l’est pas, le livrable et la date.' } as L },
  { n: '03', title: { en: 'Build', fr: 'Construction' } as L, text: { en: 'A working demo every week, so nothing is a surprise at the end.', fr: 'Une démo fonctionnelle chaque semaine, pour éviter les surprises à la fin.' } as L },
  { n: '04', title: { en: 'Handover', fr: 'Passation' } as L, text: { en: 'Code, docs and a walkthrough. [[todo:support period after handover]]', fr: 'Code, documentation et démonstration. [[todo:période de support après la passation]]' } as L },
];

export const faq = [
  { q: { en: 'Which languages?', fr: 'Quelles langues ?' } as L, a: { en: 'Interfaces and documents in French or English. [[todo:Arabic and right-to-left, if a shipped project backs it]]', fr: 'Interfaces et documents en français ou en anglais. [[todo:arabe et droite-à-gauche, si un projet livré le prouve]]' } as L },
  { q: { en: 'Who owns the code?', fr: 'À qui appartient le code ?' } as L, a: { en: '[[todo:IP / ownership policy]]', fr: '[[todo:politique de propriété intellectuelle]]' } as L },
  { q: { en: 'Do you sign an NDA?', fr: 'Signez-vous un accord de confidentialité ?' } as L, a: { en: '[[todo:NDA policy]]', fr: '[[todo:politique NDA]]' } as L },
  { q: { en: 'How do payments work?', fr: 'Comment se passe le paiement ?' } as L, a: { en: '[[todo:deposit / milestones / currency]]', fr: '[[todo:acompte / jalons / devise]]' } as L },
  { q: { en: 'What if a portal changes its layout?', fr: 'Et si un portail change sa mise en page ?' } as L, a: { en: 'Selectors and portal settings live in YAML config, so most changes are a config edit, not a rewrite. [[todo:maintenance offer]]', fr: 'Les sélecteurs et paramètres des portails sont dans une configuration YAML : la plupart des changements se règlent par une modification de configuration, pas une réécriture. [[todo:offre de maintenance]]' } as L },
];

export const skills = [
  { group: { en: 'Languages', fr: 'Langages' } as L, items: 'Python, SQL, JavaScript, TypeScript, Java, C/C++, Kotlin, Dart, YAML' },
  { group: { en: 'Machine learning', fr: 'Machine learning' } as L, items: 'PyTorch, scikit-learn, LightGBM, Pandas, NumPy; calibration, cross-validation, significance testing, explainability' },
  { group: { en: 'Generative AI', fr: 'IA générative' } as L, items: 'GPT API integration, prompt engineering, conversational assistants, sentiment analysis' },
  { group: { en: 'Backend & data', fr: 'Back-end & données' } as L, items: 'FastAPI, Flask, Node.js/Express, REST APIs, JWT, SQLAlchemy, PostgreSQL, MySQL, MongoDB, ETL, Selenium' },
  { group: { en: 'Frontend', fr: 'Front-end' } as L, items: 'React, Next.js, Vite, Tailwind CSS, Three.js, React Native, Flutter' },
  { group: { en: 'DevOps & cloud', fr: 'DevOps & cloud' } as L, items: 'Docker, Kubernetes, Nginx, Linux, Git, CI/CD (Tekton), AWS, monitoring' },
];

// "More projects": one row each (title · one line · year · links). Home page, /work and the CV.
export interface MoreProject { key: string; title: string; year: string; line: L; home?: boolean; caseStudy?: string; links: { label: string; href: string }[] }
export const moreProjects: MoreProject[] = [
  {
    key: 'esaha',
    home: true,
    title: 'eSaha',
    year: '2025',
    line: {
      en: 'A mental-health platform with a GPT-powered assistant in 4 languages, built with React, TypeScript, Flask and MongoDB behind JWT auth.',
      fr: 'Une plateforme de santé mentale avec un assistant GPT en 4 langues, construite en React, TypeScript, Flask et MongoDB, avec authentification JWT.',
    },
    links: [],
  },
  {
    key: 'mini-private-cloud',
    home: true,
    title: 'Mini Private Cloud',
    year: '2026',
    line: {
      en: 'A Python CLI that drives the Docker Engine: declarative YAML provisioning, horizontal scaling, load balancing behind an Nginx gateway, and self-healing services.',
      fr: 'Un CLI Python qui pilote le Docker Engine : provisionnement déclaratif en YAML, montée en charge horizontale, répartition de charge derrière une passerelle Nginx, et services auto-réparateurs.',
    },
    links: [],
  },
  {
    key: 'preparia',
    home: true,
    title: 'Preparia',
    year: '2024',
    line: {
      en: 'An exam-prep platform for ITS Elaraki School: 30+ interactive modules across 6 baccalaureate subjects, 150+ students and 12 teachers onboarded.',
      fr: 'Une plateforme de préparation aux examens pour l’école ITS Elaraki : plus de 30 modules interactifs sur 6 matières du baccalauréat, plus de 150 élèves et 12 enseignants formés.',
    },
    caseStudy: '/work/preparia',
    links: [{ label: 'preparia.ma', href: 'https://preparia.ma/fr_fr' }],
  },
  {
    key: 'quiz',
    title: 'Quiz Game App',
    year: '[[todo:year]]',
    line: {
      en: 'An Android quiz game in Kotlin: Firebase auth, a 15-second timer, leaderboards and an offline cache.',
      fr: 'Un jeu de quiz Android en Kotlin : authentification Firebase, minuteur de 15 secondes, classements et cache hors ligne.',
    },
    links: [{ label: 'GitHub', href: 'https://github.com/mohamedelarakitantaoui/game-app' }],
  },
  {
    key: 'courses',
    title: 'Courses & Lessons App',
    year: '[[todo:year]]',
    line: {
      en: 'A Flutter app on a WordPress backend for browsing courses, lessons and media.',
      fr: 'Une application Flutter sur un back-end WordPress pour parcourir cours, leçons et médias.',
    },
    links: [{ label: 'GitHub', href: 'https://github.com/mohamedelarakitantaoui/my-courses-lessons-app' }],
  },
];
