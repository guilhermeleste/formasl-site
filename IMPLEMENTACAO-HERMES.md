# Prompt de implementação / entrega controlada

Implementar a publicação do site Forma no Cloudflare Pages usando **este pacote** como entrada. O objetivo é completar e validar uma entrega integrada, sem redesenhar o site nem modificar o significado do FormaSL.

## Autoridades e prioridades

1. Manter a interface institucional v0.6 e a navegação aprovadas. `public-src/site/` é a fonte estática e `references/corpus-editorial-v11.md` informa a redação institucional.
2. A documentação técnica é gerada do checkout real de `guilhermeleste/FormaSL`, no SHA que o owner fornecer. Não alterar contratos, exemplos, fontes `.fsl/.fsp` nem o texto normativo para satisfazer a publicação.
3. O `docs-theme/forma-docs.css` é um overlay de identidade, não um novo renderer ou um manual copiado.
4. No atual repositório, EN é a edição técnica principal; PT é derivada; ZH não possui manual integral. Respeitar esses estados em URLs, avisos e resultados de busca.

## Sequência de trabalho

1. Reconciliar `README.md`, `DEPLOY-CLOUDFLARE.md`, `DOCUMENTACAO-MDBOOK.md` e `GATES-E-RISCOS.md` com o ambiente vivo.
2. Obter domínio, projeto Pages, secrets e SHA de fonte FormaSL do owner; não inventar nenhum desses dados.
3. Clonar/revisar as fontes no SHA escolhido e executar `scripts/build.py --docs-repo ... --docs-ref ...` num ambiente com mdBook 0.5.2.
4. Executar `scripts/validate.py --docs` e `scripts/smoke_http.py` sobre `dist`; reprovar build incompleto, asset faltando, link inexistente ou revision drift.
5. Testar em Cloudflare preview (`--branch preview`): entrada automática, seleção manual, 23 páginas por idioma, 17 componentes por idioma, navegação técnica, busca mdBook, CSS escuro/claro, 404, telas desktop/mobile e navegação por teclado.
6. Para fechar publicação, exigir revisão nativa EN/ZH, origem HTTPS real e release manifest com docs SHA; aprovar owner antes de deploy ao branch de produção.
7. Revalidar o domínio público com `scripts/check_live.py ... --docs`; guardar URL da release, timestamp, SHA, gates e rollback.

## Vedações

- Não publicar apenas a prévia do mdBook como se fosse manual técnico.
- Não converter um link para Markdown em um link HTML compilado sem confirmar que o destino existe.
- Não alegar tradução de contratos em chinês.
- Não fazer fallback silencioso de idioma, em especial nas URLs explícitas.
- Não inserir CSP que bloqueie os scripts inline antes de auditar/remover inline scripts.
- Não declarar produção antes do gate humano, dos testes reais e da confirmação do domínio.
- Não alterar a árvore de trabalho FormaSL: o construtor deve usar cópia temporária para preprocessors.

## Saída obrigatória

Relatório final com: SHA de fonte, hash dos arquivos de publicação, projeto Pages, domínio, URL de prévia, URL de produção (se publicada), resultados dos gates, limitações observadas, status da documentação por idioma e procedimento de rollback. Se algo estiver pendente, declarar explicitamente `RELEASE_BLOCKED` e o menor conjunto de ações necessárias.
