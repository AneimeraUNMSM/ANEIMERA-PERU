Resumen de optimizaciones aplicadas y comandos útiles

1) Fuentes
- Inter y Material Symbols ahora están self-hosted en `assets/fonts/Inter.woff2` y `assets/fonts/MaterialSymbolsOutlined.woff2`.
- Se añadió `preload` en el `head` para acelerar carga de fuentes.
- `font-display: swap` para Inter y `font-display: block` para Material Symbols (iconos) fueron establecidos para mejorar UX.

2) Service Worker
- `sw.js` implementa precache resiliente y cache-first para fuentes.
- Se registra automáticamente en `index.html`.

3) Imágenes
- He añadido `tools/convert_images.py` para convertir PNG/JPEG locales a WebP y AVIF y generar snippets `<picture>`.
- Ejecución recomendada (desde la raíz del repo):

```bash
python -m pip install --upgrade pip
pip install pillow
# Para AVIF (opcional, requiere libavif y pillow-avif-plugin):
# pip install pillow-avif-plugin
python tools/convert_images.py --quality 80
```

- Si no hay imágenes locales en `assets/` el script no hará nada; crea `tools/converted_images_report.json` y `tools/picture_snippets/` con ejemplos.

4) Lighthouse y pruebas
- Ejecuta Lighthouse desde Chrome (recomendado) o con la CLI:

```bash
# Requiere Node.js
npx http-server -c-1 . -p 8080
# En otra terminal
npx lighthouse http://localhost:8080/index.html --output html --output-path report.html --preset=desktop
```

- Revisa en DevTools: Network (filtra por "font"), Console (CSP/errores), y aplicar "Disable cache" + reload para simular primer load.

5) Siguientes mejoras pendientes (opcional)
- Reprocesar imágenes grandes a WebP/AVIF y reemplazar `<img>` por `<picture>` usando los snippets generados.
- Incluir Critical CSS en línea más agresivo (extraer con `critical` o manualmente) si se desea mejorar LCP.
- Añadir optimizaciones de cache-Control en el servidor para fonts e imágenes.

---
Si quieres que ejecute el script ahora sobre tus imágenes locales, ya está disponible; el script intentará convertir cualquier PNG/JPEG dentro de `assets/`.
