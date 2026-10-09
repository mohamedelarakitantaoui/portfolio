// Claude Code PostToolUse hook (Edit|Write|MultiEdit): check the file that was just changed.
//   any text file in src/ or public/ → scripts/check-banned.mjs
//   .css / .astro                    → stylelint (tokens only, no !important)
// On a violation: exit 2 with the messages on stderr, so the session sees them and fixes the file right away.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const chunks = [];
for await (const c of process.stdin) chunks.push(c);
let input = {};
try { input = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { process.exit(0); }
const file = input.tool_input?.file_path;
if (!file || !fs.existsSync(file)) process.exit(0);
const rel = path.relative(ROOT, path.resolve(file)).split(path.sep).join('/');
if (rel.startsWith('..') || !/^(src|public)\//.test(rel)) process.exit(0); // only the site's own files

const run = (cmd, args) => spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32' });
const problems = [];
const banned = run('node', ['scripts/check-banned.mjs', rel]);
if (banned.status !== 0) problems.push((banned.stderr || banned.stdout).trim());
if (/\.(css|astro)$/.test(rel) && !/(^|\/)(tokens|fonts)\.css$/.test(rel)) {
  const lint = run('npx', ['stylelint', rel, '--formatter', 'unix']);
  if (lint.status !== 0) problems.push(`stylelint:\n${(lint.stdout || lint.stderr).trim()}`);
}
if (problems.length) {
  process.stderr.write(`Guardrail check failed for ${rel} (fix it now):\n${problems.join('\n')}\n`);
  process.exit(2);
}
process.exit(0);
