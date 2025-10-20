# 🔒 Guía de Seguridad para GitHub Pages

## ⚠️ Limitaciones de Seguridad en GitHub Pages

GitHub Pages es un servicio de **hosting estático público**. Esto significa:

- ❌ **No hay autenticación de servidor** (Apache/Nginx)
- ❌ **No hay backend** para validar usuarios
- ❌ **Todo el código es visible** en el navegador
- ❌ **Las API keys expuestas son públicas**
- ✅ **Solo sirve archivos HTML/CSS/JS estáticos**

## 🛡️ Estrategias de Protección

### Nivel 1: Protección Básica (Frontend)

#### A. Password de Acceso Simple

**Ventajas:**
- ✅ Fácil de implementar
- ✅ No requiere servicios externos
- ✅ Gratis

**Desventajas:**
- ⚠️ Password visible en código fuente (inspección de navegador)
- ⚠️ No es seguridad real, solo "obscuridad"
- ⚠️ Puede ser bypasseado fácilmente

**Implementación:**

```javascript
// auth.js - Sistema de password simple
const ACCESS_CODE = 'guia2025'; // ⚠️ Visible en código fuente

function checkAccess() {
    const stored = sessionStorage.getItem('authenticated');
    
    if (stored === 'true') {
        return true;
    }
    
    const password = prompt('Ingresa el código de acceso:');
    
    if (password === ACCESS_CODE) {
        sessionStorage.setItem('authenticated', 'true');
        return true;
    } else {
        alert('Código incorrecto');
        window.location.href = 'about:blank';
        return false;
    }
}

// Ejecutar al cargar la página
if (!checkAccess()) {
    document.body.innerHTML = '<h1>Acceso Denegado</h1>';
}
```

**Uso en index.html:**
```html
<script src="auth.js"></script>
```

---

#### B. Ofuscación de Código

**Ventajas:**
- ✅ Dificulta (no previene) la lectura del código
- ✅ Compatible con GitHub Pages

**Desventajas:**
- ⚠️ No es seguridad real
- ⚠️ Puede ser revertida con herramientas

**Herramientas:**
```powershell
# Ofuscar JavaScript
npx javascript-obfuscator script.js --output script.min.js

# Minificar JSON (hace más difícil leer preguntas)
npx json-minify assets/lenguajes.json > assets/lenguajes.min.json
```

---

#### C. Encriptación de Datos (Frontend)

**Ventajas:**
- ✅ Preguntas encriptadas en JSON
- ✅ Solo desencripta con password correcto

**Desventajas:**
- ⚠️ La clave de encriptación está en el código JS (visible)
- ⚠️ Puede ser extraída inspeccionando el código

**Implementación:**

```javascript
// Usando CryptoJS
const ENCRYPTION_KEY = 'mi-clave-secreta'; // ⚠️ Visible en código

async function loadEncryptedQuestions() {
    const response = await fetch('assets/questions.encrypted.json');
    const encrypted = await response.json();
    
    const decrypted = CryptoJS.AES.decrypt(encrypted.data, ENCRYPTION_KEY);
    const questions = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    
    return questions;
}
```

---

### Nivel 2: Protección Media (Servicios Externos)

#### A. Netlify con Password Protection

**Ventajas:**
- ✅ Autenticación real a nivel de servidor
- ✅ Password no visible en código fuente
- ✅ Plan gratuito disponible

**Desventajas:**
- ⚠️ Requiere migrar de GitHub Pages a Netlify

**Pasos:**
1. Conecta tu repositorio a Netlify
2. Activa "Password Protection" en configuración
3. Define un password

**Documentación:** https://docs.netlify.com/visitor-access/password-protection/

---

#### B. Cloudflare Access (Gratis hasta 50 usuarios)

**Ventajas:**
- ✅ Autenticación robusta (email, Google, GitHub)
- ✅ Compatible con GitHub Pages (proxy)
- ✅ Gratis hasta 50 usuarios

**Desventajas:**
- ⚠️ Configuración técnica más compleja
- ⚠️ Requiere dominio propio (puede ser gratis con Cloudflare)

**Pasos:**
1. Registra tu dominio en Cloudflare
2. Configura Cloudflare Access
3. Apunta tu dominio a GitHub Pages
4. Define reglas de acceso (email específicos, dominios, etc.)

**Documentación:** https://developers.cloudflare.com/cloudflare-one/

---

#### C. Vercel con Environment Variables

**Ventajas:**
- ✅ Puede usar variables de entorno
- ✅ Deploy automático desde GitHub
- ✅ Gratis para proyectos personales

**Desventajas:**
- ⚠️ Requiere migrar de GitHub Pages

**Pasos:**
1. Importa tu repo en Vercel
2. Configura variables de entorno secretas
3. Usa API Routes para validación backend

---

### Nivel 3: Protección Avanzada (Backend Real)

#### A. GitHub Pages + Firebase Authentication

**Ventajas:**
- ✅ Autenticación real con Firebase
- ✅ Soporte para Google, Email, etc.
- ✅ Plan gratuito generoso

**Desventajas:**
- ⚠️ Requiere integración de Firebase SDK
- ⚠️ Más complejo de configurar

**Estructura:**
```
index.html (público)
  ↓
Firebase Auth (valida usuario)
  ↓
Si autenticado → Carga app.html
Si no → Muestra login
```

**Implementación básica:**

```javascript
// firebase-auth.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "TU-API-KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    // ... otros valores
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = 'app.html';
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
}
```

---

#### B. GitHub Pages + Supabase

**Ventajas:**
- ✅ Backend completo con base de datos
- ✅ Autenticación integrada
- ✅ Plan gratuito disponible

**Documentación:** https://supabase.com/docs/guides/auth

---

## 📊 Comparativa de Soluciones

| Solución | Seguridad | Complejidad | Costo | Migración Requerida |
|----------|-----------|-------------|-------|---------------------|
| Password JS | ⭐ | ⭐ | Gratis | No |
| Ofuscación | ⭐⭐ | ⭐⭐ | Gratis | No |
| Encriptación JS | ⭐⭐ | ⭐⭐⭐ | Gratis | No |
| Netlify Password | ⭐⭐⭐⭐ | ⭐⭐ | Gratis | Sí |
| Cloudflare Access | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Gratis (50 users) | No (con dominio) |
| Firebase Auth | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Gratis | No |
| Supabase | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Gratis | No |

---

## 🎯 Recomendaciones según Caso de Uso

### Caso 1: Uso Familiar/Personal (No crítico)
**Solución:** Password simple en JavaScript

**Por qué:**
- Fácil de implementar
- Suficiente para evitar acceso casual
- No requiere configuración compleja

---

### Caso 2: Uso Educativo (Estudiantes específicos)
**Solución:** Netlify con Password Protection o Cloudflare Access

**Por qué:**
- Autenticación real
- Fácil de compartir código de acceso
- Protección efectiva

---

### Caso 3: Uso Comercial/Sensible
**Solución:** Firebase Authentication + GitHub Pages

**Por qué:**
- Seguridad robusta
- Control de usuarios individuales
- Auditoría de accesos

---

## 🚀 Implementación Rápida: Password Simple

Si quieres protección básica **ahora mismo**, puedo crear un sistema de password simple:

### Características:
- ✅ Password al cargar la página
- ✅ Almacenado en sessionStorage (se borra al cerrar pestaña)
- ✅ Sin dependencias externas
- ✅ Compatible con GitHub Pages

### Archivos a crear:
1. `auth.js` - Lógica de autenticación
2. Modificar `index.html` - Incluir script de auth
3. `.env.example` - Documentar password (no subir real a Git)

**¿Quieres que implemente esta solución?**

---

## 📝 Mejores Prácticas

1. **Nunca guardes datos sensibles reales** en GitHub Pages
2. **Usa .gitignore** para archivos con secrets reales
3. **Documenta el password** en lugar seguro (no en el repo)
4. **Considera migrar** si necesitas seguridad real
5. **Evalúa el riesgo:** ¿Qué pasa si alguien accede al contenido?

---

## ✅ Checklist de Seguridad

- [ ] ¿Hay información personal/sensible en el código?
- [ ] ¿Las preguntas del cuestionario son públicas o privadas?
- [ ] ¿Necesitas saber quién accede al sitio?
- [ ] ¿Es aceptable que alguien técnico pueda ver el código?
- [ ] ¿Tienes presupuesto para servicios de pago?
- [ ] ¿Puedes migrar a otra plataforma si es necesario?

---

## 🎓 Conclusión

**Para un cuestionario educativo simple:**
- Password básico en JavaScript es suficiente
- No guardes información personal
- Es aceptable que el código sea visible

**Para datos sensibles:**
- Migra a Netlify/Vercel con autenticación
- Usa Firebase/Supabase para backend
- GitHub Pages no es la plataforma adecuada

**¿Qué nivel de seguridad necesitas?** Puedo ayudarte a implementar la solución más adecuada para tu caso.
