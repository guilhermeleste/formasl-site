---
locale: en
slug: separate-meaning-from-execution
translationKey: series-01-02
title: "Separate what software means from how it is executed"
description: "Semantic Computing separates the contract that defines a system from the technologies that realize it."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 2
draft: false
---

Today, much of an application’s meaning is born together with its implementation. A table implicitly defines what an entity is. A condition in code defines when a rule applies. A service concentrates a policy. An API decides which relations can cross the boundary between two systems.

This makes the application depend on its realization at a deeper level than ordinary technology dependence. The problem is not only being locked into a database, framework or cloud. It is being locked into the place where meaning was hidden.

Semantic Computing proposes a different architecture.

Instead of leaving concepts and rules distributed through the implementation, the system explicitly declares the world it represents: entities, relations, context, time, authority, policies and conditions of action. That definition exists independently from the technologies chosen to realize it.

The direction of dependency is reversed.

Before, we observed backend behavior to discover what the application meant. Now, the backend receives a contract that already defines the meaning it must realize.

A database still stores data. A service still executes operations. A model still produces analyses or predictions. An API still connects systems. A cloud still provides computational resources. But none of those pieces needs to be the final source of the system’s semantics.

That changes the role of the backend.

**The backend stops defining the application and starts realizing it.**

The result is semantic independence from realization. The same domain can be materialized in different technologies. A database can be replaced without redefining what a relation means. A model can change without turning a prediction into a decision. A service can be rewritten without recreating the rules that govern the domain locally.

This separation also changes portability. Porting software stops meaning only moving data or code between environments. It starts to include preserving what the system means while its infrastructure changes.

The point is not to abolish implementation. It is to put implementation in the right place.

Implementation should be free to choose mechanisms, optimize representations and combine technologies. The contract should remain the reference for what must remain semantically true about the system.

That separation is what makes meaning as infrastructure possible. And if meaning has its own layer, it also needs its own way of being declared.

We need a language that can specify the world, its relations and its rules directly.

That is where FormaSL begins.