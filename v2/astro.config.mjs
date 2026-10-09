// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = process.env.SITE_URL || 'https://mamounelaraki.com';

/** Fails `astro build` if a TODO(user) marker would reach a public page. Dev builds still show them. */
function noTodoInProduction() {
  /** @type {(d: string) => string[]} */
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  return {
    name: 'no-todo-in-production',
    hooks: {
      /** @param {{ dir: URL, logger: import('astro').AstroIntegrationLogger }} options */
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        /** @type {string[]} */
        const bad = [];
        for (const f of walk(root).filter((f) => /\.(html|json|xml|txt)$/.test(f))) {
          // Inlined <style> holds the dev-only `.todo` rule; only markup and text matter here.
          const text = fs.readFileSync(f, 'utf8').replace(/<style[\s\S]*?<\/style>/g, '');
          const m = text.match(/TODO\(user\)|\[\[todo:|class="todo[\s"]/);
          if (m) bad.push(`${path.relative(root, f)} (${m[0]})`);
        }
        if (bad.length) throw new Error(`TODO markers in the production build:\n  ${bad.join('\n  ')}`);
        logger.info('No TODO(user) markers in the production build.');
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/og/') && !page.endsWith('/sent/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
    }),
    noTodoInProduction(),
  ],
});
