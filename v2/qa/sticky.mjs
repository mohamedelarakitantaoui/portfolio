// Sticky "Selected work" heading with motion ON: frames during the line-mask reveal, then while stuck.
import { chromium } from 'playwright';
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const b = await chromium.launch();
for (const [w, h] of [[1440, 900], [1024, 768]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' });
  await ctx.addInitScript(() => sessionStorage.setItem('seen', '1'));
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // idle → motion.ts loaded, fonts ready
  const y = await page.evaluate(() => document.querySelector('#work').getBoundingClientRect().top + scrollY);
  await page.mouse.wheel(0, 0);
  await page.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y - 80, { immediate: true }) : scrollTo(0, y - 80)), y);
  const clip = async () => {
    const r = await page.evaluate(() => { const e = document.querySelector('#work-h2').getBoundingClientRect(); return { x: e.x - 20, y: e.y - 30, width: e.width + 40, height: e.height + 60 }; });
    return r;
  };
  for (const t of [60, 200, 400, 900]) {
    await page.waitForTimeout(t === 60 ? 60 : t - [60, 200, 400, 900][[60, 200, 400, 900].indexOf(t) - 1]);
    await page.screenshot({ path: `qa/out/v3/sticky_${w}_reveal_${t}ms.png`, clip: await clip() });
  }
  for (const d of [600, 1400]) {
    await page.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), y + d);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `qa/out/v3/sticky_${w}_scrolled_${d}.png`, clip: await clip() });
  }
  await ctx.close();
}
await b.close();
console.log('sticky frames written');
