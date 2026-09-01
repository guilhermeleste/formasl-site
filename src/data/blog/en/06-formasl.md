---
locale: en
slug: formasl-en
translationKey: series-01-06
title: "FormaSL"
description: "FormaSL is the computable semantic specification language that declares worlds, relations, Claims, operations, and semantic obligations without confusing the contract with its physical realization."
date: 2026-08-31
authors:
  - Forma Research Lab
category: "Series 01"
draft: false
hero: /blog/series-01/06-formasl.svg
heroAlt: "A FormaSL contract organizes types, role-based relations, Claims, scenarios, and semantically distinct operations."
---

In the previous article we arrived at the need for a language. If meaning must remain identifiable across queries, inferences, decisions, scenarios, and executions, it cannot depend only on conventions distributed among code, databases, documentation, and configuration. We need an explicit way to declare the world we want to make computable, the differences that matter within it, and the operations that can act on those differences. That form is FormaSL.

FormaSL is a computable semantic specification language. Not because every meaning can be captured by a language, nor because everything that happens in the world can be reduced to a specification, but because what we choose to represent computationally needs to acquire a form explicit enough to be operated on without its distinctions depending on implicit knowledge of the implementation. The language declares structures, relations, qualifications, and operations; the specification establishes the contract those declarations must respect; semantics determines which differences are material; and computability makes it possible for this world to become more than documentation.

For this reason, a `.fsl` file is not simply a configuration for a particular program to execute. It is the authoritative source of the meaning declared by the contract. The qualification is indispensable: what appears in a `.fsl` does not become true about reality merely by being there. A claim remains a claim, a formalization of a norm remains distinct from the real norm, and a represented authorization continues to depend on the institutional authority the domain assigns to it. The authority of the contract is semantic; it is not universal authority over the world.

The most direct way to see what this means is to begin with a simple relation. The current syntax allows us to declare types and specify the roles occupied by participants:

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

There is little code, but there is more information here than the mere existence of three connected elements. Agent, Item, and Context belong to the vocabulary of that domain; Assigned identifies a relation; assignee, item, and context state the semantic position each participant occupies in it. If two participants exchange roles, we have not merely changed the order in which data appear: we have changed the relation being declared.

This structure is the linguistic expression of a problem we had already encountered before speaking about FormaSL. Some relations need to preserve their own identity, multiple participants, and roles that are not interchangeable; they may also be qualified, participate in other relations, and remain identifiable across transformations. The logical representation currently chosen by the project is a typed role-incidence metagraph. This does not impose a graph database as the physical form of storage. The metagraph belongs to the logical contract; persistence and execution belong to another problem.

The difference between representing a relation and claiming something about it becomes even clearer with Claims. If we want to record that Alice owns a particular account, preserving only the proposition may not be enough. It may matter to know who asserted it, under which context, and at what time it should be interpreted. The language makes this explicit:

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

The Owns relation appears as the content of Claim c1, but the two are not the same thing. The Claim is an attributable assertion: it has identity and can carry information about issuer, context, and temporal role. Recording that `$registry` asserted something under `$jurisdiction` at `$t0` is not equivalent to declaring that it is an absolute truth. The language preserves precisely the distance among content, claim, and truth that motivated the construction of the world model.

This distinction does not end at syntax. In the Claim lifecycle verified in the current implementation slice, the identity of the Claim, its content, its issuer, its issuance basis, and its semantic occurrence remain separate. Communicating or using a Claim does not automatically create another Claim. A new assertion of the same content may have another identity, another issuer, and another history. Equality of content does not erase the difference among acts of claiming.

The declared world can also be computed. The language distinguishes, for example, Match from Infer. A query looks for structures that satisfy a particular pattern; an inference derives consequences according to rules and premises. This difference is material because a derived result does not become an attributable assertion merely by having been calculated. If some agent later takes that result on as a Claim, a new semantic transition occurs, with the corresponding attribution. Reasoning may feed a claim; it does not need to disguise itself as one.

The same discipline appears when computation enters the normative domain. The current language distinguishes Validate, Admit, Authorize, and Decide. These are not four names for “apply a rule.” Verifying conformance with certain conditions is not equivalent to admitting something into a governed domain; admission does not automatically grant authority; authorization is not the decision itself. Making these differences appear in the language prevents them from disappearing precisely where they begin to determine behavior.

This principle runs across the current surface of FormaSL. In addition to query, analysis, inference, and transformation, it contains operations for validation, admission, authorization, decision, revision, scenarios, execution requests, observation, source evolution, and incorporation. The point of this variety is not to accumulate keywords, but to allow different forms of computation to remain recognizable as different forms of computation when their results enter a larger chain.

A scenario shows especially clearly why this matters. The language can begin from a world identified as the reference and introduce premises that belong only to that hypothetical context:

```fsl
module scenario_demo {
    type World
    content Basis

    scenario WhatIf($base: World) using Basis from $base {
        assume $stressor
    }
}
```

The scenario does not need to alter what it took as its base. It introduces an assumption within its own context so that we can compute under it. If a particular result materially depends on that assumption, the dependency must remain recoverable. Discarding the scenario does not retroactively modify the reference world; moving a result from hypothetical status into another status requires an explicit transition. The difference between hypothesis and reference world therefore does not remain merely an abstract principle: it has expression in the language itself.

Something similar applies to change and history. FormaSL has revision and source-evolution operations because changing what is represented should not mean treating the previous state as though it never existed. A correction may change what now holds without making it impossible to reconstruct the prior state when that history remains relevant; a source may evolve while preserving material information about its transformation. Revision and erasure remain different things.

The boundary between decision and execution also reaches the language. FormaSL can represent decisions, execution requests, and later observations without requiring those three moments to be merged into a single action. A decision may give rise to a request directed at an external mechanism; that mechanism may attempt to produce an effect; information about the operational result can then be observed and incorporated back into the representation. The executor does not acquire semantic authority merely because it performs the action, and a technical success response need not automatically be treated as proof that every expected external effect occurred.

These differences reveal the role of Semantic Continuity within the language itself. A derived consequence must remain recognizable as derived when that qualification matters; a Claim must preserve what keeps it identifiable as that Claim; a hypothesis must not silently lose its dependency on the scenario; a revision must not erase necessary history; a decision cannot become execution merely because the next stage managed to consume it. The language does not require everything to be preserved indefinitely, but it does require semantically material losses and transformations not to happen by accident.

This also prevents the implementation from retroactively determining the semantic model of the system. A compiler may reorganize structures, an index may change the form of access, a database may store relations differently, a mechanism may use another execution strategy. These choices may matter for performance or scale, but none receives authority to convert a Claim into fact, a hypothesis into occurrence, or a computed result into an institutional decision merely because a particular physical representation would be more convenient.

In the repository slice that serves as the basis for this series, the project considers FormaSL complete as a language under the current horizon. The expression is deliberately restricted. It does not claim that the language will never change, that every conceivable domain has already been modeled, that every mechanism required by every application is implemented, or that the entire ecosystem is complete. It means that, relative to the currently established semantic horizon, the project considers the set of fundamental distinctions required of the language closed at this stage.

This condition prevents every new computational need from automatically becoming a new language primitive. A storage mechanism, an algorithm, a machine-learning model, or an execution infrastructure may be necessary for a particular application without that need revealing a gap in the semantics of the language. The question for FormaSL is whether there is a difference that needs to be declared or preserved. The question of which mechanism will perform a particular computation belongs to another level.

This boundary becomes unavoidable when we look at the operations the language can specify. An inference may require a specialized reasoning mechanism; an analysis, a statistical model; a particular application may use machine learning; a query may require particular indexes; an execution may end in a payment system; storage may require very different properties depending on the domain and scale. Trying to incorporate all these mechanisms into a single environment would mean constructing a system that grew toward implementing any form of computation any application might ever need.

That is not the function of FormaSL. The language needs to specify the meaning of the computation, the distinctions it receives, and the obligations its results must respect. It does not need to be the physical mechanism that performs each of those computations. A specialized component may solve a particular problem much better without thereby acquiring authority to redefine the contract it received.

The current architecture makes this boundary explicit. The `.fsl` declares the semantic contract and remains its authoritative source; realization belongs to a separate layer. It can choose mechanisms, resources, and strategies appropriate to the case, provided it satisfies the obligations imposed by the contract. Concrete execution and storage are again distinct responsibilities. They may be combined in a working system, but they do not need to share identity or semantic authority.

We therefore reach the limit of the language as an isolated answer. FormaSL makes it possible to declare a semantically structured world and specify different forms of computation over it. But the very success of the language creates an architectural requirement: databases, reasoning mechanisms, models, simulators, services, and other capabilities must be able to realize these computations without semantics having to be reinvented inside each of them.

If meaning must remain stable while realization may vary, the next question is no longer which language to use, but which architecture makes this separation computationally sustainable.
