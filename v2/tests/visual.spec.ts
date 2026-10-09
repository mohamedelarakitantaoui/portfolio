// @visual screenshot diffs against committed baselines in tests/visual.spec.ts-snapshots/.
// Run only through `npm run check:visual` (Playwright Docker image, same fonts as the baselines). Update baselines
// only after Mamoun has seen the diff images: `npm run check:visual:update`.
// Stable by construction: effects off, reduced motion, fonts loaded, lazy images loaded, videos, the terminal and the
// © year masked.
import { test, expect } from '@playwright/test';

const PAGES: [string, string][] = [
  ['home', '/'], ['work', '/work'], ['aneuxplain', '/work/aneuxplain'], ['cv', '/cv'], ['about', '/about'], ['404', '/404'],
];
const SIZES = [[1440, 900], [390, 844]] as const;

test.use({ reducedMotion: 'reduce' });

const shots: [string, string, number, number][] = [];
for (const [name, path] of PAGES) for (const [w, h] of SIZES) shots.push([`${name}-${w}-en`, path, w, h]);
for (const [w, h] of SIZES) shots.push([`home-${w}-fr`, '/fr', w, h]);

for (const [name, path, w, h] of shots) {
  test(`@visual ${name}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(`${path}?effects=off`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: [page.locator('video'), page.locator('.term'), page.locator('.site-footer__legal')],
    });
  });
}
