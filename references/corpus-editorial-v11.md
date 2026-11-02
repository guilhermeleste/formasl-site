# FORMA — Corpus editorial v0.11 | Versão final

**Finalidade:** texto institucional e explicativo para o site Forma.  
**Natureza desta versão:** revisão editorial final do corpus v0.10, com ajustes de clareza, sintaxe, ritmo, coesão e precisão vocabular.  
**Estado:** redação editorial consolidada; a verificação técnica de atualidade e a aprovação para publicação são etapas distintas.  
**Escopo:** exclusivamente texto. As seções I a IX constituem o conteúdo público proposto; a seção X reúne notas internas.

---

# I. Página inicial

## FORMA

### Uma nova forma de fazer software.

O Forma desenvolve uma arquitetura de **Computação Semântica** e uma linguagem própria, o **FormaSL**. Nela, conceitos, relações, afirmações e regras são declarados como parte do programa. Seu significado deixa de depender exclusivamente de convenções espalhadas entre código, serviços e bancos de dados e passa a orientar consultas, inferências e outras operações.

Essa arquitetura parte de uma premissa: pessoas, organizações e sistemas observam a realidade de posições diferentes. Cada agente dispõe de informações próprias, faz afirmações e toma decisões em determinadas condições. O FormaSL permite representar essas posições e relacioná-las, preservando a origem e o contexto das informações que entram na computação.

**Conhecer o Forma · Explorar o FormaSL**

## Um mundo, diferentes perspectivas

A transportadora informa que a carga chegou. O destinatário ainda não confirmou o recebimento. As duas situações dizem respeito à mesma entrega, mas chegada e recebimento são acontecimentos distintos. A falta de confirmação, por si só, não contradiz o relato da transportadora.

Chamamos de **agente situado** uma pessoa, instituição ou sistema que observa, afirma ou decide a partir de uma posição própria. Essa posição envolve informações disponíveis, contexto e responsabilidades. O FormaSL permite relacionar o que diferentes agentes registram, sem pressupor que todos conheçam os acontecimentos da mesma maneira.

**Explorar o modelo de mundo**

## Toda afirmação tem uma origem

Quando a transportadora registra “a carga chegou”, ela faz uma afirmação sobre um acontecimento. Além do conteúdo, importa saber quem a emitiu, a que entrega se refere e em quais condições foi feita. O FormaSL chama de **Claim** esse ato identificável de afirmar.

A Claim conserva a autoria dessa posição. Ela pode ser consultada, relacionada a outras informações e acompanhada ao longo de seu ciclo de vida. Seu registro, entretanto, não comprova automaticamente o acontecimento descrito.

**Entender o que é uma Claim**

## Relações que conservam sua unidade

Uma entrega envolve carga, fornecedor, transportadora e destinatário. No **metagrafo** do FormaSL — sua estrutura lógica de relações — essa ligação pode ser representada como uma única ocorrência identificável. Cada participante ocupa um papel definido.

A ocorrência pode ser consultada, analisada e apresentada em uma interface sem deixar de ser o mesmo referente. Sua identidade não depende do formato de armazenamento nem de como aparece na tela.

**Compreender o metagrafo**

## Uma linguagem que opera sobre esse mundo

O FormaSL oferece operações com funções bem definidas: `match` consulta relações; `infer` deriva consequências segundo regras; `analyze` executa análises; `transform` constrói novas estruturas. A linguagem também contempla cenários, validação, decisões e composição de aplicações.

A natureza do resultado acompanha a operação. Uma predição pode orientar uma decisão, mas não se torna um fato apenas porque foi calculada.

**Conhecer a linguagem e seus operadores**

## Da linguagem aos mecanismos

Nos arquivos `.fsl`, o programa declara estruturas, operações e dados de origem. Os planos `.fsp` relacionam os requisitos dessas operações aos mecanismos capazes de realizá-las. O **runtime** avalia as operações admitidas, enquanto a infraestrutura processa e armazena suas representações.

Assim, os mecanismos podem evoluir sem que o significado declarado precise ser redefinido por cada mudança de infraestrutura.

**Examinar a arquitetura**

## Tecnologias para construir sobre a mesma base

O ecossistema reúne mecanismos especializados para construir aplicações. O **FormaGraph** executa algoritmos de grafos e modelos de aprendizado sobre essas estruturas. O **motor espacial** permite projetar elementos do mundo representado em mapas, plantas e superfícies 3D. O **Forma Intelligence** pesquisa o treinamento de modelos fundacionais com dados e aplicações Forma. Há ainda componentes de persistência, execução durável, interfaces, documentos e redes.

Cada tecnologia resolve uma parte do problema; os contratos semânticos permitem combinar essas capacidades.

**Explorar o ecossistema**

## Reutilizar mais do que código

Uma definição de entrega, uma relação entre participantes ou um resultado analítico podem ser usados por mais de uma aplicação. O que o Forma procura tornar reutilizável não é apenas o código, mas também as estruturas e as condições necessárias para compreender aquilo que foi compartilhado.

---

# II. Computação Semântica

## O significado faz parte do programa

Todo software trabalha com alguma representação do mundo. Uma aplicação logística acompanha cargas e entregas; um sistema hospitalar relaciona pacientes, atendimentos e decisões clínicas; uma operação industrial organiza equipamentos, medições e intervenções. Para funcionar corretamente, cada aplicação precisa reconhecer o que esses elementos significam e como se relacionam.

Tipos, regras e funções já exprimem parte desse conhecimento. Mas muitas definições ficam espalhadas entre tabelas, serviços, permissões, configurações e práticas das equipes. Um campo chamado `status` pode indicar chegada ao destino em um sistema e recebimento confirmado em outro. O nome é o mesmo; o significado, não.

O FormaSL permite declarar esse conhecimento em **contratos semânticos**. Eles especificam os elementos de um domínio, as relações entre eles, as condições de uso das informações e os resultados esperados das operações. Como integram o programa, esses contratos orientam a verificação e a execução, em vez de permanecerem apenas como convenções externas.

## Computar com informações situadas

O valor registrado nem sempre basta. Para avaliar uma temperatura, pode ser necessário saber qual sensor a mediu, em que momento e segundo quais critérios ela será julgada. Nesses casos, origem, tempo, contexto e autoridade são informações relevantes para a própria computação.

Considere uma carga refrigerada. Um sensor mede a temperatura durante o transporte; a transportadora relata as condições da viagem; a equipe de qualidade avalia as informações e decide sobre a aceitação do lote. Há uma relação entre medição, relato, avaliação e decisão, mas cada registro desempenha uma função diferente.

Ao distinguir essas etapas, o sistema pode mostrar como chegou a uma conclusão: quais informações usou, quais critérios aplicou e quem decidiu. Também pode deixar explícito o que ainda não se sabe, como uma confirmação pendente ou uma análise inconclusiva.

## Compartilhar definições, não apenas formatos

Dois sistemas podem trocar arquivos compatíveis e, ainda assim, atribuir significados diferentes aos mesmos campos. Reutilizar uma informação exige conhecer o que ela representa, de onde veio e em que condições pode ser usada.

No FormaSL, definições e operações podem ser publicadas para uso por outras aplicações. O resultado compartilhado conserva as referências e as qualificações exigidas pelo contrato: sua natureza, a base de interpretação e as condições relevantes para o próximo uso.

Não é necessário reproduzir todo o histórico a cada passagem. O contrato determina quais referências e qualificações precisam continuar acessíveis para que o próximo uso faça sentido.

---

# III. Modelo de mundo

## Um mundo observado de posições diferentes

O modelo de mundo do FormaSL parte de uma premissa: **a realidade existe independentemente do que se diz ou registra sobre ela**. Pessoas, instituições e sistemas têm acesso apenas a partes dessa realidade. Observam por meios diferentes, recebem relatos, formulam afirmações e agem com as informações de que dispõem.

Um **agente situado** pode ser uma pessoa, uma organização ou um sistema computacional. Sua posição é definida pelas informações a que tem acesso, pelo contexto e pela história de suas interações. Quando necessário, inclui também a competência para decidir ou agir. Ser situado, aqui, não significa apenas ocupar um lugar no espaço: significa conhecer e atuar sob condições próprias.

O FormaSL permite representar diferentes posições sobre um mesmo domínio. Identifica quem observou, afirmou, avaliou ou decidiu e relaciona esses atos às condições em que ocorreram. A partir daí, as aplicações podem comparar informações, investigar divergências e realizar avaliações sem pressupor um observador que saiba tudo.

## Claim: o ato de afirmar

Imagine que a transportadora registre: “a carga chegou ao porto”. Esse enunciado tem um conteúdo, mas também corresponde a um ato: um agente afirmou algo sobre uma entrega em determinado contexto.

No FormaSL, esse ato de afirmação é representado por uma **Claim**. Ela tem identidade própria, conteúdo, emissor e, quando pertinentes, qualificações como tempo, contexto e base de emissão.

A distinção é importante: **o que foi afirmado não se confunde com o ato de afirmar**. Se a transportadora e o destinatário fizerem afirmações independentes com o mesmo conteúdo, teremos duas Claims. Se uma mesma Claim circular por vários sistemas, sua transmissão não cria novos atos de afirmação originais.

Uma Claim pode receber apoio de evidências, ser contestada ou participar de atos posteriores de adoção, retração e substituição. O registro preserva a autoria da afirmação; não garante, por si só, que seu conteúdo corresponda à realidade.

## Observar, avaliar e decidir são atos diferentes

Nem toda informação é uma Claim. Uma **observação** registra algo obtido por um meio de acesso a um estado ou acontecimento, como a leitura de um sensor. Uma **avaliação** examina informações à luz de critérios definidos. Uma **decisão** registra a escolha ou o julgamento assumido por um agente com a competência pertinente.

Na entrega de uma carga, a posição registrada pelo GPS, o relato da transportadora, a conferência do destinatário e a liberação do pagamento podem integrar o mesmo processo. Para compreendê-lo, precisamos saber o que foi observado, o que foi afirmado, quais critérios foram aplicados e quem decidiu.

A distinção também importa depois da decisão. Autorizar uma operação, enviar um pedido a um serviço e verificar o efeito são etapas diferentes. Se a resposta não chegar, sua ausência não prova que a operação falhou. O sistema precisa conservar as evidências disponíveis e tratar o resultado como incerto quando for o caso.

## Discordância não é um defeito da representação

Duas Claims podem apresentar versões incompatíveis de um acontecimento. Outras parecem contraditórias apenas porque se referem a momentos ou contextos diferentes. Antes de compará-las ou julgá-las, é necessário conservar a origem e as condições de cada afirmação.

A transportadora informa que a carga chegou, enquanto o destinatário ainda não confirmou o recebimento. Não há necessariamente conflito: chegada e recebimento são etapas distintas. A falta de confirmação tampouco equivale à afirmação de que a entrega não ocorreu.

Por isso, **desconhecido não é sinônimo de falso**. A ausência de informação, uma negação explícita e uma avaliação inconclusiva conduzem a interpretações distintas. O FormaSL permite conservar essas diferenças nas consultas, nas inferências e nas decisões.

## Tempo, contexto e autoridade

Um acontecimento pode ocorrer em um instante e só ser registrado depois. Um sensor mede a temperatura às 10h, mas transmite o resultado às 10h20. Uma política pode ser aprovada hoje e começar a valer na semana seguinte. São tempos diferentes, com funções diferentes na interpretação do que ocorreu.

O contexto também importa. Uma regra pode valer apenas em determinada jurisdição; uma posição espacial depende do sistema de referência utilizado; uma avaliação pode considerar uma revisão específica de contrato. O FormaSL permite registrar essas condições quando elas alteram a interpretação de um resultado.

A **autoridade** identifica quem tem competência para praticar determinados atos em certo âmbito, como autorizar ou decidir. O FormaSL pode representar essas atribuições e avaliá-las segundo os contratos aplicáveis. Registrar uma posição, contudo, não confere automaticamente legitimidade ao seu emissor.

## Como o mundo ganha estrutura

Agentes, objetos, acontecimentos, afirmações, observações e decisões formam uma rede de relações. Uma entrega envolve várias partes; uma avaliação considera evidências; uma decisão pode apoiar-se em outra decisão. No FormaSL, essas conexões são organizadas em um **metagrafo lógico**: as relações possuem identidade, cada participante ocupa um papel e uma relação pode fazer referência a outra.

O metagrafo não pretende reproduzir toda a realidade. Ele organiza o que foi representado no programa, incluindo relações, posições e suas referências. É sobre essa base situada e identificável que as aplicações FormaSL realizam consultas, inferências e outras operações.

---

# IV. O metagrafo do FormaSL

## Uma relação pode reunir vários participantes

Grafos convencionais costumam representar conexões por arestas entre dois nós. O metagrafo do FormaSL também representa relações com vários participantes. Cada ocorrência tem identidade própria e pode ser tratada como uma unidade, sem precisar ser reconstruída a partir de ligações isoladas.

Imagine que Alice seja designada para trabalhar com um conjunto de dados no projeto Atlas, em ambiente de produção. Pessoa, artefato, projeto e ambiente participam da mesma relação de atribuição. No exemplo canônico, outra ocorrência registra uma atribuição semelhante em outro projeto. As duas permanecem distinguíveis, ainda que compartilhem participantes.

Essa organização é chamada de **metagrafo de incidência de papéis tipados**. A palavra *incidência* indica que um elemento participa de uma relação; os *papéis tipados* especificam como participa. Relações com mais de dois participantes são chamadas **N-árias**. O metagrafo também permite que uma relação faça referência a outra.

Uma entrega ou um compromisso pode, assim, permanecer identificável como uma relação completa, com participantes e papéis próprios.

## Uma relação escrita em FormaSL

O exemplo abaixo vem do programa canônico de relações N-árias. `Assignment` declara quatro papéis; em seguida, `assert claim` registra uma afirmação atribuída a `$registry` sobre uma ocorrência dessa relação:

```formasl
relation Assignment {
    role assignee: Agent
    role artifact: Artifact
    role project: Project
    role environment: Environment
}

assert claim a1 : Assignment(
    assignee: $alice,
    artifact: $dataset,
    project: $atlas,
    environment: $production
) { by : $registry }
```

A declaração `Assignment` estabelece os quatro papéis que compõem a relação. Já `assert claim a1` registra uma afirmação atribuída a `$registry` sobre uma ocorrência específica. A definição da relação e o ato de afirmá-la permanecem distintos, mesmo quando participam da mesma consulta.

*Fonte: `examples/F02-nary-semantic-roles/canonical.fsl`. O trecho omite as declarações de tipos do módulo completo e não constitui, isoladamente, um programa executável.*

## O que conserva a identidade

Os valores de uma relação e o nome usado para exibi-la não bastam, por si sós, para definir a identidade de uma ocorrência. Relações semelhantes podem ter histórias diferentes; uma mesma ocorrência pode aparecer em tabelas, diagramas e outras representações sem deixar de ser o mesmo referente.

Uma relação também pode se referir a outra. Uma avaliação pode dizer respeito a uma entrega; uma decisão pode apoiar-se nessa avaliação; uma revisão pode apontar para uma Claim anterior. Essas referências pertencem à estrutura lógica, independentemente de como sejam exibidas.

## O metagrafo não determina o banco nem a interface

O metagrafo é uma **estrutura lógica**, não a escolha de um banco de dados. Sua realização pode empregar tabelas, índices ou estruturas especializadas de incidência, desde que respeite os contratos pertinentes.

O ecossistema usa essa estrutura para finalidades diferentes. O **FormaGraph Engine** executa algoritmos e modelos de aprendizado sobre bases analíticas derivadas do metagrafo. O **Forma Graph UI** apresenta relações e participantes em uma interface navegável. Um é motor de análise; o outro, ferramenta de exploração visual.

---

# V. Continuidade Semântica

## O resultado precisa continuar compreensível

Imagine que uma aplicação consulte as temperaturas de uma carga, calcule um indicador e o apresente à equipe de qualidade. Na tela, basta talvez mostrar o valor final. Para avaliar o lote, porém, a equipe pode precisar recuperar as medições usadas, seus horários e os critérios aplicáveis.

A **Continuidade Semântica** é a propriedade pela qual as operações mantêm recuperáveis as informações necessárias para interpretar, verificar e reutilizar seus resultados. Conforme o contrato, isso pode incluir identidade, autoria, tempo, contexto, proveniência, dependências, autoridade e condição de conclusão.

Não é preciso copiar todas as entradas em cada etapa. O importante é que o que for necessário continue disponível diretamente, por referência ou por uma derivação que possa ser reconstruída.

## O que acontece com a informação em cada operação

Consultar, analisar e transformar são operações diferentes, mas todas precisam tratar as qualificações relevantes das informações que recebem. Cada contrato define o que se preserva, transforma, deriva, restringe ou descarta explicitamente.

Uma tela que exibe um total não precisa mostrar todas as medições que o compõem. Se aquele total fundamentar uma auditoria, entretanto, as referências necessárias para reconstruir sua origem devem permanecer disponíveis. O objetivo é conservar informação suficiente para o uso contratado, não acumular dados indiscriminadamente.

## Continuidade entre aplicações

Essa exigência acompanha a composição de aplicações. Uma consulta seleciona medições; uma análise calcula um indicador; uma avaliação aplica critérios; uma decisão utiliza o julgamento produzido. Cada etapa recebe um resultado com natureza e condições de uso próprias.

Com isso, outras aplicações podem utilizar definições, relações, contratos e resultados sem precisar redescobrir, a cada integração, de onde vieram e em que condições são válidos para o uso pretendido.

---
# VI. FormaSL — A linguagem

## Uma linguagem para descrever e operar sobre o domínio

O **FormaSL (*Forma Semantic Language*)** é a linguagem de especificação semântica computável do Forma. Seus programas declaram elementos do domínio, relações, afirmações atribuíveis a agentes e operações sobre essas informações.

O código é organizado em módulos `.fsl`. As ferramentas da linguagem verificam declarações, permitem inspecionar a estrutura do programa e executam as operações para as quais há suporte na implementação utilizada.

No FormaSL, resultados semelhantes não são automaticamente equivalentes. Uma consulta apresenta informações encontradas; uma inferência deriva consequências; uma análise pode produzir predições; uma decisão registra uma posição atribuível. A linguagem conserva essas diferenças nos resultados, mesmo quando os valores se parecem.

## Tipos, relações e Claims

`type` declara categorias, como `Agent`, `Artifact` e `Project`. `relation` define os papéis que seus participantes podem ocupar. Na relação `Assignment`, por exemplo, `assignee` indica o responsável designado; `project`, o projeto ao qual a atribuição se refere.

`assert claim` introduz uma afirmação identificável sobre uma ocorrência, com seu conteúdo e emissor. O programa pode consultá-la e relacioná-la a outras posições, mas a existência do registro não prova o que foi afirmado.

O ciclo de vida das afirmações também pode ser representado. Um agente pode adotar uma Claim, registrar sua retração ou estabelecer que outra a substitui. Essas transições não apagam o ato original: tornam sua história consultável.

## `match`: consultas sobre relações

Com `match`, uma aplicação consulta ocorrências de relações e combina condições. Pode, por exemplo, encontrar dependências entre componentes, identificar participantes de um projeto ou selecionar registros que atendam a determinados critérios.

As consultas também admitem filtros, partes opcionais, alternativas, testes de existência, caminhos, agrupamentos, ordenação e agregações como `COUNT`, `SUM`, `MIN` e `MAX`. Cada operador respeita as condições de formação e os contratos dos valores envolvidos.

O resultado é uma **resposta de consulta** sobre uma base determinada. Uma resposta vazia pode significar que nenhuma ocorrência foi encontrada; uma busca interrompida antes da conclusão tem outro significado. Consultar uma Claim tampouco equivale a emiti-la novamente.

## `rule` e `infer`: consequências derivadas

Uma `rule` descreve condições sob as quais uma consequência pode ser derivada. Se uma aplicação depende de um componente que, por sua vez, depende de uma biblioteca, uma regra pode estabelecer a dependência indireta, conforme a teoria aplicável.

`infer` executa o raciocínio sobre as regras e as premissas admitidas. O suporte documentado inclui dedução recursiva positiva, negação estratificada e regras existenciais, cada qual com requisitos próprios de formação e execução.

O que a inferência produz é uma **consequência derivada**, não uma afirmação nova atribuída a um agente. Para assumir essa consequência como Claim, é necessário outro ato. O cálculo também tem limites: esgotar o orçamento de execução não equivale a concluir o raciocínio.

## `analyze`: algoritmos, estatísticas e modelos

A família `analyze` reúne cálculos, estatísticas, algoritmos de grafos e operações com modelos aprendidos. Para cada análise, o contrato identifica entradas, parâmetros e a interpretação do resultado, incluindo aproximações e incertezas quando forem relevantes.

É nessa família que o **FormaGraph Engine** atua. Ele calcula percursos, centralidades e propriedades estruturais, além de executar modelos de aprendizado sobre grafos. Cada resultado deve ser interpretado conforme a base analítica, o algoritmo e as condições da execução.

A realização pode recorrer a motores especializados, desde que atendam aos requisitos declarados. Mesmo quando uma análise alimenta uma decisão, o resultado conserva sua condição de medida, estimativa ou predição.

## `transform`: produzir novas estruturas

Enquanto `match` produz respostas de consulta, `transform` define a construção de um **artefato semântico** a partir de informações de origem. O resultado constitui uma nova estrutura segundo as correspondências previstas no contrato de transformação.

A transformação pode reorganizar relações, reunir registros ou constituir estruturas para outra aplicação. Seu contrato descreve a correspondência entre origem e resultado, incluindo as identidades e dependências que precisam permanecer recuperáveis.

A verificação de uma declaração não comprova, por si só, que todo o processo esteja disponível na execução. Construir artefatos em mecanismos externos exige capacidades de realização específicas, que precisam ser verificadas na implementação usada.

## `validate`, `admit`, `authorize` e `decide`: critérios e responsabilidades

Uma informação pode atender a critérios técnicos e, ainda assim, depender de autorização para determinado uso. O FormaSL separa essas perguntas, em vez de condensá-las em uma única resposta.

`validate` verifica a conformidade de um alvo; `admit` examina a passagem de um candidato por uma fronteira governada; `authorize` avalia a autorização de um agente para uma ação; `decide` registra uma escolha ou julgamento atribuível. Cada família tem sua própria base e seu próprio resultado.

Imagine que um lote satisfaça os critérios técnicos de temperatura. Ainda pode ser necessária uma autorização específica para liberá-lo. E a liberação autorizada não comprova, sozinha, que o lote tenha sido efetivamente encaminhado.

## `scenario`: explorar possibilidades

`scenario` cria um contexto hipotético a partir de uma base sem alterá-la. Nele, o programa pode assumir condições, substituir premissas, introduzir elementos locais e avaliar possíveis consequências.

Uma empresa pode simular o atraso de um fornecedor ou a interrupção de uma rota e examinar as consequências dessas hipóteses. Os resultados permanecem associados ao cenário. Se servirem de base para uma decisão efetiva, essa origem hipotética precisa ser recuperável.

**Explorar uma possibilidade não altera, por si só, o estado efetivo do mundo representado.**

## `composition`: combinar operações sem perder suas diferenças

`composition` reúne operações em um programa composto. Declara quais resultados alimentam as etapas seguintes, que dependências existem e quando é necessária uma precedência entre elas.

Compor aplicações não é apenas encadear chamadas. Uma consulta, uma predição e um julgamento podem produzir valores semelhantes, mas têm naturezas e condições de uso distintas. A operação seguinte precisa reconhecer essas diferenças ao receber cada resultado.

A linguagem também representa a preparação de mudanças na fonte, pedidos de execução, aquisição de observações e incorporação de informações. Preparar uma alteração não a publica; solicitar uma ação não comprova seu efeito. A composição precisa conservar essas diferenças ao ligar suas etapas.

## Do código à execução

O desenvolvimento de uma aplicação FormaSL passa por etapas distintas. `check` verifica a formação e a resolução das fontes; `inspect` apresenta a estrutura admitida; `realize` examina os vínculos de realização; e `run` executa as aplicações suportadas. A execução utiliza um orçamento explícito de trabalho lógico, chamado **gas**.

O orçamento limita o trabalho lógico permitido para a avaliação. Se ele se esgotar antes da conclusão semântica, o resultado deve registrar essa condição. Atingir o limite não significa obter uma resposta negativa nem completar a busca.

Passar em `check` significa que o programa foi admitido na verificação correspondente, não que todas as suas operações possam ser executadas. E uma execução concluída não significa, necessariamente, que algo tenha mudado fora do sistema. Os desfechos registram essas diferenças.

---

# VII. Arquitetura Forma

## O significado não depende de um único mecanismo

Uma aplicação precisa armazenar dados, calcular resultados, comunicar-se com outros sistemas e apresentar informações. No Forma, essas responsabilidades podem ficar com mecanismos especializados. O significado das estruturas e operações, porém, continua estabelecido pelos contratos semânticos.

Para organizar essa divisão, a arquitetura distingue **quatro planos**: contrato semântico, realização, execução e representação física. Eles delimitam responsabilidades, não uma sequência obrigatória de passos.

## 1. Contrato semântico — o que a aplicação representa

As fontes `.fsl` declaram tipos, relações, afirmações, regras, operações e dados de origem. Seus contratos definem como os elementos são identificados, que informações podem ser usadas e como interpretar os resultados.

Na logística, por exemplo, despacho, chegada e confirmação de recebimento são acontecimentos distintos. O contrato permite representá-los com seus participantes, atribuições e condições de interpretação, independentemente do serviço ou do banco de dados que conserva seus registros.

## 2. Realização — como atender aos requisitos

Calcular uma área, analisar um grafo e comunicar-se com um serviço externo exigem capacidades diferentes. A realização associa os requisitos declarados pela aplicação a mecanismos capazes de atendê-los.

Os planos `.fsp` registram os requisitos e os vínculos com recursos e provedores. Sua compatibilidade precisa ser verificada: um motor pode calcular geometrias; outro, transformar coordenadas. Essas capacidades realizam operações sobre uma região, mas não determinam o que a região significa no programa.

## 3. Execução — o que foi calculado e em quais condições

O **runtime** avalia operações sobre uma base determinada: entradas, informações disponíveis, revisões pertinentes e limites de trabalho. Os resultados mantêm referência à aplicação e às condições em que foram produzidos.

Uma consulta pode terminar com todas as respostas previstas. Uma inferência pode alcançar o ponto fixo de suas regras. Outra execução pode parar ao esgotar o orçamento. A execução termina em cada caso, mas os resultados não têm necessariamente a mesma condição de completude.

## 4. Representação física — onde e como os dados são mantidos

O plano físico reúne tabelas, índices, arquivos, registros chave-valor e outras estruturas de armazenamento e processamento. A escolha depende das necessidades de desempenho, persistência e recuperação.

Uma Claim pode ser armazenada por mecanismos distintos e continuar referindo-se ao mesmo ato de afirmação. Da mesma forma, alterar o formato físico de um dataset não significa, por si só, criar outro conjunto de dados. O vínculo entre o contrato e suas representações precisa permanecer verificável.

## Entre a decisão e o efeito no mundo

A passagem de uma decisão a um efeito externo envolve atos diferentes. Uma inferência pode contribuir para uma avaliação; a avaliação, para uma decisão; a decisão, para um pedido de execução. O serviço externo pode produzir um efeito, e uma observação posterior pode fornecer evidências do que ocorreu. Cada etapa conserva sua responsabilidade.

Em uma ordem de pagamento, por exemplo, o serviço pode receber a solicitação e a resposta se perder. A aplicação não sabe, apenas por essa ausência, se o pagamento aconteceu. Precisa conservar as evidências disponíveis e tratar a incerteza antes de decidir como continuar.

Essas responsabilidades se distribuem entre componentes. O **MRS** organiza a conexão com mecanismos externos e o registro das evidências dessas interações. O **Forma Continuum** sustenta processos que precisam sobreviver a interrupções. O **Forma Orchestrator** coordena ciclos de operação e reconciliação de estados. Eles podem atuar no mesmo fluxo sem desempenhar a mesma função.

## Aplicar o contrato a mecanismos especializados

Uma região declarada em FormaSL pode ser analisada por um motor geométrico, representada em diferentes sistemas de coordenadas e exibida sobre um mapa ou numa superfície 3D. Em cada caso, o mecanismo trabalha com uma representação específica. A correspondência com a região identificada no programa precisa permanecer explícita.

Esse princípio orienta também o armazenamento, a análise e a integração: as capacidades concretas podem variar, desde que a realização respeite os requisitos do contrato correspondente.

---

# VIII. Ecossistema Forma

## Capacidades diferentes, responsabilidades distintas

O FormaSL define estruturas e operações; o ecossistema reúne os mecanismos que as realizam. Há componentes para armazenar dados, processar grafos, executar fluxos duráveis, apresentar interfaces e integrar sistemas externos.

Cada produto combina apenas o que precisa. Uma solução documental pode usar FDOC e FormaFS; uma aplicação analítica pode reunir FormaLake, FormaGraph e Forma UI; uma operação distribuída pode empregar Forma Network. O ecossistema não é um pacote indivisível.

## Análise, inteligência e espacialidade

### FormaGraph Engine — análise e aprendizado sobre grafos

O **FormaGraph Engine** é o motor de análise de grafos do Forma. Ele executa algoritmos para percorrer conexões, encontrar caminhos, identificar comunidades e medir a posição relativa de elementos numa rede. Entre as famílias documentadas estão buscas em largura e profundidade, caminhos mínimos, centralidades e análises de conectividade.

O motor também trabalha com **redes neurais para grafos (GNNs)**. Esses modelos aprendem padrões a partir das relações entre elementos e de suas características. Há implementações de referência das famílias **GraphSAGE, GCN e GAT**, com contratos de treinamento e inferência.

Para aplicar um algoritmo, o FormaGraph utiliza uma base analítica construída a partir do metagrafo. Essa passagem exige explicitar como relações com vários participantes serão tratadas no cálculo. O grafo computacional resultante serve ao algoritmo, mas não redefine as relações de origem. As capacidades disponíveis e seu desempenho variam conforme a família implementada.

### Forma Intelligence — treinar modelos fundacionais com dados e aplicações Forma

O **Forma Intelligence** pesquisa o treinamento de **modelos fundacionais** a partir dos dados e das aplicações desenvolvidas no Forma. A ideia é aprender representações reutilizáveis em diferentes tarefas a partir de um material mais estruturado do que registros isolados: relações, contratos, afirmações, contextos, históricos e resultados computacionais.

A investigação procura entender como um modelo pode aproveitar essa estrutura durante o treinamento, inclusive os papéis dos participantes, as referências entre relações e a proveniência dos dados. Isso exige comparar formas de representação e medir seus efeitos, em vez de pressupor que uma delas seja superior.

O objetivo ainda é de pesquisa: não há, nesses resultados, evidência de um modelo fundacional concluído. Em uma comparação inicial, a representação semântica nativa não demonstrou vantagem sobre uma representação relacional sem perda no regime testado. O resultado orienta os próximos experimentos, sem justificar uma conclusão geral de superioridade.

### Motor espacial Forma — projetar o mundo semântico no espaço

O **motor espacial Forma** conecta os elementos representados em FormaSL às suas projeções em mapas, plantas, trajetórias e ambientes tridimensionais. Uma mesma região pode aparecer em várias superfícies sem perder a referência ao elemento definido no programa.

Uma região do modelo não é sua geometria. Para projetá-la, os mecanismos de realização usam coordenadas, sistemas de referência e representações geométricas. Provedores especializados calculam, por exemplo, áreas e contenção ou transformam coordenadas. Sistemas de percepção também podem fornecer evidências, cuja incorporação ao mundo representado depende das condições de admissão pertinentes.

Os demonstradores documentam projeções em mapas, plantas e superfícies 3D com correspondência aos referentes originais. Ainda não equivalem, por si, a uma plataforma industrial completa de renderização tridimensional. O princípio já demonstrado nesse escopo é a possibilidade de passar da representação visual ao referente correto no modelo.

## Dados e recursos

### FormaKV — persistência de dados

O **FormaKV** é um motor embutido de armazenamento **chave-valor**. Ele oferece escrita e leitura de dados, controle de concorrência e mecanismos de recuperação após falhas. Sua responsabilidade é manter os registros no plano físico.

Os contratos da aplicação determinam a interpretação dos registros; o FormaKV se ocupa de armazená-los e recuperá-los.

### FormaFS — identidade e evolução de recursos

O **FormaFS** mantém recursos persistentes com identidade própria, independentemente do nome, da localização ou da representação física em determinado momento. Um mesmo recurso pode evoluir, acumular versões e ser representado de diferentes maneiras.

Essa é a fundação usada pelo FormaLake. O FormaFS não pretende substituir todas as funções de um sistema de arquivos convencional; concentra-se na identidade dos recursos, em seus estados e nas referências que permitem acompanhar sua evolução.

### FormaLake — datasets, versões e representações

O **FormaLake** organiza conjuntos de dados (*datasets*), suas versões e representações. Um dataset pode receber novas informações e ser armazenado de diferentes maneiras. O componente distingue a identidade do conjunto, cada revisão e o estado dos dados efetivamente persistidos.

Assim, uma operação pode saber a que versão se refere e quais informações estavam disponíveis. O FormaLake se apoia no FormaFS para preservar essa organização, mesmo quando muda o formato físico dos dados.

## Execução e integração

### MRS — comunicação controlada com mecanismos externos

O **MRS (*Minimal Realization Backplane*)** estabelece a ligação controlada entre aplicações Forma e mecanismos externos. Organiza pedidos, respostas e evidências das interações segundo contratos. A distinção central é simples: enviar uma solicitação não prova que o efeito solicitado ocorreu.

Se uma aplicação solicita o acionamento de um equipamento, precisa registrar o pedido e tratar as evidências obtidas, mesmo quando uma resposta não chega. O MRS organiza essa comunicação; os contratos da aplicação continuam determinando quem pode solicitar a ação e sob quais condições.

### Forma Continuum — execução durável de processos

O **Forma Continuum** executa processos duráveis, que podem atravessar etapas longas, períodos de espera e interrupções. Registra o andamento em um diário de execução, usado para recuperar o estado e orientar a retomada.

Se um processo for interrompido depois de solicitar uma operação externa, recomeçá-lo sem consultar o histórico pode repetir um efeito. O Continuum permite retomar a partir do que foi registrado, respeitando as regras do processo. As condições de negócio continuam definidas pelos contratos do domínio.

### Forma Orchestrator — coordenação de operações contínuas

O **Forma Orchestrator** coordena operações contínuas comparando o **estado desejado** de um sistema com o **estado observado**. A partir dessa diferença, identifica trabalho a realizar e acompanha os ciclos de reconciliação.

O Continuum cuida do progresso e da retomada de uma execução durável; o Orchestrator cuida da coordenação recorrente necessária para aproximar o sistema da condição desejada. As funções são diferentes e podem atuar juntas.

## Rede e distribuição

### Forma Network — contratos FormaSL em uma rede compartilhada

A **Forma Network** é uma blockchain permissionada voltada à execução e ao compartilhamento de estado sob contratos FormaSL. Seus nós validadores participam do consenso sobre a ordem das operações e mantêm o estado compartilhado conforme as regras da rede.

A implementação documentada usa o **Polkadot SDK** na infraestrutura dos nós e **Mysticeti** para consenso. A rede pode estabelecer uma ordem comum para registros e transições, mas cabe aos contratos FormaSL determinar seu significado. O acordo entre validadores não torna verdadeiro, por si só, o conteúdo de uma afirmação.

Os testes e demonstradores documentam capacidades de execução e consenso permissionado. Isso não comprova, por si só, disponibilidade irrestrita para operação em produção.

## Interfaces, documentos e planilhas

### Semantic UI — apresentar informações sem perder suas referências

O **Semantic UI** estabelece como os resultados do FormaSL chegam às interfaces sem perder suas referências semânticas. Ao exibir uma entidade, uma relação ou uma resposta de consulta, preserva a correspondência com o elemento e com a base em que a informação foi interpretada.

A interface também deve respeitar estados como indisponível, desatualizado, rejeitado ou incompleto, quando previstos no contrato. Apresentar um resultado não altera sua validade ou autoridade.

### Forma UI — framework para aplicações web

O **Forma UI** é o framework reativo para construir aplicações web no ecossistema. Reúne componentes, composição declarativa, gerenciamento de estado e atualização incremental de interfaces, como tabelas, formulários, filtros e painéis.

Ele organiza a experiência visual e as interações do usuário. Pode consumir informações admitidas pelo FormaSL, mas a atualização da tela não decide a validade nem a autoridade dos dados apresentados.

### Forma Graph UI — visualização e exploração do metagrafo

O **Forma Graph UI** é o framework para visualizar e explorar o metagrafo. Organiza relações e participantes em cenas interativas, com layout, seleção, navegação e aproximação. Uma relação N-ária pode ser exibida como uma unidade, sem perder os papéis de seus participantes.

O FormaGraph Engine processa grafos e executa algoritmos e modelos; o Forma Graph UI permite inspecioná-los visualmente. A visualização e a análise são funções complementares, não dois nomes para o mesmo motor.

### Forma Operations Studio — aplicação demonstradora dos frameworks

O **Forma Operations Studio** é uma aplicação demonstradora que reúne Forma UI e Forma Graph UI. Combina tabelas, painéis de inspeção e cenas de grafo para explorar diferentes perspectivas sobre os mesmos elementos do domínio.

O Studio demonstra a integração entre os frameworks. Recursos de autoria, comandos e ações externas dependem das capacidades efetivamente disponíveis e das autorizações aplicáveis a cada versão.

### FDOC — documentos com identidade e história de autoria

O **FDOC** trabalha com documentos cuja identidade, versões e autoria podem ser acompanhadas ao longo do tempo. Pessoas e agentes participam do trabalho documental por atos diferentes: propor mudanças, revisá-las, aprová-las ou publicá-las conforme suas responsabilidades.

Uma sugestão feita por IA, a aprovação humana e a publicação formal não têm o mesmo significado. O FDOC mantém essas distinções e o histórico correspondente sem reduzir o documento ao arquivo que o apresenta.

### FSheet — planilhas ligadas ao modelo semântico

O **FSheet** é a superfície de planilhas do Forma. Combina células, fórmulas e dependências de cálculo com referências ao modelo semântico. Assim, uma célula pode preservar sua identidade ao mudar de posição, enquanto os resultados mantêm ligação com as entradas usadas no cálculo.

A grade continua sendo uma forma prática de trabalhar, mas a posição visual de uma célula não precisa definir o significado do que ela representa.

## Agentes

### Forma Agent — agentes com memória e contexto governados

O **Forma Agent** reúne mecanismos para agentes que utilizam operações Forma com contexto e memória. A cada tarefa, o sistema pode selecionar informações pertinentes em vez de enviar todo o histórico de interações, mantendo referências à origem do material recuperado.

Essa abordagem pode apoiar agentes de trabalho, programação e processos com maior autonomia. Recuperar informação, formular hipóteses e tomar decisões são atos diferentes, sujeitos aos respectivos contratos. As capacidades de aprendizado e autonomia devem ser descritas segundo o que cada implementação demonstra.

## Uma aplicação, diferentes mecanismos

Considere uma aplicação hipotética de acompanhamento de entregas. O FormaSL descreveria cargas, participantes, percursos e recebimentos. O FormaLake poderia organizar dados históricos; o FormaGraph, analisar conexões; o motor espacial, projetar trajetórias em mapas; e o Forma UI, reunir resultados numa interface. O Continuum acompanharia as etapas dependentes de serviços externos, quando necessário.

O exemplo ilustra uma possibilidade arquitetural, não um produto integrado já entregue. Sua viabilidade depende das capacidades e dos vínculos de realização disponíveis em cada componente.

---

# IX. Encerramento institucional

## Uma base comum para aplicações diferentes

Uma entrega envolve acontecimentos e registros produzidos por agentes diferentes. O despacho, a chegada, a confirmação de recebimento e a decisão de liberar um pagamento podem ocorrer em sistemas distintos, sob responsabilidades e condições próprias.

O Forma oferece uma maneira de ligar essas informações sem apagar o que as distingue. Seu modelo de mundo representa posições situadas; o metagrafo organiza relações identificáveis; o FormaSL permite trabalhar computacionalmente com elas. Os componentes do ecossistema realizam armazenamento, análise, execução e apresentação segundo os contratos correspondentes.

O objetivo é que uma aplicação possa aproveitar o trabalho de outra **não apenas reutilizando código, mas também relações, contratos e resultados cujo significado continue acessível**.

---

# X. Notas editoriais e de verificação — não publicar

## Decisões de prosa da v0.11 — fechamento editorial

1. **Progressão acima da repetição.** A homepage apresenta a premissa e as principais capacidades. As páginas internas desenvolvem cada mecanismo com exemplos e distinções próprias.
2. **Vocabulário técnico apresentado no primeiro uso.** Agente situado, Claim, contrato semântico, metagrafo, relação N-ária, GNN, modelo fundacional, runtime, realização e gas são introduzidos com contexto e definição proporcionais.
3. **Mecanismo antes do limite.** Os componentes são descritos por sua função, entradas e resultados; as ressalvas aparecem onde são necessárias para delimitar alcance e maturidade.
4. **Distinções preservadas.** Claim designa o ato atribuível de afirmar; observação, avaliação, decisão e consequência inferida são diferentes. FormaGraph Engine analisa; Forma Graph UI apresenta. Uma região não se confunde com sua geometria, e uma interface não cria autoridade.
5. **Tom institucional acessível.** A redação privilegia verbos concretos, períodos de extensão variada e exemplos suficientes. Evita o excesso de propaganda e a cadência repetitiva da documentação normativa.
6. **Evidência e objetivo separados.** Forma Intelligence pesquisa modelos fundacionais; projeções espaciais demonstrativas não atestam uma plataforma 3D completa; FormaGraph possui algoritmos e GNNs com alcance específico por implementação.

## Fontes e fronteiras do corpus

- **Modelo de mundo e continuidade:** `FORMASL-INTENT.md`, `FORMAL-WORLD-MODEL.md`, `SEMANTIC-CONTINUITY.md`, `ARCHITECTURE.md`. Preservadas as distinções entre realidade, informação situada, Claims, observações, avaliações e decisões.
- **Metagrafo e código:** `examples/F02-nary-semantic-roles/canonical.fsl`. O trecho publicado é um excerto fiel, sem as declarações de tipos necessárias ao módulo completo.
- **Linguagem e operadores:** `docs/book/src/autoridades/user/LANGUAGE-GUIDE.md` e os exemplos de famílias de aplicação. A verificação de uma declaração não equivale a demonstrar sua execução em qualquer configuração.
- **FormaGraph:** `crates/analysis-reference/src/{ml.rs,gcn.rs,gat.rs}` e `research/forma-graph-algorithmic-parity-v0.1/`. As famílias de algoritmo e GNN são descritas sem prometer paridade integral ou escala irrestrita.
- **Forma Intelligence:** finalidade declarada pelo responsável pelo projeto; experimentos registrados em `forma-intelligence-research-v0.1`. Não foi reivindicada superioridade experimental geral nem a existência de modelo fundacional concluído.
- **Espacialidade:** `docs/book/src/autoridades/spatial/spatial-v0.1/README.md` e `demos/executable-world/evidence/WTT2-04-{PROJECTION.txt,CLOSURE.md}`. A evidência de projeções múltiplas, inclusive 3D, permanece descrita como demonstrativa.
- **Componentes restantes:** preservadas as funções e fronteiras do corpus v0.10; nenhuma nova capacidade foi acrescentada como fato.

## Limite da revisão

Esta versão é o **fechamento editorial do corpus v0.10**, não uma auditoria de código ou uma revalidação das capacidades anunciadas. A publicação requer aprovação institucional e conferência da atualidade das implementações, de seu grau de maturidade e dos limites documentados de cada família de operações.
