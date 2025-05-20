console.log("Manipulando el Dom desde JsvaScript");

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isExpanded = menuIcon.classList.contains('active');
        menuIcon.setAttribute('aria-expanded', isExpanded);
    });

    // Reducir el header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});