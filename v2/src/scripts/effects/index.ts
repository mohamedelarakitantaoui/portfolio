// Effects loader. Each effect is one file in ./fx/<name>.ts and runs on elements marked data-fx="<name>".
// An effect's module is downloaded and initialised only when its element comes near the screen (half a viewport
// below), so nothing runs for sections nobody reaches. Remove an effect = delete its file and its data-fx attribute.
// Called from main.ts only when effects are allowed (kill switch, ?effects=off, reduced motion all checked there).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface FxContext { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; fine: boolean }
type FxModule = { default: (el: HTMLElement, ctx: FxContext) => void | Promise<void> };

const modules = import.meta.glob<FxModule>('./fx/*.ts');

export async function start() {
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  root.classList.add('fx-on');
  // Hover/cursor effects need a mouse; touch keeps native everything.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Native scrolling keeps keyboard, touch, anchors and browser find predictable.

  const ctx: FxContext = { gsap, ScrollTrigger, fine };
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      // One element may carry several effects: data-fx="media-grow card-tilt".
      for (const name of (el.dataset.fx ?? '').split(/\s+/).filter(Boolean)) {
        const load = modules[`./fx/${name}.ts`];
        if (!load) continue;
        load().then((m) => m.default(el, ctx)).then(() => ScrollTrigger.refresh()).catch(() => {});
      }
    }
  }, { rootMargin: '0px 0px 50% 0px' });
  document.querySelectorAll<HTMLElement>('[data-fx]').forEach((el) => io.observe(el));
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
