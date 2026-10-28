// CV PDFs, checked at build time: a file in public/cv/ gets a download button with its real size; a missing
// one gets no button (a TODO in dev only). Server-only (node:fs); import from .astro frontmatter, never from client scripts.
// The capstone report is NOT a CV and is never listed here (it lives in public/research/).
import fs from 'node:fs';
import path from 'node:path';
import { type Lang, lp } from '../i18n/ui';
import { withBase } from './base';

type L = Record<Lang, string>;
interface CvFile { file: string; label: L; todo: L; langs: Lang[] }

const files: CvFile[] = [
  { file: 'Mohamed-El-Araki-CV-AI-ML.pdf', label: { en: 'AI / ML (EN)', fr: 'IA / ML (EN)' }, todo: { en: 'add Mohamed-El-Araki-CV-AI-ML.pdf to public/cv/', fr: 'ajouter Mohamed-El-Araki-CV-AI-ML.pdf dans public/cv/' }, langs: ['en', 'fr'] },
  { file: 'Mohamed-El-Araki-CV-Data.pdf', label: { en: 'Data (EN)', fr: 'Data (EN)' }, todo: { en: 'add Mohamed-El-Araki-CV-Data.pdf to public/cv/', fr: 'ajouter Mohamed-El-Araki-CV-Data.pdf dans public/cv/' }, langs: ['en', 'fr'] },
  { file: 'Mohamed-El-Araki-CV-Software.pdf', label: { en: 'Software engineering (EN)', fr: 'Génie logiciel (EN)' }, todo: { en: 'add Mohamed-El-Araki-CV-Software.pdf to public/cv/', fr: 'ajouter Mohamed-El-Araki-CV-Software.pdf dans public/cv/' }, langs: ['en', 'fr'] },
  { file: 'Mohamed-El-Araki-CV-Conseil.pdf', label: { en: 'Conseil (FR)', fr: 'Conseil (FR)' }, todo: { en: 'add Mohamed-El-Araki-CV-Conseil.pdf to public/cv/', fr: 'ajouter Mohamed-El-Araki-CV-Conseil.pdf dans public/cv/' }, langs: ['fr'] },
];

const kb = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

export const cvDownloads = files.map((f) => {
  const p = path.resolve('public/cv', f.file);
  const exists = fs.existsSync(p);
  return { ...f, href: exists ? withBase(`/cv/${f.file}`) : null, size: exists ? kb(fs.statSync(p).size) : null };
});

/** The PDFs offered on /cv (EN) or /fr/cv (FR). The Conseil CV is French-only. */
export const cvFor = (lang: Lang) => cvDownloads.filter((d) => d.langs.includes(lang));

// Every "Download CV" button (hero, doors, footer, about, Cmd+K) goes to the web CV, where the PDFs live.
export const cvLink = (lang: Lang) => ({ href: lp(lang, '/cv'), download: false as const });
