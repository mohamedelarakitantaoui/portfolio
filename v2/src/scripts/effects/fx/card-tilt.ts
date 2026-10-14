// Project evidence tilts by at most 1.5 degrees. Mouse only; no decorative glow.
import type { FxContext } from '../index';

const MAX = 1.5; // degrees; keep project evidence readable

export default function cardTilt(media: HTMLElement, { gsap, fine }: FxContext) {
  if (!fine) return;
  gsap.set(media, { transformPerspective: 900, transformStyle: 'preserve-3d' });
  const rx = gsap.quickTo(media, 'rotationX', { duration: 0.5, ease: 'power3.out' });
  const ry = gsap.quickTo(media, 'rotationY', { duration: 0.5, ease: 'power3.out' });

  media.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = media.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    media.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    media.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    ry((x - 0.5) * 2 * MAX);
    rx((0.5 - y) * 2 * MAX);
  });
  media.addEventListener('pointerleave', () => { rx(0); ry(0); });
}
