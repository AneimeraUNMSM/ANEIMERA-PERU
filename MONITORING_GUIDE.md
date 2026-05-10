# Guía de Monitoreo y Observabilidad — ANEIMERA PERÚ

**Propósito:** Entender qué está sucediendo en producción (rendimiento, errores, comportamiento de usuarios) sin dependencias externas.

---

## 📊 1. Real User Metrics (RUM) — Observabilidad Local

### ¿Qué es?
Sistema **sin dependencias externas** que recolecta métricas de rendimiento en el navegador del usuario y las almacena localmente.

### Ubicación del código
- **Script:** [js/rum.js](js/rum.js)
- **Inyectado en:** Todas las páginas HTML (index.html, admin.html, pages/*)

### Métricas recolectadas

| Métrica | Descripción | Rango Normal |
|---------|-------------|-------------|
| **FCP** (First Contentful Paint) | Tiempo para que aparezca el primer contenido | < 1.8s |
| **LCP** (Largest Contentful Paint) | Tiempo para que cargue el elemento más grande | < 2.5s |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual (cambios inesperados de layout) | < 0.1 |
| **DNSLookup** | Tiempo de resolución DNS | < 100ms |
| **TCP** | Tiempo de conexión TCP | < 500ms |
| **TTFB** (Time to First Byte) | Tiempo hasta recibir primer byte del servidor | < 600ms |
| **DomInteractive** | DOM completamente procesado | < 2s |
| **LoadComplete** | Carga total (load event fired) | < 3s |

### Cómo acceder a los datos

**1. En el navegador (página en vivo):**
```javascript
// Abrir DevTools: F12
// Ir a: Console tab
// Ver logs con "RUM:" prefix, e.g.:
// > RUM: Navigation Timing started
// > RUM: LCP: 1234ms
// > RUM: FCP: 789ms
// > RUM: CLS: 0.05
```

**2. En IndexedDB (almacenamiento persistente):**
```javascript
// DevTools: Application tab → IndexedDB → aneimera_rum
// Ver objetos guardados (cada visita crea un objeto)
// Cada objeto contiene: timestamp, url, fcp, lcp, cls, dns_lookup, tcp, ttfb, dom_interactive, load_complete
```

**3. Exportar datos (manualmente):**
```javascript
// En DevTools Console:
db = await indexedDB.databases();
// Si aneimera_rum existe, abrir con:
const request = indexedDB.open('aneimera_rum');
request.onsuccess = (e) => {
  const db = e.target.result;
  const store = db.transaction('measurements').objectStore('measurements');
  store.getAll().onsuccess = (r) => {
    console.table(r.target.result);
    // Copiar al portapapeles para análisis
  };
};
```

### Cómo enviar datos a servidor (opcional)

**Paso 1:** Crear endpoint en tu servidor:
```
POST /api/rum
Content-Type: application/json

{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "url": "https://aneimeraunmsm.github.io/ANEIMERA_PERU/",
  "fcp": 789,
  "lcp": 1234,
  "cls": 0.05,
  "dns_lookup": 45,
  "tcp": 150,
  "ttfb": 200,
  "dom_interactive": 1500,
  "load_complete": 2800
}
```

**Paso 2:** Habilitar envío en `js/rum.js`:
```javascript
// Línea ~75, cambiar:
const RUM_ENDPOINT = false; // Deshabilitado por defecto

// A:
const RUM_ENDPOINT = 'https://tu-servidor.com/api/rum'; // Tu endpoint
```

**Paso 3:** Validar en DevTools:
- Network tab → filter "rum"
- Ver POST request a tu endpoint
- Response: 200 OK

### Análisis de datos RUM

**¿Cuándo hay un problema?**

```
FCP > 1.8s   → CSS o JS bloqueante en <head>
LCP > 2.5s   → Imágenes grandes, sin preload, o servidor lento
CLS > 0.1    → Layout shifts inesperados (ads, images sin altura)
TTFB > 600ms → Servidor lento o red congestionada
```

**Acciones correctivas:**

| Problema | Causa | Solución |
|----------|-------|----------|
| FCP alto | CSS en <head> bloqueante | Mover CSS no-crítico a fin de `<head>` o `<body>` |
| LCP alto | Imágenes grandes sin preload | Agregar `<link rel="preload" as="image">` |
| TTFB alto | Servidor lento | Revisar con hosting provider (Netlify, etc.) |
| CLS alto | Imágenes/iframes sin height | Agregar `width` y `height` a todos los `<img>` |

---

## 🔍 2. GitHub Actions CI/CD — Auditoría Automatizada

### Workflows activos

#### A) Lighthouse Audit (`.github/workflows/lighthouse.yml`)

**Cuándo corre:** Cada push a rama `main` (configurable)

**Qué revisa:**
- Performance (velocidad de carga, optimización de recursos)
- Accessibility (WCAG, aria labels, contrast)
- Best Practices (HTTPS, no console errors, etc.)
- SEO (meta tags, mobile-friendly, etc.)
- PWA (manifest, service worker, offline support)

**Cómo ver resultados:**
1. Ir a GitHub → Tu repositorio → Actions tab
2. Click en "Lighthouse Audit" workflow más reciente
3. Click en job "lighthouse-audit"
4. Ver logs o descargar HTML report

**Interpretar puntuaciones:**
```
90-100: Excelente (no requiere acción)
80-89:  Bueno (optimizar si es posible)
50-79:  Moderado (requiere mejoras)
0-49:   Crítico (acción requerida)
```

**Acciones si puntaje < 80:**
1. Descargar reporte HTML
2. Revisar sección "Opportunities" (mejoras de alto impacto)
3. Implementar localmente
4. Push → Re-run workflow
5. Iterar hasta alcanzar ≥90

#### B) Quality Checks (`.github/workflows/quality.yml`)

**Cuándo corre:** Cada push

**Qué valida:**
- HTML5 sintaxis
- CSS sintaxis
- JSON válido
- Python scripts sin errores sintácticos
- Accesibilidad (axe checker)

**Cómo ver resultados:**
1. GitHub → Actions → "Quality Checks"
2. Click en workflow run
3. Ver logs

**Si falla:**
```bash
# Ejecutar localmente para debug:
python tools/check_site.py
# Revisar output y corregir errores
```

---

## 🛡️ 3. Security Headers Monitoring

### Headers configurados

Ver en DevTools:

1. **Network tab** → Click en request (index.html)
2. **Response Headers** → buscar:

```
Content-Security-Policy: default-src 'self'; script-src ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
Referrer-Policy: strict-origin-when-cross-origin
```

### Validar headers en producción
```bash
# Desde terminal:
curl -I https://aneimeraunmsm.github.io/ANEIMERA_PERU/

# Buscar headers mencionados arriba en output
```

### Monitorear brechas de seguridad

**Servicios gratuitos (opcionalmente):**
- [Observatory by Mozilla](https://observatory.mozilla.org/) — Escanea headers de seguridad
- [SSL Labs](https://www.ssllabs.com/ssltest/) — Valida certificado SSL/TLS

---

## 🔌 4. Service Worker Monitoring

### Estado del Service Worker

**En DevTools:**
1. F12 → Application tab → Service Workers
2. Ver:
   - ✅ Status: "activated and running"
   - 📝 Scope: https://aneimeraunmsm.github.io/ANEIMERA_PERU/
   - 🔄 Push notifications: Enabled/Disabled

### Precache monitoring

**Archivos en caché (preload):**
1. DevTools → Application → Cache Storage → open latest cache
2. Ver archivos listados:
   - index.html, admin.html, pages/*.html
   - assets/css/shared-fonts.css
   - assets/fonts/*.woff2
   - assets/images/*
   - js/main.js, app.mjs, rum.js, sw.js
   - manifest.json, favicon.svg

**Si faltan archivos:**
1. Verificar ruta en `sw.js` precacheList
2. Push cambios
3. Deregistrar viejo SW: DevTools → Application → Service Workers → Unregister
4. Hard refresh: Ctrl+Shift+R
5. Nuevo SW con precache actualizado

### Offline capability test

**Verificar que sitio funciona sin conexión:**
1. DevTools → Network tab → ☐ "Offline" checkbox
2. Recargar página (Ctrl+R)
3. [ ] Página carga desde cache
4. [ ] Fuentes, CSS, imágenes visibles
5. [ ] Interactividad presente (aunque sin backend)

**Si falla:**
- Revisar `sw.js` fetch handler
- Asegurar que precache incluye todos los assets críticos
- Push fix y re-test

---

## 📈 5. Performance Trending

### Crear dashboard manual (sin herramientas)

**Cada semana:**
```bash
# En terminal, guardar puntuación de Lighthouse:
curl https://api.github.com/repos/[USER]/[REPO]/actions/runs \
  | jq '.workflow_runs[0]' > lighthouse_$(date +%Y-%m-%d).json

# Repetir en futuras semanas para comparación
```

**Comparar semana a semana:**
```bash
# Revisar JSON files descargados:
cat lighthouse_2024-01-15.json | jq '.conclusion'  # pass/fail
cat lighthouse_2024-01-22.json | jq '.conclusion'
```

### Benchmarks esperados

**Objetivo (después de todos estos cambios):**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95
- PWA: ≥ 95

**Regresión aceptable:** -5 puntos en una métrica si se justifica (e.g., nueva funcionalidad)

---

## 🚨 6. Error Tracking (Sin Dependencia Externa)

### Método 1: DevTools Console (Local Testing)

```javascript
// En producción, console.error() se registra automáticamente
// Accesible en DevTools → Console
// Revisar errores rojos para detectar problemas
```

### Método 2: Service Worker Error Logging (En Producción)

El SW en `sw.js` captura errores de fetch:
```javascript
// sw.js línea ~40
.catch(err => {
  console.error('SW fetch failed:', err, event.request.url);
  // Aquí se podrían grabar en IndexedDB para análisis posterior
  return caches.match('/offline.html'); // Fallback offline
});
```

### Método 3: RUM con Error Tracking (Opcional)

En `js/rum.js`, agregar:
```javascript
// Capturar errores no manejados
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error);
  // Opcionalmente, enviar a servidor con RUM endpoint
});
```

### Revisar errores en producción

**Para usuarios reportando problemas:**
1. Pedirles que abran DevTools (F12)
2. Ir a Console tab
3. Captura de pantalla de errores rojos
4. Compartir output

---

## 📱 7. Mobile & Cross-Browser Testing

### Herramientas (gratuitas)

**Responsive Design Mode (DevTools):**
- F12 → Responsive Design Mode (Ctrl+Shift+M)
- Seleccionar dispositivos predefinidos
- Verificar: textos legibles, botones tappable, imágenes responsive

**Simulación de red lenta:**
- DevTools → Network tab → Throttling
- Seleccionar "Slow 3G" o "Fast 3G"
- Recargar página
- Verificar: LCP < 2.5s incluso con conexión lenta

**Testeo de compatibilidad:**
- [BrowserStack](https://www.browserstack.com/) (versión free)
- [LambdaTest](https://www.lambdatest.com/) (20 tests gratis/mes)

### Dispositivos críticos a probar

- [ ] iPhone 12 (Safari)
- [ ] Samsung Galaxy S21 (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop Firefox
- [ ] Desktop Edge

---

## 📋 8. Weekly Monitoring Checklist

**Cada lunes (o cadencia elegida):**

```markdown
- [ ] Ejecutar: python tools/check_site.py → "passed"
- [ ] Revisar GitHub Actions → Lighthouse latest run
- [ ] Nota punutación Performance, Accessibility, SEO
- [ ] Revisar RUM metrics (si endpoint está configurado)
- [ ] Test offline: DevTools → Offline → Recargar página → ✅ carga
- [ ] Verificar Service Worker status: "activated and running"
- [ ] Curl headers: curl -I https://aneimeraunmsm.github.io/ANEIMERA_PERU/ → Ver CSP, HSTS
- [ ] Revisar Console (F12) en página live → No errores rojos
- [ ] Test en móvil: Responsive Design Mode → Verificar textos, botones, imágenes
```

**Si algo falla:**
1. Documentar en issue de GitHub
2. Reproducir localmente
3. Implementar fix
4. Push → Re-run checks
5. Validar fix en producción

---

## 🔗 9. Recursos y Herramientas Complementarias

### Gratuitas

| Herramienta | Propósito | URL |
|------------|----------|-----|
| Google Lighthouse | Auditoría rendimiento | [lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpombljlkpstvnztVTNyZF) |
| WebAIM Contrast Checker | Validar contraste WCAG | [webaim.org](https://webaim.org/resources/contrastchecker/) |
| Mozilla Observatory | Security headers audit | [observatory.mozilla.org](https://observatory.mozilla.org/) |
| SSL Labs | SSL/TLS certificate check | [ssllabs.com](https://www.ssllabs.com/ssltest/) |
| Can I Use | Compatibilidad de navegadores | [caniuse.com](https://caniuse.com/) |

### Opcionales (De pago / Freemium)

| Herramienta | Costo | Beneficio |
|------------|--------|----------|
| Sentry | Freemium | Error tracking centralizado |
| Datadog | Freemium | Monitoring full-stack |
| New Relic | Freemium | APM y RUM centralizado |
| Cloudflare | Freemium → Pro | CDN, security, analytics |

---

## 📞 Contacto y Escalación

**Si algo falla y no puedes resolverlo:**

1. **Revisar documentación:**
   - [README_OPTIMIZATIONS.md](README_OPTIMIZATIONS.md)
   - [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

2. **Ejecutar validador local:**
   ```bash
   python tools/check_site.py
   ```

3. **Revisar GitHub Actions logs**

4. **Contactar al equipo técnico**

---

**Fin de la Guía de Monitoreo. ✅**
