"""
Script auxiliar para desarrollo del proyecto Guía de Estudio
=============================================================

Este script facilita tareas comunes de desarrollo:
1. Minificar JavaScript
2. Optimizar imágenes
3. Verificar estructura de carpetas

Uso:
    python scripts/build.py [comando]

Comandos disponibles:
    minify      - Minifica src/script.js → docs/script.min.js
    optimize    - Optimiza imágenes (ejecuta optimize_images.py)
    check       - Verifica estructura de carpetas
    all         - Ejecuta minify + optimize

Autor: Sistema de Cuestionarios
"""

import os
import sys
import subprocess
from pathlib import Path

# Rutas del proyecto (desde /scripts)
PROJECT_ROOT = Path(__file__).parent.parent
SRC_DIR = PROJECT_ROOT / "src"
DOCS_DIR = PROJECT_ROOT / "docs"
SCRIPTS_DIR = PROJECT_ROOT / "scripts"

def minify_js():
    """Minifica JavaScript con Terser"""
    print("\nMinificando JavaScript...")
    
    src_file = SRC_DIR / "script.js"
    dest_file = DOCS_DIR / "script.min.js"
    
    if not src_file.exists():
        print(f"Error: No se encuentra {src_file}")
        return False

    try:
        cmd = f'npx terser "{src_file}" -o "{dest_file}" -c -m'
        result = subprocess.run(cmd, shell=True, cwd=PROJECT_ROOT, capture_output=True, encoding="utf-8")

        if result.returncode == 0:
            print(f"JavaScript minificado: {dest_file}")
            return True
        else:
            print(f"Error al minificar: {result.stderr}")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def optimize_images():
    """Ejecuta el script de optimización de imágenes"""
    print("\nOptimizando imágenes...")
    
    optimize_script = SCRIPTS_DIR / "optimize_images.py"
    
    if not optimize_script.exists():
        print(f"Error: No se encuentra {optimize_script}")
        return False
    
    try:
        # Ejecutar desde la carpeta scripts
        result = subprocess.run(
            [sys.executable, "optimize_images.py"],
            cwd=SCRIPTS_DIR,
            capture_output=True,
            encoding="utf-8",
            errors="replace"
        )

        print(result.stdout)

        if result.returncode == 0:
            return True
        else:
            print(f"Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def check_structure():
    """Verifica que la estructura de carpetas sea correcta"""
    print("\nVerificando estructura de carpetas...")
    
    required_dirs = [
        DOCS_DIR,
        DOCS_DIR / "assets",
        DOCS_DIR / "assets" / "images",
        DOCS_DIR / "assets" / "sounds",
        SRC_DIR,
        SCRIPTS_DIR,
        PROJECT_ROOT / "assets" / "images" / "originales"
    ]
    
    required_files = [
        DOCS_DIR / "index.html",
        DOCS_DIR / "styles.css",
        DOCS_DIR / "script.min.js",
        DOCS_DIR / "assets" / "lenguajes.json",
        SRC_DIR / "script.js"
    ]
    
    all_ok = True
    
    for directory in required_dirs:
        if directory.exists():
            print(f"OK: {directory.relative_to(PROJECT_ROOT)}")
        else:
            print(f"Falta: {directory.relative_to(PROJECT_ROOT)}")
            all_ok = False
    
    print()
    
    for file in required_files:
        if file.exists():
            print(f"OK: {file.relative_to(PROJECT_ROOT)}")
        else:
            print(f"Falta: {file.relative_to(PROJECT_ROOT)}")
            all_ok = False
    
    if all_ok:
        print("\nEstructura correcta")
    else:
        print("\nHay problemas en la estructura")
    
    return all_ok

def show_help():
    """Muestra ayuda de uso"""
    print(__doc__)

def main():
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    if command == "minify":
        minify_js()
    elif command == "optimize":
        optimize_images()
    elif command == "check":
        check_structure()
    elif command == "all":
        success = minify_js()
        if success:
            optimize_images()
    elif command in ["help", "-h", "--help"]:
        show_help()
    else:
        print(f"Comando desconocido: {command}")
        print("\nComandos disponibles: minify, optimize, check, all, help")

if __name__ == "__main__":
    main()
