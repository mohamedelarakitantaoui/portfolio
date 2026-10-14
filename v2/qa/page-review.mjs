import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const phase = process.argv[2] ?? 'after';
const base = process.env.QA_BASE ?? 'http://127.0.0.1:4335';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const routes = walk('dist').filter(f => /(?:index|404)\.html$/.test(f)).map(f => '/' + path.relative('dist', f).split(path.sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, ''));
const out = `qa/out/page-review-${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const route of routes) {
  if (phase === 'before' && route.startsWith('/fr')) continue;
  if (process.env.QA_ROUTES && !process.env.QA_ROUTES.split(',').includes(route)) continue;
  for (const width of phase === 'before' ? [1440] : [1440, 1024, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = `${route.replaceAll('/', '_')}-${width}`;
    await page.screenshot({ path: `${out}/${name}-hero.png` });
    await page.evaluate(async () => {
      await Promise.all([...document.images].map(async img => { img.loading = 'eager'; await img.decode().catch(() => {}); }));
    });
    await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    const state = await page.evaluate(() => ({
      h1: [...document.querySelectorAll('h1')].map(e => e.textContent),
      overflow: document.documentElement.scrollWidth > innerWidth,
      headings: [...document.querySelectorAll('main h2')].map(e => e.textContent),
      brokenImages: [...document.images].filter(img => !img.naturalWidth).map(img => img.currentSrc),
      brokenAnchors: [...document.querySelectorAll('main a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
    }));
    const accessibility = phase !== 'before' && width === 1440 ? (await new AxeBuilder({ page }).analyze()).violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) : [];
    const failed = state.overflow || state.h1.length !== 1 || state.brokenImages.length || state.brokenAnchors.length || errors.length || accessibility.length;
    report.push({ route, width, ...state, errors, accessibility, failed: Boolean(failed) });
    console.log(`${failed ? 'FAIL' : 'PASS'} ${route} ${width}`);
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2));
if (report.some(r => r.failed)) process.exitCode = 1;
