import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';
import { getEditorialMeta, SERIES_KEY } from '../data/editorial';

function latestComparator(a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) {
  const dateDiff = b.data.date.valueOf() - a.data.date.valueOf();
  if (dateDiff) return dateDiff;
  const aPart = getEditorialMeta(a.data).part ?? 0;
  const bPart = getEditorialMeta(b.data).part ?? 0;
  const partDiff = bPart - aPart;
  if (partDiff) return partDiff;
  return a.data.slug.localeCompare(b.data.slug);
}

export async function getPublishedPosts(locale?: Locale) {
  const entries = await getCollection('blog', ({ data }) => !data.draft && (!locale || data.locale === locale));
  return entries.sort(latestComparator);
}

export async function getSeriesPosts(locale: Locale, seriesKey = SERIES_KEY) {
  const entries = await getCollection('blog', ({ data }) => {
    if (data.draft || data.locale !== locale) return false;
    return getEditorialMeta(data).seriesKey === seriesKey;
  });
  return entries.sort((a, b) => {
    const aPart = getEditorialMeta(a.data).part ?? Number.MAX_SAFE_INTEGER;
    const bPart = getEditorialMeta(b.data).part ?? Number.MAX_SAFE_INTEGER;
    return aPart - bPart || a.data.slug.localeCompare(b.data.slug);
  });
}

export async function getTranslations(translationKey: string) {
  const entries = await getCollection('blog', ({ data }) => !data.draft && data.translationKey === translationKey);
  return Object.fromEntries(entries.map((entry) => [entry.data.locale, entry.data.slug]));
}

export async function getSeriesNeighbors(post: CollectionEntry<'blog'>) {
  const meta = getEditorialMeta(post.data);
  if (!meta.seriesKey) return { previous: null, next: null };
  const posts = await getSeriesPosts(post.data.locale, meta.seriesKey);
  const index = posts.findIndex((entry) => entry.data.slug === post.data.slug);
  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
