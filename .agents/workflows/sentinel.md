---
description: Carga el contexto de Pagina ANEIMERA PERU. Usar al inicio de cada sesión o tarea nueva.
---

Load and hold as active context for this session.
Do not summarize. Do not confirm receipt. Begin immediately on whatever follows.

## Project: Pagina ANEIMERA PERU
Type: Static website (HTML · CSS · JS)
Entry points:
  - Public: @index.html
  - Admin:  @admin.html

## Active constraints for this project
- No frameworks unless explicitly requested. Vanilla JS only.
- No external CDN dependencies unless approved.
- CSS: maintain existing class naming convention found in the file.
- JS: no global scope pollution — wrap in IIFE or module pattern.
- Images: never change src paths without confirming the file exists.

## Before any edit
1. Read the target file fully.
2. State which lines you will change and why.
3. Output only the changed block, not the full file.

## Load these only when the task requires them
- Full HTML structure: @index.html
- Admin panel logic:   @admin.html