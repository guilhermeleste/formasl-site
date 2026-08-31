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
    metaDescription: 'A computable semantic specification language for declaring, transforming, governing, and verifying meaning while preserving material semantic distinctions.',
    brandExpansion: 'Forma Semantic Language',
    headline: 'A computable semantic specification language.',
    body: 'FormaSL lets people and agents declare, transform, govern, and verify meaning without silently collapsing distinctions such as claim and truth, conformance and admission, or occurrence and observation.',
    blog: 'Blog', github: 'GitHub', latest: 'Latest', noPosts: 'Articles will appear here as they are published.',
    developedBy: 'Developed by Forma Research Lab.', privacy: 'Privacy', contact: 'Contact', read: 'Read article', backToBlog: 'Back to blog', chooseLanguage: 'Choose language', siteLabel: 'FormaSL',
    privacyText: 'This minimal site does not intentionally collect personal data beyond infrastructure logs required to operate and secure the service. This notice will be expanded before any analytics, forms, subscriptions, or additional data processing are enabled.',
  },
  'pt-br': {
    metaTitle: 'FormaSL — Linguagem de especificação semântica computável',
    metaDescription: 'Uma linguagem de especificação semântica computável para declarar, transformar, governar e verificar significado preservando distinções semânticas materiais.',
    brandExpansion: 'Forma Semantic Language',
    headline: 'Uma linguagem de especificação semântica computável.',
    body: 'FormaSL permite que pessoas e agentes declarem, transformem, governem e verifiquem significado sem colapsar silenciosamente distinções como afirmação e verdade, conformidade e admissão, ou ocorrência e observação.',
    blog: 'Blog', github: 'GitHub', latest: 'Mais recentes', noPosts: 'Os artigos aparecerão aqui à medida que forem publicados.',
    developedBy: 'Desenvolvido pela Forma Research Lab.', privacy: 'Privacidade', contact: 'Contato', read: 'Ler artigo', backToBlog: 'Voltar ao blog', chooseLanguage: 'Escolha o idioma', siteLabel: 'FormaSL',
    privacyText: 'Este site mínimo não coleta intencionalmente dados pessoais além dos registros de infraestrutura necessários para operar e proteger o serviço. Este aviso será ampliado antes da ativação de analytics, formulários, inscrições ou qualquer processamento adicional de dados.',
  },
  'zh-hans': {
    metaTitle: 'FormaSL — 可计算的语义规范语言',
    metaDescription: '一种可计算的语义规范语言，用于声明、转换、治理和验证意义，同时保留关键的语义区分。',
    brandExpansion: 'Forma Semantic Language',
    headline: '一种可计算的语义规范语言。',
    body: 'FormaSL 使人与智能体能够声明、转换、治理和验证意义，同时避免悄然抹平主张与真值、符合性与准入、发生与观察等重要区分。',
    blog: '博客', github: 'GitHub', latest: '最新文章', noPosts: '文章将在发布后显示在这里。',
    developedBy: '由 Forma Research Lab 开发。', privacy: '隐私', contact: '联系', read: '阅读文章', backToBlog: '返回博客', chooseLanguage: '选择语言', siteLabel: 'FormaSL',
    privacyText: '本网站当前不会主动收集个人数据，但运行和保护服务所必需的基础设施日志除外。在启用分析、表单、订阅或其他数据处理之前，本说明将进一步完善。',
  },
} satisfies Record<Locale, Record<string, string>>;

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, 'https://formasl.org').toString();
}
