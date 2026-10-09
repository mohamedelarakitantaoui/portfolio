// Build-time Open Graph images: the star + the page title, 1200x630, one per page per language.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { STAR_POINTS, plain } from '../../lib/rich';

const pages: Record<string, { en: string; fr: string }> = {
  home: { en: 'I build ML that explains itself, and the software that ships it.', fr: 'Je construis du ML qui s’explique, et le logiciel qui le met en production.' },
  work: { en: 'Three projects, with the numbers.', fr: 'Trois projets, avec les chiffres.' },
  about: { en: 'About: AI and software engineer, Morocco.', fr: 'À propos : ingénieur IA et logiciel, Maroc.' },
  services: { en: 'From portal bots to working MVPs.', fr: 'Du robot de portail au MVP en ligne.' },
  cv: { en: 'CV', fr: 'CV' },
  creative: { en: 'Creative: photography and layout.', fr: 'Créatif : photographie et mise en page.' },
  contact: { en: 'elaraki48@gmail.com', fr: 'elaraki48@gmail.com' },
  privacy: { en: 'Privacy: no cookies, no tracking.', fr: 'Confidentialité : aucun cookie.' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects', (p) => p.data.caseStudy && (import.meta.env.DEV || !p.data.draft));
  const out: { params: { key: string }; props: { title: string; kicker: string } }[] = [];
  for (const [k, v] of Object.entries(pages)) {
    for (const lang of ['en', 'fr'] as const) out.push({ params: { key: `${k}-${lang}` }, props: { title: v[lang], kicker: lang === 'fr' ? 'Ingénieur IA et logiciel' : 'AI and software engineer' } });
  }
  for (const p of projects) {
    out.push({ params: { key: `work-${p.data.key}-${p.data.lang}` }, props: { title: p.data.title, kicker: (p.data.number ? `${plain(p.data.number.value)} · ${plain(p.data.number.caption)}` : plain(p.data.progress ?? p.data.outcome)).slice(0, 90) } });
  }
  return out;
};

const fontDir = path.resolve('node_modules/@fontsource/bricolage-grotesque/files');
let fonts: { name: string; data: Buffer; weight: 600 | 700; style: 'normal' }[] | null = null;
async function loadFonts() {
  if (fonts) return fonts;
  const f = (n: string) => fs.readFile(path.join(fontDir, n));
  fonts = [
    { name: 'Bricolage', data: await f('bricolage-grotesque-latin-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'Bricolage', data: await f('bricolage-grotesque-latin-ext-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'Bricolage', data: await f('bricolage-grotesque-latin-600-normal.woff'), weight: 600, style: 'normal' },
    { name: 'Bricolage', data: await f('bricolage-grotesque-latin-ext-600-normal.woff'), weight: 600, style: 'normal' },
  ];
  return fonts;
}

// Stroke-only {8/3} mark; weight in viewBox units (scales with the rendered size).
const star = (color: string, weight: number) => `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="${STAR_POINTS}" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linejoin="miter"/></svg>`).toString('base64')}`;
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const size = title.length > 34 ? 76 : title.length > 18 ? 96 : 150;
  const tree = h('div', { width: 1200, height: 630, display: 'flex', position: 'relative', background: '#111111', color: '#f2f0ea', fontFamily: 'Bricolage', padding: 72, flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }, [
    { type: 'img', props: { src: star('#f2a900', 2.2), width: 560, height: 560, style: { position: 'absolute', right: -150, top: 40 } } },
    h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }, [
      { type: 'img', props: { src: star('#f2a900', 8), width: 34, height: 34 } },
      'Mamoun El Araki',
    ]),
    h('div', { display: 'flex', fontSize: size, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.95, maxWidth: 900 }, title),
    h('div', { display: 'flex', fontSize: 26, fontWeight: 600, color: '#a3a39e', letterSpacing: '0.01em' }, kicker),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
