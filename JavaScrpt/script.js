/**
 * Aplicación Web Moderna - JavaScript
 * Gestión de navegación, interacciones y funcionalidades del sitio
 */

class ModernWebApp {
    constructor() {
        this.init();
    }

    init() {
        this.initEventListeners();
        this.initScrollEffects();
        this.initNavigation();
        this.initAnimations();
        this.initPerformanceOptimizations();
    }

    /**
     * Inicializa todos los event listeners
     */
    initEventListeners() {
        // Event listener para cuando el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMContentLoaded();
        });

        // Event listener para scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16)); // ~60fps

        // Event listener para resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Event listeners para teclado (accesibilidad)
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    /**
     * Maneja el evento DOMContentLoaded
     */
    handleDOMContentLoaded() {
        this.initMobileMenu();
        this.initScrollToTop();
        this.initSmoothScrolling();
        this.initFormValidation();
        this.initLazyLoading();
        
        // Mostrar contenido con animación
        this.showContent();
    }

    /**
     * Inicializa el menú móvil hamburguesa
     */
    initMobileMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const navButtons = document.querySelector('.nav-buttons');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!menuIcon || !navButtons) return;

        // Toggle del menú hamburguesa
        menuIcon.addEventListener('click', () => {
            this.toggleMobileMenu(menuIcon, navButtons);
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(menuIcon, navButtons);
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navButtons.classList.contains('active')) {
                this.closeMobileMenu(menuIcon, navButtons);
            }
        });

        // Cerrar menú con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navButtons.classList.contains('active')) {
                this.closeMobileMenu(menuIcon, navButtons);
            }
        });
    }

    /**
     * Toggle del menú móvil
     */
    toggleMobileMenu(menuIcon, navButtons) {
        const isActive = menuIcon.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu(menuIcon, navButtons);
        } else {
            this.openMobileMenu(menuIcon, navButtons);
        }
    }

    /**
     * Abre el menú móvil
     */
    openMobileMenu(menuIcon, navButtons) {
        menuIcon.classList.add('active');
        navButtons.classList.add('active');
        menuIcon.setAttribute('aria-expanded', 'true');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Focus en el primer enlace para accesibilidad
        const firstLink = navButtons.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }

    /**
     * Cierra el menú móvil
     */
    closeMobileMenu(menuIcon, navButtons) {
        menuIcon.classList.remove('active');
        navButtons.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }

    /**
     * Inicializa el botón "Volver al inicio"
     */
    initScrollToTop() {
        const scrollToTopBtn = document.querySelector('#scrollToTopBtn');
        if (!scrollToTopBtn) return;

        scrollToTopBtn.addEventListener('click', () => {
            this.scrollToTop();
        });

        // Mostrar/ocultar según scroll
        this.toggleScrollToTopButton();
    }

    /**
     * Scroll suave hacia arriba
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Toggle del botón scroll to top
     */
    toggleScrollToTopButton() {
        const scrollToTopBtn = document.querySelector('#scrollToTopBtn');
        if (!scrollToTopBtn) return;

        const scrollThreshold = 300;
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    }

    /**
     * Inicializa scroll suave para enlaces internos
     */
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Compensar navbar fixed
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Maneja el evento scroll
     */
    handleScroll() {
        this.toggleScrollToTopButton();
        this.updateNavbarOnScroll();
        this.handleScrollAnimations();
    }

    /**
     * Actualiza la navbar según el scroll
     */
    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const scrolled = window.pageYOffset > 50;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }

    /**
     * Inicializa efectos de scroll
     */
    initScrollEffects() {
        // Intersection Observer para animaciones al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos animables
        const animatableElements = document.querySelectorAll('.service-card, .education-item, .section-title');
        animatableElements.forEach(el => observer.observe(el));
    }

    /**
     * Maneja animaciones durante el scroll
     */
    handleScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect en hero banner
        const heroBanner = document.querySelector('.hero-banner');
        if (heroBanner) {
            heroBanner.style.transform = `translateY(${rate}px)`;
        }
    }

    /**
     * Inicializa la navegación
     */
    initNavigation() {
        // Highlight active section en navbar
        this.updateActiveNavLink();
        
        // Event listener para actualizar nav activo
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavLink();
        }, 100));
    }

    /**
     * Actualiza el enlace activo en la navegación
     */
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Inicializa animaciones
     */
    initAnimations() {
        // Añadir clase para animaciones CSS
        document.body.classList.add('animations-enabled');
        
        // Stagger animations para elementos similares
        this.staggerAnimations('.service-card', 100);
        this.staggerAnimations('.education-item', 150);
    }

    /**
     * Crea animaciones escalonadas
     */
    staggerAnimations(selector, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
        });
    }

    /**
     * Maneja eventos de teclado para accesibilidad
     */
    handleKeyboard(e) {
        // Navegación con Tab más fluida
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Remover clase después de click
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        }, { once: true });
    }

    /**
     * Maneja el evento resize
     */
    handleResize() {
        // Cerrar menú móvil si se cambia a desktop
        if (window.innerWidth > 768) {
            const menuIcon = document.querySelector('.menu-icon');
            const navButtons = document.querySelector('.nav-buttons');
            
            if (menuIcon && navButtons) {
                this.closeMobileMenu(menuIcon, navButtons);
            }
        }
        
        // Recalcular posiciones para animaciones
        this.updateScrollAnimations();
    }

    /**
     * Actualiza animaciones después de resize
     */
    updateScrollAnimations() {
        // Forzar recálculo de intersection observer
        const animatedElements = document.querySelectorAll('.animate-in');
        animatedElements.forEach(el => {
            el.classList.remove('animate-in');
            // Trigger reflow
            el.offsetHeight;
        });
        
        // Re-trigger animations
        setTimeout(() => {
            this.initScrollEffects();
        }, 100);
    }

    /**
     * Inicializa validación de formularios
     */
    initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }

    /**
     * Valida un formulario completo
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Valida un campo individual
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Validación required
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Validación email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }
        
        // Validación teléfono
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
        }
        
        // Mostrar/ocultar error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    /**
     * Muestra error en un campo
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    /**
     * Limpia error de un campo
     */
    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Inicializa lazy loading para imágenes
     */
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Inicializa optimizaciones de rendimiento
     */
    initPerformanceOptimizations() {
        // Prefetch de recursos importantes
        this.prefetchResources();
        
        // Optimizar imágenes
        this.optimizeImages();
        
        // Lazy load de recursos no críticos
        this.lazyLoadResources();
    }

    /**
     * Prefetch de recursos críticos
     */
    prefetchResources() {
        const criticalResources = [
            '/estilos/estilos.css',
            '/imagenes/DELANOYS-TECNOLOGI@S (1300 x 600 px) (1300 x 600 px) (1300 x 600 px).gif'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    /**
     * Optimiza carga de imágenes
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Añadir loading lazy si no está definido
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
            
            // Optimizar decode
            img.decoding = 'async';
        });
    }

    /**
     * Lazy load de recursos no críticos
     */
    lazyLoadResources() {
        // Cargar scripts no críticos después del load
        window.addEventListener('load', () => {
            this.loadNonCriticalScripts();
        });
    }

    /**
     * Carga scripts no críticos
     */
    loadNonCriticalScripts() {
        const nonCriticalScripts = [
            // Analytics, chat widgets, etc.
        ];
        
        nonCriticalScripts.forEach(scriptSrc => {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);
        });
    }

    /**
     * Muestra el contenido con animación
     */
    showContent() {
        document.body.classList.add('loaded');
        
        // Trigger animations
        setTimeout(() => {
            const animatableElements = document.querySelectorAll('[data-aos]');
            animatableElements.forEach(el => {
                el.classList.add('aos-animate');
            });
        }, 100);
    }

    /**
     * Función throttle para optimizar eventos
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Función debounce para optimizar eventos
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Manejo de errores global
     */
    handleError(error, context = 'General') {
        console.error(`Error en ${context}:`, error);
        
        // En producción, enviar errores a servicio de monitoreo
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    /**
     * Destructor para limpiar event listeners
     */
    destroy() {
        // Remover event listeners si es necesario
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeyboard);
    }
}

// Inicializar la aplicación
const app = new ModernWebApp();

// Manejar errores no capturados
window.addEventListener('error', (e) => {
    app.handleError(e.error, 'Window Error');
});

window.addEventListener('unhandledrejection', (e) => {
    app.handleError(e.reason, 'Unhandled Promise Rejection');
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernWebApp;
}