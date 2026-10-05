// Progressive enhancement. Every page works without this file; it only adds behaviour.
import { buildIndex, MIN_SCORE, type Doc } from '../lib/bm25';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const lang = root.lang === 'fr' ? 'fr' : 'en';
if (!reduce) root.classList.add('motion-ok');

// JS-only controls start hidden so they never appear broken without JS
$$('[data-palette-open], [data-copy], .menu-pill, [data-term-form], [data-term-chips], [data-js-show]').forEach((el) => el.removeAttribute('hidden'));
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
$$('[data-kbd]').forEach((el) => (el.textContent = isMac ? '⌘ K' : 'Ctrl K'));

/* ---------------- menu + floating pill ---------------- */
const menu = $<HTMLDialogElement>('#site-menu');
const pill = $<HTMLButtonElement>('.menu-pill');
function openMenu() {
  if (!menu) return;
  menu.showModal();
  window.__lenis?.stop();
}
menu?.addEventListener('close', () => window.__lenis?.start());
$$('[data-menu-open]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openMenu(); }));
$$('[data-menu-close]').forEach((b) => b.addEventListener('click', () => menu?.close()));
$$('a', menu ?? document.createElement('div')).forEach((a) => a.addEventListener('click', () => menu?.close()));

const heroEl = $('.hero');
const hero = heroEl ?? $('#site-header');
if (pill && hero) {
  pill.classList.add('is-hidden');
  pill.setAttribute('tabindex', '-1');
  new IntersectionObserver(([entry]) => {
    const show = !entry.isIntersecting;
    pill.classList.toggle('is-hidden', !show);
    pill.toggleAttribute('inert', !show);
    pill.setAttribute('tabindex', show ? '0' : '-1');
  }, { rootMargin: heroEl ? '-40% 0px 0px 0px' : '0px' }).observe(hero);
}

/* ---------------- copy email ---------------- */
async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
$$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const label = $('[data-copy-label]', btn);
    const original = label?.textContent ?? '';
    const ok = await copyText(btn.dataset.copy ?? '');
    if (label) label.textContent = ok ? btn.dataset.copied ?? 'Copied' : btn.dataset.copy ?? '';
    setTimeout(() => label && (label.textContent = original), 2000);
  });
});

/* ---------------- command palette ---------------- */
interface PItem { kind: string; label: string; href?: string; action?: string; keys?: string; download?: boolean; external?: boolean }
const palette = $<HTMLDialogElement>('#palette');
const pdata = $('#palette-data');
if (palette && pdata) {
  const { items, home } = JSON.parse(pdata.textContent || '{}') as { items: PItem[]; home: string };
  const input = $<HTMLInputElement>('#palette-input', palette)!;
  const list = $<HTMLUListElement>('#palette-list', palette)!;
  const empty = $('.palette__empty', palette)!;
  let shown: PItem[] = items;
  let active = 0;
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function render() {
    const q = norm(input.value.trim());
    shown = q ? items.filter((it) => q.split(/\s+/).every((w) => norm(`${it.label} ${it.keys ?? ''}`).includes(w))) : items;
    active = Math.min(active, Math.max(shown.length - 1, 0));
    list.replaceChildren(
      ...shown.map((it, i) => {
        const li = document.createElement('li');
        li.id = `pal-${i}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', String(i === active));
        const l = document.createElement('span');
        l.textContent = it.label;
        const k = document.createElement('span');
        k.className = 'palette__kind';
        k.textContent = it.kind;
        li.append(l, k);
        li.addEventListener('click', () => run(it));
        li.addEventListener('mousemove', () => { if (active !== i) { active = i; mark(); } });
        return li;
      }),
    );
    empty.hidden = shown.length > 0;
    mark();
  }
  function mark() {
    $$('li', list).forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', shown.length ? `pal-${active}` : '');
    $(`#pal-${active}`, list)?.scrollIntoView({ block: 'nearest' });
  }
  async function run(it: PItem) {
    palette!.close();
    if (it.action === 'copy-email') { await copyText('elaraki48@gmail.com'); return; }
    if (it.action === 'toggle-theme') { toggleTheme(); return; }
    if (it.action === 'ask') {
      const term = $('[data-terminal]');
      if (term) { term.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); $<HTMLInputElement>('.term__input', term)?.focus({ preventScroll: true }); }
      else location.href = `${home === '/' ? '' : home}#lab`;
      return;
    }
    if (!it.href) return;
    if (it.download) { const a = document.createElement('a'); a.href = it.href; a.download = ''; a.click(); return; }
    if (it.external) { window.open(it.href, '_blank', 'noopener'); return; }
    location.href = it.href;
  }
  function open() {
    if (palette!.open) return;
    input.value = '';
    active = 0;
    render();
    palette!.showModal();
    window.__lenis?.stop();
    input.focus();
  }
  palette.addEventListener('close', () => window.__lenis?.start());
  palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % Math.max(shown.length, 1); mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + shown.length) % Math.max(shown.length, 1); mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[active]) run(shown[active]); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : open(); }
  });
  $$('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
}

/* ---------------- theme ---------------- */
function toggleTheme() {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#ede6da' : '#0f0d0c');
}
$$('[data-theme-toggle]').forEach((b) => {
  b.removeAttribute('hidden');
  b.addEventListener('click', toggleTheme);
});

/* ---------------- ask-mamoun terminal ---------------- */
const term = $('[data-terminal]');
if (term) {
  const screen = $('[data-term-screen]', term)!;
  const form = $<HTMLFormElement>('[data-term-form]', term)!;
  const input = $<HTMLInputElement>('.term__input', term)!;
  let search: ((q: string, k?: number) => { doc: Doc; score: number }[]) | null = null;
  let size = 0;
  let skip = false;
  const T = lang === 'fr'
    ? { retrieved: 'retrouvé', of: 'sur', chunks: 'notes', none: 'Je n’ai pas ça dans mes notes. Écrivez-moi : elaraki48@gmail.com', loading: 'chargement des notes…', fail: 'Impossible de charger les notes. Réessayez.' }
    : { retrieved: 'retrieved', of: 'of', chunks: 'chunks', none: "I don't have that in my notes. Email me: elaraki48@gmail.com", loading: 'loading notes…', fail: 'Could not load the notes. Try again.' };

  async function ensureIndex() {
    if (search) return true;
    try {
      const res = await fetch(term!.dataset.src!);
      const data = (await res.json()) as { chunks: Doc[] };
      size = data.chunks.length;
      search = buildIndex(data.chunks);
      return true;
    } catch { return false; }
  }
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  function line(cls: string, parts: [string, string?][]) {
    const p = document.createElement('p');
    p.className = cls;
    for (const [text, c] of parts) {
      const s = document.createElement('span');
      if (c) s.className = c;
      s.textContent = text;
      p.append(s);
    }
    return p;
  }
  async function typeInto(el: HTMLElement, text: string) {
    if (reduce || skip) { el.textContent = text; return; }
    for (let i = 0; i < text.length; i += 2) {
      if (skip) { el.textContent = text; return; }
      el.textContent = text.slice(0, i + 2);
      await wait(14);
    }
  }
  let busy = false;
  async function ask(q: string) {
    q = q.trim().slice(0, 140);
    if (!q || busy) return;
    busy = true;
    skip = false;
    const block = document.createElement('div');
    block.className = 'term__block';
    block.append(line('', [['$', 'term__ps'], [` ask-mamoun "${q}"`]]));
    screen.append(block);
    if (!search) { block.append(line('term__dim', [[T.loading]])); }
    const ok = await ensureIndex();
    if (!ok) { block.append(line('term__dim', [[T.fail]])); busy = false; return; }
    const hits = search!(q);
    block.append(line('term__dim', [[`${T.retrieved} (BM25, top ${hits.length} ${T.of} ${size} ${T.chunks})`]]));
    for (const h of hits) {
      if (!reduce && !skip) await wait(90);
      block.append(line('term__hit', [[h.score.toFixed(2), 'term__score'], [h.doc.id, 'term__id'], [h.doc.text.slice(0, 64) + '…', 'term__snip']]));
      screen.scrollTop = screen.scrollHeight;
    }
    const ans = line('term__answer', [['answer', 'term__arrow']]);
    const body = document.createElement('span');
    ans.append(' ', body);
    block.append(ans);
    const text = hits.length && hits[0].score >= MIN_SCORE ? hits[0].doc.answer : T.none;
    await typeInto(body, text);
    screen.scrollTop = screen.scrollHeight;
    busy = false;
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
  $$<HTMLButtonElement>('.term__chip', term).forEach((b) => b.addEventListener('click', () => ask(b.dataset.q ?? '')));
  term.addEventListener('keydown', () => { if (busy) skip = true; });
  term.addEventListener('pointerdown', () => { if (busy) skip = true; });
  input.addEventListener('focus', () => { ensureIndex(); }, { once: true });
}

/* ---------------- /work filters ---------------- */
const filters = $$<HTMLButtonElement>('[data-filter]');
if (filters.length) {
  const items = $$('[data-categories]');
  const status = $('[data-filter-status]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    const key = btn.dataset.filter!;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let n = 0;
    items.forEach((el) => {
      const show = key === 'all' || (el.dataset.categories ?? '').split(' ').includes(key);
      el.hidden = !show;
      if (show) n++;
    });
    if (status) status.textContent = (status.dataset.template ?? '{n}').replace('{n}', String(n));
    window.__st?.refresh();
  }));
}

/* ---------------- contact form ---------------- */
const form = $<HTMLFormElement>('[data-contact-form]');
if (form) {
  const params = new URLSearchParams(location.search);
  const forParam = params.get('for');
  const who = $<HTMLSelectElement>('select[name="who"]', form);
  if (who && forParam === 'role') who.value = 'recruiter';
  if (who && forParam === 'project') who.value = 'client';
  const success = $('[data-form-success]');
  const fallback = $('[data-form-fallback]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstBad: HTMLInputElement | null = null;
    $$<HTMLInputElement>('input[required], textarea[required]', form).forEach((f) => {
      const err = document.getElementById(f.getAttribute('aria-describedby') ?? '');
      const bad = !f.checkValidity();
      f.setAttribute('aria-invalid', String(bad));
      if (err) err.textContent = bad ? (f.dataset.error ?? '') : '';
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) { (firstBad as HTMLInputElement).focus(); return; }
    const data = new FormData(form);
    const body = new URLSearchParams(data as unknown as Record<string, string>).toString();
    try {
      const res = await fetch(form.getAttribute('action') || '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      success?.removeAttribute('hidden');
      success?.focus();
    } catch {
      // No form backend on this host: hand the message to the visitor's email app instead.
      const subject = encodeURIComponent(`${data.get('who') ?? ''}: ${data.get('name') ?? ''}`);
      const text = encodeURIComponent(`${data.get('message') ?? ''}\n\n${data.get('name') ?? ''} <${data.get('email') ?? ''}>`);
      fallback?.removeAttribute('hidden');
      fallback?.focus();
      location.href = `mailto:elaraki48@gmail.com?subject=${subject}&body=${text}`;
    }
  });
}

/* ---------------- looping videos: play only when visible and motion is OK ---------------- */
const loops = $$<HTMLVideoElement>('video[data-loop]');
if (loops.length && !reduce) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target as HTMLVideoElement;
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.4 });
  loops.forEach((v) => io.observe(v));
}

/* ---------------- motion (last, optional) ---------------- */
if (!reduce) {
  const start = () => import('./motion').then((m) => m.init()).catch(() => {});
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') idle(start); else window.addEventListener('load', () => idle(start), { once: true });
}

declare global {
  interface Window { __lenis?: { stop(): void; start(): void; scrollTo(t: Element | number, o?: object): void }; __st?: { refresh(): void } }
}
