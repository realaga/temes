---
id: 2
title: "Short explainer reels (Remotion + ElevenLabs voice + word-timed captions) are now a repeating multi-step workflow with no skill"
status: open
type: open-source
skill: []
proposes_skill: [explainer-reel]
target_file: []
siblings_checked: "none: no skill-families.md registry; no existing skill covers video production in this workspace (yt-script and ig-reel write scripts and beat sheets only, watch only analyses); ig-reel beats.py --target is the natural script-length check to reuse"
area: "New skill: end-to-end vertical explainer video production"
date: 2026-10-23
session_context: "Three science shorts in one session (cell life, sleep, wound healing) built in the style of a reference Instagram reel, for a creator on a phone; next session (2026-10-23) the same three had to be cut to a 45 s cap from the rendered files alone"
parked_until:
resolved:
resolution:
reference:
commands_verified: none
---

**Issue:** The same pipeline was rebuilt by hand three times in one session: analyse a reference reel's style from frames (watch skill + ffmpeg contact sheets), write a ~150-word script, generate TTS, get per-word timestamps (upload or pin the generation as a flow asset node, then transcribe), hand-split caption groups that must match the transcript word-for-word, build scenes in Remotion, render stills on a contact sheet for review, render, deliver. Shared UI pieces only got extracted into a reusable module on the third video. Two non-obvious steps cost time: (1) the transcript word count must match the caption-group script exactly (a node check caught it); (2) when an asset-upload tool is unavailable, the speech generation itself can be pinned as an audio node and transcribed directly. Publishing to YouTube/TikTok via a connector then stalled because the rendered file had no permitted path to the connector's staged storage (temp-file hosts are blocked by the permission classifier) and the shared YouTube API quota was exhausted.

**Suggested improvement:** Create an `explainer-reel` skill: reference-style capture checklist (caption treatment, label pills, counters, progress bar, CTA ending), a reusable Remotion UI module (captions with keyword box, pill, counter, bar, clock, phone CTA) parametrised by palette, the voice → timestamps recipe (including the pin-generation-as-node fallback), the word-count assertion, the contact-sheet review step, and a publishing section that states up front that connector uploads need the file in the connector's storage and that the user's own app upload is the reliable default from a phone.

**Principle:** When a multi-step production workflow repeats within a single session, extract its reusable components at the second repetition, not the third, and record the environment's publishing constraints before promising automated delivery.

**Second instance (2026-10-23):** the user set a hard 45 s maximum (it is in their Instagram account name) after the three reels came out at 69.5 s, 53 s and 48.5 s. The Remotion project was gone with the old session, so they had to be shortened from the delivered .mp4 files: transcribe with word timestamps (faster-whisper; feed it ffmpeg-decoded f32 audio, because its PyAV call failed), drop whole sentences, and cut where three signals agree: a silence (silencedetect), the darkest frame of the scene fade (signalstats YAVG), and the frame where the burned-in caption switches. Cutting at the silence midpoint alone left 1–3 frames of the removed sentence's caption visible. The skill should carry the duration cap as a script-time limit (about 110–120 words at this voice), check the rendered duration before delivery, and keep this trim recipe as a fallback for when the source project is lost.

**Third confirmation (2026-10-23, Instagram):** the user asked to publish the three reels to Instagram. The Composio Instagram toolkit needs either a public `video_url` or a `video_file` s3key already in Composio storage, and a Business/Creator account connection. Neither path is reachable from the cloud container, so the app upload from the phone was again the working route. The skill should say this before offering to publish.

**Working publish route (2026-10-23):** nothing could move from the cloud container to the publisher. What worked: the user's own Drive held the source files. A connector workbench downloaded them, re-applied the recorded cut list with ffmpeg (run one at a time: three parallel 1080p encodes were OOM-killed) and checked each duration. It then staged each file to get a storage key, and created and published the reel from that key. The container needed about 1 to 2 minutes of processing, longer than the 60 s tool-call timeout, so polling had to run in short loops. The caption went out without hashtags because the tool's handling of `#` was unclear. Two more lessons for the skill. Keep the cut list (segment times) as the reproducible artefact, not the rendered file. And keep account identifiers out of notes pushed to a public repository: the classifier refused one such push.
