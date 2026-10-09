import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One MDX file per project per language: src/content/projects/<lang>/<key>.mdx (id = "<lang>/<key>").
// Case study template (v3): header → overview sidebar → TL;DR (3 bullets) → chapters 01–06 → next project.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      lang: z.enum(['en', 'fr']),
      order: z.number(),
      title: z.string(),
      description: z.string().max(155),
      // featured = one of the three cards on the home page and /work; more = a one-line row.
      tier: z.enum(['featured', 'more']).default('more'),
      year: z.string(),
      // Small uppercase meta line on cards and the case-study header, e.g. "Research · Capstone · 2026".
      meta: z.string(),
      // One sentence: what changed.
      outcome: z.string(),
      // Exactly three bullets: the problem, what I built, the result (with a number).
      tldr: z.array(z.string()).length(3).optional(),
      status: z.string(),
      role: z.string(),
      timeline: z.string(),
      team: z.string(),
      stack: z.array(z.string()),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      codeNote: z.string().optional(),
      // The one big number on the card. Omit it until there is a real result (then `progress` shows instead).
      number: z.object({ value: z.string(), caption: z.string() }).optional(),
      progress: z.string().optional(),
      // Featured cards: one metric line under the outcome, e.g. "0.83 AUC · 85% accuracy, patient-level split".
      metric: z.string().optional(),
      // No screenshot yet: a before/after bar panel drawn from the two real numbers stands in as the card media.
      bars: z.object({
        title: z.string(),
        before: z.object({ label: z.string(), value: z.number(), text: z.string() }),
        after: z.object({ label: z.string(), value: z.number(), text: z.string() }),
      }).optional(),
      constraint: z.string(),
      tags: z.array(z.string()).max(4),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Real product loop for the card and case-study header (files in public/).
      loop: z.object({ webm: z.string(), mp4: z.string(), poster: z.string(), alt: z.string() }).optional(),
      diagram: z.enum(['dce', 'esaha', 'preparia']).optional(),
      caseStudy: z.boolean().default(true),
      // draft: the case-study page is built by `astro dev` only, never in production.
      draft: z.boolean().default(false),
      next: z.string(),
    }),
});

export const collections = { projects };
