// Project cards (home + /work): a soft light follows the cursor over the media (opacity 0.08, CSS) and the media
// tilts toward it by at most 4deg. Mouse only: touch, reduced motion and no-JS keep flat cards.
import type { FxContext } from '../index';

const MAX = 4; // degrees

export default function cardTilt(media: HTMLElement, { gsap, fine }: FxContext) {
  if (!fine) return;
  const glow = document.createElement('span');
  glow.className = 'pcard__glow';
  glow.setAttribute('aria-hidden', 'true');
  media.append(glow);
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
