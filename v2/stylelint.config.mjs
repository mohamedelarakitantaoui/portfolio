// Style guardrails: every colour, font, size, z-index and duration comes from src/styles/tokens.css.
// tokens.css is the only file allowed raw values. No !important (the few legitimate ones in base.css carry a
// stylelint-disable comment with the reason). Runs on .css and on the <style> blocks of .astro files.
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-declaration-strict-value'],
  ignoreFiles: ['src/styles/tokens.css', 'src/styles/fonts.css', 'dist/**', 'node_modules/**'],
  overrides: [{ files: ['**/*.astro', '**/*.html'], customSyntax: 'postcss-html' }],
  rules: {
    'declaration-no-important': true,
    'color-no-hex': true,
    'color-named': ['never', { ignore: ['inside-function'] }],
    'scale-unlimited/declaration-strict-value': [
      ['color', 'background-color', 'border-color', 'fill', 'stroke', 'font-family', 'font-size', 'z-index', 'transition-duration'],
      {
        ignoreValues: ['inherit', 'currentColor', 'currentcolor', 'transparent', 'none', 'initial', 'unset', '1em', 'inherit', '0'],
        disableFix: true,
        message: 'Use a token: var(--…) from src/styles/tokens.css (add one there if needed) for "${property}", not "${value}".',
      },
    ],
  },
};
