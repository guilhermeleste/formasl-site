import type { Locale } from '../lib/i18n';

type Localized = Record<Locale, string>;

export interface PublicConcept {
  id: string;
  names: Localized;
  short: Localized;
  expanded: Localized;
  notConfusedWith: Localized;
}

export const concepts: PublicConcept[] = [
  {
    id: 'formasl',
    names: { en: 'FormaSL', 'pt-br': 'FormaSL', 'zh-hans': 'FormaSL' },
    short: {
      en: 'FormaSL is a computable semantic specification language for explicitly declaring the world a system represents while preserving materially relevant semantic distinctions through computation.',
      'pt-br': 'FormaSL é uma linguagem de especificação semântica computável para declarar explicitamente o mundo que um sistema representa e preservar distinções semanticamente relevantes ao longo da computação.',
      'zh-hans': 'FormaSL 是一种可计算的语义规范语言，用于显式声明系统所表示的世界，并在计算过程中保留具有实质意义的语义区分。',
    },
    expanded: {
      en: 'A FormaSL contract can declare relations, contexts, Claims, rules and operations without turning representation into reality or Claims into truth. The language governs declared meaning within its semantic jurisdiction.',
      'pt-br': 'Um contrato FormaSL pode declarar relações, contextos, Claims, regras e operações sem transformar representação em realidade ou Claims em verdade. A linguagem governa o significado declarado dentro de sua jurisdição semântica.',
      'zh-hans': 'FormaSL 契约可以声明关系、语境、Claim、规则与操作，而不会把表示本身变成现实，也不会把 Claim 变成真值。该语言在其语义管辖范围内治理已声明的意义。',
    },
    notConfusedWith: {
      en: 'Forma as the broader technical architecture, Forma Research Lab as the organization, or any particular executor or storage engine.',
      'pt-br': 'Forma como arquitetura técnica mais ampla, Forma Research Lab como organização ou qualquer executor ou mecanismo de armazenamento específico.',
      'zh-hans': '更广义的 Forma 技术架构、作为组织的 Forma Research Lab，或任何特定执行器与存储机制。',
    },
  },
  {
    id: 'semantic-computing',
    names: { en: 'Semantic Computing', 'pt-br': 'Computação Semântica', 'zh-hans': '语义计算' },
    short: {
      en: 'Semantic Computing is an architecture in which declared meaning participates directly in computation and remains distinguishable from the mechanisms that realize it.',
      'pt-br': 'Computação Semântica é uma arquitetura em que o significado declarado participa diretamente da computação e permanece distinguível dos mecanismos que o realizam.',
      'zh-hans': '语义计算是一种架构，其中已声明的意义直接参与计算，并与实现这些意义的机制保持可区分。',
    },
    expanded: {
      en: 'The architecture distinguishes semantic contract, realization and operational responsibility. Storage, execution and specialized mechanisms may vary without becoming the semantic authority for the declared world.',
      'pt-br': 'A arquitetura distingue contrato semântico, realização e responsabilidade operacional. Armazenamento, execução e mecanismos especializados podem variar sem se tornarem a autoridade semântica do mundo declarado.',
      'zh-hans': '该架构区分语义契约、实现与运行责任。存储、执行与专用机制可以变化，而不会因此成为已声明世界的语义权威。',
    },
    notConfusedWith: {
      en: 'A claim that computation itself establishes truth, authorization or institutional legitimacy.',
      'pt-br': 'Uma afirmação de que a própria computação estabelece verdade, autorização ou legitimidade institucional.',
      'zh-hans': '“计算本身即可确立真值、授权或制度合法性”的主张。',
    },
  },
  {
    id: 'semantic-continuity',
    names: { en: 'Semantic Continuity', 'pt-br': 'Continuidade Semântica', 'zh-hans': '语义连续性' },
    short: {
      en: 'Semantic Continuity is the property that distinctions required by a semantic contract remain reconstructible across relevant transformations.',
      'pt-br': 'Continuidade Semântica é a propriedade pela qual distinções exigidas por um contrato semântico permanecem reconstruíveis ao longo das transformações relevantes.',
      'zh-hans': '语义连续性指语义契约所要求的区分在相关转换过程中持续保持可重建。',
    },
    expanded: {
      en: 'A transformation may change representation without erasing information that remains necessary to reconstruct identity, attribution, scope, time, authority, provenance or another contractually relevant distinction.',
      'pt-br': 'Uma transformação pode mudar a representação sem apagar informação ainda necessária para reconstruir identidade, atribuição, escopo, tempo, autoridade, proveniência ou outra distinção relevante ao contrato.',
      'zh-hans': '转换可以改变表示形式，但不能擦除仍然用于重建身份、归属、范围、时间、权限、来源谱系或其他契约相关区分的信息。',
    },
    notConfusedWith: {
      en: 'Keeping every representation unchanged or preserving every piece of information regardless of whether the semantic contract requires it.',
      'pt-br': 'Manter toda representação inalterada ou preservar qualquer informação independentemente de ela ser exigida pelo contrato semântico.',
      'zh-hans': '让所有表示保持不变，或不考虑语义契约是否需要而保留一切信息。',
    },
  },
  {
    id: 'claim',
    names: { en: 'Claim', 'pt-br': 'Claim', 'zh-hans': 'Claim（主张）' },
    short: {
      en: 'A Claim is attributable content expressed from a situated source or position; representing a Claim does not make its content true.',
      'pt-br': 'Uma Claim é conteúdo atribuível expresso a partir de uma fonte ou posição situada; representar uma Claim não torna seu conteúdo verdadeiro.',
      'zh-hans': 'Claim 是可归属于特定来源或所处位置的内容；表示一条 Claim 并不会使其内容因此成为真值。',
    },
    expanded: {
      en: 'Claim identity, content, issuer, basis and occurrence can remain distinct. Multiple Claims may conflict without the model silently collapsing them into one asserted truth.',
      'pt-br': 'Identidade, conteúdo, emissor, base e ocorrência de uma Claim podem permanecer distintos. Claims diferentes podem entrar em conflito sem que o modelo as colapse silenciosamente em uma única verdade afirmada.',
      'zh-hans': 'Claim 的身份、内容、发出者、依据与发生可以保持彼此区分。不同 Claim 可以发生冲突，而模型无需把它们静默合并为单一被断言的真值。',
    },
    notConfusedWith: {
      en: 'Truth, fact, observation or an unattributed state flag.',
      'pt-br': 'Verdade, fato, observação ou um simples estado sem atribuição.',
      'zh-hans': '真值、事实、观察或缺乏归属信息的普通状态标记。',
    },
  },
  {
    id: 'fsl',
    names: { en: '.fsl', 'pt-br': '.fsl', 'zh-hans': '.fsl' },
    short: {
      en: '`.fsl` is the authoritative source for declared semantic meaning in a FormaSL contract.',
      'pt-br': '`.fsl` é a fonte autoritativa do significado semântico declarado em um contrato FormaSL.',
      'zh-hans': '`.fsl` 是 FormaSL 契约中已声明语义意义的权威来源。',
    },
    expanded: {
      en: 'Compiled, materialized or runtime representations may derive from `.fsl`, but they do not replace its authority over what the contract declares to mean.',
      'pt-br': 'Representações compiladas, materializadas ou de runtime podem derivar de `.fsl`, mas não substituem sua autoridade sobre o significado declarado pelo contrato.',
      'zh-hans': '编译、物化或运行时表示可以由 `.fsl` 派生，但不会取代 `.fsl` 对契约所声明意义的权威。',
    },
    notConfusedWith: {
      en: 'Authority over external truth, reality or institutional legitimacy.',
      'pt-br': 'Autoridade sobre verdade externa, realidade ou legitimidade institucional.',
      'zh-hans': '对外部真值、现实或制度合法性的权威。',
    },
  },
  {
    id: 'fsp',
    names: { en: '.fsp', 'pt-br': '.fsp', 'zh-hans': '.fsp' },
    short: {
      en: '`.fsp` is a realization profile that describes how a semantic contract is realized without becoming a second semantic contract.',
      'pt-br': '`.fsp` é um perfil de realização que descreve como um contrato semântico é realizado sem se tornar um segundo contrato semântico.',
      'zh-hans': '`.fsp` 是实现配置，用于描述语义契约如何被实现，而不会因此成为第二份语义契约。',
    },
    expanded: {
      en: 'A realization profile can select storage, execution or integration mechanisms while preserving the separation between semantic authority and implementation freedom.',
      'pt-br': 'Um perfil de realização pode selecionar mecanismos de armazenamento, execução ou integração preservando a separação entre autoridade semântica e liberdade de implementação.',
      'zh-hans': '实现配置可以选择存储、执行或集成机制，同时保持语义权威与实现自由之间的分离。',
    },
    notConfusedWith: {
      en: '`.fsl`, the semantic contract itself, or proof that a particular realization is correct.',
      'pt-br': '`.fsl`, o próprio contrato semântico ou uma prova de que determinada realização está correta.',
      'zh-hans': '`.fsl`、语义契约本身，或某个实现必然正确的证明。',
    },
  },
  {
    id: 'forma',
    names: { en: 'Forma', 'pt-br': 'Forma', 'zh-hans': 'Forma' },
    short: {
      en: 'Forma names the broader technical architecture and ecosystem around FormaSL, in which semantic, realization and operational responsibilities can be composed without requiring one mandatory stack.',
      'pt-br': 'Forma nomeia a arquitetura técnica e o ecossistema mais amplos em torno do FormaSL, nos quais responsabilidades semânticas, de realização e operacionais podem ser compostas sem exigir uma única pilha obrigatória.',
      'zh-hans': 'Forma 指围绕 FormaSL 的更广义技术架构与生态系统，其中语义、实现与运行责任可以组合，而不要求唯一的强制技术栈。',
    },
    expanded: {
      en: 'Components may be owned, integrated or delegated according to responsibility. FormaSL remains the language; ecosystem components are not automatically required by the language semantics.',
      'pt-br': 'Componentes podem ser possuídos, integrados ou delegados conforme a responsabilidade. FormaSL continua sendo a linguagem; componentes do ecossistema não se tornam automaticamente exigências da semântica da linguagem.',
      'zh-hans': '各组件可以依据责任选择自有、集成或委托。FormaSL 仍然是语言本身；生态系统组件不会自动成为语言语义的必需组成部分。',
    },
    notConfusedWith: {
      en: 'Forma Research Lab as the organization, or a claim that every named ecosystem component is already an available product.',
      'pt-br': 'Forma Research Lab como organização ou a afirmação de que todo componente nomeado do ecossistema já é um produto disponível.',
      'zh-hans': '作为组织的 Forma Research Lab，或“所有被命名的生态组件都已经是可用产品”的主张。',
    },
  },
];

export const conceptAuthorityUrl = 'https://github.com/guilhermeleste/FormaSL';

export const conceptAuthorityNote: Localized = {
  en: 'Editorial explanation. Technical definitions are governed by the FormaSL technical sources.',
  'pt-br': 'Explicação editorial. As definições técnicas são governadas pelas fontes técnicas do FormaSL.',
  'zh-hans': '编辑性说明。技术定义由 FormaSL 的技术来源治理。',
};
