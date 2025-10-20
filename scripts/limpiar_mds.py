import os

# Archivos .md que deben conservarse
md_keep = {'README.md', 'AGENTS.md', 'OPTIMIZAR-IMAGENES.md'}

# Carpeta raíz del proyecto
root = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(root)  # Subir un nivel

for fname in os.listdir(root):
    if fname.endswith('.md') and fname not in md_keep:
        try:
            os.remove(os.path.join(root, fname))
            print(f'Removido: {fname}')
        except Exception as e:
            print(f'Error al eliminar {fname}: {e}')
