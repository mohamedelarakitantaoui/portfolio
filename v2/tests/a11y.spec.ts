// Accessibility: axe (WCAG 2.0/2.1/2.2 A + AA) on every route with zero serious or critical issues, and a keyboard
// pass on the home page: every focused element shows a visible focus indicator and Tab reaches the main buttons.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes } from './routes';

for (const route of routes) {
  test(`axe ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const bad = res.violations
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
    expect(bad).toEqual([]);
  });
}

test('keyboard: focus is always visible and Tab reaches the main buttons (home)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const reached: string[] = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      // The ring may sit on the element or on the box that wraps it (e.g. the terminal's input row, via :focus-within).
      const ring = (e: Element) => { const cs = getComputedStyle(e); return (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none'; };
      const visible = ring(el) || (!!el.parentElement && ring(el.parentElement));
      return { label: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40), visible };
    });
    if (!f) continue;
    expect(f.visible, `focus ring on "${f.label}"`).toBe(true);
    reached.push(f.label);
  }
  expect(reached.some((l) => /skip to content/i.test(l)), 'skip link first').toBe(true);
  expect(reached.some((l) => /see my work/i.test(l)), 'reaches "See my work"').toBe(true);
  expect(reached.some((l) => /download cv/i.test(l)), 'reaches "Download CV"').toBe(true);
});
