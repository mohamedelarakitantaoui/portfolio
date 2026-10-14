import type { FxContext } from '../index';

export default function portraitDepth(hero: HTMLElement, { gsap, fine }: FxContext) {
  const portrait = hero.querySelector<HTMLElement>('.hero__portrait');
  const contours = hero.querySelector<SVGElement>('.hero__contours');
  const visual = hero.querySelector<HTMLElement>('.hero__visual');
  if (!portrait || !visual || !fine) return;
  // A short settle, never an opacity gate: the portrait is visible from first paint.
  gsap.from(portrait, { y: 18, duration: 1, ease: 'power3.out' });
  const xTo = gsap.quickTo(portrait, 'x', { duration: 0.7, ease: 'power3.out' });
  const yTo = gsap.quickTo(portrait, 'y', { duration: 0.7, ease: 'power3.out' });
  const contourX = contours && gsap.quickTo(contours, 'x', { duration: 0.9, ease: 'power3.out' });
  visual.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const box = visual.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    xTo(x * 14); yTo(y * 10); if (contourX) contourX(x * -10);
  });
  visual.addEventListener('pointerleave', () => { xTo(0); yTo(0); if (contourX) contourX(0); });
}
