document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});


let slideIndex = 1;
showSlides(slideIndex);

// Control de siguiente/atrás
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Control de puntos
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// Cambio automático (opcional)
setInterval(() => {
    changeSlide(1);
}, 5000);