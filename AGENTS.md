# AGENTS.md# AGENTS.md



## Propósito del proyecto



Este proyecto es una aplicación web simple para crear y presentar cuestionarios interactivos para niños y niñas de 6 años. Utiliza HTML, CSS y JavaScript, y carga las preguntas desde un archivo JSON externo. El objetivo es ofrecer una experiencia lúdica y educativa, con efectos visuales y sonoros para motivar a los usuarios.## Propósito del proyecto



**Características principales:**Este proyecto es una aplicación web simple para crear y presentar cuestionarios interactivos para niños y niñas de 6 años. Utiliza HTML, CSS y JavaScript, y carga las preguntas desde un archivo JSON externo. El objetivo es ofrecer una experiencia lúdica y educativa, con efectos visuales y sonoros para motivar a los usuarios.



- Sistema de selección inteligente de preguntas (10 por cuestionario)## Propósito del proyecto## Propósito del proyecto

- Distribución proporcional por categorías

- Seguimiento de progreso con sessionStorage (se limpia al cerrar la pestaña)**Características principales:**

- Repriorización de preguntas incorrectas

- Estadísticas de progreso general en modal informativo- Sistema de selección inteligente de preguntas (10 por cuestionario)Este proyecto es una aplicación web simple para crear y presentar cuestionarios interactivos para niños y niñas de 6 años. Utiliza HTML, CSS y JavaScript, y carga las preguntas desde un archivo JSON externo. El objetivo es ofrecer una experiencia lúdica y educativa, con efectos visuales y sonoros para motivar a los usuarios.Este proyecto es una aplicación web simple para crear y presentar cuestionarios interactivos para niños y niñas de 6 años. Utiliza HTML, CSS y JavaScript, y carga las preguntas desde un archivo JSON externo. El objetivo es ofrecer una experiencia lúdica y educativa, con efectos visuales y sonoros para motivar a los usuarios.

- Interfaz intuitiva con efectos visuales y sonoros

- Enlace para limpiar la sesión manualmente- Distribución proporcional por categorías



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
- El sistema es compatible con navegadores modernos que soporten localStorage y ES6+.
