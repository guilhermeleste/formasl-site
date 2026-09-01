import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = z.object({
  locale: z.enum(['en', 'pt-br', 'zh-hans']),
  slug: z.string(),
  translationKey: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  authors: z.array(z.string()).optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  seriesKey: z.string().optional(),
  part: z.coerce.number().int().min(1).optional(),
  hero: z.string().optional(),
  heroAlt: z.string().optional(),
  socialImage: z.string().optional(),
  draft: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (Boolean(data.hero) !== Boolean(data.heroAlt)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: data.hero ? ['heroAlt'] : ['hero'],
      message: 'hero and heroAlt must be provided together',
    });
  }
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: blogSchema,
});

export const collections = { blog };
