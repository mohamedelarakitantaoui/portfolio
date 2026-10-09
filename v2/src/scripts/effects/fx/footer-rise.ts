// Footer: the giant "Mamoun El Araki" rises into place behind a mask when it enters the screen, once. It is set on
// one line, so the rise runs word by word (never letter by letter). The name is decorative (aria-hidden) and is
// fully visible without this effect.
import type { FxContext } from '../index';

export default function footerRise(el: HTMLElement, { gsap }: FxContext) {
  const words = (el.textContent ?? '').trim().split(/\s+/);
  if (!words.length) return;
  const inner = words.map((w) => {
    const mask = document.createElement('span');
    mask.className = 'rise';
    const word = document.createElement('span');
    word.className = 'rise__w';
    word.textContent = w;
    mask.append(word);
    return mask;
  });
  el.replaceChildren(...inner.flatMap((m, i) => (i ? [' ', m] : [m])));
  gsap.from(el.querySelectorAll('.rise__w'), {
    yPercent: 110,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.09,
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
  });
}
