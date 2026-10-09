// SEO basics on the built site: sitemap and robots.txt exist and point at each other; every page has <html lang>,
// a title (<= 60 chars), a meta description (<= 155), a canonical URL, and hreflang en + fr + x-default.
// noindex pages (404, form "sent") are skipped for canonical/hreflang/sitemap. Exit 1 on any problem.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const problems = [];
const read = (f) => (fs.existsSync(path.join(DIST, f)) ? fs.readFileSync(path.join(DIST, f), 'utf8') : null);

const robots = read('robots.txt');
if (!robots) problems.push('robots.txt missing');
else if (!/^Sitemap:\s*https?:\/\/\S+sitemap-index\.xml/m.test(robots)) problems.push('robots.txt has no Sitemap: line');
const index = read('sitemap-index.xml');
if (!index) problems.push('sitemap-index.xml missing');
const sitemapUrls = new Set();
for (const f of fs.readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
  for (const m of read(f).matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(new URL(m[1]).pathname.replace(/\/$/, '') || '/');
}

const pages = walk(DIST).filter((f) => f.endsWith('.html') && !/[\\/]og[\\/]/.test(f));
for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const page = '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  const route = page.replace(/\/$/, '') || '/';
  const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
  if (!lang) problems.push(`${route}: <html> has no lang`);
  else if (lang !== (route === '/fr' || route.startsWith('/fr/') ? 'fr' : 'en') && route !== '/404') problems.push(`${route}: lang="${lang}" does not match the URL`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title) problems.push(`${route}: no <title>`);
  else if (title.length > 60) problems.push(`${route}: title ${title.length} chars > 60`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!desc) problems.push(`${route}: no meta description`);
  else if (desc.length > 155) problems.push(`${route}: description ${desc.length} chars > 155`);
  if (/<meta name="robots" content="noindex"/.test(html)) continue;
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) problems.push(`${route}: no canonical`);
  for (const h of ['en', 'fr', 'x-default']) if (!new RegExp(`<link rel="alternate" hreflang="${h}" href="https?://[^"]+"`).test(html)) problems.push(`${route}: no hreflang="${h}"`);
  if (!sitemapUrls.has(route)) problems.push(`${route}: not in the sitemap`);
}

if (problems.length) {
  console.error(`check-seo: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-seo: ok (${pages.length} pages, ${sitemapUrls.size} sitemap URLs, robots + hreflang + canonical)`);
