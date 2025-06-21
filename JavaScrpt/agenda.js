// ====================================
// VARIABLES GLOBALES Y CONFIGURACIÓN
// ====================================

let actividades = [];
let fechaActual = new Date();
let actividadEditando = null;

const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// ====================================
// GESTIÓN DE DATOS (LocalStorage)
// ====================================

class BaseDatos {
    static cargar() {
        try {
            const datos = localStorage.getItem('agenda_actividades');
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error('Error al cargar datos:', error);
            return [];
        }
    }

    static guardar(datos) {
        try {
            localStorage.setItem('agenda_actividades', JSON.stringify(datos));
            return true;
        } catch (error) {
            console.error('Error al guardar datos:', error);
            return false;
        }
    }

    static exportar() {
        const datos = {
            actividades: actividades,
            fechaExportacion: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(datos, null, 2);
    }

    static importar(datosJSON) {
        try {
            const datos = JSON.parse(datosJSON);
            if (datos.actividades && Array.isArray(datos.actividades)) {
                actividades = datos.actividades;
                this.guardar(actividades);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al importar datos:', error);
            return false;
        }
    }
}

// ====================================
// GESTIÓN DE ACTIVIDADES
// ====================================

class GestorActividades {
    static crear(datosActividad) {
        const nuevaActividad = {
            id: this.generarId(),
            titulo: datosActividad.titulo.trim(),
            descripcion: datosActividad.descripcion.trim(),
            fecha: datosActividad.fecha,
            hora: datosActividad.hora || '',
            categoria: datosActividad.categoria || 'personal',
            prioridad: datosActividad.prioridad || 'media',
            estado: datosActividad.estado || 'pendiente',
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString()
        };

        actividades.unshift(nuevaActividad);
        BaseDatos.guardar(actividades);
        return nuevaActividad;
    }

    static actualizar(id, datosActividad) {
        const indice = actividades.findIndex(act => act.id === id);
        if (indice === -1) return false;

        actividades[indice] = {
            ...actividades[indice],
            titulo: datosActividad.titulo.trim(),
            descripcion: datosActividad.descripcion.trim(),
            fecha: datosActividad.fecha,
            hora: datosActividad.hora || '',
            categoria: datosActividad.categoria || 'personal',
            prioridad: datosActividad.prioridad || 'media',
            estado: datosActividad.estado || 'pendiente',
            fechaModificacion: new Date().toISOString()
        };

        BaseDatos.guardar(actividades);
        return true;
    }

    static eliminar(id) {
        const indiceInicial = actividades.length;
        actividades = actividades.filter(act => act.id !== id);
        
        if (actividades.length < indiceInicial) {
            BaseDatos.guardar(actividades);
            return true;
        }
        return false;
    }

    static obtenerPorId(id) {
        return actividades.find(act => act.id === id) || null;
    }

    static filtrar(filtros = {}) {
        return actividades.filter(actividad => {
            if (filtros.categoria && actividad.categoria !== filtros.categoria) {
                return false;
            }
            if (filtros.estado && actividad.estado !== filtros.estado) {
                return false;
            }
            if (filtros.fecha && actividad.fecha !== filtros.fecha) {
                return false;
            }
            if (filtros.busqueda) {
                const busqueda = filtros.busqueda.toLowerCase();
                return actividad.titulo.toLowerCase().includes(busqueda) ||
                       actividad.descripcion.toLowerCase().includes(busqueda);
            }
            return true;
        });
    }

    static obtenerEstadisticas() {
        return {
            total: actividades.length,
            pendientes: actividades.filter(act => act.estado === 'pendiente').length,
            enProceso: actividades.filter(act => act.estado === 'en-proceso').length,
            completadas: actividades.filter(act => act.estado === 'completada').length,
            porCategoria: this.contarPorCategoria(),
            porPrioridad: this.contarPorPrioridad()
        };
    }

    static contarPorCategoria() {
        const conteo = {};
        actividades.forEach(act => {
            conteo[act.categoria] = (conteo[act.categoria] || 0) + 1;
        });
        return conteo;
    }

    static contarPorPrioridad() {
        const conteo = {};
        actividades.forEach(act => {
            conteo[act.prioridad] = (conteo[act.prioridad] || 0) + 1;
        });
        return conteo;
    }

    static generarId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
}

// ====================================
// GESTIÓN DEL CALENDARIO
// ====================================

class GestorCalendario {
    static renderizar(fecha = fechaActual) {
        const calendario = document.getElementById('calendario-grid');
        const mesActual = document.getElementById('mes-actual');
        
        if (!calendario || !mesActual) return;

        // Actualizar título del mes
        mesActual.textContent = `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;

        // Limpiar calendario
        calendario.innerHTML = '';

        // Crear encabezados de días de la semana
        DIAS_SEMANA.forEach(dia => {
            const encabezado = document.createElement('div');
            encabezado.className = 'calendario-dia-header';
            encabezado.textContent = dia;
            encabezado.style.cssText = 'font-weight: 600; padding: 0.5rem; text-align: center; background: #f1f5f9;';
            calendario.appendChild(encabezado);
        });

        // Calcular días del mes
        const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
        const diaInicio = primerDia.getDay();
        const diasMes = ultimoDia.getDate();

        // Días del mes anterior para completar la primera semana
        const mesAnterior = new Date(fecha.getFullYear(), fecha.getMonth(), 0);
        for (let i = diaInicio - 1; i >= 0; i--) {
            const dia = mesAnterior.getDate() - i;
            const elementoDia = this.crearElementoDia(dia, fecha.getFullYear(), fecha.getMonth() - 1, true);
            calendario.appendChild(elementoDia);
        }

        // Días del mes actual
        for (let dia = 1; dia <= diasMes; dia++) {
            const elementoDia = this.crearElementoDia(dia, fecha.getFullYear(), fecha.getMonth(), false);
            calendario.appendChild(elementoDia);
        }

        // Días del mes siguiente para completar la última semana
        const totalCeldas = calendario.children.length;
        const celdasRestantes = 42 - totalCeldas + 7; // 6 semanas * 7 días + encabezados
        for (let dia = 1; dia <= celdasRestantes; dia++) {
            const elementoDia = this.crearElementoDia(dia, fecha.getFullYear(), fecha.getMonth() + 1, true);
            calendario.appendChild(elementoDia);
        }
    }

    static crearElementoDia(dia, año, mes, otroMes = false) {
        const elemento = document.createElement('div');
        elemento.className = 'calendario-dia';
        
        if (otroMes) {
            elemento.classList.add('otro-mes');
        }

        // Verificar si es hoy
        const hoy = new Date();
        if (!otroMes && año === hoy.getFullYear() && mes === hoy.getMonth() && dia === hoy.getDate()) {
            elemento.classList.add('hoy');
        }

        // Obtener actividades del día
        const fechaDia = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const actividadesDia = GestorActividades.filtrar({ fecha: fechaDia });

        if (actividadesDia.length > 0) {
            elemento.classList.add('con-actividades');
        }

        // Estructura del día
        elemento.innerHTML = `
            <div class="dia-numero">${dia}</div>
            <div class="actividades-indicador">
                ${actividadesDia.slice(0, 3).map(() => '<div class="actividad-punto"></div>').join('')}
                ${actividadesDia.length > 3 ? '<div class="actividad-punto" style="background: #666;">+</div>' : ''}
            </div>
        `;

        // Event listener para seleccionar fecha
        elemento.addEventListener('click', () => {
            if (!otroMes) {
                const fechaSeleccionada = fechaDia;
                document.getElementById('fecha').value = fechaSeleccionada;
                UI.mostrarModal('modal-actividad');
            }
        });

        return elemento;
    }

    static navegarMes(direccion) {
        if (direccion === 'anterior') {
            fechaActual.setMonth(fechaActual.getMonth() - 1);
        } else if (direccion === 'siguiente') {
            fechaActual.setMonth(fechaActual.getMonth() + 1);
        }
        this.renderizar(fechaActual);
    }
}

// ====================================
// INTERFAZ DE USUARIO
// ====================================

class UI {
    static mostrarModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    static ocultarModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    static renderizarActividades(actividadesFiltradas = null) {
        const container = document.getElementById('lista-actividades');
        if (!container) return;

        const actividadesAMostrar = actividadesFiltradas || actividades;

        if (actividadesAMostrar.length === 0) {
            container.innerHTML = `
                <div class="estado-vacio">
                    <h3>No hay actividades</h3>
                    <p>Comienza agregando tu primera actividad</p>
                </div>
            `;
            return;
        }

        // Ordenar por fecha y prioridad
        const actividadesOrdenadas = [...actividadesAMostrar].sort((a, b) => {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            if (fechaA.getTime() !== fechaB.getTime()) {
                return fechaA - fechaB;
            }
            const prioridades = { alta: 3, media: 2, baja: 1 };
            return prioridades[b.prioridad] - prioridades[a.prioridad];
        });

        container.innerHTML = actividadesOrdenadas.map(actividad => 
            this.crearTarjetaActividad(actividad)
        ).join('');
    }

    static crearTarjetaActividad(actividad) {
        const fechaFormateada = this.formatearFecha(actividad.fecha);
        const horaFormateada = actividad.hora ? this.formatearHora(actividad.hora) : '';

        return `
            <div class="actividad-card prioridad-${actividad.prioridad}">
                <div class="actividad-header">
                    <h3 class="actividad-titulo">${this.escaparHTML(actividad.titulo)}</h3>
                    <div class="actividad-acciones">
                        <button class="btn btn-small btn-secondary" onclick="editarActividad('${actividad.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-small btn-danger" onclick="confirmarEliminar('${actividad.id}')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
                
                ${actividad.descripcion ? `
                    <div class="actividad-descripcion">
                        ${this.escaparHTML(actividad.descripcion)}
                    </div>
                ` : ''}
                
                <div class="actividad-info">
                    <div class="actividad-meta">
                        📅 ${fechaFormateada} ${horaFormateada}
                    </div>
                    <div class="actividad-meta">
                        <span class="categoria-tag categoria-${actividad.categoria}">
                            ${this.capitalizarPrimera(actividad.categoria)}
                        </span>
                        <span class="estado-tag estado-${actividad.estado}">
                            ${this.capitalizarPrimera(actividad.estado.replace('-', ' '))}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    static actualizarEstadisticas() {
        const stats = GestorActividades.obtenerEstadisticas();
        
        document.getElementById('total-actividades').textContent = stats.total;
        document.getElementById('pendientes').textContent = stats.pendientes;
        document.getElementById('completadas').textContent = stats.completadas;
    }

    static formatearFecha(fecha) {
        const fechaObj = new Date(fecha + 'T00:00:00');
        const hoy = new Date();
        const mañana = new Date(hoy);
        mañana.setDate(hoy.getDate() + 1);

        if (fechaObj.toDateString() === hoy.toDateString()) {
            return 'Hoy';
        } else if (fechaObj.toDateString() === mañana.toDateString()) {
            return 'Mañana';
        } else {
            return fechaObj.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short',
                year: fechaObj.getFullYear() !== hoy.getFullYear() ? 'numeric' : undefined
            });
        }
    }

    static formatearHora(hora) {
        if (!hora) return '';
        const [horas, minutos] = hora.split(':');
        return `${horas}:${minutos}`;
    }

    static capitalizarPrimera(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    static mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            ${tipo === 'success' ? 'background: #059669;' : ''}
            ${tipo === 'error' ? 'background: #dc2626;' : ''}
            ${tipo === 'info' ? 'background: #4f46e5;' : ''}
        `;

        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }
}

// ====================================
// FUNCIONES GLOBALES
// ====================================

function editarActividad(id) {
    const actividad = GestorActividades.obtenerPorId(id);
    if (!actividad) return;

    actividadEditando = id;
    
    // Llenar el formulario
    document.getElementById('titulo').value = actividad.titulo;
    document.getElementById('descripcion').value = actividad.descripcion;
    document.getElementById('fecha').value = actividad.fecha;
    document.getElementById('hora').value = actividad.hora;
    document.getElementById('categoria').value = actividad.categoria;
    document.getElementById('prioridad').value = actividad.prioridad;
    document.getElementById('estado').value = actividad.estado;
    
    document.getElementById('modal-titulo').textContent = 'Editar Actividad';
    UI.mostrarModal('modal-actividad');
}

function confirmarEliminar(id) {
    const actividad = GestorActividades.obtenerPorId(id);
    if (!actividad) return;

    document.getElementById('mensaje-confirmacion').textContent = 
        `¿Estás seguro de que quieres eliminar "${actividad.titulo}"?`;
    
    document.getElementById('confirmar-accion').onclick = () => {
        if (GestorActividades.eliminar(id)) {
            UI.mostrarNotificacion('Actividad eliminada correctamente', 'success');
            actualizarVista();
        } else {
            UI.mostrarNotificacion('Error al eliminar la actividad', 'error');
        }
        UI.ocultarModal('modal-confirmacion');
    };
    
    UI.mostrarModal('modal-confirmacion');
}

function actualizarVista() {
    UI.renderizarActividades();
    UI.actualizarEstadisticas();
    GestorCalendario.renderizar();
    aplicarFiltros();
}

function aplicarFiltros() {
    const categoria = document.getElementById('filtro-categoria').value;
    const estado = document.getElementById('filtro-estado').value;
    
    const filtros = {};
    if (categoria) filtros.categoria = categoria;
    if (estado) filtros.estado = estado;
    
    const actividadesFiltradas = GestorActividades.filtrar(filtros);
    UI.renderizarActividades(actividadesFiltradas);
}

function limpiarFormulario() {
    document.getElementById('form-actividad').reset();
    document.getElementById('fecha').value = new Date().toISOString().split('T')[0];
    actividadEditando = null;
    document.getElementById('modal-titulo').textContent = 'Nueva Actividad';
}

// ====================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos
    actividades = BaseDatos.cargar();
    
    // Configurar fecha inicial
    document.getElementById('fecha').value = new Date().toISOString().split('T')[0];
    
    // Renderizar vista inicial
    actualizarVista();

    // Event Listeners para botones principales
    document.getElementById('btn-nueva-actividad').addEventListener('click', () => {
        limpiarFormulario();
        UI.mostrarModal('modal-actividad');
    });

    // Event Listeners para navegación del calendario
    document.getElementById('mes-anterior').addEventListener('click', () => {
        GestorCalendario.navegarMes('anterior');
    });

    document.getElementById('mes-siguiente').addEventListener('click', () => {
        GestorCalendario.navegarMes('siguiente');
    });

    // Event Listeners para filtros
    document.getElementById('filtro-categoria').addEventListener('change', aplicarFiltros);
    document.getElementById('filtro-estado').addEventListener('change', aplicarFiltros);

    // Event Listeners para modales
    document.getElementById('cerrar-modal').addEventListener('click', () => {
        UI.ocultarModal('modal-actividad');
    });

    document.getElementById('cancelar-modal').addEventListener('click', () => {
        UI.ocultarModal('modal-actividad');
    });

    document.getElementById('cancelar-confirmacion').addEventListener('click', () => {
        UI.ocultarModal('modal-confirmacion');
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById('modal-actividad').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            UI.ocultarModal('modal-actividad');
        }
    });

    document.getElementById('modal-confirmacion').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            UI.ocultarModal('modal-confirmacion');
        }
    });

    // Event Listener para el formulario
    document.getElementById('form-actividad').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const datosActividad = {
            titulo: formData.get('titulo'),
            descripcion: formData.get('descripcion'),
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            categoria: formData.get('categoria'),
            prioridad: formData.get('prioridad'),
            estado: formData.get('estado')
        };

        // Validar datos
        if (!datosActividad.titulo.trim()) {
            UI.mostrarNotificacion('El título es obligatorio', 'error');
            return;
        }
        
        if (!datosActividad.fecha) {
            UI.mostrarNotificacion('La fecha es obligatoria', 'error');
            return;
        }

        // Crear o actualizar actividad
        let exito = false;
        if (actividadEditando) {
            exito = GestorActividades.actualizar(actividadEditando, datosActividad);
            if (exito) {
                UI.mostrarNotificacion('Actividad actualizada correctamente', 'success');
            }
        } else {
            const nuevaActividad = GestorActividades.crear(datosActividad);
            exito = !!nuevaActividad;
            if (exito) {
                UI.mostrarNotificacion('Actividad creada correctamente', 'success');
            }
        }

        if (exito) {
            UI.ocultarModal('modal-actividad');
            actualizarVista();
        } else {
            UI.mostrarNotificacion('Error al guardar la actividad', 'error');
        }
    });

    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + N para nueva actividad
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            limpiarFormulario();
            UI.mostrarModal('modal-actividad');
        }
        
        // Escape para cerrar modales
        if (e.key === 'Escape') {
            UI.ocultarModal('modal-actividad');
            UI.ocultarModal('modal-confirmacion');
        }
    });

    console.log('✅ Agenda Personal cargada correctamente');
});

// Agregar estilos para animaciones
const estilosAnimaciones = document.createElement('style');
estilosAnimaciones.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(estilosAnimaciones);