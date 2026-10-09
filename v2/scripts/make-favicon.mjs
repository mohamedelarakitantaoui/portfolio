// Favicon "ME" in DM Sans 700, rendered to outlines by satori (no font needed by the browser).
// Writes public/favicon.svg, public/favicon-32.png and public/apple-touch-icon.png. Run: node scripts/make-favicon.mjs
import fs from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

const font = await fs.readFile('node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff');
const mark = (size, radius) => ({
  type: 'div',
  props: {
    style: {
      width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0c0c0c', borderRadius: radius, color: '#ffffff', fontFamily: 'DM Sans', fontWeight: 700,
      fontSize: size * 0.5, letterSpacing: '-0.06em', paddingRight: size * 0.03,
    },
    children: 'ME',
  },
});
const render = (size, radius) => satori(mark(size, radius), { width: size, height: size, fonts: [{ name: 'DM Sans', data: font, weight: 700, style: 'normal' }] });

await fs.writeFile('public/favicon.svg', await render(64, 14));
await fs.writeFile('public/favicon-32.png', await sharp(Buffer.from(await render(64, 14))).resize(32, 32).png().toBuffer());
await fs.writeFile('public/apple-touch-icon.png', await sharp(Buffer.from(await render(180, 0))).png().toBuffer());
console.log('favicon written');
