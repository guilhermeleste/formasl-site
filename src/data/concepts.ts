import type { Locale } from '../lib/i18n';

type Localized = Record<Locale, string>;

export interface PublicConcept {
  id: string;
  names: Localized;
  short: Localized;
  expanded: Localized;
}

export const concepts: PublicConcept[] = [
  {
    id: 'forma',
    names: { en: 'Forma', 'pt-br': 'Forma', 'zh-hans': 'Forma' },
    short: {
      en: 'The company developing Semantic Computing and the ecosystem around FormaSL.',
      'pt-br': 'A empresa que desenvolve a Computação Semântica e o ecossistema ao redor do FormaSL.',
      'zh-hans': '开发语义计算并建设 FormaSL 生态系统的公司。',
    },
    expanded: {
      en: 'Forma builds the commercial infrastructure that turns semantic contracts into operational systems while keeping the language and the organization’s meaning separable from a single implementation.',
      'pt-br': 'A Forma constrói a infraestrutura comercial que transforma contratos semânticos em sistemas operacionais, mantendo a linguagem e o significado da organização separados de uma implementação única.',
      'zh-hans': 'Forma 构建商业基础设施，把语义契约变成可运行系统，同时让语言和组织的意义保持独立于单一实现。',
    },
  },
  {
    id: 'formasl',
    names: { en: 'FormaSL', 'pt-br': 'FormaSL', 'zh-hans': 'FormaSL' },
    short: {
      en: 'The open-source semantic language that makes meaning and rules computable.',
      'pt-br': 'A linguagem open source que transforma significado e regras em objetos computáveis.',
      'zh-hans': '把意义与规则转化为可计算对象的开源语义语言。',
    },
    expanded: {
      en: 'FormaSL declares worlds, relations, context, claims, rules and semantically distinct operations in a contract that remains independent from its physical realization.',
      'pt-br': 'FormaSL declara mundos, relações, contexto, Claims, regras e operações semanticamente distintas em um contrato independente de sua realização física.',
      'zh-hans': 'FormaSL 在独立于物理实现的契约中声明世界、关系、语境、Claim、规则以及语义上不同的操作。',
    },
  },
  {
    id: 'forma-platform',
    names: { en: 'Forma Platform', 'pt-br': 'Forma Platform', 'zh-hans': 'Forma Platform' },
    short: {
      en: 'The commercial realization of the Forma architecture.',
      'pt-br': 'A realização comercial da arquitetura Forma.',
      'zh-hans': 'Forma 架构的商业实现。',
    },
    expanded: {
      en: 'Forma Platform connects FormaSL contracts to data, services, models, agents and infrastructure and provides the mechanisms needed to operate them in production.',
      'pt-br': 'Forma Platform conecta contratos FormaSL a dados, serviços, modelos, agentes e infraestrutura e fornece os mecanismos necessários para operá-los em produção.',
      'zh-hans': 'Forma Platform 把 FormaSL 契约连接到数据、服务、模型、智能体与基础设施，并提供在生产环境中运行它们所需的机制。',
    },
  },
  {
    id: 'semantic-computing',
    names: { en: 'Semantic Computing', 'pt-br': 'Computação Semântica', 'zh-hans': '语义计算' },
    short: {
      en: 'An architecture in which formalized meaning participates directly in computation.',
      'pt-br': 'Uma arquitetura em que significado formalizado participa diretamente da computação.',
      'zh-hans': '一种让形式化意义直接参与计算的架构。',
    },
    expanded: {
      en: 'In conventional software, meaning guides the program. In Semantic Computing, meaning also participates in the program and remains separable from the mechanisms that realize it.',
      'pt-br': 'No software convencional, o significado orienta o programa. Na Computação Semântica, o significado também participa do programa e permanece separado dos mecanismos que o realizam.',
      'zh-hans': '在传统软件中，意义指导程序；在语义计算中，意义本身也参与程序，并与实现它的机制保持分离。',
    },
  },
  {
    id: 'semantic-contract',
    names: { en: 'Semantic contract', 'pt-br': 'Contrato semântico', 'zh-hans': '语义契约' },
    short: {
      en: 'The explicit definition of the world a system represents and the rules that govern its meaning.',
      'pt-br': 'A definição explícita do mundo que um sistema representa e das regras que governam seu significado.',
      'zh-hans': '对系统所表示世界及其意义规则的显式定义。',
    },
    expanded: {
      en: 'It can include concepts, relations, context, authority, temporal distinctions and semantic obligations that implementations must preserve.',
      'pt-br': 'Pode incluir conceitos, relações, contexto, autoridade, distinções temporais e obrigações semânticas que as realizações devem preservar.',
      'zh-hans': '它可以包含概念、关系、语境、权威、时间区分以及实现必须保留的语义义务。',
    },
  },
  {
    id: 'world-model',
    names: { en: 'World Model', 'pt-br': 'Modelo de Mundo', 'zh-hans': '世界模型' },
    short: {
      en: 'The fundamental distinctions a semantic system must preserve to represent a domain correctly.',
      'pt-br': 'As distinções fundamentais que um sistema semântico precisa preservar para representar corretamente um domínio.',
      'zh-hans': '语义系统为了正确表示领域而必须保留的基本区分。',
    },
    expanded: {
      en: 'Claims, observations, truth, hypotheses, decisions, execution, effects, time, context and authority can occupy different semantic roles instead of collapsing into one state.',
      'pt-br': 'Claims, observações, verdade, hipóteses, decisões, execução, efeitos, tempo, contexto e autoridade podem ocupar papéis semânticos diferentes em vez de colapsar em um único estado.',
      'zh-hans': 'Claim、观察、真值、假设、决策、执行、效果、时间、语境与权威可以保持不同语义角色，而不是被压缩为一个状态。',
    },
  },
  {
    id: 'metagraph',
    names: { en: 'Typed role-incidence metagraph', 'pt-br': 'Metagrafo tipado de incidência por papéis', 'zh-hans': '类型化角色关联元图' },
    short: {
      en: 'FormaSL’s logical representation for identifiable relations with multiple typed participants and higher-order structure.',
      'pt-br': 'A representação lógica do FormaSL para relações identificáveis com múltiplos participantes tipados e estruturas de ordem superior.',
      'zh-hans': 'FormaSL 的逻辑表示，用于表达具有身份、多类型参与者与高阶结构的关系。',
    },
    expanded: {
      en: 'Relations can have identity, participants can occupy explicit semantic roles, and relations can themselves participate in other relations.',
      'pt-br': 'Relações podem possuir identidade, participantes ocupam papéis semânticos explícitos e as próprias relações podem participar de outras relações.',
      'zh-hans': '关系可以拥有自身身份，参与者占据显式语义角色，而关系本身还可以参与其他关系。',
    },
  },
  {
    id: 'ontology',
    names: { en: 'Ontology', 'pt-br': 'Ontologia', 'zh-hans': '本体' },
    short: {
      en: 'The conceptual commitments and relations recognized inside a domain.',
      'pt-br': 'Os compromissos conceituais e relações reconhecidos dentro de um domínio.',
      'zh-hans': '一个领域中被认可的概念承诺与关系。',
    },
    expanded: {
      en: 'Ontologies provide domain vocabulary and conceptual structure. FormaSL makes those structures usable inside computable semantic contracts.',
      'pt-br': 'Ontologias fornecem vocabulário e estrutura conceitual de domínio. FormaSL torna essas estruturas utilizáveis dentro de contratos semânticos computáveis.',
      'zh-hans': '本体提供领域词汇和概念结构；FormaSL 让这些结构可以进入可计算的语义契约。',
    },
  },
  {
    id: 'graph',
    names: { en: 'Graph', 'pt-br': 'Grafo', 'zh-hans': '图' },
    short: {
      en: 'A structure of elements connected by relations.',
      'pt-br': 'Uma estrutura de elementos conectados por relações.',
      'zh-hans': '由元素及其关系组成的结构。',
    },
    expanded: {
      en: 'Graphs make connectivity directly computable. FormaSL extends that power with semantic roles, relation identity, context and higher-order structures.',
      'pt-br': 'Grafos tornam conectividade diretamente computável. FormaSL amplia essa capacidade com papéis semânticos, identidade de relações, contexto e estruturas de ordem superior.',
      'zh-hans': '图让连接性直接可计算；FormaSL 在此基础上加入语义角色、关系身份、语境与高阶结构。',
    },
  },
  {
    id: 'knowledge-graph',
    names: { en: 'Knowledge graph', 'pt-br': 'Knowledge graph', 'zh-hans': '知识图谱' },
    short: {
      en: 'A connected representation of entities and relations under a knowledge model.',
      'pt-br': 'Uma representação conectada de entidades e relações segundo um modelo de conhecimento.',
      'zh-hans': '依据知识模型连接实体与关系的表示。',
    },
    expanded: {
      en: 'Knowledge graphs are a natural foundation for semantic systems. Semantic Computing adds explicit contracts, semantic operations and continuity of meaning through computation.',
      'pt-br': 'Knowledge graphs são uma fundação natural para sistemas semânticos. A Computação Semântica acrescenta contratos explícitos, operações semânticas e continuidade do significado através da computação.',
      'zh-hans': '知识图谱是语义系统的自然基础；语义计算进一步加入显式契约、语义操作以及贯穿计算过程的意义连续性。',
    },
  },
  {
    id: 'claim',
    names: { en: 'Claim', 'pt-br': 'Claim', 'zh-hans': 'Claim（主张）' },
    short: {
      en: 'An attributable statement made from a situated source or position.',
      'pt-br': 'Uma afirmação atribuível feita a partir de uma fonte ou posição situada.',
      'zh-hans': '由特定来源或位置提出、可归属的主张。',
    },
    expanded: {
      en: 'Claims let a system represent disagreement, evidence and different perspectives without collapsing them prematurely into one asserted truth.',
      'pt-br': 'Claims permitem representar desacordo, evidência e perspectivas diferentes sem colapsá-los prematuramente em uma única verdade afirmada.',
      'zh-hans': 'Claim 让系统能够表示分歧、证据与不同视角，而不必过早把它们压成一个被断言的真值。',
    },
  },
  {
    id: 'semantic-continuity',
    names: { en: 'Semantic Continuity', 'pt-br': 'Semantic Continuity', 'zh-hans': '语义连续性' },
    short: {
      en: 'The property that distinctions required to interpret a result remain reconstructible across computation.',
      'pt-br': 'A propriedade pela qual as distinções necessárias para interpretar um resultado permanecem reconstruíveis através da computação.',
      'zh-hans': '解释结果所需的语义区分在计算过程中持续保持可重建的性质。',
    },
    expanded: {
      en: 'Representations may change while identity, attribution, context, time, authority, provenance and other material distinctions remain available when they are still needed.',
      'pt-br': 'Representações podem mudar enquanto identidade, atribuição, contexto, tempo, autoridade, proveniência e outras distinções materiais permanecem disponíveis quando continuam necessárias.',
      'zh-hans': '表示形式可以改变，同时身份、归属、语境、时间、权威、来源谱系等关键区分在需要时仍然可用。',
    },
  },
  {
    id: 'fsl',
    names: { en: '.fsl', 'pt-br': '.fsl', 'zh-hans': '.fsl' },
    short: {
      en: 'The authoritative source of declared semantic meaning in a FormaSL contract.',
      'pt-br': 'A fonte autoritativa do significado semântico declarado em um contrato FormaSL.',
      'zh-hans': 'FormaSL 契约中已声明语义意义的权威来源。',
    },
    expanded: {
      en: 'The contract can be compiled or realized in different ways while `.fsl` remains the reference for what the declared system means.',
      'pt-br': 'O contrato pode ser compilado ou realizado de formas diferentes enquanto `.fsl` permanece a referência para aquilo que o sistema declarado significa.',
      'zh-hans': '契约可以通过不同方式编译或实现，而 `.fsl` 始终是已声明系统意义的参照来源。',
    },
  },
  {
    id: 'fsp',
    names: { en: '.fsp', 'pt-br': '.fsp', 'zh-hans': '.fsp' },
    short: {
      en: 'The realization profile for a FormaSL semantic contract.',
      'pt-br': 'O perfil de realização de um contrato semântico FormaSL.',
      'zh-hans': 'FormaSL 语义契约的实现配置。',
    },
    expanded: {
      en: 'It describes how storage, execution, integration and other capabilities are selected to realize a semantic contract without becoming a second source of meaning.',
      'pt-br': 'Ele descreve como armazenamento, execução, integração e outras capacidades são selecionadas para realizar o contrato sem se tornar uma segunda fonte de significado.',
      'zh-hans': '它描述如何选择存储、执行、集成及其他能力来实现语义契约，而不成为第二个意义来源。',
    },
  },
];

export const conceptAuthorityUrl = 'https://github.com/guilhermeleste/FormaSL';
