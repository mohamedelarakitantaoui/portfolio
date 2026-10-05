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

  rag: {
    h: 560,
    title: { en: 'Secure Government RAG architecture', fr: 'Architecture du Secure Government RAG' },
    desc: {
      en: 'Users reach a React interface through NGINX; a FastAPI chat service authenticates with Keycloak, retrieves from pgvector and MinIO, generates with Ollama and writes an audit log, all inside one on-prem network.',
      fr: 'Les utilisateurs passent par NGINX vers une interface React ; un service FastAPI s’authentifie via Keycloak, cherche dans pgvector et MinIO, génère avec Ollama et écrit un journal d’audit, le tout sur un seul réseau on-premise.',
    },
    groups: [{ x: 0, y: 84, w: W, h: 472, label: { en: 'ON-PREM NETWORK · 0 EXTERNAL CALLS', fr: 'RÉSEAU ON-PREMISE · 0 APPEL EXTERNE' } }],
    nodes: [
      { x: 110, y: 4, w: 200, h: 52, title: { en: 'Users', fr: 'Utilisateurs' }, sub: 'AR · FR · EN', kind: 'chip' },
      { x: 110, y: 112, w: 200, h: 48, title: 'NGINX', sub: { en: 'reverse proxy', fr: 'proxy inverse' } },
      { x: 12, y: 196, w: 250, h: 52, title: 'React + TypeScript', sub: { en: 'chat UI · right-to-left', fr: 'interface de chat · RTL' } },
      { x: 274, y: 196, w: 134, h: 52, title: 'Keycloak', sub: { en: 'roles', fr: 'rôles' } },
      { x: 12, y: 286, w: 396, h: 56, title: { en: 'FastAPI chat service', fr: 'Service de chat FastAPI' }, sub: { en: 'context-restricted answers · citations · guardrails', fr: 'réponses limitées au contexte · citations · garde-fous' }, kind: 'accent' },
      { x: 12, y: 382, w: 124, h: 64, title: 'Ollama', sub: 'Llama 3.2 · Aya 8B' },
      { x: 148, y: 382, w: 124, h: 64, title: 'pgvector', sub: { en: 'E5-Base vectors', fr: 'vecteurs E5-Base' } },
      { x: 284, y: 382, w: 124, h: 64, title: 'MinIO', sub: { en: 'documents', fr: 'documents' } },
      { x: 12, y: 482, w: 190, h: 56, title: { en: 'Audit log', fr: 'Journal d’audit' }, sub: { en: 'who asked, which sources', fr: 'qui, quelles sources' }, kind: 'dashed' },
      { x: 218, y: 482, w: 190, h: 56, title: 'PDF → Excel', sub: { en: 'second pipeline', fr: 'second pipeline' } },
    ],
    edges: [
      { pts: [[210, 56], [210, 112]] },
      { pts: [[137, 160], [137, 196]] },
      { pts: [[137, 248], [137, 286]] },
      { pts: [[341, 248], [341, 286]], dashed: true },
      { pts: [[74, 342], [74, 382]] },
      { pts: [[210, 342], [210, 382]] },
      { pts: [[346, 342], [346, 382]] },
      { pts: [[12, 320], [6, 320], [6, 510], [12, 510]], dashed: true },
    ],
  },

  aneu: {
    h: 690,
    title: { en: 'AneuXplain pipeline', fr: 'Pipeline AneuXplain' },
    desc: {
      en: 'DICOM scan, vessel segmentation, marching-cubes mesh, crop around a selected point, harmonisation to the training distribution, 3D view, then a heatmap, a risk score from PointNet and eight morphology parameters, combined into a plain-language clinical report.',
      fr: 'Examen DICOM, segmentation des vaisseaux, maillage par marching cubes, recadrage autour d’un point choisi, harmonisation avec la distribution d’entraînement, vue 3D, puis carte de chaleur, score de risque PointNet et huit paramètres morphologiques, réunis dans un rapport clinique en langage clair.',
    },
    nodes: [
      { x: 60, y: 4, w: 300, h: 46, title: 'DICOM', sub: { en: 'imaging study', fr: 'examen d’imagerie' }, kind: 'chip' },
      { x: 60, y: 82, w: 300, h: 46, title: { en: 'Vessel segmentation', fr: 'Segmentation des vaisseaux' } },
      { x: 60, y: 160, w: 300, h: 46, title: { en: 'Marching-cubes mesh', fr: 'Maillage marching cubes' } },
      { x: 60, y: 238, w: 300, h: 46, title: { en: 'Crop around selected point', fr: 'Recadrage autour du point choisi' } },
      { x: 60, y: 316, w: 300, h: 46, title: { en: 'Harmonise to training data', fr: 'Harmonisation avec l’entraînement' } },
      { x: 60, y: 394, w: 300, h: 46, title: { en: '3D view', fr: 'Vue 3D' } },
      { x: 4, y: 478, w: 132, h: 62, title: { en: 'Heatmap', fr: 'Carte de chaleur' }, sub: { en: 'regions driving it', fr: 'zones en cause' } },
      { x: 144, y: 478, w: 132, h: 62, title: { en: 'Risk 0–1', fr: 'Risque 0–1' }, sub: 'PointNet · 2,048 pts', kind: 'accent' },
      { x: 284, y: 478, w: 132, h: 62, title: { en: '8 parameters', fr: '8 paramètres' }, sub: { en: 'morphology', fr: 'morphologie' } },
      { x: 60, y: 580, w: 300, h: 56, title: { en: 'Clinical report', fr: 'Rapport clinique' }, sub: { en: 'plain language', fr: 'en langage clair' }, kind: 'out' },
    ],
    edges: [
      { pts: [[210, 50], [210, 82]] },
      { pts: [[210, 128], [210, 160]] },
      { pts: [[210, 206], [210, 238]] },
      { pts: [[210, 284], [210, 316]] },
      { pts: [[210, 362], [210, 394]] },
      { pts: [[160, 440], [70, 478]] },
      { pts: [[210, 440], [210, 478]] },
      { pts: [[260, 440], [350, 478]] },
      { pts: [[70, 540], [160, 580]] },
      { pts: [[210, 540], [210, 580]] },
      { pts: [[350, 540], [260, 580]] },
    ],
  },

  esaha: {
    h: 420,
    title: { en: 'eSaha architecture', fr: 'Architecture d’eSaha' },
    desc: {
      en: 'A React single-page app with seven protected modules, backed by Supabase authentication, database and storage.',
      fr: 'Une application React monopage avec sept modules protégés, adossée à l’authentification, la base de données et le stockage Supabase.',
    },
    groups: [{ x: 0, y: 84, w: W, h: 222, label: { en: 'PROTECTED ROUTES', fr: 'ROUTES PROTÉGÉES' } }],
    nodes: [
      { x: 60, y: 4, w: 300, h: 52, title: 'React SPA', sub: 'TypeScript · Vite · Tailwind', kind: 'chip' },
      { x: col3(0) + 6, y: 112, w: 124, h: 40, title: { en: 'Auth', fr: 'Auth' } },
      { x: col3(1) + 4, y: 112, w: 124, h: 40, title: { en: 'Directory', fr: 'Annuaire' } },
      { x: col3(2) + 2, y: 112, w: 124, h: 40, title: { en: 'Live chat', fr: 'Chat' } },
      { x: col3(0) + 6, y: 162, w: 124, h: 40, title: { en: 'Journal', fr: 'Journal' } },
      { x: col3(1) + 4, y: 162, w: 124, h: 40, title: { en: 'Appointments', fr: 'Rendez-vous' } },
      { x: col3(2) + 2, y: 162, w: 124, h: 40, title: { en: 'Emergency', fr: 'Urgences' } },
      { x: col3(1) + 4, y: 212, w: 124, h: 40, title: { en: 'Resources', fr: 'Ressources' } },
      { x: 60, y: 346, w: 300, h: 56, title: 'Supabase', sub: 'Auth · DB · Storage', kind: 'accent' },
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
