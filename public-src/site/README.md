# Forma — Site trilíngue v0.6 (candidato de finalização)

**Estado:** projeto estático completo na camada institucional, com documentação vinculada por portal. Não foi publicado em produção.

## Arquitetura

```text
index.html            # Seleção automática por idioma de navegador
assets/               # CSS, JS e texturas aprovadas
pt/                   # 23 páginas em português
  index.html
  fundamentos.html
  formasl.html
  arquitetura.html
  ecossistema.html
  documentacao.html
  componente/           # 17 perfis individuais
en/                   # Mesma estrutura, em inglês
zh-CN/                # Mesma estrutura, em chinês simplificado
INTEGRACAO-DOCUMENTACAO-E-I18N.md
qa/                   # Evidências de renderização e testes
```

## Abrir localmente

Abra `index.html` no navegador para seleção automática, ou navegue diretamente para `pt/index.html`, `en/index.html` e `zh-CN/index.html`. Também é possível servir a pasta estaticamente:

```sh
python3 -m http.server 8000
```

A escolha do idioma usa `navigator.languages` e `localStorage`. Links compartilhados de idiomas explícitos sempre permanecem no idioma da URL. O usuário pode trocar de idioma pelo seletor global.

## Documentação

Cada idioma tem `documentacao.html` com seis portas de entrada. Os links abrem fontes existentes no repositório e indicam a edição EN/PT disponível. A documentação **técnica completa** permanece no mdBook do repositório, não foi duplicada nem traduzida automaticamente neste pacote. Leia `INTEGRACAO-DOCUMENTACAO-E-I18N.md` para a migração futura para `/docs/{locale}/` sob o mesmo domínio.

## Responsabilidades e limites

- 17 páginas de componente por idioma explicam função, integração e limites.
- FormaSL não é executado no navegador; código e demonstrações são didáticos.
- Marca, composição e texturas são derivadas da apresentação original e do protótipo aprovado v0.5.
- Textos institucionais derivados do corpus editorial Forma v0.11; versões EN/ZH são adaptações editoriais que exigem revisão nativa antes do lançamento.
- Links para GitHub usam `master` neste candidato. Fixar versão/tag ou commit na publicação.
- A edição técnica canônica do mdBook está em inglês. A pt-BR é editorial derivada; não há manual técnico integral em zh-CN nesta entrega.

## Validação

- 70 páginas e links internos checados de maneira estática;
- 24 renderizações de amostra (PT/EN/ZH; desktop e mobile) com Chromium e recursos incorporados, sem transbordamento horizontal nem erros JS;
- interações de menus, escolha de papéis, troca de perspectiva, abas de código e alternativas de realização;
- 8 cenários da lógica de idioma e 1 de mapeamento de página/âncora;
- não houve teste de navegação HTTP local por bloqueio do navegador automatizado do ambiente.

## Critérios pendentes

Hospedagem, integração do mdBook, conteúdo técnico chinês, tradução nativa, estabilidade dos links de versão, auditoria de acessibilidade e teste HTTP real. Não marcar como `production-ready` antes desses gates.
