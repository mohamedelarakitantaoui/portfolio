// Screen recording of the home page at 1440 with the effects on: wheel down slowly, hover a project card and the
// capability rows on the way, then the footer. Output: qa/out/v4/recording/home-1440.webm (+ 390 screenshots).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v4/recording';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

// 1440 recording
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference', recordVideo: { dir: OUT, size: { width: 1440, height: 900 } } });
const page = await ctx.newPage();
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.documentElement.classList.contains('fx-on'));
await page.mouse.move(720, 450);
await page.waitForTimeout(1200);
const wheelTo = async (sel, at = 0.35, step = 120) => {
  for (let i = 0; i < 200; i++) {
    const top = await page.evaluate((s) => document.querySelector(s)?.getBoundingClientRect().top ?? 0, sel);
    if (top - 900 * at < 20) break;
    await page.mouse.wheel(0, Math.min(step, top - 900 * at));
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(900);
};
const hover = async (sel, ms = 1600) => {
  const b = await page.locator(sel).first().boundingBox();
  if (!b) return;
  await page.mouse.move(b.x + b.width * 0.25, b.y + b.height * 0.4, { steps: 20 });
  await page.mouse.move(b.x + b.width * 0.7, b.y + b.height * 0.6, { steps: 40 });
  await page.waitForTimeout(ms);
};
await wheelTo('#about-h', 0.3, 90);          // 1 hero depth, then 4 rolling word
await page.waitForTimeout(4500);
await wheelTo('.proof', 0.5, 160);           // 3 proof loop, quick wheel to show speed-up + skew
await page.mouse.wheel(0, 500); await page.waitForTimeout(80); await page.mouse.wheel(0, 500);
await page.waitForTimeout(1600);
await wheelTo('#work .pcard__media', 0.15, 80); // 2 AneuXplain video grows
await hover('#work .pcard:nth-of-type(2) .pcard__media'); // 5 card light + tilt
await wheelTo('#experience', 0.1, 120);      // 6 paper
await page.waitForTimeout(1500);
await wheelTo('.caps__rows', 0.2, 120);      // 7 previews
for (const n of ['01', '02', '03']) await hover(`.caps__row[data-preview="${n}"]`, 1300);
await page.mouse.move(1400, 450, { steps: 10 });
await wheelTo('.site-footer__giant', 0.7, 140); // 8 footer rise
await page.waitForTimeout(2500);
const video = page.video();
await ctx.close();
fs.renameSync(await video.path(), path.join(OUT, 'home-1440.webm'));

// 390 screenshots (phone: touch, so the mouse-only effects stay off)
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference', hasTouch: true, isMobile: true });
const p = await m.newPage();
await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
let i = 0;
for (const sel of [null, '.about__roll', '.proof', '#work .pcard__media', '#experience .exp__rows', '.caps__rows', '.site-footer__giant']) {
  if (sel) { await p.evaluate((s) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 200); }, sel); await p.waitForTimeout(1800); }
  await p.screenshot({ path: path.join(OUT, `home-390-${String(++i).padStart(2, '0')}${sel ? '-' + sel.replace(/[^a-z]+/gi, '-').replace(/^-|-$/g, '') : '-hero'}.png`) });
}
await m.close();
await browser.close();
console.log(fs.readdirSync(OUT).join('\n'));
