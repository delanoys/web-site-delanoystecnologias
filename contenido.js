{/* <script>
  const contenido = document.querySelector('.contenido');
  const enlaces = document.querySelectorAll('.temas a');

  const temas = {
    mantenimiento: `
      <h2>Mantenimiento de Computadores</h2>
      <p>Ofrecemos limpieza interna, cambio de pasta térmica, revisión de hardware, y más.</p>
    `,
    ofimatica: `
      <h2>Ofimática</h2>
      <p>Capacitamos en Word, Excel, PowerPoint y otras herramientas de oficina.</p>
    `,
    redes: `
      <h2>Redes Domésticas</h2>
      <p>Configuración de routers, redes Wi-Fi y cableado estructurado para hogares y pequeñas empresas.</p>
    `,
    html: `
      <h2>HTML Básico</h2>
      <p>Aprende a estructurar tu sitio web con etiquetas semánticas.</p>
    `,
    css: `
      <h2>CSS Básico</h2>
      <p>Aplica estilos visuales a tu sitio web, controla colores, márgenes y diseño.</p>
    `,
    flexbox: `
      <h2>Flexbox</h2>
      <p>Distribuye y alinea elementos con Flexbox para crear diseños flexibles.</p>
    `,
    grid: `
      <h2>Diseño con Grid</h2>
      <p>Organiza el diseño de tu sitio web con áreas definidas en una grilla.</p>
    `,
    semantica: `
      <h2>Estructuras Semánticas</h2>
      <p>Usa etiquetas como &lt;header&gt;, &lt;main&gt; y &lt;footer&gt; para dar significado a tu HTML.</p>
    `,
    javascript: `
      <h2>JavaScript</h2>
      <p>Agrega interactividad y lógica a tu sitio web con este poderoso lenguaje.</p>
    `
  };

  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      const tema = enlace.dataset.tema;
      contenido.innerHTML = temas[tema] || '<p>Contenido no disponible aún.</p>';
    });
  });
</script> */}


document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.querySelector('.contenido');
    const enlaces = document.querySelectorAll('.temas a');
  
    const temas = {

        info:  `
        <h2>Quienes Somos ? </h2>
        <p>Somos especialistas brindando servicio técnico de PC.
            Contamos con personal capacitado y atendemos todas las necesidades. 
           Nuestro servicio técnico de PC es apto para que su infraestructura tecnológica se transforme en una herramienta estratégica y de trabajo.</p>
        <br><br>
        <h2>Mision</h2>  
        <p>Brindamos Soluciones basadas en nuevas tecnologías, Soporte técnico , redes informáticas, mantenimiento de equipos de Computo (Pc, portátil, Tablet, celulares, impresoras), CCTV (circuito cerrado de televisión y vigilancia), diseño de sitios web, cloud computing y telecomunicaciones. 
            Nuestras  asesorías son Gratuitas </p>   
        <br><br>
        <h2>Vision</h2>  
        <p>Para el año 2030 convertirnos con la sabiduría y la dirección de Dios en la mas grande empresa de soporte asistencial para Hogares y Empresas, Brindando soluciones tecnológicas, soporte técnico especializado y capacitaciones  en el uso de nuevas tecnologías para el desarrollo de educativo, social y laboral  de nuestra patria Colombia
        </p>
         ` ,
      mantenimiento: `
        <h2>Mantenimiento de Computadores</h2>
        <p>Ofrecemos limpieza interna, cambio de pasta térmica, revisión de hardware, y más.</p>
      `,
      ofimatica: `
        <h2>Ofimática</h2>
        <p>Capacitamos en Word, Excel, PowerPoint y otras herramientas de oficina.</p>
      `,
      redes: `
        <h2>Redes Domésticas</h2>
        <p>Configuración de routers, redes Wi-Fi y cableado estructurado para hogares y pequeñas empresas.</p>
      `,
      html: `
        <h2>HTML Básico</h2>
        <p>Aprende a estructurar tu sitio web con etiquetas semánticas.</p>
      `,
      css: `
        <h2>CSS Básico</h2>
        <p>Aplica estilos visuales a tu sitio web, controla colores, márgenes y diseño.</p>
      `,
      flexbox: `
        <h2>Flexbox</h2>
        <p>Distribuye y alinea elementos con Flexbox para crear diseños flexibles.</p>
      `,
      grid: `
        <h2>Diseño con Grid</h2>
        <p>Organiza el diseño de tu sitio web con áreas definidas en una grilla.</p>
      `,
      semantica: `
        <h2>Estructuras Semánticas</h2>
        <p>Usa etiquetas como &lt;header&gt;, &lt;main&gt; y &lt;footer&gt; para dar significado a tu HTML.</p>
      `,
      javascript: `
        <h2>JavaScript</h2>
        <p>Agrega interactividad y lógica a tu sitio web con este poderoso lenguaje.</p>
      `,

      // galeria
      galeria: `
  <h2>Galería de Servicios</h2>
  <div class="galeria">
    <img src="img1.jpg" alt="Servicio 1">
    <img src="img2.jpg" alt="Servicio 2">
    <img src="img3.jpg" alt="Servicio 3">
  </div>

  <div id="modal" class="modal">
    <span id="cerrar">&times;</span>
    <img class="modal-contenido" id="img-modal" alt="">
  </div>
`

    };
  
    enlaces.forEach(enlace => {
      enlace.addEventListener('click', e => {
        e.preventDefault();
        const tema = enlace.dataset.tema;
        contenido.innerHTML = temas[tema] || '<p>Contenido no disponible aún.</p>';
      });
    });
  });
  