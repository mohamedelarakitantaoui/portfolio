// AneuXplain card on the home page at 1440 and 390: which file the browser picked, whether it plays,
// and two pictures per width (poster before play, and the loop ~5 s in). Output: qa/out/v4/aneu-card/
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v4/aneu-card';
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '.menu-pill { display: none !important; }' });
  const card = page.locator('#work .pcard').first();
  await card.evaluate((el) => el.classList.add('is-in'));
  // Poster: pause the loop before it is scrolled into view
  await page.evaluate(() => document.querySelectorAll('video[data-loop]').forEach((v) => { v.dataset.held = '1'; }));
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await card.screenshot({ path: path.join(OUT, `aneuxplain-card_${w}_poster.png`) });
  // Playing: release and let it run to the heatmap part
  const info = await page.evaluate(async () => {
    const v = document.querySelector('#work .pcard video[data-loop]');
    delete v.dataset.held;
    await v.play().catch(() => {});
    await new Promise((r) => setTimeout(r, 5500));
    return { src: v.currentSrc.split('/').pop(), playing: !v.paused, t: +v.currentTime.toFixed(1), size: `${v.videoWidth}x${v.videoHeight}`, poster: v.poster.split('/').pop() };
  });
  await card.screenshot({ path: path.join(OUT, `aneuxplain-card_${w}_playing.png`) });
  console.log(w, JSON.stringify(info));
  await ctx.close();
}
await browser.close();
