// Build-time Open Graph images: name, page title, one line, 1200x630, one per page per language. Jost (v5), champagne rule.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { plain } from '../../lib/rich';

const pages: Record<string, { en: string; fr: string }> = {
  home: { en: 'I build ML that explains itself, and the software that ships it.', fr: 'Je construis du ML qui s’explique, et le logiciel qui le met en production.' },
  work: { en: 'Projects with numbers on them.', fr: 'Des projets, avec leurs chiffres.' },
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

const fontDir = path.resolve('node_modules/@fontsource/jost/files');
let fonts: { name: string; data: Buffer; weight: 200 | 300; style: 'normal' }[] | null = null;
async function loadFonts() {
  if (fonts) return fonts;
  const f = (n: string) => fs.readFile(path.join(fontDir, n));
  fonts = [
    { name: 'Jost', data: await f('jost-latin-200-normal.woff'), weight: 200, style: 'normal' },
    { name: 'Jost', data: await f('jost-latin-ext-200-normal.woff'), weight: 200, style: 'normal' },
    { name: 'Jost', data: await f('jost-latin-300-normal.woff'), weight: 300, style: 'normal' },
    { name: 'Jost', data: await f('jost-latin-ext-300-normal.woff'), weight: 300, style: 'normal' },
  ];
  return fonts;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const size = title.length > 34 ? 76 : title.length > 18 ? 96 : 150;
  const tree = h('div', { width: 1200, height: 630, display: 'flex', background: '#070605', color: '#e9dfcc', fontFamily: 'Jost', padding: 72, flexDirection: 'column', justifyContent: 'space-between' }, [
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase' }, [
      h('div', { display: 'flex' }, 'Mamoun El Araki'),
      h('div', { display: 'flex', width: 96, height: 1, background: '#c8b07e' }),
    ]),
    h('div', { display: 'flex', fontSize: size, fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1, maxWidth: 1000, color: '#f2ebdd' }, title),
    h('div', { display: 'flex', fontSize: 26, fontWeight: 300, color: '#beb4a3', paddingTop: 24, borderTop: '1px solid rgba(233,223,204,0.16)' }, kicker),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
