---
id: 3
title: "ig-* scoring tools (hookscore, caption.py, detect.py) are English-tuned and give misleading verdicts on Spanish drafts"
status: open
type: open-source
skill: [ig-caption, ig-human, ig-reel]
proposes_skill: []
target_file: []
siblings_checked: "instagram-agent family (13 ig-* skills, no skill-families.md registry): ig-caption, ig-human, ig-reel added because they ship the scoring scripts (caption.py, detect.py, hookscore.py/beats.py); ig-viral's swipe.py ranks numbers, not language, so excluded (assumed). yt-script/yt-viral by the same author likely share the pattern but were not run this session (assumed)"
area: "Bundled Python linters: ask detection, hashtag parsing, voice and hook scoring"
date: 2026-10-23
session_context: "Writing Spanish captions for three science reels on a Spanish-speaking creator's account, right after installing the instagram-agent-skill bundle"
parked_until:
resolved:
resolution:
reference:
commands_verified: "run: caption.py on three Spanish captions -> WARN ONE ASK on all three although line 1 is the ask (Envíaselo a ese amigo...), and #sueño parsed as #sue; run: detect.py -> VOICE 30/100 with 0.0 personal pronouns per 100 words on text full of tu/tus; run: hookscore.py -> 44 WEAK on a Spanish hook whose English equivalent the README shows at 85.6 STRONG"
---

**Issue:** The bundle's scripts carry English word lists and an ASCII-only hashtag regex. On Spanish drafts they report false WARNs and low scores: the caption ask goes undetected, `#sueño` gets truncated to `#sue`, the voice check sees zero pronouns or contractions in natural Spanish, and the hook scorer marks a strong Spanish hook WEAK. None of the skills say they only work in English, so the verdicts look authoritative.

**Suggested improvement:** In each scoring skill (the "Rules"/"The loop" sections of ig-caption, ig-human and ig-reel), state the language the heuristics cover, and tell the agent to skip a verdict, or report it as advisory, when the draft is in another language. Tools that care about language-neutral things (length, the 125-character cut, emoji density, hashtag count, links, invisible characters) still apply. Longer term, let the lexicons take a `--lang` argument, and use a Unicode-aware hashtag pattern (`#\w+` with re.UNICODE).

**Principle:** A heuristic linter that relies on word lists has a language even when it does not say so. Before trusting its verdict on a draft, check the draft is in that language. Otherwise keep the language-neutral checks and treat the rest as noise.

**Second instance (2026-10-24, caption for a 1:30 attention reel):** the same two false readings on a new Spanish caption. `caption.py` gave WARN ONE ASK although line 1 is the ask ("Dime en qué segundo te entraron ganas de pasarlo"), and `detect.py` scored VOICE 30 with "0.0 personal pronouns per 100 words" on a text that uses "yo", "tu" and "nos". Every other check passed (burstiness, specificity, slop and fingerprint all 100; first line, hashtags, links and search terms all PASS). Both verdicts were overridden out loud, as on the first occasion.
