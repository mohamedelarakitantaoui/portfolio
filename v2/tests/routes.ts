// Every route of the built site (dist/), read from disk so new pages are tested without editing the tests.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const walk = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

export const routes: string[] = fs.existsSync(DIST)
  ? walk(DIST)
      .filter((f) => f.endsWith('index.html') || f.endsWith('404.html'))
      .map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, ''))
      .map((r) => (r === '/' ? r : r.replace(/\/$/, '')))
      .sort()
  : [];

export const langOf = (route: string) => (route === '/fr' || route.startsWith('/fr/') ? 'fr' : 'en');
export const twinOf = (route: string) => (langOf(route) === 'fr' ? route.replace(/^\/fr/, '') || '/' : route === '/' ? '/fr' : `/fr${route}`);

/** Text that is on screen but invisible (opacity < 0.99 through its ancestors), ignoring decorative and sr-only parts. */
export const hiddenTextScript = () => [...document.querySelectorAll('main *, footer *, header *')]
  .filter((el) => {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim())) return false;
    if (el.closest('[aria-hidden="true"], .sr-only, .caps__previews, dialog, .skip-link, [hidden]')) return false;
    let o = 1;
    for (let e: Element | null = el; e && e !== document.body; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
    return o < 0.99;
  })
  .map((el) => `${el.tagName.toLowerCase()}.${(el as HTMLElement).className}`.slice(0, 60));
