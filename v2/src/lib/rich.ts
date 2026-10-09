// Tiny inline formatter for data strings: escapes HTML, then
//   [[todo:…]] -> TODO(user) marker in `astro dev`; removed entirely from production builds
//   **x**      -> <strong>

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Dev shows what is missing; a production build never ships a TODO (see the guard in astro.config.mjs).
export const DEV = import.meta.env.DEV;

export function rich(input: string): string {
  const src = DEV ? input : input.replace(/\s*\[\[todo:.+?\]\]/g, '');
  return esc(src)
    .replace(/\[\[todo:(.+?)\]\]/g, (_m, t) => `<span class="todo">${t}</span>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Plain text (for meta tags, JSON-LD, the terminal corpus): drops TODO markers and formatting. */
export function plain(input: string): string {
  return input
    .replace(/\s*\[\[todo:.+?\]\]/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export const hasTodo = (s: string) => /\[\[todo:/.test(s);

/** True when a value is nothing but TODO markers (an unknown fact). */
export const todoOnly = (s: string) => plain(s) === '';

/** Should this field render? Always in dev; in production only when it holds a real fact. */
export const shows = (s?: string | null): s is string => !!s && (DEV || !todoOnly(s));
