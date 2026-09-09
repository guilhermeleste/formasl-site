---
locale: pt-br
slug: quando-agentes-passam-a-construir-software
translationKey: series-01-09
title: "Quando agentes passam a construir software"
description: "Contratos reutilizáveis reduzem o trabalho que agentes precisam reconstruir em cada nova aplicação."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 9
draft: false
---

Um agente que cria software hoje precisa produzir muito mais do que a lógica específica de uma aplicação.

Precisa definir schemas, APIs, validações, autorização, integrações, estados e parte considerável do modelo de domínio. Mesmo quando utiliza frameworks e serviços prontos, ainda precisa reconstruir como todas essas peças significam aquilo que a aplicação pretende fazer.

Esse custo existe porque cada aplicação começa com uma semântica local.

Quando o domínio já existe como contratos computáveis, o ponto de partida muda.

O agente pode reutilizar conceitos, relações, regras e políticas existentes. Em vez de redesenhar o mundo, combina partes de um mundo já definido e acrescenta apenas aquilo que é específico da nova necessidade.

Isso reduz drasticamente a distância entre intenção e aplicação funcionando.

Um contrato já pode definir o que é cliente, ativo, autorização, obrigação ou risco. Uma biblioteca de domínio já pode conter relações e regras comuns. Uma aplicação nova passa a compor esse patrimônio em vez de recriá-lo.

O agente ainda escreve código quando necessário. Ainda escolhe interfaces, fluxos e mecanismos. Mas uma parte maior do trabalho deixa de ser inventar novamente a infraestrutura semântica que sustenta o sistema.

Isso também muda a forma de testar software criado por agentes.

O sistema não precisa ser avaliado apenas pelo comportamento externo ou por exemplos. Parte de sua correção pode ser confrontada diretamente com o contrato que define o domínio: regras, distinções, condições e autoridade já estão explícitas antes da realização.

Surge então uma consequência econômica importante: aplicações que hoje seriam caras demais para justificar podem se tornar viáveis.

Nem toda necessidade precisa gerar um produto permanente.

Um agente pode criar uma aplicação para uma operação, projeto, análise ou decisão específica. Ela existe durante o período necessário, cumpre sua função e depois desaparece.

A interface desaparece.

A implementação pode desaparecer.

O significado não precisa desaparecer com ela.

Os contratos, dados, relações e regras permanecem disponíveis para a próxima aplicação.

Essa é a ideia de **aplicações efêmeras**: software cuja existência pode ser temporária porque o patrimônio mais importante não está preso à aplicação.

**A aplicação pode desaparecer sem que o conhecimento necessário para construir a próxima desapareça com ela.**

Esse deslocamento leva diretamente ao modelo de negócio da Forma. A linguagem que torna isso possível é aberta. A empresa monetiza outra camada: a realização em produção.