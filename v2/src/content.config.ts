import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One MDX file per project per language: src/content/projects/<lang>/<key>.mdx (id = "<lang>/<key>").
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      lang: z.enum(['en', 'fr']),
      order: z.number(),
      title: z.string(),
      description: z.string().max(155),
      categories: z.array(z.enum(['ai', 'automation', 'web', 'research'])),
      kind: z.string(),
      status: z.string(),
      summary: z.string(),
      role: z.string(),
      timeline: z.string(),
      team: z.string(),
      platforms: z.string(),
      stack: z.array(z.string()),
      languages: z.string().optional(),
      venue: z.string().optional(),
      supervision: z.string().optional(),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      codeNote: z.string().optional(),
      number: z.object({ value: z.string(), caption: z.string() }),
      constraint: z.string(),
      tags: z.array(z.string()),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      diagram: z.enum(['dce', 'rag', 'aneu', 'esaha', 'preparia']),
      next: z.string(),
    }),
});

export const collections = { projects };
