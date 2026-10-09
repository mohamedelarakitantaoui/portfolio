// Build-time Open Graph images: name, page title, one line, 1200x630, one per page per language. DM Sans only.
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

const fontDir = path.resolve('node_modules/@fontsource/dm-sans/files');
let fonts: { name: string; data: Buffer; weight: 500 | 700; style: 'normal' }[] | null = null;
async function loadFonts() {
  if (fonts) return fonts;
  const f = (n: string) => fs.readFile(path.join(fontDir, n));
  fonts = [
    { name: 'DM Sans', data: await f('dm-sans-latin-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'DM Sans', data: await f('dm-sans-latin-ext-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'DM Sans', data: await f('dm-sans-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'DM Sans', data: await f('dm-sans-latin-ext-500-normal.woff'), weight: 500, style: 'normal' },
  ];
  return fonts;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const size = title.length > 34 ? 76 : title.length > 18 ? 96 : 150;
  const tree = h('div', { width: 1200, height: 630, display: 'flex', background: '#111111', color: '#ffffff', fontFamily: 'DM Sans', padding: 72, flexDirection: 'column', justifyContent: 'space-between' }, [
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }, [
      h('div', { display: 'flex' }, 'Mamoun El Araki'),
      h('div', { display: 'flex', width: 64, height: 4, background: '#f2a900' }),
    ]),
    h('div', { display: 'flex', fontSize: size, fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.98, maxWidth: 980 }, title),
    h('div', { display: 'flex', fontSize: 26, fontWeight: 500, color: '#b3b3b3', letterSpacing: '-0.01em', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)' }, kicker),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
