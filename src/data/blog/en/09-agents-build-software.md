---
locale: en
slug: when-agents-start-building-software
translationKey: series-01-09
title: "When agents start building software"
description: "Reusable contracts reduce the work agents need to rebuild for every new application."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 9
draft: false
---

An agent that builds software today has to produce much more than application-specific logic.

It needs to define schemas, APIs, validation, authorization, integrations, states and a significant part of the domain model. Even when it uses existing frameworks and services, it still has to reconstruct how all those pieces mean what the application intends to do.

That cost exists because every application starts with local semantics.

When the domain already exists as computable contracts, the starting point changes.

The agent can reuse concepts, relations, rules and policies that already exist. Instead of redesigning the world, it combines parts of a world that is already defined and adds only what is specific to the new need.

That sharply reduces the distance between intent and a working application.

A contract may already define customer, asset, authorization, obligation or risk. A domain library may already contain common relations and rules. A new application composes that existing asset instead of recreating it.

The agent still writes code where needed. It still chooses interfaces, flows and mechanisms. But a larger share of the work stops being the reinvention of semantic infrastructure.

This also changes how agent-built software can be tested.

The system no longer has to be evaluated only by external behavior or examples. Part of its correctness can be checked directly against the contract that defines the domain: rules, distinctions, conditions and authority are explicit before realization.

An important economic consequence follows: applications that would be too expensive to justify today can become viable.

Not every need has to create a permanent product.

An agent can create an application for a specific operation, project, analysis or decision. It exists while needed, performs its function and then disappears.

The interface disappears.

The implementation may disappear.

Meaning does not need to disappear with it.

Contracts, data, relations and rules remain available to the next application.

This is the idea of **ephemeral applications**: software whose existence can be temporary because the most important asset is not trapped inside the application.

**The application can disappear without the knowledge required to build the next one disappearing with it.**

This shift leads directly to Forma’s business model. The language that makes it possible is open. The company monetizes a different layer: production realization.