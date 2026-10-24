---
id: 4
title: "watch keeps its setup state and API key in ~/.config, so every ephemeral cloud session is a 'first run' that asks the setup questions again, and its key step offers pasting the key in chat"
status: open
type: open-source
skill: [watch]
proposes_skill: []
target_file: []
siblings_checked: "none: no skill-families.md registry; watch has no sibling skill that stores per-machine setup (yt-* and ig-* skills keep no engine or backend config). Key intake re-checked 2026-10-24: graphify SKILL.md line 165 says it needs no key and never asks for one, so it is the good reference, not a sibling to fix; no other installed skill collects a key"
area: "First run and setup (setup.py first_run flag, ~/.config/watch/.env) and the Gemini key step in SKILL.md (key intake options)"
date: 2026-10-23
session_context: "Fourth explainer reel for a creator who works from a phone in fresh cloud containers; watch was used to read a reference Instagram reel. Second session (2026-10-24): API-key audit of the same project, where watch's SKILL.md and config.py were read for key handling (watch was not run)"
parked_until:
resolved:
resolution:
reference:
commands_verified: "run: setup.py --json -> first_run true, setup_complete false, engine local, config_file /root/.config/watch/.env (fresh container, the skill had been used in earlier sessions of the same project). run 2026-10-24: test -e on /root/.config/watch/.env and /root/.config/watch -> both absent in a fresh container. run 2026-10-24: grep on watch/scripts -> config.py:114 reads GEMINI_API_KEY from os.environ before the .env file at config.py:117"
---

**Issue:** The skill decides "first run" from a config file under the home directory. In a cloud container that is rebuilt for every session, that file never survives, so `first_run` is true every time and the skill's instructions say to ask the engine, detail and transcription questions again. For a user on a phone this is three questions per session about the same choices. This session skipped the wizard, ran `--engine local --no-whisper`, and transcribed separately with faster-whisper on ffmpeg-decoded audio, which is what earlier sessions had also ended up doing.

**Suggested improvement:** In "First run and setup", allow the setup choice to come from a project-level file (for example a `.watch.env` or a line in the project instructions) checked into the repository, and say that in ephemeral environments the wizard should look there first and write its answers there, not only to `~/.config/watch/.env`. Also note that when no captions exist and no fallback is configured, a local faster-whisper pass is a working substitute.

**Principle:** A skill that remembers setup answers must store them where the user's environment actually persists; in ephemeral containers only the repository survives, so "first run" detection based on the home directory turns a one-time wizard into a per-session tax.

**Second instance (2026-10-24, API-key audit):** while checking a project with a public repository for stored API keys, `~/.config/watch/.env` and its folder were again absent in the fresh container (`test -e` on both), so a Gemini key written there by the key step would be lost at the end of the session, exactly like the engine choice. The key step in SKILL.md also lists "Paste it in chat" as an option, which conflicts with the cloud environment's own guidance never to ask the user to paste a token, key or password into the chat; on a project whose repository is public, a key that reaches a commit is exposed to everyone. `config.py` already reads `GEMINI_API_KEY` from the process environment before it looks at the `.env` file, so a safe route that survives the session exists and the skill never mentions it. graphify, by contrast, states that it needs no key and never asks for one (SKILL.md line 165).

**Added improvement:** in the key step, when the session is a cloud one (home directory rebuilt each time), offer the environment's secret setting (an environment variable named `GEMINI_API_KEY`, which a new session picks up) as the first option and drop the paste-in-chat option; keep the `.env` file route for machines that persist.

**Added principle:** a skill that needs a secret must first ask where the user's environment keeps secrets; it must not default to the chat or to a file in a directory that will not outlive the session.
