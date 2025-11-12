// slideshow.js - Lógica del carrusel para ICC Central
// Autor: Grok (optimizado para rendimiento y UX)

const imageUrls = Array.from({length: 19}, (_, i) => `/imagenes/icc/img${i + 1}.jpg`);

let slideIndex = 1;
let autoPlayTimer;
let isPlaying = true;

// Pre-cargar imágenes para mejor rendimiento
imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Función principal para mostrar slides
function showSlides(n) {
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (slides.length === 0) return;

    clearTimeout(autoPlayTimer);
    isPlaying = false; // Pausa en interacción manual

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => slide.style.display = 'none');
    Array.from(dots).forEach(dot => dot.classList.remove('active-dot'));

    slides[slideIndex - 1].style.display = 'block';
    if (dots.length > 0) dots[slideIndex - 1].classList.add('active-dot');
}

// Navegación manual
function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

// Autoplay
function autoShowSlides() {
    if (!isPlaying) return;
    const slides = document.getElementsByClassName('mySlides');
    if (slides.length === 0) return;
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    showSlides(slideIndex);
    autoPlayTimer = setTimeout(autoShowSlides, 5000); // 5 segundos
}

// Construir slideshow dinámicamente
function buildSlideshow() {
    const container = document.getElementById('dynamic-slides');
    const dotsContainer = document.getElementById('dots-container');

    if (!container || !dotsContainer) return;

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Crear slides
    imageUrls.forEach((url, idx) => {
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Foto del equipo ICC Central: Momento clave ${idx + 1} en unión y fe`;
        slide.appendChild(img);
        // Caption opcional (descomenta y agrega lógica si necesitas)
        // const cap = document.createElement('div');
        // cap.className = 'caption';
        // cap.textContent = `Momento ${idx + 1}`;
        // slide.appendChild(cap);
        container.appendChild(slide);
    });

    // Crear dots
    for (let i = 1; i <= imageUrls.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.setAttribute('onclick', `currentSlide(${i})`);
        dot.setAttribute('aria-label', `Ir al slide ${i}`);
        dotsContainer.appendChild(dot);
    }

    showSlides(slideIndex);
    autoPlayTimer = setTimeout(autoShowSlides, 5000);
}

// Eventos para pausa en hover/focus
const slideshow = document.getElementById('hero-gallery');
if (slideshow) {
    slideshow.addEventListener('mouseenter', () => isPlaying = false);
    slideshow.addEventListener('mouseleave', () => { 
        isPlaying = true; 
        autoPlayTimer = setTimeout(autoShowSlides, 5000); 
    });
    slideshow.addEventListener('focusin', () => isPlaying = false);
    slideshow.addEventListener('focusout', () => { 
        isPlaying = true; 
        autoPlayTimer = setTimeout(autoShowSlides, 5000); 
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', buildSlideshow);