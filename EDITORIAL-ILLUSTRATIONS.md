# Editorial illustration system — Series 01

Status: **implementation contract under `DESIGN.md`**  
Scope: the first eight FormaSL editorial articles.

`DESIGN.md` governs the general visual grammar. This document applies that grammar to Series 01. The former 16:9 cover-like illustration system is superseded.

## System

The eight figures form one intellectual sequence rather than eight independent pieces of decorative art:

`fragmentation → abstraction → world model → computation → semantic continuity → language → semantic computing → Forma architecture`

Canonical figures are:

- SVG, nominal viewBox `1440 × 960` (3:2);
- predominantly language-neutral;
- based on Paper `#F3F0E8`, Carbon `#171716`, Oxide `#A44332` and restrained neutral strokes;
- diagrammatic explanations rather than cover art;
- reusable across `en`, `pt-BR` and `zh-Hans` with localized alt text from article frontmatter;
- editorial figures, not normative architecture diagrams unless the article explicitly identifies them as such.

A figure passes only if the article title plus the figure lets a reader formulate approximately the chapter's central problem after a brief inspection.

## Mapping

| # | Article | Asset | Required operation |
| --- | --- | --- | --- |
| 01 | O mundo que o software fragmentou | `/blog/series-01/01-o-mundo-que-o-software-fragmentou.svg` | One continuous organizational chain crosses distinct system partitions; the world remains continuous while software slices it. |
| 02 | Do concreto ao computável | `/blog/series-01/02-do-concreto-ao-computavel.svg` | A rich concrete structure passes through abstraction into a smaller representation; selected distinctions survive while others are left out. |
| 03 | Um modelo para um mundo que não se deixa reduzir | `/blog/series-01/03-um-modelo-para-um-mundo-que-nao-se-deixa-reduzir.svg` | A multi-participant relation binds participants through distinct roles, context, time and attributable Claim structure. |
| 04 | Computar um mundo | `/blog/series-01/04-computar-um-mundo.svg` | Query, inference, normative assessment, decision, execution and observation remain visibly distinct operations. |
| 05 | O significado precisa sobreviver à computação | `/blog/series-01/05-o-significado-precisa-sobreviver-a-computacao.svg` | One lineage preserves reconstructible meaning through transformations while a contrasting branch demonstrates semantic erasure. |
| 06 | FormaSL | `/blog/series-01/06-formasl.svg` | `.fsl` is visibly the semantic contract boundary; realization/storage mechanisms remain external to that authority. |
| 07 | Computação Semântica | `/blog/series-01/07-computacao-semantica.svg` | Semantic, realization and operational responsibility planes remain distinct while obligations flow downward and observations return. |
| 08 | Forma: arquitetura técnica | `/blog/series-01/08-forma-arquitetura-tecnica.svg` | FormaSL, `.fsp`, FormaDB, Platform, Studio, Cloud and external mechanisms compose without implying one mandatory stack. |

## Usage

1. Treat the asset as an editorial figure, not as a page hero or cover.
2. Do not recolor figures by locale.
3. Invariant technical labels such as `.fsl`, `.fsp`, `Claim` and component names may appear when necessary to make the operation legible.
4. Do not add glow, gradients, 3D rendering, AI iconography or decorative node networks.
5. Oxide marks a distinction, continuity thread, boundary or other semantic/structural emphasis; it is not a decorative fill.
6. Article figures and social cards are separate assets. Social previews are generated at 1200×630 and may incorporate a restrained fragment of the figure.
7. Reopen a figure when it materially misrepresents the article or fails the title-plus-figure comprehension test.
