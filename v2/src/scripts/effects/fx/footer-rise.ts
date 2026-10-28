// Footer: the giant "Mamoun El Araki" rises into place behind a mask when it enters the screen, once. Each marked
// part ([data-rise]: "Mamoun", then the Cormorant "El Araki") rises in its own mask, so the serif span survives.
// The name is decorative (aria-hidden) and is never left hidden: it is only lowered while it is still below the fold
// and about to enter, and if it is already on screen (short page, jump to the end, full-page capture) it simply stays.
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
  const words = el.querySelectorAll('.rise__w');
  const below = () => el.getBoundingClientRect().top > window.innerHeight;
  let armed = false;
  let done = false;
  const finish = () => { done = true; arm.disconnect(); play.disconnect(); };
  // Arm: within a third of a screen below the fold, still off screen → lower the words into their masks.
  const arm = new IntersectionObserver(([e]) => {
    if (done || armed || !e.isIntersecting || !below()) return;
    gsap.set(words, { yPercent: 110 });
    armed = true;
  }, { rootMargin: '0px 0px 33% 0px' });
  // Play: on screen → rise (only if it was lowered; otherwise it is already in place).
  const play = new IntersectionObserver(([e]) => {
    if (done || !e.isIntersecting) return;
    if (armed) gsap.to(words, { yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.12 });
    finish();
  }, { threshold: 0.15 });
  if (!below()) { done = true; return; }
  arm.observe(el);
  play.observe(el);
}
