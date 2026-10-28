// Hero portrait (the LCP image): one source of truth for the <picture> markup and the <link rel="preload">,
// so both point at byte-identical URLs. Widths match how the hero actually renders it.
import { getImage } from 'astro:assets';
import portrait from '../assets/portrait-2026-10.png';

// Centred head-and-shoulders crop above the copy; smaller on short laptop screens.
export const PORTRAIT_SIZES = '(max-width: 599px) min(80vw, 416px), (max-height: 820px) min(40vh, 416px), min(56vh, 608px)';
const WIDTHS = [400, 560, 760, 1000, 1212];

let cache: Promise<{ avif: string; webp: string; fallback: string; width: number; height: number }> | null = null;

export function heroPortrait() {
  cache ??= (async () => {
    const set = async (format: 'avif' | 'webp', quality: number) => {
      const imgs = await Promise.all(WIDTHS.map((width) => getImage({ src: portrait, width, format, quality })));
      return imgs.map((img, i) => `${img.src} ${WIDTHS[i]}w`).join(', ');
    };
    const fallback = await getImage({ src: portrait, width: 760, format: 'webp', quality: 72 });
    return {
      avif: await set('avif', 55),
      webp: await set('webp', 72),
      fallback: fallback.src,
      width: portrait.width,
      height: portrait.height,
    };
  })();
  return cache;
}
