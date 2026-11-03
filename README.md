# Forma — site institucional e documentação

Fontes do site [formasl.org](https://formasl.org), em português, inglês e chinês simplificado, com a documentação técnica mdBook no mesmo domínio.

O frontend é HTML, CSS e JavaScript estáticos. O projeto Astro anterior permanece no histórico Git; ele não é mais o build ativo deste repositório.

## Estrutura

```text
public-src/site/       fontes institucionais e assets aprovados
scripts/build.py       monta dist/ e, opcionalmente, compila o mdBook
scripts/validate.py    verifica idiomas, links, assets e gates de release
scripts/smoke_http.py  smoke HTTP local
scripts/test_locale.js
scripts/test_pipeline.py
                       regressões de idiomas e pipeline mdBook com fixture
scripts/check_live.py  verificações HTTP de uma publicação
scripts/deploy.sh      publicação controlada via Wrangler
docs-theme/            tema e navegação do mdBook
tools/                 QA Chromium e verificação real do coletor de analytics
.github/workflows/     CI de validação e deploy manual
```

`dist/`, caches e credenciais não são versionados. Relatórios legados em `evidence/` são históricos; os resultados de CI correspondentes ao commit atual ficam nas execuções do GitHub Actions.

## Prévia institucional local

Requisitos: Python 3.10+. Para testes de idioma e navegador, Node.js 20+.

```sh
python3 scripts/build.py --out dist
python3 scripts/validate.py dist
python3 scripts/smoke_http.py dist
node scripts/test_locale.js
python3 scripts/test_pipeline.py
python3 -m http.server 8000 --directory dist
```

Abra `http://localhost:8000/`. A entrada `/` considera o idioma do navegador; a seleção manual persiste e as URLs explícitas `/pt/`, `/en/` e `/zh-CN/` são preservadas.

Este build é **somente institucional**. As entradas `/docs/` informam que o manual não foi integrado. O teste `test_pipeline.py` usa uma fixture e não substitui o build do livro real.

### QA de navegador

Depois do build:

```sh
npm ci --prefix tools --ignore-scripts
node tools/node_modules/playwright/cli.js install chromium
node tools/qa_browser.cjs --directory dist --out .cache/browser-qa.json
```

O runner verifica desktop, viewport mobile, contato, estilo aplicado, foco de teclado e seleção de idioma em Chromium. Isso não substitui testes em aparelhos físicos ou outros navegadores.

## Build integrado com o mdBook

Requisitos adicionais: mdBook **0.5.2** e um checkout descartável, autorizado, do repositório FormaSL no SHA exato escolhido para a publicação. Não copie o repositório FormaSL privado para estas fontes públicas.

```sh
DOCS_REPO=/caminho/para/checkout-descartavel-do-FormaSL
DOCS_SHA=$(git -C "$DOCS_REPO" rev-parse HEAD)
python3 scripts/build.py \
  --out dist \
  --docs-repo "$DOCS_REPO" \
  --docs-ref "$DOCS_SHA" \
  --origin https://formasl.org
python3 scripts/validate.py dist --docs
python3 scripts/smoke_http.py dist
node tools/qa_browser.cjs --directory dist --out .cache/browser-qa.json
node tools/csp_check.cjs
```

Confirme o SHA aprovado antes de executar. O build verifica a identidade do checkout, faz staging dos insumos e executa o preprocessor de projeção oficial, sem modificar a origem. A revisão documental e os hashes dos assets ficam no `RELEASE-MANIFEST.json` gerado.

A edição técnica principal está em inglês, em `/docs/en/`; o material português derivado fica na árvore `/docs/`. **Não há manual técnico chinês completo.** A entrada `/docs/zh-CN/` explica essa limitação e aponta para a edição inglesa.

## CI e publicação

- `site-ci` roda em pushes, pull requests e acionamento manual. Valida as fontes institucionais, a fixture do pipeline e a navegação Chromium; não lê o repositório FormaSL privado e não publica no Cloudflare.
- `Forma Cloudflare Pages (controlled deployment)` é acionado **somente manualmente** e permanece disponível para o backend Pages preservado.
- `wrangler.jsonc` configura a entrega **Workers Static Assets**, sem código de servidor: a configuração padrão publica somente `formasl-site-agent-preview`; `--env production` seleciona `formasl-site-public` e as rotas dos dois hosts públicos. Use Wrangler **4.156.0**. Nenhum push publica automaticamente.
- Depois do build integrado e dos gates acima, `npx --yes wrangler@4.156.0 deploy --env ''` publica a prévia. A promoção `npx --yes wrangler@4.156.0 deploy --env production` exige autorização do operador e validação prévia; não desligue o Pages antes da troca. As rotas Workers são a chave de reversão para o backend preservado.
- O projeto Pages legado é `formasl-site`. Seu workflow manual usa os secrets `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` e, quando necessário, `FORMASL_READ_TOKEN`, além da variável `CLOUDFLARE_PROJECT_NAME`.
- A política de agentes é gerada pelo build: permite busca e respostas por IA (`ai-input=yes`), mas veda treinamento (`ai-train=no`). O Bot Preference Sync deve permanecer desativado para não sobrepor `use=reference`; os controles de segurança da zona são administrados separadamente pelo MCP.
- Segredos ficam no GitHub Secrets ou no ambiente local, nunca no código. `.env.example` contém apenas os nomes e valores públicos de configuração.
- O gate `--release --translations-reviewed` exige aprovação humana das traduções. Não marque esse campo para contornar uma revisão pendente.
- Não modifique DNS, TLS ou os registros de e-mail Purelymail como parte de uma alteração de conteúdo.

Consulte `DEPLOY-CLOUDFLARE.md`, `DOCUMENTACAO-MDBOOK.md`, `GATES-E-RISCOS.md` e `ROLLBACK.md` para o procedimento de publicação e reversão. Faça prévia e verificação antes de promover uma nova versão.

## Analytics

A inicialização do Cloudflare Web Analytics pertence à zona: não adicione um segundo beacon manual ao HTML. Para uma verificação autorizada em produção:

```sh
node tools/check_analytics.cjs --base-url https://formasl.org --out .cache/analytics-qa.json
```

O runner exige envio real para o coletor same-origin com HTTP 204, sem duplicação ou erros de CORS. Confirme também a ingestão dos eventos pelo MCP do Cloudflare. Os acessos de QA não são evidência de audiência orgânica.
