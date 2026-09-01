---
locale: en
slug: forma-technical-architecture
translationKey: series-01-08
title: "Forma: Technical Architecture"
description: "The Forma architecture separates semantic, realization, and operational layers, situating FormaSL, FormaDB, Platform, Studio, and Cloud without transferring semantic authority among components."
date: 2026-08-31
authors:
  - Forma Research Lab
category: "Series 01"
draft: true
hero: /blog/series-01/08-forma-arquitetura-tecnica.svg
heroAlt: "Three layers—semantic, realization, and operational—organize Forma components under a common semantic contract."
---

In the previous article we defined Semantic Computing as an architecture in which declared meaning has explicit authority over its realization. This resolved the problem in abstract terms: different mechanisms can store, query, infer, analyze, execute, or coordinate an application without thereby acquiring the right to redefine what it means. What remains is to show how this separation appears concretely in Forma.

To do that, we need to begin with a distinction that until now could remain in the background. FormaSL is not synonymous with Forma. FormaSL is the computable semantic specification language. Forma is the technical architecture and ecosystem organized around the possibility of declaring semantically structured worlds and realizing them through different mechanisms without delegating authority over the contract to those mechanisms.

The distinction matters because it would be natural to reach the end of this series imagining that representation, query, inference, storage, execution, authoring, operation, and infrastructure should converge into one large runtime environment capable of doing everything. The Forma architecture moves in the opposite direction. It separates responsibilities because the same difference between meaning and realization must remain visible when we move from the language to the concrete components of the system.

The fundamental map can be represented as follows:

```text
SEMANTIC LAYER
world + .fsl contract + operations
              │
              │ semantic obligations
              ▼
REALIZATION LAYER
.fsp profile
              │
              │ selects and binds capabilities
              ▼
OPERATIONAL LAYER
storage · query · inference · analysis
execution · observation · other capabilities
```

This diagram is not a mandatory flow through which every application must pass sequentially. It is a map of responsibilities. Some applications will use only part of these capabilities; others will combine different mechanisms or distribute computation in different ways. What remains is the boundary among what the system declares itself to mean, what a realization chooses in order to satisfy that contract, and what happens when the selected mechanisms actually enter operation.

FormaSL occupies the semantic layer. Its current logical representation is a typed role-incidence metagraph: relations may retain their own identity, participants occupy semantically defined roles, and structures may participate in higher-order relations. This choice belongs to the logical model. It does not determine how each relation must appear in memory, on disk, or in the indexes used by a realization.

The `.fsl` is the authoritative source of declared meaning. It is at this layer that types, relations, Claims, rules, policies, contexts, and operations form the computable contract of the represented world. The authority remains strictly limited to that contract: a Claim does not become true because it was declared, a formalization does not become the external norm it represents, and a computational authorization does not automatically produce an effect in the world.

In the repository slice underlying this series, the architecture has a concrete language surface. There are operations for query, analysis, inference, transformation, validation, admission, authorization, decision, revision, scenarios, execution requests, observation, source evolution, and incorporation. In the same slice, the Claim lifecycle preserves elements such as identity, content, issuer, basis, and semantic occurrence. Some of the distinctions developed conceptually across the articles therefore reach the effective structure of the language and the verified implementation.

Current documentation considers FormaSL complete as a language under the current semantic horizon. The qualification remains important: this does not mean that every conceivable domain has already been modeled, that no future evolution can occur, or that the rest of the ecosystem is complete. It means that, within the horizon established for this stage, the project considers the set of fundamental distinctions required of the language core closed.

This closure allows other decisions to remain outside it. A new database, algorithm, statistical model, or distributed mechanism may be necessary for a particular application without its existence requiring a new primitive in the language. The next layer exists precisely to separate these needs.

The `.fsp` belongs to the realization layer. Its function is not to establish a second semantics, but to describe how capabilities required by the contract will be satisfied. An application may need to store its world, query relations, perform inference, carry out analysis, use machine learning, coordinate work, or request external actions. The realization profile binds these needs to the mechanisms chosen to satisfy them.

The technical strategy can therefore vary with the problem. In some cases the ecosystem itself may provide a capability; in others it may integrate a specialized implementation; in still others it may delegate realization to external infrastructure. In the current ecosystem design, these possibilities can be read as own, integrate, or delegate. They are not new semantic categories. They are different ways of satisfying a contract that already exists.

The operational layer begins when these choices become concrete mechanisms. Storage persists representations. A query mechanism searches for structures. An inference system derives results. A model may perform an analysis. An executor tries to produce an action. An observation may return information about an external result. Each component has a technical function; that function does not automatically grant it authority over the meaning passing through it.

It is within this decomposition that the components of the Forma ecosystem can be situated.

FormaDB belongs to the data domain. In the current ecosystem design, it is conceived as the native data system for Forma worlds. Native means that it can be designed specifically around the properties and needs of those worlds; it does not mean that the language depends on it ontologically. A FormaSL application may use another storage system if the alternative realization satisfies the relevant obligations of the contract.

Nor does the logical metagraph imply that FormaDB must physically store a graph. Its implementation may choose structures, indexes, and representations suited to operational requirements, provided semantically required properties remain preserved or reconstructible. The distinction established earlier remains valid even for the data system conceived by the ecosystem itself: metagraph semantics does not imply physical graph storage.

Current product decisions also record for FormaDB a reference direction that is open or community-oriented, along with the possibility of a managed offering. This belongs to the ecosystem design, not to the normative semantics of FormaSL, and should not be read as a claim about license, commercial availability, or final implementation state.

Forma Platform occupies another responsibility. It is conceived as the integrated product for operating Forma worlds and computations and coordinating the capabilities required by their realizations. Reducing it to an infrastructure control center would lose precisely the object it is intended to operate: applications whose worlds, operations, and realizations have explicit semantic structure.

This operation may involve storage, reasoning, analysis, execution, resources, and external integrations. Platform does not need to own all these capabilities internally. It may coordinate mechanisms provided by Forma itself and specialized external mechanisms, provided the relations among them and the contract remain explicit. Coordinating computation does not, however, make Platform the source of the meaning it coordinates. That authority remains in the `.fsl`.

Forma Studio answers another need: allowing people to work with this system. It is conceived as an environment for authoring, modeling, inspection, and debugging of Forma worlds and contracts. Structures that exist declaratively in `.fsl` may receive visualizations and forms of interaction better suited to editing and investigation without the interface needing to become the owner of their meaning.

Studio may maintain interface state, produce auxiliary representations, and offer abstractions useful for authoring. What is material to the contract, however, should not depend on hidden information that exists only inside the tool. The interface can help produce and understand the world without becoming a second semantic source.

In the current product design, Studio has a local-first orientation, with the essential local workflow conceived to function without dependence on an account. This is a product decision, not a semantic requirement of the language, but it is consistent with the architecture: the intelligibility of the contract should not depend on its existing only inside a proprietary remote service.

Forma Cloud, in turn, belongs to the domain of managed realization. It is conceived as an option supplied by the ecosystem itself for those who want to operate Forma applications on managed infrastructure. It may concentrate resources, integration, and operational convenience that would be laborious to reconstruct separately in each deployment.

Its optional nature is architecturally important. Forma Cloud is not required to use FormaSL, and it is not the place to which semantic authority migrates when an application is hosted. If correctly interpreting a `.fsl` depended on semantics hidden in the cloud, the contract would cease to be truly authoritative. If only managed infrastructure could legitimately realize an application, freedom of realization would be merely nominal. Cloud can be a deeply integrated realization within the ecosystem without ceasing to be a realization.

The responsibilities can therefore be condensed as follows:

| Component | Primary responsibility | Relation to semantic authority | Relation to FormaSL |
|---|---|---|---|
| FormaSL / `.fsl` | declare world, contract, and semantic operations | authoritative source of declared meaning | semantic core |
| `.fsp` | describe the realization profile | satisfies the contract; does not redefine it | realization layer |
| FormaDB | natively realize the data domain | does not redefine the contract | native storage, not mandatory |
| Forma Platform | operate and coordinate worlds, computations, and realizations | does not redefine the contract | integrated product, not a language requirement |
| Forma Studio | authoring, modeling, inspection, and debugging | does not redefine the contract | optional working environment |
| Forma Cloud | provide managed realization | does not redefine the contract | optional realization |

The table does not represent a stack of authority either. Cloud is not semantically above Platform; Platform is not above FormaDB; Studio does not become the source of meaning because it was used to produce a contract. There are dependencies, integrations, and operational relations among these components, but authority over declared meaning does not propagate merely because they are composed.

This distinction explains why the ecosystem is conceived as composable rather than as an indivisible package. FormaSL does not depend on Cloud. FormaDB is not an ontological condition for a Forma application. Studio can participate in authoring without being necessary for execution. Platform can operate internal and external capabilities. Cloud can offer a managed realization without monopolizing possible execution of the contract.

Composability also does not mean that any arbitrary set of components will work without integration effort. An external mechanism still needs to satisfy technical contracts, operational properties, and semantic obligations. Some combinations may require substantial engineering; others may be naturally favored by deeper integrations. The architecture does not promise operational equivalence among all realizations. It makes it possible to distinguish infrastructure choices from changes in application meaning.

Semantic Continuity crosses this entire map. It does not belong exclusively to the compiler, storage, Platform, or any isolated product. When the `.fsl` is elaborated, when a realization profile is resolved, when structures are materialized, when an analysis is executed, or when an observation returns from the external world, each passage may preserve, transform, or erase information needed for later interpretation.

If a result remains dependent on a scenario, that dependency cannot disappear when it is stored. If the issuer of a Claim remains material to its interpretation, a projection cannot silently turn it into an unattributed proposition. If a decision produced an execution request, an operational response cannot erase the difference among deciding, attempting execution, producing an effect, and observing that effect. Freedom of realization remains subordinate to these obligations.

This does not authorize the claim that the entire current ecosystem already provides complete end-to-end traceability for every possible transformation. The architecture establishes preservation and reconstruction obligations when particular genealogies, dependencies, or distinctions are materially necessary; the current implementation slice provides evidence for specific properties. A claim of total coverage would require corresponding demonstration.

We therefore arrive at one final distinction needed to read the map correctly. Not all statements about Forma have the same status. The authority of the `.fsl`, the separation between contract and realization, the logical metagraph, and the obligations of Semantic Continuity belong to the current normative architecture. The language surface and specific Claim-lifecycle behaviors are verified in the repository slice used for this series. FormaDB, Platform, Studio, and Cloud, in turn, include current decisions about the organization of the ecosystem and products. These decisions may indicate Forma's technical direction, but they should not automatically be turned into claims of commercial availability, maturity, license, price, or service level.

Separating these registers makes the architecture more precise, not less. Normativity, implementation, and product can evolve at different rates without a temporary code state redefining the contract or a product decision being presented as an already demonstrated capability.

We can then observe Forma as a whole system without reducing it to any of its parts. FormaSL declares worlds and operations; realization profiles bind those contracts to required capabilities; data systems can materialize their states; specialized mechanisms can query, infer, analyze, and execute; Platform can coordinate these capabilities; Studio can make them manipulable and inspectable by people; Cloud can provide a managed realization; external mechanisms can participate when they satisfy the relevant obligations. None of these components needs to become a universal machine or assume sole semantic ownership of the world it helps compute.

At this point the architecture returns to the problem that opened the series.

The concrete company existed before its systems. To make it computable, we decomposed its determinations among ledgers, databases, commercial systems, identity mechanisms, planning tools, models, interfaces, and many other specializations. This decomposition was not a mistake: it is what made different aspects of the organization operationally tractable. The problem arose when each cut also began to carry implicitly its own part of the meaning, and unity then had to be reconstructed through identifiers, integrations, conventions, and knowledge scattered across systems.

At the end of the series, specialization remains. We still have language, storage, reasoning, analysis, execution, interfaces, platforms, and infrastructure. We have not tried to replace them with a single technology.

What has changed is where unity resides: multiple cuts and multiple realizations can continue to belong to the same world because the meaning that relates them has not been delegated to any one of them.
