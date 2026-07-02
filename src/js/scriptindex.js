/**
 * scriptindex.js
 * Contiene la lógica para la navegación móvil (menú hamburguesa), dropdown y resaltado de sección.
 */

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const dropdownItems = Array.from(document.querySelectorAll('.dropdown-item'));
    const sections = [
        { id: 'inicio', link: document.querySelector('.nav-link[href="#inicio"]') },
        { id: 'servicios', link: document.querySelector('.nav-link[href="#servicios"]') },
        { id: 'ruta-full-stack', link: document.querySelector('.nav-link[href="#ruta-full-stack"]') },
        { id: 'educacion', link: document.querySelector('.nav-link[href="#educacion"]') },
        { id: 'proyectos-destacados', link: document.querySelector('.nav-link[href="#proyectos-destacados"]') },
        { id: 'contacto', link: document.querySelector('.nav-link[href="#contacto"]') }
    ];

    function closeMenu() {
        if (navMenu && menuIcon) {
            navMenu.classList.remove('open');
            menuIcon.classList.remove('open');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    }

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            menuIcon.classList.toggle('open', isOpen);
            menuIcon.setAttribute('aria-expanded', isOpen);
        });

        navMenu.addEventListener('click', function (event) {
            const link = event.target.closest('.nav-link, .dropdown-item');
            if (link && !link.classList.contains('dropdown-toggle')) {
                closeMenu();
            }
        });
    }

    if (dropdown && toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });

        toggle.addEventListener('keydown', function (e) {
            if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
                e.preventDefault();
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                const firstItem = dropdown.querySelector('.dropdown-item');
                if (firstItem) firstItem.focus();
            }
        });
    }

    function setActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;

        sections.forEach(function (sectionObj) {
            const section = document.getElementById(sectionObj.id);
            const link = sectionObj.link;
            if (!section || !link) return;
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
                navLinks.forEach(item => item.classList.remove('current'));
                link.classList.add('current');
            }
        });
    }

    function throttle(fn, wait) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= wait) {
                last = now;
                fn.apply(this, args);
            }
        };
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', throttle(function () {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        setActiveLink();
    }, 100));

    if (sections.some(s => s.link)) {
        setActiveLink();
    }

    navLinks.concat(dropdownItems).forEach(link => {
        link.addEventListener('focus', function () {
            link.classList.add('current');
        });
        link.addEventListener('blur', function () {
            setActiveLink();
        });
    });

    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const video = document.querySelector('.banner-video');
    if (video) {
        video.playbackRate = 0.5;
    }
});