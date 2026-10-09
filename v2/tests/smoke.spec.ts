// Every route, EN and FR: status 200, exactly one h1, no console errors, correct <html lang>, no horizontal scroll from
// 320 to 1920 px, the language switch points at the twin page; CV links answer 200; unknown URLs answer 404.
import { test, expect } from '@playwright/test';
import { routes, langOf, twinOf } from './routes';

const WIDTHS = [320, 390, 768, 1024, 1440, 1920];

test('the build has pages', () => expect(routes.length).toBeGreaterThan(10));

for (const route of routes) {
  test(`smoke ${route}`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    const res = await page.goto(route, { waitUntil: 'networkidle' });
    expect(res?.status(), 'HTTP status').toBe(200);
    await expect(page.locator('h1'), 'exactly one h1').toHaveCount(1);
    if (route !== '/404') expect(await page.getAttribute('html', 'lang')).toBe(langOf(route));

    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `horizontal scroll at ${w}px`).toBeLessThanOrEqual(0);
    }

    if (route !== '/404') {
      const twin = twinOf(route);
      const href = await page.locator('header a[hreflang]').first().getAttribute('href');
      expect(href?.replace(/\/$/, '') || '/', 'language switch goes to the twin page').toBe(twin);
      expect((await request.get(twin)).status(), `twin ${twin} exists`).toBe(200);
    }
    expect(errors, 'console errors').toEqual([]);
  });
}

test('CV links answer 200 (EN + FR)', async ({ page, request }) => {
  for (const route of ['/cv', '/fr/cv']) {
    await page.goto(route);
    const pdfs = await page.locator('a[href$=".pdf"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
    expect(pdfs.length, `${route} offers at least one PDF`).toBeGreaterThan(0);
    for (const href of pdfs) expect((await request.get(href)).status(), href).toBe(200);
  }
});

test('an unknown URL answers 404 with the 404 page', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
});
