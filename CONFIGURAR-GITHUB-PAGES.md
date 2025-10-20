# 🚀 Configuración de GitHub Pages para /docs

## ✅ Paso 1: Verificar estructura del proyecto

Tu proyecto ahora está organizado así:

```
guia-estudio/
├── docs/                          ← PÚBLICO (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── script.min.js
│   └── assets/
│       ├── lenguajes.json
│       ├── images/
│       └── sounds/
│
├── scripts/                       ← NO publicado en web
│   ├── optimize_images.py
│   ├── extract_pdf.py
│   └── generate_questions.py
│
├── src/                           ← NO publicado en web
│   └── script.js
│
├── assets/
│   └── images/
│       └── originales/            ← NO publicado en web
│
└── *.md                           ← Visible en GitHub, NO en web
```

---

## 📋 Paso 2: Commit y Push de la nueva estructura

```powershell
# Agregar todos los cambios
git add .

# Crear commit
git commit -m "Reorganizar proyecto: /docs para público, /scripts para Python"

# Subir a GitHub
git push origin main
```

---

## ⚙️ Paso 3: Configurar GitHub Pages

1. **Ve a tu repositorio en GitHub:**
   ```
   https://github.com/EderVargas/guia-estudio
   ```

2. **Haz clic en "Settings" (Configuración)**

3. **En el menú lateral, haz clic en "Pages"**

4. **Configura la fuente:**
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/docs` ← ⚠️ MUY IMPORTANTE
   - Haz clic en **"Save"**

   ![Configuración](https://i.imgur.com/example.png)

5. **Espera 1-2 minutos** para que GitHub Pages procese los cambios

6. **Verifica tu sitio:**
   ```
   https://edervargas.github.io/guia-estudio/
   ```

---

## ✅ Verificación: ¿Qué se publica y qué no?

### ✅ Archivos PÚBLICOS (accesibles vía web):

```
https://edervargas.github.io/guia-estudio/
https://edervargas.github.io/guia-estudio/styles.css
https://edervargas.github.io/guia-estudio/script.min.js
https://edervargas.github.io/guia-estudio/assets/lenguajes.json
https://edervargas.github.io/guia-estudio/assets/images/imagen1.webp
```

### ❌ Archivos NO PÚBLICOS (404 en web):

```
https://edervargas.github.io/guia-estudio/scripts/optimize_images.py  → 404 ❌
https://edervargas.github.io/guia-estudio/src/script.js  → 404 ❌
https://edervargas.github.io/guia-estudio/AGENTS.md  → 404 ❌
https://edervargas.github.io/guia-estudio/assets/images/originales/  → 404 ❌
```

**Nota:** Estos archivos **SÍ están visibles en GitHub.com** (el repo), pero **NO en el sitio web**.

---

## 🛠️ Flujo de trabajo actualizado

### Para optimizar imágenes:

```powershell
# 1. Coloca imágenes en assets/images/originales/
# 2. Navega a la carpeta scripts/
cd scripts

# 3. Ejecuta el optimizador (ahora desde /scripts)
python optimize_images.py

# 4. Las imágenes se guardan automáticamente en docs/assets/images/
# 5. Listo para usar en el JSON
```

### Para actualizar el código JavaScript:

```powershell
# 1. Edita src/script.js (código fuente)

# 2. Minifica y guarda en docs/
npx terser src/script.js -o docs/script.min.js -c -m

# 3. Commit y push
git add .
git commit -m "Actualizar funcionalidad X"
git push
```

### Para agregar/modificar preguntas:

```powershell
# 1. Edita docs/assets/lenguajes.json

# 2. Commit y push
git add docs/assets/lenguajes.json
git commit -m "Agregar preguntas de categoría X"
git push
```

---

## 📊 Ventajas de esta estructura

| Antes | Ahora |
|-------|-------|
| Scripts Python accesibles vía web | ✅ Scripts en /scripts (NO publicados) |
| Código fuente JS expuesto | ✅ Código en /src (NO publicado) |
| Imágenes originales pesadas en web | ✅ Originales en /assets (NO publicados) |
| Markdown visible en web | ✅ MD en raíz (NO publicado en web) |
| Todo mezclado | ✅ Separación clara público/privado |

---

## 🔍 Solución de problemas

### El sitio muestra 404

**Causa:** GitHub Pages todavía está procesando

**Solución:** Espera 2-5 minutos y recarga la página

---

### Las imágenes no se cargan

**Causa:** Las rutas son relativas a `/docs`

**Solución:** Verifica que las imágenes estén en `docs/assets/images/`

---

### El script de optimización no funciona

**Causa:** Ahora debe ejecutarse desde `/scripts`

**Solución:**
```powershell
cd scripts
python optimize_images.py
```

---

### Los cambios no se reflejan en el sitio

**Causa:** No has hecho push o GitHub Pages no ha actualizado

**Solución:**
```powershell
git add .
git commit -m "Actualizar contenido"
git push

# Espera 1-2 minutos
```

---

## 📝 Notas importantes

1. **Solo /docs se publica en la web** - Todo lo demás está en el repo pero NO es accesible vía web

2. **El repo sigue siendo público** - Si quieres ocultar archivos completamente, necesitas un repo privado

3. **GitHub Pages tarda 1-2 minutos** - Los cambios no son instantáneos

4. **Las rutas son relativas** - Los archivos en docs/ usan rutas como `assets/lenguajes.json`

5. **Scripts Python desde /scripts** - Usa `cd scripts` antes de ejecutar optimize_images.py

---

## ✅ Checklist de configuración completada

- [ ] Estructura de carpetas creada (/docs, /scripts, /src)
- [ ] Archivos movidos a carpetas correctas
- [ ] .gitignore actualizado
- [ ] Commit y push realizados
- [ ] GitHub Pages configurado para /docs
- [ ] Sitio verificado en https://edervargas.github.io/guia-estudio/
- [ ] Scripts Python probados desde /scripts

---

**🎉 ¡Listo! Tu proyecto ahora está correctamente organizado y solo /docs se publica en GitHub Pages.**
