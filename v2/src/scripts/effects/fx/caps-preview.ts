// Capabilities: hovering a row fades in a real image beside the cursor ([01] DCE bar panel, [02] AneuXplain heatmap,
// [03] AneuXplain 3D reconstruction). Wide screens with a mouse only; the previews are decorative (aria-hidden),
// the row text already says everything.
import type { FxContext } from '../index';

const W = 360, GAP = 28;

export default function capsPreview(section: HTMLElement, { gsap, fine }: FxContext) {
  if (!fine || !window.matchMedia('(min-width: 1024px)').matches) return;
  const box = section.querySelector<HTMLElement>('.caps__previews');
  if (!box) return;
  const items = new Map([...box.querySelectorAll<HTMLElement>('[data-preview-for]')].map((el) => [el.dataset.previewFor!, el]));
  const x = gsap.quickTo(box, 'x', { duration: 0.45, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: 0.45, ease: 'power3.out' });
  let first = true;

  const follow = (e: PointerEvent) => {
    const h = box.querySelector<HTMLElement>('.is-on')?.offsetHeight ?? 200;
    const right = e.clientX + GAP + W < window.innerWidth - 16;
    const tx = right ? e.clientX + GAP : e.clientX - GAP - W;
    const ty = Math.min(Math.max(16, e.clientY - h / 2), window.innerHeight - h - 16);
    if (first) { gsap.set(box, { x: tx, y: ty }); first = false; } else { x(tx); y(ty); }
  };

  section.querySelectorAll<HTMLElement>('.caps__row[data-preview]').forEach((row) => {
    const item = items.get(row.dataset.preview!);
    if (!item) return;
    row.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      items.forEach((el) => el.classList.toggle('is-on', el === item));
      follow(e);
    });
    row.addEventListener('pointermove', (e) => e.pointerType === 'mouse' && follow(e));
    row.addEventListener('pointerleave', () => { item.classList.remove('is-on'); first = !box.querySelector('.is-on'); });
  });
}
