/**
 * Cuestionario Interactivo para Niños
 * Sistema de preguntas y respuestas con efectos visuales y sonoros
 * Versión 2.1 - Con gestión de progreso y sessionStorage
 */

// Constantes
const QUESTIONS_PER_QUIZ = 10;
const STORAGE_KEYS = {
    ANSWERED_QUESTIONS: 'answeredQuestions',
    INCORRECT_QUESTIONS: 'incorrectQuestions'
};

// Usar sessionStorage en lugar de localStorage
const storage = sessionStorage;

// Variables globales
let allQuestionsData = []; // Todas las preguntas del JSON
let currentQuizQuestions = []; // Preguntas seleccionadas para este cuestionario
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Elementos del DOM
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const verifyBtn = document.getElementById('verify-btn');
const nextBtn = document.getElementById('next-btn');
const feedback = document.getElementById('feedback');
const quizContainer = document.getElementById('quiz-container');
const finalScreen = document.getElementById('final-screen');
const finalScoreDisplay = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');
const scoreDisplay = document.getElementById('score');
const confettiCanvas = document.getElementById('confetti-canvas');
const infoBtn = document.getElementById('info-btn');
const infoModal = document.getElementById('info-modal');
const closeModal = document.querySelector('.close-modal');
const modalInfoContent = document.getElementById('modal-info-content');

/**
 * Función para mezclar un array aleatoriamente (algoritmo Fisher-Yates)
 * @param {Array} array - Array a mezclar
 * @returns {Array} - Array mezclado
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Obtener preguntas respondidas desde sessionStorage
 * @returns {Set} - Set con IDs de preguntas respondidas
 */
function getAnsweredQuestions() {
    const stored = storage.getItem(STORAGE_KEYS.ANSWERED_QUESTIONS);
    return stored ? new Set(JSON.parse(stored)) : new Set();
}

/**
 * Obtener preguntas incorrectas desde sessionStorage
 * @returns {Set} - Set con IDs de preguntas incorrectas
 */
function getIncorrectQuestions() {
    const stored = storage.getItem(STORAGE_KEYS.INCORRECT_QUESTIONS);
    return stored ? new Set(JSON.parse(stored)) : new Set();
}

/**
 * Guardar pregunta respondida en sessionStorage
 * @param {number} questionId - ID de la pregunta
 * @param {boolean} wasCorrect - Si la respuesta fue correcta
 */
function saveQuestionResult(questionId, wasCorrect) {
    const answeredQuestions = getAnsweredQuestions();
    answeredQuestions.add(questionId);
    storage.setItem(STORAGE_KEYS.ANSWERED_QUESTIONS, JSON.stringify([...answeredQuestions]));
    
    const incorrectQuestions = getIncorrectQuestions();
    if (!wasCorrect) {
        incorrectQuestions.add(questionId);
    } else {
        incorrectQuestions.delete(questionId);
    }
    storage.setItem(STORAGE_KEYS.INCORRECT_QUESTIONS, JSON.stringify([...incorrectQuestions]));
}

/**
 * Reiniciar el progreso guardado
 */
function resetProgress() {
    storage.removeItem(STORAGE_KEYS.ANSWERED_QUESTIONS);
    storage.removeItem(STORAGE_KEYS.INCORRECT_QUESTIONS);
}

/**
 * Seleccionar preguntas para el cuestionario
 * Prioriza preguntas incorrectas y luego rellena con nuevas no respondidas.
 * Si hay menos de QUESTIONS_PER_QUIZ disponibles, solo muestra las que hay.
 * Nunca repite todas las preguntas si solo hay una incorrecta.
 * @returns {Array} - Array de preguntas seleccionadas
 */
function selectQuestions() {
    const answeredQuestions = getAnsweredQuestions();
    const incorrectQuestions = getIncorrectQuestions();

    // Preguntas incorrectas (no respondidas correctamente aún)
    const incorrectQuestionsData = allQuestionsData.filter(q => incorrectQuestions.has(q.id));

    // Preguntas nuevas (no respondidas nunca)
    const newQuestions = allQuestionsData.filter(q => !answeredQuestions.has(q.id) && !incorrectQuestions.has(q.id));

    // Si no hay preguntas nuevas ni incorrectas, resetear progreso
    if (incorrectQuestionsData.length === 0 && newQuestions.length === 0) {
        resetProgress();
        return selectQuestions();
    }

    // Selección priorizada: incorrectas primero, luego nuevas
    let selectedQuestions = [];
    selectedQuestions.push(...shuffleArray(incorrectQuestionsData));
    if (selectedQuestions.length < QUESTIONS_PER_QUIZ) {
        const remainingCount = QUESTIONS_PER_QUIZ - selectedQuestions.length;
        selectedQuestions.push(...shuffleArray(newQuestions).slice(0, remainingCount));
    }

    // Si hay menos de 10 disponibles, solo muestra las que hay
    return shuffleArray(selectedQuestions.slice(0, QUESTIONS_PER_QUIZ));
}

/**
 * Obtener estadísticas del progreso
 * @returns {Object} - Objeto con estadísticas
 */
function getProgressStats() {
    const answeredQuestions = getAnsweredQuestions();
    const incorrectQuestions = getIncorrectQuestions();
    const totalQuestions = allQuestionsData.length;
    const remainingQuestions = totalQuestions - answeredQuestions.size;
    
    return {
        total: totalQuestions,
        answered: answeredQuestions.size,
        remaining: remainingQuestions,
        incorrect: incorrectQuestions.size
    };
}

/**
 * Cargar preguntas desde el archivo JSON
 */
async function loadQuestions() {
    try {
        // const response = await fetch('assets/lenguajes.json');
        const response = await fetch('assets/matematicas.json');
        const data = await response.json();
        allQuestionsData = data.data;
        
        // Seleccionar preguntas para este cuestionario
        currentQuizQuestions = selectQuestions();
        
        // Actualizar display
        totalQuestionsDisplay.textContent = currentQuizQuestions.length;
        
        displayQuestion();
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        questionText.textContent = 'Error al cargar las preguntas. Por favor, recarga la página.';
    }
}

/**
 * Mostrar información de progreso en modal
 */
function displayProgressInfo() {
    const stats = getProgressStats();
    const incorrectQuestions = getIncorrectQuestions();
    
    let infoHTML = '';
    
    // Mostrar ID de la pregunta actual si hay una pregunta visible
    if (currentQuizQuestions.length > 0 && currentQuestionIndex < currentQuizQuestions.length) {
        const currentQuestion = currentQuizQuestions[currentQuestionIndex];
        infoHTML += '<div class="stat-row" style="background-color: #e3f2fd;">';
            infoHTML += `<p><strong>ID de pregunta actual:</strong> ${currentQuestion.id}</p>`;
        infoHTML += '</div>';
    }
    
    infoHTML += '<div class="stat-row">';
        infoHTML += `<p><strong>Total de preguntas:</strong> ${stats.total}</p>`;
    infoHTML += '</div>';
    
    infoHTML += '<div class="stat-row">';
        infoHTML += `<p><strong>Respondidas correctamente:</strong> ${stats.answered}</p>`;
    infoHTML += '</div>';
    
    infoHTML += '<div class="stat-row">';
        infoHTML += `<p><strong>Preguntas restantes:</strong> ${stats.remaining}</p>`;
    infoHTML += '</div>';
    
    if (incorrectQuestions.size > 0) {
        infoHTML += '<div class="warning">';
            infoHTML += `<p><strong>Atención:</strong> Tienes ${incorrectQuestions.size} pregunta(s) incorrecta(s) que debes repasar en tu próximo cuestionario.</p>`;
        infoHTML += '</div>';
    }
    
    modalInfoContent.innerHTML = infoHTML;
}

/**
 * Mostrar modal de información
 */
function showInfoModal() {
    displayProgressInfo();
    infoModal.style.display = 'flex';
}

/**
 * Cerrar modal de información
 */
function closeInfoModal() {
    infoModal.style.display = 'none';
}

/**
 * Mostrar la pregunta actual en pantalla
 */
function displayQuestion() {
    if (currentQuestionIndex >= currentQuizQuestions.length) {
        showFinalScreen();
        return;
    }

    // Obtener pregunta actual
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    
    // Actualizar texto de la pregunta con categoría
    questionText.innerHTML = `<span class="category-tag">Categoría: ${currentQuestion.category}</span><br>${currentQuestion.question}`;
    
    // Actualizar número de pregunta
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    
    // Mostrar imagen si existe
    const existingImage = document.getElementById('question-image');
    if (existingImage) {
        existingImage.remove();
    }
    
    if (currentQuestion.image) {
        const img = document.createElement('img');
        img.id = 'question-image';
        img.className = 'question-image';
        img.src = currentQuestion.image;
        img.alt = 'Imagen de la pregunta';
        img.loading = 'lazy'; // Lazy loading para optimizar carga
        questionText.parentElement.appendChild(img);
    }
    
    // Limpiar contenedor de respuestas
    answersContainer.innerHTML = '';
    
    // Determinar tipo de pregunta
    const questionType = currentQuestion.type || 'multiple-choice';
    
    if (questionType === 'text-input') {
        // Crear campo de texto para respuesta
        const inputContainer = document.createElement('div');
        inputContainer.className = 'text-input-container';
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.id = 'text-answer-input';
        textInput.className = 'text-answer-input';
        textInput.placeholder = 'Escribe tu respuesta aquí...';
        textInput.maxLength = 50;
        
        // Habilitar botón cuando se escriba algo
        textInput.addEventListener('input', () => {
            verifyBtn.disabled = textInput.value.trim().length === 0;
            selectedAnswer = textInput.value.trim();
        });
        
        // Permitir Enter para verificar
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !verifyBtn.disabled) {
                verifyAnswer();
            }
        });
        
        inputContainer.appendChild(textInput);
        answersContainer.appendChild(inputContainer);
        
        // Auto-focus en el input
        setTimeout(() => textInput.focus(), 100);
        
    } else {
        // Preguntas de opción múltiple (comportamiento actual)
        const shuffledAnswers = shuffleArray(currentQuestion.answers);
        
        shuffledAnswers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.textContent = answer.option;
            answerDiv.dataset.correct = answer.correct || false;
            answerDiv.dataset.index = index;
            
            answerDiv.addEventListener('click', () => selectAnswer(answerDiv));
            
            answersContainer.appendChild(answerDiv);
        });
    }
    
    // Resetear estado de los botones
    selectedAnswer = null;
    verifyBtn.style.display = 'block';
    verifyBtn.disabled = true;
    nextBtn.style.display = 'none';
    feedback.style.display = 'none';
}

/**
 * Manejar selección de respuesta
 * @param {HTMLElement} answerElement - Elemento de respuesta seleccionado
 */
function selectAnswer(answerElement) {
    // Solo permitir selección si no se ha verificado aún
    if (selectedAnswer && selectedAnswer.classList.contains('disabled')) {
        return;
    }
    
    // Remover selección anterior
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Marcar nueva selección
    answerElement.classList.add('selected');
    selectedAnswer = answerElement;
    
    // Habilitar botón de verificar
    verifyBtn.disabled = false;
}

/**
 * Verificar la respuesta seleccionada
 */
function verifyAnswer() {
    if (!selectedAnswer) return;
    
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const questionType = currentQuestion.type || 'multiple-choice';
    let isCorrect = false;
    
    if (questionType === 'text-input') {
        // Verificar respuesta de texto
        const textInput = document.getElementById('text-answer-input');
        const userAnswer = textInput.value.trim().toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,]/g, '');
        const correctAnswer = currentQuestion.correctAnswer.toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,]/g, '');
        
        isCorrect = userAnswer === correctAnswer;
        
        // Deshabilitar input
        textInput.disabled = true;
        textInput.classList.add(isCorrect ? 'correct-input' : 'incorrect-input');
        
        if (isCorrect) {
            feedback.textContent = '¡Excelente! 🎉 ¡Respuesta correcta!';
            feedback.className = 'correct';
            score++;
            scoreDisplay.textContent = score;
            
            launchConfetti();
            playSuccessSound();
        } else {
            feedback.textContent = `❌ Respuesta incorrecta. La respuesta correcta es: ${currentQuestion.correctAnswer}`;
            feedback.className = 'incorrect';
            playErrorSound();
        }
        
    } else {
        // Verificar respuesta de opción múltiple
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.add('disabled');
        });
        
        isCorrect = selectedAnswer.dataset.correct === 'true';
        
        if (isCorrect) {
            selectedAnswer.classList.add('correct');
            feedback.textContent = '¡Excelente! 🎉 ¡Respuesta correcta!';
            feedback.className = 'correct';
            score++;
            scoreDisplay.textContent = score;
            
            launchConfetti();
            playSuccessSound();
        } else {
            selectedAnswer.classList.add('incorrect');
            
            const correctAnswer = Array.from(document.querySelectorAll('.answer-option'))
                .find(option => option.dataset.correct === 'true');
            
            if (correctAnswer) {
                correctAnswer.classList.add('correct');
            }
            
            feedback.textContent = `Ups... La respuesta correcta era:\n${correctAnswer.textContent}`;
            feedback.className = 'incorrect';
            
            playErrorSound();
        }
    }
    
    // Guardar resultado en sessionStorage
    saveQuestionResult(currentQuestion.id, isCorrect);
    
    // Mostrar retroalimentación
    feedback.style.display = 'block';
    
    // Ocultar botón de verificar y mostrar botón de siguiente
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

/**
 * Avanzar a la siguiente pregunta
 */
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

/**
 * Mostrar pantalla final con resultados
 */
function showFinalScreen() {
    quizContainer.style.display = 'none';
    finalScreen.style.display = 'block';
    
    const percentage = Math.round((score / currentQuizQuestions.length) * 100);
    const stats = getProgressStats();
    
    let message = `
        <p>Obtuviste <strong>${score}</strong> de <strong>${currentQuizQuestions.length}</strong> respuestas correctas</p>
        <p style="font-size: 2rem; margin-top: 15px;">${percentage}%</p>
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h3>📊 Tu Progreso General</h3>
            <p>Total de preguntas en el banco: <strong>${stats.total}</strong></p>
            <p>Preguntas respondidas: <strong>${stats.answered}</strong></p>
            <p>Preguntas restantes: <strong style="color: #4ecdc4;">${stats.remaining}</strong></p>
    `;
    
    if (stats.incorrect > 0) {
        message += `<p style="color: #ff6b6b;">Preguntas para repasar: <strong>${stats.incorrect}</strong></p>`;
    }
    
    message += `</div>`;
    
    if (stats.remaining > 0 || stats.incorrect > 0) {
        message += `<p style="margin-top: 15px; color: #666;">💡 ¡Puedes hacer otro cuestionario!</p>`;
    } else {
        message += `<p style="margin-top: 15px; color: #4ecdc4;">🎉 ¡Has completado todas las preguntas! Presiona "Reiniciar Todo" para comenzar de nuevo.</p>`;
    }
    
    finalScoreDisplay.innerHTML = message;
    
    // Confeti final si obtiene buen puntaje
    if (percentage >= 70) {
        launchConfetti();
        playSuccessSound();
    }
    
    // Cambiar texto del botón según el estado
    if (stats.remaining === 0 && stats.incorrect === 0) {
        restartBtn.textContent = 'Reiniciar Todo';
    } else {
        restartBtn.textContent = 'Nuevo Cuestionario';
    }
}

/**
 * Reiniciar el cuestionario
 */
function restartQuiz() {
    const stats = getProgressStats();
    
    // Si no hay más preguntas, resetear progreso
    if (stats.remaining === 0 && stats.incorrect === 0) {
        if (confirm('¿Deseas reiniciar todo tu progreso y comenzar desde cero?')) {
            resetProgress();
        }
    }
    
    // Reiniciar variables
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = '0';
    
    // Seleccionar nuevas preguntas
    currentQuizQuestions = selectQuestions();
    totalQuestionsDisplay.textContent = currentQuizQuestions.length;
    
    finalScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    
    displayQuestion();
}

/**
 * Efecto de confeti usando canvas
 */
function launchConfetti() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff'];
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    let frameCount = 0;
    const maxFrames = 150;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();
            
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.rotation += particle.rotationSpeed;
            
            // Aplicar gravedad
            particle.speedY += 0.1;
        });
        
        frameCount++;
        
        if (frameCount < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

/**
 * Reproducir sonido de éxito usando Web Audio API
 */
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // Do
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Segunda nota
    setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.frequency.value = 659.25; // Mi
        oscillator2.type = 'sine';
        
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
    }, 100);
}

/**
 * Reproducir sonido de error usando Web Audio API
 */
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Event Listeners
verifyBtn.addEventListener('click', verifyAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
infoBtn.addEventListener('click', showInfoModal);
closeModal.addEventListener('click', closeInfoModal);

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        closeInfoModal();
    }
});

// Ajustar tamaño del canvas al redimensionar la ventana
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Limpiar sesión
const clearSessionLink = document.getElementById('clear-session-link');
if (clearSessionLink) {
    clearSessionLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm('¿Estás seguro de que quieres limpiar toda la sesión? Se perderá todo tu progreso.')) {
            resetProgress();
            location.reload();
        }
    });
}

// Inicializar la aplicación
loadQuestions();
