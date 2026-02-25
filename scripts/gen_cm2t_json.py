"""
Conversor de guias de estudio (.txt) a JSON para el sistema de cuestionarios.

Uso:
    python scripts/gen_cm2t_json.py <archivo.txt> <nombre_materia>

Ejemplos:
    python scripts/gen_cm2t_json.py assets/GuiaExamenConocimientoDelMedioSegundoTrimestre.txt conocimientoMedio2doTrimestre
    python scripts/gen_cm2t_json.py assets/GuiaExamenSegundoTrimestreCivicaYEtica.txt formacionCivicaEtica2doTrimestre

El archivo de salida se guarda en docs/assets/<nombre_materia>.json
Las imagenes se referenciaran como assets/images/<nombre_materia>/<imagen>

Formato esperado del .txt:
    Id:1
    Materia: ...
    Categoria: ...
    Pregunta: ...
    Imagen: 1.jpg          (opcional)
    Opcion 1: Texto _correcta
    Opcion 2: Texto
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent


def parse_txt(txt_path: Path, img_base: str) -> list:
    text = txt_path.read_text(encoding='utf-8')
    blocks = re.split(r'\n(?=Id:\d)', text.strip())

    questions = []

    for block in blocks:
        lines = [l.strip() for l in block.splitlines() if l.strip()]

        id_match = re.match(r'Id:(\d+)', lines[0])
        if not id_match:
            continue
        qid = int(id_match.group(1))

        def get_field(key):
            for l in lines:
                if l.lower().startswith(key.lower() + ':'):
                    return l[len(key)+1:].strip()
            return None

        categoria = get_field('Categoria') or get_field('Categoría') or ''
        categoria = re.sub(r'\.$', '', categoria).strip()
        pregunta  = get_field('Pregunta') or ''
        imagen    = get_field('Imágen') or get_field('Imagen') or None

        answers = []
        for l in lines:
            m = re.match(r'Opci[oó]n\s*\d+\s*:\s*(.*)', l, re.IGNORECASE)
            if m:
                raw = m.group(1).strip()
                correct = '_correcta' in raw
                option_text = raw.replace('_correcta', '').strip()
                entry = {'option': option_text}
                if correct:
                    entry['correct'] = True
                answers.append(entry)

        q = {'id': qid, 'category': categoria, 'question': pregunta}
        if imagen:
            q['image'] = f'{img_base}/{imagen}'
        q['answers'] = answers
        questions.append(q)

    return questions


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    txt_path = ROOT / sys.argv[1]
    subject  = sys.argv[2]
    out_path = ROOT / 'docs' / 'assets' / f'{subject}.json'
    img_base = f'assets/images/{subject}'

    if not txt_path.exists():
        print(f'Error: no se encuentra {txt_path}')
        sys.exit(1)

    questions = parse_txt(txt_path, img_base)
    data = {'data': questions}
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

    print(f'Generado: {out_path}  ({len(questions)} preguntas)')
    for q in questions:
        img_tag = ('  img:' + q['image'].split('/')[-1]) if 'image' in q else ''
        print(f"  {q['id']:2d}. [{q['category']}]{img_tag}")


if __name__ == '__main__':
    main()

