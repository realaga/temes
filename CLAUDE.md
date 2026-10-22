## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## Sobre el usuario y cómo trabajar con él

- Responde siempre en español.
- El usuario está aprendiendo a usar Claude Code y Git/GitHub: explica los conceptos con palabras sencillas (qué es una rama, un pull request, un merge…) y sin dar por hecho conocimientos previos.
- Usa Claude Code desde un iPhone, en sesiones en la nube. Cuando haga falta una acción suya en GitHub, dale el enlace directo y los botones exactos que debe pulsar.
- Pull requests: cuando haya cambios subidos que deban llegar a la rama principal, créalos tú (sin esperar a que lo pida) contra la rama principal del repositorio. El usuario solo pulsa "Merge pull request" → "Confirm merge"; dale el enlace del pull request.
- Las sesiones son temporales: todo lo que deba conservarse hay que subirlo a GitHub.
- Recomendación acordada: trabajar con un solo repositorio por sesión. Este repositorio (`temes`) es su espacio personal para aprender y crear proyectos propios; empezó vacío.
- graphify sirve para mapear el código, no para recordar conversaciones. Cuando el repositorio tenga código, se puede generar el mapa con `/graphify .`.

## task-observer

- Al empezar cada sesión, antes de la primera llamada a una herramienta, invoca la skill `task-observer` (`.claude/skills/task-observer/SKILL.md`).
- Espacio de trabajo fijo: `/home/user/temes` (la raíz de este repositorio). El registro de observaciones vive en `/home/user/temes/skill-observations/`.
- Las sesiones en la nube son temporales: cuando se añadan o cambien observaciones, haz commit de `skill-observations/` y súbelo a GitHub antes de terminar, o se perderán.
- Permiso del usuario: los commits que solo tocan `skill-observations/` se suben **directamente a la rama principal** (`claude/install-graphify-gx4joa`), sin pull request. Haz el commit de las notas aparte, sin mezclarlo con otros cambios, para que la regla de pull requests siga aplicándose a todo lo demás. Antes de subir, trae la última versión de la rama principal (`git pull --rebase`).
