// AneuXplain card: the app video grows from 85% to 100% of its column as it scrolls into view (scrubbed), and its
// corners ease from 24px to 10px. Scale is a transform (no layout shift); the radius is paint-only.
import type { FxContext } from '../index';

export default function mediaGrow(wrap: HTMLElement, { gsap }: FxContext) {
  const media = wrap.querySelector<HTMLElement>('.media');
  if (!media) return;
  gsap.fromTo(media,
    { scale: 0.85, borderRadius: 24, transformOrigin: '50% 0%' },
    {
      scale: 1, borderRadius: 10, ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 95%', end: 'top 35%', scrub: true },
    });
}
