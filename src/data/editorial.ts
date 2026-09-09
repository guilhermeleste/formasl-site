import type { Locale } from '../lib/i18n';

export const AUTHOR_KEY = 'guilherme-leste' as const;
export const SERIES_KEY = 'meaning-as-infrastructure' as const;

type LocalizedText = Record<Locale, string>;

export const authors = {
  [AUTHOR_KEY]: {
    name: 'Guilherme Leste',
    roles: {
      en: 'Creator of FormaSL and founder of Forma',
      'pt-br': 'Criador do FormaSL e fundador da Forma',
      'zh-hans': 'FormaSL 创建者、Forma 创始人',
    } satisfies LocalizedText,
  },
} as const;

export const series = {
  [SERIES_KEY]: {
    titles: {
      en: 'Meaning as Infrastructure',
      'pt-br': 'O significado como infraestrutura',
      'zh-hans': '意义即基础设施',
    } satisfies LocalizedText,
    descriptions: {
      en: 'Twelve short essays on moving meaning out of application implementations and turning it into reusable computational infrastructure.',
      'pt-br': 'Doze artigos curtos sobre retirar o significado das implementações e transformá-lo em infraestrutura computável e reutilizável.',
      'zh-hans': '十二篇短文：把意义从应用实现中分离出来，并把它变成可计算、可复用的基础设施。',
    } satisfies LocalizedText,
  },
} as const;

export function partFromTranslationKey(translationKey: string): number | null {
  const match = /^series-01-(\d{2})$/.exec(translationKey);
  if (!match) return null;
  const part = Number(match[1]);
  return part >= 1 && part <= 12 ? part : null;
}

export function getEditorialMeta(data: {
  locale: Locale;
  slug: string;
  translationKey: string;
  author?: string;
  seriesKey?: string;
  part?: number;
  socialImage?: string;
}) {
  const inferredPart = partFromTranslationKey(data.translationKey);
  const part = data.part ?? inferredPart;
  const isSeriesOne = inferredPart !== null;
  const authorKey = data.author ?? (isSeriesOne ? AUTHOR_KEY : undefined);
  const seriesKey = data.seriesKey ?? (isSeriesOne ? SERIES_KEY : undefined);
  const socialImage = data.socialImage ?? undefined;
  return { authorKey, seriesKey, part, socialImage };
}

export function getAuthor(key: string | undefined) {
  if (!key) return undefined;
  return authors[key as keyof typeof authors];
}

export function getSeries(key: string | undefined) {
  if (!key) return undefined;
  return series[key as keyof typeof series];
}

export function paddedPart(part: number | null | undefined): string {
  return part ? String(part).padStart(2, '0') : '';
}
