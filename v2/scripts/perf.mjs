// npm run check:perf -> Lighthouse CI (lighthouserc.cjs) on dist/, using Playwright's Chromium so it works the same on
// Windows and Linux without a system Chrome. Prints the median scores per URL, then exits with LHCI's result.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

if (!fs.existsSync('dist/index.html')) { console.error('check:perf: no dist/, run npm run build first'); process.exit(1); }
const env = { ...process.env, CHROME_PATH: process.env.CHROME_PATH || chromium.executablePath() };
fs.rmSync('qa/out/lhci', { recursive: true, force: true });
const lhci = path.join('node_modules', '.bin', process.platform === 'win32' ? 'lhci.cmd' : 'lhci');
const run = (args) => spawnSync(lhci, args, { stdio: 'inherit', env, shell: process.platform === 'win32' });

let r = run(['collect']);
if (r.status !== 0) process.exit(r.status ?? 1);
const assert = run(['assert']);
run(['upload']);

// Median summary from the saved reports
const dir = '.lighthouseci';
const byUrl = new Map();
for (const f of fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /^lhr-.*\.json$/.test(f)) : []) {
  const lhr = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const u = new URL(lhr.finalDisplayedUrl ?? lhr.finalUrl).pathname;
  const c = lhr.categories, a = lhr.audits;
  (byUrl.get(u) ?? byUrl.set(u, []).get(u)).push({
    perf: c.performance.score, a11y: c.accessibility.score, bp: c['best-practices'].score, seo: c.seo.score,
    lcp: a['largest-contentful-paint'].numericValue, cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
  });
}
const med = (xs) => xs.slice().sort((x, y) => x - y)[Math.floor(xs.length / 2)];
console.log('\nLighthouse mobile, median of runs:');
for (const [u, runs] of byUrl) {
  const m = (k) => med(runs.map((x) => x[k]));
  console.log(`  ${u.padEnd(20)} perf ${Math.round(m('perf') * 100)}  a11y ${Math.round(m('a11y') * 100)}  bp ${Math.round(m('bp') * 100)}  seo ${Math.round(m('seo') * 100)}  LCP ${(m('lcp') / 1000).toFixed(2)} s  CLS ${m('cls').toFixed(3)}  TBT ${Math.round(m('tbt'))} ms  (${runs.length} runs)`);
}
process.exit(assert.status ?? 1);
