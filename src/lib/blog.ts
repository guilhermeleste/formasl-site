import { getCollection } from 'astro:content';
import type { Locale } from './i18n';

export async function getPublishedPosts(locale?: Locale) {
  const entries = await getCollection('blog', ({ data }) => !data.draft && (!locale || data.locale === locale));
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTranslations(translationKey: string) {
  const entries = await getCollection('blog', ({ data }) => !data.draft && data.translationKey === translationKey);
  return Object.fromEntries(entries.map((entry) => [entry.data.locale, entry.data.slug]));
}
