// Links on the built site. Internal links (href, src, srcset, poster) must resolve to a file in dist/, and #anchors
// must exist on their page: broken ones FAIL. External links are fetched (HEAD, then GET) with a short timeout:
// broken ones only WARN (sites go down; that shouldn't block a deploy). Skip the network with --no-external.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const external = !process.argv.includes('--no-external');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const routeOf = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');

const ids = new Map(); // route -> Set of ids
const links = []; // { from, url }
for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const from = routeOf(f);
  ids.set(from.replace(/\/$/, '') || '/', new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  for (const m of body.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)) links.push({ from, url: m[1] });
  for (const m of body.matchAll(/\ssrcset="([^"]+)"/g)) m[1].split(',').forEach((c) => links.push({ from, url: c.trim().split(/\s+/)[0] }));
}

const fails = [], warns = [], outside = new Map();
const fileFor = (p) => {
  const clean = decodeURIComponent(p.replace(/^\//, ''));
  return [clean, path.join(clean, 'index.html'), `${clean}.html`].map((c) => path.join(DIST, c)).find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};
for (const { from, url } of links) {
  if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue;
  if (/^https?:\/\//.test(url)) {
    const u = new URL(url);
    if (u.hostname === 'mamounelaraki.com' || u.hostname === 'www.mamounelaraki.com') continue; // canonical/OG/hreflang URLs: the domain may not be live yet; check-seo covers them
    outside.set(url, from);
    continue;
  }
  const [p, hash] = url.split('#');
  const base = new URL(p || from, `http://x${from}`).pathname;
  if (p && !fileFor(base)) { fails.push(`${from} → ${url} (no such file)`); continue; }
  if (hash && !/\.(mp4|webm|pdf|png|jpe?g|webp|avif|svg)$/i.test(p)) { // media fragments (#t=27) seek, they are not ids
    const route = (p ? base : from).replace(/\/$/, '') || '/';
    if (!ids.get(route)?.has(hash)) fails.push(`${from} → ${url} (no element id="${hash}")`);
  }
}

if (external && outside.size) {
  const check = async (url) => {
    for (const method of ['HEAD', 'GET']) {
      try {
        const r = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(8000), headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
        if (r.status < 400 || [401, 403, 429, 999].includes(r.status)) return null; // reachable (LinkedIn answers 999 to bots)
        if (method === 'GET') return `HTTP ${r.status}`;
      } catch (e) { if (method === 'GET') return e.name === 'TimeoutError' ? 'timeout' : e.message; }
    }
    return null;
  };
  const urls = [...outside.keys()];
  for (let i = 0; i < urls.length; i += 8) {
    const res = await Promise.all(urls.slice(i, i + 8).map(async (u) => [u, await check(u)]));
    for (const [u, err] of res) if (err) warns.push(`${outside.get(u)} → ${u} (${err})`);
  }
}

warns.forEach((w) => console.warn(`check-links: warn external ${w}`));
if (fails.length) {
  console.error(`check-links: ${fails.length} broken internal link(s)\n  ${[...new Set(fails)].join('\n  ')}`);
  process.exit(1);
}
console.log(`check-links: ok (${links.length} links on ${pages.length} pages${external ? `, ${outside.size} external checked, ${warns.length} warning(s)` : ', external skipped'})`);
