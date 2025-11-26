// js/servicios.js

// 1. Definimos los datos (La "Base de Datos" en el Frontend)
const dataServicios = [
    {
        id: 1,
        titulo: "Soporte Técnico",
        icono: "fas fa-wrench", // Clase de FontAwesome (si usas iconos)
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
    }
    {
        id: 4,
        titulo: "Desarrollo Web",
        icono: "fa-solid fa-laptop-code",
        descripcion:"Aprende HTML, CSS, JavaScript y más. Contenido interactivo para todos los niveles."
    }
    // ¡Agrega aquí el resto de tus servicios!
];

// Solo para probar que funciona:
console.log("Servicios cargados:", dataServicios);