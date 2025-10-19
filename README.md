# 🎯 Cuestionario Interactivo para Niños

Una aplicación web interactiva diseñada para crear y presentar cuestionarios educativos para niños de 6 años, con efectos visuales y sonoros que hacen el aprendizaje más divertido.

## 🌟 Características

- ✅ Preguntas y respuestas en orden aleatorio
- 🎨 Diseño colorido y atractivo con colores pastel
- 🎉 Efectos de celebración con confeti y sonidos
- 📱 Totalmente responsivo (funciona en computadoras y dispositivos móviles)
- 🔄 Sistema de puntaje en tiempo real
- 💡 Retroalimentación inmediata sobre respuestas correctas/incorrectas

## 🚀 Demo en vivo

[Ver demo aquí](https://edervargas.github.io/guia-estudio/)

## 📁 Estructura del proyecto

```
guia-estudio/
├── index.html          # Página principal
├── styles.css          # Estilos del proyecto
├── script.js           # Código JavaScript (versión completa con comentarios)
├── script.min.js       # Código JavaScript minificado (usado en producción)
├── assets/
│   └── questions.json  # Archivo de preguntas y respuestas
├── AGENTS.md           # Documentación para agentes
└── README.md           # Este archivo
```

## 🎮 Cómo usar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TuUsuario/guia-estudio.git
   cd guia-estudio
   ```

2. **Abrir el proyecto:**
   - Simplemente abre `index.html` en tu navegador web
   - O usa Live Server en VS Code para desarrollo

3. **Personalizar las preguntas:**
   - Edita el archivo `assets/questions.json`
   - Sigue el esquema de ejemplo que se muestra abajo

## 📝 Formato del archivo JSON

```json
{
  "data": [
    {
      "question": "¿Tu pregunta aquí?",
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

### Reglas importantes:
- Solo una respuesta debe tener `"correct": true`
- Las demás respuestas no necesitan la propiedad `correct` (o pueden tenerla en `false`)
- Puedes tener entre 2 y 6 opciones de respuesta por pregunta

## 🛠️ Modificar el código JavaScript

Si necesitas hacer cambios en `script.js`:

1. Edita el archivo `script.js`
2. Minifica el código usando Terser:
   ```bash
   npx terser script.js -o script.min.js -c -m
   ```

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
