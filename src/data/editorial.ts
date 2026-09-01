import type { Locale } from '../lib/i18n';

export const AUTHOR_KEY = 'guilherme-leste' as const;
export const SERIES_KEY = 'reality-to-semantic-computing' as const;

type LocalizedText = Record<Locale, string>;

export const authors = {
  [AUTHOR_KEY]: {
    name: 'Guilherme Leste',
    roles: {
      en: 'Creator of FormaSL and founder of Forma Research Lab',
      'pt-br': 'Criador do FormaSL e fundador do Forma Research Lab',
      'zh-hans': 'FormaSL 创建者、Forma Research Lab 创始人',
    } satisfies LocalizedText,
  },
} as const;

export const series = {
  [SERIES_KEY]: {
    titles: {
      en: 'From Reality to Semantic Computing',
      'pt-br': 'Da realidade à Computação Semântica',
      'zh-hans': '从现实到语义计算',
    } satisfies LocalizedText,
    descriptions: {
      en: 'An eight-part series on preserving meaning as we turn the world into something computable.',
      'pt-br': 'Uma série em oito partes sobre como preservar significado quando transformamos o mundo em algo computável.',
      'zh-hans': '一个由八部分组成的系列，讨论在把世界转化为可计算对象时如何保留意义。',
    } satisfies LocalizedText,
  },
} as const;

export function partFromTranslationKey(translationKey: string): number | null {
  const match = /^series-01-(\d{2})$/.exec(translationKey);
  if (!match) return null;
  const part = Number(match[1]);
  return part >= 1 && part <= 8 ? part : null;
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
  const socialImage = data.socialImage ?? (isSeriesOne ? `/og/articles/${data.locale}/${data.slug}.png` : undefined);
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
