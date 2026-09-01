import type { Locale } from './i18n';

const intlLocale: Record<Locale, string> = {
  en: 'en',
  'pt-br': 'pt-BR',
  'zh-hans': 'zh-CN',
};

export function editorialDateISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatEditorialDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function editorialDateTime(date: Date): string {
  return `${editorialDateISO(date)}T12:00:00Z`;
}

export function editorialRssDate(date: Date): string {
  return new Date(editorialDateTime(date)).toUTCString();
}
