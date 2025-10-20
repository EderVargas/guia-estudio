# Carpeta de Imágenes Originales

## 📁 Propósito

Esta carpeta está destinada a almacenar las **imágenes originales** antes de ser optimizadas.

## 🔄 Flujo de trabajo

1. **Coloca aquí tus imágenes originales** (JPG, PNG, WebP)
2. **Ejecuta el script de optimización**: `python optimize_images.py`
3. **Las imágenes optimizadas se guardarán** en `assets/images/`
4. **Opcionalmente** puedes borrar las originales después de optimizar

## ✅ Formatos soportados

- **JPG/JPEG** - Fotos, imágenes con muchos colores
- **PNG** - Imágenes con transparencia, gráficos, capturas
- **WebP** - Formato moderno (se puede convertir desde JPG/PNG)

## 📝 Notas

- Las imágenes grandes serán redimensionadas automáticamente (máx. 600x400px)
- La calidad se optimiza para web manteniendo buena apariencia
- Se genera un reporte de optimización con estadísticas de reducción
