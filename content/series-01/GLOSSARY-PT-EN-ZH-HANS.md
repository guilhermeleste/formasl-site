# Series 01 — Terminology Contract (PT-BR / EN / zh-Hans)

Status: **editorial contract for translation**  
Source of reference: the approved Portuguese Series 01 articles.  
Scope: eight articles from *O mundo que o software fragmentou* through *Forma: arquitetura técnica*.

This glossary exists to prevent translation from collapsing distinctions that are material to the argument of the series. It governs editorial wording; it does not redefine the normative semantics of FormaSL.

## 1. Translation policy

1. **PT-BR is the editorial source of reference for Series 01.** English and Simplified Chinese are translations of the approved Portuguese texts, not independent rewrites.
2. **Brand and artifact names remain invariant:** `Forma`, `FormaSL`, `Forma Research Lab`, `FormaDB`, `Forma Platform`, `Forma Studio`, `Forma Cloud`, `.fsl`, `.fsp`.
3. **Language constructs remain identifiable as constructs.** In Chinese prose, `Claim` may be explained as `主张` on first occurrence, but the construct name `Claim` remains unchanged where the text is discussing the FormaSL category itself.
4. **Do not merge distinct categories for fluency.** In particular, preserve distinctions among claim/truth, observation/truth, capability/permission/authority, authorization/decision, decision/execution, execution/effect/observation, reference world/scenario, provenance/derivation/operational trace.
5. **Translate meaning, not surface syntax.** Sentence structure may change to produce idiomatic English or Chinese, provided the semantic distinctions, argumentative sequence and epistemic qualifications of the source remain intact.
6. **Do not strengthen claims.** Expressions such as “can”, “may”, “is conceived as”, “in the current design”, “in the verified slice” and “does not imply” must retain their qualification.
7. **Chinese style:** technical, institutional, restrained Simplified Chinese (`zh-Hans`), avoiding promotional or inflated vocabulary.
8. **English style:** technical international English, preserving the essay form rather than converting the articles into documentation prose.

## 2. Canonical titles

| # | PT-BR | EN | zh-Hans |
|---|---|---|---|
| 01 | O mundo que o software fragmentou | The World Software Fragmented | 被软件分割的世界 |
| 02 | Do concreto ao computável | From the Concrete to the Computable | 从具体到可计算 |
| 03 | Um modelo para um mundo que não se deixa reduzir | A Model for a World That Resists Reduction | 一个面向不可还原世界的模型 |
| 04 | Computar um mundo | Computing a World | 计算一个世界 |
| 05 | O significado precisa sobreviver à computação | Meaning Must Survive Computation | 意义必须在计算中存续 |
| 06 | FormaSL | FormaSL | FormaSL |
| 07 | Computação Semântica | Semantic Computing | 语义计算 |
| 08 | Forma: arquitetura técnica | Forma: Technical Architecture | Forma：技术架构 |

## 3. Core conceptual vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| significado | meaning | 意义 | Prefer `意义` for the conceptual sense used in the series. |
| significado situado | situated meaning | 语境意义 | Meaning dependent on position/context. |
| semântica | semantics | 语义 | |
| computação | computation | 计算 | |
| computável | computable | 可计算 | |
| computar | compute / to compute | 计算 | Choose grammatical form by context. |
| Computação Semântica | Semantic Computing | 语义计算 | Project architecture term; capitalize in EN when referring to the defined architecture. |
| Continuidade Semântica | Semantic Continuity | 语义连续性 | Defined project term; capitalize in EN when used as the named property. |
| apagamento semântico | semantic erasure | 语义擦除 | Loss of a distinction still required by the contract. |
| distinção semântica | semantic distinction | 语义区分 | |
| preservação semântica | semantic preservation | 语义保留 | |
| autoridade semântica | semantic authority | 语义权威 | Authority over declared meaning, not over reality/truth. |
| contrato semântico | semantic contract | 语义契约 | |
| obrigação semântica | semantic obligation | 语义义务 | Requirement imposed by the semantic contract on a realization. |
| conformidade | conformance | 符合性 | Prefer `conformance` over `compliance` when discussing implementation conformity to the contract. |
| realização | realization | 实现 | Architectural realization of a semantic contract. |
| perfil de realização | realization profile | 实现配置 | `.fsp` level; avoid translating as a second semantic specification. |
| mecanismo de realização | realization mechanism | 实现机制 | |
| plano de realização | realization layer | 实现层 | |
| plano semântico | semantic layer | 语义层 | |
| plano operacional | operational layer | 运行层 | |
| mundo semântico | semantic world | 语义世界 | |
| mundo de referência | reference world | 参照世界 | The world treated as current/reference, distinct from a scenario. |
| cenário | scenario | 场景 | Hypothetical context; do not translate as merely “case”. |
| hipótese | hypothesis / hypothetical assumption | 假设 | Choose according to sentence. |
| premissa | premise | 前提 | |
| contexto | context | 语境 / 上下文 | Use `语境` when semantic circumstances are central; `上下文` is acceptable in implementation-oriented passages. |
| escopo | scope | 范围 | |
| posição | position | 位置 / 所处位置 | Not necessarily physical coordinates. |
| perspectiva | perspective | 视角 | |
| escala | scale | 尺度 | |
| história | history | 历史 | Genealogical/history-of-state sense. |
| genealogia | genealogy | 谱系 | |

## 4. World-model vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| agente | agent | 主体 | In the series, an agent need not be AI. `主体` better conveys an autonomous participant; retain `agent` in code/construct names if required. |
| participante | participant | 参与者 | |
| entidade | entity | 实体 | |
| identidade | identity | 身份 / 标识 | Use `身份` for participant identity, `标识` where identity means identifier-like persistence. |
| relação | relation | 关系 | |
| papel | role | 角色 | Semantic role in a relation. |
| relação por papéis | role-based relation | 基于角色的关系 | |
| incidência | incidence | 关联 | Graph-theoretic/logical incidence; avoid a medical/statistical reading. |
| incidência tipada | typed incidence | 类型化关联 | |
| metagrafo | metagraph | 元图 | |
| metagrafo tipado de incidência por papéis | typed role-incidence metagraph | 基于角色的类型化关联元图 | Canonical editorial rendering for the current logical representation. |
| relação de ordem superior | higher-order relation | 高阶关系 | |
| relação com múltiplos participantes | multi-participant relation | 多参与者关系 | |
| qualificação | qualification | 限定信息 | Semantic qualification, not professional qualification. |

## 5. Epistemic and claim vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| afirmação | claim / assertion | 主张 / 断言 | Use `claim` when attributable content is central. |
| Claim | Claim | Claim（主张） | FormaSL construct name remains `Claim`. |
| conteúdo da Claim | Claim content | Claim 内容 | |
| emissor | issuer | 发出者 | For the participant that issues a Claim. |
| verdade | truth | 真值 / 真实性 | Use `真值` for logical truth status; `真实性` where prose contrasts a claim with reality. |
| fato | fact | 事实 | Do not use as a synonym for “record”. |
| observação | observation | 观察 | |
| avaliação | assessment | 评估 | Keep distinct from decision. |
| inferência | inference | 推理 | |
| consequência derivada | derived consequence | 推导出的结论 | |
| desconhecido | unknown | 未知 | Must remain distinct from false. |
| falso | false | 假 / 为假 | Must remain distinct from unknown. |
| conflito | conflict | 冲突 | Can describe incompatible Claims without forcing resolution. |
| divergência | divergence / disagreement | 分歧 | |
| revisão | revision | 修订 | State/history revision, not deletion. |

## 6. Normative and institutional vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| capacidade | capability | 能力 | Technical ability; does not imply permission or authority. |
| permissão | permission | 许可 | |
| autoridade | authority | 权限 / 权限地位 | Institutional authority. Avoid `权威` here unless the context is explicitly epistemic/semantic authority. |
| autorização | authorization | 授权 | Distinct from authority as a standing relation and from decision. |
| admissão | admission | 准入 | Governed admission into a domain/process. |
| validação | validation | 验证 | |
| decisão | decision | 决策 | |
| decidir | decide | 决策 / 作出决定 | |
| obrigação | obligation | 义务 | |
| compromisso | commitment | 承诺 / 约束性承诺 | Choose according to institutional context. |
| norma | norm | 规范 | |
| política | policy | 政策 / 规则 | Use `政策` for institutional policy; `规则` where it is an operational rule. |
| regra | rule | 规则 | |
| jurisdição | jurisdiction | 管辖域 / 管辖权 | `管辖域` often fits modeled scope; `管辖权` for legal authority. |
| admissível | admissible | 可准入 / 可接受 | Context-sensitive; do not collapse into “valid”. |

## 7. Decision, execution and effect vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| execução | execution | 执行 | Distinct from decision and effect. |
| pedido de execução | execution request | 执行请求 | |
| executor | executor | 执行器 | Technical mechanism. |
| efeito | effect | 效果 / 产生的结果 | The external/resulting effect of execution. |
| ocorrência | occurrence | 发生 / 事件发生 | Semantic occurrence, not merely a log record. |
| acontecimento | event / occurrence | 事件 | Use `event` for a world occurrence; avoid confusing with an event-message architecture when context matters. |
| resultado operacional | operational result | 运行结果 | |
| sucesso técnico | technical success | 技术成功 | Does not by itself prove the intended external effect or legitimacy. |
| mecanismo especializado | specialized mechanism | 专用机制 | |

## 8. Computation and operation vocabulary

| PT-BR | EN | zh-Hans |
|---|---|---|
| consulta | query | 查询 |
| Match | Match | Match |
| Infer | Infer | Infer |
| análise | analysis | 分析 |
| transformação | transformation | 转换 |
| Validate | Validate | Validate |
| Admit | Admit | Admit |
| Authorize | Authorize | Authorize |
| Decide | Decide | Decide |
| revisão | revision | 修订 |
| observação | observation | 观察 |
| incorporação | incorporation | 纳入 |
| evolução de fonte | source evolution | 源演化 |
| raciocínio | reasoning | 推理 |
| derivação | derivation | 推导 |
| inferência | inference | 推理 / 推断 |
| materialização | materialization | 物化 |
| indexação | indexing | 索引化 |
| compilação | compilation | 编译 |
| planejamento | planning | 规划 |

## 9. Traceability vocabulary

| PT-BR | EN | zh-Hans | Editorial note |
|---|---|---|---|
| rastreabilidade | traceability | 可追溯性 | |
| proveniência | provenance | 来源谱系 | Source/contribution lineage; do not replace with causal explanation. |
| derivação | derivation | 推导过程 | How a conclusion follows from premises. |
| rastro operacional | operational trace | 运行轨迹 | Execution events/log-like trace; not equivalent to derivation. |
| dependência | dependency | 依赖关系 | |
| premissa | premise | 前提 | |
| explicação | explanation | 解释 | Not automatically proof/certificate. |
| prova | proof | 证明 | |
| certificado | certificate | 证书 / 证明凭据 | Context-sensitive. |

## 10. Implementation and infrastructure vocabulary

| PT-BR | EN | zh-Hans |
|---|---|---|
| armazenamento | storage | 存储 |
| persistência | persistence | 持久化 |
| representação lógica | logical representation | 逻辑表示 |
| representação física | physical representation | 物理表示 |
| substrato | substrate | 底层机制 / 底层存储 |
| banco relacional | relational database | 关系数据库 |
| chave/valor | key/value | 键值 |
| armazenamento orientado a grafos | graph-oriented storage | 图式存储 |
| índice | index | 索引 |
| modelo de aprendizado de máquina | machine-learning model | 机器学习模型 |
| modelo estatístico | statistical model | 统计模型 |
| simulador | simulator | 模拟器 |
| grafo acíclico dirigido | directed acyclic graph | 有向无环图 |
| cadeia de blocos | blockchain | 区块链 |
| coordenação | coordination | 协调 |
| consenso | consensus | 共识 |

## 11. Product/ecosystem vocabulary

| PT-BR | EN | zh-Hans |
|---|---|---|
| ecossistema Forma | Forma ecosystem | Forma 生态系统 |
| sistema de dados nativo | native data system | 原生数据系统 |
| produto integrado | integrated product | 集成产品 |
| autoria | authoring | 创作 / 编写 |
| modelagem | modeling | 建模 |
| inspeção | inspection | 检查 / 检视 |
| depuração | debugging | 调试 |
| local-first | local-first | 本地优先 |
| realização gerenciada | managed realization | 托管实现 |
| componível | composable | 可组合 |
| possuir, integrar ou delegar | own, integrate, or delegate | 自有、集成或委托 |

## 12. Mandatory distinction matrix

The following pairs/sets must never be translated as if they were synonyms:

| Distinction | EN | zh-Hans |
|---|---|---|
| afirmação ≠ verdade | claim ≠ truth | 主张 ≠ 真实性/真值 |
| observação ≠ verdade | observation ≠ truth | 观察 ≠ 真实性/真值 |
| desconhecido ≠ falso | unknown ≠ false | 未知 ≠ 为假 |
| capacidade ≠ permissão | capability ≠ permission | 能力 ≠ 许可 |
| permissão ≠ autoridade | permission ≠ authority | 许可 ≠ 权限 |
| autoridade ≠ autorização | authority ≠ authorization | 权限 ≠ 授权 |
| autorização ≠ decisão | authorization ≠ decision | 授权 ≠ 决策 |
| decisão ≠ execução | decision ≠ execution | 决策 ≠ 执行 |
| execução ≠ efeito | execution ≠ effect | 执行 ≠ 效果 |
| efeito ≠ observação | effect ≠ observation | 效果 ≠ 观察 |
| mundo de referência ≠ cenário | reference world ≠ scenario | 参照世界 ≠ 场景 |
| resultado derivado ≠ Claim | derived result ≠ Claim | 推导结果 ≠ Claim |
| proveniência ≠ derivação | provenance ≠ derivation | 来源谱系 ≠ 推导过程 |
| derivação ≠ rastro operacional | derivation ≠ operational trace | 推导过程 ≠ 运行轨迹 |
| explicação ≠ prova | explanation ≠ proof | 解释 ≠ 证明 |
| contrato semântico ≠ realização | semantic contract ≠ realization | 语义契约 ≠ 实现 |
| representação lógica ≠ armazenamento físico | logical representation ≠ physical storage | 逻辑表示 ≠ 物理存储 |
| FormaSL ≠ Forma | FormaSL ≠ Forma | FormaSL ≠ Forma |

## 13. Qualification words that must survive translation

These qualifiers are materially important in Series 01 and must not be silently strengthened:

| PT-BR | EN | zh-Hans |
|---|---|---|
| pode | may / can | 可以 / 可能 |
| pode ser | may be | 可能是 / 可以是 |
| no desenho atual | in the current design | 在当前设计中 |
| atualmente | currently | 当前 / 目前 |
| no recorte atual | in the current slice | 在当前范围内 |
| verificado | verified | 已验证 |
| concebido como | conceived as | 被设计为 / 被构想为 |
| não implica | does not imply | 并不意味着 |
| não significa | does not mean | 并不表示 |
| não exige | does not require | 不要求 |
| não garante | does not guarantee | 不保证 |
| quando materialmente necessário | when materially necessary | 在具有实质必要性时 |

## 14. Review gate

Before a translated article leaves `draft: true`, verify:

- terminology against this contract;
- preservation of all source qualifications;
- preservation of paragraph-level argumentative sequence;
- no promotion of implementation/product direction into demonstrated capability;
- no promotion of a Claim/record/observation into truth;
- no collapse of normative, decision, execution and observation stages;
- no collapse of logical representation into physical storage;
- names and extensions remain invariant;
- Chinese text has been reviewed for idiomatic technical usage before high-visibility publication.
