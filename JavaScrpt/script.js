document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // Menú hamburguesa
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isExpanded = menuIcon.classList.contains('active');
            menuIcon.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Reducir el header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Carga dinámica de contenido para el aside
    const temaLinks = document.querySelectorAll('.temas a[data-tema]');
    const mainContent = document.querySelector('main.contenido');

    if (temaLinks && mainContent) {
        const contenidoTemas = {
            info: {
                titulo: '¿Quiénes Somos?',
                texto: 'Somos expertos en servicio técnico de PC, con un equipo altamente capacitado para resolver todas tus necesidades tecnológicas. Nuestro soporte especializado convierte tu infraestructura en una herramienta estratégica, confiable y eficiente para potenciar tu trabajo.'
            },
            mantenimiento: {
                titulo: 'Mantenimiento y Reparación de Computadores',
                texto: 'Ofrecemos servicios de mantenimiento preventivo y correctivo para computadoras, asegurando un rendimiento óptimo y prolongando la vida útil de tus equipos.'
            },
            ofimatica: {
                titulo: 'Ofimática',
                texto: 'Capacitaciones y soporte en herramientas de ofimática como Microsoft Office, Google Workspace y más, para optimizar tu productividad.'
            },
            redes: {
                titulo: 'Redes Domésticas',
                texto: 'Configuramos y optimizamos redes domésticas para garantizar una conexión estable y segura en tu hogar.'
            },
            tecnologia: {
                titulo: 'Asesoría en Compra de Tecnología',
                texto: 'Te ayudamos a elegir los mejores dispositivos y soluciones tecnológicas según tus necesidades y presupuesto.'
            },
            impresoras: {
                titulo: 'Mantenimiento y Reparación de Impresoras',
                texto: 'Reparamos y mantenemos impresoras de todas las marcas, asegurando impresiones de calidad y un funcionamiento eficiente.'
            },
            html: {
                titulo: 'HTML Básico',
                texto: 'Aprende los fundamentos de HTML para crear estructuras de páginas web semánticas y accesibles.'
            },
            css: {
                titulo: 'CSS Básico',
                texto: 'Domina los conceptos básicos de CSS para estilizar tus páginas web y hacerlas visualmente atractivas.'
            },
            flexbox: {
                titulo: 'Flexbox',
                texto: 'Explora CSS Flexbox para crear layouts flexibles y responsivos con facilidad.'
            },
            grid: {
                titulo: 'Diseño con Grid',
                texto: 'Aprende CSS Grid para diseñar interfaces complejas y adaptables con un control preciso.'
            },
            semantica: {
                titulo: 'Estructuras Semánticas',
                texto: 'Descubre cómo usar elementos semánticos de HTML5 para mejorar la accesibilidad y el SEO.'
            },
            javascript: {
                titulo: 'JavaScript',
                texto: 'Iníciate en JavaScript para añadir interactividad y dinamismo a tus páginas web.'
            },
            'informatica-primaria': {
                titulo: 'Informática Primaria',
                texto: 'Programas educativos para enseñar informática básica a estudiantes de primaria, fomentando habilidades digitales.'
            },
            'informatica-secundaria': {
                titulo: 'Informática Secundaria',
                texto: 'Cursos avanzados de informática para estudiantes de secundaria, incluyendo programación y herramientas digitales.'
            },
            'inteligencia-artificial': {
                titulo: 'Inteligencia Artificial',
                texto: 'Introducción a la inteligencia artificial, explorando conceptos y aplicaciones prácticas en la educación.'
            }
        };

        temaLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tema = link.dataset.tema;
                const contenido = contenidoTemas[tema];

                if (contenido) {
                    mainContent.innerHTML = `
                        <h2>${contenido.titulo}</h2>
                        <p>${contenido.texto}</p>
                    `;
                }
            });
        });
    }
});

// const scrollBtn = document.getElementById('scrollToTopBtn');

//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 200) {
//       scrollBtn.classList.remove('hidden');
//     } else {
//       scrollBtn.classList.add('hidden');
//     }
//   });