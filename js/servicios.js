// js/servicios.js
const dataServicios = [
    {
        id: 1,
        titulo: "Soporte Técnico",
        icono: "fas fa-wrench",
        descripcion: "Mantenimiento preventivo y correctivo para equipos de cómputo, portátiles e impresoras."
    },
    {
        id: 2,
        titulo: "Redes y Conectividad",
        icono: "fas fa-network-wired",
        descripcion: "Diseño e implementación de cableado estructurado y configuración de redes WiFi."
    },
    {
        id: 3,
        titulo: "CCTV y Vigilancia",
        icono: "fas fa-video",
        descripcion: "Instalación de cámaras de seguridad y monitoreo remoto para hogares y empresas."
    },
    {
        id: 4,
        titulo: "Desarrollo Web",
        icono: "fas fa-laptop-code",
        descripcion: "Diseño y desarrollo de sitios web modernos y responsivos para tu negocio."
    },
    {
        id: 5,
        titulo: "Reparación de Computadores",
        icono: "fas fa-desktop",
        descripcion: "Diagnóstico y reparación de PC de escritorio y portátiles con garantía."
    },
    
    {
        id: 6,
        titulo: "Asistencia Remota",
        icono: "fas fa-headset",
        descripcion: "Soporte técnico a distancia a través de sistemas seguros y confiables."
    },
  
    {
        id: 7,
        titulo: "Asesoría Tecnológica",
        icono: "fas fa-comments",
        descripcion: "Consultoría gratuita en compra de equipos y soluciones tecnológicas."
    },
    {
        id: 8,
        titulo: "Telecomunicaciones",
        icono: "fas fa-phone-alt",
        descripcion: "Instalación y configuración de sistemas de comunicación empresarial."
    },
  
    {
        id: 9,
        titulo: "Mantenimiento de Impresoras",
        icono: "fas fa-print",
        descripcion: "Servicio técnico y mantenimiento para impresoras láser y de tinta."
    },
    {
        id: 10,
        titulo: "Capacitaciones Tecnológicas",
        icono: "fas fa-chalkboard-teacher",
        descripcion: "Formación en el uso de nuevas tecnologías para empresas y personas."
    },
    {
        id: 11,
        titulo: "Automatización con IA",
        icono: "fas fa-robot",
        descripcion: "Implementación de herramientas de IA para automatizar procesos empresariales."
    },
    {
        id: 12,
        titulo: "Recuperación de Datos",
        icono: "fas fa-hdd",
        descripcion: "Rescate de información perdida en discos duros y dispositivos de almacenamiento."
    },
    
];
// ... (Arriba debe estar tu array 'dataServicios' con los 20 ítems) ...

function renderizarServicios() {
    const contenedor = document.getElementById('contenedor-servicios');

    if (!contenedor) return; 

    const tarjetasHTML = dataServicios.map(servicio => `
        <article class="service-card" tabindex="0">
            <div class="service-icon">
                <i class="${servicio.icono}"></i>
            </div>
            <h3 class="service-title">${servicio.titulo}</h3>
            <p class="service-description">
                ${servicio.descripcion}
            </p>
            <a href="#contacto" class="service-link">Solicitar info</a>
        </article>
    `).join('');

    contenedor.innerHTML = tarjetasHTML;
}

// Ejecutar
renderizarServicios();