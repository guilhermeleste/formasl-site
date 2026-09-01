import { getAuthor, getEditorialMeta, getSeries } from '../data/editorial';
import { getPublishedPosts } from './blog';
import { editorialRssDate } from './dates';
import { absoluteUrl, copy, localeMeta, localePath, type Locale } from './i18n';
import { xmlEscape } from './xml';

export async function rssResponse(locale: Locale): Promise<Response> {
  const posts = await getPublishedPosts(locale);
  const items = posts.map((post) => {
    const meta = getEditorialMeta(post.data);
    const author = getAuthor(meta.authorKey);
    const series = getSeries(meta.seriesKey);
    return `\n    <item>\n      <title>${xmlEscape(post.data.title)}</title>\n      <link>${absoluteUrl(localePath(locale, `blog/${post.data.slug}`))}</link>\n      <guid>${absoluteUrl(localePath(locale, `blog/${post.data.slug}`))}</guid>\n      <pubDate>${editorialRssDate(post.data.date)}</pubDate>\n      <description>${xmlEscape(post.data.description)}</description>${author ? `\n      <dc:creator>${xmlEscape(author.name)}</dc:creator>` : ''}${series ? `\n      <category>${xmlEscape(series.titles[locale])}</category>` : ''}\n    </item>`;
  }).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n  <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>\n    <title>FormaSL — ${xmlEscape(copy[locale].blog)}</title>\n    <link>${absoluteUrl(localePath(locale, 'blog'))}</link>\n    <description>${xmlEscape(copy[locale].metaDescription)}</description>\n    <language>${localeMeta[locale].htmlLang}</language>${items}\n  </channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
