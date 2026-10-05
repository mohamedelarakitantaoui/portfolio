// Build-time Open Graph images: the star + the page title, 1200x630, one per page per language.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { STAR_PATH } from '../../lib/rich';

const pages: Record<string, { en: string; fr: string }> = {
  home: { en: 'I cut a 2.5-hour procurement run to 15 minutes.', fr: "J'ai fait passer une collecte de 2 h 30 à 15 minutes." },
  work: { en: 'From procurement portals to aneurysm geometry.', fr: 'Des marchés publics aux anévrismes.' },
  about: { en: 'About: Marrakech, Ifrane, Istanbul.', fr: 'À propos : Marrakech, Ifrane, Istanbul.' },
  services: { en: 'From portal bots to private RAG.', fr: 'Du robot de portail au RAG privé.' },
  cv: { en: 'CV', fr: 'CV' },
  creative: { en: 'Creative: photography and layout.', fr: 'Créatif : photographie et mise en page.' },
  contact: { en: 'elaraki48@gmail.com', fr: 'elaraki48@gmail.com' },
  privacy: { en: 'Privacy: no cookies, no tracking.', fr: 'Confidentialité : aucun cookie.' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects');
  const out: { params: { key: string }; props: { title: string; kicker: string } }[] = [];
  for (const [k, v] of Object.entries(pages)) {
    for (const lang of ['en', 'fr'] as const) out.push({ params: { key: `${k}-${lang}` }, props: { title: v[lang], kicker: lang === 'fr' ? 'Ingénieur logiciel, IA & automatisation' : 'Software engineer, AI & automation' } });
  }
  for (const p of projects) {
    out.push({ params: { key: `work-${p.data.key}-${p.data.lang}` }, props: { title: p.data.title, kicker: `${p.data.number.value.replace(/\[\[todo:.*?\]\]/g, '').trim()} · ${p.data.number.caption.replace(/\[\[todo:.*?\]\]/g, '').trim()}` } });
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

const star = (color: string) => `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${color}" d="${STAR_PATH}"/></svg>`).toString('base64')}`;
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const size = title.length > 34 ? 76 : title.length > 18 ? 96 : 150;
  const tree = h('div', { width: 1200, height: 630, display: 'flex', position: 'relative', background: '#0f0d0c', color: '#ede6da', fontFamily: 'Bricolage', padding: 72, flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }, [
    { type: 'img', props: { src: star('#c4532d'), width: 520, height: 520, style: { position: 'absolute', right: -130, top: 60 } } },
    h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }, [
      { type: 'img', props: { src: star('#c4532d'), width: 34, height: 34 } },
      'Mamoun Tantaoui El Araki',
    ]),
    h('div', { display: 'flex', fontSize: size, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.95, maxWidth: 900 }, title),
    h('div', { display: 'flex', fontSize: 26, fontWeight: 600, color: '#a39a90', letterSpacing: '0.01em' }, kicker),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
