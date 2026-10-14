// Word scrub (v5 About statement): the claim's words light up from dim to bone as the section scrolls through the
// viewport. Opacity only, scrubbed to the scroll position. Without this effect (kill switch, ?effects=off, reduced
// motion) the claim renders at full strength. Screen readers get the original text through aria-label.
import type { FxContext } from '../index';

export default function wordScrub(el: HTMLElement, { gsap }: FxContext) {
  const text = el.textContent?.trim();
  if (!text) return;
  el.setAttribute('aria-label', text);
  el.innerHTML = text.split(/\s+/).map((w) => `<span class="w" aria-hidden="true">${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join(' ');
  gsap.fromTo(el.querySelectorAll('.w'), { opacity: 0.3 }, {
    opacity: 1, ease: 'none', stagger: 0.1,
    scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true },
  });
}
