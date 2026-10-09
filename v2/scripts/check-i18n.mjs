// EN/FR completeness:
//   1. every src/content/projects/en/<key>.mdx has fr/<key>.mdx (and back), with the same key, order and tier
//   2. every UI string key exists in both languages and is not empty (src/i18n/ui.ts)
//   3. every { en, fr } pair in src/data/site.ts and src/data/knowledge.ts has both sides filled
// Node strips the TypeScript types itself (Node >= 22.18 / 23.6). Exit 1 on any problem.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

// 1. Project twins
const dir = (l) => path.join(ROOT, 'src/content/projects', l);
const list = (l) => fs.readdirSync(dir(l)).filter((f) => f.endsWith('.mdx'));
const fm = (l, f) => {
  const text = fs.readFileSync(path.join(dir(l), f), 'utf8').replace(/\r\n/g, '\n');
  const head = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const get = (k) => head.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^["']|["']$/g, '');
  return { key: get('key'), lang: get('lang'), order: get('order'), tier: get('tier') ?? 'more' };
};
for (const [a, b] of [['en', 'fr'], ['fr', 'en']]) {
  for (const f of list(a)) if (!fs.existsSync(path.join(dir(b), f))) problems.push(`projects: ${a}/${f} has no ${b}/${f}`);
}
for (const f of list('en').filter((f) => fs.existsSync(path.join(dir('fr'), f)))) {
  const en = fm('en', f), fr = fm('fr', f);
  if (en.lang !== 'en' || fr.lang !== 'fr') problems.push(`projects: ${f}: lang must be en/fr to match its folder (got ${en.lang}/${fr.lang})`);
  for (const k of ['key', 'order', 'tier']) if (en[k] !== fr[k]) problems.push(`projects: ${f}: ${k} differs (en "${en[k]}", fr "${fr[k]}")`);
  if (en.key !== f.replace(/\.mdx$/, '')) problems.push(`projects: ${f}: key "${en.key}" must equal the file name`);
}

// 2. UI strings
const ui = await import(pathToFileURL(path.join(ROOT, 'src/i18n/ui.ts')).href);
const { en: uiEn, fr: uiFr } = ui.strings;
for (const k of new Set([...Object.keys(uiEn), ...Object.keys(uiFr)])) {
  if (!(k in uiEn)) problems.push(`ui.ts: "${k}" missing in en`);
  else if (!String(uiEn[k]).trim()) problems.push(`ui.ts: "${k}" empty in en`);
  if (!(k in uiFr)) problems.push(`ui.ts: "${k}" missing in fr`);
  else if (!String(uiFr[k]).trim()) problems.push(`ui.ts: "${k}" empty in fr`);
}

// 3. { en, fr } pairs in the data files
const filled = (v) => (Array.isArray(v) ? v.length > 0 && v.every(filled) : typeof v === 'string' ? v.trim() !== '' : v != null);
function walk(v, where, seen = new Set()) {
  if (!v || typeof v !== 'object' || seen.has(v)) return;
  seen.add(v);
  const keys = Object.keys(v);
  if (!Array.isArray(v) && (keys.includes('en') || keys.includes('fr')) && keys.every((k) => k === 'en' || k === 'fr')) {
    if (!filled(v.en)) problems.push(`${where}: en missing or empty`);
    if (!filled(v.fr)) problems.push(`${where}: fr missing or empty`);
    if (Array.isArray(v.en) && Array.isArray(v.fr) && v.en.length !== v.fr.length) problems.push(`${where}: en has ${v.en.length} items, fr has ${v.fr.length}`);
    return;
  }
  for (const k of keys) walk(v[k], `${where}.${k}`, seen);
}
for (const file of ['src/data/site.ts', 'src/data/knowledge.ts']) {
  const mod = await import(pathToFileURL(path.join(ROOT, file)).href);
  for (const [name, value] of Object.entries(mod)) walk(value, `${file} ${name}`);
}
const knowledge = await import(pathToFileURL(path.join(ROOT, 'src/data/knowledge.ts')).href);
if (typeof knowledge.corpus === 'function' && knowledge.corpus('en').length !== knowledge.corpus('fr').length) {
  problems.push('knowledge.ts: the ask-mamoun corpus has a different number of notes in en and fr');
}

if (problems.length) {
  console.error(`check-i18n: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-i18n: ok (${list('en').length} project twins, ${Object.keys(uiEn).length} UI keys, data pairs filled)`);
