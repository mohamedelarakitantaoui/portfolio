// Every project has a page: a case study (`caseStudy: true`) or a short project page. One list, one order (`order`),
// used by /work, the home rows, the previous / next links, the command palette and the OG images.
import { getCollection, type CollectionEntry } from 'astro:content';
import { moreProjects } from '../data/site';
import { type Lang, lp } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;
export const CATEGORIES = ['ml', 'automation', 'web', 'research'] as const;

/** All projects in one language, in display order. Drafts exist in `astro dev` only. */
export async function allProjects(lang: Lang): Promise<Project[]> {
  const list = await getCollection('projects', (p) => p.data.lang === lang && (import.meta.env.DEV || !p.data.draft));
  // Guard: a "More projects" row without a page would be a dead end.
  for (const m of moreProjects) {
    if (!list.some((p) => p.data.key === m.key)) throw new Error(`site.ts moreProjects "${m.key}" has no src/content/projects/${lang}/${m.key}.mdx`);
  }
  return list.sort((a, b) => a.data.order - b.data.order);
}

export const projectHref = (lang: Lang, key: string) => lp(lang, `/work/${key}`);

/** The projects before and after `key`, cycling through all of them. */
export function neighbours(list: Project[], key: string): { prev: Project; next: Project } | null {
  const i = list.findIndex((p) => p.data.key === key);
  if (i < 0 || list.length < 2) return null;
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}
