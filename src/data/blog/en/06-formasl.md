---
locale: en
slug: meaning-must-survive-computation
translationKey: series-01-06
title: "Meaning must survive computation"
description: "Semantic Continuity keeps reconstructible the distinctions that remain necessary to interpret a result."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 6
draft: false
---

Representing meaning correctly at the input does not solve the problem if that meaning disappears during computation.

Information passes through queries, transformations, models, inferences, services, decisions and executions. At each step, its form may change. The risk is that what it means changes silently as well.

Imagine a prediction produced by a risk model. It passes through two services, feeds an operational rule and reaches an interface. If, at the end, we can no longer tell that the information was a prediction produced by a particular model under particular conditions, the value may have been preserved while the meaning was lost.

The same happens with hypotheses. A result calculated inside a hypothetical scenario may be numerically identical to one from the reference world. If its dependence on the scenario disappears, the two become indistinguishable to the next operation.

Forma calls **Semantic Continuity** the property by which distinctions still needed to interpret a result remain reconstructible across relevant transformations.

Reconstructible is the key word.

The system does not need to copy everything everywhere. A representation may be compressed, indexed, projected or transformed. What matters is preserving, directly, by reference or through lineage, what remains material to meaning.

A Claim remains attributable to its source. A prediction remains recognizable as a prediction. A hypothesis remains tied to the scenario that introduced it. A decision remains distinguishable from the execution it authorized. An observation remains related to the effect it observed.

This creates a different criterion for correctness.

It is not enough to ask whether a transformation returned the expected type or whether an API call succeeded. We also need to ask whether the semantic distinctions required by the contract are still recoverable afterward.

When two situations that should remain different become indistinguishable, semantic erasure has occurred.

This matters especially in composed architectures. Every component may be technically correct in isolation while the chain as a whole degrades meaning. A model produces an assessment; a service treats it as a recommendation; another reduces it to a boolean; the final system interprets that boolean as a decision.

Nothing needed to fail technically. The semantics failed.

Semantic Continuity allows specialized mechanisms to remain specialized without recreating semantic fragmentation at every boundary.

**Representation may change. Meaning must remain reconstructible.**

Once that property exists, the same world can pass through different computational regimes without losing its semantic identity.

And the question changes from how to represent meaning to what we can compute over it.