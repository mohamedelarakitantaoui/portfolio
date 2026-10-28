// Base-path helpers for sub-folder hosting (GitHub Pages: /portfolio/). They live in src/i18n/ui.ts, which must stay
// import-free for scripts/check-i18n.mjs; components import them from here. Every hand-written internal URL goes
// through withBase() (or lp(), which already uses it).
export { BASE, withBase, stripBase } from '../i18n/ui';
