// Axe (serious + critical) on a section while an effect has changed it: scroll the section to mid-screen with the
// mouse wheel, wait for the effect to settle, then analyse only that section.
// Usage: node qa/fx-axe.mjs <path> <sectionSelector> [w=1440]
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const [url, sel, w = '1440'] = process.argv.slice(2);
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const width = Number(w), height = 900;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference' });
const page = await ctx.newPage();
await page.goto(BASE + url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.documentElement.classList.contains('fx-on'));
await page.mouse.move(width / 2, height / 2);
for (let i = 0; i < 60; i++) {
  const top = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top, sel);
  if (Math.abs(top - height * 0.3) < 40) break;
  await page.mouse.wheel(0, Math.max(-600, Math.min(600, top - height * 0.3)));
  await page.waitForTimeout(250);
}
await page.waitForTimeout(2000);
await page.evaluate((s) => document.querySelectorAll(`${s} [data-reveal]`).forEach((el) => el.classList.add('is-in')), sel);
await page.waitForTimeout(1200);
const state = await page.evaluate((s) => ({ classes: document.querySelector(s).className }), sel);
const res = await new AxeBuilder({ page }).include(sel).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const bad = res.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
console.log(JSON.stringify(state), `axe serious/critical: ${bad.length}`, bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`));
await page.screenshot({ path: 'qa/out/v4/fx-axe.png' });
await browser.close();
