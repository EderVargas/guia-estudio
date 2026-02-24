"""
Genera docs/assets/conocimientoMedio2doTrimestre.json
a partir de GuiaExamenConocimientoDelMedioSegundoTrimestre.txt
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).parent.parent
TXT  = ROOT / 'assets' / 'GuiaExamenConocimientoDelMedioSegundoTrimestre.txt'
OUT  = ROOT / 'docs' / 'assets' / 'conocimientoMedio2doTrimestre.json'
IMG_BASE = 'assets/images/conocimientoMedio2doTrimestre'

text = TXT.read_text(encoding='utf-8')

# Dividir por bloques Id:
blocks = re.split(r'\n(?=Id:\d)', text.strip())

questions = []

for block in blocks:
    lines = [l.strip() for l in block.splitlines() if l.strip()]
    
    # Obtener Id
    id_match = re.match(r'Id:(\d+)', lines[0])
    if not id_match:
        continue
    qid = int(id_match.group(1))

    # Helpers
    def get_field(key):
        for l in lines:
            if l.lower().startswith(key.lower() + ':'):
                return l[len(key)+1:].strip()
        return None

    categoria   = get_field('Categoria') or get_field('Categoría') or ''
    categoria   = re.sub(r'\.$', '', categoria).strip()

    pregunta    = get_field('Pregunta') or ''
    imagen      = get_field('Imágen') or get_field('Imagen') or None

    # Recopilar opciones
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

    q = {
        'id': qid,
        'category': categoria,
        'question': pregunta,
    }
    if imagen:
        q['image'] = f'{IMG_BASE}/{imagen}'
    q['answers'] = answers

    questions.append(q)

data = {'data': questions}
OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Generado: {OUT}  ({len(questions)} preguntas)')
for q in questions:
    img_tag = ('  img:' + q['image'].split('/')[-1]) if 'image' in q else ''
    print(f"  {q['id']:2d}. [{q['category']}]{img_tag}")
