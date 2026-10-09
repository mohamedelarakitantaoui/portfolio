// npm run check: every guardrail that must pass before a task is done, in order, with a pass/fail table at the end.
//   astro check → stylelint → check-banned → check-i18n → check-tokens → build → html-validate → links → seo →
//   check-media → Playwright (smoke + resilience + a11y)
// Separate and required before deploy: npm run check:visual, check:perf, check:cv (docs/sops/release.md).
// Flags: --fast skips the build and Playwright (used by the pre-commit hook path for quick feedback).
import { spawnSync } from 'node:child_process';

const fast = process.argv.includes('--fast');
const steps = [
  ['types (astro check)', 'npx astro check'],
  ['styles (stylelint)', 'npx stylelint "src/**/*.{css,astro}"'],
  ['banned strings', 'node scripts/check-banned.mjs'],
  ['EN/FR twins', 'node scripts/check-i18n.mjs'],
  ['tokens ↔ design-references', 'node scripts/check-tokens.mjs'],
  ...(fast ? [] : [
    ['build', 'npx astro build'],
    ['banned strings (built site)', 'node scripts/check-banned.mjs'],
    ['HTML (html-validate)', 'npx html-validate "dist/**/*.html"'],
    ['links', 'node scripts/check-links.mjs'],
    ['SEO (sitemap, robots, hreflang)', 'node scripts/check-seo.mjs'],
    ['media budgets', 'node scripts/check-media.mjs'],
    ['Playwright smoke + resilience + a11y', 'npx playwright test --project=checks --reporter=dot'],
  ]),
];

const results = [];
const t0 = Date.now();
for (const [name, cmd] of steps) {
  const t = Date.now();
  process.stdout.write(`\n▶ ${name}\n`);
  const r = spawnSync(cmd, { stdio: 'inherit', shell: true, env: { ...process.env, FORCE_COLOR: '0' } });
  results.push([name, r.status === 0, ((Date.now() - t) / 1000).toFixed(1)]);
  if (r.status !== 0 && name === 'build') { console.error('build failed: later steps need dist/, stopping.'); break; }
}

const w = Math.max(...results.map(([n]) => n.length));
console.log(`\n${'step'.padEnd(w)}  result  time`);
console.log(`${'-'.repeat(w)}  ------  -----`);
for (const [n, ok, s] of results) console.log(`${n.padEnd(w)}  ${ok ? 'PASS  ' : 'FAIL  '}  ${s.padStart(5)}s`);
const failed = results.filter(([, ok]) => !ok).length;
console.log(`\n${failed ? `${failed} step(s) FAILED` : 'all checks PASSED'} in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
if (!fast) console.log('Before a deploy also: npm run check:visual, npm run check:perf, npm run check:cv');
process.exit(failed ? 1 : 0);
