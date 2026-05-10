---
description: genera tests sin overhead
---

Generate unit tests for the selected function or file.
Requirements:
- One test per behavior: happy path, each edge case, each error state.
- Test name format: should_[expected]_when_[condition]
- No mocking of the module under test.
- Framework: [tu framework — Vitest / Jest / pytest]
- No test file boilerplate if the file already exists — append only.