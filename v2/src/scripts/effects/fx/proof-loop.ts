// Proof row: a slow horizontal loop of the four wordmarks that speeds up and skews (max 6deg) with scroll speed,
// then settles. Wide screens only; phones, reduced motion and no-JS keep the static grid. Pauses off screen and
// on hover. The duplicate set is aria-hidden, so screen readers read the list once.
import type { FxContext } from '../index';

export default function proofLoop(section: HTMLElement, { gsap, ScrollTrigger }: FxContext) {
  if (!window.matchMedia('(min-width: 900px)').matches) return;
  const list = section.querySelector<HTMLElement>('.proof__list');
  if (!list) return;

  const track = document.createElement('div');
  track.className = 'proof__track';
  list.replaceWith(track);
  const copy = list.cloneNode(true) as HTMLElement;
  copy.setAttribute('aria-hidden', 'true');
  track.append(list, copy);
  section.classList.add('is-looping');

  const loop = gsap.to(track, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 });
  const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
  const clamp = gsap.utils.clamp(-6, 6);
  let settle: gsap.core.Tween | null = null;
  let hovered = false;

  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive && !hovered ? loop.play() : loop.pause()),
    onUpdate: (self) => {
      const v = self.getVelocity(); // px per second
      gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v) / 250, 6), duration: 0.25, overwrite: true });
      skewTo(clamp(-v / 300));
      settle?.kill();
      settle = gsap.delayedCall(0.18, () => {
        gsap.to(loop, { timeScale: 1, duration: 1.4, ease: 'power2.out', overwrite: true });
        skewTo(0);
      });
    },
  });
  section.addEventListener('mouseenter', () => { hovered = true; loop.pause(); });
  section.addEventListener('mouseleave', () => { hovered = false; loop.play(); });
}
