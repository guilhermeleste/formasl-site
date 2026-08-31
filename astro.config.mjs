import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://formasl.org',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br', 'zh-hans'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
