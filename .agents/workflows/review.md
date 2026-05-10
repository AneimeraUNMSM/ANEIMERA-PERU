---
description: arquitectura sin código
---

Audit the selected code. Output a table with these columns:
[Issue | File:Line | Severity: CRITICAL/HIGH/MED/LOW | Fix in one line]

Criteria:
- SRP violations
- Tight coupling (direct import of concrete implementation)
- Missing error boundaries
- Type safety gaps
- Security misconfigurations
- O(n²) or worse complexity

No narrative. No fixes unless Severity = CRITICAL.
Cap output at 10 items, highest severity first.