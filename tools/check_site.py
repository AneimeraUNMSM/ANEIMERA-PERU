from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [ROOT / 'index.html', ROOT / 'admin.html', ROOT / 'pages' / 'capitulo.html', ROOT / 'pages' / 'noticia.html', ROOT / 'pages' / 'evento.html', ROOT / 'pages' / 'directorio.html']

FORBIDDEN_PATTERNS = [
    re.compile(r'fonts\.googleapis\.com', re.I),
    re.compile(r'fonts\.gstatic\.com', re.I),
    re.compile(r'lh3\.googleusercontent\.com', re.I),
    re.compile(r'upload\.wikimedia\.org', re.I),
]

REQUIRED_GLOBAL = [
    ('index.html', 'rel="canonical"'),
    ('index.html', 'hreflang="es-PE"'),
    ('index.html', 'hreflang="x-default"'),
]

errors: list[str] = []

for file in HTML_FILES:
    text = file.read_text(encoding='utf-8', errors='ignore')
    for pattern in FORBIDDEN_PATTERNS:
      if pattern.search(text):
        errors.append(f'{file.relative_to(ROOT)} still contains forbidden remote resource: {pattern.pattern}')

for filename, token in REQUIRED_GLOBAL:
    text = (ROOT / filename).read_text(encoding='utf-8', errors='ignore')
    if token not in text:
        errors.append(f'{filename} is missing required token: {token}')

if not (ROOT / 'assets' / 'css' / 'shared-fonts.css').exists():
    errors.append('assets/css/shared-fonts.css missing')

if not (ROOT / 'js' / 'rum.js').exists():
    errors.append('js/rum.js missing')

if errors:
    print('\n'.join(errors))
    sys.exit(1)

print('site checks passed')
