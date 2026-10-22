---
id: 1
title: "Reused a hand-built visual template across videos instead of searching the HyperFrames registry first"
status: open
type: open-source
skill: [hyperframes]
proposes_skill: []
target_file: []
siblings_checked: "none: hyperframes belongs to no declared family (skill-families.md absent); hyperframes-registry is the catalog the rule points to, not a sibling that would carry the rule"
area: "Work loop / 'search the registry before hand-writing' rule"
date: 2026-10-22
session_context: "Three explainer reels in a row (yawning, pen cap 2D, pen cap 3D) built for a creator on a phone"
parked_until:
resolved:
resolution:
reference:
commands_verified: none
---

**Issue:** The hyperframes skill says to search the registry before hand-writing a named effect, transition, caption style or card. Across three consecutive videos the agent searched it only once (caption styles) and otherwise reused its own hand-built template: the same grid background, the same progress line, the same flat SVG drawings and the same title treatment. The user noticed ("you use the same drawing and the same timeline") before the agent did. Only after that correction did the agent open the catalog (448 blocks, 21 of them 3D, 52 transitions, 21 free bundled sound effects) and produce a clearly better 3D version with sound effects. The rule was written and loaded in context; nothing checked it at build time.

**Suggested improvement:** In the hyperframes work loop, make the registry search a step that leaves a trace before the first composition is written for a new video, e.g. "list the catalog tags you searched and the blocks you considered in SPEC.md", so a skipped search is visible in the deliverable rather than only in the result. Also state that a second video for the same person must not reuse the previous video's background/layout system unless asked: vary the look per film.

**Principle:** A "search the library before building it yourself" rule decays into habit after the first success: the agent's own previous output becomes the de facto library. Rules meant to prevent self-reuse need a recorded checkpoint per deliverable, not a one-time reminder.
