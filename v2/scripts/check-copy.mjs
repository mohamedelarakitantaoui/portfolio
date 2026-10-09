// Copy rules over the built site (run after `npm run build`): banned words, exclamation marks,
// and more than one em dash per <section>. Visible text only: <script>, <style> and tags are stripped.
// Usage: node scripts/check-copy.mjs [distDir]
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] ?? 'dist';
const BANNED = ['leverage', 'leveraging', 'seamless', 'seamlessly', 'robust', 'cutting-edge', 'passionate', 'innovative',
  'unlock', 'elevate', 'empower', 'delve', 'military-grade', 'comprehensive'];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const text = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ');

const problems = [];
let pages = 0;
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
  pages++;
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(dist, f);
  const body = text(html.slice(html.indexOf('<body')));
  for (const w of BANNED) {
    const m = body.match(new RegExp(`\\b${w}\\b`, 'i'));
    if (m) problems.push(`${rel}: banned word "${m[0]}"`);
  }
  const bang = body.match(/[^\s]{0,30}!(?!=)[^\s]{0,30}/);
  if (bang) problems.push(`${rel}: exclamation mark near "${bang[0]}"`);
  // Visible text plus meta descriptions and titles count as copy too.
  const head = html.slice(0, html.indexOf('<body'));
  for (const w of BANNED) if (new RegExp(`\\b${w}\\b`, 'i').test(head.replace(/<script[\s\S]*?<\/script>/g, ''))) problems.push(`${rel}: banned word "${w}" in <head>`);
  const sections = html.split(/<section\b/).slice(1);
  sections.forEach((s, i) => {
    const n = (text(s.split(/<\/section>/)[0]).match(/—/g) || []).length;
    if (n > 1) problems.push(`${rel}: section ${i + 1} has ${n} em dashes`);
  });
}
if (problems.length) {
  console.error(`Copy check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Copy check passed: ${pages} pages, 0 banned words, 0 exclamation marks, at most one em dash per section.`);
