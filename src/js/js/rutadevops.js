/* ================================================= */
/* LÓGICA DE LA RUTA DE APRENDIZAJE INTERACTIVA      */
/* Archivo: js/rutadevops.js                         */
/* ================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica del Acordeón (Sin cambios) ---
    const phaseHeaders = document.querySelectorAll('.phase-header');

    phaseHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon i');
            
            // Toggle de la clase 'active' en el header y el contenido
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                // Si está activo, lo cerramos
                header.classList.remove('active');
                content.classList.remove('active');
                content.setAttribute('aria-hidden', 'true');
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                // Si no está activo, lo abrimos
                header.classList.add('active');
                content.classList.add('active');
                content.setAttribute('aria-hidden', 'false');
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // --- 2. Lógica de Progreso de la Ruta (Ajuste para decimales) ---

    const cards = document.querySelectorAll('.step-card');
    const totalHorasElement = document.getElementById('total-horas-completadas');
    const generalProgressFill = document.getElementById('general-progress-fill');
    const progressPercentageText = document.getElementById('progress-percentage');
    
    // Usar parseFloat para manejar decimales en la duración de las horas
    const totalRouteHours = Array.from(cards).reduce((sum, card) => {
        // Corrección: Usar parseFloat
        return sum + parseFloat(card.getAttribute('data-horas') || 0);
    }, 0);

    /**
     * Calcula y actualiza el progreso visual y los totales.
     */
    function updateProgress() {
        let totalHoursCompleted = 0;

        cards.forEach(card => {
            // Corrección: Usar parseFloat
            const horasMax = parseFloat(card.getAttribute('data-horas'));
            // Corrección: Usar parseFloat al cargar el progreso actual
            let horasActuales = parseFloat(card.getAttribute('data-progress'));
            
            // Elementos de la tarjeta
            const progressFill = card.querySelector('.progress-bar-fill-step');
            const progressText = card.querySelector('.step-progress-text');
            const hoursCompletedSpan = card.querySelector('.hours-completed');

            // Asegurar que las horas estén dentro del rango [0, horasMax]
            horasActuales = Math.min(Math.max(0, horasActuales), horasMax);
            
            // Redondear el porcentaje
            const percentage = Math.round((horasActuales / horasMax) * 100);

            // Actualizar el progreso visual de la tarjeta
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}%`;
            // Redondear a un decimal para la visualización de horas (opcional)
            hoursCompletedSpan.textContent = horasActuales.toFixed(1); 
            
            // Aplicar clases de estado
            card.classList.remove('completed', 'in-progress');
            if (percentage === 100) {
                card.classList.add('completed');
            } else if (percentage > 0) {
                card.classList.add('in-progress');
            }

            // Acumular el total
            totalHoursCompleted += horasActuales;
        });

        // --- Actualizar Progreso General ---
        const generalPercentage = Math.round((totalHoursCompleted / totalRouteHours) * 100);
        
        // Mostrar el total de horas completadas con un decimal
        totalHorasElement.textContent = totalHoursCompleted.toFixed(1); 
        progressPercentageText.textContent = `${generalPercentage}%`;
        generalProgressFill.style.width = `${generalPercentage}%`;
        generalProgressFill.textContent = `${generalPercentage}%`;
        
        // Almacenar el progreso en el almacenamiento local (simulación de persistencia)
        saveProgress();
    }
    
    /**
     * Guarda el progreso actual en el almacenamiento local.
     */
    function saveProgress() {
        const progressData = {};
        cards.forEach((card, index) => {
             // Corrección: Usar parseFloat para guardar decimales
            progressData[`step-${index}`] = parseFloat(card.getAttribute('data-progress'));
        });
        localStorage.setItem('devopsRouteProgress', JSON.stringify(progressData));
    }
    
    /**
     * Carga el progreso desde el almacenamiento local al inicio.
     */
    function loadProgress() {
        const savedProgress = localStorage.getItem('devopsRouteProgress');
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            cards.forEach((card, index) => {
                const hours = progressData[`step-${index}`];
                if (hours !== undefined) {
                    // El valor guardado ya es float, se establece directamente
                    card.setAttribute('data-progress', hours);
                }
            });
        }
    }

    // --- 3. Manejo de Botones de Incremento/Decremento ---
    cards.forEach(card => {
        const btnIncrement = card.querySelector('.btn-increment');
        const btnDecrement = card.querySelector('.btn-decrement');
        // Corrección: Usar parseFloat
        const horasMax = parseFloat(card.getAttribute('data-horas'));
        
        btnIncrement.addEventListener('click', () => {
            // Corrección: Usar parseFloat
            let horasActuales = parseFloat(card.getAttribute('data-progress'));
            // Incremento de 0.5 horas para permitir el manejo de decimales más finos
            horasActuales = Math.min(horasMax, horasActuales + 0.5); 
            card.setAttribute('data-progress', horasActuales);
            updateProgress();
        });

        btnDecrement.addEventListener('click', () => {
            // Corrección: Usar parseFloat
            let horasActuales = parseFloat(card.getAttribute('data-progress'));
            // Decremento de 0.5 horas
            horasActuales = Math.max(0, horasActuales - 0.5); 
            card.setAttribute('data-progress', horasActuales);
            updateProgress();
        });
    });

    // Iniciar la lógica
    loadProgress(); // Cargar progreso guardado al inicio
    updateProgress(); // Calcular y mostrar el progreso inicial
});