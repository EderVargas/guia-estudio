"""
Script de Optimización de Imágenes para Cuestionarios
======================================================

Este script optimiza imágenes automáticamente para uso en web,
reduciendo el tamaño de archivo mientras mantiene buena calidad visual.

Características:
- Redimensiona imágenes grandes automáticamente
- Comprime con calidad configurable (70-95)
- Convierte a WebP para mejor compresión
- Preserva PNG transparentes si es necesario
- Genera reporte de optimización
- Procesa múltiples imágenes en lote

Autor: Sistema de Cuestionarios
Versión: 1.0
"""

from PIL import Image
import os
import sys
from pathlib import Path

# ========== CONFIGURACIÓN ==========
CONFIG = {
    # Carpetas (rutas desde la raíz del proyecto)
    'input_folder': '../assets/images/originales',
    'output_folder': '../docs/assets/images',
    
    # Calidad de compresión (1-100, recomendado: 70-85)
    'jpeg_quality': 80,
    'webp_quality': 85,
    'png_quality': 90,
    
    # Tamaño máximo (ancho en píxeles)
    'max_width': 600,
    'max_height': 400,
    
    # Opciones de conversión
    'convert_to_webp': True,  # Convertir JPG/PNG a WebP (mejor compresión)
    'keep_originals': True,   # Mantener formatos originales además de WebP
    'preserve_transparency': True,  # Preservar transparencia en PNG
    
    # Formato de nombres
    'add_suffix': False,  # Agregar sufijo -optimized a los archivos
}

# ========== FUNCIONES ==========

def get_file_size_kb(file_path):
    """Obtiene el tamaño de archivo en KB"""
    return os.path.getsize(file_path) / 1024

def resize_image(img, max_width, max_height):
    """Redimensiona imagen manteniendo proporción"""
    width, height = img.size
    
    # Calcular nuevo tamaño manteniendo proporción
    if width > max_width or height > max_height:
        ratio = min(max_width / width, max_height / height)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        
        # Usar LANCZOS para mejor calidad de redimensionamiento
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        print(f"  ↳ Redimensionado: {width}x{height} → {new_width}x{new_height}")
    
    return img

def optimize_image(input_path, output_folder, config):
    """Optimiza una imagen individual"""
    file_name = os.path.basename(input_path)
    name, ext = os.path.splitext(file_name)
    ext_lower = ext.lower()
    
    print(f"\nProcesando: {file_name}")
    
    # Obtener tamaño original
    original_size = get_file_size_kb(input_path)
    print(f"  Tamaño original: {original_size:.2f} KB")
    
    try:
        # Abrir imagen
        img = Image.open(input_path)
        
        # Convertir RGBA a RGB si es necesario (excepto PNG transparentes)
        has_transparency = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
        
        if has_transparency and config['preserve_transparency']:
            print(f"  Transparencia detectada, manteniendo formato PNG")
        elif img.mode in ('RGBA', 'LA'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Redimensionar si es necesario
        img = resize_image(img, config['max_width'], config['max_height'])
        
        results = {}
        
        # ===== Guardar en formato original optimizado =====
        if config['keep_originals'] or not config['convert_to_webp']:
            suffix = '-optimized' if config['add_suffix'] else ''
            
            if ext_lower in ['.jpg', '.jpeg']:
                output_path = os.path.join(output_folder, f"{name}{suffix}.jpg")
                img.save(output_path, 'JPEG', quality=config['jpeg_quality'], optimize=True)
                results['JPEG'] = get_file_size_kb(output_path)
                
            elif ext_lower == '.png':
                output_path = os.path.join(output_folder, f"{name}{suffix}.png")
                img.save(output_path, 'PNG', quality=config['png_quality'], optimize=True)
                results['PNG'] = get_file_size_kb(output_path)
        
        # ===== Convertir a WebP (mejor compresión) =====
        if config['convert_to_webp']:
            webp_path = os.path.join(output_folder, f"{name}.webp")
            
            if has_transparency and config['preserve_transparency']:
                # Guardar WebP con transparencia
                img_original = Image.open(input_path)
                img_original.save(webp_path, 'WEBP', quality=config['webp_quality'], method=6)
            else:
                img.save(webp_path, 'WEBP', quality=config['webp_quality'], method=6)
            
            results['WebP'] = get_file_size_kb(webp_path)
        
        # ===== Mostrar resultados =====
        for format_name, size in results.items():
            reduction = ((original_size - size) / original_size) * 100
            print(f"  OK {format_name}: {size:.2f} KB (reduccion: {reduction:.1f}%)")
        
        return {
            'file': file_name,
            'original_size': original_size,
            'results': results
        }
        
    except Exception as e:
        print(f"  ERROR: {str(e)}")
        return None

def generate_report(results, output_folder):
    """Genera reporte de optimización"""
    report_path = os.path.join(output_folder, '_optimization_report.txt')
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("=" * 60 + "\n")
        f.write("REPORTE DE OPTIMIZACIÓN DE IMÁGENES\n")
        f.write("=" * 60 + "\n\n")
        
        total_original = 0
        total_optimized = 0
        
        for result in results:
            if result:
                f.write(f"Archivo: {result['file']}\n")
                f.write(f"  Original: {result['original_size']:.2f} KB\n")
                
                total_original += result['original_size']
                
                for format_name, size in result['results'].items():
                    f.write(f"  {format_name}: {size:.2f} KB\n")
                    total_optimized += size
                
                f.write("\n")
        
        total_reduction = ((total_original - total_optimized) / total_original) * 100 if total_original > 0 else 0
        
        f.write("-" * 60 + "\n")
        f.write(f"TOTAL ORIGINAL: {total_original:.2f} KB\n")
        f.write(f"TOTAL OPTIMIZADO: {total_optimized:.2f} KB\n")
        f.write(f"REDUCCIÓN TOTAL: {total_reduction:.1f}%\n")
    
    print(f"\nReporte guardado en: {report_path}")

def main():
    """Función principal"""
    print("\n" + "=" * 60)
    print("OPTIMIZADOR DE IMAGENES PARA CUESTIONARIOS")
    print("=" * 60 + "\n")
    
    # Crear carpetas si no existen
    os.makedirs(CONFIG['input_folder'], exist_ok=True)
    os.makedirs(CONFIG['output_folder'], exist_ok=True)
    
    # Obtener lista de imágenes
    supported_formats = ('.jpg', '.jpeg', '.png', '.webp')
    image_files = [
        f for f in os.listdir(CONFIG['input_folder'])
        if f.lower().endswith(supported_formats)
    ]
    
    if not image_files:
        print(f"ERROR: No se encontraron imagenes en: {CONFIG['input_folder']}")
        print(f"\nColoca tus imagenes en la carpeta '{CONFIG['input_folder']}' y vuelve a ejecutar.")
        return
    
    print(f"Carpeta de entrada: {CONFIG['input_folder']}")
    print(f"Carpeta de salida: {CONFIG['output_folder']}")
    print(f"Imagenes encontradas: {len(image_files)}\n")
    
    # Procesar cada imagen
    results = []
    for i, file_name in enumerate(image_files, 1):
        print(f"[{i}/{len(image_files)}]", end=" ")
        input_path = os.path.join(CONFIG['input_folder'], file_name)
        result = optimize_image(input_path, CONFIG['output_folder'], CONFIG)
        results.append(result)
    
    # Generar reporte
    generate_report(results, CONFIG['output_folder'])
    
    print("\n" + "=" * 60)
    print("OPTIMIZACION COMPLETADA")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
