# Editorial illustration system — Series 01

Status: **visual proposal pending approval**  
Scope: first eight FormaSL blog articles.

## System

The eight illustrations form one sequence rather than eight independent cover images. Their visual progression follows the argument of the series:

`fragmentation → abstraction → world model → computation → semantic continuity → language → semantic computing → Forma architecture`

All canonical illustrations are:

- 1600 × 900 SVG;
- language-neutral, with no visible editorial text;
- based only on the public-presence palette: Paper `#F3F0E8`, Carbon `#171716`, Oxide `#A44332` and restrained neutral strokes;
- structurally drawn rather than rendered as AI/futurist imagery;
- reusable across `en`, `pt-BR` and `zh-Hans`;
- editorial illustrations, not normative architecture diagrams unless explicitly identified as such in article copy.

## Mapping

| # | Article | Asset | Concept |
| --- | --- | --- | --- |
| 01 | O mundo que o software fragmentou | `/blog/series-01/01-o-mundo-que-o-software-fragmentou.svg` | One connected organizational reality crossing several specialized software partitions. |
| 02 | Do concreto ao computável | `/blog/series-01/02-do-concreto-ao-computavel.svg` | A dense concrete world passes through abstraction while selected material distinctions remain preserved. |
| 03 | Um modelo para um mundo que não se deixa reduzir | `/blog/series-01/03-um-modelo-para-um-mundo-que-nao-se-deixa-reduzir.svg` | Identifiable multi-party relation, semantic roles, participants, claim, context, time and relation-about-relation. |
| 04 | Computar um mundo | `/blog/series-01/04-computar-um-mundo.svg` | A semantic world crosses distinct operations, decision, execution and observation without those stages collapsing into one state. |
| 05 | O significado precisa sobreviver à computação | `/blog/series-01/05-o-significado-precisa-sobreviver-a-computacao.svg` | Representations change while a continuity thread and relevant genealogy remain reconstructible across transformations. |
| 06 | FormaSL | `/blog/series-01/06-formasl.svg` | A computable semantic contract containing types, role-based relations, claims, scenarios and distinct operations. |
| 07 | Computação Semântica | `/blog/series-01/07-computacao-semantica.svg` | Stable semantic authority above heterogeneous realization mechanisms, connected by explicit obligations and continuity. |
| 08 | Forma: arquitetura técnica | `/blog/series-01/08-forma-arquitetura-tecnica.svg` | Semantic, realization and operational responsibility planes remain distinct while composing the Forma ecosystem. |

## Article frontmatter

The blog schema accepts `hero` and `heroAlt` only as a pair:

```yaml
hero: /blog/series-01/01-o-mundo-que-o-software-fragmentou.svg
heroAlt: <localized description>
```

`heroAlt` must be written in the language of the article. The SVG itself stays unchanged across locales.

## Usage rules

1. Use one canonical illustration per article as the primary editorial hero.
2. Do not recolor individual illustrations to distinguish locales or articles.
3. Do not insert translated labels into the SVGs.
4. Do not add decorative nodes, glow, gradients, 3D effects or AI iconography.
5. Preserve the 16:9 composition and original SVG proportions.
6. Treat Oxide as a semantic/structural accent, not as a decorative fill.
7. If an illustration is later used as a social card, derive a raster card from the canonical SVG rather than modifying the canonical file.
8. Reopen an illustration only if it materially misrepresents the article, fails at publication scale, or conflicts with the brand baseline.
