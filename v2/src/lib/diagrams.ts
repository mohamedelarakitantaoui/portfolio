// Architecture diagrams as data (viewBox 420 wide, vertical flow so labels stay legible on phones).
// Drawn only from documented facts: repo notes, the internship report and the capstone deck.
import type { Lang } from '../i18n/ui';

type T = string | Record<Lang, string>;
export interface DNode { x: number; y: number; w: number; h: number; title: T; sub?: T; kind?: 'accent' | 'dashed' | 'out' | 'chip' }
export interface DGroup { x: number; y: number; w: number; h: number; label: T }
export interface DEdge { pts: [number, number][]; dashed?: boolean; label?: T }
export interface Diagram { h: number; title: Record<Lang, string>; desc: Record<Lang, string>; groups?: DGroup[]; nodes: DNode[]; edges: DEdge[] }

export const tr = (v: T | undefined, lang: Lang) => (v === undefined ? '' : typeof v === 'string' ? v : v[lang]);

const W = 420;
const col3 = (i: number) => 4 + i * 140; // three columns, 132 wide, 8 gap

export const diagrams: Record<string, Diagram> = {
  dce: {
    h: 520,
    title: { en: 'DCE Scraper architecture', fr: 'Architecture du DCE Scraper' },
    desc: {
      en: 'Three procurement sources feed a pool of up to ten browsers, coordinated by an orchestrator and five services, with a retry loop, ending in an LLM training dataset.',
      fr: 'Trois sources de marchés publics alimentent un pool de dix navigateurs maximum, coordonné par un orchestrateur et cinq services, avec une boucle de reprise, jusqu’au jeu de données d’entraînement.',
    },
    nodes: [
      { x: col3(0), y: 4, w: 132, h: 52, title: 'marchespublics', sub: '.gov.ma', kind: 'chip' },
      { x: col3(1), y: 4, w: 132, h: 52, title: 'marocao.com', sub: { en: 'tenders', fr: 'appels d’offres' }, kind: 'chip' },
      { x: col3(2), y: 4, w: 132, h: 52, title: { en: 'Internal', fr: 'Portail' }, sub: { en: 'purchasing portal', fr: 'd’achats interne' }, kind: 'chip' },
      { x: 4, y: 96, w: W - 8, h: 70, title: 'WorkerPoolService', sub: { en: 'up to 10 Selenium browsers in parallel', fr: 'jusqu’à 10 navigateurs Selenium en parallèle' } },
      { x: 4, y: 206, w: W - 8, h: 52, title: 'HybridOrchestrator', sub: { en: 'schedules consultations · YAML config per portal', fr: 'planifie les consultations · config YAML par portail' }, kind: 'accent' },
      { x: 4, y: 298, w: 204, h: 52, title: 'UrlExtraction', sub: { en: 'find documents', fr: 'trouve les documents' } },
      { x: 212, y: 298, w: 204, h: 52, title: 'FormProcessing', sub: { en: 'fill download forms', fr: 'remplit les formulaires' } },
      { x: 4, y: 358, w: 204, h: 52, title: 'DownloadManagement', sub: { en: 'download + verify', fr: 'télécharge + vérifie' } },
      { x: 212, y: 358, w: 204, h: 52, title: 'FileManagement', sub: { en: 'organise + check files', fr: 'classe + contrôle' } },
      { x: 4, y: 450, w: 204, h: 52, title: 'RetryService', sub: { en: 'pattern-aware retries', fr: 'reprises selon l’échec' }, kind: 'dashed' },
      { x: 212, y: 450, w: 204, h: 52, title: { en: 'LLM training dataset', fr: 'Jeu de données LLM' }, sub: { en: 'for an AI chatbot', fr: 'pour un chatbot IA' }, kind: 'out' },
    ],
    edges: [
      { pts: [[70, 56], [70, 96]] },
      { pts: [[210, 56], [210, 96]] },
      { pts: [[350, 56], [350, 96]] },
      { pts: [[210, 166], [210, 206]] },
      { pts: [[106, 258], [106, 298]] },
      { pts: [[314, 258], [314, 298]] },
      { pts: [[314, 410], [314, 450]] },
      { pts: [[106, 410], [106, 450]], dashed: true },
      { pts: [[4, 476], [-2, 476], [-2, 232], [4, 232]], dashed: true },
    ],
  },

  esaha: {
    h: 420,
    title: { en: 'eSaha architecture', fr: 'Architecture d’eSaha' },
    desc: {
      en: 'A React and TypeScript front end, localised in 4 languages, on a Flask REST API secured with JWT, with MongoDB and the GPT API behind it.',
      fr: 'Une interface React et TypeScript, traduite en 4 langues, sur une API REST Flask sécurisée par JWT, avec MongoDB et l’API GPT derrière.',
    },
    groups: [{ x: 0, y: 84, w: W, h: 222, label: { en: 'PROTECTED ROUTES', fr: 'ROUTES PROTÉGÉES' } }],
    nodes: [
      { x: 60, y: 4, w: 300, h: 52, title: 'React SPA', sub: 'TypeScript · 4 languages', kind: 'chip' },
      { x: col3(0) + 6, y: 112, w: 124, h: 40, title: { en: 'Auth', fr: 'Auth' } },
      { x: col3(1) + 4, y: 112, w: 124, h: 40, title: { en: 'Directory', fr: 'Annuaire' } },
      { x: col3(2) + 2, y: 112, w: 124, h: 40, title: { en: 'Live chat', fr: 'Chat' } },
      { x: col3(0) + 6, y: 162, w: 124, h: 40, title: { en: 'Journal', fr: 'Journal' } },
      { x: col3(1) + 4, y: 162, w: 124, h: 40, title: { en: 'Appointments', fr: 'Rendez-vous' } },
      { x: col3(2) + 2, y: 162, w: 124, h: 40, title: { en: 'Emergency', fr: 'Urgences' } },
      { x: col3(1) + 4, y: 212, w: 124, h: 40, title: { en: 'Resources', fr: 'Ressources' } },
      { x: 60, y: 346, w: 300, h: 56, title: 'Flask API', sub: 'JWT · MongoDB · GPT API', kind: 'accent' },
    ],
    edges: [
      { pts: [[210, 56], [210, 84]] },
      { pts: [[210, 306], [210, 346]] },
    ],
  },

  preparia: {
    h: 360,
    title: { en: 'Preparia stack', fr: 'Stack de Preparia' },
    desc: {
      en: 'WordPress, Elementor and H5P combine into the preparia.ma platform used by students; a companion mobile app was prepared as groundwork.',
      fr: 'WordPress, Elementor et H5P forment la plateforme preparia.ma utilisée par les élèves ; une application mobile a été préparée en amont.',
    },
    nodes: [
      { x: col3(0), y: 4, w: 132, h: 56, title: 'WordPress', sub: 'CMS', kind: 'chip' },
      { x: col3(1), y: 4, w: 132, h: 56, title: 'Elementor', sub: { en: 'page builder', fr: 'constructeur' }, kind: 'chip' },
      { x: col3(2), y: 4, w: 132, h: 56, title: 'H5P', sub: { en: 'interactive', fr: 'interactif' }, kind: 'chip' },
      { x: 60, y: 110, w: 300, h: 56, title: 'preparia.ma', sub: { en: 'exam-prep platform', fr: 'préparation aux concours' }, kind: 'accent' },
      { x: 4, y: 216, w: 200, h: 56, title: { en: 'Students', fr: 'Élèves' }, sub: { en: 'web, today', fr: 'web, aujourd’hui' }, kind: 'out' },
      { x: 216, y: 216, w: 200, h: 56, title: { en: 'Mobile app', fr: 'App mobile' }, sub: { en: 'groundwork only', fr: 'bases seulement' }, kind: 'dashed' },
    ],
    edges: [
      { pts: [[70, 60], [150, 110]] },
      { pts: [[210, 60], [210, 110]] },
      { pts: [[350, 60], [270, 110]] },
      { pts: [[150, 166], [104, 216]] },
      { pts: [[270, 166], [316, 216]], dashed: true },
    ],
  },
};
