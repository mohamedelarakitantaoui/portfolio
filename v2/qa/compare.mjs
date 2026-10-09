// Side-by-side at 1440: my home vs the reference home. Pictures only: nothing from the reference is saved except
// screenshots, which stay in qa/out (git-ignored). The page is walked with the mouse wheel, one screen at a time,
// so smooth-scroll and scroll-triggered sections render as a visitor sees them. Output: qa/out/v4/compare/*.png
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const OUT = 'qa/out/v4/compare';
fs.mkdirSync(OUT, { recursive: true });
const W = 1440, H = 900, SCREENS = Number(process.env.SCREENS ?? 8);
const sites = { mine: process.env.QA_BASE ?? 'http://127.0.0.1:4321/', ref: 'https://www.abdelilahnossair.com/' };
const browser = await chromium.launch();
const strips = {};
for (const [k, url] of Object.entries(sites)) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(k === 'ref' ? 6000 : 800);
  await page.mouse.move(W / 2, H / 2);
  const shots = [];
  for (let i = 0; i < SCREENS; i++) {
    const f = path.join(OUT, `${k}_${i}.png`);
    await page.screenshot({ path: f });
    shots.push(f);
    await page.mouse.wheel(0, H);
    await page.waitForTimeout(1600);
  }
  strips[k] = shots;
  fs.copyFileSync(shots[0], path.join(OUT, `${k}_first.png`));
  await ctx.close();
}
await browser.close();

const gap = 40, scale = 0.5, w = W * scale, h = H * scale;
const layers = [];
for (const [col, k] of ['mine', 'ref'].entries()) {
  for (const [row, f] of strips[k].entries()) {
    layers.push({ input: await sharp(f).resize(w, h).png().toBuffer(), left: col * (w + gap), top: row * h });
  }
}
await sharp({ create: { width: w * 2 + gap, height: h * SCREENS, channels: 3, background: '#808080' } })
  .composite(layers).png().toFile(path.join(OUT, 'side_by_side_scroll.png'));
const [a, b] = await Promise.all(['mine_first.png', 'ref_first.png'].map((f) => sharp(path.join(OUT, f)).png().toBuffer()));
await sharp({ create: { width: W * 2 + gap, height: H, channels: 3, background: '#808080' } })
  .composite([{ input: a, left: 0, top: 0 }, { input: b, left: W + gap, top: 0 }]).png().toFile(path.join(OUT, 'side_by_side_first.png'));
console.log('written side_by_side_first.png, side_by_side_scroll.png');
