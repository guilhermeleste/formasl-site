# Forma no Cloudflare Pages - pacote de implementação v1

**Estado:** candidato de implantação. O site institucional está compilado para prévia e validado estaticamente. O manual mdBook só entra no release quando compilado de um checkout verificado do repositório FormaSL.

## Decisões de arquitetura

- **Hospedagem:** um projeto Cloudflare Pages para o site estático e o manual técnico no mesmo domínio.
- **Frontend:** HTML/CSS/JavaScript estáticos. Não é necessário SSR, Workers Functions, banco de dados ou framework JS.
- **Idiomas institucionais:** `/pt/`, `/en/`, `/zh-CN/`; a entrada `/` detecta idioma do navegador com opção manual persistente.
- **Documentação:** compilação do mdBook do FormaSL em `/docs/`, com edição principal inglesa em `/docs/en/` e material derivado português na árvore original. **Não há manual técnico chinês completo.**
- **Identidade visual:** site v0.6 aprovado; mdBook usa uma camada de CSS da marca sobre seu tema nativo. Não se duplica o manual nem se altera a autoridade dos contratos.
- **Deploy controlado:** build reproduzível e validações antes de subir para Cloudflare. O CI inicial é manual (`workflow_dispatch`), com canal de prévia e de produção.

## Estrutura

```text
public-src/site/          70 HTML, JS, CSS e texturas da v0.6
scripts/build.py          constrói /dist, opcionalmente compila mdBook
scripts/validate.py       checa rotas internas, assets, anchors e gates
scripts/smoke_http.py     teste HTTP local de arquivos estáticos
scripts/deploy.sh         deploy via Wrangler (protegido por gates)
scripts/test_pipeline.py  teste com fixture do pipeline, não do mdBook real
docs-theme/               identidade visual e indice contextual do manual
.github/workflows/       CI controlado de prévia/produção
dist/                    artefato pré-compilado SITE-ONLY para avaliação

design/                  referências aprovadas

evidence/                evidência de validações deste pacote
```

## Uso mais rápido: prévia institucional (sem manual mdBook compilado)

Requisitos: Python 3.10+.

```sh
python3 scripts/build.py --out dist
python3 scripts/validate.py dist
python3 scripts/smoke_http.py dist
python3 -m http.server 8000 --directory dist
```

Abra `http://localhost:8000/`. A URL `/docs/` mostrará explicitamente que o mdBook ainda não foi incluído. As páginas institucionais mantêm as referências aos arquivos no GitHub.

## Build integrado, com mdBook original

Requisitos: checkout **descartável** do repositório FormaSL na revisão exata; Python 3.10+; `mdbook` 0.5.2; `git`.

```sh
# Substituir pelos valores efetivos da implantação.
DOCS_SHA=<sha-de-40-caracteres>
SITE_ORIGIN=https://seu-dominio.example

python3 scripts/build.py \
  --public public-src/site --out dist \
  --docs-repo /caminho/para/FormaSL \
  --docs-ref "$DOCS_SHA" \
  --origin "$SITE_ORIGIN"
python3 scripts/validate.py dist --docs
python3 scripts/smoke_http.py dist
```

O script monta uma cópia temporária dos insumos relevantes do mdBook, executa o **preprocessor de projeção oficial** e personaliza o HTML gerado. O checkout de origem permanece intacto.

**Importante:** o comando acima é um build de teste com documentos integrados, não a liberação para publicação. Um release produtivo exige as condições abaixo.

## Gate de produção

```sh
python3 scripts/build.py \
  --out dist \
  --docs-repo /caminho/para/FormaSL \
  --docs-ref "$DOCS_SHA" \
  --origin "$SITE_ORIGIN" \
  --translations-reviewed \
  --release
python3 scripts/validate.py dist --docs --release
```

Use `--translations-reviewed` **somente depois** da revisão humana das adaptações institucionais em inglês e chinês simplificado. Não é uma certificação automática.

Leia `DEPLOY-CLOUDFLARE.md`, `DOCUMENTACAO-MDBOOK.md` e `GATES-E-RISCOS.md` antes de publicar.

## Situação atual

- Compilação do site estático: **PASS**.
- Verificação dos caminhos locais: **PASS**.
- Smoke HTTP estático: **PASS**.
- Prévia visual com CSS incorporado: **PASS**, mas sem navegação HTTP automatizada.
- Fluxo de staged-build e personalização mdBook: **PASS em fixture**, não verificado com o livro real.
- Build do manual real e navegação em Cloudflare: **PENDENTES**.
- Traduções nativas e acessibilidade completa: **PENDENTES**.

Este pacote não publica nem modifica nada na conta Cloudflare e não executa `git push`.
