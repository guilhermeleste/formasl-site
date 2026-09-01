---
version: alpha
name: FormaSL Website
description: Sistema de design Modernista Estrutural para formasl.org.
colors:
  primary: "#171716"
  surface: "#F3F0E8"
  muted: "#67635D"
  accent: "#A44332"
  divider: "#1717162E"
typography:
  display-lg:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.04em
  display-sm:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 2.875rem
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -0.035em
  display-cjk-lg:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 3.75rem
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: 0em
  display-cjk-sm:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: 0em
  article-title-lg:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -0.035em
  article-title-sm:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 2.625rem
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.03em
  article-title-cjk-lg:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 3.25rem
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: 0em
  article-title-cjk-sm:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: 0em
  section-title:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 2.125rem
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.025em
  item-title:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  lede:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.72
  body-cjk:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0em
  body-sm:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Instrument Sans, Helvetica Neue, Segoe UI, Arial, sans-serif"
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.06em
  label-cjk:
    fontFamily: "Noto Sans SC, Noto Sans CJK SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0em
  technical:
    fontFamily: "Commit Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  subtle: 0.125rem
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  xxl: 3rem
  xxxl: 4rem
  xxxxl: 6rem
components:
  site-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
  language-switch:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  metadata:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  sequence-accent:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  editorial-rule:
    backgroundColor: "{colors.divider}"
    height: 1px
    rounded: "{rounded.none}"
  article-body:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  code-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.technical}"
    rounded: "{rounded.subtle}"
    padding: "{spacing.lg}"
  article-navigation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  site-footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
---

# FormaSL Website Design

## Overview

O formasl.org adota **Modernismo Estrutural** como linguagem visual. O sistema deve parecer compacto, técnico, preciso, contido e editorial. Estrutura precede ornamento. O site deve parecer uma publicação técnica com identidade própria, não uma landing page genérica de software.

O princípio central é: **compactar a interface, não a leitura**. Navegação, metadados e elementos institucionais devem ocupar apenas o espaço necessário. Conteúdo editorial de leitura longa mantém medida, entrelinha e ritmo vertical adequados à leitura sustentada.

A hierarquia visual é obtida prioritariamente por tipografia, alinhamento, sequência, espaçamento e regras estruturais. Imagens só aparecem quando comunicam estrutura, relação, transformação ou outra operação intelectual que justifique sua presença.

Este documento é o contrato operacional de design de `formasl.org` e incorpora para a Web as decisões pertinentes do baseline público da marca. `FormaSL` e `Forma Research Lab` permanecem nomes invariantes e não são traduzidos. A experiência deve permanecer coerente em inglês, português brasileiro e chinês simplificado.

## Colors

A superfície predominante é **Paper** e o elemento estrutural predominante é **Carbon**.

- **Primary / Carbon (`#171716`)**: texto principal, títulos, wordmarks e estrutura de alto contraste.
- **Surface / Paper (`#F3F0E8`)**: superfície padrão da publicação.
- **Muted (`#67635D`)**: metadados, informação auxiliar e conteúdo de baixa ênfase.
- **Accent / Oxide (`#A44332`)**: acento estrutural raro para posição, distinção ou pequena ênfase.
- **Divider (`#1717162E`)**: separadores estruturais discretos.

Oxide não é aplicado automaticamente a todo label, eyebrow, link ou título. Seu uso repetitivo destrói seu valor de acento. A identidade deve continuar legível e estruturalmente compreensível se o Oxide for removido.

Prefira regras, tipografia e alinhamento a containers coloridos. Não crie paletas secundárias para diferenciar páginas, idiomas ou artigos.

## Typography

**Instrument Sans** é a família tipográfica institucional e editorial principal. **Commit Mono** é reservada a código, identificadores formais, notação ou outros elementos cujo status técnico seja relevante; monospace não é ornamento.

As famílias declaradas incluem fallbacks. A implementação deve ser previsível quando a fonte preferencial não estiver disponível e não deve depender de uma CDN tipográfica externa para renderização básica em ambientes onde essa CDN possa ser inacessível.

`display-lg` e `display-sm` representam limites responsivos, não breakpoints rígidos. O mesmo vale para `article-title-lg` e `article-title-sm`. Para `zh-Hans`, utilize os tokens CJK correspondentes e nunca aplique tracking negativo latino a caracteres chineses.

Headlines são dominantes, mas não monumentais. Não reduza a escala tipográfica artificialmente apenas para fazer todo conteúdo caber na primeira viewport.

A prosa longa busca aproximadamente **68–72 caracteres por linha**, com cerca de 70 caracteres como medida preferencial para textos latinos. Em chinês, a medida é avaliada visualmente em vez de reproduzir mecanicamente a métrica latina.

Metadados permanecem subordinados ao título, deck e autoria. Estados de foco de teclado devem ser claramente visíveis; não remova o foco padrão sem alternativa de visibilidade igual ou superior.

## Layout

O layout utiliza uma estrutura fluida com largura máxima controlada em desktop. O shell principal permanece próximo de aproximadamente 1180px, mas diferentes tipos de conteúdo possuem medidas distintas dentro dele.

Há três regimes de densidade: **interface e navegação compactas; apresentação da home clara e controlada; leitura editorial espaçosa**.

O header parece infraestrutura, não seção editorial. Em desktop, sua presença vertical normalmente se resolve entre 68px e 76px; isso é orientação de composição, não altura fixa. Em mobile ele pode ficar mais alto se a navegação precisar de duas linhas.

A home é predominantemente alinhada à esquerda. O hero contém uma headline localizada e dois parágrafos explicativos fornecidos pelo modelo de conteúdo. `DESIGN.md` não é fonte de copy editorial. O hero não possui ilustração decorativa, card de fundo ou CTA primário independente quando a navegação editorial normal resolve o percurso.

Em viewports desktop usuais, headline e explicação devem aparecer integralmente ou quase integralmente na primeira viewport sem comprometer legibilidade. Esse é um objetivo de composição em escala normal, não uma exigência para zoom ampliado ou tecnologias assistivas.

Listas editoriais usam principalmente regras horizontais, alinhamento e espaçamento. Cards não são a unidade estrutural padrão. Na home, artigos recentes podem combinar texto e figura editorial compacta; a figura tem presença limitada e não cresce indefinidamente com a viewport. O índice completo de uma série é predominantemente tipográfico.

A página de artigo utiliza um frame editorial que acomoda figuras mais largas e uma coluna de prosa mais estreita. Figuras editoriais usam proporção canônica **3:2**, salvo exceção justificada pelo conteúdo.

Espaço negativo serve à hierarquia ou à leitura. Não use grandes áreas vazias apenas para fabricar dramaticidade, prestígio ou aparência de luxo.

## Elevation & Depth

O sistema é predominantemente plano. Hierarquia não depende de sombras, superfícies flutuantes ou profundidade simulada.

Não use drop shadows como separação padrão, glassmorphism, blur decorativo, cartões flutuantes ou camadas tonais sem função estrutural. Produza hierarquia com tipografia, espaçamento, alinhamento, regras, contraste, posição e sequência. Quando uma fronteira for necessária, prefira uma regra estrutural fina. A superfície Paper permanece visualmente contínua na maior parte da experiência.

## Shapes

A linguagem formal é arquitetônica e quase quadrada. `0px` é o raio padrão; `2px` pode ser usado onde um pequeno amaciamento tiver função concreta.

Não introduza pills, containers fortemente arredondados, blobs decorativos, círculos arbitrários ou formas orgânicas usadas apenas para ornamentação. Formas presentes em diagramas são exceção somente quando representam algo no argumento; a geometria precisa carregar significado estrutural.

## Components

### Site Header

O header é compacto e horizontal em desktop. O wordmark FormaSL deve ser visualmente contido e normalmente aparecer próximo de 125–135px de largura, sujeito a ajuste óptico sem alterar o SVG canônico. A navegação contém apenas destinos necessários e o seletor de idiomas permanece visível.

Em mobile, preserve acesso direto a Artigos, GitHub e idiomas ativos. Não esconda a navegação principal apenas porque a viewport ficou estreita e não introduza um hamburger menu enquanto uma composição simples de uma ou duas linhas resolver o problema.

### Homepage Hero

O hero contém uma headline localizada e dois parágrafos de apoio localizados. O conteúdo canônico vem da camada editorial/i18n. Não inserir eyebrow redundante com a expansão do nome FormaSL, grande botão primário apontando para Artigos, imagem decorativa ou superfície contrastante.

### Editorial Lists

Uma sequência editorial deve parecer uma sequência, não uma coleção de produtos independentes. Na home, itens recentes podem combinar texto e figura; em uma página completa de série ou índice, tipografia, sequência e relações entre artigos dominam. A posição na série é visível, mas subordinada ao título. Use Accent apenas em pequenos elementos de sequência quando isso acrescentar significado.

### Article Header

A hierarquia normal é: série e posição → título → deck → autoria → função do autor → data. A autoria é tipográfica; nome e função vêm do modelo editorial. Não use avatar, author card, caixa biográfica ou painel de redes sociais no cabeçalho editorial padrão.

### Article Body

A coluna principal prioriza leitura longa e não ocupa automaticamente toda a largura do frame editorial. Tabelas, código e estruturas técnicas podem exceder a medida normal quando necessário. O ritmo vertical distingue parágrafo, seção, subseção, bloco técnico, citação e figura sem fragmentação excessiva.

### Article Figures

Figura editorial é explicação diagramática, não cover art. Ela torna perceptível uma relação, transformação, distinção, limite, sequência, arquitetura ou outra operação central ao argumento. Ao observar brevemente título e figura, o leitor deve conseguir inferir aproximadamente qual problema intelectual está sendo tratado.

Prefira diagramas independentes de idioma. Labels técnicas invariantes como `.fsl`, `.fsp`, `Claim` ou `FormaSL` podem aparecer quando melhorarem materialmente a compreensão. Não produza geometria abstrata vermelha e preta apenas para comunicar sofisticação tecnológica. Uma série pode evoluir de representações concretas para estruturas formais quando essa evolução acompanha o argumento.

### Social Cards

Social cards e figuras editoriais são assets distintos. Social cards utilizam composição própria em **1200×630** e podem incorporar um fragmento contido da figura correspondente. Metadata textual da página continua sendo a fonte canônica de título, descrição e autoria para o preview.

### Article Navigation

A navegação torna claros item anterior, contexto editorial e próximo item. Ela não parece uma área de marketing ou CTA. Use alinhamento, regras e tipografia antes de containers.

### Site Footer

O footer é compacto e institucional. O wordmark Forma Research Lab aparece em escala contida. Não repetir frases institucionais redundantes quando wordmark e copyright já estabelecem a atribuição. O footer não é um segundo hero.

## Do's and Don'ts

### Do

- Compacte navegação e chrome, não a experiência de leitura.
- Use tipografia, espaçamento, alinhamento e regras como gramática visual principal.
- Preserve alinhamento à esquerda como estratégia normal.
- Use Oxide de forma rara e estrutural.
- Faça títulos e hierarquia editorial dominarem sobre imagens.
- Faça cada figura explicar uma relação, transformação, distinção ou arquitetura específica.
- Preserve uma medida confortável de prosa longa.
- Trate chinês simplificado como problema tipográfico próprio.
- Mantenha Artigos, GitHub e idiomas acessíveis no mobile.
- Preserve os wordmarks canônicos.
- Use espaço negativo quando ele sustentar hierarquia ou leitura.
- Mantenha estados de foco claramente visíveis.
- Avalie PT-BR, inglês e zh-Hans separadamente durante QA.

### Don't

- Não use cards como primitivo universal de layout.
- Não use gradientes, glow, glassmorphism ou sombras decorativas.
- Não use cérebros, redes neurais ou grafos de nós como clichê visual de IA.
- Não use enormes áreas vazias apenas para criar dramaticidade.
- Não transforme títulos em monumentos tipográficos.
- Não use Oxide em todo label ou interação.
- Não use pills ou cards SaaS arredondados.
- Não introduza hero imagery decorativa.
- Não adicione CTA de marketing sem função real.
- Não transforme autoria em perfil social.
- Não esconda navegação essencial em mobile sem substituição igualmente direta.
- Não use monospace como decoração.
- Não transforme um índice editorial numa galeria de capas.
- Não trate social card e figura editorial como o mesmo asset.
- Não imite uma landing page de SaaS maduro.
- Não altere o design apenas para eliminar warnings não materiais de uma ferramenta de lint.
