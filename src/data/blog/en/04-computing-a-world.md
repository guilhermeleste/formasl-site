---
locale: en
slug: graphs-and-ontologies-were-the-beginning
translationKey: series-01-04
title: "Graphs and ontologies were the beginning, not the end"
description: "Graphs connect, ontologies define, and FormaSL carries those structures into computation governed by meaning."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 4
draft: false
---

Graphs are among the most powerful structures for representing relations. Ontologies make concepts and categories explicit. Knowledge graphs combine those capabilities to organize connected knowledge.

Semantic Computing starts from that tradition, but asks another question: what happens when meaning itself must remain explicit throughout computation?

Consider a simple relation:

`Alice owns Asset X.`

A graph can represent that connection naturally. But in many domains, the relation is only the beginning.

Who claims Alice owns the asset? In what context? According to which source? Since when? Under which jurisdiction? Does another institution disagree? Was the relation observed, inferred or declared? Does a later decision depend on it? Who has authority to make that decision?

When those questions matter, knowing that two nodes are connected is not enough. The relation itself needs identity, participants, roles and context. In some cases, we also need to make claims about the relation, assess it, place it under a rule or connect it to later decisions.

That is why FormaSL uses a **typed role-incidence metagraph** as its logical representation.

The name is technical; the idea is straightforward.

A relation is treated as an identifiable object. It may have multiple participants. Each participant occupies a semantically defined role. And the relation itself may participate in higher-order relations.

An authorization, for example, does not have to be reduced to a generic edge between two entities. It may involve who grants, who receives, which capability is being authorized and under what conditions. A decision may relate who decides, what is being decided, which elements support it and under which authority.

Ontologies sit on top of that structure by defining the concepts recognized in a domain: person, organization, asset, contract, military unit, machine, medication, risk, obligation or any other relevant category.

The metagraph provides relational form. The ontology provides vocabulary. The semantic contract defines the rules and distinctions that govern that world.

This combination is different from merely storing a knowledge graph. The goal is not only to query connected knowledge, but to allow analyses, inferences, decisions, scenarios and agents to operate on the same base without losing the qualifications that give relations their meaning.

**Graphs make relations computable. Ontologies make concepts explicit. FormaSL makes the meaning of those structures part of computation.**

That requires one more discipline: the computer must know which things it may never silently collapse.

That is the subject of the next essay.