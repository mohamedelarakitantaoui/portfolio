import type { FxContext } from '../index';

export default function magneticLink(link: HTMLElement, { gsap, fine }: FxContext) {
  if (!fine) return;
  const xTo = gsap.quickTo(link, 'x', { duration: 0.4, ease: 'power3.out' });
  const yTo = gsap.quickTo(link, 'y', { duration: 0.4, ease: 'power3.out' });
  link.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const box = link.getBoundingClientRect();
    xTo((e.clientX - box.left - box.width / 2) * 0.12);
    yTo((e.clientY - box.top - box.height / 2) * 0.12);
  });
  const reset = () => { xTo(0); yTo(0); };
  link.addEventListener('pointerleave', reset);
  link.addEventListener('blur', reset);
}
