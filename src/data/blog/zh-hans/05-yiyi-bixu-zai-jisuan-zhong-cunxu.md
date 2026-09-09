---
locale: zh-hans
slug: jisuanji-bixu-zhidao-buneng-huntong-shenme
translationKey: series-01-05
title: "计算机必须知道什么不能混同"
description: "主张、真值、观察、预测、决策与执行并不是同一件事。"
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 5
draft: false
---

人会自然区分很多东西，而软件经常把它们压缩成状态、标志位和字段。

Claim 不等于真值。观察不等于被观察的事实。预测不等于事件。假设不等于当前世界。许可不等于权威。权威不等于决策。决策不等于执行。执行不等于效果。

这些区别决定信息能够如何被使用。一个高风险预测可以参与决策，但不会因此获得决策本身的权威。一个假设可以被计算，而不改变参考世界。一次执行也可能产生与预期不同的效果。

FormaSL 在决定如何存储和执行之前，先把这些区别显式化。

这样，分歧、语境、时间、权威、不确定性与历史都可以保持可计算，而不会被压缩成一个看似唯一的“真实状态”。

**建模意义，首先要保留那些不能被混同的东西。**