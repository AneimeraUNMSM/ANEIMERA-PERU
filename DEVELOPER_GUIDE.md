# Guía para Desarrolladores — ANEIMERA PERÚ

**Audiencia:** Desarrolladores que necesitan mantener, expandir o debuggear el sitio.

---

## 🏗️ 1. Estructura del Proyecto

```
ANEIMERA_PERU/
├── index.html                    # Página principal
├── admin.html                    # Panel administrativo
├── manifest.json                 # PWA manifest
├── robots.txt                    # SEO robot directives
├── sitemap.xml                   # SEO sitemap
├── _headers                      # Netlify security headers
├── _redirects                    # Netlify redirects (opcional)
│
├── pages/                        # Páginas de contenido
│   ├── capitulo.html            # Capítulos nacionales
│   ├── directorio.html          # Directorio de miembros
│   ├── evento.html              # Detalle de evento
│   ├── noticia.html             # Detalle de noticia
│
├── assets/
│   ├── css/
│   │   └── shared-fonts.css     # @font-face centralizados (Inter, Material Symbols)
│   ├── fonts/
│   │   ├── Inter.woff2          # Font UI (variable, WOFF2)
│   │   └── MaterialSymbolsOutlined.woff2  # Font icons
│   └── images/
│       ├── index-blueprint.{jpg,webp,avif}
│       ├── membership-hero.{jpg,webp,avif}
│       └── admin-icon.svg
│
├── js/
│   ├── main.js                  # Service Worker registration + lazy loading
│   ├── app.mjs                  # Firebase SDK + app logic (ES module)
│   ├── rum.js                   # Real User Metrics collection
│   └── sw.js                    # Service Worker (precache + offline)
│
├── stitch_aneimera_per_website_template/  # Stitch templates (código fuente)
│   └── [múltiples carpetas con code.html]
│
├── tools/
│   ├── check_site.py            # Local validator (canonical, hreflang, CSP, etc.)
│   ├── convert_images.py        # Batch image conversion (JPG → WebP/AVIF)
│   └── converted_images_report.json
│
├── .github/
│   └── workflows/
│       ├── lighthouse.yml       # CI: Lighthouse audit
│       └── quality.yml          # CI: HTML/CSS/JSON validation + accessibility
│
├── .pre-commit-config.yaml      # Local pre-commit hooks
├── README_OPTIMIZATIONS.md      # Guía de optimizaciones (compacta)
├── DEPLOYMENT_CHECKLIST.md      # Checklist de despliegue
└── MONITORING_GUIDE.md          # Guía de monitoreo en producción
```

---

## 🚀 2. Configuración Local (Desarrollador)

### Requisitos previos
- Git
- Python 3.8+
- Editor: VS Code, WebStorm, Sublime Text, etc.
- Navegador: Chrome, Firefox (para DevTools)

### Setup inicial

```bash
# 1. Clonar repo
git clone https://github.com/[usuario]/ANEIMERA_PERU.git
cd ANEIMERA_PERU

# 2. Crear rama de trabajo
git checkout -b feature/mi-feature
# o
git checkout -b bugfix/mi-bug

# 3. Instalar pre-commit hooks (validación local)
pip install pre-commit
pre-commit install

# 4. Probar validador local
python tools/check_site.py
# Resultado esperado: "site checks passed"

# 5. Abrir proyecto en editor
code .  # VS Code
# o
pycharm .  # PyCharm
```

### Servidor local (para testing)

**Python (simple HTTP server):**
```bash
cd /ruta/a/ANEIMERA_PERU
python -m http.server 8000
# Abrir http://localhost:8000 en navegador
```

**Node.js (si prefieres):**
```bash
npx http-server
# Abrir http://localhost:8080 en navegador
```

**Live reload (opcional, vs-code extension):**
- Instalar: "Live Server" extension
- Click derecho en index.html → "Open with Live Server"
- Cambios en archivos se recargan automáticamente

---

## 📝 3. Estándares de Código

### HTML

**Template mínimo para nueva página:**
```html
<!DOCTYPE html>
<html lang="es-PE">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Descripción corta de la página (155 caracteres max)">
  
  <!-- Canonical (REQUERIDO) -->
  <link rel="canonical" href="https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html">
  
  <!-- Hreflang (para SEO multi-idioma) -->
  <link rel="alternate" hreflang="es-PE" href="https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html">
  <link rel="alternate" hreflang="x-default" href="https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html">
  
  <!-- Open Graph (REQUERIDO para redes sociales) -->
  <meta property="og:title" content="Mi Página">
  <meta property="og:description" content="Descripción para redes sociales">
  <meta property="og:image" content="https://aneimeraunmsm.github.io/ANEIMERA_PERU/assets/images/mi-imagen.webp">
  <meta property="og:url" content="https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mi Página">
  <meta name="twitter:description" content="Descripción para Twitter">
  <meta name="twitter:image" content="https://aneimeraunmsm.github.io/ANEIMERA_PERU/assets/images/mi-imagen.webp">
  
  <!-- Favicon -->
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#003366">
  
  <!-- Preload críticos -->
  <link rel="preload" href="/assets/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/MaterialSymbolsOutlined.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Fonts CSS (REQUERIDO) -->
  <link rel="stylesheet" href="/assets/css/shared-fonts.css">
  
  <!-- CSS local -->
  <link rel="stylesheet" href="/assets/css/styles.css">
  
  <!-- Schema.org JSON-LD (depende del tipo de página) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mi Página",
    "url": "https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html"
  }
  </script>
</head>
<body>
  <main>
    <!-- Contenido -->
  </main>
  
  <!-- RUM (REQUERIDO) -->
  <script src="/js/rum.js" defer></script>
  
  <!-- Scripts (defer = carga no-bloqueante) -->
  <script src="/js/main.js" defer></script>
  <script type="module" src="/js/app.mjs" defer></script>
  
  <!-- CDN con SRI (si es necesario) -->
  <script 
    src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.min.js"
    integrity="sha384-[HASH-AQUI]"
    crossorigin="anonymous"
    defer></script>
</body>
</html>
```

**Checklist para cada página nueva:**
- [ ] `<title>` único y descriptivo (50 caracteres max)
- [ ] `<meta name="description">` (155 caracteres max)
- [ ] `<link rel="canonical">` apuntando a URL final
- [ ] `<link rel="alternate" hreflang="es-PE">` + hreflang x-default
- [ ] Open Graph: og:title, og:description, og:image, og:url
- [ ] Schema.org JSON-LD (al menos WebPage o tipo específico)
- [ ] Preload de fuentes críticas
- [ ] `shared-fonts.css` importado
- [ ] RUM script inyectado
- [ ] SRI integrity en CDN libs
- [ ] `crossorigin="anonymous"` en recursos cross-origin

### CSS

**Variables y consistencia:**
```css
/* Usar variables CSS para mantenibilidad */
:root {
  /* Colores */
  --color-primary: #003366;
  --color-secondary: #00a8cc;
  --color-text: #333;
  --color-border: #ddd;
  
  /* Espaciado */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  
  /* Tipografía */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}

/* Evitar !important (salvo emergencias) */
/* Preferir selectores específicos sobre !important */

/* Mobile-first (min-width en media queries) */
@media (min-width: 768px) {
  /* Estilos para tablet y arriba */
}
```

**Accesibilidad:**
```css
/* Asegurar suficiente contraste */
body {
  color: #333;         /* Contraste >= 4.5:1 vs fondo */
  background: #fff;
}

/* Focus visible para teclado */
button:focus-visible {
  outline: 2px solid --color-primary;
  outline-offset: 2px;
}

/* Evitar text-align: justify (dificulta lectura) */
/* Usar line-height >= 1.5 para readabilidad */
body {
  line-height: 1.6;
}
```

### JavaScript

**Módulos ES6 (preferido):**
```javascript
// ✅ Correcto (ES module)
export function initChart(containerId) {
  // lógica
}

export async function fetchEvents() {
  return await fetch('/api/events').then(r => r.json());
}

// En HTML:
// <script type="module" src="/js/mi-modulo.mjs"></script>
```

**Evitar inline scripts (escándalo CSP):**
```html
<!-- ❌ Evitar esto (viola CSP) -->
<script>
  console.log('hola');
</script>

<!-- ✅ Correcto -->
<script src="/js/mi-script.js" defer></script>
```

**Lazy loading de imágenes:**
```html
<!-- ✅ Correcto -->
<img src="imagen.webp" alt="Descripción" loading="lazy" width="800" height="600">

<!-- main.js hace esto automáticamente si falta loading="lazy" -->
```

---

## 🔧 4. Tareas Comunes

### Agregar una nueva página

```bash
# 1. Crear archivo
touch pages/mi-pagina.html

# 2. Copiar template mínimo (ver sección 3, HTML)

# 3. Actualizar canonical y hreflang
# 4. Actualizar og:title, og:description, og:image
# 5. Actualizar Schema.org JSON-LD

# 6. Validar localmente
python tools/check_site.py

# 7. Si aplica, agregar a sitemap.xml
# Agregar entrada <url>:
```xml
<url>
  <loc>https://aneimeraunmsm.github.io/ANEIMERA_PERU/pages/mi-pagina.html</loc>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
  <lastmod>2024-01-15</lastmod>
</url>
```

### Agregar nueva imagen

```bash
# 1. Copiar JPG a assets/images/
cp mi-imagen.jpg assets/images/

# 2. Convertir a WebP y AVIF
python tools/convert_images.py

# 3. En HTML, usar picture element (fallback automático):
<picture>
  <source srcset="/assets/images/mi-imagen.avif" type="image/avif">
  <source srcset="/assets/images/mi-imagen.webp" type="image/webp">
  <img src="/assets/images/mi-imagen.jpg" alt="Descripción" width="800" height="600" loading="lazy">
</picture>

# 4. Verificar tamaños después de conversión
ls -lh assets/images/mi-imagen.*
# JPG original ~500KB → WebP ~150KB → AVIF ~80KB (típico)
```

### Actualizar fuentes

```bash
# 1. Si necesitas agregar nueva fuente (e.g., Roboto Mono):
# Descargar desde Google Fonts → download .woff2 file

# 2. Copiar a assets/fonts/
cp RobotoMono.woff2 assets/fonts/

# 3. Agregar @font-face a assets/css/shared-fonts.css:
@font-face {
  font-family: 'Roboto Mono';
  src: url('/assets/fonts/RobotoMono.woff2') format('woff2');
  font-display: swap;
}

# 4. Usar en CSS:
.monospace {
  font-family: 'Roboto Mono', monospace;
}

# 5. Validar y push
python tools/check_site.py
```

### Agregar dependencia CDN con SRI

```bash
# 1. Encontrar librería en jsDelivr:
# https://www.jsdelivr.com/

# 2. Copiar URL + versión exacta:
# https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js

# 3. Calcular SRI hash online:
# https://www.srihash.org/
# O usando Node.js:
# npm install -g sri-hash
# sri-hash https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js

# 4. Agregar a HTML con integrity + crossorigin:
<script 
  src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"
  integrity="sha384-[HASH-AQUI]"
  crossorigin="anonymous"
  defer></script>

# 5. Validar SRI en DevTools:
# F12 → Network → click en script → Response headers → check integrity
```

### Hacer cambios en Service Worker

```bash
# 1. Editar sw.js

# 2. Cambiar versión de precache (importante para invalidar cache):
# En sw.js línea ~5:
const CACHE_VERSION = 'v1.0.1'; // Incrementar

# 3. Agregar nuevos archivos a precacheList si es necesario

# 4. Probar localmente:
# - DevTools → Application → Service Workers
# - Deregistrar viejo SW
# - Hard refresh: Ctrl+Shift+R
# - Verificar nuevo SW activado

# 5. Push cambios
```

---

## 🐛 5. Debugging

### Service Worker no actualiza

```javascript
// En DevTools Console:
// 1. Verificar SW activo:
navigator.serviceWorker.getRegistrations().then(regs => console.log(regs));

// 2. Deregistrar:
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(r => r.unregister());
});

// 3. Hard refresh: Ctrl+Shift+R

// 4. Verificar nuevo SW en DevTools → Application → Service Workers
```

### Material Symbols no cargan

```javascript
// En DevTools Console:
// 1. Verificar que font está siendo referenciada:
const fontFace = document.fonts.entries().next();
console.log(fontFace.value); // Debe incluir MaterialSymbolsOutlined

// 2. Si vacío, verificar que shared-fonts.css está inyectado:
const link = document.querySelector('link[href*="shared-fonts"]');
console.log(link); // Debe existir

// 3. Si no existe, revisar HTML <head>:
// Debe tener: <link rel="stylesheet" href="/assets/css/shared-fonts.css">

// 4. Verificar que archivo existe:
fetch('/assets/css/shared-fonts.css')
  .then(r => r.status) // Debe ser 200
  .then(console.log)
```

### Imágenes no cargan

```javascript
// En DevTools Console:
// 1. Verificar ruta:
fetch('/assets/images/mi-imagen.jpg').then(r => console.log(r.status));
// Debe ser 200

// 2. Si 404, revisar ruta en HTML
// Debe ser: /assets/images/mi-imagen.jpg (no ../images/...)

// 3. Verificar archivo existe:
// Terminal: ls -la assets/images/mi-imagen.jpg
```

### RUM no recolecta datos

```javascript
// En DevTools Console:
// 1. Verificar que script está inyectado:
const rumScript = document.querySelector('script[src*="rum"]');
console.log(rumScript); // Debe existir

// 2. Verificar que RUM está activo:
console.log(window.aneimera_rum_active); // Debe ser true

// 3. Ver datos almacenados:
indexedDB.databases().then(dbs => {
  const db = indexedDB.open('aneimera_rum');
  db.onsuccess = (e) => {
    const store = e.target.result.transaction('measurements').objectStore('measurements');
    console.table(store.getAll().result);
  };
});
```

### CSP bloquea recurso

```javascript
// En DevTools Console:
// Ver error como: "Refused to load the script 'https://...' because it violates the Content Security Policy directive"

// Soluciones:
// 1. Agregar SRI hash (si está en CDN seguro)
// 2. Actualizar CSP en _headers para permitir origen
// 3. Mover script a local si es posible
```

---

## ✅ 6. Pre-commit Checklist

**Antes de hacer git commit:**

```bash
# 1. Ejecutar validador
python tools/check_site.py
# Si falla, corregir y reintent

# 2. Ver archivos modificados
git status

# 3. Agregar cambios
git add .

# 4. Pre-commit hooks se ejecutan automáticamente
# (trailing whitespace, end of file, YAML/JSON validators)
# Si falla, pre-commit intenta auto-fix
# Re-review cambios auto-fixed:
git diff

# 5. Si todo OK, commit
git commit -m "[tipo]: [descripción breve]"
# Tipos: feat, fix, docs, style, refactor, perf, test

# Ejemplos:
# git commit -m "feat: agregar página de testimonios"
# git commit -m "fix: corregir contraste en botón submit"
# git commit -m "docs: actualizar guía de desarrolladores"
```

---

## 📦 7. Performance Tips para Desarrolladores

### Antes de agregar una librería nueva

**Preguntas a hacer:**
1. ¿Es estrictamente necesaria o hay alternativa nativa?
   - e.g., ¿Realmente necesito jQuery? → Probablemente no en 2024
2. ¿Qué tamaño es? (`npm install --save` → package.json → size in bundlephobia)
   - Verde: < 10KB
   - Amarillo: 10-50KB
   - Rojo: > 50KB
3. ¿Tiene dependencias transitivas? (Check package.json → dependencies)
4. ¿Es mantenida activamente?

**Si es necesaria:**
- Usar CDN (jsDelivr) en vez de npm/bundler (sitio es estático)
- Pinear versión exacta (no `^` o `~`)
- Agregar SRI hash
- Testear LCP/performance después

### Optimización de imágenes

**Siempre usar picture element:**
```html
<picture>
  <source srcset="/assets/images/mi-imagen.avif" type="image/avif">
  <source srcset="/assets/images/mi-imagen.webp" type="image/webp">
  <img src="/assets/images/mi-imagen.jpg" alt="..." width="800" height="600" loading="lazy">
</picture>
```

**Siempre especificar width/height:**
- Evita Cumulative Layout Shift (CLS)
- Navegador puede pre-asignar espacio

**Siempre agregar alt text:**
- Accesibilidad
- SEO

### Lazy loading

```html
<!-- Native lazy loading (nativo en navegadores modernos) -->
<img src="..." loading="lazy">
<iframe src="..." loading="lazy"></iframe>

<!-- main.js automáticamente agrega loading="lazy" si falta -->
```

---

## 📚 8. Recursos Internos

- [README_OPTIMIZATIONS.md](README_OPTIMIZATIONS.md) — Guía técnica compacta
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) — Pre-producción
- [MONITORING_GUIDE.md](MONITORING_GUIDE.md) — Monitoreo en vivo
- `tools/check_site.py` — Validador local
- `tools/convert_images.py` — Conversor de imágenes
- `.github/workflows/` — CI/CD (GitHub Actions)

---

## 🤝 9. Flujo de Contribución

1. **Fork + Branch:**
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```

2. **Desarrollar + Validar:**
   ```bash
   python tools/check_site.py
   ```

3. **Commit:**
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```

4. **Push:**
   ```bash
   git push origin feat/nueva-funcionalidad
   ```

5. **Pull Request en GitHub:**
   - Describir cambios
   - Referenciar issue si aplica
   - Esperar revisión y CI/CD (Lighthouse, quality checks)

6. **Merge:**
   - Después de revisión + CI/CD ✅
   - Squash commits si es necesario
   - Delete rama

---

**Fin de la Guía de Desarrolladores. Happy coding! 🚀**
