---
id: 2
title: "Short explainer reels (Remotion + ElevenLabs voice + word-timed captions) are now a repeating multi-step workflow with no skill"
status: open
type: open-source
skill: []
proposes_skill: [explainer-reel]
target_file: []
siblings_checked: "none: no skill-families.md registry; no existing skill covers video production in this workspace (yt-script writes scripts only, watch only analyses)"
area: "New skill: end-to-end vertical explainer video production"
date: 2026-10-23
session_context: "Three science shorts in one session (cell life, sleep, wound healing) built in the style of a reference Instagram reel, for a creator on a phone"
parked_until:
resolved:
resolution:
reference:
commands_verified: none
---

**Issue:** The same pipeline was rebuilt by hand three times in one session: analyse a reference reel's style from frames (watch skill + ffmpeg contact sheets), write a ~150-word script, generate TTS, get per-word timestamps (upload or pin the generation as a flow asset node, then transcribe), hand-split caption groups that must match the transcript word-for-word, build scenes in Remotion, render stills on a contact sheet for review, render, deliver. Shared UI pieces only got extracted into a reusable module on the third video. Two non-obvious steps cost time: (1) the transcript word count must match the caption-group script exactly (a node check caught it); (2) when an asset-upload tool is unavailable, the speech generation itself can be pinned as an audio node and transcribed directly. Publishing to YouTube/TikTok via a connector then stalled because the rendered file had no permitted path to the connector's staged storage (temp-file hosts are blocked by the permission classifier) and the shared YouTube API quota was exhausted.

**Suggested improvement:** Create an `explainer-reel` skill: reference-style capture checklist (caption treatment, label pills, counters, progress bar, CTA ending), a reusable Remotion UI module (captions with keyword box, pill, counter, bar, clock, phone CTA) parametrised by palette, the voice → timestamps recipe (including the pin-generation-as-node fallback), the word-count assertion, the contact-sheet review step, and a publishing section that states up front that connector uploads need the file in the connector's storage and that the user's own app upload is the reliable default from a phone.

**Principle:** When a multi-step production workflow repeats within a single session, extract its reusable components at the second repetition, not the third, and record the environment's publishing constraints before promising automated delivery.
