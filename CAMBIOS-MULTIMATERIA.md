# Resumen de Cambios - Sistema Multi-materia

## ✅ Cambios Implementados

### 1. Estructura de Carpetas Reorganizada

**Antes:**
```
docs/assets/images/
├── 1.jpg, 2.jpg, 3.jpg...
└── todas las imágenes mezcladas
```

**Ahora:**
```
docs/assets/images/
├── matematicas/
│   ├── 1.jpg, 2.jpg, 3.jpg...
│   └── imágenes de matemáticas
└── lenguajes/
    └── imágenes de lenguajes (cuando se agreguen)

assets/images/originales/
├── matematicas/
│   └── imágenes originales de matemáticas
└── lenguajes/
    └── imágenes originales de lenguajes
```

### 2. Menú de Selección de Materia

- **Nuevo `index.html`**: Menú principal con tarjetas para seleccionar la materia
- **`quiz.html`**: La aplicación del cuestionario (antes era index.html)
- **Botón "Volver al Menú"**: En la parte superior de quiz.html

### 3. Sistema de Materias

El sistema ahora soporta múltiples materias con configuración independiente:

```javascript
const SUBJECTS = {
    'matematicas': {
        title: '🔢 Matemáticas',
        jsonFile: 'assets/matematicas.json',
        storagePrefix: 'math_'
    },
    'lenguajes': {
        title: '📚 Lenguajes',
        jsonFile: 'assets/lenguajes.json',
        storagePrefix: 'lang_'
    }
};
```

### 4. Progreso Independiente por Materia

Cada materia ahora tiene su propio progreso guardado en sessionStorage:
- `math_answeredQuestions` / `math_incorrectQuestions`
- `lang_answeredQuestions` / `lang_incorrectQuestions`

### 5. URLs con Parámetros

- **Matemáticas**: `quiz.html?subject=matematicas`
- **Lenguajes**: `quiz.html?subject=lenguajes`

### 6. Script de Optimización Actualizado

`optimize_images.py` ahora procesa carpetas por materia automáticamente:

```python
CONFIG = {
    'input_base': '../assets/images/originales',
    'output_base': '../docs/assets/images',
    'subjects': ['matematicas', 'lenguajes'],
    ...
}
```

## 🎯 Flujo de Uso

1. **Usuario entra a la app** → Ve el menú de selección (index.html)
2. **Selecciona una materia** → Matemáticas o Lenguajes
3. **Realiza el cuestionario** → quiz.html con la materia seleccionada
4. **Puede volver al menú** → Botón "← Volver al Menú"

## 📝 Archivos Modificados

### Nuevos:
- ✅ `docs/index.html` - Menú de selección de materias

### Modificados:
- ✅ `docs/quiz.html` - Renombrado desde index.html, agregado botón de regreso
- ✅ `src/script.js` - Lógica para detectar materia desde URL
- ✅ `docs/script.min.js` - Versión minificada actualizada
- ✅ `docs/assets/matematicas.json` - Rutas actualizadas a `assets/images/matematicas/`
- ✅ `scripts/optimize_images.py` - Soporte para múltiples materias

### Reorganizados:
- ✅ Todas las imágenes movidas a carpetas por materia

## 🚀 Próximos Pasos

### Para agregar más preguntas de matemáticas:
1. Coloca las imágenes en: `assets/images/originales/matematicas/`
2. Ejecuta: `python scripts/build.py optimize`
3. Actualiza `docs/assets/matematicas.json` con las nuevas preguntas

### Para agregar preguntas de lenguajes:
1. Coloca las imágenes en: `assets/images/originales/lenguajes/`
2. Ejecuta: `python scripts/build.py optimize`
3. Las imágenes se optimizarán en: `docs/assets/images/lenguajes/`
4. Actualiza `docs/assets/lenguajes.json` con rutas: `assets/images/lenguajes/imagen.jpg`

## ✨ Ventajas del Nuevo Sistema

1. **Organización clara**: Cada materia tiene sus propios recursos
2. **Escalabilidad**: Fácil agregar nuevas materias
3. **Progreso independiente**: No se mezclan los avances de diferentes materias
4. **Navegación intuitiva**: Menú claro para seleccionar la materia
5. **Mantenibilidad**: Código más modular y fácil de mantener

---

**Fecha de implementación**: 20 de octubre de 2025
**Versión**: 3.0 - Sistema Multi-materia
