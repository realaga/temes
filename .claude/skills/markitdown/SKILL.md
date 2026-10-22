---
name: markitdown
description: Convert files (PDF, Word, Excel, PowerPoint, HTML, images, audio, CSV, JSON, ZIP, YouTube URLs) to Markdown with Microsoft's MarkItDown. Use when the user wants a document read, summarized or turned into Markdown/text.
---

# markitdown

Installed at session start by the SessionStart hook in `.claude/settings.json`.
If missing: `pip install 'markitdown[all]'`.

```bash
markitdown archivo.pdf              # prints Markdown
markitdown archivo.docx -o salida.md
```

Source: https://github.com/microsoft/markitdown
