// About: "I build models that are [explainable / calibrated / tested / shipped]." The saffron word slides up every
// 2.2 s while the line is on screen and stops when it leaves. Screen readers get the one full sentence (sr-only);
// the rolling copy is aria-hidden. Without this effect the paragraph is that same sentence, in plain text.
import type { FxContext } from '../index';

export default function rollWord(p: HTMLElement, { gsap, ScrollTrigger }: FxContext) {
  const words: string[] = JSON.parse(p.dataset.words ?? '[]');
  const lead = p.dataset.lead ?? '';
  if (words.length < 2) return;

  const sentence = document.createElement('span');
  sentence.className = 'sr-only';
  sentence.textContent = p.textContent ?? '';
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  const roll = document.createElement('span');
  roll.className = 'roll';
  const els = words.map((w) => {
    const s = document.createElement('span');
    s.className = 'roll__w';
    s.textContent = `${w}.`; // the full stop rides with the word, so a short word leaves no gap before it
    roll.append(s);
    return s;
  });
  visual.append(`${lead} `, roll);
  // The static sentence can wrap to more lines than the rolling one: keep its height so nothing below moves.
  p.style.minHeight = `${p.offsetHeight}px`;
  p.replaceChildren(sentence, visual);

  gsap.set(els.slice(1), { yPercent: 110 });
  const tl = gsap.timeline({ repeat: -1, paused: true });
  els.forEach((el, i) => {
    const next = els[(i + 1) % els.length];
    const at = 2.2 * (i + 1) - 0.6;
    tl.to(el, { yPercent: -110, duration: 0.6, ease: 'power3.inOut' }, at)
      .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'power3.inOut', immediateRender: false }, at);
  });
  ScrollTrigger.create({
    trigger: p,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });
}
