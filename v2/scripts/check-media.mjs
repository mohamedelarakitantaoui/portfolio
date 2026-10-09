// Media budgets and attributes on the built site (dist/). Run after `npm run build`.
//   fail: any image a page loads > 500 KB, any video > 6 MB, an <img> without width, height or alt, a <video> without poster,
//         muted or playsinline, autoplay without muted
//   warn: the hero portrait > 200 KB, any other download > 10 MB
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(DIST)) { console.error('check-media: no dist/, run npm run build first'); process.exit(1); }
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const rel = (f) => path.relative(DIST, f).split(path.sep).join('/');
const KB = 1024, MB = 1024 * 1024;
const fails = [], warns = [];

// What pages can actually load: every src, srcset, poster, href and CSS url() in the built HTML.
const referenced = new Set();
for (const f of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:src|poster|href|content)="([^"]+)"/g)) referenced.add(m[1]);
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) m[1].split(',').forEach((c) => referenced.add(c.trim().split(/\s+/)[0]));
  for (const m of html.matchAll(/url\(([^)]+)\)/g)) referenced.add(m[1].replace(/["']/g, ''));
}
const isReferenced = (name) => [...referenced].some((u) => decodeURI(u.split(/[?#]/)[0]).replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '') === name);

for (const f of walk(DIST)) {
  const size = fs.statSync(f).size;
  const name = rel(f);
  if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f)) {
    if (/^og\//.test(name)) continue; // Open Graph cards are fetched by social sites, not by visitors
    if (!isReferenced(name)) { if (size > 500 * KB) warns.push(`${name}: ${(size / KB).toFixed(0)} KB, not used by any page (source copy emitted by the build)`); continue; }
    if (size > 500 * KB) fails.push(`${name}: image ${(size / KB).toFixed(0)} KB > 500 KB`);
    else if (/portrait-2026-10/.test(name) && size > 200 * KB) warns.push(`${name}: hero image ${(size / KB).toFixed(0)} KB > 200 KB`);
  } else if (/\.(mp4|webm|mov)$/i.test(f)) {
    if (size > 6 * MB) fails.push(`${name}: video ${(size / MB).toFixed(1)} MB > 6 MB`);
  } else if (!/\.(html|js|css|xml|json|txt|woff2?)$/i.test(f) && size > 10 * MB) {
    warns.push(`${name}: download ${(size / MB).toFixed(0)} MB > 10 MB`);
  }
}

const attr = (tag, a) => new RegExp(`\\s${a}(\\s*=|[\\s>/])`, 'i').test(tag);
for (const f of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8').replace(/<script\b[\s\S]*?<\/script>/gi, '');
  const page = rel(f);
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const missing = ['width', 'height', 'alt'].filter((a) => !attr(tag, a));
    if (missing.length) fails.push(`${page}: <img> without ${missing.join(', ')}: ${tag.slice(0, 90)}…`);
  }
  for (const tag of html.match(/<video\b[^>]*>/gi) ?? []) {
    const missing = ['poster', 'muted', 'playsinline'].filter((a) => !attr(tag, a));
    if (missing.length) fails.push(`${page}: <video> without ${missing.join(', ')}: ${tag.slice(0, 90)}…`);
    if (attr(tag, 'autoplay') && !attr(tag, 'muted')) fails.push(`${page}: <video autoplay> without muted`);
  }
}

warns.forEach((w) => console.warn(`check-media: warn ${w}`));
if (fails.length) {
  console.error(`check-media: ${fails.length} problem(s)\n  ${[...new Set(fails)].join('\n  ')}`);
  process.exit(1);
}
console.log(`check-media: ok${warns.length ? ` (${warns.length} warning(s))` : ''}`);
