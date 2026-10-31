# ROLLBACK — procedimento demonstrável (não executado em produção)

Estado de reversão disponível em 2026-10-31T20:45Z. Três camadas independentes:

## 1. Reverter o conteúdo do site (Cloudflare Pages)

O deployment anterior de produção continua no histórico do projeto `formasl-site`:

```text
id:  bbc38596-5927-4835-9dd0-ec9802afba58   (Astro v7.2.10, produção até 2026-10-31T20:34Z)
url: https://bbc38596.formasl-site.pages.dev
```

Reversão via API (o Wrangler 4.156 não possui subcomando rollback; dashboard:
Workers & Pages > formasl-site > Deployments > bbc38596 > Rollback):

```sh
curl -X POST "https://api.cloudflare.com/client/v4/accounts/1d071eee7ca9f1fc74a37ef740af1c4c/pages/projects/formasl-site/deployments/bbc38596-5927-4835-9dd0-ec9802afba58/rollback" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

ou via MCP (ferramenta `post_accounts_pages_projects_deploymen_343a9af2` com
project_name=formasl-site, deployment_id=bbc38596-5927-4835-9dd0-ec9802afba58).

Efeito: formasl.org volta a servir o site Astro imediatamente (a associação do custom domain
acompanha o deployment de produção ativo). Sem rebuild.

## 2. Reverter as regras de borda (zona formasl.org)

Backup integral das 9 regras originais (versão 1 do ruleset `7479d0adeebf48df88d6a5db46163646`):

```text
evidence/legacy-redirect-rules.json
```

Restauração: `PUT /zones/c3dc18477f9d63efa103a3fb58760c8b/rulesets/phases/http_request_dynamic_redirect/entrypoint`
com o JSON de backup (ou PUT com `{"rules": []}` para apenas neutralizar as regras atuais).
As regras v4 atuais (301 legados→novos, 301 www→apex) devem ser removidas/reavaliadas junto,
pois assumem o novo site no ar.

## 3. Reverter o DNS www

Registro criado nesta campanha (única alteração de DNS):

```text
www.formasl.org CNAME formasl-site.pages.dev (proxied) id ab203198d49831e373f4374f55030db9
```

Remoção via dashboard ou `DELETE /zones/.../dns_records/ab203198d49831e373f4374f55030db9`.
Nenhum outro registro foi criado, modificado ou removido (e-mail Purelymail intocado —
inventário completo em INVENTARIO-PRE-DEPLOY.md).

## Ordem recomendada de reversão completa

1. Rollback do deployment (1) — o domínio volta ao conteúdo anterior.
2. Restaurar ruleset v1 (2) — recupera o roteamento de borda do site antigo
   (necessário: o site antigo dependia do 302 de raiz).
3. Se desejar remover o www: apagar o registro (3) — opcional; com o site antigo no ar,
   o www continuaria 301 para o apex (comportamento razoável também sem remoção).
4. `POST /zones/.../purge_cache {"purge_everything": true}` para limpar cópias de borda.
