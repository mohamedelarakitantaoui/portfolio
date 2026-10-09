// Every page at 1440 and 390 (EN + FR): one h1, no horizontal scroll, axe serious + critical, first-screen shot.
// Usage: node qa/pages.mjs   (against `astro preview` on QA_BASE, default http://127.0.0.1:4321)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v4/pages';
fs.mkdirSync(OUT, { recursive: true });
const pages = ['/', '/work', '/work/aneuxplain', '/work/dce-scraper', '/work/pitchpoint', '/work/preparia', '/about', '/services', '/cv', '/contact', '/creative', '/privacy', '/404'];
const problems = [];
const browser = await chromium.launch();
for (const lang of ['', '/fr']) {
  for (const p of pages) {
    if (lang && p === '/404') continue;
    const url = (lang + (p === '/' ? '' : p)) || '/';
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' });
      const page = await ctx.newPage();
      const res = await page.goto(BASE + url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const name = `${lang ? 'fr' : 'en'}${p === '/' ? '_home' : p.replace(/\//g, '_')}_${w}`;
      if (!res || (res.status() >= 400 && p !== '/404')) problems.push(`${name}: HTTP ${res?.status()}`);
      await page.screenshot({ path: path.join(OUT, `${name}.png`) });
      const r = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        sw: document.documentElement.scrollWidth,
        iw: document.documentElement.clientWidth,
        imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
      }));
      if (r.h1 !== 1) problems.push(`${name}: ${r.h1} h1`);
      if (r.sw > r.iw) problems.push(`${name}: horizontal scroll ${r.sw} > ${r.iw}`);
      if (r.imgsNoAlt) problems.push(`${name}: ${r.imgsNoAlt} img without alt`);
      const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      for (const v of ax.violations.filter((v) => ['serious', 'critical'].includes(v.impact))) {
        problems.push(`${name}: axe ${v.impact} ${v.id} × ${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
      }
      await ctx.close();
    }
  }
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'all pages: 1 h1, no horizontal scroll, alt on every img, axe 0 serious/critical');
