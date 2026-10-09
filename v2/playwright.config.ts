// Playwright runs against `astro preview` of the production build (run `npm run build` first; `npm run check` does).
// Projects: "checks" = smoke + resilience + a11y (every run); "visual" = screenshot diffs, tagged @visual, run only
// by `npm run check:visual` inside the Playwright Docker image so fonts render the same as the committed baselines.
import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PW_PORT ?? 4321); // astro preview runs one server per project: reuse it locally

export default defineConfig({
  testDir: 'tests',
  outputDir: 'qa/out/test-results',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'qa/out/playwright-report' }]],
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
  expect: { toHaveScreenshot: { threshold: 0.2, maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  snapshotPathTemplate: '{testDir}/{testFileName}-snapshots/{arg}{ext}',
  projects: [
    { name: 'checks', grepInvert: /@visual/, use: { ...devices['Desktop Chrome'] } },
    { name: 'visual', grep: /@visual/, use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npx astro preview --host 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
