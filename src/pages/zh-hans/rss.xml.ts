import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../lib/blog';
import { absoluteUrl, copy, localePath } from '../../lib/i18n';
import { xmlEscape } from '../../lib/xml';

export const GET: APIRoute = async () => {
  const locale = 'zh-hans' as const;
  const posts = await getPublishedPosts(locale);
  const items = posts.map((post) => `
    <item>
      <title>${xmlEscape(post.data.title)}</title>
      <link>${absoluteUrl(localePath(locale, `blog/${post.data.slug}`))}</link>
      <guid>${absoluteUrl(localePath(locale, `blog/${post.data.slug}`))}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${xmlEscape(post.data.description)}</description>
    </item>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>FormaSL — ${xmlEscape(copy[locale].blog)}</title>
    <link>${absoluteUrl(localePath(locale, 'blog'))}</link>
    <description>${xmlEscape(copy[locale].metaDescription)}</description>
    <language>${locale}</language>${items}
  </channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
