// v4 QA against `astro preview` (default http://127.0.0.1:4321). Writes to qa/out/v4/.
//   Screenshots at 1440 and 390 (EN + FR, motion on): home, /work, AneuXplain case study, /cv (first screen + full page)
//   Checks on every shot: one h1, no horizontal scroll (and the offenders), axe serious + critical
//   Usage: node qa/v4.mjs [--quick]   (--quick = EN only)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v4';
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const quick = process.argv.includes('--quick');
const widths = [{ w: 1440, h: 900 }, { w: 390, h: 844 }];
const pages = ['/', '/work', '/work/aneuxplain', '/cv'];
const langs = quick ? [''] : ['', '/fr'];
const report = { shots: [], h1: [], hscroll: [], axe: [] };
const browser = await chromium.launch();
const slug = (u) => (u === '/' ? 'home' : u.replace(/^\//, '').replace(/\//g, '_'));

for (const lang of langs) {
  for (const p of pages) {
    const url = (lang + (p === '/' ? '' : p)) || '/';
    for (const { w, h } of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
      const page = await ctx.newPage();
      await page.goto(BASE + url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      const name = `${lang ? 'fr' : 'en'}_${slug(p)}_${w}`;
      await page.screenshot({ path: path.join(OUT, 'shots', `${name}_first.png`) });
      // A full-page capture never scrolls, so finish the scroll reveals first (a visitor triggers them by scrolling).
      await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in')));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(OUT, 'shots', `${name}_full.png`), fullPage: true });
      report.shots.push(name);
      const n = await page.evaluate(() => document.querySelectorAll('h1').length);
      if (n !== 1) report.h1.push(`${name}: ${n} h1`);
      const hs = await page.evaluate(() => {
        const iw = document.documentElement.clientWidth;
        const off = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > iw + 1 && getComputedStyle(el).position !== 'fixed')
          .slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
        return { sw: document.documentElement.scrollWidth, iw, off };
      });
      if (hs.sw > hs.iw) report.hscroll.push(`${name}: scrollWidth ${hs.sw} > ${hs.iw} (${hs.off.join(', ')})`);
      if (w === 1440 || w === 390) {
        const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        for (const v of res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')) {
          report.axe.push(`${name}: [${v.impact}] ${v.id} × ${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        }
      }
      await ctx.close();
    }
  }
}
await browser.close();
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(`shots: ${report.shots.length}`);
console.log(`h1 problems: ${report.h1.length}`, report.h1);
console.log(`horizontal scroll: ${report.hscroll.length}`, report.hscroll);
console.log(`axe serious/critical: ${report.axe.length}`);
report.axe.forEach((a) => console.log('  ' + a));
