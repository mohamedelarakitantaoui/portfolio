import { test, expect } from '@playwright/test';

test('service links carry the chosen offer into the contact form', async ({ page }) => {
  await page.goto('/services');
  await page.locator('a[href*="pack=01"]').click();
  await expect(page.locator('#cf-topic')).toHaveValue('automation');
  await page.goto('/fr/services');
  await page.locator('a[href*="pack=02"]').click();
  await expect(page.locator('#cf-topic')).toHaveValue('web-app');
  await page.goto('/contact?pack=unknown');
  await expect(page.locator('#cf-topic')).toHaveValue('general');
});

test('contact clears corrected errors and prevents duplicate requests', async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route('https://formsubmit.co/ajax/**', async (route) => {
    requests++;
    await pending;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":"true","message":"The form was submitted successfully."}' });
  });
  await page.goto('/contact');
  await expect(page.locator('#main [data-copy]')).toBeVisible();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#cf-name')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#cf-name').fill('Visitor');
  await expect(page.locator('#cf-name')).not.toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#cf-name-err')).toBeEmpty();
  await page.locator('#cf-email').fill('visitor@example.com');
  await page.locator('#cf-msg').fill('I would like to discuss a project.');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled();
  await page.locator('[data-contact-form]').evaluate((form) => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await expect.poll(() => requests).toBe(1);
  release();
  await expect(page.locator('[data-form-success]')).toBeVisible();
});

test('contact retains native validation without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/contact`);
  await expect(page.locator('[data-contact-form]')).not.toHaveAttribute('novalidate');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page).toHaveURL(/\/contact\/?$/);
  await context.close();
});

test('palette supports first and last results and clears empty selection', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-copy]').first()).toBeVisible();
  await page.keyboard.press('Control+k');
  const input = page.locator('#palette-input');
  await expect(input).toBeFocused();
  await input.press('End');
  await expect(page.locator('#palette-list [aria-selected="true"]')).toHaveCount(1);
  const lastId = await page.locator('#palette-list li').last().getAttribute('id');
  await expect(input).toHaveAttribute('aria-activedescendant', lastId!);
  await input.press('Home');
  await expect(input).toHaveAttribute('aria-activedescendant', 'pal-0');
  await input.fill('zzzz-no-such-project');
  await expect(input).not.toHaveAttribute('aria-activedescendant');
  await input.press('Escape');
  await expect(page.locator('#palette')).not.toBeVisible();
});
