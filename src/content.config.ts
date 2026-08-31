import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    locale: z.enum(['en', 'pt-br', 'zh-hans']),
    slug: z.string(),
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    authors: z.array(z.string()).default(['Forma Research Lab']),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
