import type { CollectionEntry } from 'astro:content';
import { getAuthor, getEditorialMeta, getSeries } from '../data/editorial';
import { editorialDateISO } from './dates';
import { absoluteUrl, copy, localeMeta, localePath, type Locale } from './i18n';

const orgId = absoluteUrl('/#forma-research-lab');
const authorId = absoluteUrl('/#guilherme-leste');

export function organizationNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    '@id': orgId,
    name: 'Forma Research Lab',
    url: absoluteUrl('/'),
  };
}

export function personNode(locale: Locale) {
  const author = getAuthor('guilherme-leste')!;
  return {
    '@type': 'Person',
    '@id': authorId,
    name: author.name,
    jobTitle: author.roles[locale],
    affiliation: { '@id': orgId },
  };
}

export function articleStructuredData(locale: Locale, post: CollectionEntry<'blog'>, canonicalPath: string, socialImagePath: string) {
  const meta = getEditorialMeta(post.data);
  const series = getSeries(meta.seriesKey);
  const datePublished = editorialDateISO(post.data.date);
  const dateModified = editorialDateISO(post.data.updated ?? post.data.date);
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(canonicalPath)}#article`,
    mainEntityOfPage: absoluteUrl(canonicalPath),
    headline: post.data.title,
    description: post.data.description,
    inLanguage: localeMeta[locale].htmlLang,
    datePublished,
    dateModified,
    image: absoluteUrl(socialImagePath),
    author: personNode(locale),
    publisher: { '@type': 'ResearchOrganization', '@id': orgId, name: 'Forma Research Lab' },
    ...(series ? {
      isPartOf: {
        '@type': 'CreativeWorkSeries',
        '@id': `${absoluteUrl(localePath(locale, 'blog'))}#series`,
        name: series.titles[locale],
        url: absoluteUrl(localePath(locale, 'blog')),
      },
      position: meta.part,
    } : {}),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'FormaSL', item: absoluteUrl(localePath(locale)) },
      { '@type': 'ListItem', position: 2, name: copy[locale].blog, item: absoluteUrl(localePath(locale, 'blog')) },
      { '@type': 'ListItem', position: 3, name: post.data.title, item: absoluteUrl(canonicalPath) },
    ],
  };
  return [article, breadcrumb];
}

export function seriesStructuredData(locale: Locale, posts: CollectionEntry<'blog'>[]) {
  const firstMeta = posts[0] ? getEditorialMeta(posts[0].data) : undefined;
  const series = getSeries(firstMeta?.seriesKey);
  if (!series) return [];
  const seriesUrl = absoluteUrl(localePath(locale, 'blog'));
  const parts = posts.map((post) => {
    const meta = getEditorialMeta(post.data);
    return {
      '@type': 'BlogPosting',
      position: meta.part,
      name: post.data.title,
      url: absoluteUrl(localePath(locale, `blog/${post.data.slug}`)),
      author: personNode(locale),
    };
  });
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWorkSeries',
      '@id': `${seriesUrl}#series`,
      name: series.titles[locale],
      description: series.descriptions[locale],
      inLanguage: localeMeta[locale].htmlLang,
      url: seriesUrl,
      author: personNode(locale),
      publisher: { '@type': 'ResearchOrganization', '@id': orgId, name: 'Forma Research Lab' },
      hasPart: parts,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: series.titles[locale],
      itemListElement: parts.map((part) => ({ '@type': 'ListItem', position: part.position, url: part.url, name: part.name })),
    },
  ];
}
