import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { absoluteUrl, localePath, locales } from '../lib/i18n';
import { xmlEscape } from '../lib/xml';

export const GET: APIRoute = async () => {
  const staticPaths = locales.flatMap((locale) => [
    localePath(locale),
    localePath(locale, 'blog'),
    localePath(locale, 'privacy'),
  ]);
  const posts = await getPublishedPosts();
  const postPaths = posts.map((post) => localePath(post.data.locale, `blog/${post.data.slug}`));
  const urls = ['/', ...staticPaths, ...postPaths];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`).join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
