export const locales = ['en', 'pt-br', 'zh-hans'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { htmlLang: string; label: string; short: string }> = {
  en: { htmlLang: 'en', label: 'English', short: 'EN' },
  'pt-br': { htmlLang: 'pt-BR', label: 'Português', short: 'PT' },
  'zh-hans': { htmlLang: 'zh-Hans', label: '简体中文', short: '中文' },
};

export const copy = {
  en: {
    metaTitle: 'FormaSL — Computable semantic specification language',
    metaDescription: 'A computable semantic specification language for making relations, contexts, claims, rules and operations explicit while preserving material semantic distinctions.',
    headline: 'Compute without losing meaning.',
    body: 'FormaSL is a language for making explicit the relations, contexts, claims, rules and operations that give meaning to the world a system represents.',
    body2: 'What matters remains distinguishable throughout computation instead of having to be reconstructed later from code, integrations, logs and documentation.',
    blog: 'Articles', github: 'GitHub', noPosts: 'Articles will appear here as they are published.',
    privacy: 'Privacy', contact: 'Contact', read: 'Read article', backToBlog: 'Back to articles', chooseLanguage: 'Choose language', siteLabel: 'FormaSL',
    glossary: 'Glossary', glossaryIntro: 'Editorial definitions and distinctions used across the FormaSL publication, with their authority boundaries kept explicit.',
    by: 'By', published: 'Published', previous: 'Previous', next: 'Next', allArticles: 'All articles',
    notConfusedWith: 'Do not confuse with', authority: 'Authority',
    privacyText: 'This minimal site does not intentionally collect personal data beyond infrastructure logs required to operate and secure the service. This notice will be expanded before any analytics, forms, subscriptions, or additional data processing are enabled.',
  },
  'pt-br': {
    metaTitle: 'FormaSL — Linguagem de especificação semântica computável',
    metaDescription: 'Uma linguagem de especificação semântica computável para tornar explícitas relações, contextos, afirmações, regras e operações preservando distinções semânticas materiais.',
    headline: 'Computar sem perder o significado.',
    body: 'FormaSL é uma linguagem para tornar explícitas as relações, contextos, afirmações, regras e operações que dão sentido ao mundo que um sistema representa.',
    body2: 'O que importa permanece distinguível ao longo da computação, em vez de precisar ser reconstruído depois em código, integrações, logs e documentação.',
    blog: 'Artigos', github: 'GitHub', noPosts: 'Os artigos aparecerão aqui à medida que forem publicados.',
    privacy: 'Privacidade', contact: 'Contato', read: 'Ler artigo', backToBlog: 'Voltar aos artigos', chooseLanguage: 'Escolha o idioma', siteLabel: 'FormaSL',
    glossary: 'Glossário', glossaryIntro: 'Definições editoriais e distinções usadas na publicação do FormaSL, mantendo explícitos os limites de autoridade de cada formulação.',
    by: 'Por', published: 'Publicado em', previous: 'Anterior', next: 'Próximo', allArticles: 'Todos os artigos',
    notConfusedWith: 'Não confundir com', authority: 'Autoridade',
    privacyText: 'Este site mínimo não coleta intencionalmente dados pessoais além dos registros de infraestrutura necessários para operar e proteger o serviço. Este aviso será ampliado antes da ativação de analytics, formulários, inscrições ou qualquer processamento adicional de dados.',
  },
  'zh-hans': {
    metaTitle: 'FormaSL — 可计算的语义规范语言',
    metaDescription: '一种可计算的语义规范语言，用于显式表达关系、语境、主张、规则和操作，同时保留关键的语义区分。',
    headline: '计算而不丢失意义。',
    body: 'FormaSL 是一种语言，用于显式表达赋予系统所表示世界以意义的关系、语境、主张、规则和操作。',
    body2: '重要的区分在整个计算过程中保持可辨识，而不必事后再从代码、集成、日志和文档中重建。',
    blog: '文章', github: 'GitHub', noPosts: '文章将在发布后显示在这里。',
    privacy: '隐私', contact: '联系', read: '阅读文章', backToBlog: '返回文章', chooseLanguage: '选择语言', siteLabel: 'FormaSL',
    glossary: '术语表', glossaryIntro: 'FormaSL 公共文章中使用的编辑性定义与关键区分，并明确保留各自的权威边界。',
    by: '作者', published: '发布于', previous: '上一篇', next: '下一篇', allArticles: '全部文章',
    notConfusedWith: '不要混同于', authority: '权威来源',
    privacyText: '本网站当前不会主动收集个人数据，但运行和保护服务所必需的基础设施日志除外。在启用分析、表单、订阅或其他数据处理之前，本说明将进一步完善。',
  },
} satisfies Record<Locale, Record<string, string>>;

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function glossaryPath(locale: Locale): string {
  return locale === 'pt-br' ? localePath(locale, 'glossario') : localePath(locale, 'glossary');
}

export function partLabel(locale: Locale, part: number): string {
  if (locale === 'pt-br') return `Parte ${part}`;
  if (locale === 'zh-hans') return `第 ${part} 部分`;
  return `Part ${part}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, 'https://formasl.org').toString();
}
