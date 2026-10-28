// Sub-folder build check (GitHub Pages at /portfolio/). Run after `BASE_PATH=/portfolio npm run build`.
// Every root-relative URL in the built HTML, CSS and JS (href, src, poster, srcset, action, data-*, url(), JSON,
// script imports) must start with the base path and resolve to a file in dist/; so must absolute URLs on SITE_URL
// (canonical, hreflang, OG images). Catches a hand-written "/media/..." that skipped withBase().
// Usage: BASE_PATH=/portfolio SITE_URL=https://user.github.io node scripts/check-base.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const BASE = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const SITE = process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
if (!BASE) { console.log('check-base: BASE_PATH not set, nothing to check (root build).'); process.exit(0); }
if (!fs.existsSync(DIST)) { console.error('check-base: no dist/. Build first.'); process.exit(1); }

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(DIST).filter((f) => /\.(html|css|js|mjs|json|xml|txt|webmanifest)$/.test(f));
const rel = (f) => path.relative(DIST, f).split(path.sep).join('/');

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.slice(BASE.length).replace(/^\//, '').split(/[?#]/)[0]);
  return [clean, path.join(clean, 'index.html'), `${clean}.html`].map((c) => path.join(DIST, c)).some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

const fails = new Set();
let checked = 0;
const check = (file, url) => {
  if (!url) return;
  let p = url;
  if (/^https?:\/\//.test(url)) {
    const u = new URL(url);
    if (!SITE || u.host !== SITE.host) return; // other sites: check-links covers them
    p = u.pathname;
  } else if (!url.startsWith('/') || url.startsWith('//')) return; // relative, protocol-relative, mailto:, #hash
  checked++;
  if (p !== BASE && !p.startsWith(`${BASE}/`)) { fails.add(`${rel(file)} → ${url} (missing ${BASE})`); return; }
  if (!exists(p)) fails.add(`${rel(file)} → ${url} (no such file)`);
};

// Paths: quoted strings that look like site URLs. Kept narrow on purpose so code like '/' or regexes isn't flagged.
const PATHLIKE = /^\/(?!\/)[\w%@.~-]+(?:\/[\w%@.~,()-]*)*(?:[?#][^\s"'`<>]*)?$/;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  if (f.endsWith('.html')) {
    for (const m of text.matchAll(/\s(?:href|src|poster|action|content|data-[\w-]+)="([^"]+)"/g)) {
      const v = m[1].replace(/&amp;/g, '&');
      if (v.startsWith('/') || v.startsWith('http')) check(f, v);
    }
    for (const m of text.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)) m[1].split(',').forEach((c) => check(f, c.trim().split(/\s+/)[0]));
  }
  // url(...) in CSS (inline <style> or files)
  for (const m of text.matchAll(/url\(\s*['"]?(\/[^'")\s]+)['"]?\s*\)/g)) check(f, m[1]);
  // quoted path-like strings in JS / JSON / inline scripts (palette items, knowledge.json src, imports)
  if (/\.(js|mjs|json|html)$/.test(f)) {
    for (const m of text.matchAll(/["'`](\/[^"'`\s<>\\]{1,200})["'`]/g)) {
      const v = m[1];
      if (!PATHLIKE.test(v)) continue;
      if (!/\.\w{2,5}([?#].*)?$/.test(v) && !v.startsWith(BASE)) {
        // extensionless string: only a page route if it matches a built page without the base
        if (!exists(`${BASE}${v}`)) continue;
      }
      check(f, v);
    }
  }
  // sitemap / robots absolute URLs
  if (/\.(xml|txt)$/.test(f)) for (const m of text.matchAll(/https?:\/\/[^\s<"]+/g)) check(f, m[0]);
}

if (fails.size) {
  console.error(`check-base: ${fails.size} URL(s) outside ${BASE}/ or missing:\n  ${[...fails].slice(0, 60).join('\n  ')}`);
  process.exit(1);
}
console.log(`check-base: ${checked} internal URLs under ${BASE}/, all resolve.`);
