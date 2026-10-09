// v3 QA against `astro preview` (default http://127.0.0.1:4321). Writes everything to qa/out/v3/.
//   1. Screenshots: 1440 / 1024 / 768 / 390 × EN + FR × home, /work, a case study, /cv (viewport + full page)
//   2. First-glance test at 1440 and 390: name, role, a proof number and the primary button above the fold
//   3. Headings-only export (h1–h3, in order) of the home page, EN + FR
//   4. Measure: characters per line of every paragraph (≤ 75 desktop, ≤ 50 at 390)
//   5. No horizontal scroll; axe-core (serious + critical) on every QA'd page
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v3';
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const widths = [
  { w: 1440, h: 900 },
  { w: 1024, h: 768 },
  { w: 768, h: 1024 },
  { w: 390, h: 844 },
];
const pages = ['/', '/work', '/work/aneuxplain', '/cv'];
const langs = ['', '/fr'];
const report = { shots: [], firstGlance: [], measure: [], hscroll: [], axe: [], h1Lines: [] };

const browser = await chromium.launch();

async function open(w, h, url, { motion = false, theme = 'dark' } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: motion ? 'no-preference' : 'reduce' });
  await ctx.addInitScript((th) => { try { sessionStorage.setItem('seen', '1'); localStorage.setItem('theme', th); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto(BASE + url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { ctx, page };
}
const slug = (u) => (u === '/' ? 'home' : u.replace(/^\//, '').replace(/\//g, '_'));

// 1 + 4 + 5. Screenshots, measure, horizontal scroll
for (const lang of langs) {
  for (const p of pages) {
    const url = (lang + (p === '/' ? '' : p)) || '/';
    for (const { w, h } of widths) {
      const { ctx, page } = await open(w, h, url);
      const name = `${lang ? 'fr' : 'en'}_${slug(p)}_${w}`;
      await page.screenshot({ path: path.join(OUT, 'shots', `${name}_hero.png`) });
      await page.screenshot({ path: path.join(OUT, 'shots', `${name}_full.png`), fullPage: true });
      report.shots.push(name);
      const hs = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
      if (hs.sw > hs.iw) report.hscroll.push(`${name}: scrollWidth ${hs.sw} > ${hs.iw}`);
      const limit = w <= 480 ? 50 : 75;
      const bad = await page.evaluate((limit) => {
        const out = [];
        for (const el of document.querySelectorAll('main p')) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[aria-hidden="true"], .sr-only, .term, .hero__word, .intro__word')) continue;
          const txt = el.textContent.trim();
          if (txt.length < 40) continue;
          // Count characters on each rendered line: one Range per character, grouped by line top.
          const lines = new Map();
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            for (let i = 0; i < node.length; i++) {
              const r = document.createRange();
              r.setStart(node, i); r.setEnd(node, i + 1);
              const rect = r.getClientRects()[0];
              if (!rect || rect.width === 0) continue;
              const key = Math.round(rect.top);
              lines.set(key, (lines.get(key) ?? 0) + 1);
            }
          }
          const max = Math.max(0, ...lines.values());
          if (max > limit) out.push(`${max} chars: "${txt.slice(0, 60)}…"`);
        }
        return out;
      }, limit);
      for (const b of bad) report.measure.push(`${name}: ${b}`);
      if (p === '/' && w === 1440) {
        report.h1Lines.push(`${name}: ` + await page.evaluate(() => {
          const h = document.querySelector('.hero__h1');
          const lh = parseFloat(getComputedStyle(h).lineHeight);
          return `${Math.round(h.getBoundingClientRect().height / lh)} lines at ${getComputedStyle(h).fontSize}`;
        }));
      }
      await ctx.close();
    }
  }
}

// 2. First-glance test
for (const lang of langs) {
  for (const { w, h } of [widths[0], widths[3]]) {
    const { ctx, page } = await open(w, h, lang || '/');
    const res = await page.evaluate((vh) => {
      const check = (label, el) => {
        if (!el) return [label, 'missing'];
        const r = el.getBoundingClientRect();
        const ok = r.top >= 0 && r.bottom <= vh && r.width > 0;
        return [label, ok ? `ok (bottom ${Math.round(r.bottom)} of ${vh})` : `NOT visible (top ${Math.round(r.top)}, bottom ${Math.round(r.bottom)} of ${vh})`];
      };
      return [
        check('name', document.querySelector('.hero__name')),
        check('role', document.querySelector('.hero__role')),
        check('h1', document.querySelector('.hero__h1')),
        check('proof number', document.querySelector('.hero__stat dt')),
        check('primary button', document.querySelector('.hero .btn--primary')),
      ];
    }, h);
    report.firstGlance.push({ view: `${lang ? 'fr' : 'en'} ${w}x${h}`, res });
    await ctx.close();
  }
}

// 3. Headings-only export
let headings = '';
for (const lang of langs) {
  const { ctx, page } = await open(1440, 900, lang || '/');
  const hs = await page.evaluate(() => [...document.querySelectorAll('h1, h2, h3')]
    .filter((h) => !h.closest('dialog, footer, [hidden]') && getComputedStyle(h).display !== 'none' && !h.classList.contains('sr-only'))
    .map((h) => {
      const c = h.cloneNode(true);
      c.querySelectorAll('.sr-only, [aria-hidden="true"]').forEach((n) => n.remove());
      return `${h.tagName.toLowerCase()} · ${c.textContent.replace(/\s+/g, ' ').trim()}`;
    }));
  headings += `## ${lang ? 'FR /fr' : 'EN /'}\n` + hs.map((x) => (x.startsWith('h1') ? '' : x.startsWith('h2') ? '  ' : '    ') + x).join('\n') + '\n\n';
  await ctx.close();
}
fs.writeFileSync(path.join(OUT, 'headings.txt'), headings);

// 5b. axe on every main page, EN + FR
const axePages = ['/', '/work', '/work/aneuxplain', '/work/dce-scraper', '/work/pitchpoint', '/work/preparia', '/cv', '/about', '/services', '/contact', '/creative', '/privacy'];
for (const lang of langs) {
  for (const p of axePages) {
    const url = (lang + (p === '/' ? '' : p)) || '/';
    for (const theme of ['dark', 'light']) {
      const { ctx, page } = await open(1440, 900, url, { theme });
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      report.axe.push({ url, theme, serious: serious.length, ids: serious.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`) });
      await ctx.close();
    }
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log('h1 lines:', report.h1Lines.join(' · '));
console.log('first glance:'); for (const f of report.firstGlance) console.log(' ', f.view, f.res.map(([k, v]) => `${k}: ${v}`).join(' | '));
console.log('measure violations:', report.measure.length); report.measure.slice(0, 30).forEach((m) => console.log('  ', m));
console.log('horizontal scroll:', report.hscroll.length ? report.hscroll : 'none');
const axeBad = report.axe.filter((a) => a.serious);
console.log('axe serious/critical:', axeBad.length ? '' : `0 on ${report.axe.length} page/theme runs`); axeBad.forEach((a) => console.log('  ', a.url, a.theme, a.ids.join(' ; ')));
console.log('shots:', report.shots.length * 2, 'files in', path.join(OUT, 'shots'));
