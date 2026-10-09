// npm run check:visual [-- --update]
// Screenshot diffs (tests/visual.spec.ts) inside the official Playwright Docker image, same version as the package,
// so fonts render exactly like the committed baselines (Windows renders text differently: false failures).
// The container gets its own Linux node_modules (a named volume), builds the site, then runs the @visual project.
// No Docker? Use the CI job instead: GitHub → Actions → CI → "Run workflow" (update baselines = true to create them).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const update = process.argv.includes('--update');
const version = JSON.parse(fs.readFileSync('node_modules/@playwright/test/package.json', 'utf8')).version;
const image = `mcr.microsoft.com/playwright:v${version}-noble`;

const hasDocker = spawnSync('docker', ['--version'], { stdio: 'ignore', shell: process.platform === 'win32' }).status === 0;
if (!hasDocker) {
  console.error([
    'check:visual needs Docker (baselines are rendered in the Playwright Linux image, not on Windows).',
    'Docker is not installed here. Options:',
    '  1. Install Docker Desktop, then run npm run check:visual again.',
    '  2. Use CI: push, then GitHub → Actions → CI → Run workflow (update baselines: true the first time),',
    '     download the "visual-baselines" artifact, review it, and commit tests/visual.spec.ts-snapshots/.',
  ].join('\n'));
  process.exit(2);
}

const cwd = path.resolve('.');
const cmd = `npm ci --no-audit --no-fund && npm run build && npx playwright test --project=visual ${update ? '--update-snapshots' : ''}`;
const r = spawnSync('docker', [
  'run', '--rm', '--ipc=host', '-e', 'CI=1',
  '-v', `${cwd}:/work`, '-v', 'portfolio-v2-linux-node-modules:/work/node_modules', '-w', '/work',
  image, 'bash', '-lc', cmd,
], { stdio: 'inherit' });
if (r.status === 0) console.log(update ? 'Baselines updated: review tests/visual.spec.ts-snapshots/ before committing.' : 'Visual diffs: none above threshold.');
else console.error('Visual diffs found: open qa/out/playwright-report/index.html (expected / actual / diff images).');
process.exit(r.status ?? 1);
