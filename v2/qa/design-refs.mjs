// Regenerates design-references/: approved/ (the current approved pages, full page, effects off) and dont/ (small
// reconstructions of rejected looks, rendered from the old code in git history and the banned values).
// Run against `astro preview`: node qa/design-refs.mjs   (re-run after an approved design change)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const OUT = 'design-references';
const save = async (buf, file) => fs.writeFileSync(file, await sharp(buf).png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer());
const browser = await chromium.launch();

// approved/: page-width-lang.png
fs.mkdirSync(path.join(OUT, 'approved'), { recursive: true });
const pages = [['home', '/'], ['work', '/work'], ['aneuxplain', '/work/aneuxplain'], ['cv', '/cv'], ['about', '/about'], ['404', '/404']];
const jobs = [];
for (const [name, p] of pages) for (const w of [1440, 390]) jobs.push([name, p, w, 'en']);
for (const w of [1440, 390]) jobs.push(['home', '/fr', w, 'fr']);
for (const [name, p, w, lang] of jobs) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${p}?effects=off`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } window.scrollTo(0, 0); });
  await page.waitForLoadState('networkidle');
  await save(await page.screenshot({ fullPage: true }), path.join(OUT, 'approved', `${name}-${w}-${lang}.png`));
  await ctx.close();
}

// dont/: reconstructions of rejected looks
fs.mkdirSync(path.join(OUT, 'dont'), { recursive: true });
const STAR = '50,10 78.3,78.3 10,50 78.3,21.7 50,90 21.7,21.7 90,50 21.7,78.3'; // the old {8/3} khatam mark
const font = "font-family:'DM Sans',Arial,sans-serif";
const samples = {
  'star-logo': `<div style="background:#111;padding:28px 32px;display:flex;gap:40px;align-items:center;${font};color:#f2f0ea">
      <div style="display:flex;gap:10px;align-items:center;font-weight:600;font-size:18px"><svg width="24" height="24" viewBox="0 0 100 100"><polygon points="${STAR}" fill="none" stroke="#f2a900" stroke-width="8"/></svg>Mamoun El Araki</div>
      <div style="font-weight:700;font-size:64px;letter-spacing:.12em;display:flex;align-items:center">MAM<svg width="52" height="52" viewBox="0 0 100 100" style="margin:0 6px"><polygon points="${STAR}" fill="none" stroke="#f2a900" stroke-width="6"/></svg>UN</div>
      <svg width="44" height="44" viewBox="0 0 100 100"><polygon points="${STAR}" fill="#d97757"/></svg></div>`,
  'clay-on-cream': `<div style="background:#f0eee6;padding:32px 36px;width:640px;${font}">
      <p style="margin:0 0 6px;color:#d97757;font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase">Selected work</p>
      <h2 style="margin:0 0 18px;color:#1f1e1b;font-size:40px;letter-spacing:-.04em;line-height:1">Three projects, with the numbers.</h2>
      <span style="display:inline-block;background:#d97757;color:#fff;border-radius:999px;padding:12px 22px;font-weight:600">See my work</span>
      <span style="display:inline-block;margin-left:10px;border:1px solid #cc785c;color:#cc785c;border-radius:999px;padding:11px 22px;font-weight:600">Download CV</span></div>`,
  'outlined-letter-thumbnail': `<div style="background:#0f0d0c;padding:24px"><div style="position:relative;width:560px;aspect-ratio:16/10;border-radius:20px;overflow:hidden;background:#221c19;border:1px solid rgba(237,230,218,.1);display:grid;place-items:center;${font}">
      <span style="font-weight:700;font-size:150px;letter-spacing:-.06em;line-height:.8;color:transparent;-webkit-text-stroke:1.5px #6a6058">DCE</span>
      <svg style="position:absolute;left:50%;top:50%;width:13%;transform:translate(-50%,-50%)" viewBox="0 0 100 100"><polygon points="${STAR}" fill="none" stroke="#c4532d" stroke-width="7"/></svg>
      <span style="position:absolute;left:16px;bottom:14px;font-family:Consolas,monospace;font-size:11px;color:#a39a90">3 portals → 10 browsers → dataset</span></div></div>`,
};
for (const [name, html] of Object.entries(samples)) {
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
  await page.setContent(`<!doctype html><html><body style="margin:0;display:inline-block">${html}</body></html>`);
  await save(await page.locator('body > div').first().screenshot(), path.join(OUT, 'dont', `${name}.png`));
  await page.close();
}
// The flowchart as card media: the real DCE architecture diagram, framed the way the old card used it.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/work/dce-scraper?effects=off`, { waitUntil: 'networkidle' });
  const svg = await page.locator('.diagram svg').first().evaluate((el) => el.outerHTML);
  const css = await page.evaluate(() => [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n'));
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body style="margin:0;background:#0c0c0c;display:inline-block"><div style="padding:24px"><div class="diagram" style="width:560px;aspect-ratio:16/10;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;margin:0;display:grid;place-items:center;max-width:none">${svg}</div></div></body></html>`);
  await save(await page.locator('body > div').screenshot(), path.join(OUT, 'dont', 'flowchart-as-card-media.png'));
  await page.close();
}
await browser.close();
for (const d of ['approved', 'dont']) {
  const files = fs.readdirSync(path.join(OUT, d)).filter((f) => f.endsWith('.png'));
  const kb = files.reduce((s, f) => s + fs.statSync(path.join(OUT, d, f)).size, 0) / 1024;
  console.log(`${d}/: ${files.length} files, ${kb.toFixed(0)} KB`);
}
