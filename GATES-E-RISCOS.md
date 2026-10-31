# Critérios de aceite e riscos

| Gate | Exigência | Estado neste pacote |
|---|---|---|
| S-01 | 69 páginas localizadas e paridade de caminhos PT/EN/ZH | PASS |
| S-02 | Assets CSS/JS/imagens e 1.806 links locais, 348 âncoras | PASS |
| S-03 | Smoke HTTP com servidor estático | PASS |
| S-04 | Renderização ilustrativa desktop/mobile por HTML inlined | PASS (36 casos) |
| S-05 | Verificação de idioma em URL real com Chromium | PENDENTE (sandbox bloqueia HTTP) |
| D-01 | Staging do livro e personalização sem alterar o repo | PASS com fixture |
| D-02 | Compilação do mdBook FormaSL real, projection e links | PENDENTE (sem checkout integral/mdbook local) |
| D-03 | Tema testado nos capítulos reais e busca | PENDENTE |
| P-01 | Domínio escolhido e TLS configurado | PENDENTE |
| P-02 | Release CI com SHA fixo e traduções revisadas | PENDENTE |
| P-03 | Auditoria de acessibilidade e navegador/dispositivos reais | PENDENTE |
| P-04 | Validação live dos headers, links e 404 | PENDENTE |

## Regras de não promoção

- Build institucional sem mdBook compilado é apenas **preview**, mesmo com todas as páginas traduzidas.
- O argumento `--translations-reviewed` confirma uma decisão humana; o código não executa revisão linguística por conta própria.
- O teste com fixture mdBook não é prova de compatibilidade integral do livro real.
- A composição visual está aprovada, mas o overlay CSS do mdBook ainda exige validação renderizada sobre a fonte real.
- Não inventar traduções normativas chinesas nem converter textos editoriais em fontes de autoridade.
- Não promover antes de testar as rotas institucionais e de documentação na URL Cloudflare de prévia.

## Decisões pendentes do proprietário

1. Domínio HTTPS definitivo.
2. Nome da conta/projeto Pages e quem possui os segredos de CI.
3. SHA do FormaSL que servirá de base à primeira versão pública.
4. Aprovação das traduções institucionais EN/ZH por revisores adequados.
5. Verificação técnica final do manual compilado e da cobertura documental por idioma.

A publicação não ocorreu nesta conversa.
