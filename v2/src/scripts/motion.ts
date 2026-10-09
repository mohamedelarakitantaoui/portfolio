// Motion, added last to pages that already work. Only loaded when prefers-reduced-motion is off,
// after the page is idle. Vocabulary (5 + the terminal): hero settle/letter stagger, headline line-mask
// reveal, scroll-scrubbed statement, sticky work column (CSS), floating Menu pill (main.ts).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export async function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const ease = 'expo.out'; // ≈ cubic-bezier(.22,1,.36,1)
  const root = document.documentElement;

  // Smooth scroll on fine pointers only (touch keeps native scrolling), driven by GSAP's ticker
  // so ScrollTrigger never reads stale positions.
  if (window.matchMedia('(pointer: fine)').matches) {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ duration: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href')!;
        if (id.length < 2 || a.hasAttribute('data-menu-open')) return;
        const target = document.querySelector<HTMLElement>(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -24 });
        target.focus?.({ preventScroll: true });
      });
    });
  }
  window.__st = ScrollTrigger;

  // 1. Hero: first visit only, under the preloader. Transform only, so the portrait (the LCP image)
  //    is painted from the start.
  const underPreloader = root.classList.contains('is-preloading') && performance.now() < 600;
  if (underPreloader) {
    gsap.timeline({ delay: Math.max(0, 0.62 - performance.now() / 1000) })
      .from('.hero__letter', { yPercent: 40, duration: 1.2, ease, stagger: 0.03 }, 0)
      .from('.hero__portrait', { scale: 1.06, duration: 1.2, ease, transformOrigin: '50% 100%' }, 0.05);
  }

  await document.fonts.ready;

  // 2. Headline line-mask reveal: split lazily, each h2 only when it reaches the viewport.
  //    Headings already on screen at load are left alone.
  const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal-lines]'))
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  pending.forEach((el) => el.classList.add('rv-pending'));
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
      // Display headings run at line-height ~0.95, so glyph tops and descenders overflow each line box.
      // Give every mask wrapper room (padding cancelled by negative margin) and clip there, never on the section.
      split.masks.forEach((m) => {
        const s = (m as HTMLElement).style;
        s.overflow = 'clip';
        s.paddingBlock = '0.14em';
        s.marginBlock = '-0.14em';
      });
      el.classList.remove('rv-pending');
      gsap.from(split.lines, { yPercent: 100, duration: 0.8, ease, stagger: 0.08, onComplete: () => split.revert() });
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  pending.forEach((el) => io.observe(el));

  // 3. Statement: words light up grey -> bone with scroll
  const statement = document.querySelector<HTMLElement>('[data-statement]');
  if (statement) {
    const words = Array.from(statement.querySelectorAll<HTMLElement>('.w'));
    let lit = -1;
    ScrollTrigger.create({
      trigger: statement,
      start: 'top 80%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length);
        if (n === lit) return;
        lit = n;
        words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
      },
    });
    ScrollTrigger.refresh();
  }
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
