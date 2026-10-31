# Implantação no Cloudflare Pages

## 1. Criar o projeto Pages

Recomendação: **Pages Direct Upload com GitHub Actions e Wrangler**. Esta escolha permite compilar o mdBook em CI, versionar sua revisão e enviar um único artefato para `/`, `/pt`, `/en`, `/zh-CN` e `/docs`.

No painel Cloudflare: **Workers & Pages > Create > Pages > Direct Upload**, ou via CLI:

```sh
npx wrangler login
npx wrangler pages project create
```

Escolha um nome de projeto (por exemplo `forma-site`) e o branch de produção `main`. **Atenção:** segundo a documentação Cloudflare, um projeto Direct Upload não pode ser convertido mais tarde em um projeto de Git Integration; pode, porém, continuar recebendo deploys via CI/Wrangler.

## 2. Publicar primeiro em prévia

No terminal deste pacote, com `dist/` já montado:

```sh
export CLOUDFLARE_PROJECT_NAME=forma-site
./scripts/deploy.sh preview
```

O script chama `npx wrangler pages deploy dist --project-name ... --branch preview`. Use uma URL de prévia antes de apontar o domínio público. A pasta `dist` atual é **SITE-ONLY**, apropriada apenas para revisão da camada institucional.

## 3. Preparar o ambiente de CI

Crie um repositório privado ou público dedicado ao site e copie para ele este pacote (sem arquivos pessoais e sem segredos). Configure os seguintes **secrets** do GitHub Actions:

- `CLOUDFLARE_ACCOUNT_ID` - ID da conta Cloudflare.
- `CLOUDFLARE_API_TOKEN` - token restrito à permissão de editar Cloudflare Pages na conta adequada.
- `FORMASL_READ_TOKEN` - apenas se `guilhermeleste/FormaSL` não puder ser lido pelo token padrão do workflow; limitar a leitura ao repositório.

Configure a **variable** `CLOUDFLARE_PROJECT_NAME` com o projeto criado e, no GitHub, dois **environments**, `preview` e `production`. Recomendado: proteção com aprovadores no ambiente `production`.

Invoque o workflow **Forma Cloudflare Pages (controlled deployment)** e forneça:

- `channel`: `preview` ou `production`.
- `docs_ref`: SHA completo e fixo do commit FormaSL validado.
- `site_origin`: HTTPS do domínio final (obrigatório para produção).
- `translations_reviewed`: só marcar se as versões EN/ZH foram aprovadas por revisores nativos.

O workflow baixa ambos os repositórios, compila mdBook 0.5.2, gera os assets, executa os gates e chama Wrangler para o deploy. O workflow **não é disparado automaticamente em push**; isso é uma escolha conservadora para a primeira publicação.

## 4. Conectar o domínio real

No projeto Cloudflare Pages: **Custom domains > Set up a domain**. Se o domínio raiz estiver envolvido, siga a configuração de zona/nameservers indicada pelo Cloudflare. Não hardcodar um domínio hipotético no código.

Na compilação de produção, `--origin https://DOMINIO` gera URLs absolutas `canonical` e `hreflang`, além de `sitemap.xml`. Para prévias sem `--origin`, o `robots.txt` desautoriza indexação; isso evita indexar acidentalmente um candidato.

O idioma deve ser detectado apenas na porta `/` por JavaScript. URLs explícitas `/pt/*`, `/en/*` e `/zh-CN/*` nunca devem ser redirecionadas com base no idioma do navegador.

## 5. Verificações no domínio publicado

No endpoint final, verificar HTTP 200, SSL, cache de assets, idioma, menus, responsividade, navegação por teclado e telas reais:

```sh
python3 scripts/check_live.py https://DOMINIO --docs
```

Visitar explicitamente `/pt/index.html`, `/en/index.html`, `/zh-CN/index.html`, `/pt/documentacao.html`, `/docs/en/conceitos-02-modelo-de-mundo.html` e `/docs/conceitos/02-modelo-de-mundo.html`. Verificar a busca mdBook real e o indicador de edição técnica inglesa versus edição portuguesa derivada.

## 6. Headers, redirects e segurança

O build produz `_headers`, `_redirects` e `404.html`. `Cache-Control` de CSS/JS é moderado, pois os nomes atuais não têm fingerprints. Foram ativados cabeçalhos básicos de segurança. **CSP rigorosa não foi incluída** porque a versão aprovada utiliza scripts e estilos inline, e uma política não auditada quebraria a interface.

O Cloudflare Pages processa `_headers` e `_redirects` para respostas de assets estáticos. A configuração muda se futuramente forem adicionadas Pages Functions.

## 7. Reversão e governança

Preservar o manifesto `RELEASE-MANIFEST.json` de cada publicação, o SHA FormaSL, a URL de deploy e as evidências de QA. Se uma release falhar, reimplantar o diretório `dist` do release anterior ou usar o rollback do Cloudflare Pages conforme a conta/projeto; nunca reconstruir com `master` móvel fingindo identidade com a revisão anterior.

**Fontes oficiais:**

- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
