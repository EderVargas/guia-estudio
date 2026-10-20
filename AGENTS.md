# AGENTS.md

Quiz estático para niños. HTML, CSS y JS. Preguntas en JSON. Repo aparte de `guia-estudio-api`.

## Dónde editar

- Lógica: `src/script.js`. No editar `docs/script.min.js` (generado).
- Auth y llamadas: `docs/js/api.js`. Base: `https://guia-estudio-api.onrender.com`.
- Páginas: `docs/index.html`, `docs/quiz.html`, `docs/login.html`.
- Materias: objeto `SUBJECTS` en `src/script.js`.
- Bancos: `docs/assets/<materia>.json`.
- `QUESTIONS_PER_QUIZ = 10`.

## Selección de preguntas

1. Primero las incorrectas.
2. Relleno con nuevas hasta 10. Si hay menos, se muestran las que quedan.
3. No se repiten las ya acertadas.
4. Si no quedan incorrectas ni nuevas, se borra el progreso y se vuelve a elegir.

## Progreso y auth

- Caché de la pestaña: `sessionStorage`. Se borra al cerrar la pestaña.
- Persistencia: `GET` y `PUT /progress/{subject}`. `DELETE` al reiniciar.
- Al cargar, el progreso de la API se precarga en `sessionStorage`. Si la API falla, sigue la caché local.
- `ingles` no usa la API: lee `categoriesFile` (`assets/inglesDictationAll.json`) y el progreso se queda en `sessionStorage`.
- JWT en `localStorage` (`auth_token`). Sin token, `login.html`.

## Build

```bash
python scripts/build.py minify
python scripts/build.py optimize
python scripts/build.py check
```

Materia nueva con imágenes: agregar el nombre al array `subjects` de `scripts/optimize_images.py` antes de `optimize`.

- Originales: `assets/images/originales/{materia}/`
- Salida: `docs/assets/images/{materia}/`
- Pillow: `pip install Pillow`
- Guía larga: `OPTIMIZAR-IMAGENES.md`

De `.txt` a JSON:

```bash
python scripts/gen_cm2t_json.py <ruta.txt> <nombre_materia>
```

Campos que se leen: `Id`, `Categoria`, `Pregunta`, `Imagen` (o `Imágen`) opcional, `Opcion N` con sufijo `_correcta`, `Respuesta`. `Materia`, `Instruccion` y `Subcategoria` se ignoran. El JSON queda en `docs/assets/<nombre_materia>.json`.

- Con `Opcion N`: `type` `multiple-choice` y `answers`.
- Con `Respuesta` y sin opciones: `type` `text-input` y `correctAnswer`. La comparación ignora mayúsculas, acentos, puntos y comas. El input del quiz acepta hasta 50 caracteres. `text-input-exact` compara el texto tal cual y acepta 100.
- `Imagen`: ruta `assets/images/<nombre_materia>/<archivo>`. Si la extensión del txt no existe, se usa el archivo del mismo nombre en `assets/images/originales/<nombre_materia>/` (jpg, jpeg, png o webp). Esa carpeta tiene que llamarse igual que la clave.

Materia nueva, en este orden:

1. Clave camelCase, igual en front, API y carpeta de originales.
2. Generar el JSON con el comando de arriba.
3. `SUBJECTS` en `src/script.js`: `title`, `jsonFile` (`assets/<clave>.json`) y `storagePrefix` que no se repita.
4. Tarjeta visible en `docs/index.html` con `quiz.html?subject=<clave>`.
5. En el API: la misma clave en `VALID_SUBJECTS` y en `SUBJECT_FILES`. Sin la primera, `GET /questions/<clave>` responde 404.
6. Si hay imágenes: agregar la clave a `subjects` en `scripts/optimize_images.py` y correr `optimize`. Recorre todas las de la lista y salta las carpetas vacías.
7. `python scripts/build.py minify`.

El quiz pide `GET /questions/<clave>`. `jsonFile` es la ruta del banco en el repo; el quiz no lo abre. Excepción: `ingles`, que abre su JSON local. Para subir una materia sola, insertar en `questions` los documentos que arma `scripts/migrate_questions.py` (`subject`, `category`, `type`, `question`, `answers`, `correctAnswer`, `audioText`, `image`, `active`). No incluir `_id` ni el `id` numérico del JSON. `python scripts/migrate_questions.py` borra y reinserta cada materia de `SUBJECT_FILES`; no usarlo si solo se agrega una.

## Tipos de pregunta

`multiple-choice` (default), `text-input` (flexible), `text-input-exact`, `audio-dictation` (flexible, ResponsiveVoice con fallback Web Speech), `audio-dictation-exact`.

## No leer salvo que la tarea lo pida

Imágenes, `graphify-out/cache`, un banco JSON entero, `docs/script.min.js`.
