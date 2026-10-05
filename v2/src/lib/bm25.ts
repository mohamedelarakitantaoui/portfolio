// BM25 over the ask-mamoun corpus. Runs at build (static transcript) and in the browser (live terminal).
export interface Doc { id: string; title: string; text: string; answer: string; tags: string }
export interface Hit { doc: Doc; score: number }

const STOP = new Set(
  ('a an and are as at be by can do does for from has have how i in is it its me my of on or so that the this to was what when where which why with you your ' +
    'about tell did done any much many there their them they we our us will would could should into than then also just ' +
    'le la les un une des de du et est en au aux ce cet cette ces que qui quoi quel quelle quels quelles pour par sur dans avec vous tu je mon ma mes ton ta tes son sa ses il elle on ne pas plus ou où comment est-ce avez as-tu fait')
    .split(' '),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+#]+/g, ' ')
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w));
}

export function buildIndex(docs: Doc[]) {
  const toks = docs.map((d) => tokenize(`${d.title} ${d.text} ${d.tags} ${d.tags}`));
  const N = docs.length;
  const avgdl = toks.reduce((a, t) => a + t.length, 0) / N;
  const df = new Map<string, number>();
  const tfs = toks.map((t) => {
    const m = new Map<string, number>();
    for (const w of t) m.set(w, (m.get(w) ?? 0) + 1);
    for (const w of m.keys()) df.set(w, (df.get(w) ?? 0) + 1);
    return m;
  });
  const idf = (w: string) => {
    const n = df.get(w) ?? 0;
    return Math.log(1 + (N - n + 0.5) / (n + 0.5));
  };
  const k1 = 1.2;
  const b = 0.75;
  return function search(query: string, k = 3): Hit[] {
    const q = [...new Set(tokenize(query))];
    if (!q.length) return [];
    return docs
      .map((doc, i) => {
        const tf = tfs[i];
        const dl = toks[i].length;
        let score = 0;
        for (const w of q) {
          const f = tf.get(w);
          if (!f) continue;
          score += idf(w) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * dl) / avgdl)));
        }
        return { doc, score };
      })
      .filter((h) => h.score > 0)
      .sort((a, z) => z.score - a.score)
      .slice(0, k);
  };
}

/** Below this, the terminal says it doesn't know rather than guessing. Tuned on the corpus. */
export const MIN_SCORE = 2.2;
