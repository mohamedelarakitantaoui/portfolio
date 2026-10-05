// Tiny inline formatter for data strings: escapes HTML, then
//   [[todo:…]] -> visible TODO(user) marker
//   **x**      -> <strong>
//   ✦          -> inline khatam star (aria-hidden)
export const STAR_PATH =
  'M50 0L64.64 14.64H85.36V35.36L100 50L85.36 64.64V85.36H64.64L50 100L35.36 85.36H14.64V64.64L0 50L14.64 35.36V14.64H35.36Z';

export const starSvg = (cls = 'star-glyph') =>
  `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path fill="currentColor" d="${STAR_PATH}"/></svg>`;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rich(input: string): string {
  return esc(input)
    .replace(/\[\[todo:(.+?)\]\]/g, (_m, t) => `<span class="todo">${t}</span>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/✦/g, starSvg());
}

/** Plain text (for meta tags, JSON-LD, the terminal corpus): drops TODO markers and formatting. */
export function plain(input: string): string {
  return input
    .replace(/\s*\[\[todo:.+?\]\]/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\s*✦\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export const hasTodo = (s: string) => /\[\[todo:/.test(s);
