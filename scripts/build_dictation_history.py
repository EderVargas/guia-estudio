"""
Genera inglesDictationAll.json combinando todas las versiones
históricas de inglesDictation.json desde git.

Estructura resultante:
{
  "categories": [
    { "id": "halloween-words", "name": "Halloween Words", "data": [...] },
    ...
  ]
}
"""
import subprocess
import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent


def parse_lenient(text):
    """Parsea JSON tolerando trailing commas."""
    text = re.sub(r',\s*([}\]])', r'\1', text)
    return json.loads(text)


def slugify(text):
    import re as _re
    slug = text.lower()
    slug = _re.sub(r'[^a-z0-9]+', '-', slug)  # reemplaza cualquier carácter no alfanumérico por -
    slug = slug.strip('-')
    return slug


def main():
    # Obtener todos los commits que tocaron el archivo, del más antiguo al más nuevo
    log = subprocess.check_output(
        ['git', 'log', '--oneline', '--reverse', '--', 'docs/assets/inglesDictation.json'],
        encoding='utf-8',
        cwd=PROJECT_ROOT
    )
    commits = [line.split()[0] for line in log.strip().splitlines()]
    print(f"Commits encontrados: {len(commits)}")

    result = {}   # category -> list of items
    order = []    # preserves insertion order of categories

    for commit in commits:
        out = subprocess.check_output(
            ['git', 'show', f'{commit}:docs/assets/inglesDictation.json'],
            encoding='utf-8',
            errors='replace',
            cwd=PROJECT_ROOT
        )
        data = parse_lenient(out)
        cat_in_commit = data['data'][0]['category'] if data['data'] else '?'
        print(f"  {commit}: '{cat_in_commit}' ({len(data['data'])} palabras)")

        for item in data['data']:
            cat = item['category']
            if cat not in result:
                result[cat] = []
                order.append(cat)
            # Evitar duplicados por correctAnswer
            existing_answers = [x['correctAnswer'] for x in result[cat]]
            if item['correctAnswer'] not in existing_answers:
                result[cat].append(dict(item))  # copia para no mutar

    # Construir estructura final
    categories = []
    for cat in order:
        items = result[cat]
        # Re-numerar ids desde 1
        for i, item in enumerate(items, 1):
            item['id'] = i
        categories.append({
            'id': slugify(cat),
            'name': cat,
            'data': items
        })

    final = {'categories': categories}
    out_path = PROJECT_ROOT / 'docs' / 'assets' / 'inglesDictationAll.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(final, f, ensure_ascii=False, indent=2)

    print(f"\nArchivo generado: {out_path}")
    print("\nResumen:")
    for c in categories:
        print(f"  {c['name']}: {len(c['data'])} palabras  (id: {c['id']})")


if __name__ == '__main__':
    main()
