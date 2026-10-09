// Pre-commit (fast): only the staged files. Styles → stylelint; any text file → banned strings; anything that can
// break EN/FR parity → the full i18n check (it is quick and needs both languages, not only the staged file).
export default {
  'src/**/*.{css,astro}': 'stylelint',
  '{src,public}/**/*.{astro,ts,mjs,mdx,md,css,json,svg,txt,html,xml}': 'node scripts/check-banned.mjs',
  '{src/content,src/i18n,src/data}/**/*': () => 'node scripts/check-i18n.mjs',
};
