// Favicon "ME" in Jost 500 (v5), bone on the page black, square corners, rendered to outlines by satori (no font
// needed by the browser). Writes public/favicon.svg, public/favicon-32.png and public/apple-touch-icon.png.
// Run: node scripts/make-favicon.mjs
import fs from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

const font = await fs.readFile('node_modules/@fontsource/jost/files/jost-latin-500-normal.woff');
const mark = (size) => ({
  type: 'div',
  props: {
    style: {
      width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#070605', color: '#e9dfcc', fontFamily: 'Jost', fontWeight: 500,
      fontSize: size * 0.48, letterSpacing: '0.01em',
    },
    children: 'ME',
  },
});
const render = (size) => satori(mark(size), { width: size, height: size, fonts: [{ name: 'Jost', data: font, weight: 500, style: 'normal' }] });

await fs.writeFile('public/favicon.svg', await render(64));
await fs.writeFile('public/favicon-32.png', await sharp(Buffer.from(await render(64))).resize(32, 32).png().toBuffer());
await fs.writeFile('public/apple-touch-icon.png', await sharp(Buffer.from(await render(180))).png().toBuffer());
console.log('favicon written');
