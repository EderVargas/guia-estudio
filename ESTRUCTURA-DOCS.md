# 📂 Configuración de Carpetas Públicas en GitHub Pages

## ✅ Opciones Disponibles en GitHub Pages

GitHub Pages permite elegir **qué carpeta publicar**. Hay 3 opciones oficiales:

### Opción 1: Publicar solo la carpeta `/docs` (Recomendada) ⭐

**Estructura del proyecto:**
```
guia-estudio/
├── docs/                    ← PÚBLICO (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── script.min.js
│   └── assets/
│       ├── images/
│       ├── lenguajes.json
│       └── sounds/
│
├── src/                     ← PRIVADO (no se publica)
│   ├── script.js (código fuente sin minificar)
│   └── questions.json
│
├── scripts/                 ← PRIVADO
│   ├── optimize_images.py
│   ├── extract_pdf.py
│   └── generate_questions.py
│
├── assets/images/originales/ ← PRIVADO
│
├── AGENTS.md               ← PRIVADO
├── SEGURIDAD-PAGES.md      ← PRIVADO
├── *.md                    ← PRIVADO
├── .venv/                  ← PRIVADO (.gitignore)
└── *.py                    ← PRIVADO
```

**Configuración en GitHub:**
1. Ve a: **Settings** → **Pages**
2. En "Build and deployment" → **Source**: `Deploy from a branch`
3. En "Branch": Selecciona `main` → **Carpeta**: `/docs`
4. Guarda

**Ventajas:**
- ✅ Solo `/docs` es público
- ✅ Todo lo demás permanece en el repo pero NO se publica
- ✅ Separación clara entre código fuente y producción
- ✅ Scripts Python y MD no son accesibles vía web

---

### Opción 2: Publicar solo la raíz `/` (Default actual)

**Estructura:**
```
guia-estudio/
├── index.html              ← PÚBLICO
├── styles.css              ← PÚBLICO
├── script.min.js           ← PÚBLICO
├── assets/                 ← PÚBLICO (todo dentro)
│
├── .venv/                  ← PRIVADO (.gitignore)
├── *.py                    ← PÚBLICO ⚠️ (visible en GitHub)
└── *.md                    ← PÚBLICO ⚠️ (visible en GitHub)
```

**Problema:**
- ⚠️ Los archivos `.py` y `.md` son **visibles en GitHub**
- ⚠️ Aunque no se sirven en el sitio web, están en el repositorio público

**Configuración:** (Actual)
- Settings → Pages → Branch: `main` → `/` (root)

---

### Opción 3: Rama separada `gh-pages`

**Estructura:**
```
Rama: main                  ← PRIVADO (desarrollo)
├── Todo tu código fuente
├── Scripts Python
├── Documentación MD
└── assets/images/originales/

Rama: gh-pages              ← PÚBLICO (solo producción)
├── index.html
├── styles.css
├── script.min.js
└── assets/
    ├── images/ (solo optimizadas)
    ├── lenguajes.json
    └── sounds/
```

**Configuración:**
1. Crear rama `gh-pages` solo con archivos públicos
2. Settings → Pages → Branch: `gh-pages` → `/` (root)

**Ventajas:**
- ✅ Separación completa desarrollo/producción
- ✅ Scripts Python nunca se publican

**Desventajas:**
- ⚠️ Requiere mantener 2 ramas sincronizadas
- ⚠️ Más complejo de gestionar

---

## 🎯 Solución Recomendada: Carpeta `/docs`

Esta es la **más simple y efectiva** para tu caso.

### Paso 1: Crear estructura de carpetas

```powershell
# Crear carpeta docs/
New-Item -ItemType Directory -Path "docs"
New-Item -ItemType Directory -Path "docs/assets"
New-Item -ItemType Directory -Path "docs/assets/images"
New-Item -ItemType Directory -Path "docs/assets/sounds"

# Crear carpeta scripts/ para Python
New-Item -ItemType Directory -Path "scripts"
```

### Paso 2: Mover archivos a carpetas correspondientes

**Archivos PÚBLICOS → `docs/`:**
- `index.html`
- `styles.css`
- `script.min.js` (solo minificado)
- `assets/lenguajes.json`
- `assets/images/` (solo optimizadas)
- `assets/sounds/`

**Archivos PRIVADOS → raíz o `/scripts`:**
- `script.js` → `src/script.js`
- `*.py` → `scripts/`
- `*.md` → raíz (documentación)
- `assets/images/originales/` → `assets/images/originales/`
- `.venv/` → `.gitignore`

### Paso 3: Actualizar rutas en el código

**En `docs/index.html`:**
```html
<!-- Antes -->
<script src="script.min.js"></script>

<!-- Después (sin cambios, ya está correcto) -->
<script src="script.min.js"></script>
```

**En `docs/script.min.js`:**
```javascript
// Las rutas relativas funcionan igual:
fetch('assets/lenguajes.json')  // ✅ Correcto
```

### Paso 4: Configurar GitHub Pages

1. Commit y push de la nueva estructura
2. GitHub → Settings → Pages
3. Source: `Deploy from a branch`
4. Branch: `main` → Carpeta: `/docs` → Save

**¡Listo!** Solo `/docs` será público en:
```
https://edervargas.github.io/guia-estudio/
```

---

## 📝 Actualizar `.gitignore`

Agrega esto para excluir archivos innecesarios:

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
*.egg-info/

# Archivos temporales
*.tmp
*.log
.DS_Store
Thumbs.db

# Imágenes originales (muy pesadas)
assets/images/originales/*.jpg
assets/images/originales/*.png
assets/images/originales/*.jpeg

# Scripts de desarrollo (si quieres que no se suban)
# scripts/*.py  # Descomenta si no quieres subir Python al repo

# Archivos de configuración local
.env
config.local.json

# Reportes generados
assets/images/_optimization_report.txt
```

---

## 🔍 Verificar qué se publica

**Archivos en `/docs` (públicos vía web):**
```
https://edervargas.github.io/guia-estudio/
https://edervargas.github.io/guia-estudio/styles.css
https://edervargas.github.io/guia-estudio/assets/lenguajes.json
```

**Archivos fuera de `/docs` (NO accesibles vía web):**
```
https://edervargas.github.io/guia-estudio/scripts/optimize_images.py  ❌ 404
https://edervargas.github.io/guia-estudio/AGENTS.md  ❌ 404
```

**Pero visibles en GitHub repo:**
```
https://github.com/EderVargas/guia-estudio/blob/main/scripts/optimize_images.py  ✅ Visible
https://github.com/EderVargas/guia-estudio/blob/main/AGENTS.md  ✅ Visible
```

---

## ⚠️ Importante

### ✅ Lo que `/docs` protege:
- Scripts Python NO serán accesibles vía web
- Archivos MD NO serán accesibles vía web
- Imágenes originales NO serán accesibles vía web

### ❌ Lo que `/docs` NO protege:
- El **repositorio GitHub sigue siendo público**
- Cualquiera puede ver el código en GitHub.com
- Si quieres ocultar archivos del repo, necesitas repo privado

---

## 🚀 Estructura Final Recomendada

```
guia-estudio/
│
├── docs/                          ← PÚBLICO (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── script.min.js
│   └── assets/
│       ├── lenguajes.json
│       ├── images/
│       │   ├── imagen1.webp
│       │   └── imagen2.webp
│       └── sounds/
│           ├── correct.mp3
│           └── confetti.mp3
│
├── src/                           ← CÓDIGO FUENTE (no publicado)
│   ├── script.js
│   └── styles.css
│
├── scripts/                       ← SCRIPTS PYTHON (no publicados)
│   ├── optimize_images.py
│   ├── extract_pdf.py
│   └── generate_questions.py
│
├── assets/
│   └── images/
│       └── originales/            ← ORIGINALES (no publicados)
│           └── README.md
│
├── AGENTS.md                      ← DOCUMENTACIÓN (visible en GitHub, no en web)
├── SEGURIDAD-PAGES.md
├── OPTIMIZAR-IMAGENES.md
├── README.md
├── image_config.json
├── .gitignore
└── .venv/                         ← IGNORADO (.gitignore)
```

---

## 📊 Comparativa de Opciones

| Característica | `/docs` | Raíz `/` | Rama `gh-pages` |
|----------------|---------|----------|-----------------|
| Fácil de configurar | ✅ | ✅ | ❌ |
| Scripts Python ocultos (web) | ✅ | ❌ | ✅ |
| Markdown oculto (web) | ✅ | ❌ | ✅ |
| Separación código/producción | ✅ | ❌ | ✅ |
| Un solo branch | ✅ | ✅ | ❌ |
| Recomendado para ti | ✅ | ❌ | ❌ |

---

## ✅ Siguiente Paso

**¿Quieres que reorganice el proyecto con la estructura `/docs`?**

Puedo:
1. Crear la carpeta `docs/` con la estructura correcta
2. Mover archivos públicos a `docs/`
3. Organizar scripts Python en `scripts/`
4. Actualizar rutas en el código
5. Crear `.gitignore` optimizado
6. Generar instrucciones para configurar GitHub Pages

**¿Procedo con la reorganización?** 🚀
