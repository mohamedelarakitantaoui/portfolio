// tokens.css and design-references/tokens.md must agree: every token in the :root block of src/styles/tokens.css
// appears in the token table of design-references/tokens.md with the same value, and the table lists nothing that
// tokens.css doesn't have. Also checks the plain-words colours that matter most. Exit 1 on any difference.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(path.join(ROOT, 'src/styles/tokens.css'), 'utf8').replace(/\r\n/g, '\n');
const md = fs.readFileSync(path.join(ROOT, 'design-references/tokens.md'), 'utf8').replace(/\r\n/g, '\n');
const norm = (v) => v.replace(/\s+/g, ' ').trim().toLowerCase();

const root = css.slice(css.indexOf(':root {') + 7, css.indexOf('\n}\n'));
const cssTokens = new Map([...root.matchAll(/^[ \t]*(--[\w-]+):[ \t]*([^;]+);/gm)].map((m) => [m[1], norm(m[2])]));
const mdTokens = new Map([...md.matchAll(/^\| `(--[\w-]+)` \| `([^`]+)` \|/gm)].map((m) => [m[1], norm(m[2])]));

const problems = [];
for (const [k, v] of cssTokens) {
  if (!mdTokens.has(k)) problems.push(`${k}: in tokens.css, missing from design-references/tokens.md`);
  else if (mdTokens.get(k) !== v) problems.push(`${k}: tokens.css "${v}" vs tokens.md "${mdTokens.get(k)}"`);
}
for (const k of mdTokens.keys()) if (!cssTokens.has(k)) problems.push(`${k}: in tokens.md, not in tokens.css`);

// The headline numbers in the prose must match the tokens too.
const prose = [['#0c0c0c', '--ink-0'], ['#111111', '--ink-1'], ['#efefef', '--bone-0'], ['#b3b3b3', '--bone-1'], ['#a6a6a6', '--bone-2'], ['#f2a900', '--accent'], ['#f2f0ea', '--paper']];
for (const [hex, token] of prose) {
  if (cssTokens.get(token) !== hex) problems.push(`${token}: the plain-words section says ${hex}, tokens.css says ${cssTokens.get(token)}`);
}
if (!/1750px/.test(md) || cssTokens.get('--max') !== '1750px') problems.push('--max: container width must be 1750px in both files');

if (problems.length) {
  console.error(`check-tokens: ${problems.length} difference(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-tokens: ok (${cssTokens.size} tokens in sync)`);
