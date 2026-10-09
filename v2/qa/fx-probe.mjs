// Probe one effect in a real browser: open a page with motion on, wait for the effects loader, scroll (mouse wheel,
// so Lenis and ScrollTrigger see it) until `selector` is at `at` (0 = top of screen, 1 = bottom), optionally hover,
// then print the result of `expr` evaluated in the page.
// Usage: node qa/fx-probe.mjs <path> <selector> <at> "<expr>" [w=1440] [hoverSelector]
import { chromium } from 'playwright';

const [url, selector, at, expr, w = '1440', hover] = process.argv.slice(2);
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const width = Number(w), height = width < 600 ? 844 : 900;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'no-preference', hasTouch: width < 600 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(BASE + url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.documentElement.classList.contains('fx-on'), null, { timeout: 15000 });
await page.mouse.move(width / 2, height / 2);
for (let i = 0; i < 60; i++) {
  const top = await page.evaluate((s) => document.querySelector(s)?.getBoundingClientRect().top ?? 0, selector);
  const goal = Number(at) * height;
  if (Math.abs(top - goal) < 40) break;
  const dy = Math.max(-600, Math.min(600, top - goal));
  if (width < 600) await page.evaluate((d) => window.scrollBy(0, d), dy); else await page.mouse.wheel(0, dy);
  await page.waitForTimeout(250);
}
await page.waitForTimeout(1500);
if (hover) {
  const box = await page.locator(hover).first().boundingBox();
  if (box) { await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3, { steps: 8 }); await page.waitForTimeout(900); }
}
console.log(JSON.stringify(await page.evaluate(expr)));
if (errors.length) console.log('page errors:', errors);
await browser.close();
