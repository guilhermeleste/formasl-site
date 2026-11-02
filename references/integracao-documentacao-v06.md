# Forma — Integração da documentação e internacionalização

**Marco:** 31 de outubro de 2026  
**Estado:** site institucional trilíngue implementado como candidato estático; integração integral do manual mdBook **planejada**, não concluída.  
**Decisões aprovadas:** navegação em duas camadas (narrativa editorial + atlas técnico), identidade visual derivada da apresentação, corpus v0.11 e três idiomas no site.

## 1. Princípio de arquitetura

O site institucional e a documentação técnica não devem tornar-se dois repositórios concorrentes de especificações.

- **Site institucional:** explica a premissa, os conceitos e os componentes; demonstra visualmente as relações; permite exploração por tema. Seu conteúdo pode ser adaptado editorialmente a cada idioma.
- **Portal da documentação (implementado):** `/{idioma}/documentacao.html` oferece percursos, classificações de assunto e links diretos para os arquivos técnicos reais do repositório. O portal está localizado nos três idiomas.
- **Manual técnico (integração futura):** um build publicado de mdBook, com busca e navegação próprias, preferencialmente sob `/docs/{idioma}/`, alimentado pela documentação versionada do repositório. O manual mantém distinção entre texto editorial e autoridade normativa.
- **Contratos e fontes FormaSL:** o código e as definições normativas continuam no repositório e nos carriers das autoridades; uma tradução não pode se tornar silenciosamente uma nova autoridade semântica.

**Não usar iframe como arquitetura permanente.** Um iframe dificulta navegação compartilhada, títulos de página, indexação, acessibilidade, links profundos e rastreamento de versões. A integração deve ser por URL, identidade visual, índice contextual e um catálogo de referências.

## 2. Estado documental verificado no repositório

O repositório `guilhermeleste/FormaSL` apresenta `docs/book/book.toml` e `docs/book/src/SUMMARY.md`.

O próprio `SUMMARY.md` declara que, desde as decisões G-T21=A e D-CUTOVER-03 (outubro de 2026), a **edição inglesa é a superfície técnica principal**. A edição `pt-BR` é **derivada/editorial**, sem pretensão de identidade textual nem autoridade normativa autônoma. A autoridade de significado se encontra nos documentos e contratos normativos e nas fontes correspondentes.

Há um ponto de configuração a reconciliar antes do deploy multilíngue do manual: `book.toml` ainda declara `language = "pt-BR"` enquanto a edição técnica principal identificada pelo sumário é a inglesa, e o sumário contém as duas árvores. Isso não é motivo para corrigir unilateralmente o repositório nesta etapa; é um requisito explícito para o pipeline de publicação por edição.

**Não foi identificado um corpus técnico completo em chinês simplificado.** O portal mostra esta condição, e links de capítulos em inglês aparecem identificados como EN, sem tradução fictícia.

Fontes verificadas:

- <https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/book.toml>
- <https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/src/SUMMARY.md>
- <https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/src/en/README.md>
- <https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/src/README.md>

## 3. Rotas atuais e rotas pretendidas

| Superfície | Implementado agora | Próxima etapa |
|---|---|---|
| Entrada e idioma | `/index.html` detecta idioma do navegador | Opcional: negociação HTTP no edge com `Accept-Language`, preservando seleção manual |
| Páginas institucionais | `/pt/*`, `/en/*`, `/zh-CN/*` | Conectar publicação e domínio público |
| Portal da documentação | `/pt/documentacao.html`, `/en/documentacao.html`, `/zh-CN/documentacao.html` | Trocar links de repositório por links para capítulos compilados quando houver build de versão correspondente |
| Manual técnico EN | Links diretos para `docs/book/src/en/*` | `/docs/en/` em mdBook versionado |
| Manual técnico PT | Links para a edição derivada disponível | `/docs/pt/` em mdBook separado e corretamente identificado como derivado |
| Manual técnico ZH | Portal em chinês e links EN identificados | `/docs/zh-CN/` **somente** quando houver tradução técnica revisada e com cobertura definida |
| Componentes | 17 perfis por idioma, com referências | Para cada perfil, acrescentar documentação específica compilada, status técnico e demos verificáveis |

Os nomes de arquivos `fundamentos.html`, `formasl.html` etc. são os mesmos nas três árvores. Isso simplifica o vínculo entre traduções e mantém o caminho ao trocar de idioma. As âncoras também são estáveis entre edições.

## 4. Como a seleção de idioma funciona

Implementação no site entregue:

1. Ao entrar em `/index.html`, um script examina primeiro `?lang=` quando há um código suportado; caso contrário, consulta a preferência salva (`localStorage`).
2. Sem preferência explícita, percorre `navigator.languages` (ou `navigator.language`). `pt*` → `/pt/`; `en*` → `/en/`; `zh*` → `/zh-CN/`; idiomas não suportados → inglês.
3. A troca no seletor global salva a preferência e abre a **mesma página lógica, com a mesma âncora**, no novo idioma.
4. URLs diretas `/en/...`, `/pt/...` e `/zh-CN/...` são respeitadas. O site não redireciona o visitante a cada navegação ou impede o compartilhamento de links.
5. O HTML possui `lang` correto e vínculos `hreflang` relativos. **No deploy, os vínculos hreflang devem ser transformados em URLs absolutas** após o domínio de produção ser definido.

Uma versão futura com negociação HTTP no CDN poderá reduzir o redirecionamento inicial. Ela não deve ocultar URLs localizadas nem sobrescrever a preferência escolhida manualmente.

## 5. Processo recomendado para integrar o mdBook

### Etapa A — Manifesto semântico de documentação

Criar no repositório um catálogo de IDs estáveis, e não apenas de caminhos de arquivo:

```yaml
- id: world-model
  en: en/conceitos-02-modelo-de-mundo.md
  pt: conceitos/02-modelo-de-mundo.md
  zh-CN: null
  classification: conceptual-editorial
- id: grammar
  en: en/referencia-gramatica.md
  pt: referencia/gramatica.md
  zh-CN: null
  classification: technical-reference
```

O manifesto deve registrar também revisão-fonte, status de tradução, link compilado e, quando necessário, a autoridade normativa à qual um capítulo se refere. A tradução nunca muda a identidade da fonte normativa.

### Etapa B — Separar edições de publicação

O `SUMMARY.md` atual mistura árvore técnica EN, conteúdo derivado PT e autoridades. Gerar, sem destruir esses arquivos, um sumário de publicação por idioma ou um conjunto de builds separados, testando a compatibilidade com o preprocessor `projection` já configurado. O build não deve simplesmente mudar a flag `[book].language` e continuar publicando capítulos de outros idiomas sem identificação.

Para traduções em escala, avaliar `mdbook-i18n-helpers` / `mdbook-gettext`, **após** testar precedência de preprocessadores, referências internas, code fences, exemplos `.fsl`, páginas derivadas e âncoras. O projeto oferece geração de traduções por catálogos gettext, mas não resolve sozinho a classificação de autoridade nem a cobertura de conteúdo.

### Etapa C — Publicar o manual no mesmo domínio

- Compilar a edição inglesa em `/docs/en/`.
- Compilar a edição portuguesa derivada em `/docs/pt/`, com identificação visível.
- Criar a edição `/docs/zh-CN/` quando os capítulos traduzidos tiverem revisão técnica e editorial suficientes; até lá, o portal trilíngue mostra links EN explícitos.
- Reaproveitar tokens do site por CSS adicional mdBook, sem substituir toda a estrutura interna do livro.
- Exibir um caminho de retorno ao site e manter os índices de busca separados por edição.
- Preservar links profundos, versões e cabeçalhos de provenance/autoridade, conforme aplicável.

### Etapa D — Testes e gates

Para cada release, verificar:

- `mdbook build` completo, links e âncoras válidos;
- consistência entre catálogo de capítulos e arquivos publicados;
- inexistência de fallback silencioso de idioma;
- código FormaSL preservado literalmente;
- exemplos e estado técnico conferidos no commit publicado;
- páginas institucionais e documentação com navegação coerente;
- busca técnica, teclado, leitor de tela e responsividade;
- paridade de conceitos essenciais entre versões localizadas;
- URLs `hreflang` absolutas, canônicas e sitemap por domínio/edição;
- tratamento de traduções defasadas quando a fonte EN muda.

## 6. O que já está entregue no candidato v0.6

- 70 arquivos HTML: raiz de seleção automática + 23 páginas por idioma (6 institucionais/portal e 17 componentes);
- paleta, tipografia e texturas minerais da composição aprovada;
- caminhos narrativos e técnicos, sumários locais e ligações contextuais;
- blocos de código didáticos preservados e demonstradores visuais sem execução de runtime;
- seletor global em 3 idiomas, persistência manual, deep links e âncoras mantidas;
- portal com 6 entradas temáticas e referências EN/PT verificadas no sumário;
- perfis individuais das 17 tecnologias com links para documentação e repositório;
- testes estáticos e renderizações de amostra registrados em `qa/`.

## 7. Limitações antes da publicação

O manual mdBook **não** está incorporado neste ZIP. O portal abre os arquivos reais no GitHub enquanto o build separado não estiver integrado. Não confundir essa primeira ligação documental com hospedagem do manual ou tradução técnica completa.

Ainda são necessários: domínio e CDN escolhidos; pipeline de publicação do mdBook; revisão editorial por falantes nativos de inglês e chinês simplificado; versão de código/evidência fixada; auditoria completa de acessibilidade e dispositivos reais; testes HTTP e automação em ambiente que permita navegação local; definição de política de busca e SEO. A renderização automatizada realizada aqui utilizou estilos e recursos incorporados porque o navegador do ambiente bloqueia servidores locais.
