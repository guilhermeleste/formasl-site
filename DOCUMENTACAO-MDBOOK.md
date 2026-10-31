# Integração da documentação mdBook

## Estado documental e proveniência

A fonte atual do livro é `guilhermeleste/FormaSL/docs/book/`. Seu `SUMMARY.md` declara a edição inglesa como superfície técnica principal e a portuguesa como edição editorial derivada. O `book.toml` ainda declara `language = "pt-BR"` e o sumário tem ambos os idiomas. Não tratamos essas duas edições como normativamente equivalentes.

A edição inglesa fica em `/docs/en/*`, a portuguesa no caminho original de `/docs/*`. O build atual **não produz dois livros independentes com pesquisas isoladas**; preserva a estrutura real do mdBook, incluindo seu índice misto. A separação de sumários e índices por idioma requer uma campanha documental específica. `/docs/zh-CN/` exibe um aviso de indisponibilidade e encaminha explicitamente à edição inglesa.

## Build sem tocar nos contratos normativos

`build.py`:

1. Cria uma pasta temporária no sistema de arquivos.
2. Copia `docs/book/`, `scripts/book-publication` e cada `repo_target` nomeado em `map.json`.
3. Executa, **na cópia**, o `build_projected.py` original, que prepara cópias de arquivos referenciados e o `proj-manifest.json` usado pelo preprocessor `projection`.
4. Executa `mdbook build` na cópia, com diretório de saída `dist/docs`.
5. Acrescenta `forma-docs.css`, um sumário de capítulos extraído dos títulos e uma barra de retorno ao site onde o template mdBook oferece um elemento `main`.
6. Corrige `lang="en"` nas páginas inglesas, preservando seu conteúdo original.
7. Substitui os links institucionais GitHub por URLs mdBook somente se o arquivo `.html` compilado correspondente existir.

O modelo não reaproveita a prévia autônoma de HTML como manual: ela serviu à aprovação do visual, não como renderer. O CSS inclui a identidade de cores, ritmo e tipografia, mas preserva o mecanismo nativo de busca, navegação e destaque de código do mdBook.

**Revisão-fonte:** fixar o SHA completo para que exemplos, links e contratos se refiram a uma base rastreável. Não usar `master` como marcador de release.

## Gates específicos do manual

- Build real com `mdbook 0.5.2` e preprocessor sem erro.
- Exemplo EN `en/conceitos-02-modelo-de-mundo.html` presente e HTML com `lang="en"`.
- Material derivado PT mantido, identificado e acessível.
- Nenhum arquivo de `docs/book/`, `docs/contracts/` ou `crates/` do checkout original alterado pelo build.
- Busca nativa, highlights e links entre capítulos efetivamente testados no build hospedado.
- CSS consistente em capítulos conceituais, guias repletos de código e contratos normativos extensos.
- Nenhuma transformação de sintaxe FormaSL pelos scripts de publicação.
- Aviso honesto da cobertura documental em chinês simplificado.

## Próxima evolução documental (fora deste pacote)

Criar um manifesto de identidades estáveis para os capítulos, em vez de mapear apenas caminhos `.md`; separar o `SUMMARY` por idioma sem alterar textos normativos; estabelecer três estados de tradução (`publicado`, `revisão pendente`, `inexistente`) e controle de defasagem EN/PT/ZH. Antes disso, o site institucional apresenta os três idiomas, mas não promete um livro técnico trilíngue completo.

**Fontes:**

- https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/book.toml
- https://github.com/guilhermeleste/FormaSL/blob/master/docs/book/src/SUMMARY.md
- https://github.com/guilhermeleste/FormaSL/blob/master/scripts/book-publication/build_projected.py
- https://rust-lang.github.io/mdBook/cli/build.html
- https://rust-lang.github.io/mdBook/format/configuration/renderers.html
