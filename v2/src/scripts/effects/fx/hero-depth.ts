// Hero depth: while the hero scrolls away, the giant MAMOUN word drifts down by up to 60px, i.e. it moves slower
// than the photo, which seems to rise in front of it. Transform only; scrubbed to the scroll position.
import type { FxContext } from '../index';

export default function heroDepth(hero: HTMLElement, { gsap }: FxContext) {
  const word = hero.querySelector<HTMLElement>('.hero__word');
  if (!word) return;
  // The CSS centres the word with translateX(-50%); hand that to GSAP so both transforms compose.
  gsap.set(word, { xPercent: -50, x: 0 });
  gsap.to(word, {
    y: 60,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}
