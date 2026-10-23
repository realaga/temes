---
id: 4
title: "watch keeps its setup state in ~/.config, so every ephemeral cloud session is a 'first run' that asks the setup questions again"
status: open
type: open-source
skill: [watch]
proposes_skill: []
target_file: []
siblings_checked: "none: no skill-families.md registry; watch has no sibling skill that stores per-machine setup (yt-* and ig-* skills keep no engine or backend config)"
area: "First run and setup (setup.py first_run flag, ~/.config/watch/.env)"
date: 2026-10-23
session_context: "Fourth explainer reel for a creator who works from a phone in fresh cloud containers; watch was used to read a reference Instagram reel"
parked_until:
resolved:
resolution:
reference:
commands_verified: "run: setup.py --json -> first_run true, setup_complete false, engine local, config_file /root/.config/watch/.env (fresh container, the skill had been used in earlier sessions of the same project)"
---

**Issue:** The skill decides "first run" from a config file under the home directory. In a cloud container that is rebuilt for every session, that file never survives, so `first_run` is true every time and the skill's instructions say to ask the engine, detail and transcription questions again. For a user on a phone this is three questions per session about the same choices. This session skipped the wizard, ran `--engine local --no-whisper`, and transcribed separately with faster-whisper on ffmpeg-decoded audio, which is what earlier sessions had also ended up doing.

**Suggested improvement:** In "First run and setup", allow the setup choice to come from a project-level file (for example a `.watch.env` or a line in the project instructions) checked into the repository, and say that in ephemeral environments the wizard should look there first and write its answers there, not only to `~/.config/watch/.env`. Also note that when no captions exist and no fallback is configured, a local faster-whisper pass is a working substitute.

**Principle:** A skill that remembers setup answers must store them where the user's environment actually persists; in ephemeral containers only the repository survives, so "first run" detection based on the home directory turns a one-time wizard into a per-session tax.
