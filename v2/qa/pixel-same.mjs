// Prove a refactor changed nothing visible: `node qa/pixel-same.mjs before` shoots key pages (effects off, full page),
// rebuild, then `node qa/pixel-same.mjs after` shoots again and compares pixel by pixel.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const mode = process.argv[2];
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'qa/out/pixel';
const pages = ['/', '/work', '/work/aneuxplain', '/work/dce-scraper', '/cv', '/services', '/about', '/contact', '/creative', '/fr', '/404'];
fs.mkdirSync(path.join(OUT, mode), { recursive: true });
const browser = await chromium.launch();
let diffs = 0;
for (const w of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(`${BASE}${p}?effects=off`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Load every lazy image first (scroll through), so timing never shows up as a difference.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: 'video{visibility:hidden}' });
    const f = path.join(OUT, mode, `${p.replace(/\//g, '_') || '_'}_${w}.png`);
    await page.screenshot({ path: f, fullPage: true });
    if (mode === 'after') {
      const b = f.replace(`${path.sep}after${path.sep}`, `${path.sep}before${path.sep}`);
      const [x, y] = await Promise.all([sharp(b).raw().toBuffer({ resolveWithObject: true }), sharp(f).raw().toBuffer({ resolveWithObject: true })]);
      let n = 0;
      if (x.info.width !== y.info.width || x.info.height !== y.info.height) n = -1;
      else for (let i = 0; i < x.data.length; i++) if (x.data[i] !== y.data[i]) n++;
      if (n) diffs++;
      console.log(`${n === 0 ? 'same' : 'DIFF'}  ${p} ${w}${n ? ` (${n < 0 ? 'size changed' : n + ' channel values'})` : ''}`);
    }
  }
  await ctx.close();
}
await browser.close();
if (mode === 'after') console.log(diffs ? `${diffs} page(s) differ` : 'all pages pixel-identical');
