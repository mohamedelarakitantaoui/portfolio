// Portrait depth (v5): the toned portrait behind the hero copy settles in, follows the mouse by a few pixels,
// and sinks slightly slower than the page as the hero scrolls away. Transform only; the portrait is visible from
// first paint (never an opacity gate).
import type { FxContext } from '../index';

export default function portraitDepth(hero: HTMLElement, { gsap, fine }: FxContext) {
  const portrait = hero.querySelector<HTMLElement>('.hero__portrait picture');
  if (!portrait) return;
  gsap.from(portrait, { y: 18, duration: 1, ease: 'power3.out' });
  gsap.to(hero.querySelector('.hero__portrait'), {
    y: 80, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  if (!fine) return;
  const xTo = gsap.quickTo(portrait, 'x', { duration: 0.8, ease: 'power3.out' });
  const yTo = gsap.quickTo(portrait, 'y', { duration: 0.8, ease: 'power3.out' });
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const box = hero.getBoundingClientRect();
    xTo(((e.clientX - box.left) / box.width - 0.5) * 16);
    yTo(((e.clientY - box.top) / box.height - 0.5) * 10);
  });
  hero.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
}
