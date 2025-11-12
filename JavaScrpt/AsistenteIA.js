/**
 * AsistenteIA.js
 *
 * Módulo para gestionar toda la lógica del asistente de chat (chatbot).
 * Incluye manejo de la UI, interacciones de apertura/cierre, y la simulación de respuestas.
 */

class AsistenteIA {
    constructor() {
        // Elementos del DOM
        this.openBtn = document.getElementById('ai-btn-open');
        this.closeBtn = document.getElementById('ai-btn-close');
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
            console.error("No se encontraron los elementos del Asistente IA en el DOM.");
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
        e.preventDefault(); // Previene el submit del formulario
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
        this.openBtn.hidden = true;
        this.input.focus();
    }

    /**
     * Cierra el panel de chat.
     */
    closePanel() {
        this.panel.hidden = true;
        this.openBtn.hidden = false;
    }

    /**
     * Agrega un mensaje al contenedor de mensajes.
     * @param {string} text - El contenido del mensaje.
     * @param {'user'|'bot'} sender - Quién envía el mensaje.
     */
    appendMessage(text, sender) {
        const msgEl = document.createElement('div');
        // Las clases de estilo deben estar definidas en estilosindex.css
        msgEl.className = `ai-msg ${sender} p-2 rounded-lg max-w-[80%] my-1 shadow-sm`;
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
        if (lowerPrompt.includes('hola') || lowerPrompt.includes('saludo')) {
            return '¡Hola! ¿En qué puedo ayudarte hoy con nuestros servicios o cursos?';
        }
        if (lowerPrompt.includes('servicios') || lowerPrompt.includes('servicio') || lowerPrompt.includes('ofrecen')) {
            return 'Ofrecemos Soporte Técnico (reparación y mantenimiento), Desarrollo Web (sitios y apps) y Capacitación Tecnológica (cursos). ¿Cuál te interesa más?';
        }
        if (lowerPrompt.includes('cursos') || lowerPrompt.includes('capacitacion')) {
            return 'Tenemos cursos de desarrollo web (HTML, CSS, JS), bases de datos y herramientas DevOps. ¡Pronto más! Puedes verlos en la sección "Educación".';
        }
        if (lowerPrompt.includes('desarrollo web') || lowerPrompt.includes('sitio web')) {
            return 'Podemos crear desde sitios web informativos hasta aplicaciones web complejas y tiendas online. Cuéntame sobre tu proyecto y te damos una cotización.';
        }
        return 'Entendido, me gustaría ayudarte. No tengo una respuesta predefinida para eso, pero puedes contactarnos directamente en la sección "Contacto" o probar con algo como "¿Qué servicios ofrecen?".';
    }

    /**
     * Simula el envío de la pregunta al asistente y muestra la respuesta.
     * @param {string} prompt - El mensaje del usuario.
     */
    async askAssistant(prompt) {
        this.appendMessage(prompt, 'user');
        this.appendMessage('Escribiendo...', 'bot'); // Mensaje de "pensando"

        try {
            // Simulación de retardo de red para una experiencia más realista
            await new Promise(r => setTimeout(r, 800));
            this.replaceLastBotMessage(this.localReply(prompt));
        } catch (err) {
            // En caso de error, muestra la respuesta local de igual forma
            this.replaceLastBotMessage(this.localReply(prompt));
            console.error('Error simulado en la llamada al API:', err);
        }
    }

    /**
     * Reemplaza el último mensaje del bot (usado para cambiar 'Escribiendo...' por la respuesta final).
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
        this.appendMessage('Hola 👋 — Soy el asistente de Delanoys. Puedo orientarte sobre servicios, cursos y rutas. Prueba con: "¿Qué servicios ofrecen?".', 'bot');
    }
}

// Inicializar el asistente al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    new AsistenteIA();
});