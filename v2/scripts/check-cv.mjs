// Reads the text inside every PDF in public/cv/ and fails on facts that must never ship: "95%" (the Intelcia figure
// is 90%), "Supabase", "Government RAG". Blocks deploy (CI + release checklist), not commits.
// Usage: node scripts/check-cv.mjs   (npm run check:cv)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'public/cv');
const RULES = [
  { id: '95-percent', re: /\b95[\s  ]?%/, why: 'Intelcia is 90% less processing time (2h30 → 15 min), never 95%.' },
  { id: 'supabase', re: /supabase/i, why: 'eSaha never used Supabase.' },
  { id: 'government-rag', re: /government[\s-]+rag|rag[\s-]+gouvernemental/i, why: 'The Government RAG project is removed.' },
];

const pdfs = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.toLowerCase().endsWith('.pdf')) : [];
const problems = [];
for (const f of pdfs) {
  const task = getDocument({ data: new Uint8Array(fs.readFileSync(path.join(DIR, f))), useSystemFonts: true, verbosity: 0 });
  const doc = await task.promise;
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const text = (await page.getTextContent()).items.map((i) => i.str).join(' ').replace(/\s+/g, ' ');
    for (const r of RULES) {
      const m = text.match(r.re);
      if (m) {
        const at = Math.max(0, m.index - 50);
        problems.push(`public/cv/${f} p.${n} [${r.id}] "…${text.slice(at, m.index + m[0].length + 30).trim()}…" ${r.why}`);
      }
    }
  }
  await task.destroy();
}
if (!pdfs.length) console.warn('check-cv: no PDF in public/cv/');
if (problems.length) {
  console.error(`check-cv: ${problems.length} problem(s). Re-export the CVs (docs/sops/update-cv.md).\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-cv: ok (${pdfs.length} PDFs)`);
