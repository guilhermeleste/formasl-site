import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { editorialDateISO } from '../lib/dates';
import { absoluteUrl, glossaryPath, localePath, locales } from '../lib/i18n';
import { xmlEscape } from '../lib/xml';

export const GET: APIRoute = async () => {
  const staticEntries = locales.flatMap((locale) => [
    { path: localePath(locale) },
    { path: localePath(locale, 'blog') },
    { path: glossaryPath(locale) },
    { path: localePath(locale, 'privacy') },
  ]);
  const posts = await getPublishedPosts();
  const postEntries = posts.map((post) => ({
    path: localePath(post.data.locale, `blog/${post.data.slug}`),
    lastmod: editorialDateISO(post.data.updated ?? post.data.date),
  }));
  const entries = [{ path: '/' }, ...staticEntries, ...postEntries];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({ path, lastmod }) => `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
