// Experience: when the section reaches mid-screen, a paper layer (#F2F0EA) fades in behind it and the text turns
// dark; when it leaves mid-screen, everything reverses. Opacity only.
// AA at every step: the layer fades linearly over 0.7 s and the content is hidden while the layer is between 20%
// and 80% opaque (the mid-greys where neither light nor dark text reaches 4.5:1). Colours swap at 50%.
import type { FxContext } from '../index';

const D = 0.7; // seconds for the layer, linear

export default function expLight(section: HTMLElement, { gsap, ScrollTrigger }: FxContext) {
  const content = section.querySelector<HTMLElement>(':scope > .wrap');
  if (!content) return;
  const paper = document.createElement('div');
  paper.className = 'exp__paper';
  paper.setAttribute('aria-hidden', 'true');
  section.prepend(paper);

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'none' },
    onUpdate: () => section.classList.toggle('is-light', tl.time() >= D * 0.5),
  });
  tl.to(paper, { opacity: 1, duration: D }, 0)
    .to(content, { opacity: 0, duration: D * 0.1 }, D * 0.1) // gone by 20%
    .to(content, { opacity: 1, duration: D * 0.1 }, D * 0.8); // back from 80%

  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: (self) => (self.isActive ? tl.play() : tl.reverse()),
  });
}
