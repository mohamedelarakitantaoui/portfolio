// Progressive enhancement. Every page works without this file; it only adds behaviour.
import { buildIndex, MIN_SCORE, type Doc } from '../lib/bm25';
import { EFFECTS_ENABLED } from '../config';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Kill switch for every motion effect (scroll reveal included): src/config.ts, or ?effects=off in the URL.
const effectsOff = !EFFECTS_ENABLED || new URLSearchParams(location.search).get('effects') === 'off';
const root = document.documentElement;
const lang = root.lang === 'fr' ? 'fr' : 'en';
if (!reduce) root.classList.add('motion-ok');

// JS-only controls start hidden so they never appear broken without JS
$$('[data-palette-open], [data-copy], [data-term-form], [data-term-chips], [data-js-show]').forEach((el) => el.removeAttribute('hidden'));
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
$$('[data-kbd]').forEach((el) => (el.textContent = isMac ? '⌘ K' : 'Ctrl K'));

/* ---------------- menu ---------------- */
const menu = $<HTMLDialogElement>('#site-menu');
function openMenu() {
  if (!menu) return;
  menu.showModal();
}
$$('[data-menu-open]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openMenu(); }));
$$('[data-menu-close]').forEach((b) => b.addEventListener('click', () => menu?.close()));
$$('a', menu ?? document.createElement('div')).forEach((a) => a.addEventListener('click', () => menu?.close()));

/* ---------------- copy email ---------------- */
async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
$$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = $('[data-copy-label]', btn);
  const original = label?.textContent ?? '';
  let reset: ReturnType<typeof setTimeout>;
  btn.addEventListener('click', async () => {
    clearTimeout(reset);
    const ok = await copyText(btn.dataset.copy ?? '');
    if (label) label.textContent = ok ? btn.dataset.copied ?? 'Copied' : btn.dataset.copy ?? '';
    reset = setTimeout(() => label && (label.textContent = original), 2000);
  });
});

/* ---------------- Morocco clock (hero HUD) ---------------- */
// Without JS the HUD shows "GMT+1" and no time. Text updates only, so it runs with effects off too.
const clock = $('[data-clock]');
const tz = $('[data-tz]');
if (clock) {
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Casablanca', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Casablanca', timeZoneName: 'shortOffset' });
  const tick = () => {
    const d = new Date();
    clock.textContent = time.format(d);
    const z = offset.formatToParts(d).find((p) => p.type === 'timeZoneName');
    if (tz && z) tz.textContent = z.value;
  };
  tick();
  clock.removeAttribute('hidden');
  setInterval(tick, 1000);
}

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
    if (shown.length) input.setAttribute('aria-activedescendant', `pal-${active}`);
    else input.removeAttribute('aria-activedescendant');
    $(`#pal-${active}`, list)?.scrollIntoView({ block: 'nearest' });
  }
  async function run(it: PItem) {
    palette!.close();
    if (it.action === 'copy-email') { await copyText('elaraki48@gmail.com'); return; }
    if (it.action === 'ask') {
      const term = $('[data-terminal]');
      if (term) { const disclosure = term.closest('details'); if (disclosure) disclosure.open = true; term.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); $<HTMLInputElement>('.term__input', term)?.focus({ preventScroll: true }); }
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
    palette!.showModal();
    render();
    input.focus();
  }
  palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % Math.max(shown.length, 1); mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + shown.length) % Math.max(shown.length, 1); mark(); }
    else if (e.key === 'Home' && !input.value) { e.preventDefault(); active = 0; mark(); }
    else if (e.key === 'End' && !input.value) { e.preventDefault(); active = Math.max(shown.length - 1, 0); mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[active]) run(shown[active]); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : open(); }
  });
  $$('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
}

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
    // A group (Featured, More projects) with nothing left to show hides its heading too.
    $$('[data-filter-group]').forEach((g) => { g.hidden = !$$('[data-categories]', g).some((el) => !el.hidden); });
    if (status) status.textContent = (status.dataset.template ?? '{n}').replace('{n}', String(n));
  }));
  // The chips only work with JS, so they only appear with it.
  const bar = $('[data-filter-bar]');
  if (bar) bar.classList.add('is-ready'); // space reserved in CSS under html.js (no layout shift)
}

/* ---------------- contact form ---------------- */
const form = $<HTMLFormElement>('[data-contact-form]');
if (form) {
  const success = $('[data-form-success]');
  const fallback = $('[data-form-fallback]');
  const submit = $<HTMLButtonElement>('button[type="submit"]', form);
  let submitting = false;
  const topic = $<HTMLSelectElement>('#cf-topic', form);
  const requestedPack = new URLSearchParams(location.search).get('pack');
  if (topic && requestedPack === '01') topic.value = 'automation';
  if (topic && requestedPack === '02') topic.value = 'web-app';
  // Keep native validation available when JavaScript is disabled.
  form.noValidate = true;
  $$<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]', form).forEach((field) => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') !== 'true' || !field.checkValidity()) return;
      field.removeAttribute('aria-invalid');
      const error = document.getElementById(field.getAttribute('aria-describedby')?.split(' ')[0] ?? '');
      if (error) error.textContent = '';
    });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitting) return;
    let firstBad: HTMLInputElement | null = null;
    $$<HTMLInputElement>('input[required], textarea[required]', form).forEach((f) => {
      const err = document.getElementById(f.getAttribute('aria-describedby')?.split(' ')[0] ?? '');
      const bad = !f.checkValidity();
      f.setAttribute('aria-invalid', String(bad));
      if (err) err.textContent = bad ? (f.dataset.error ?? '') : '';
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) { (firstBad as HTMLInputElement).focus(); return; }
    submitting = true;
    form.setAttribute('aria-busy', 'true');
    if (submit) submit.disabled = true;
    fallback?.setAttribute('hidden', '');
    const data = new FormData(form);
    try {
      // FormSubmit's AJAX endpoint (data-endpoint) answers JSON: { success: "true" | "false", message }.
      const res = await fetch(form.dataset.endpoint || form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json().catch(() => ({})) as { success?: string | boolean };
      if (String(json.success) !== 'true') throw new Error('not sent');
      form.hidden = true;
      success?.removeAttribute('hidden');
      success?.focus();
    } catch {
      // The form service failed or isn't activated yet: hand the message to the visitor's email app instead.
      const subject = encodeURIComponent(`${topic?.selectedOptions[0]?.textContent ?? 'Contact'}: ${data.get('name') ?? ''}`);
      const text = encodeURIComponent(`${data.get('message') ?? ''}\n\n${data.get('name') ?? ''} <${data.get('email') ?? ''}>`);
      fallback?.removeAttribute('hidden');
      fallback?.focus();
      location.href = `mailto:elaraki48@gmail.com?subject=${subject}&body=${text}`;
    } finally {
      submitting = false;
      form.removeAttribute('aria-busy');
      if (submit) submit.disabled = false;
    }
  });
}

/* ---------------- looping videos: play only when visible and motion is OK ---------------- */
const loops = $$<HTMLVideoElement>('video[data-loop]');
if (loops.length && !reduce) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target as HTMLVideoElement;
    if (e.isIntersecting && !v.dataset.held) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.4 });
  loops.forEach((v) => io.observe(v));
}

// Play/pause button over a loop. Under reduced motion it is the only way to start it (big, centred).
$$<HTMLButtonElement>('[data-loop-toggle]').forEach((btn) => {
  const v = btn.parentElement?.querySelector<HTMLVideoElement>('video[data-loop]');
  const label = $('[data-loop-label]', btn);
  if (!v || !label) return;
  const sync = () => {
    const playing = !v.paused;
    btn.setAttribute('aria-pressed', String(playing));
    label.textContent = playing ? btn.dataset.pause! : btn.dataset.play!;
  };
  if (reduce) btn.classList.add('is-big');
  v.addEventListener('play', sync);
  v.addEventListener('pause', sync);
  btn.addEventListener('click', () => {
    btn.classList.remove('is-big');
    if (v.paused) { delete v.dataset.held; v.play().catch(() => {}); } else { v.dataset.held = '1'; v.pause(); }
  });
  sync();
  btn.removeAttribute('hidden');
});

/* ---------------- walkthrough dialog: [data-walk="<seconds>"] links open the full video there ---------------- */
const walk = $<HTMLDialogElement>('[data-walk-dialog]');
const walkVideo = walk && $<HTMLVideoElement>('video', walk);
if (walk && walkVideo) {
  const base = walkVideo.dataset.src!;
  $$<HTMLAnchorElement>('[data-walk]').forEach((a) => a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const t = Number(a.dataset.walk) || 0;
    walk.showModal();
    // Before metadata, a #t fragment is the reliable way to start mid-video; after, just seek.
    if (walkVideo.readyState >= 1) walkVideo.currentTime = t;
    else walkVideo.src = t ? `${base}#t=${t}` : base;
    walkVideo.play().catch(() => {});
  }));
  $('[data-walk-close]', walk)?.addEventListener('click', () => walk.close());
  walk.addEventListener('click', (e) => { if (e.target === walk) walk.close(); });
  walk.addEventListener('close', () => walkVideo.pause());
}

/* ---------------- scroll reveal (last, optional) ---------------- */
// Fade + 16px rise, once, for blocks marked [data-reveal] that start below the fold. Anything already on screen
// at load stays as it is, so nothing visible ever blinks out. Skipped entirely under reduced motion.
if (!reduce && !effectsOff && 'IntersectionObserver' in window) {
  const blocks = $$('[data-reveal]').filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  blocks.forEach((el) => { el.classList.add('is-pending'); io.observe(el); });
  // Fail-safe: anything still waiting after a jump (anchor, find-in-page, history restore) shows once the page is scrolled past it.
  window.addEventListener('scroll', () => {
    for (const el of blocks) if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
  }, { passive: true });
}

/* ---------------- effects (last, optional) ---------------- */
// Off with the kill switch, with ?effects=off, or under reduced motion: the page stays in its static version.
if (!reduce && !effectsOff) {
  const go = () => import('./effects').then((m) => m.start()).catch(() => {});
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200));
  if (document.readyState === 'complete') idle(go); else window.addEventListener('load', () => idle(go), { once: true });
}
