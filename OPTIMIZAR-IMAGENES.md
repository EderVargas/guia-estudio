# 🖼️ Guía de Optimización de Imágenes

## 📋 Índice

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Uso Básico](#uso-básico)
4. [Configuración Avanzada](#configuración-avanzada)
5. [Ejemplos](#ejemplos)
6. [Recomendaciones](#recomendaciones)
7. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

Este sistema permite **optimizar automáticamente** las imágenes que usarás en tus cuestionarios, reduciendo el tamaño de archivo entre **50-80%** mientras mantienen excelente calidad visual.

### ✨ Características

- ✅ **Redimensionamiento automático** - Ajusta imágenes grandes al tamaño ideal para web (600x400px)
- ✅ **Compresión inteligente** - Reduce el tamaño sin pérdida visible de calidad
- ✅ **Conversión a WebP** - Formato moderno con mejor compresión que JPG/PNG
- ✅ **Preserva transparencia** - Mantiene fondos transparentes en PNG
- ✅ **Procesamiento en lote** - Optimiza múltiples imágenes de una vez
- ✅ **Reporte detallado** - Muestra el ahorro de espacio logrado

---

## Instalación

### Requisitos previos

- Python 3.7 o superior
- Librería Pillow (PIL)

### Instalar dependencias

**Opción 1: Con entorno virtual (recomendado)**

```powershell
# Ya tienes el entorno virtual creado, solo actívalo:
.\.venv\Scripts\Activate.ps1

# Pillow ya está instalado ✅
```

**Opción 2: Sin entorno virtual**

```powershell
pip install Pillow
```

---

## Uso Básico

### Paso 1: Coloca tus imágenes originales

Copia las imágenes que quieres optimizar en la carpeta:

```
assets/images/originales/
```

**Formatos aceptados:** `.jpg`, `.jpeg`, `.png`, `.webp`

### Paso 2: Ejecuta el script

```powershell
python optimize_images.py
```

### Paso 3: Obtén las imágenes optimizadas

Las imágenes optimizadas se guardarán en:

```
assets/images/
```

Y podrás ver un reporte en:

```
assets/images/_optimization_report.txt
```

---

## Configuración Avanzada

Puedes personalizar el comportamiento del script editando las variables en `optimize_images.py`:

```python
CONFIG = {
    # Carpetas
    'input_folder': 'assets/images/originales',
    'output_folder': 'assets/images',
    
    # Calidad de compresión (1-100)
    'jpeg_quality': 80,    # Calidad para JPG (70-95 recomendado)
    'webp_quality': 85,    # Calidad para WebP (80-95 recomendado)
    'png_quality': 90,     # Calidad para PNG (85-95 recomendado)
    
    # Tamaño máximo (píxeles)
    'max_width': 600,      # Ancho máximo
    'max_height': 400,     # Alto máximo
    
    # Opciones de conversión
    'convert_to_webp': True,       # Crear versión WebP
    'keep_originals': True,        # Mantener formato original también
    'preserve_transparency': True,  # Preservar transparencia en PNG
    
    # Formato de nombres
    'add_suffix': False,   # Agregar "-optimized" al nombre
}
```

### Presets de Calidad Recomendados

#### 📸 Para Fotografías (JPG)
```python
'jpeg_quality': 80,  # Balance óptimo calidad/tamaño
'webp_quality': 85,  # WebP puede usar mayor calidad con menos peso
```

#### 🎨 Para Gráficos/Capturas (PNG)
```python
'png_quality': 90,   # PNG necesita más calidad para evitar artefactos
'preserve_transparency': True,  # Mantener fondos transparentes
```

#### 🚀 Para Máxima Compresión
```python
'jpeg_quality': 70,
'webp_quality': 75,
'convert_to_webp': True,
'keep_originals': False,  # Solo WebP, máximo ahorro
```

#### 🎯 Para Máxima Calidad
```python
'jpeg_quality': 95,
'webp_quality': 95,
'png_quality': 95,
```

---

## Ejemplos

### Ejemplo 1: Optimización básica

```powershell
# 1. Coloca imágenes en assets/images/originales/
#    - foto1.jpg
#    - diagrama.png
#    - icono.webp

# 2. Ejecuta el script
python optimize_images.py
```

**Salida esperada:**
```
📸 Procesando: foto1.jpg
  📏 Tamaño original: 2500.00 KB
  ↳ Redimensionado: 1920x1080 → 600x338
  ✅ JPEG: 120.50 KB (reducción: 95.2%)
  ✅ WebP: 85.30 KB (reducción: 96.6%)

📸 Procesando: diagrama.png
  📏 Tamaño original: 800.00 KB
  🔲 Transparencia detectada, manteniendo formato PNG
  ✅ PNG: 250.00 KB (reducción: 68.8%)
  ✅ WebP: 180.00 KB (reducción: 77.5%)
```

### Ejemplo 2: Solo WebP, sin originales

```python
# Edita CONFIG en optimize_images.py:
CONFIG = {
    # ... otras opciones ...
    'convert_to_webp': True,
    'keep_originals': False,  # 👈 Solo WebP
}
```

```powershell
python optimize_images.py
```

Esto generará **solo archivos .webp**, maximizando el ahorro de espacio.

### Ejemplo 3: Usar imágenes en cuestionarios

Después de optimizar, actualiza tu `assets/lenguajes.json`:

```json
{
  "id": 5,
  "category": "Vocales",
  "question": "¿Cuál de estas letras es una vocal?",
  "image": "assets/images/vocales.webp",
  "answers": [
    { "option": "A", "correct": true },
    { "option": "B" },
    { "option": "C" },
    { "option": "D" }
  ]
}
```

---

## Recomendaciones

### 📐 Tamaños ideales para cuestionarios

- **Desktop/Tablet**: 500-600px de ancho
- **Móvil**: 250-300px de ancho (el CSS se encarga automáticamente)

**El script ya usa estos valores por defecto** ✅

### 🎨 Formatos recomendados según tipo

| Tipo de Imagen | Formato Recomendado | Por qué |
|----------------|---------------------|---------|
| Fotografías | WebP o JPG | Mejor compresión para imágenes con muchos colores |
| Gráficos/Diagramas | WebP o PNG | Líneas nítidas, colores planos |
| Íconos con transparencia | PNG o WebP | Fondo transparente |
| Capturas de pantalla | PNG o WebP | Texto legible |

### 📊 Comparativa de formatos

**Tamaño de archivo típico para la misma imagen:**

- PNG sin optimizar: **800 KB** ❌
- PNG optimizado: **250 KB** ⚠️
- JPG optimizado (80% calidad): **120 KB** ✅
- WebP optimizado (85% calidad): **85 KB** ✅✅

**Conclusión:** WebP es el formato más eficiente para web moderna.

### ⚡ Tips de rendimiento

1. **Prioriza WebP** - Tiene mejor compresión que JPG/PNG
2. **No subas imágenes enormes** - Redimensiona antes si son >2000px
3. **Evita PNG para fotos** - Usa JPG o WebP para fotografías
4. **Usa PNG solo si necesitas** - Transparencia, gráficos, texto

---

## Solución de Problemas

### ❌ Error: "No module named 'PIL'"

**Solución:**
```powershell
pip install Pillow
```

### ❌ Error: "No se encontraron imágenes"

**Solución:**
- Verifica que las imágenes estén en `assets/images/originales/`
- Verifica que tengan extensión `.jpg`, `.jpeg`, `.png` o `.webp`

### ❌ Las imágenes se ven pixeladas

**Solución:**
- Aumenta la calidad en CONFIG:
  ```python
  'jpeg_quality': 90,
  'webp_quality': 95,
  ```

### ❌ Las imágenes siguen siendo muy grandes

**Solución:**
- Reduce el tamaño máximo:
  ```python
  'max_width': 400,
  'max_height': 300,
  ```
- Desactiva `keep_originals`:
  ```python
  'keep_originals': False,
  ```

### ❌ Se pierde la transparencia en PNG

**Solución:**
- Verifica que esté activado:
  ```python
  'preserve_transparency': True,
  ```

---

## 📊 Reporte de Optimización

Después de ejecutar el script, se genera automáticamente un archivo:

```
assets/images/_optimization_report.txt
```

**Ejemplo de reporte:**

```
============================================================
REPORTE DE OPTIMIZACIÓN DE IMÁGENES
============================================================

Archivo: foto1.jpg
  Original: 2500.00 KB
  JPEG: 120.50 KB
  WebP: 85.30 KB

Archivo: diagrama.png
  Original: 800.00 KB
  PNG: 250.00 KB
  WebP: 180.00 KB

------------------------------------------------------------
TOTAL ORIGINAL: 3300.00 KB
TOTAL OPTIMIZADO: 635.80 KB
REDUCCIÓN TOTAL: 80.7%
------------------------------------------------------------
```

Este reporte te ayuda a:
- Ver el ahorro de espacio logrado
- Comparar formatos
- Decidir qué formato usar en tus cuestionarios

---

## 🎓 Buenas Prácticas

1. **Mantén copias de seguridad** - Guarda las imágenes originales en otro lugar
2. **Optimiza antes de subir a Git** - Evita repositorios pesados
3. **Prueba en diferentes dispositivos** - Verifica que se vean bien en móvil/tablet/desktop
4. **Usa nombres descriptivos** - `vocales.webp` en lugar de `img1.webp`
5. **Organiza por categorías** - Puedes crear subcarpetas en `assets/images/`

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica que Pillow esté instalado correctamente
2. Revisa los mensajes de error en la consola
3. Consulta la sección "Solución de Problemas"
4. Verifica que las rutas de carpetas sean correctas

---

**¡Listo! Ahora puedes optimizar imágenes fácilmente para tus cuestionarios.** 🎉
