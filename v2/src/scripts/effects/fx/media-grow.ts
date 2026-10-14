// AneuXplain gently scales from 97% to full size as it enters view, on mouse devices only.
import type { FxContext } from '../index';

export default function mediaGrow(wrap: HTMLElement, { gsap, fine }: FxContext) {
  if (!fine) return;
  const media = wrap.querySelector<HTMLElement>('.media');
  if (!media) return;
  gsap.fromTo(media,
    { scale: 0.97, transformOrigin: '50% 50%' },
    {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 95%', end: 'top 35%', scrub: true },
    });
}
