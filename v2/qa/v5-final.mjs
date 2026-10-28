// v5 final review shots: each page at 1920×1080 and 390×844, a fresh browser context per shot (no cache), first
// screen + full page (scrolled through first so reveals have run). Also: one h1, no horizontal scroll, axe
// serious + critical. Usage: node qa/v5-final.mjs <out-name> /path [/path …]   (QA_BASE, default :4330)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4330';
const [name = 'shots', ...pages] = process.argv.slice(2);
const OUT = path.join('qa/out/v5-final', name);
fs.mkdirSync(OUT, { recursive: true });
const sizes = [[1920, 1080], [390, 844]];
const problems = [];
const browser = await chromium.launch();
for (const p of pages) {
  for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const id = `${p.replace(/^\/$/, 'home').replace(/^\//, '').replace(/\//g, '_') || 'home'}_${w}`;
    if (!res || (res.status() >= 400 && !p.includes('404'))) problems.push(`${id}: HTTP ${res?.status()}`);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `${id}_screen.png`) });
    // Scroll through so every [data-reveal] has run, then back to the top for the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.6)) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(2200);
    await page.screenshot({ path: path.join(OUT, `${id}_full.png`), fullPage: true });
    const r = await page.evaluate(() => ({ h1: document.querySelectorAll('h1').length, sw: document.documentElement.scrollWidth, iw: document.documentElement.clientWidth }));
    if (r.h1 !== 1) problems.push(`${id}: ${r.h1} h1`);
    if (r.sw > r.iw) problems.push(`${id}: horizontal scroll ${r.sw} > ${r.iw}`);
    const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    for (const v of ax.violations.filter((v) => ['serious', 'critical'].includes(v.impact))) {
      problems.push(`${id}: axe ${v.impact} ${v.id} × ${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`shots in ${OUT}`);
console.log(problems.length ? problems.join('\n') : 'ok: 1 h1, no horizontal scroll, axe 0 serious/critical');
