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
- Usa Claude Code desde un iPhone. Desde el 2026-10-24 trabaja sobre todo en su PC (ver "La PC" abajo); la nube sigue disponible cuando la PC está apagada. Cuando haga falta una acción suya en GitHub, dale el enlace directo y los botones exactos que debe pulsar.
- Pull requests: cuando haya cambios subidos que deban llegar a la rama principal, créalos tú (sin esperar a que lo pida) contra la rama principal del repositorio. El usuario solo pulsa "Merge pull request" → "Confirm merge"; dale el enlace del pull request.
- En la nube las sesiones son temporales; en la PC los archivos se quedan. En los dos casos, lo que cambie en el repositorio (reglas, skills, notas) se sube a GitHub, que es su copia de seguridad.
- Recomendación acordada: trabajar con un solo repositorio por sesión. Este repositorio (`temes`) es su espacio personal para aprender y crear proyectos propios; empezó vacío.
- graphify sirve para mapear el código, no para recordar conversaciones. Cuando el repositorio tenga código, se puede generar el mapa con `/graphify .`.

## La PC

- Windows 11 (DESKTOP-52HRVO9), conectada con `claude remote-control`. Debe arrancar dentro de `C:\Users\xavie\temes`, porque solo ahí se cargan estas reglas y las skills. Tras reiniciar, hay que abrir PowerShell y escribir `cd C:\Users\xavie\temes` y luego `claude remote-control`.
- Instalado en modo usuario: Git, Node.js LTS (con fnm), Python 3.12, uv, FFmpeg, yt-dlp y GitHub CLI (`gh`, con su sesión iniciada; los pull requests se crean con `gh pr create`). Instala lo nuevo sin administrador (`winget ... --scope user`): nadie está delante para aceptar la ventana de permisos de Windows.
- Las sesiones de `remote-control` trabajan con comandos y no ven la pantalla. El control de pantalla (Computer use) está activado en la app Claude Desktop.
- Tiene poca RAM (7,4 GB a 2026-10-24; piensa ampliarla): renderiza un solo vídeo cada vez y con `--concurrency` bajo.

## task-observer

- Al empezar cada sesión, antes de la primera llamada a una herramienta, invoca la skill `task-observer` (`.claude/skills/task-observer/SKILL.md`).
- Espacio de trabajo fijo: la raíz de este repositorio (`C:\Users\xavie\temes` en la PC, `/home/user/temes` en la nube). El registro de observaciones vive en `skill-observations/` dentro de ella.
- Cuando se añadan o cambien observaciones, haz commit de `skill-observations/` y súbelo a GitHub antes de terminar, o se perderán.
- Permiso del usuario: los commits que solo tocan `skill-observations/` se suben **directamente a la rama principal** (`claude/install-graphify-gx4joa`), sin pull request. Haz el commit de las notas aparte, sin mezclarlo con otros cambios, para que la regla de pull requests siga aplicándose a todo lo demás. Antes de subir, trae la última versión de la rama principal (`git pull --rebase`).

## ponytail

- En cualquier tarea de código (escribir, arreglar, revisar), usa la skill `ponytail` (`.claude/skills/ponytail/SKILL.md`) en nivel `full`: la solución más simple que funcione, sin añadir cosas que nadie pidió.
- Ponytail solo cambia cómo escribo el código. Las explicaciones al usuario siguen las reglas de arriba: en español, sencillas y sin dar nada por sabido.

## claude-automation-recommender

- Skill oficial de Anthropic (plugin `claude-code-setup`), solo lectura: analiza el repositorio y recomienda hooks, skills, servidores MCP y subagentes. Úsala cuando el usuario pida recomendaciones para configurar Claude Code. Antes de instalar algo que recomiende, explica para qué sirve y si choca con lo ya instalado.

## Vídeos

- Los vídeos se hacen con Remotion y voz de ElevenLabs. En la PC, el `.mp4` terminado se guarda en `C:\Users\xavie\Videos\solo45segundos`, y el proyecto en `C:\Users\xavie\temes\videos\`. En la nube, el `.mp4` se entrega directamente en el chat para que lo guarde en su teléfono.
- Nada de los vídeos (ni el `.mp4`, ni la voz, ni el proyecto `videos/`) se sube al repositorio: es público. `videos/` está en `.gitignore`.
- Publicar en Instagram (cuenta `solo45segundos`, vía Composio): sigue `instagram/reels.md`, que tiene los pasos, los reels pendientes y sus textos.
- Duración máxima: **45 segundos**, contando el final con el "Sígueme". El nombre de su cuenta de Instagram lo promete ("45s"). Escribe el guion para que quepa (unas 110–120 palabras a la velocidad de la voz actual) y comprueba la duración del `.mp4` antes de entregarlo.
