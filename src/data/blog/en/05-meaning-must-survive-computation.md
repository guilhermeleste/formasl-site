---
locale: en
slug: the-computer-must-know-what-not-to-confuse
translationKey: series-01-05
title: "The computer must know what it cannot confuse"
description: "Modeling meaning requires preserving distinctions that software often compresses into states, flags and records."
date: 2026-09-09
author: guilherme-leste
seriesKey: meaning-as-infrastructure
part: 5
draft: false
---

People naturally distinguish things that software often compresses.

A claim is not truth. An observation is not the observed fact itself. A prediction is not an event. Permission is not authority. Authority is not decision. Decision is not execution. Execution is not effect. A hypothesis is not the current state of the world.

In simple systems, merging those distinctions looks convenient. A field like `approved = true` may stand simultaneously for someone having authority, a decision being made and the operation having occurred. As long as everything follows the expected path, the simplification works.

The problem appears when situations diverge.

Someone had authority but never decided. The decision was made but execution failed. Execution happened without valid authorization. A model predicted fraud but the prediction was never confirmed. An employee claimed a payment occurred while the bank had not yet observed it.

In those cases, what looked like one state turns out to be several semantically distinct things.

FormaSL’s world model begins from that requirement.

It seeks to preserve distinctions that can still lead to different consequences inside a domain. That includes identity, context, time, perspective, authority, epistemic status and history.

Time, for example, is not just a timestamp. A rule may have been valid during one period, a decision made later, execution performed at another moment and information about the effect known only afterward. Looking only at current state may erase the conditions that made a past decision valid.

Perspective matters as well. Two agents may hold different information about the same situation. One may claim something happened; another may dispute it. The system does not have to immediately choose one privileged view and erase the other. It can preserve both positions and let later operations handle the conflict explicitly.

This is especially important for AI agents. A model should not gain authority to turn a hypothesis into fact or a recommendation into a decision simply because its output entered an operational pipeline.

The strength of the world model is precisely in keeping those boundaries explicit.

The goal is not to represent all of reality. It is to ensure that what we do choose to represent does not lose distinctions the domain still considers material.

**Much of what humans distinguish naturally disappears when it becomes a state, column, flag or message. FormaSL makes those distinctions computable.**

But preserving them at the input is not enough. They also need to survive the operations that follow.

That is where Semantic Continuity enters.