---
locale: en
slug: software-has-no-layer-for-meaning
translationKey: series-01-01
title: "Software has no layer for meaning"
description: "We built layers for data, infrastructure and computation. Meaning remained scattered across applications."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 1
draft: false
---

A company exists before its software. Customers buy, contracts create obligations, people make decisions, machines produce and rules shape what may happen. Software comes later, to make parts of that world recordable, queryable and executable.

That is why specialized applications exist. CRM represents customers and deals. ERP represents resources, orders and inventory. Financial systems represent obligations and payments. Identity systems represent users, roles and permissions. Each tool cuts a different view of the same world according to the function it needs to perform.

That specialization was a major achievement. The problem emerged elsewhere: each application also began to carry part of the organization’s meaning.

What a customer is gets redefined in CRM, finance and support. The same business rule appears in multiple services. Authority becomes authorization logic. Context becomes parameters. Relations become joins, messages, mappings and conventions. Domain knowledge ends up split across code, databases, APIs, documentation and the people who maintain the system.

The larger the organization, the more expensive this dispersion becomes. A conceptual change must cross multiple implementations. Technical integration moves data, but still has to reconstruct what that data means on each side. Two systems may share the same identifier and still disagree about the entity it represents. A rule may be documented one way and implemented another.

Modern software created clear layers for storage, computation, networks and, increasingly, intelligence. But meaning never received its own layer. It remained embedded in the applications that were supposed to realize it.

That absence has a structural consequence: the technology that executes the system also ends up defining what the system means.

When we replace an application, we often need to rediscover its semantics inside code. When we replace a service, we need to find the rules hidden inside it. When we introduce an agent, we give it documents, prompts and APIs and expect it to reconstruct the world it is entering.

Forma starts from this problem.

**Meaning and rules need their own layer in software architecture.**

Not as documentation. Not as commentary around data. As something a computer can represent, preserve and use directly.

The next step is to separate two things that have historically been coupled: what a system means and the technology used to execute it.