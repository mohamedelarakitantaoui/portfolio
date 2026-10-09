// Work section at 1440 and 390 (element screenshot), plus computed font sizes of descriptive text vs labels,
// and the bar panels' content fill (no dead space). Output: qa/out/v4/work-section/
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/v4/work-section';
fs.mkdirSync(OUT, { recursive: true });
const descriptive = ['.pcard__outcome', '.pcard__metric', '.pcard__progress', '.more__line', '.caps__text', '.exp__line', '.exp__edu-line', '.lab__items > li', '.lab__intro', '.door__text'];
const small = ['.meta', '.label', '.tag', '.more__year', '.caps__stack', '.hero__stat dd', '.bars__label'];
const browser = await chromium.launch();
for (const lang of ['', '/fr']) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${lang || '/'}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in')));
    await page.waitForTimeout(1000);
    const tag = `${lang ? 'fr' : 'en'}_${w}`;
    // Capture only: an element screenshot scrolls the page, which would park the sticky title mid-section and
    // float the Menu pill over a card. Pin the title to the top and hide the pill for the picture.
    await page.addStyleTag({ content: '.work__sticky { position: static !important; } .menu-pill { display: none !important; }' });
    await page.locator('#work').screenshot({ path: path.join(OUT, `work_${tag}.png`) });
    const sizes = await page.evaluate(([d, s]) => {
      const px = (sel) => [...new Set([...document.querySelectorAll(sel)].map((el) => getComputedStyle(el).fontSize))];
      return { descriptive: Object.fromEntries(d.map((x) => [x, px(x)])), small: Object.fromEntries(s.map((x) => [x, px(x)])) };
    }, [descriptive, small]);
    const bad = Object.entries(sizes.descriptive).filter(([, v]) => v.some((x) => x !== '16px'));
    const bars = await page.evaluate(() => [...document.querySelectorAll('.bars')].map((b) => {
      const inner = b.querySelector('.bars__inner').getBoundingClientRect();
      const rows = b.querySelector('.bars__rows').getBoundingClientRect();
      const title = b.querySelector('.bars__title').getBoundingClientRect();
      return { panel: Math.round(b.getBoundingClientRect().height), captionToBars: Math.round(rows.top - title.bottom), padBottom: Math.round(inner.bottom - rows.bottom) };
    }));
    const hs = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`${tag}: descriptive not 16px: ${bad.length ? JSON.stringify(bad) : 'none'} | small: ${JSON.stringify(Object.values(sizes.small).flat().filter((v, i, a) => a.indexOf(v) === i))} | bars ${JSON.stringify(bars)} | hscroll ${hs}`);
    await ctx.close();
  }
}
await browser.close();
