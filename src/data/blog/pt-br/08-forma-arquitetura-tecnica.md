---
locale: pt-br
slug: forma-arquitetura-tecnica
translationKey: series-01-08
title: "Forma: arquitetura técnica"
description: "A arquitetura Forma separa plano semântico, plano de realização e plano operacional, situando FormaSL, FormaDB, Platform, Studio e Cloud sem transferir autoridade semântica entre componentes."
date: 2026-08-31
authors:
  - Forma Research Lab
category: "Série 01"
draft: false
hero: /blog/series-01/08-forma-arquitetura-tecnica.svg
heroAlt: "Três planos — semântico, realização e operacional — organizam componentes Forma sob um contrato semântico comum."
---

No artigo anterior definimos a Computação Semântica como uma arquitetura na qual o significado declarado possui autoridade explícita sobre sua realização. Isso resolveu o problema em termos abstratos: diferentes mecanismos podem armazenar, consultar, inferir, analisar, executar ou coordenar uma aplicação sem adquirir, por isso, o direito de redefinir aquilo que ela significa. Resta mostrar como essa separação aparece concretamente no Forma.

Para isso, precisamos começar por uma distinção que até aqui pôde permanecer em segundo plano. FormaSL não é sinônimo de Forma. FormaSL é a linguagem de especificação semântica computável. Forma é a arquitetura técnica e o ecossistema organizados ao redor da possibilidade de declarar mundos semanticamente estruturados e realizá-los por mecanismos diferentes sem delegar a esses mecanismos a autoridade sobre o contrato.

A diferença importa porque seria natural chegar ao final desta série imaginando que representação, consulta, inferência, armazenamento, execução, autoria, operação e infraestrutura deveriam convergir para um grande ambiente de execução capaz de fazer tudo. A arquitetura Forma segue a direção oposta. Ela separa responsabilidades porque a mesma diferença que existe entre significado e realização precisa continuar visível quando passamos da linguagem aos componentes concretos do sistema.

O mapa fundamental pode ser representado assim:

```text
PLANO SEMÂNTICO
mundo + contrato .fsl + operações
              │
              │ obrigações semânticas
              ▼
PLANO DE REALIZAÇÃO
perfil .fsp
              │
              │ seleciona e vincula capacidades
              ▼
PLANO OPERACIONAL
armazenamento · consulta · inferência · análise
execução · observação · outras capacidades
```

Esse desenho não é um fluxo obrigatório pelo qual toda aplicação precisa passar sequencialmente. É um mapa de responsabilidades. Algumas aplicações utilizarão apenas parte dessas capacidades; outras combinarão mecanismos diferentes ou distribuirão a computação de formas distintas. O que permanece é a fronteira entre aquilo que o sistema declara significar, aquilo que uma realização escolhe para satisfazer esse contrato e aquilo que acontece quando os mecanismos escolhidos entram efetivamente em operação.

No plano semântico está o FormaSL. Sua representação lógica atual é um metagrafo tipado de incidência por papéis: relações podem manter identidade própria, participantes ocupam papéis semanticamente definidos e estruturas podem participar de relações de ordem superior. Essa escolha pertence ao modelo lógico. Não determina como cada relação precisa aparecer na memória, no disco ou nos índices utilizados por uma realização.

O `.fsl` é a fonte autoritativa do significado declarado. É nesse plano que tipos, relações, Claims, regras, políticas, contextos e operações formam o contrato computável do mundo representado. A autoridade continua estritamente limitada a esse contrato: uma Claim não se torna verdadeira porque foi declarada, uma formalização não se transforma na própria norma externa que representa e uma autorização computacional não produz automaticamente um efeito no mundo.

No recorte do repositório que fundamenta esta série, essa arquitetura possui uma superfície linguística concreta. Há operações para consulta, análise, inferência, transformação, validação, admissão, autorização, decisão, revisão, cenários, pedidos de execução, observação, evolução de fonte e incorporação. O ciclo de vida de Claims preserva, no mesmo recorte, elementos como identidade, conteúdo, emissor, base e ocorrência semântica. Parte das distinções construídas conceitualmente ao longo dos artigos, portanto, chega à estrutura efetiva da linguagem e da implementação verificada.

A documentação corrente considera o FormaSL completo enquanto linguagem sob o horizonte semântico atual. A qualificação continua importante: isso não significa que qualquer domínio concebível já esteja modelado, que nenhuma evolução futura possa ocorrer ou que o restante do ecossistema esteja concluído. Significa que, dentro do horizonte estabelecido para esta etapa, o projeto considera fechado o conjunto de distinções fundamentais exigido do núcleo linguístico.

Esse fechamento permite manter outras decisões fora dele. Um novo banco, algoritmo, modelo estatístico ou mecanismo distribuído pode ser necessário para determinada aplicação sem que sua existência obrigue a introduzir uma nova primitiva na linguagem. É justamente para separar essas necessidades que existe o plano seguinte.

O `.fsp` pertence ao plano de realização. Sua função não é estabelecer uma segunda semântica, mas descrever como capacidades exigidas pelo contrato serão satisfeitas. Uma aplicação pode precisar armazenar seu mundo, consultar relações, executar inferência, realizar análise, recorrer a aprendizado de máquina, coordenar trabalho ou solicitar ações externas. O perfil de realização liga essas necessidades aos mecanismos escolhidos para atendê-las.

A estratégia técnica pode, portanto, variar conforme o problema. Em certos casos o próprio ecossistema pode fornecer uma capacidade; em outros pode integrar uma implementação especializada; em outros ainda pode delegar a realização a uma infraestrutura externa. No desenho atual do ecossistema, essas possibilidades podem ser lidas como possuir, integrar ou delegar. Não são novas categorias semânticas. São formas diferentes de satisfazer um contrato que já existe.

O plano operacional começa quando essas escolhas se transformam em mecanismos concretos. Um armazenamento persiste representações. Um mecanismo de consulta procura estruturas. Um sistema de inferência deriva resultados. Um modelo pode realizar uma análise. Um executor tenta produzir uma ação. Uma observação pode devolver informação sobre o resultado externo. Cada componente possui uma função técnica; essa função não lhe concede automaticamente autoridade sobre o significado que atravessa o componente.

É dentro dessa decomposição que os componentes do ecossistema Forma podem ser situados.

FormaDB pertence ao domínio dos dados. No desenho atual do ecossistema, ele é concebido como o sistema de dados nativo para mundos Forma. Ser nativo significa poder ser projetado especificamente em torno das propriedades e necessidades desses mundos; não significa que a linguagem dependa ontologicamente dele. Uma aplicação FormaSL pode utilizar outro armazenamento se a realização alternativa satisfizer as obrigações pertinentes do contrato.

Também não decorre do metagrafo lógico que FormaDB precise armazenar fisicamente um grafo. Sua implementação pode escolher estruturas, índices e representações adequadas aos requisitos operacionais, desde que as propriedades semanticamente exigidas permaneçam preservadas ou reconstruíveis. A distinção estabelecida anteriormente continua válida mesmo para o sistema de dados concebido pelo próprio ecossistema: semântica em metagrafo não implica armazenamento físico em grafo.

As decisões atuais de produto registram ainda para FormaDB uma direção aberta ou comunitária de referência e a possibilidade de uma oferta gerenciada. Isso pertence ao desenho do ecossistema, não à semântica normativa do FormaSL, e não deve ser lido como afirmação sobre licença, disponibilidade comercial ou estado final de implementação.

Forma Platform ocupa outra responsabilidade. Ela é concebida como o produto integrado para operar mundos e computações Forma e coordenar as capacidades necessárias às suas realizações. Reduzi-la a uma central de controle de infraestrutura perderia justamente o objeto que ela pretende operar: aplicações cujos mundos, operações e realizações possuem estrutura semântica explícita.

Essa operação pode envolver armazenamento, raciocínio, análise, execução, recursos e integrações externas. Platform não precisa possuir internamente todas essas capacidades. Pode coordenar mecanismos fornecidos pelo próprio Forma e mecanismos especializados externos, desde que as relações entre eles e o contrato permaneçam explícitas. Coordenar a computação não a transforma, contudo, na fonte do significado que coordena. Essa autoridade continua no `.fsl`.

Forma Studio responde a outra necessidade: permitir que pessoas trabalhem com esse sistema. Ele é concebido como ambiente de autoria, modelagem, inspeção e depuração de mundos e contratos Forma. Estruturas que existem declarativamente em `.fsl` podem receber visualizações e formas de interação mais adequadas à edição e à investigação sem que a interface precise se tornar proprietária de seu significado.

Studio pode manter estado de interface, produzir representações auxiliares e oferecer abstrações úteis para a autoria. O que for material ao contrato, entretanto, não deve depender de informação escondida que exista apenas dentro da ferramenta. A interface pode ajudar a produzir e compreender o mundo sem se tornar uma segunda fonte semântica.

No desenho atual do produto, Studio possui orientação local-first, com o fluxo local essencial concebido para funcionar sem dependência de uma conta. Trata-se de uma decisão de produto, não de um requisito semântico da linguagem, mas ela é coerente com a arquitetura: a inteligibilidade do contrato não deveria depender de ele existir apenas dentro de um serviço remoto proprietário.

Forma Cloud, por sua vez, pertence ao domínio da realização gerenciada. É concebido como uma opção fornecida pelo próprio ecossistema para quem deseja operar aplicações Forma sobre infraestrutura administrada. Pode concentrar recursos, integração e conveniência operacional que seriam trabalhosos de reconstruir separadamente em cada implantação.

O caráter opcional é arquiteturalmente importante. Forma Cloud não é requisito para utilizar FormaSL e não é o lugar para o qual a autoridade semântica migra quando a aplicação é hospedada. Se interpretar corretamente um `.fsl` dependesse de semântica escondida na nuvem, o contrato deixaria de ser verdadeiramente autoritativo. Se somente uma infraestrutura gerenciada pudesse realizar legitimamente uma aplicação, a liberdade de realização seria apenas nominal. Cloud pode ser uma realização profundamente integrada ao ecossistema sem deixar de ser uma realização.

As responsabilidades podem então ser condensadas:

| Componente | Responsabilidade principal | Relação com a autoridade semântica | Relação com FormaSL |
|---|---|---|---|
| FormaSL / `.fsl` | declarar mundo, contrato e operações semânticas | fonte autoritativa do significado declarado | núcleo semântico |
| `.fsp` | descrever o perfil de realização | satisfaz o contrato; não o redefine | plano de realização |
| FormaDB | realizar nativamente o domínio de dados | não redefine o contrato | armazenamento nativo, não obrigatório |
| Forma Platform | operar e coordenar mundos, computações e realizações | não redefine o contrato | produto integrado, não requisito da linguagem |
| Forma Studio | autoria, modelagem, inspeção e depuração | não redefine o contrato | ambiente de trabalho opcional |
| Forma Cloud | fornecer realização gerenciada | não redefine o contrato | realização opcional |

A tabela tampouco representa uma pilha de autoridade. Cloud não está semanticamente acima de Platform; Platform não está acima de FormaDB; Studio não se torna fonte do significado porque foi utilizado para produzir um contrato. Há dependências, integrações e relações operacionais entre esses componentes, mas a autoridade sobre o significado declarado não se propaga simplesmente porque eles são compostos.

Essa distinção explica por que o ecossistema é concebido como componível, e não como um pacote indivisível. FormaSL não depende de Cloud. FormaDB não é condição ontológica para uma aplicação Forma. Studio pode participar da autoria sem ser necessário à execução. Platform pode operar capacidades internas e externas. Cloud pode oferecer uma realização gerenciada sem monopolizar a execução possível do contrato.

Componibilidade também não significa que qualquer conjunto arbitrário de componentes funcionará sem trabalho de integração. Um mecanismo externo ainda precisa satisfazer contratos técnicos, propriedades operacionais e obrigações semânticas. Algumas combinações podem exigir engenharia considerável; outras podem ser naturalmente favorecidas por integrações mais profundas. A arquitetura não promete equivalência operacional entre todas as realizações. Ela permite distinguir escolhas de infraestrutura de mudanças no significado da aplicação.

A Continuidade Semântica atravessa esse mapa inteiro. Não pertence exclusivamente ao compilador, ao armazenamento, a Platform ou a qualquer produto isolado. Quando o `.fsl` é elaborado, quando um perfil de realização é resolvido, quando estruturas são materializadas, quando uma análise é executada ou quando uma observação retorna do mundo externo, cada passagem pode preservar, transformar ou apagar informação necessária à interpretação posterior.

Se um resultado continua dependente de um cenário, essa dependência não pode desaparecer quando ele é armazenado. Se o emissor de uma Claim continua material à sua interpretação, uma projeção não pode convertê-la silenciosamente numa proposição sem atribuição. Se uma decisão produziu um pedido de execução, uma resposta operacional não pode apagar a diferença entre decidir, tentar executar, produzir um efeito e observar esse efeito. A liberdade de realização continua subordinada a essas obrigações.

Isso não autoriza afirmar que todo o ecossistema atual já oferece rastreabilidade integral de ponta a ponta para qualquer transformação possível. A arquitetura estabelece obrigações de preservação e reconstrução quando determinadas genealogias, dependências ou distinções são materialmente necessárias; o recorte atual de implementação oferece evidência para propriedades específicas. Uma alegação de cobertura total exigiria demonstração correspondente.

Chegamos, assim, a uma última distinção necessária para ler corretamente o mapa. Nem todas as afirmações feitas sobre Forma possuem o mesmo estatuto. A autoridade do `.fsl`, a separação entre contrato e realização, o metagrafo lógico e as obrigações de Continuidade Semântica pertencem à arquitetura normativa atual. A superfície da linguagem e comportamentos específicos do ciclo de Claims estão verificados no recorte do repositório utilizado nesta série. FormaDB, Platform, Studio e Cloud incluem, por sua vez, decisões atuais sobre a organização do ecossistema e dos produtos. Essas decisões podem indicar a direção técnica do Forma, mas não devem ser transformadas automaticamente em afirmações de disponibilidade comercial, maturidade, licença, preço ou nível de serviço.

Separar esses registros torna a arquitetura mais, e não menos, precisa. Normatividade, implementação e produto podem evoluir em ritmos diferentes sem que um estado temporário do código redefina o contrato ou que uma decisão de produto seja apresentada como capacidade já demonstrada.

Podemos então observar o Forma como um sistema inteiro sem reduzi-lo a nenhuma de suas partes. FormaSL declara mundos e operações; perfis de realização ligam esses contratos às capacidades necessárias; sistemas de dados podem materializar seus estados; mecanismos especializados podem consultar, inferir, analisar e executar; Platform pode coordenar essas capacidades; Studio pode torná-las manipuláveis e inspecionáveis para pessoas; Cloud pode oferecer uma realização gerenciada; mecanismos externos podem participar quando satisfazem as obrigações pertinentes. Nenhum desses componentes precisa transformar-se numa máquina universal, nem assumir sozinho a propriedade semântica do mundo que ajuda a computar.

É nesse ponto que a arquitetura retorna ao problema que abriu a série.

A empresa concreta existia antes de seus sistemas. Para torná-la computável, decompusemos suas determinações entre livros-razão, bancos de dados, sistemas comerciais, mecanismos de identidade, ferramentas de planejamento, modelos, interfaces e muitas outras especializações. Essa decomposição não foi um erro: foi ela que tornou diferentes aspectos da organização operacionalmente tratáveis. O problema surgiu quando cada recorte passou também a carregar implicitamente sua própria parte do significado e a unidade precisou ser reconstruída depois por identificadores, integrações, convenções e conhecimento espalhado entre sistemas.

Ao final da série, a especialização permanece. Continuamos tendo linguagem, armazenamento, raciocínio, análise, execução, interfaces, plataformas e infraestrutura. Não tentamos substituí-los por uma tecnologia única.

O que mudou foi o lugar da unidade: múltiplos recortes e múltiplas realizações podem continuar pertencendo ao mesmo mundo porque o significado que os relaciona não foi delegado a nenhum deles.
