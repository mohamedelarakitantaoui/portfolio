// Scans for the "Never" list in scripts/banned.json.
//   node scripts/check-banned.mjs            -> src/ and public/ text files, plus dist/ pages if dist/ exists
//   node scripts/check-banned.mjs <files...> -> only those files (git hook, Claude Code hook)
// In dist/, only visible text and attributes count: <style> and <script> blocks are removed first (they hold
// library code and the dev-only TODO marker style). Prints file:line [rule] why. Exit 1 on any match.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/banned.json'), 'utf8'));
const TEXT = /\.(astro|ts|tsx|js|mjs|mdx|md|css|json|svg|txt|xml|html|yml|yaml)$/i;
const SKIP = [/node_modules/, /[\\/]\.astro[\\/]/, /[\\/]_astro[\\/].*\.js$/];

const rules = cfg.rules
  .map((r) => {
    if (r.hosts) {
      if (!r.hosts.length) return null;
      const esc = r.hosts.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      return { ...r, re: new RegExp(esc.join('|'), `g${r.flags}`) };
    }
    return { ...r, re: new RegExp(r.regex, `g${r.flags}`) };
  })
  .filter(Boolean);

const rel = (f) => path.relative(ROOT, path.resolve(f)).split(path.sep).join('/');
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);

let files = process.argv.slice(2);
if (!files.length) files = [...walk(path.join(ROOT, 'src')), ...walk(path.join(ROOT, 'public')), ...walk(path.join(ROOT, 'dist'))];
files = files.filter((f) => TEXT.test(f) && !SKIP.some((s) => s.test(f)) && fs.existsSync(f));

const allowed = (file, lineNo, lineText, rule) =>
  cfg.allow.some((a) => a.rule === rule && a.file === file && ((a.line && a.line === lineNo) || (a.contains && lineText.includes(a.contains))));

const problems = [];
for (const f of files) {
  const file = rel(f);
  const zone = file.startsWith('dist/') ? 'dist' : 'src';
  if (zone === 'src' && !/^(src|public)\//.test(file)) continue; // hooks may pass other paths: ignore them
  let text = fs.readFileSync(f, 'utf8');
  if (zone === 'dist' && /\.html$/.test(file)) text = text.replace(/<(style|script)\b[\s\S]*?<\/\1>/gi, (m) => m.replace(/[^\n]/g, ' '));
  const lines = text.split('\n');
  for (const r of rules) {
    if (!r.where.includes(zone)) continue;
    lines.forEach((line, i) => {
      r.re.lastIndex = 0;
      const m = r.re.exec(line);
      if (m && !allowed(file, i + 1, line, r.id)) problems.push(`${file}:${i + 1} [${r.id}] "${m[0].trim()}" ${r.why}`);
    });
  }
}
if (problems.length) {
  console.error(`check-banned: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-banned: ok (${files.length} files, ${rules.length} rules)`);
