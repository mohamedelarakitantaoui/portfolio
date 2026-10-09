// Effects loader. Each effect is one file in ./fx/<name>.ts and runs on elements marked data-fx="<name>".
// An effect's module is downloaded and initialised only when its element comes near the screen (half a viewport
// below), so nothing runs for sections nobody reaches. Remove an effect = delete its file and its data-fx attribute.
// Called from main.ts only when effects are allowed (kill switch, ?effects=off, reduced motion all checked there).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

export interface FxContext { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; fine: boolean }
type FxModule = { default: (el: HTMLElement, ctx: FxContext) => void | Promise<void> };

const modules = import.meta.glob<FxModule>('./fx/*.ts');

export async function start() {
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  root.classList.add('fx-on');
  // Hover/cursor effects need a mouse; touch keeps native everything.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Smooth wheel scrolling on mouse devices only, driven by GSAP's ticker so ScrollTrigger never reads stale
  // positions. Keyboard scrolling, anchors and find-in-page keep working (Lenis listens to native scroll).
  if (fine) {
    const { default: Lenis } = await import('lenis');
    // allowNestedScroll: a scrollable box (the terminal output) scrolls first, then the wheel goes back to the page.
    const lenis = new Lenis({ duration: 1.1, allowNestedScroll: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2 || a.hasAttribute('data-menu-open')) return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -24 });
      target.focus?.({ preventScroll: true });
    }));
    // Any open modal dialog (menu, palette, walkthrough) pauses smooth scrolling.
    const sync = () => (document.querySelector('dialog[open]') ? lenis.stop() : lenis.start());
    document.querySelectorAll('dialog').forEach((d) => new MutationObserver(sync).observe(d, { attributes: true, attributeFilter: ['open'] }));
  }

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

declare global {
  interface Window { __lenis?: Lenis }
}
