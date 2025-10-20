# 🧪 Test Rápido del Optimizador de Imágenes

Este documento te guía en una prueba rápida del sistema de optimización.

## ✅ Pre-requisitos

Verifica que tengas Pillow instalado:

```powershell
# Activa el entorno virtual
.\.venv\Scripts\Activate.ps1

# Verifica que Pillow esté instalado
python -c "import PIL; print('Pillow versión:', PIL.__version__)"
```

Si ves la versión de Pillow, estás listo ✅

## 🚀 Prueba Rápida (sin imágenes)

Puedes ejecutar el script sin imágenes para ver cómo funciona:

```powershell
python optimize_images.py
```

**Salida esperada:**
```
============================================================
🖼️  OPTIMIZADOR DE IMÁGENES PARA CUESTIONARIOS
============================================================

📁 Carpeta de entrada: assets/images/originales
📁 Carpeta de salida: assets/images
❌ No se encontraron imágenes en: assets/images/originales

💡 Coloca tus imágenes en la carpeta 'assets/images/originales' y vuelve a ejecutar.
```

## 📸 Prueba con Imagen Real

### Opción 1: Descargar imagen de prueba

Descarga una imagen de ejemplo de internet y guárdala en:

```
assets/images/originales/prueba.jpg
```

### Opción 2: Copiar captura de pantalla

Toma una captura de pantalla y guárdala como:

```
assets/images/originales/captura.png
```

### Ejecutar optimización

```powershell
python optimize_images.py
```

**Salida esperada con imagen:**
```
============================================================
🖼️  OPTIMIZADOR DE IMÁGENES PARA CUESTIONARIOS
============================================================

📁 Carpeta de entrada: assets/images/originales
📁 Carpeta de salida: assets/images
🖼️  Imágenes encontradas: 1

[1/1] 📸 Procesando: prueba.jpg
  📏 Tamaño original: 1250.00 KB
  ↳ Redimensionado: 1920x1080 → 600x338
  ✅ JPEG: 95.30 KB (reducción: 92.4%)
  ✅ WebP: 68.20 KB (reducción: 94.5%)

📄 Reporte guardado en: assets/images/_optimization_report.txt

============================================================
✅ OPTIMIZACIÓN COMPLETADA
============================================================
```

## 📊 Verificar Resultados

1. **Ver archivos generados:**
   ```powershell
   dir assets\images\
   ```

   Deberías ver:
   - `prueba.jpg` (optimizado)
   - `prueba.webp` (WebP)
   - `_optimization_report.txt` (reporte)

2. **Leer el reporte:**
   ```powershell
   type assets\images\_optimization_report.txt
   ```

3. **Ver tamaños de archivo:**
   ```powershell
   dir assets\images\*.jpg, assets\images\*.webp
   ```

## 🎯 Probar Diferentes Presets

### Preset: Máxima Calidad

Edita `optimize_images.py`, busca la sección CONFIG y cambia:

```python
'jpeg_quality': 95,
'webp_quality': 95,
```

Ejecuta de nuevo:
```powershell
python optimize_images.py
```

### Preset: Máxima Compresión

```python
'jpeg_quality': 70,
'webp_quality': 75,
'convert_to_webp': True,
'keep_originals': False,  # Solo WebP
```

### Preset: Solo WebP

```python
'convert_to_webp': True,
'keep_originals': False,
```

## 🔍 Comparar Visualmente

Abre las imágenes en tu navegador para compararlas:

1. Imagen original: `assets/images/originales/prueba.jpg`
2. Imagen optimizada JPG: `assets/images/prueba.jpg`
3. Imagen optimizada WebP: `assets/images/prueba.webp`

**Pregunta:** ¿Notas diferencia visual significativa? 

**Respuesta esperada:** No, la calidad visual debe ser muy similar con archivos mucho más pequeños.

## ✅ Checklist de Pruebas

- [ ] Script ejecuta sin errores
- [ ] Se crean carpetas automáticamente
- [ ] Se redimensionan imágenes grandes
- [ ] Se generan formatos JPG y WebP
- [ ] Se crea reporte de optimización
- [ ] Reducción de tamaño > 50%
- [ ] Calidad visual aceptable
- [ ] Transparencia preservada en PNG (si aplica)

## 🎓 Próximos Pasos

Una vez que confirmes que funciona:

1. **Borra las imágenes de prueba:**
   ```powershell
   del assets\images\originales\prueba.jpg
   del assets\images\prueba.jpg
   del assets\images\prueba.webp
   del assets\images\_optimization_report.txt
   ```

2. **Coloca tus imágenes reales** para los cuestionarios

3. **Optimiza en lote** todas tus imágenes

4. **Usa las rutas en tu JSON:**
   ```json
   {
     "id": 1,
     "question": "...",
     "image": "assets/images/mi-imagen.webp",
     "answers": [...]
   }
   ```

## 🐛 Troubleshooting Común

### Error: "No module named 'PIL'"

**Solución:**
```powershell
pip install Pillow
```

### Las carpetas no se crean

**Solución:** El script las crea automáticamente, pero verifica que tengas permisos de escritura en la carpeta del proyecto.

### Las imágenes no se procesan

**Verificar formato:** Solo se procesan `.jpg`, `.jpeg`, `.png`, `.webp`

### Calidad muy baja

**Ajustar CONFIG:**
```python
'jpeg_quality': 90,  # Aumentar calidad
```

---

**¡Listo! Ahora tienes un sistema completo de optimización de imágenes.** 🎉
