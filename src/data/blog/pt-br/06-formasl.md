---
locale: pt-br
slug: formasl
translationKey: series-01-06
title: "FormaSL"
description: "FormaSL é a linguagem de especificação semântica computável que declara mundos, relações, Claims, operações e obrigações semânticas sem confundir o contrato com sua realização física."
date: 2026-08-31
authors:
  - Forma Research Lab
category: "Série 01"
draft: false
hero: /blog/series-01/06-formasl.svg
heroAlt: "Um contrato FormaSL organiza tipos, relações por papéis, Claims, cenários e operações semanticamente distintas."
---

No artigo anterior chegamos à necessidade de uma linguagem. Se o significado deve permanecer identificável através de consultas, inferências, decisões, cenários e execuções, ele não pode depender apenas de convenções distribuídas entre código, banco de dados, documentação e configuração. Precisamos de uma forma explícita de declarar o mundo que queremos tornar computável, as diferenças que importam dentro dele e as operações que podem agir sobre essas diferenças. Essa forma é o FormaSL.

O FormaSL é uma linguagem de especificação semântica computável. Não porque todo significado possa ser capturado por uma linguagem nem porque tudo o que acontece no mundo possa ser reduzido a uma especificação, mas porque aquilo que decidimos representar computacionalmente precisa adquirir uma forma suficientemente explícita para ser operado sem que suas distinções dependam de conhecimento implícito da implementação. A linguagem declara estruturas, relações, qualificações e operações; a especificação estabelece o contrato que essas declarações devem respeitar; a semântica determina quais diferenças são materiais; e a computabilidade permite fazer desse mundo algo além de documentação.

Por isso, um arquivo `.fsl` não é simplesmente uma configuração para determinado programa executar. Ele é a fonte autoritativa do significado declarado pelo contrato. A qualificação é indispensável: aquilo que aparece num `.fsl` não se torna verdadeiro sobre a realidade por estar ali. Uma afirmação continua sendo uma afirmação, uma formalização de uma norma continua distinta da norma real e uma autorização representada continua dependendo da autoridade institucional que o domínio lhe atribui. A autoridade do contrato é semântica; não é uma autoridade universal sobre o mundo.

A maneira mais direta de perceber o que isso significa é começar por uma relação simples. A sintaxe atual permite declarar tipos e especificar os papéis ocupados pelos participantes:

```fsl
module relations_demo {
    type Agent
    type Item
    type Context

    relation Assigned {
        role assignee: Agent
        role item: Item
        role context: Context
    }
}
```

Há pouco código, mas há mais informação aqui do que a simples existência de três elementos conectados. Agent, Item e Context pertencem ao vocabulário daquele domínio; Assigned identifica uma relação; assignee, item e context dizem que posição semântica cada participante ocupa nela. Se dois participantes trocam de papel, não alteramos apenas a ordem em que os dados aparecem: alteramos a relação que está sendo declarada.

Essa estrutura é a expressão linguística de um problema que já havíamos encontrado antes de falar em FormaSL. Algumas relações precisam conservar identidade própria, vários participantes e papéis que não são intercambiáveis; podem ainda ser qualificadas, participar de outras relações e permanecer identificáveis através de transformações. A representação lógica escolhida atualmente pelo projeto é um metagrafo tipado de incidência por papéis. Isso não impõe um banco de grafos como forma física de armazenamento. O metagrafo pertence ao contrato lógico; persistência e execução pertencem a outro problema.

A diferença entre representar uma relação e afirmar alguma coisa sobre ela aparece ainda mais claramente nas Claims. Se queremos registrar que Alice possui determinada conta, talvez não seja suficiente conservar apenas a proposição. Pode importar saber quem a afirmou, sob que contexto e em que momento ela deve ser interpretada. A linguagem permite tornar isso explícito:

```fsl
module claims_demo {
    type Agent
    type Account

    relation Owns {
        role owner: Agent
        role asset: Account
    }

    assert claim c1 : Owns(owner: $alice, asset: $acc1) {
        by : $registry
        under : $jurisdiction
        valid_at : $t0
    }
}
```

A relação Owns aparece como conteúdo da Claim c1, mas as duas coisas não se confundem. A Claim é uma afirmação atribuível: possui identidade e pode carregar informações sobre emissor, contexto e papel temporal. Registrar que `$registry` afirmou algo sob `$jurisdiction` em `$t0` não equivale a declarar que aquilo é uma verdade absoluta. A linguagem conserva justamente a distância entre conteúdo, afirmação e verdade que motivou a construção do modelo de mundo.

Essa distinção não termina na sintaxe. No ciclo de vida de Claims verificado no recorte atual da implementação, permanecem separados a identidade da Claim, seu conteúdo, seu emissor, a base de emissão e sua ocorrência semântica. Comunicar ou utilizar uma Claim não cria automaticamente outra Claim. Uma nova afirmação do mesmo conteúdo pode ter outra identidade, outro emissor e outra história. A igualdade do conteúdo não apaga a diferença entre os atos de afirmar.

O mundo declarado também pode ser computado. A linguagem distingue, por exemplo, Match de Infer. Uma consulta procura estruturas que satisfazem determinado padrão; uma inferência deriva consequências segundo regras e premissas. Essa diferença é material porque um resultado derivado não se torna uma afirmação atribuível apenas por ter sido calculado. Se algum agente posteriormente assumir aquele resultado como uma Claim, surge uma nova transição semântica, com a atribuição correspondente. O raciocínio pode alimentar uma afirmação; não precisa se disfarçar dela.

A mesma disciplina aparece quando a computação entra no domínio normativo. A linguagem atual distingue Validate, Admit, Authorize e Decide. Não são quatro nomes para “aplicar uma regra”. Verificar conformidade com certas condições não equivale a admitir alguma coisa num domínio governado; admissão não concede automaticamente autoridade; autorização não é a própria decisão. Fazer essas diferenças aparecerem na linguagem impede que desapareçam justamente no ponto em que começam a determinar comportamento.

Esse princípio atravessa a superfície atual do FormaSL. Além de consulta, análise, inferência e transformação, ela contém operações para validação, admissão, autorização, decisão, revisão, cenários, pedidos de execução, observação, evolução de fonte e incorporação. O interesse dessa variedade não está em acumular palavras-chave, mas em permitir que formas diferentes de computação continuem reconhecíveis como formas diferentes de computação quando seus resultados entram numa cadeia maior.

Um cenário mostra com particular clareza por que isso importa. A linguagem pode partir de um mundo identificado como referência e introduzir premissas que pertencem apenas àquele contexto hipotético:

```fsl
module scenario_demo {
    type World
    content Basis

    scenario WhatIf($base: World) using Basis from $base {
        assume $stressor
    }
}
```

O cenário não precisa alterar aquilo que tomou como base. Ele introduz uma suposição em contexto próprio para que possamos computar sob ela. Se determinado resultado depende materialmente dessa suposição, essa dependência precisa permanecer recuperável. Descartar o cenário não modifica retroativamente o mundo de referência; fazer um resultado passar do hipotético para outro estatuto exige uma transição explícita. A diferença entre hipótese e mundo de referência, portanto, não permanece apenas como princípio abstrato: possui expressão na própria linguagem.

Algo semelhante vale para mudança e história. O FormaSL possui operações de revisão e evolução de fonte porque alterar aquilo que está representado não deve significar tratar o estado anterior como se nunca tivesse existido. Uma correção pode modificar o que passa a valer sem tornar impossível reconstruir o estado anterior quando essa história permanece relevante; uma fonte pode evoluir conservando a informação material sobre sua transformação. Revisão e apagamento continuam sendo coisas diferentes.

A fronteira entre decisão e execução também chega à linguagem. O FormaSL pode representar decisões, pedidos de execução e observações posteriores sem exigir que esses três momentos sejam fundidos numa única ação. Uma decisão pode dar origem a um pedido dirigido a um mecanismo externo; esse mecanismo pode tentar produzir um efeito; alguma informação sobre o resultado operacional pode então ser observada e reincorporada à representação. O executor não adquire autoridade semântica apenas porque realiza a ação, e uma resposta técnica de sucesso não precisa ser tratada automaticamente como prova de que todo efeito externo esperado ocorreu.

Essas diferenças revelam o papel da Continuidade Semântica dentro da própria linguagem. Uma consequência derivada precisa continuar reconhecível como derivada quando essa qualificação importa; uma Claim deve conservar aquilo que a mantém identificável como aquela Claim; uma hipótese não deve perder silenciosamente sua dependência do cenário; uma revisão não deve apagar a história necessária; uma decisão não pode virar execução apenas porque a etapa seguinte conseguiu consumi-la. A linguagem não exige que tudo seja preservado indefinidamente, mas exige que perdas e transformações semanticamente materiais não aconteçam por acidente.

Isso também impede que a implementação determine retroativamente o modelo semântico do sistema. Um compilador pode reorganizar estruturas, um índice pode mudar a forma de acesso, um banco pode armazenar relações de maneira diferente, um mecanismo pode utilizar outra estratégia de execução. Essas escolhas podem ser importantes para desempenho ou escala, mas nenhuma delas recebe autoridade para converter Claim em fato, hipótese em ocorrência ou resultado computado em decisão institucional simplesmente porque determinada representação física seria mais conveniente.

No recorte do repositório que serve de base a esta série, o projeto considera o FormaSL completo enquanto linguagem sob o horizonte atual. A expressão é deliberadamente restrita. Ela não afirma que a linguagem jamais mudará, que qualquer domínio concebível já foi modelado, que todo mecanismo necessário a qualquer aplicação esteja implementado ou que o ecossistema inteiro esteja concluído. Significa que, relativamente ao horizonte semântico atualmente estabelecido, o projeto considera fechado o conjunto de distinções fundamentais exigidas da linguagem nesta etapa.

Essa condição impede que toda nova necessidade computacional seja automaticamente transformada numa nova primitiva linguística. Um mecanismo de armazenamento, um algoritmo, um modelo de aprendizado de máquina ou uma infraestrutura de execução pode ser necessário para certa aplicação sem que essa necessidade revele uma lacuna na semântica da linguagem. A pergunta para o FormaSL é se existe uma diferença que precisa ser declarada ou preservada. A pergunta sobre qual mecanismo realizará determinada computação pertence a outro nível.

Essa fronteira se torna inevitável quando olhamos para as próprias operações que a linguagem consegue especificar. Uma inferência pode precisar de um mecanismo de raciocínio especializado; uma análise, de um modelo estatístico; determinada aplicação pode recorrer a aprendizado de máquina; uma consulta pode exigir índices particulares; uma execução pode terminar num sistema de pagamentos; o armazenamento pode exigir propriedades muito diferentes conforme o domínio e a escala. Tentar incorporar todos esses mecanismos num único ambiente significaria construir um sistema que cresceria na direção de implementar qualquer forma de computação de que qualquer aplicação pudesse precisar.

Não é essa a função do FormaSL. A linguagem precisa especificar o significado da computação, as distinções que ela recebe e as obrigações que seus resultados devem respeitar. Não precisa ser o mecanismo físico que realiza cada uma dessas computações. Um componente especializado pode resolver determinado problema muito melhor sem adquirir, por isso, autoridade para redefinir o contrato que recebeu.

A arquitetura atual torna essa fronteira explícita. O `.fsl` declara o contrato semântico e permanece sua fonte autoritativa; a realização pertence a um plano separado. Ela pode escolher mecanismos, recursos e estratégias adequados ao caso, desde que satisfaça as obrigações impostas pelo contrato. Execução concreta e armazenamento são responsabilidades novamente distintas. Podem ser combinadas num mesmo sistema em funcionamento, mas não precisam compartilhar identidade nem autoridade semântica.

Chegamos, portanto, ao limite da linguagem como resposta isolada. O FormaSL torna possível declarar um mundo semanticamente estruturado e especificar diferentes formas de computação sobre ele. Mas o próprio sucesso dessa linguagem cria uma exigência arquitetural: permitir que bancos de dados, mecanismos de raciocínio, modelos, simuladores, serviços e outras capacidades realizem essas computações sem que a semântica tenha de ser reinventada dentro de cada um deles.

Se o significado precisa permanecer estável enquanto a realização pode variar, a questão seguinte já não é que linguagem usar, mas que arquitetura torna essa separação computacionalmente sustentável.
