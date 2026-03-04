# Lógica de selección de preguntas (script.js)

## Resumen profesional

El sistema selecciona preguntas para cada cuestionario siguiendo estas reglas:

1. **Prioridad a preguntas incorrectas:**
  - Si el usuario falló preguntas en sesiones anteriores, esas se seleccionan primero.
  - No se repiten todas las preguntas si solo hay una incorrecta; solo se muestra la(s) fallada(s) y se rellena con nuevas.

2. **Relleno con preguntas nuevas:**
  - Si hay menos de 10 incorrectas, se agregan preguntas nuevas (no respondidas nunca) hasta completar el máximo permitido.
  - Si hay menos de 10 disponibles en total, solo se muestran las que quedan.

3. **Nunca repite preguntas ya respondidas correctamente.**

4. **Cuando no quedan preguntas nuevas ni incorrectas:**
  - El sistema resetea el progreso automáticamente y comienza de nuevo.

Esta lógica asegura que el usuario repase lo que falló y avance hasta cubrir todo el banco de preguntas, sin repeticiones innecesarias ni cuestionarios incompletos si hay suficientes preguntas.
# AGENTS.md

## Propósito del proyecto

Este proyecto es una aplicación web multi-materia para crear y presentar cuestionarios interactivos para niños y niñas de 6 años. Utiliza HTML, CSS y JavaScript, y carga las preguntas desde archivos JSON externos. El objetivo es ofrecer una experiencia lúdica y educativa, con efectos visuales y sonoros para motivar a los usuarios.

**Características principales:**

- **Sistema multi-materia**: 6 asignaturas diferentes (Matemáticas, Lenguajes, Conocimiento del Medio, Formación Cívica y Ética, English - Dictation, English Exam)
- Sistema de selección inteligente de preguntas (10 por cuestionario)
- Distribución proporcional por categorías
- **Seguimiento de progreso independiente por materia** con sessionStorage (se limpia al cerrar la pestaña)
- **Limpieza automática de sesión al cambiar de materia**
- Repriorización de preguntas incorrectas
- Estadísticas de progreso general en modal informativo
- Interfaz intuitiva con efectos visuales y sonoros
- **Cuatro tipos de preguntas**: opción múltiple, texto libre, texto exacto, audio-dictado, audio-dictado exacto
- **Soporte para imágenes opcionales en preguntas**
- **Sistema de optimización automática de imágenes**
- **Dictado en inglés con audio mejorado (ResponsiveVoice)**



## Flujo de preguntas y respuestas- Seguimiento de progreso con localStorage



- Al cargar la página, se obtiene el archivo JSON con las preguntas.- Repriorización de preguntas incorrectas



- El sistema selecciona automáticamente 10 preguntas:- Estadísticas de progreso general en modal informativo**Características principales:**## Flujo de preguntas y respuestas

  - Prioriza las preguntas respondidas incorrectamente en sesiones anteriores

  - Distribuye el resto proporcionalmente entre todas las categorías disponibles- Interfaz intuitiva con efectos visuales y sonoros

  - Evita repetir preguntas ya respondidas correctamente

- Sistema de selección inteligente de preguntas (10 por cuestionario)- Al cargar la página, se obtiene el archivo JSON con las preguntas.

- Las preguntas y las respuestas se muestran en orden aleatorio.

## Flujo de preguntas y respuestas

- Cada pregunta muestra su categoría para contexto educativo.

- Al cargar la página, se obtiene el archivo JSON con las preguntas.- Distribución proporcional por categorías- Las preguntas y las respuestas se muestran en orden aleatorio.

- El usuario puede hacer clic en el ícono ℹ️ para ver información detallada de progreso en un modal.

- El sistema selecciona automáticamente 10 preguntas:

- El usuario selecciona una respuesta y hace clic en "Verificar respuesta".

  - Prioriza las preguntas respondidas incorrectamente en sesiones anteriores- Seguimiento de progreso con localStorage- El usuario selecciona una respuesta y hace clic en "Verificar respuesta".

- Si la respuesta es correcta, se muestra un efecto de celebración (confeti y sonido).

  - Distribuye el resto proporcionalmente entre todas las categorías disponibles

- Si la respuesta es incorrecta, se indica cuál era la correcta y se guarda para repaso.

  - Evita repetir preguntas ya respondidas correctamente- Repriorización de preguntas incorrectas- Si la respuesta es correcta, se muestra un efecto de celebración (confeti y sonido).

- El usuario puede pasar a la siguiente pregunta.

- Las preguntas y las respuestas se muestran en orden aleatorio.

- Al finalizar las 10 preguntas, se muestra:

  - Puntaje del cuestionario actual- Cada pregunta muestra su categoría para contexto educativo.- Estadísticas de progreso general- Si la respuesta es incorrecta, se indica cuál era la correcta.

  - Estadísticas generales de progreso

  - Número de preguntas restantes en el banco- El usuario puede hacer clic en el ícono ℹ️ para ver información detallada de progreso en un modal.

  - Número de preguntas pendientes de repaso

- El usuario selecciona una respuesta y hace clic en "Verificar respuesta".- El usuario puede pasar a la siguiente pregunta.

## Sistema de progreso y sessionStorage

- Si la respuesta es correcta, se muestra un efecto de celebración (confeti y sonido).

El sistema utiliza **sessionStorage** para mantener el progreso del usuario durante la sesión actual. **Los datos se eliminan automáticamente al cerrar la pestaña del navegador**.

- Si la respuesta es incorrecta, se indica cuál era la correcta y se guarda para repaso.## Flujo de preguntas y respuestas- Al finalizar todas las preguntas, se muestra el puntaje total de aciertos.

### Datos almacenados:

- **answeredQuestions**: IDs de todas las preguntas respondidas correctamente- El usuario puede pasar a la siguiente pregunta.

- **incorrectQuestions**: IDs de preguntas respondidas incorrectamente (para repaso)

- Al finalizar las 10 preguntas, se muestra:- Al cargar la página, se obtiene el archivo JSON con las preguntas.

### Lógica de selección de preguntas:

1. Si hay preguntas incorrectas guardadas, se incluyen primero  - Puntaje del cuestionario actual

2. Se completa hasta 10 preguntas con nuevas preguntas distribuidas por categorías

3. Nunca se repiten preguntas ya respondidas correctamente  - Estadísticas generales de progreso- El sistema selecciona automáticamente 10 preguntas:## Cómo modificar o extender el sistema

4. Cuando se responde una pregunta incorrecta correctamente, se elimina de la lista de repaso

5. Cuando se agotan todas las preguntas, se ofrece reiniciar el progreso completo  - Número de preguntas restantes en el banco



### Limpieza de sesión:  - Número de preguntas pendientes de repaso  - Prioriza las preguntas respondidas incorrectamente en sesiones anteriores- Para agregar más preguntas, edita el archivo `assets/questions.json` siguiendo este esquema:

- **Automática**: Al cerrar la pestaña del navegador, sessionStorage se limpia automáticamente

- **Manual**: Hacer clic en el enlace "Limpiar sesión" al final de la página para reiniciar todo el progreso

- **Consola**: Ejecutar `sessionStorage.clear()` en la consola del navegador

## Sistema de progreso y localStorage  - Distribuye el resto proporcionalmente entre todas las categorías disponibles

## Modal informativo

El sistema utiliza localStorage para mantener el progreso del usuario entre sesiones:

- Se accede mediante el botón ℹ️ junto a "Pregunta X de Y"

- Muestra estadísticas actualizadas en tiempo real:  - Evita repetir preguntas ya respondidas correctamente```json

  - Total de preguntas en el banco

  - Preguntas respondidas correctamente### Datos almacenados:

  - Preguntas restantes por responder

  - Advertencia sobre preguntas pendientes de repaso (si hay)- **answeredQuestions**: IDs de todas las preguntas respondidas correctamente- Las preguntas y las respuestas se muestran en orden aleatorio.{

- Se puede cerrar haciendo clic en la X, fuera del modal, o presionando ESC

- **incorrectQuestions**: IDs de preguntas respondidas incorrectamente (para repaso)

## Cómo modificar o extender el sistema

- El usuario selecciona una respuesta y hace clic en "Verificar respuesta".	"data": [

- Para agregar más preguntas, edita el archivo `assets/lenguajes.json` siguiendo este esquema:

### Lógica de selección de preguntas:

```json

{1. Si hay preguntas incorrectas guardadas, se incluyen primero- Si la respuesta es correcta, se muestra un efecto de celebración (confeti y sonido).		{

	"data": [

		{2. Se completa hasta 10 preguntas con nuevas preguntas distribuidas por categorías

			"id": 1,

			"category": "Nombre de la categoría",3. Nunca se repiten preguntas ya respondidas correctamente- Si la respuesta es incorrecta, se indica cuál era la correcta y se guarda para repaso.			"category": "Nombre de la categoría",

			"question": "Texto de la pregunta",

			"answers": [4. Cuando se responde una pregunta incorrecta correctamente, se elimina de la lista de repaso

				{ "option": "Respuesta correcta", "correct": true },

				{ "option": "Respuesta incorrecta 1" },5. Cuando se agotan todas las preguntas, se ofrece reiniciar el progreso completo- El usuario puede pasar a la siguiente pregunta.			"question": "Texto de la pregunta",

				{ "option": "Respuesta incorrecta 2" },

				{ "option": "Respuesta incorrecta 3" }

			]

		}## Modal informativo- Al finalizar las 10 preguntas, se muestra:			"answers": [

		// ...más preguntas

	]- Se accede mediante el botón ℹ️ junto a "Pregunta X de Y"

}

```- Muestra estadísticas actualizadas en tiempo real:  - Puntaje del cuestionario actual				{ "option": "Respuesta correcta", "correct": true },



**Nota importante:** Cada pregunta debe tener un `id` único. Si agregas preguntas manualmente, asegúrate de asignarles IDs que no se repitan.  - Total de preguntas en el banco



- Para cambiar el número de preguntas por cuestionario, modifica la constante `QUESTIONS_PER_QUIZ` en `script.js` (línea 10).  - Preguntas respondidas correctamente  - Estadísticas generales de progreso				{ "option": "Respuesta incorrecta 1" },

- Puedes personalizar los estilos en `styles.css` para cambiar la apariencia.

- Si deseas agregar más efectos o funcionalidades, modifica `script.js`.  - Preguntas restantes por responder

- Para minificar el JS, ejecuta: `npx terser script.js -o script.min.js -c -m`

- El sistema está preparado para ser desplegado en GitHub Pages siguiendo la estructura del proyecto.  - Advertencia sobre preguntas pendientes de repaso (si hay)  - Número de preguntas restantes en el banco				{ "option": "Respuesta incorrecta 2" },



## Gestión del progreso- Se puede cerrar haciendo clic en la X, fuera del modal, o presionando ESC



- **Reiniciar progreso**: El usuario puede reiniciar todo su progreso cuando completa todas las preguntas o mediante el botón "Reiniciar Todo".  - Número de preguntas pendientes de repaso				{ "option": "Respuesta incorrecta 3" }

- **Ver estadísticas**: Las estadísticas se muestran en el modal informativo accesible desde el ícono ℹ️.

- **Limpiar sesión**: Hacer clic en el enlace "Limpiar sesión" al final de la página (con confirmación).## Cómo modificar o extender el sistema

- **sessionStorage vs localStorage**: 

  - ✅ **sessionStorage** (actual): Se limpia al cerrar la pestaña			]

  - ❌ **localStorage** (anterior): Persiste entre sesiones

Para agregar más preguntas, edita el archivo `assets/lenguajes.json` siguiendo este esquema:

## Notas adicionales

## Sistema de progreso y localStorage		}

- El código está comentado para facilitar su comprensión y mantenimiento.

- El diseño es responsivo y apto para computadoras y dispositivos móviles.```json

- El sistema es compatible con navegadores modernos que soporten sessionStorage y ES6+.

- El modal es accesible y se puede cerrar de múltiples formas para mejor UX.{El sistema utiliza localStorage para mantener el progreso del usuario entre sesiones:		// ...más preguntas

- La sesión se limpia automáticamente al cerrar la pestaña, ideal para uso compartido de dispositivos.

  "data": [

    {	]

      "id": 1,

      "category": "Nombre de la categoría",### Datos almacenados:}

      "question": "Texto de la pregunta",

      "answers": [- **answeredQuestions**: IDs de todas las preguntas respondidas correctamente```

        { "option": "Respuesta correcta", "correct": true },

        { "option": "Respuesta incorrecta 1" },- **incorrectQuestions**: IDs de preguntas respondidas incorrectamente (para repaso)- Puedes personalizar los estilos en `styles.css` para cambiar la apariencia.

        { "option": "Respuesta incorrecta 2" },

        { "option": "Respuesta incorrecta 3" }- Si deseas agregar más efectos o funcionalidades, modifica `script.js`.

      ]

    }### Lógica de selección de preguntas:- Para minificar el JS, utiliza una herramienta como UglifyJS y reemplaza el archivo `script.min.js`.

  ]

}1. Si hay preguntas incorrectas guardadas, se incluyen primero- El sistema está preparado para ser desplegado en GitHub Pages siguiendo la estructura del proyecto.

```

2. Se completa hasta 10 preguntas con nuevas preguntas distribuidas por categorías

**Nota importante:** Cada pregunta debe tener un `id` único. Si agregas preguntas manualmente, asegúrate de asignarles IDs que no se repitan.

3. Nunca se repiten preguntas ya respondidas correctamente## Notas adicionales

- Para cambiar el número de preguntas por cuestionario, modifica la constante `QUESTIONS_PER_QUIZ` en `script.js` (línea 8).

- Puedes personalizar los estilos en `styles.css` para cambiar la apariencia.4. Cuando se responde una pregunta incorrecta correctamente, se elimina de la lista de repaso- El código está comentado para facilitar su comprensión y mantenimiento.

- Si deseas agregar más efectos o funcionalidades, modifica `script.js`.

- Para minificar el JS, ejecuta: `npx terser script.js -o script.min.js -c -m`5. Cuando se agotan todas las preguntas, se ofrece reiniciar el progreso completo- El diseño es responsivo y apto para computadoras y dispositivos móviles.

- El sistema está preparado para ser desplegado en GitHub Pages siguiendo la estructura del proyecto.



## Gestión del progreso## Cómo modificar o extender el sistema

- **Reiniciar progreso**: El usuario puede reiniciar todo su progreso cuando completa todas las preguntas o mediante el botón "Reiniciar Todo".

- **Ver estadísticas**: Las estadísticas se muestran en el modal informativo accesible desde el ícono ℹ️.- Para agregar más preguntas, edita el archivo `assets/lenguajes.json` siguiendo este esquema:

- **localStorage**: Los datos se guardan automáticamente en el navegador. Para limpiar manualmente, abre la consola del navegador y ejecuta: `localStorage.clear()`

```json

## Notas adicionales{

- El código está comentado para facilitar su comprensión y mantenimiento.  "data": [

- El diseño es responsivo y apto para computadoras y dispositivos móviles.    {

- El sistema es compatible con navegadores modernos que soporten localStorage y ES6+.      "id": 1,

- El modal es accesible y se puede cerrar de múltiples formas para mejor UX.      "category": "Nombre de la categoría",

      "question": "Texto de la pregunta",
      "answers": [
        { "option": "Respuesta correcta", "correct": true },
        { "option": "Respuesta incorrecta 1" },
        { "option": "Respuesta incorrecta 2" },
        { "option": "Respuesta incorrecta 3" }
      ]
    }
  ]
}
```

**Nota importante:** Cada pregunta debe tener un `id` único. Si agregas preguntas manualmente, asegúrate de asignarles IDs que no se repitan.

- Para cambiar el número de preguntas por cuestionario, modifica la constante `QUESTIONS_PER_QUIZ` en `script.js` (línea 10).
- Puedes personalizar los estilos en `styles.css` para cambiar la apariencia.
- Si deseas agregar más efectos o funcionalidades, modifica `script.js`.
- Para minificar el JS, utiliza una herramienta como UglifyJS y reemplaza el archivo `script.min.js`.
- El sistema está preparado para ser desplegado en GitHub Pages siguiendo la estructura del proyecto.

## Gestión del progreso
- **Reiniciar progreso**: El usuario puede reiniciar todo su progreso cuando completa todas las preguntas o mediante el botón "Reiniciar Todo".
- **Ver estadísticas**: Las estadísticas se muestran en el encabezado y en la pantalla final.
- **localStorage**: Los datos se guardan automáticamente en el navegador. Para limpiar manualmente, abre la consola del navegador y ejecuta: `localStorage.clear()`

## Notas adicionales

- El código está comentado para facilitar su comprensión y mantenimiento.
- El diseño es responsivo y apto para computadoras y dispositivos móviles.
- El sistema es compatible con navegadores modernos que soporten sessionStorage y ES6+.
- El modal es accesible y se puede cerrar de múltiples formas para mejor UX.
- La sesión se limpia automáticamente al cerrar la pestaña, ideal para uso compartido de dispositivos.

## Optimización de Imágenes

El proyecto incluye un script de Python para optimizar imágenes automáticamente antes de usarlas en los cuestionarios.


### Características del optimizador

- **Redimensionamiento automático**: Ajusta imágenes grandes al tamaño ideal para web (600x400px)
- **Compresión inteligente**: Reduce el tamaño entre 50-80% sin pérdida visible de calidad
- **Conversión a WebP**: Genera versiones WebP con mejor compresión que JPG/PNG
- **Preserva transparencia**: Mantiene fondos transparentes en PNG
- **Procesamiento en lote**: Optimiza múltiples imágenes de una vez
- **Reporte detallado**: Genera estadísticas de ahorro de espacio

### Uso rápido y estándar de trabajo


**Siempre que agregues o modifiques preguntas, sigue estos pasos antes de probar en local o subir cambios:**

#### 1. Minificar el JavaScript

- Ejecuta: `python scripts/build.py minify`
- Esto genera/actualiza el archivo minificado en `docs/script.min.js` a partir de `src/script.js`.

#### 2. Optimizar imágenes (estándar)

> ⚠️ **PASO OBLIGATORIO al agregar una materia nueva con imágenes:** Antes de ejecutar optimize, debes agregar el nombre exacto de la carpeta al array `'subjects'` en `scripts/optimize_images.py` (línea ~27):
> ```python
> 'subjects': ['matematicas', ..., 'tuNuevaMateria'],
> ```
> Si no se agrega, el script ignorará esa materia y las imágenes NO se optimizarán.

- Coloca las imágenes originales en la carpeta correspondiente dentro de `assets/images/originales/{materia}/` (usando el mismo nombre que pusiste en `subjects`).
- Ejecuta: `python scripts/build.py optimize`
- Esto optimiza todas las imágenes de todas las materias configuradas en el script y genera las versiones optimizadas en `docs/assets/images/{materia}/`.

#### 3. Instalar dependencias para optimización de imágenes

- Asegúrate de tener Pillow instalado: `pip install Pillow`

#### 4. Verifica estructura y reportes

- Usa: `python scripts/build.py check` para validar la estructura del proyecto.
- Revisa los reportes de optimización en cada carpeta de imágenes optimizadas.

#### 5. Documentación y buenas prácticas

- Documenta en el commit o en el README si agregas una materia/carpeta nueva para imágenes.
- Mantén el estándar de carpetas: originales en `assets/images/originales/{materia}/`, optimizadas en `docs/assets/images/{materia}/`.

### Documentación completa

Para más detalles, consulta:

- `OPTIMIZAR-IMAGENES.md` - Guía completa de uso y configuración
- `IMAGENES.md` - Cómo usar imágenes en preguntas
- `IMPLEMENTACION-IMAGENES.md` - Detalles técnicos de implementación

### Requisitos

- Python 3.7+
- Pillow (PIL): `pip install Pillow`

## Sistema Multi-Materia

El proyecto ahora soporta múltiples materias con progreso independiente:

### Materias Disponibles

1. **🔢 Matemáticas** (`matematicas.json`)
   - 69 preguntas sobre números, sumas, conteo
   - Incluye 30 imágenes optimizadas
   - Categorías: Conteo, Números Ascendentes/Descendentes, Escritura, Antecesor/Sucesor, Sumas

2. **📚 Lenguajes** (`lenguajes.json`)
   - Preguntas sobre vocales, letras y palabras
   - Sin imágenes

3. **🌍 Conocimiento del Medio** (`conocimientoMedio.json`)
   - 23 preguntas sobre cuerpo humano, nutrición y salud
   - 10 imágenes optimizadas
   - Categorías: Partes del cuerpo, Plato del bien comer, Jarra del buen beber

4. **🤝 Formación Cívica y Ética** (`formacionCivicaEtica.json`)
   - 12 preguntas sobre reglas, respeto y valores
   - 4 imágenes optimizadas
   - Categorías: Las Reglas, Riesgos y Accidentes, Respeto

5. **🦃 Thanksgiving Dictation** (`inglesDictation.json`)
   - 10 palabras de Thanksgiving para dictado
   - Sin imágenes, usa audio con ResponsiveVoice
   - Palabras: Thanksgiving Day (exacta), turkey, Pilgrim (exacta), Native American (exacta), corn, pumpkin pie, Mayflower (exacta), feast, scarecrow, cornucopia
   - Mezcla audio-dictation (flexible) y audio-dictation-exact (para palabras con mayúsculas)

6. **📝 English Exam** (`inglesExamen.json`)
   - 55 preguntas sobre lectura, gramática y escritura en inglés
   - 44 imágenes optimizadas
   - Categorías: Reading Comprehension, Subject and Predicate, Capitalization and Punctuation, Use of English/Writing
   - Usa validación exacta (`text-input-exact`) para ejercicios de capitalización y puntuación

### Arquitectura del Sistema

- **Menú de Selección**: `index.html` muestra tarjetas para cada materia
- **Página de Cuestionario**: `quiz.html` carga dinámicamente según parámetro URL (`?subject=matematicas`)
- **Configuración Centralizada**: Objeto `SUBJECTS` en `script.js` define todas las materias
- **Almacenamiento Independiente**: Cada materia usa su propio prefijo en sessionStorage
  - `math_` para Matemáticas
  - `lang_` para Lenguajes
  - `cm_` para Conocimiento del Medio
  - `fce_` para Formación Cívica y Ética
  - `eng_` para English - Dictation
  - `engex_` para English Exam

### Limpieza Automática de Sesión

El sistema detecta automáticamente cuando el usuario cambia de materia y limpia la sesión anterior:

```javascript
const LAST_SUBJECT_KEY = 'lastSubject';
const lastSubject = storage.getItem(LAST_SUBJECT_KEY);

if (lastSubject && lastSubject !== selectedSubject) {
    // Limpiar la sesión de la materia actual
    storage.removeItem(STORAGE_KEYS.ANSWERED_QUESTIONS);
    storage.removeItem(STORAGE_KEYS.INCORRECT_QUESTIONS);
}

storage.setItem(LAST_SUBJECT_KEY, selectedSubject);
```

Esto previene que las preguntas respondidas de una materia afecten el progreso de otra.

## Sistema de Audio para Dictado en Inglés

### ResponsiveVoice Integration

Para mejorar la calidad de pronunciación en inglés, se implementó **ResponsiveVoice**:

```javascript
function speakWord(text) {
    if (typeof responsiveVoice !== 'undefined' && responsiveVoice.voiceSupport()) {
        responsiveVoice.speak(text, "US English Female", {
            rate: 0.8,
            pitch: 1,
            volume: 1
        });
    } else {
        // Fallback a Web Speech API nativa
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    }
}
```

### Ventajas de ResponsiveVoice

- ✅ **Pronunciación precisa**: Corrige problemas como "animals" → "anamals"
- ✅ **Voz natural de alta calidad**: US English Female
- ✅ **Fallback inteligente**: Usa Web Speech API si ResponsiveVoice no está disponible
- ✅ **Configuración ajustable**: rate, pitch, volume personalizables
- ✅ **Biblioteca open-source**: Gratuita para uso educativo (100k caracteres/día)

### Tipo de Pregunta: audio-dictation

```json
{
  "id": 1,
  "category": "Dictation",
  "type": "audio-dictation",
  "audioText": "animals",
  "question": "Listen and write the word",
  "correctAnswer": "animals"
}
```

### Tipo de Pregunta: text-input-exact

```json
{
  "id": 35,
  "category": "Capitalization and Punctuation",
  "type": "text-input-exact",
  "image": "35.jpg",
  "question": "Copy the sentence using correct capitalization and punctuation.",
  "correctAnswer": "I can use a shovel to dig a hole."
}
```

### Tipo de Pregunta: audio-dictation-exact

```json
{
  "id": 1,
  "category": "Halloween Words",
  "type": "audio-dictation-exact",
  "audioText": "Halloween",
  "question": "Listen and write the word (capitalization matters)",
  "correctAnswer": "Halloween"
}
```

**Nota importante:** En `audio-dictation-exact`, el usuario debe escribir la respuesta exactamente como aparece en `correctAnswer`, incluyendo mayúsculas, minúsculas y puntuación. Se reproduce audio automáticamente pero la validación es exacta.

- Se muestra un botón de bocina grande (🔊)
- La palabra se pronuncia automáticamente al cargar la pregunta
- El estudiante puede repetir el audio haciendo clic en el botón
- La respuesta se valida sin importar mayúsculas/minúsculas/acentos

## Tipos de Preguntas Soportados

### 1. Opción Múltiple (`multiple-choice`)

Comportamiento por defecto. Muestra 4 opciones donde solo una es correcta.

### 2. Texto Libre (`text-input`)

Permite al usuario escribir su respuesta. Validación insensible a mayúsculas, acentos y puntuación. Ideal para respuestas flexibles donde el formato exacto no importa.

### 3. Texto Exacto (`text-input-exact`)

Validación estricta que requiere coincidencia exacta con la respuesta correcta, incluyendo mayúsculas, minúsculas y puntuación. Usado para ejercicios de capitalización, gramática y ortografía donde el formato es importante.

**Diferencias con `text-input`:**
- ✅ **text-input**: `"hola"` = `"HOLA"` = `"Hola!"` (flexible)
- ❌ **text-input-exact**: `"Hello."` ≠ `"hello"` ≠ `"Hello"` (exacto)

### 4. Audio-Dictado (`audio-dictation`)

Reproduce una palabra en inglés y el usuario debe escribirla. Usa ResponsiveVoice para audio de alta calidad. Validación flexible (insensible a mayúsculas).

### 5. Audio-Dictado Exacto (`audio-dictation-exact`)

Similar a audio-dictation pero con validación estricta que requiere coincidencia exacta con la respuesta correcta, incluyendo mayúsculas, minúsculas y puntuación. Usado para palabras específicas donde el formato es importante (ej: "Halloween").

## Optimización de Imágenes por Materia

El script `optimize_images.py` procesa carpetas separadas por materia.

> ⚠️ **Al agregar una materia nueva con imágenes, SIEMPRE actualizar el array `subjects` en `scripts/optimize_images.py`** (CONFIG, línea ~27). De lo contrario, esa materia será ignorada aunque las imágenes existan en la carpeta.

```python
'subjects': ['matematicas', 'lenguajes', 'conocimientoMedio', 'formacionCivicaEtica', 'inglesExamen', 'inglesExamen2doTrimestre', 'matematicas2doTrimestre'],
```

Estructura:
- Entrada: `assets/images/originales/{materia}/`
- Salida: `docs/assets/images/{materia}/`

Cada materia mantiene sus imágenes organizadas en carpetas independientes para mejor mantenimiento.

**Nota:** La materia `ingles` (dictation) no tiene carpeta de imágenes porque sus preguntas son solo de audio.

## Conversión de Guías (.txt) a JSON

El script `scripts/gen_cm2t_json.py` convierte cualquier guía de estudio en formato `.txt` al JSON del sistema de cuestionarios.

### Uso

```bash
python scripts/gen_cm2t_json.py <ruta/archivo.txt> <nombre_materia>
```

**Ejemplos:**
```bash
python scripts/gen_cm2t_json.py assets/GuiaExamenConocimientoDelMedioSegundoTrimestre.txt conocimientoMedio2doTrimestre
python scripts/gen_cm2t_json.py assets/GuiaExamenSegundoTrimestreCivicaYEtica.txt formacionCivicaEtica2doTrimestre
```

- El JSON se guarda automáticamente en `docs/assets/<nombre_materia>.json`
- Las imágenes se referencian como `assets/images/<nombre_materia>/<imagen>`

### Formato requerido del .txt

```
Id:1
Materia: Nombre de la materia.
Categoria: Nombre de la categoría.
Pregunta: Texto de la pregunta.
Imágen: 1.jpg          ← opcional
Opcion 1: Respuesta correcta _correcta
Opcion 2: Respuesta incorrecta
Opcion 3: Respuesta incorrecta
Opcion 4: Respuesta incorrecta
```

**Reglas del formato:**
- El campo `_correcta` al final de una opción la marca como respuesta correcta.
- `Imágen:` es opcional; si se incluye, la pregunta usará imagen.
- El número de opciones es flexible (mínimo 2, sin límite).
- Los campos `Instruccion:` y `Subcategoria:` se ignoran (no se usan en el JSON).

### Pasos completos al agregar una materia nueva desde .txt

1. Colocar el `.txt` en `assets/`
2. Ejecutar el conversor:
   ```bash
   .venv\Scripts\python.exe scripts/gen_cm2t_json.py assets/MiGuia.txt miMateria
   ```
3. Agregar la materia en `src/script.js` (objeto `SUBJECTS`)
4. Agregar la tarjeta en `docs/index.html`
5. Si hay imágenes: colocar originales en `assets/images/originales/miMateria/` y agregar `'miMateria'` al array `subjects` en `scripts/optimize_images.py`
6. Minificar y optimizar:
   ```bash
   .venv\Scripts\python.exe scripts/build.py minify
   .venv\Scripts\python.exe scripts/build.py optimize
   ```

