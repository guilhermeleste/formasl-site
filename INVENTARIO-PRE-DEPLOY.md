# INVENTÁRIO PRÉ-DEPLOY — formasl.org (capturado 2026-10-31 ~20:00 UTC)

Levantamento executado ANTES de qualquer alteração. Fontes: API Cloudflare (MCP oficial),
DNS público, HTTP real, GitHub API. Nenhum valor secreto incluído.

## 1. Conta e zona

- Conta Cloudflare: `Luiz.leste@gmail.com's Account` — id `1d071eee7ca9f1fc74a37ef740af1c4c` (única conta acessível).
- Zona: `formasl.org` — id `c3dc18477f9d63efa103a3fb58760c8b` — **active**, plano Free.
- Registrar de origem: Spaceship, Inc. (nameservers delegados para Cloudflare: austin/holly.ns.cloudflare.com).
- `formals.org`: **NÃO está na conta** (nenhuma zona além de formasl.org). DNS público aponta para
  ns1/ns2.**afternic.com** (parking de venda do Afternic/GoDaddy, IPs 13.248.169.48 / 76.223.54.146).
  TLS falha com `tlsv1 unrecognized name`. Domínio distinto, fora da administração desta conta.

## 2. Hospedagem do site atual

- **Cloudflare Pages — projeto `formasl-site`** (id `fe6b95b7-2107-43a4-8b7d-44f741285abb`).
  - Subdomínio: `formasl-site.pages.dev`; custom domains: `formasl-site.pages.dev`, `formasl.org`.
  - Deployment de produção vigente: **`bbc38596-5927-4835-9dd0-ec9802afba58`** (URL `https://bbc38596.formasl-site.pages.dev`), criado 2026-09-01T21:51Z, trigger `ad_hoc` (direct upload, sem integração Git), `uses_functions: false`, production_branch `main`.
  - Conteúdo: site Astro v7.2.10, rotas `/en/`, `/pt-br/`, `/zh-hans/` (+ blog/glossary/privacy), asset `.webmcp/bridge.js` embutido no build.
  - `_headers` do site atual: nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options DENY, Content-Signal.
- **Sem** Workers scripts, **sem** Worker Routes, **sem** Pages Functions, **sem** Snippets na zona.

## 3. Roteamento de borda (mecanismo ativo além do Pages)

- Ruleset de zona **"FormaSL root locale redirect"** — fase `http_request_dynamic_redirect`,
  id `7479d0adeebf48df88d6a5db46163646`, versão 1, 9 regras **habilitadas**: 302 na raiz `/`
  para `/pt-br/`, `/en/` ou `/zh-hans/` conforme query `locale=`, cookie `formasl_locale`,
  Accept-Language, com fallback `/en/`. Backup integral em `evidence/legacy-redirect-rules.json`.
  - **Conflito com o novo site**: o catch-all `fsl_root_locale_default_en` intercepta `/` antes do
    Pages e redireciona para o caminho legado `/en/`; e os destinos legados deixariam de existir.
    Este ruleset DEVE ser desativado na troca de produção (procedimento de restauração no backup).

## 4. DNS da zona formasl.org (12 registros — NENHUM alterado até aqui)

| Nome | Tipo | Conteúdo | Proxied | Observação |
|---|---|---|---|---|
| formasl.org | CNAME | formasl-site.pages.dev | sim | serves the current site |
| formasl.org | MX | mailserver.purelymail.com (prio 0) | — | **E-MAIL — NÃO TOCAR** |
| formasl.org | TXT | v=spf1 include:_spf.purelymail.com ~all | — | **E-MAIL — NÃO TOCAR** |
| formasl.org | TXT | purelymail_ownership_proof=… | — | **E-MAIL — NÃO TOCAR** |
| formasl.org | TXT | google-site-verification=F7oIDQ… | — | verificação Search Console |
| autoconfig | CNAME | autoconfig.purelymail.com | sim | **E-MAIL — NÃO TOCAR** |
| _dmarc | CNAME | dmarcroot.purelymail.com | sim | **E-MAIL — NÃO TOCAR** |
| purelymail1._domainkey | CNAME | key1.dkimroot.purelymail.com | não | **E-MAIL — NÃO TOCAR** |
| purelymail2._domainkey | CNAME | key2.dkimroot.purelymail.com | não | **E-MAIL — NÃO TOCAR** |
| purelymail3._domainkey | CNAME | key3.dkimroot.purelymail.com | não | **E-MAIL — NÃO TOCAR** |
| _autodiscover._tcp | SRV | 0 443 autodiscover.purelymail.com | — | **E-MAIL — NÃO TOCAR** |
| 438b9dc2b5c18d9c7251c69b5a8c8ab0 | CNAME | verify.bing.com | não | verificação Bing |

- **`www.formasl.org`: NENHUM registro** (NXDOMAIN confirmado por dig e curl). → precisa de
  registro + regra 301.
- `www.formals.org`: resolve para o parking Afternic (domínio de terceiros/não administrado aqui).

## 5. TLS

- formasl.org: HTTPS válido via Cloudflare (HTTP/2, `server: cloudflare`, certificado Universal SSL
  do Cloudflare — emissão automática para apex + `*.formasl.org`).
- www.formasl.org: sem certificado até a criação do registro (Universal SSL cobre `*.formasl.org`
  uma vez que o hostname exista na borda).
- www.formals.org: erro TLS `unrecognized name` (SNI não atendido pelo parking).

## 6. Mecanismos a preservar para rollback

1. Deployment Pages `bbc38596-5927-4835-9dd0-ec9802afba58` permanece no histórico do projeto →
   rollback de produção via API (`POST .../deployments/{id}/rollback`) ou Wrangler.
2. `evidence/legacy-redirect-rules.json` — restauração integral do ruleset de redirecionamento.
3. Tabela DNS acima — nenhum registro de e-mail/verificação será modificado; única adição
   prevista: `www` (CNAME → formasl-site.pages.dev, proxied) e regra 301 www→apex.
4. Copia de trabalho do pacote + SHA dos insumos (SOURCE-HASHES verificado: 79 arquivos OK).

## 7. Estado HTTP observado (pré-deploy)

- `GET /` → **302** → `https://formasl.org/en/` (regra de borda legada, `cache-control: private, no-store`).
- `GET /en/` → 200 (Astro; `access-control-allow-origin: *`, headers de segurança do `_headers`).
- `GET /zzz-inexistente` → 404 servido pelo Pages.
- `GET /sitemap.xml` → sitemap do site atual (rotas `/`, `/en/*`, `/pt-br/*`, `/zh-hans/*`).
- `GET /.webmcp/bridge.js` → 200 (asset do build atual, 75 KB).
