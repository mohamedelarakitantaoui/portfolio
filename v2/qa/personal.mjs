import fs from 'node:fs';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const base = process.env.QA_BASE ?? 'http://127.0.0.1:4335';
const out = process.env.QA_OUT ?? 'qa/out/personal';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const route of ['/', '/fr', '/work', '/fr/work']) {
  for (const width of [1440, 1024, 768, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = `${route.replaceAll('/', '_') || 'home'}-${width}`;
    await page.screenshot({ path: `${out}/${name}-hero.png` });
    await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    if (route === '/' || route === '/fr') {
      await page.locator('#work').screenshot({ path: `${out}/${name}-work.png` });
      await page.locator('[data-terminal-disclosure] summary').click();
      await page.locator('.term__input').fill('AneuXplain');
      await page.locator('.term__input').press('Enter');
      await page.waitForFunction(() => document.querySelectorAll('.term__answer').length > 0);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const axe = await new AxeBuilder({ page }).analyze();
    results.push({ route, width, overflow, violations: axe.violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => v.id) });
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(`${out}/report.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
if (results.some(r => r.overflow || r.violations.length)) process.exitCode = 1;
