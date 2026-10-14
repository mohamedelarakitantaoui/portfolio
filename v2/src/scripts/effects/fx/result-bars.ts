import type { FxContext } from '../index';

export default function resultBars(figure: HTMLElement, { gsap }: FxContext) {
  // Animate the existing, correctly proportioned bars; numbers and the data table stay static.
  gsap.from(figure.querySelectorAll('.bars__fill'), {
    scaleX: 0.02, transformOrigin: 'left center', duration: 0.9, stagger: 0.12,
    ease: 'power3.out', scrollTrigger: { trigger: figure, start: 'top 85%', once: true },
  });
}
