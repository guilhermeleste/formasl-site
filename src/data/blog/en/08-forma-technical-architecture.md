---
locale: en
slug: ai-needs-a-world-not-just-context
translationKey: series-01-08
title: "AI needs a world, not just context"
description: "FormaSL gives agents an explicit world, rules and authority external to the model’s own interpretation."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 8
draft: false
---

AI agents make the problem of scattered meaning especially visible.

To act in a domain, a model has to discover what exists, what each entity means, which relations matter, which rules are in force, who has authority and which information should be treated as fact, hypothesis, recommendation or observation.

Today, much of that work is reconstructed from prompts, documents, RAG, APIs, schemas and examples.

That improves grounding. But grounding and governing a world are not the same thing.

An agent may receive correct documents and still need to decide how to interpret them. It may know a policy and still need to infer when it applies. It may find a relation in a knowledge graph and still need to decide what operational consequence that relation has.

FormaSL changes the starting point.

The agent receives a world whose meaning has already been declared. Entities have identity. Relations have roles. Rules and authorities exist outside the model. Epistemic states remain distinct. Conditions of action belong to the semantic contract.

This creates a clear division of responsibility.

**The model provides intelligence. The contract defines the world.**

The agent remains probabilistic. It can reason, plan, propose alternatives and choose strategies. But the fundamental rules that govern its action do not need to depend on its own interpretation.

Authorization can be verified outside the model. A hypothesis can remain separate from the reference state. A recommendation can be prevented from acquiring the status of a decision. A decision can require identifiable authority before producing an execution request.

This creates a deterministic base for probabilistic systems.

Deterministic not in the sense of making intelligence predictable, but in the sense of removing certain laws of the world from the model’s authority. The agent can choose within the rules; it does not need the power to rewrite them.

The architectural consequence matters. Models can be replaced, combined or updated without taking the domain’s meaning with them. Intelligence evolves on top of a world that remains external to it.

Coordination improves as well. People, traditional software and agents can work over the same contracts. Each performs different functions, but all encounter shared definitions, relations and rules.

**Grounding tells the agent what to consider. Semantic Computing defines the world in which it may act and the rules it cannot rewrite.**

Once agents receive that kind of foundation, another consequence appears: they no longer need to rebuild as much infrastructure to create the next application.