// The four states of the home page and /work: JS off, reduced motion, ?effects=off, and effects on (after scrolling
// through). Each must leave no visible text at opacity 0, no horizontal scroll, and (except "effects on") no effect
// running: no fx-on class, no Lenis, no proof loop, no rolling word.
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const states = [
  { name: 'js-off', ctx: { javaScriptEnabled: false }, q: '' },
  { name: 'reduced-motion', ctx: { reducedMotion: 'reduce' }, q: '' },
  { name: 'effects=off', ctx: { reducedMotion: 'no-preference' }, q: '?effects=off' },
  { name: 'effects on', ctx: { reducedMotion: 'no-preference' }, q: '' },
];
const browser = await chromium.launch();
let fail = 0;
for (const path of ['/', '/work', '/fr']) {
  for (const s of states) {
    for (const width of [1440, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, ...s.ctx });
      const page = await ctx.newPage();
      await page.goto(BASE + path + s.q, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      for (let y = 0; y < 12000; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
      await page.waitForTimeout(1500);
      const r = await page.evaluate(() => {
        const hiddenText = [...document.querySelectorAll('main *, footer *')].filter((el) => {
          if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
          if (el.closest('[aria-hidden="true"], .sr-only, .caps__previews, dialog')) return false;
          let o = 1;
          for (let e = el; e && e !== document.body; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
          return o < 0.99;
        }).map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 50));
        return {
          fx: document.documentElement.classList.contains('fx-on'),
          lenis: document.documentElement.classList.contains('lenis'),
          loop: !!document.querySelector('.proof.is-looping'),
          roll: !!document.querySelector('.about__roll .roll'),
          hidden: hiddenText.slice(0, 4),
          hs: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      const expectFx = s.name === 'effects on';
      const ok = r.hidden.length === 0 && r.hs <= 0 && (expectFx ? r.fx : !r.fx && !r.lenis && !r.loop && !r.roll);
      if (!ok) fail++;
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${path.padEnd(6)} ${s.name.padEnd(15)} ${width}  fx:${r.fx} lenis:${r.lenis} loop:${r.loop} roll:${r.roll} hiddenText:${r.hidden.length ? r.hidden.join(', ') : 0} hscroll:${r.hs}`);
      await ctx.close();
    }
  }
}
await browser.close();
process.exit(fail ? 1 : 0);
