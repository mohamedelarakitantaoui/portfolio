// Footer: the giant "Mamoun El Araki" rises into place behind a mask when it enters the screen, once. Each marked
// part ([data-rise]: "Mamoun", then the Cormorant "El Araki") rises in its own mask, so the serif span survives.
// The name is decorative (aria-hidden) and is fully visible without this effect.
import type { FxContext } from '../index';

export default function footerRise(el: HTMLElement, { gsap }: FxContext) {
  const parts = Array.from(el.querySelectorAll<HTMLElement>('[data-rise]'));
  if (!parts.length) return;
  for (const part of parts) {
    const mask = document.createElement('span');
    mask.className = 'rise';
    part.replaceWith(mask);
    part.classList.add('rise__w');
    mask.append(part);
  }
  gsap.from(el.querySelectorAll('.rise__w'), {
    yPercent: 110,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
  });
}
