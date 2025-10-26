# 🎯 Cuestionario Interactivo para Niños

Una aplicación web interactiva diseñada para crear y presentar cuestionarios educativos para niños de 6 años, con efectos visuales y sonoros que hacen el aprendizaje más divertido.

## 🌟 Características

- ✅ Sistema multi-materia con 6 asignaturas diferentes
- 🎯 Sistema inteligente de selección de preguntas (10 por cuestionario)
- 🎨 Diseño colorido y atractivo con colores pastel
- 🎉 Efectos de celebración con confeti y sonidos
- 📱 Totalmente responsivo (computadoras, tablets y móviles)
- 🔄 Seguimiento de progreso con sessionStorage independiente por materia
- 🔄 Limpieza automática de sesión al cambiar de materia
- 💡 Repriorización de preguntas incorrectas
- 📊 Estadísticas de progreso en modal informativo
- 🖼️ Soporte para imágenes opcionales en preguntas
- ⚡ Sistema de optimización automática de imágenes
- 🔊 Dictado en inglés con pronunciación mejorada (ResponsiveVoice)
- 📝 Soporte para cuatro tipos de preguntas: opción múltiple, texto libre, texto exacto y audio-dictado

## 🚀 Demo en vivo

[Ver demo aquí](https://edervargas.github.io/guia-estudio/)

## 📁 Estructura del proyecto

```
guia-estudio/
├── docs/                          # 🌐 PÚBLICO (GitHub Pages)
│   ├── index.html                 # Menú de selección de materias
│   ├── quiz.html                  # Página del cuestionario
│   ├── styles.css                 # Estilos del proyecto
│   ├── script.min.js              # JavaScript minificado (producción)
│   └── assets/
│       ├── lenguajes.json         # 📚 Preguntas de lenguaje
│       ├── matematicas.json       # 🔢 Preguntas de matemáticas
│       ├── conocimientoMedio.json # 🌍 Preguntas de ciencias naturales
│       ├── formacionCivicaEtica.json # 🤝 Preguntas de ética y civismo
│       ├── ingles.json            # 🔊 Palabras para dictado en inglés
│       └── images/                # Imágenes optimizadas por materia
│           ├── matematicas/
│           ├── conocimientoMedio/
│           └── formacionCivicaEtica/
│
├── src/                           # 📝 Código fuente
│   └── script.js                  # JavaScript con comentarios
│
├── scripts/                       # 🐍 Scripts Python
│   ├── optimize_images.py         # Optimizador de imágenes
│   ├── extract_pdf.py             # Extractor de texto PDF
│   ├── generate_questions.py      # Generador de preguntas
│   └── build.py                   # Utilidades de desarrollo
│
├── assets/
│   ├── cuestionario_matematicas.txt  # Fuente de preguntas
│   └── images/
│       └── originales/            # Imágenes originales (no publicadas)
│
├── AGENTS.md                      # Documentación del proyecto
├── OPTIMIZAR-IMAGENES.md          # Guía de optimización de imágenes
└── README.md                      # Este archivo
```

## 🎮 Inicio Rápido

### Para ver el sitio web:

Simplemente visita: [https://edervargas.github.io/guia-estudio/](https://edervargas.github.io/guia-estudio/)

### Para desarrollo local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/EderVargas/guia-estudio.git
   cd guia-estudio
   ```

2. **Abrir el proyecto:**
   - Abre `docs/index.html` en tu navegador
   - O usa Live Server en VS Code apuntando a la carpeta `docs/`

3. **Instalar dependencias Python (opcional, para optimizar imágenes):**
   ```bash
   python -m venv .venv
   .venv\Scripts\Activate.ps1  # Windows PowerShell
   pip install Pillow
   ```

## 🛠️ Flujo de Trabajo para Desarrollo

### 1️⃣ Modificar código JavaScript

```bash
# 1. Edita el código fuente
code src/script.js

# 2. Minifica para producción
npx terser src/script.js -o docs/script.min.js -c -m

# O usa el script auxiliar:
python scripts/build.py minify
```

### 2️⃣ Optimizar imágenes

```bash
# 1. Coloca imágenes originales en:
#    assets/images/originales/

# 2. Ejecuta el optimizador (desde la raíz del proyecto)
cd scripts
python optimize_images.py

# O usa el script auxiliar (desde la raíz):
python scripts/build.py optimize
```

Las imágenes optimizadas se guardan automáticamente en `docs/assets/images/`

### 3️⃣ Agregar/modificar preguntas

```bash
# Edita el archivo JSON
code docs/assets/lenguajes.json
```

**Formato con imagen opcional:**

```json
{
  "data": [
    {
      "id": 1,
      "category": "Vocales",
      "question": "¿Cuál de estas letras es una vocal?",
      "image": "assets/images/vocales.webp",
      "answers": [
        { "option": "A", "correct": true },
        { "option": "B" },
        { "option": "C" },
        { "option": "D" }
      ]
    }
  ]
}
```

### 4️⃣ Verificar estructura

```bash
# Verifica que todas las carpetas y archivos estén en su lugar
python scripts/build.py check
```

### 4️⃣ Hacer todo (minify + optimize):
```powershell
python scripts/build.py all
```

### 5️⃣ Publicar cambios

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main

# GitHub Pages se actualiza automáticamente en 1-2 minutos
```

## 📚 Materias Disponibles

El sistema incluye **6 materias diferentes**:

1. 🔢 **Matemáticas** - Números, sumas, conteo (69 preguntas)
2. 📚 **Lenguajes** - Vocales, letras, palabras
3. 🌍 **Conocimiento del Medio** - Cuerpo humano, nutrición, salud (23 preguntas)
4. 🤝 **Formación Cívica y Ética** - Reglas, respeto, valores (12 preguntas)
5. 🔊 **English - Dictation** - Dictado de palabras en inglés con audio (10 palabras)
6. 📝 **English Exam** - Lectura, gramática, escritura (55 preguntas)

Cada materia tiene su propio progreso independiente que se guarda en `sessionStorage`.

## 📝 Formato del archivo JSON

El sistema soporta **cuatro tipos de preguntas**:

### 1️⃣ Preguntas de Opción Múltiple

```json
{
  "data": [
    {
      "id": 1,
      "category": "Categoría de la pregunta",
      "question": "¿Tu pregunta aquí?",
      "type": "multiple-choice",
      "image": "assets/images/matematicas/imagen.webp",
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

### 2️⃣ Preguntas de Texto Libre

```json
{
  "data": [
    {
      "id": 2,
      "category": "Escritura correcta de números",
      "question": "¿Cómo se escribe el número 6?",
      "type": "text-input",
      "correctAnswer": "SEIS"
    }
  ]
}
```

### 3️⃣ Preguntas de Audio-Dictado (Inglés)

```json
{
  "data": [
    {
      "id": 1,
      "category": "Dictation",
      "type": "audio-dictation",
      "audioText": "animals",
      "question": "Listen and write the word",
      "correctAnswer": "animals"
    }
  ]
}
```

### Reglas importantes:

- Cada pregunta debe tener un `id` único
- **Opción múltiple**: Solo una respuesta debe tener `"correct": true`
- **Texto libre**: La respuesta se valida sin importar mayúsculas/minúsculas/acentos
- **Audio-dictado**: Usa ResponsiveVoice para pronunciación en inglés de alta calidad
- El campo `image` es opcional (organizado por carpetas de materias)
- El campo `type` por defecto es `"multiple-choice"`

## 🎨 Personalización

### Cambiar colores
Edita `styles.css` y modifica las variables de los gradientes:

```css
/* Ejemplo: cambiar el color de fondo del contenedor de preguntas */
#question-container {
    background: linear-gradient(135deg, #tuColor1 0%, #tuColor2 100%);
}
```

### Agregar más efectos
Modifica las funciones en `script.js`:
- `launchConfetti()` - Para cambiar el efecto de confeti
- `playSuccessSound()` - Para modificar el sonido de éxito
- `playErrorSound()` - Para modificar el sonido de error

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📧 Contacto

¿Preguntas o sugerencias? Abre un issue en GitHub.

---

Hecho con ❤️ para hacer el aprendizaje más divertido de los amores de mi vida, mis hijos.
