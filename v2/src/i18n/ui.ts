// UI strings + locale helpers. Page copy lives in src/data/*.ts; case studies in src/content/projects/<lang>/.
export const languages = { en: 'English', fr: 'Français' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
// Arabic is prepared (dir="rtl", IBM Plex Sans Arabic, logical CSS) but not published until the copy exists.
export const rtlLangs = ['ar'];

/** Localise an internal path: lp('fr', '/work') -> '/fr/work' */
export function lp(lang: Lang, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (lang === defaultLang) return clean || '/';
  return `/${lang}${clean}` || `/${lang}`;
}

/** The same page in the other language */
export function swapLangPath(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
  return lp(to, bare);
}

export function langFromUrl(url: URL): Lang {
  return url.pathname === '/fr' || url.pathname.startsWith('/fr/') ? 'fr' : 'en';
}

export const strings = {
  en: {
    'skip': 'Skip to content',
    'nav.label': 'Primary',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cv': 'CV',
    'nav.creative': 'Creative',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.privacy': 'Privacy',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'logo.label': 'Mamoun El Araki, home',
    'cta.emailMe': 'Email me',
    'cta.viewWork': 'See my work',
    'cta.downloadCv': 'Download CV',
    'cta.start': 'Start a project',
    'cta.packs': 'See services',
    'cta.fullCv': 'Full CV',
    'cta.linkedin': 'LinkedIn',
    'cta.copyEmail': 'Copy email',
    'cta.copied': 'Copied',
    'cta.allProjects': 'All projects',
    'cta.caseStudy': 'Read case study',
    'cs.label': 'Case study',
    'cs.tldr': 'TL;DR',
    'cta.nextProject': 'Next project',
    'lang.switch': 'Lire en français',
    'lang.short': 'FR',
    'palette.open': 'Open command palette',
    'palette.title': 'Command palette',
    'palette.placeholder': 'Type a page or an action…',
    'palette.empty': 'Nothing matches. Try “cv”, “xG” or “email”.',
    'palette.go': 'Go to',
    'palette.action': 'Action',
    'footer.talk': "Let's talk",
    'footer.where': 'Based in Morocco · open to remote and relocation',
    'footer.privacy': 'No cookies, no tracking.',
    'footer.github': 'GitHub',
    'meta.role': 'Role',
    'meta.timeline': 'Timeline',
    'meta.team': 'Team',
    'meta.status': 'Status',
    'meta.platforms': 'Platforms',
    'meta.stack': 'Stack',
    'meta.languages': 'Languages',
    'meta.links': 'Links',
    'meta.venue': 'Venue',
    'meta.supervision': 'Supervision',
    'work.constraint': 'Constraint',
    'work.role': 'Role',
    'work.status': 'Status',
    'chapter': 'Chapter',
    'todo.title': 'Not filled in yet',
  },
  fr: {
    'skip': 'Aller au contenu',
    'nav.label': 'Principale',
    'nav.work': 'Projets',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.cv': 'CV',
    'nav.creative': 'Créatif',
    'nav.contact': 'Contact',
    'nav.home': 'Accueil',
    'nav.privacy': 'Confidentialité',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer le menu',
    'logo.label': 'Mamoun El Araki, accueil',
    'cta.emailMe': 'M’écrire',
    'cta.viewWork': 'Voir mes projets',
    'cta.downloadCv': 'Télécharger le CV',
    'cta.start': 'Démarrer un projet',
    'cta.packs': 'Voir les services',
    'cta.fullCv': 'CV complet',
    'cta.linkedin': 'LinkedIn',
    'cta.copyEmail': "Copier l'e-mail",
    'cta.copied': 'Copié',
    'cta.allProjects': 'Tous les projets',
    'cta.caseStudy': 'Lire l’étude de cas',
    'cs.label': 'Étude de cas',
    'cs.tldr': 'En bref',
    'cta.nextProject': 'Projet suivant',
    'lang.switch': 'Read in English',
    'lang.short': 'EN',
    'palette.open': 'Ouvrir la palette de commandes',
    'palette.title': 'Palette de commandes',
    'palette.placeholder': 'Tapez une page ou une action…',
    'palette.empty': 'Aucun résultat. Essayez « cv », « xG » ou « email ».',
    'palette.go': 'Aller à',
    'palette.action': 'Action',
    'footer.talk': 'Parlons-en',
    'footer.where': 'Basé au Maroc · ouvert au travail à distance et à la relocalisation',
    'footer.privacy': 'Aucun cookie, aucun suivi.',
    'footer.github': 'GitHub',
    'meta.role': 'Rôle',
    'meta.timeline': 'Période',
    'meta.team': 'Équipe',
    'meta.status': 'Statut',
    'meta.platforms': 'Plateformes',
    'meta.stack': 'Stack',
    'meta.languages': 'Langues',
    'meta.links': 'Liens',
    'meta.venue': 'Publication',
    'meta.supervision': 'Encadrement',
    'work.constraint': 'Contrainte',
    'work.role': 'Rôle',
    'work.status': 'Statut',
    'chapter': 'Chapitre',
    'todo.title': 'Pas encore renseigné',
  },
} as const;

export type UiKey = keyof (typeof strings)['en'];
export function t(lang: Lang, key: UiKey): string {
  return strings[lang][key] ?? strings.en[key];
}
