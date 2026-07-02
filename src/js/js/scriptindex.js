/**
 * scriptindex.js
 * Contiene la lógica para la navegación móvil (menú hamburguesa)
 * y el dropdown de enlaces.
 */

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Lógica del Menú Hamburguesa ---
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.getElementById('nav-menu');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', function () {
            // Alterna la clase 'active' para mostrar/ocultar el menú
            navMenu.classList.toggle('active');
            
            // Actualiza el atributo ARIA para accesibilidad
            const isExpanded = navMenu.classList.contains('active');
            menuIcon.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Lógica del Dropdown de Enlaces ---
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;

    if (dropdown && toggle) {
        // Manejo del click para abrir/cerrar el dropdown
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Alterna la clase 'open'
            dropdown.classList.toggle('open');
            
            // Actualiza el atributo ARIA
            toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        });

        // Manejo del click fuera del dropdown para cerrarlo
        document.addEventListener('click', function (e) {
            // Si el click no fue dentro del dropdown y el dropdown está abierto
            if (!dropdown.contains(e.target) && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Manejo de teclado para accesibilidad (abrir con Enter/Espacio/Flecha abajo)
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Abre el dropdown
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                
                // Mueve el foco al primer elemento del dropdown
                const firstItem = dropdown.querySelector('.dropdown-item');
                if (firstItem) firstItem.focus();
            }
        });
    }
    
    // --- 3. Script Adicional (Ralentizar Video) ---
    var video = document.querySelector('.banner-video');
    if (video) {
        video.playbackRate = 0.5; // Ralentiza el video a la mitad de su velocidad normal
    }
});