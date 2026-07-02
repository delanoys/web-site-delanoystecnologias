/**
 * AsistenteIA.js - Versión Corregida
 *
 * Módulo para gestionar toda la lógica del asistente de chat (chatbot).
 * Incluye manejo de la UI, interacciones de apertura/cierre, y la simulación de respuestas.
 */

class AsistenteIA {
    constructor() {
        // Elementos del DOM (IDs estandarizados)
        this.openBtn = document.getElementById('ai-btn-open');
        this.closeBtn = document.getElementById('ai-btn-close');
        this.clearBtn = document.getElementById('ai-clear');
        this.panel = document.getElementById('ai-panel');
        this.messages = document.getElementById('ai-messages');
        this.input = document.getElementById('ai-input');
        this.sendBtn = document.getElementById('ai-send');
        this.form = document.getElementById('ai-input-form');

        this.init();
    }

    /**
     * Inicializa los event listeners y el mensaje de bienvenida.
     */
    init() {
        if (!this.openBtn || !this.panel) {
            console.error("No se encontraron los elementos del Asistente IA en el DOM. Verifique los IDs: ai-btn-open, ai-panel.");
            return;
        }

        this.initEventListeners();
        this.welcome();
    }

    /**
     * Configura los event listeners para la interacción del usuario.
     */
    initEventListeners() {
        // Eventos para abrir y cerrar el panel
        this.openBtn.addEventListener('click', this.openPanel.bind(this));
        this.closeBtn.addEventListener('click', this.closePanel.bind(this));
        
        // Evento para limpiar el historial
        this.clearBtn.addEventListener('click', this.clearMessages.bind(this));

        // Eventos para enviar el mensaje
        this.sendBtn.addEventListener('click', (e) => this.handleSendMessage(e));
        this.form.addEventListener('submit', (e) => this.handleSendMessage(e));

        // Evento de teclado para cerrar con Escape (accesibilidad)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.panel.hidden) {
                this.closePanel();
            }
        });
    }

    /**
     * Maneja el envío del mensaje (click en botón o Enter en input).
     * @param {Event} e - El evento de click o submit.
     */
    handleSendMessage(e) {
        e.preventDefault(); 
        const v = this.input.value && this.input.value.trim();
        if (!v) return;

        this.input.value = '';
        this.askAssistant(v);
    }

    /**
     * Abre el panel de chat.
     */
    openPanel() {
        this.panel.hidden = false;
        this.panel.setAttribute('aria-hidden', 'false');
        this.openBtn.hidden = true;
        this.input.focus();
    }

    /**
     * Cierra el panel de chat.
     */
    closePanel() {
        this.panel.hidden = true;
        this.panel.setAttribute('aria-hidden', 'true');
        this.openBtn.hidden = false;
    }
    
    /**
     * Limpia el historial de mensajes del chat y muestra el mensaje de bienvenida.
     */
    clearMessages() {
        this.messages.innerHTML = '';
        this.welcome(); 
        this.input.focus(); 
    }

    /**
     * Agrega un mensaje al contenedor de mensajes.
     * @param {string} text - El contenido del mensaje.
     * @param {'user'|'bot'} sender - Quién envía el mensaje.
     */
    appendMessage(text, sender) {
        const msgEl = document.createElement('div');
        msgEl.className = `ai-msg ${sender}`;
        msgEl.textContent = text;
        this.messages.appendChild(msgEl);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    /**
     * Lógica simple de respuesta local para el asistente.
     * @param {string} prompt - El mensaje del usuario.
     * @returns {string} - La respuesta predefinida del asistente.
     */
    localReply(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        // Saludos
        if (lowerPrompt.includes('hola') || lowerPrompt.includes('saludo') || lowerPrompt.includes('buenos')) {
            return '¡Hola! 👋 ¿En qué puedo ayudarte hoy con nuestros servicios o cursos?';
        }
        
        // Servicios
        if (lowerPrompt.includes('servicios') || lowerPrompt.includes('servicio') || lowerPrompt.includes('ofrecen')) {
            return 'Ofrecemos tres áreas principales:\n\n🔧 Soporte Técnico (reparación y mantenimiento)\n💻 Desarrollo Web (sitios y aplicaciones)\n📚 Capacitación Tecnológica (cursos especializados)\n\n¿Cuál te interesa más?';
        }
        
        // Cursos y capacitación
        if (lowerPrompt.includes('cursos') || lowerPrompt.includes('capacitacion') || lowerPrompt.includes('aprender')) {
            return 'Tenemos cursos de:\n\n• Desarrollo Web (HTML, CSS, JavaScript, React)\n• Bases de Datos (SQL, PostgreSQL)\n• DevOps (Docker, Kubernetes, CI/CD)\n• TypeScript y frameworks modernos\n\nPuedes verlos en la sección "Educación" 📚';
        }
        
        // Desarrollo web
        if (lowerPrompt.includes('desarrollo web') || lowerPrompt.includes('sitio web') || lowerPrompt.includes('pagina web')) {
            return 'Creamos sitios web modernos y profesionales:\n\n✨ Landing pages\n🏪 Tiendas online\n📱 Aplicaciones web\n🎨 Diseño responsive\n\n¿Tienes un proyecto en mente? Contáctanos en la sección "Contacto".';
        }
        
        // DevOps
        if (lowerPrompt.includes('devops') || lowerPrompt.includes('docker') || lowerPrompt.includes('kubernetes')) {
            return 'Nuestra ruta DevOps incluye:\n\n🐳 Docker y contenedores\n☸️ Kubernetes\n🔄 CI/CD con Jenkins\n☁️ Cloud Computing\n\nVisita nuestra "Ruta DevOps" para más información.';
        }
        
        // Bases de datos
        if (lowerPrompt.includes('base de datos') || lowerPrompt.includes('sql') || lowerPrompt.includes('postgresql')) {
            return 'Ofrecemos cursos completos de bases de datos:\n\n📊 SQL básico y avanzado\n🐘 PostgreSQL\n💾 SQLite\n🐧 Instalación en Linux\n\nRevisa nuestra sección de "Educación".';
        }
        
        // React
        if (lowerPrompt.includes('react')) {
            return 'Nuestro curso de React cubre:\n\n⚛️ Componentes y JSX\n🎣 Hooks (useState, useEffect)\n🔄 Estado global\n🌐 React Router\n\n¡Perfecto para crear interfaces modernas!';
        }
        
        // Contacto
        if (lowerPrompt.includes('contacto') || lowerPrompt.includes('telefono') || lowerPrompt.includes('email') || lowerPrompt.includes('correo')) {
            return 'Puedes contactarnos:\n\n📧 Email: contacto@delanoys.com\n📱 Teléfono: +57 300 1234567\n🕐 Horario: Lun-Vie 8:00 - 18:00\n\nO dirígete a la sección "Contacto" en la página.';
        }
        
        // Precio/presupuesto
        if (lowerPrompt.includes('precio') || lowerPrompt.includes('costo') || lowerPrompt.includes('presupuesto') || lowerPrompt.includes('cotizacion')) {
            return 'Para solicitar un presupuesto personalizado:\n\n1. Dirígete a la sección "Contacto"\n2. Cuéntanos sobre tu proyecto\n3. Te responderemos en menos de 24 horas\n\n💡 Las asesorías son gratuitas.';
        }
        
        // Gracias
        if (lowerPrompt.includes('gracias') || lowerPrompt.includes('thank')) {
            return '¡De nada! 😊 Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en escribirme.';
        }
        
        // Respuesta por defecto
        return 'Entendido. Para ayudarte mejor, puedes preguntarme sobre:\n\n• Nuestros servicios\n• Cursos disponibles\n• Desarrollo web\n• DevOps y tecnologías\n• Información de contacto\n\n¿En qué más puedo ayudarte? 🤔';
    }

    /**
     * Simula el envío de la pregunta al asistente y muestra la respuesta.
     * @param {string} prompt - El mensaje del usuario.
     */
    async askAssistant(prompt) {
        this.appendMessage(prompt, 'user');
        this.appendMessage('Escribiendo...', 'bot');

        try {
            // Simulación de retardo para efecto más realista
            await new Promise(r => setTimeout(r, 800));
            this.replaceLastBotMessage(this.localReply(prompt));
        } catch (err) {
            this.replaceLastBotMessage('Lo siento, ocurrió un error. Por favor intenta de nuevo.');
            console.error('Error en la respuesta del asistente:', err);
        }
    }

    /**
     * Reemplaza el último mensaje del bot.
     * @param {string} text - El texto de la respuesta.
     */
    replaceLastBotMessage(text) {
        const botMsgs = this.messages.querySelectorAll('.ai-msg.bot');
        if (botMsgs.length) {
            botMsgs[botMsgs.length - 1].textContent = text;
        } else {
            this.appendMessage(text, 'bot');
        }
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    /**
     * Muestra el mensaje de bienvenida al cargar el asistente.
     */
    welcome() {
        this.appendMessage('¡Hola! 👋 Soy el asistente de Delanoys Tecnologías. Puedo orientarte sobre servicios, cursos y rutas de aprendizaje.\n\nPrueba preguntando: "¿Qué servicios ofrecen?" o "¿Qué cursos tienen?"', 'bot');
    }
}

// Inicializar el asistente al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    new AsistenteIA();
});