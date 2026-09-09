---
locale: zh-hans
slug: forma-formasl-he-forma-platform
translationKey: series-01-10
title: "Forma、FormaSL 与 Forma Platform"
description: "Forma 是公司，FormaSL 是开源语言，Forma Platform 是商业实现。"
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 10
draft: false
---

把三件事清楚分开之后，整个架构就更容易理解。

**Forma 是公司。**

它开发语义计算，维护 FormaSL，并建设把这套架构变成软件基础设施所需要的生态系统。

**FormaSL 是开源语言。**

它让组织能够用可计算方式声明世界、关系与规则，并使这些定义独立于实现它们的具体技术。

**Forma Platform 是商业产品。**

它把 FormaSL 契约连接到数据库、服务、模型、智能体和基础设施，并提供在生产环境中运行这些契约所需要的机制。

这种划分是刻意设计的。

一个组织的意义应该继续属于这个组织。开放语言意味着契约可以被读取、保存并在 Forma 之外实现。公司和第三方都可以创建工具、库和其他实现。

Forma 商业化的是运营层。

**我们不出售“定义意义的权利”。我们出售把可计算意义真正投入生产的能力。**

这使 Forma 与传统云平台处在不同的位置。

云平台提供基础原语：compute、storage、database、queue、container、identity、network、observability 和模型。开发者选择这些组件，并把它们组合成后端。

Forma 在这些原语之上增加一层抽象。

开发者先从系统本身开始：概念、关系、规则、语境与契约。平台则把其中一部分定义转化为可运行的基础设施。

这样可以减少每个新应用都需要重新完成的组合工作，同时保留对底层技术的访问。

传统代码仍然可以使用。外部数据库仍然可以使用。现有云平台仍然可以使用。一个应用可以只在单个领域采用 Forma，也可以更广泛地使用平台。

这套架构从设计上就是可组合的。

目标不是替换所有现有软件，而是补上一层今天仍然缺失的架构。

这也形成一种明确的商业关系：组织继续控制真正使自己差异化的知识，而把让这些意义变成可计算、可治理、可复用基础设施的通用部分交给 Forma。

**组织拥有自己的世界。Forma 提供让这个世界运行起来的基础设施。**

这项价值在那些意义跨越大量系统、而语义分歧会产生真实后果的领域中最为明显。