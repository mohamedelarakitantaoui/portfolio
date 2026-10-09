// Guardrail file: edit only with Mamoun's OK. (.cjs because the package is ESM and LHCI loads CommonJS configs.)
// Lighthouse CI, mobile (Lighthouse's default form factor and throttling), 3 runs per URL, median run asserted.
// Serves dist/ itself (staticDistDir), so run `npm run build` first. `npm run check:perf` sets CHROME_PATH.
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost/', 'http://localhost/work/', 'http://localhost/work/aneuxplain/', 'http://localhost/cv/'],
      numberOfRuns: 3,
      settings: { chromeFlags: '--headless=new --no-sandbox' },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        // Core Web Vitals "good": LCP <= 2.5 s, CLS <= 0.1; TBT <= 200 ms is the lab stand-in for INP <= 200 ms.
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        // Budgets (bytes over the wire). The AneuXplain loop is preload="none", so videos don't count here.
        'resource-summary:script:size': ['error', { maxNumericValue: 300 * 1024 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 100 * 1024 }],
        'resource-summary:font:size': ['warn', { maxNumericValue: 100 * 1024 }],
        'resource-summary:image:size': ['warn', { maxNumericValue: 500 * 1024 }],
        'resource-summary:total:size': ['warn', { maxNumericValue: 1.5 * 1024 * 1024 }],
      },
    },
    upload: { target: 'filesystem', outputDir: 'qa/out/lhci' },
  },
};
