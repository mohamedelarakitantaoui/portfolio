import fs from 'node:fs';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
const out = 'qa/out/header-review';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
for (const width of [1920, 1440, 1024, 390, 320]) {
  for (const lang of ['en', 'fr']) {
    const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 1080 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4352/${lang === 'fr' ? 'fr/' : ''}?effects=off`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => {
      const rect = (s) => { const r = document.querySelector(s).getBoundingClientRect(); return { left: r.left, right: r.right }; };
      const logo = rect('#site-header .logo'), tools = rect('.site-header__tools'), nav = rect('.site-nav');
      return { overflow: document.documentElement.scrollWidth > innerWidth, overlap: innerWidth >= 1024 ? logo.right > nav.left || nav.right > tools.left : logo.right > tools.left, navOffset: innerWidth >= 1024 ? Math.abs((nav.left + nav.right) / 2 - innerWidth / 2) : null };
    });
    const axe = await new AxeBuilder({ page }).include('#site-header').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    await page.screenshot({ path: `${out}/${lang}-${width}.png` });
    results.push({ lang, width, ...layout, axe: axe.violations.map(v => v.id) });
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
if (results.some(r => r.overflow || r.overlap || r.axe.length || r.navOffset > 1)) process.exitCode = 1;
