# Test de Flujo CMS — Instrucciones de Validación

**Fecha:** 11 de mayo de 2026  
**Credenciales de Prueba:**
- Email: `rodrigo.rubiop@unmsm.edu.pe`
- Contraseña: `Rr_020325`

---

## Flujo de Prueba Completo

### 1. Iniciar Sesión
1. Abre [admin.html](admin.html) en el navegador
2. Espera a que se cargue el formulario de login
3. Ingresa:
   - **Email:** `rodrigo.rubiop@unmsm.edu.pe`
   - **Contraseña:** `Rr_020325`
4. Haz clic en **INICIAR SESIÓN**
5. **Verificación:** Deberías ver el Panel de Control (dashboard) con estadísticas

### 2. Navegar a Contenido Estático
1. En el sidebar izquierdo, busca la opción **"Contenido Estático"**
2. Haz clic en ella
3. **Verificación:** La pantalla debe dividirse en 3 columnas:
   - **Izquierda:** Lista de secciones editables
   - **Centro:** Formulario de edición de campos
   - **Derecha:** Vista previa en vivo (iframe con index.html)

### 3. Probar Edición de Contenido (sin CMS Mode)
1. En la columna izquierda, selecciona la sección **"Hero · Home"**
2. En la columna central, verás campos como:
   - Eyebrow
   - Titular
   - Subtítulo
   - etc.
3. Modifica el campo **"Titular"** con un valor de prueba
4. **Verificación:**
   - El campo debería mostrar "✓ Guardado" (en verde) en la parte superior central
   - El contenido debería guardarse en localStorage

### 4. Probar Vista Previa en Vivo
1. Observa el iframe en la columna derecha
2. Cambia a la sección **"Métrica · Home"**
3. Modifica uno de los valores (ej: "12" → "99")
4. **Verificación:** El texto actualizado debe aparecer en el preview en tiempo real

### 5. Probar Edición Inline (CMS Mode)
1. En la barra superior del iframe (columna derecha), busca el toggle **"Edición Live"**
2. Haz clic para activarlo (el toggle debe volverse rojo)
3. **Verificación:** Los campos editables en el preview deben mostrar un contorno punteado

4. Haz clic en cualquier texto en el preview (debe mostrar contorno rojo)
5. Intenta editar el texto directamente
6. **Verificación:**
   - El texto en el preview debe ser editable
   - Los cambios deben sincronizarse con el formulario en la columna central
   - El indicador "✓ Guardado" debe aparecer

### 6. Probar Restauración de Contenido
1. Haz clic en el botón **"Restaurar Todo"** (botón rojo en la parte inferior izquierda)
2. Confirma en el diálogo
3. **Verificación:**
   - Todos los valores deben volver a sus defaults
   - El preview debe actualizarse

### 7. Probar Exportación de Contenido
1. Haz clic en el botón **"Exportar JSON"** (botón negro en la parte inferior izquierda)
2. **Verificación:**
   - Un archivo `aneimera-content.json` debería descargarse
   - Abre el archivo en un editor de texto
   - Verifica que contiene la estructura esperada con tu contenido editado

---

## Puntos Críticos a Verificar

✅ **Login:** Firebase authentication funciona  
✅ **Carga de secciones:** Lista de secciones aparece sin errores  
✅ **Edición de campos:** Los cambios se guardan en localStorage  
✅ **Vista previa en vivo:** El iframe sincroniza cambios sin demora  
✅ **Edición inline:** CMS Mode activa edición directa en el preview  
✅ **Persistencia:** Los cambios persisten al recargar la página  
✅ **Exportación:** JSON valido se descarga correctamente  

---

## Si Algo No Funciona

### Abre DevTools (F12) y revisa:
1. **Console tab:** ¿Hay errores de JavaScript?
2. **Network tab:** ¿Las peticiones a Firebase salen correctamente?
3. **Application tab:** ¿`localStorage.aneimera.content` contiene datos?

### Errores Comunes
| Error | Solución |
|-------|----------|
| "ERROR: content-section-list element not found!" | Recarga la página, verifica que estés en tab "Contenido Estático" |
| El preview no muestra cambios | Verifica que el iframe esté cargado (comprueba Network tab) |
| "Cannot read property 'contentWindow'" | El iframe puede no tener permiso cross-origin (verificar src) |
| Cambios no persisten | localStorage puede estar deshabilitado, revisa en DevTools |

---

## Resultado Esperado Final

✅ Contenido editado persiste en localStorage  
✅ Vista previa se sincroniza sin demoras  
✅ Edición inline funciona en ambas direcciones (admin → preview y preview → admin)  
✅ Exportación JSON es válida  
✅ Sin errores en DevTools console  

**Estado:** Listo para pasar a siguiente fase de producción 🚀
