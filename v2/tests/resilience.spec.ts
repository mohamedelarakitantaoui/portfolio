// The site works in its static states: JavaScript off, reduced motion, and ?effects=off. Main content, nav and footer
// are visible; no text is left at opacity 0; with reduced motion or effects off nothing animates and no effect runs.
import { test, expect, type Page } from '@playwright/test';
import { hiddenTextScript } from './routes';

const PAGES = ['/', '/work', '/work/aneuxplain', '/fr'];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

async function staticChecks(page: Page, js = true) {
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('#site-header .logo')).toBeVisible();
  await expect(page.locator('#site-footer')).toBeAttached();
  await page.locator('#site-footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-footer__email')).toBeVisible();
  if (js) await scrollThrough(page); // timers don't run with JavaScript off, and nothing waits for a scroll then
  expect(await page.evaluate(hiddenTextScript), 'text left at opacity 0').toEqual([]);
}

test.describe('JavaScript off', () => {
  test.use({ javaScriptEnabled: false });
  for (const p of PAGES) test(`no-JS ${p}`, async ({ page }) => {
    await page.goto(p);
    await staticChecks(page, false);
    // The nav is reachable without JS: header links on desktop, the Menu link jumps to the footer nav.
    await expect(page.locator('#footer-nav a').first()).toBeAttached();
  });
});

for (const [name, opts, query] of [
  ['reduced motion', { reducedMotion: 'reduce' as const }, ''],
  ['?effects=off', { reducedMotion: 'no-preference' as const }, '?effects=off'],
] as const) {
  test.describe(name, () => {
    test.use(opts);
    for (const p of PAGES) test(`${name} ${p}`, async ({ page }) => {
      await page.goto(p + query, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500); // longer than the effects loader's idle delay
      await staticChecks(page);
      const state = await page.evaluate(() => ({
        fx: document.documentElement.classList.contains('fx-on'),
        lenis: document.documentElement.classList.contains('lenis'),
        // Animations that run on their own (keyframes, Web Animations). CSS transitions are hover/focus feedback, not effects.
        running: document.getAnimations().filter((a) => a.playState === 'running' && a.constructor.name !== 'CSSTransition').length,
        playing: [...document.querySelectorAll('video')].filter((v) => !v.paused).length,
      }));
      expect(state.fx, 'effects loader must not run').toBe(false);
      expect(state.lenis, 'no smooth scrolling').toBe(false);
      expect(state.running, 'no running CSS animations').toBe(0);
      if (name === 'reduced motion') expect(state.playing, 'no autoplaying video').toBe(0);
    });
  });
}
