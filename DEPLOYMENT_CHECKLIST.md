# Checklist de Despliegue — ANEIMERA PERÚ

**Estado:** ✅ Código listo para producción  
**Última actualización:** 2024  
**Responsable de despliegue:** [Tu nombre]

---

## 📋 Pre-Despliegue (Local)

### 1. Validación Local
```bash
# Ejecutar validador local (requiere Python 3.8+)
python tools/check_site.py
# Resultado esperado: "site checks passed"
```

**Checklist:**
- [ ] ✅ Todas las páginas tienen `<link rel="canonical">`
- [ ] ✅ Hreflang configurado (es-PE, x-default)
- [ ] ✅ Sin referencias a Google Fonts remotos
- [ ] ✅ Sin imágenes de hosts prohibidos (LH3, Wikimedia)
- [ ] ✅ Meta descriptions presentes en todas las páginas
- [ ] ✅ Open Graph (og:title, og:description, og:image)
- [ ] ✅ Schema.org JSON-LD (Organization, Event, Article)

### 2. Git y CI/CD
```bash
# Verificar que workflows están presentes
ls -la .github/workflows/
# Debe listar: lighthouse.yml, quality.yml

# Pre-commit setup (en repo Git local)
pre-commit install
pre-commit run --all-files
```

**Checklist:**
- [ ] `.github/workflows/lighthouse.yml` existe
- [ ] `.github/workflows/quality.yml` existe
- [ ] `.pre-commit-config.yaml` existe
- [ ] Todos los archivos pasan validación local

### 3. Assets y Optimizaciones
```bash
# Verificar imágenes optimizadas
ls -lah assets/images/
# Debe mostrar: *.jpg, *.webp, *.avif (pares)

# Verificar fuentes self-hosted
ls -lah assets/fonts/
# Debe mostrar: Inter.woff2, MaterialSymbolsOutlined.woff2

# Verificar scripts modernos
ls -lah js/
# Debe mostrar: main.js, app.mjs, rum.js, sw.js
```

**Checklist:**
- [ ] ✅ 2 imágenes JPG originales
- [ ] ✅ 2 imágenes WebP (optimizadas)
- [ ] ✅ 2 imágenes AVIF (ultra-comprimidas)
- [ ] ✅ 2 fuentes WOFF2 en `/assets/fonts/`
- [ ] ✅ Service Worker en `/sw.js`
- [ ] ✅ RUM collection en `/js/rum.js`

---

## 🚀 Despliegue en Netlify (Recomendado)

### 1. Configuración Inicial

**Pasos en Netlify Dashboard:**
1. [ ] Conectar repositorio GitHub
2. [ ] Seleccionar rama: `main` (o tu rama de producción)
3. [ ] Build command: (dejar vacío — sitio es estático)
4. [ ] Publish directory: `.` (raíz del repo)

### 2. Activar Headers de Seguridad

**En Netlify Dashboard → Site configuration → Headers:**

Copiar el contenido de `_headers` a la sección "Custom headers" o crear archivo `_headers` en la raíz (ya existe):

```
# Content Security Policy
/* 
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://firebaseio.com https://identitytoolkit.googleapis.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Checklist:**
- [ ] Content-Security-Policy configurada
- [ ] X-Frame-Options: DENY
- [ ] HSTS habilitado (31536000 segundos = 1 año)
- [ ] Permissions-Policy restrictiva

### 3. Configurar Redirects (Opcional)

Si necesitas rutas personalizadas, crea/actualiza `_redirects` en la raíz:

```
# Ejemplo: redirigir www a no-www
https://www.aneimeraunmsm.github.io/* https://aneimeraunmsm.github.io/:splat 301!

# SPA fallback (si usas router del lado del cliente)
/*  /index.html  200
```

**Checklist:**
- [ ] `_redirects` configurado (si aplica)
- [ ] Pruebas de redirección en navegador

### 4. Habilitar Compresión y HTTP/2

**En Netlify:** Estas características se activan automáticamente. Verificar:
- [ ] Netlify Dashboard → Deploy settings → HTTP/2 habilitado
- [ ] Compresión automática (Brotli/gzip)

---

## 🔒 Seguridad Post-Despliegue

### 1. Habilitar HTTPS Forzado
**En Netlify Dashboard → Site settings → Domain management:**
- [ ] "HTTPS" → "Force HTTPS" ✅

### 2. Configurar Certificado SSL
**Netlify proporciona certificados Let's Encrypt automáticamente:**
- [ ] Verificar que SSL está activo (icono 🔒 en navegador)
- [ ] Certificado válido por 1 año

### 3. Agregar Dominio Personalizado (Opcional)
**Si no usas GitHub Pages:**
1. Ir a Netlify Dashboard → Site settings → Domain management
2. [ ] Agregar dominio personalizado
3. [ ] Configurar DNS records (si es necesario)
4. [ ] Esperar propagación (5-48 horas)

---

## 📊 Monitoreo Post-Despliegue

### 1. Lighthouse CI

**El workflow `.github/workflows/lighthouse.yml` se ejecuta automáticamente en cada push:**

```bash
# Ver resultados en GitHub Actions
# Repositorio → Actions → Lighthouse Audit
```

**Métricas objetivo:**
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 95

**Acciones si alguna métrica < objetivo:**
1. Revisar "Opportunities" y "Diagnostics" en reporte HTML
2. Aplicar mejoras localmente
3. Push → GitHub Actions re-ejecuta audit
4. Iterar hasta alcanzar objetivos

### 2. Validación de Calidad Automatizada

**El workflow `.github/workflows/quality.yml` ejecuta:**
- Validación de HTML5
- Validación de CSS
- Validación de JSON
- Verificación de accesibilidad (axe)

**Ver resultados:**
```
GitHub → Actions → Quality Checks
```

**Si falla alguna validación:**
1. [ ] Revisar logs de GitHub Actions
2. [ ] Ejecutar localmente: `python tools/check_site.py`
3. [ ] Aplicar correcciones
4. [ ] Commitear y push

### 3. Real User Metrics (RUM)

**Datos recolectados en cada página (sin envío a externos):**
- Entrada de navegación (Navigation Timing API)
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- CLS (Cumulative Layout Shift)

**Cómo acceder (en navegador, sitio en producción):**
```javascript
// Abrir DevTools Console (F12 → Console)
// Ver logs: "RUM: Navigation Timing started", "RUM: Vitals collected"
// Datos almacenados en IndexedDB (Application → IndexedDB → aneimera_rum)
```

**Configurar envío a endpoint (opcional):**

En `js/rum.js`, línea ~80, cambiar:
```javascript
// De:
if (false) { // Deshabilitado por defecto
    console.log('RUM: Enviando a endpoint...');
}

// A:
if (true && 'aneimera_rum_endpoint' in window) {
    console.log('RUM: Enviando a endpoint...');
    fetch(window.aneimera_rum_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics)
    }).catch(e => console.warn('RUM POST failed:', e));
}
```

Luego en `index.html` (o página que lo requiera):
```html
<script>
window.aneimera_rum_endpoint = 'https://tu-servidor.com/api/rum';
</script>
<script src="/js/rum.js" defer></script>
```

### 4. Service Worker Offline Testing

**Verificar que el sitio funciona sin conexión:**

1. Abrir página en navegador
2. DevTools (F12) → Network tab → ☐ Offline
3. [ ] Página carga correctamente desde cache
4. [ ] Fuentes, CSS, imágenes se cargan del Service Worker
5. [ ] Formularios no envían (sin conexión) pero UI responde

**Si falla:**
1. Revisar `sw.js` precache list
2. Ejecutar: `python tools/check_site.py`
3. Hacer push para forzar Service Worker update

---

## 🔧 Mantenimiento Continuado

### Semanal
- [ ] Revisar logs de errores (si Sentry está configurado)
- [ ] Verificar Lighthouse CI results en GitHub Actions

### Mensual
- [ ] Revisar RUM metrics en IndexedDB
- [ ] Actualizar dependencias (si es necesario)
  ```bash
  # Verificar versiones de CDN en HTML
  grep -r "cdn.jsdelivr.net" *.html pages/
  ```

### Trimestral
- [ ] Auditoría de accesibilidad (manual + axe)
- [ ] Revisión de certificados SSL (Netlify gestiona automáticamente)
- [ ] Backup de base de datos (si aplica)

### Anual
- [ ] Revisión completa de seguridad
- [ ] Actualización de Schema.org/SEO metadata
- [ ] Optimización de imágenes (re-convertir si hay cambios)

---

## 🐛 Troubleshooting

### "Material Symbols aparecen como texto"
**Causa:** Font no cargó o CSS fallback no funcionó.
**Solución:**
```bash
# Verificar que assets/fonts/MaterialSymbolsOutlined.woff2 existe
ls -la assets/fonts/
# Verificar que CSS está inyectado
grep "material-symbols" assets/css/shared-fonts.css
```

### "Imágenes no cargan"
**Causa:** Ruta incorrecta o formato no soportado.
**Solución:**
```bash
# Verificar rutas en HTML
grep -r "assets/images" *.html pages/
# Verificar que archivos existen
ls -lah assets/images/
```

### "Service Worker no actualiza"
**Causa:** Caché viejo o versión de SW no cambió.
**Solución:**
1. DevTools (F12) → Application → Service Workers → Unregister
2. Hard refresh: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
3. Recargar página

### "CSP viola política"
**Causa:** Recurso está bloqueado por Content-Security-Policy.
**Solución:**
1. Revisar Console (F12) para error específico
2. Actualizar `_headers` CSP directiva
3. Hacer push a Netlify para reactivar headers

### "Canonical/hreflang no funciona"
**Causa:** Meta tags no están en `<head>`.
**Solución:**
```bash
python tools/check_site.py
# Ejecutar y revisar errores
```

---

## ✅ Checklist Final de Producción

**Antes de dar por completado el despliegue:**

- [ ] ✅ Sitio accesible en dominio de producción
- [ ] ✅ HTTPS forzado (icono 🔒 visible)
- [ ] ✅ Lighthouse ≥90 en todas las métricas (o plan de mejora documentado)
- [ ] ✅ Service Worker activo (DevTools → Application)
- [ ] ✅ RUM recolectando datos (DevTools → Console logs)
- [ ] ✅ Offline mode funciona (DevTools → Offline toggle)
- [ ] ✅ Security headers presentes (DevTools → Network → response headers)
- [ ] ✅ Canonical y hreflang correctos (DevTools → Elements)
- [ ] ✅ GitHub Actions workflows activos y pasando
- [ ] ✅ Pre-commit hooks configurados (local dev)
- [ ] ✅ Documentación de mantenimiento actualizada

---

## 📞 Soporte y Contacto

**Si encuentras problemas:**

1. **Revisar logs locales:**
   ```bash
   python tools/check_site.py
   ```

2. **Revisar GitHub Actions:**
   - Repositorio → Actions → Ver workflow fallido

3. **DevTools Console:**
   - F12 → Console tab → revisar errores rojos

4. **Contactar al equipo técnico:**
   - Email: [tu-email@aneimera.pe]
   - Slack/Teams: [tu-canal]

---

**Fin del Checklist. Despliegue exitoso = Producción lista. 🎉**
