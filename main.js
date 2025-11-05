const correctAnswers = {
    p1: 'd', // Gestiona la transferencia de datos entre nodos en la misma red
    p2: 'b', // TCP
    p3: 'c', // Capa de Aplicación
    p4: 'a', // Capa de Red
    p5: 'a', // Transmisión de bits a través del medio
    p6: 'c', // Capa de Aplicación
    p7: 'b', // Router
    p8: 'a', // Capa de Presentación
    p9: 'd', // TCP
    p10: 'a' // Capa de Sesión
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateScore();
        });
    }
    
    showStoredResults();
});

function calculateScore() {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `p${i}`;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) {
            score++;
        }
    }
    
    const results = {
        score: score,
        totalQuestions: totalQuestions,
        percentage: (score / totalQuestions) * 100
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    window.location.href = 'Resultado.html';
}

function showStoredResults() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        const storedResults = localStorage.getItem('quizResults');
        if (storedResults) {
            const results = JSON.parse(storedResults);
            displayResults(results, resultsContainer);
        }
    }
}

function displayResults(results, container) {
    const { score, totalQuestions, percentage } = results;
    
    let message = '';
    let messageClass = '';
    
    if (percentage >= 80) {
        message = `¡Excelente!`;
        messageClass = 'excellent';
    } else if (percentage >= 60) {
        message = `¡Bien hecho!`;
        messageClass = 'good';
    } else {
        message = `¡Sigue practicando!`;
        messageClass = 'needs-improvement';
    }
    
    container.innerHTML = `
        <div class="result-message ${messageClass}">
            <h2>${message}</h2>
            <div class="score-display">
                <p class="score">Obtuviste: <span>${score}/${totalQuestions}</span></p>
                <p class="percentage">Porcentaje: <span>${percentage.toFixed(1)}%</span></p>
            </div>
        </div>
    `;
}