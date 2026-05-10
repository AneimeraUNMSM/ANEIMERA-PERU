"""
Convert images under assets/ to WebP and AVIF (when supported), and generate HTML <picture> snippets.

Usage:
  python tools/convert_images.py --dry-run
  python tools/convert_images.py --quality 80

Notes:
- Requires Pillow. For AVIF output install 'pillow-avif-plugin' and libavif support.
- The script will write converted files next to originals (e.g. image.png -> image.webp, image.avif).
- It will optionally produce `tools/converted_images_report.json` and `tools/picture_snippets/` with HTML snippets.

This script is safe to run; if no images are present it exits silently.
"""
from __future__ import annotations
import os
import sys
import argparse
from pathlib import Path
import json

try:
    from PIL import Image
except Exception:
    Image = None

IMAGE_EXTS = ['.png', '.jpg', '.jpeg']
ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
OUT_REPORT = ROOT / 'tools' / 'converted_images_report.json'
SNIPPET_DIR = ROOT / 'tools' / 'picture_snippets'


def find_images():
    if not ASSETS.exists():
        return []
    imgs = []
    for p in ASSETS.rglob('*'):
        if p.suffix.lower() in IMAGE_EXTS:
            imgs.append(p)
    return imgs


def convert_image(p: Path, quality: int = 80, do_webp: bool = True, do_avif: bool = True, dry_run: bool = False):
    result = {'path': str(p.relative_to(ROOT)), 'converted': []}
    if Image is None:
        result['error'] = 'Pillow not installed'
        return result
    try:
        im = Image.open(p)
    except Exception as e:
        result['error'] = f'open-failed: {e}'
        return result

    if do_webp:
        out = p.with_suffix('.webp')
        if not out.exists() and not dry_run:
            try:
                im.save(out, 'WEBP', quality=quality, method=6)
                result['converted'].append(str(out.relative_to(ROOT)))
            except Exception as e:
                result.setdefault('errors', []).append(f'webp-failed:{e}')
        else:
            if out.exists():
                result['converted'].append(str(out.relative_to(ROOT)))
    if do_avif:
        out = p.with_suffix('.avif')
        if not out.exists() and not dry_run:
            try:
                im.save(out, 'AVIF', quality=quality)
                result['converted'].append(str(out.relative_to(ROOT)))
            except Exception as e:
                result.setdefault('errors', []).append(f'avif-failed:{e}')
        else:
            if out.exists():
                result['converted'].append(str(out.relative_to(ROOT)))
    return result


def generate_picture_snippet(original: Path):
    rel = original.relative_to(ROOT).as_posix()
    webp = original.with_suffix('.webp').relative_to(ROOT).as_posix()
    avif = original.with_suffix('.avif').relative_to(ROOT).as_posix()
    snippet = f"""
<picture>
  <source type=\"image/avif\" srcset=\"/{avif}\">\n  <source type=\"image/webp\" srcset=\"/{webp}\">\n  <img src=\"/{rel}\" loading=\"lazy\" decoding=\"async\" alt=\"\">\n</picture>
"""
    return snippet


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--quality', type=int, default=80)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    imgs = find_images()
    if not imgs:
        print('No se encontraron imágenes en assets/ para convertir.')
        return 0

    SNIPPET_DIR.mkdir(parents=True, exist_ok=True)
    report = []
    for img in imgs:
        print('Procesando', img)
        res = convert_image(img, quality=args.quality, dry_run=args.dry_run)
        report.append(res)
        # write snippet if converted or existing conversions
        snippet = generate_picture_snippet(img)
        outfile = SNIPPET_DIR / (img.stem + '.html')
        outfile.write_text(snippet, encoding='utf-8')

    OUT_REPORT.parent.mkdir(parents=True, exist_ok=True)
    OUT_REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    print('Reporte escrito en', OUT_REPORT)
    print('Snippets en', SNIPPET_DIR)
    return 0

if __name__ == '__main__':
    sys.exit(main())
