---
locale: en
slug: a-language-for-meaning
translationKey: series-01-03
title: "A language for meaning"
description: "If meaning has its own layer, it also needs a language capable of making it computable."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 3
draft: false
---

Separating meaning from implementation solves only half the problem. The other half is giving meaning a form the computer can operate on.

Documentation is not enough. Natural language can explain a rule to people, but it still depends on interpretation. A schema describes structure. An API defines an interface. A graph represents connectivity. An ontology defines concepts and relations. All of these are useful, but none of them alone provides a general language for declaring a world and making its rules participate directly in computation.

FormaSL — Forma Semantic Language — was created to occupy that space.

It is a language for specifying meaning and rules and turning both into computational objects.

That changes the primary unit of construction. Instead of starting by asking which tables, endpoints or services an application will have, we can start by asking what world it represents: which entities exist, which relations matter, which roles participants play, which rules govern those relations, in what context they apply and which operations have different meanings inside the domain.

A FormaSL contract makes those answers explicit.

The goal is not to write elegant business documentation. It is to create a semantic source that applications, services, agents and specialized mechanisms can use without reconstructing the same meaning locally.

This distinction matters because FormaSL is not a conventional programming language with a few new types. Its role is not to replace every language that executes software. It is to declare what those languages normally leave scattered through implementation.

The result is a contract that remains recognizable even when realization changes.

Different mechanisms can then store, query, analyze, infer, decide or execute parts of the system. The contract continues to define the world in which those operations occur.

This also changes the relationship with domain specialists. An ontologist, data engineer, risk professional or operator no longer has to contribute only through requirements that will later be translated into code. Part of that knowledge can enter the system directly as computable structure.

The developer remains essential, but gains another abstraction layer. The specialist gains a surface closer to the domain. The organization reduces the distance between what it knows and what its software can express.

FormaSL is therefore the foundation of Semantic Computing.

**If meaning no longer belongs to implementation, it needs a language of its own.**

But a language for meaning must answer a difficult question: what structure can represent relations, context and knowledge without reducing everything to simple nodes and edges?

That is where graphs and ontologies enter — as the beginning, not the end.