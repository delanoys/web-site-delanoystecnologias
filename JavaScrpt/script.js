document.addEventListener('DOMContentLoaded', () => {
    // Control del menú hamburguesa
    const menuIcon = document.querySelector('.nav-container .menu-icon');
    const navButtons = document.querySelector('.nav-buttons');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navButtons.classList.toggle('active');
        menuIcon.setAttribute('aria-expanded', menuIcon.classList.contains('active'));
    });

    // Control del botón "Volver al inicio"
    const scrollToTopBtn = document.querySelector('#scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });
});