// Contraseña correcta
const CORRECT_PASSWORD = '13234152';

// Datos de los cursos basados en tu agenda
const courses = [
    {
        title: "Entornos Virtuales de Aprendizaje - SENA",
        progress: 100,
        total: 4,
        completed: 4,
        status: "Completada",
        date: "21/06/2025",
        url: "https://delanoystecnologias.site/agenda"
    },
    {
        title: "Maestría en CSS3: Flexbox, Grid, SASS, Bootstrap 5",
        progress: 11,
        total: 350,
        completed: 38,
        status: "En proceso",
        date: "21/06/2025",
        url: "https://www.udemy.com/course/master-en-css/"
    },
    {
        title: "AWS Technical Essentials (Spanish)",
        progress: 25,
        total: 8,
        completed: 2,
        status: "En proceso",
        date: "09/07/2025",
        url: "https://skillbuilder.aws/learn/K8C2FNZM6X"
    },
    {
        title: "Google Cloud Platform - Fundamentos",
        progress: 0,
        total: 1,
        completed: 0,
        status: "Pendiente",
        date: "09/07/2025",
        url: ""
    },
    {
        title: "SENA - Pedagogía Humana",
        progress: 100,
        total: 4,
        completed: 4,
        status: "Completada",
        date: "10/07/2025",
        url: ""
    },
    {
        title: "Fundamentos de SQL en 1 hora",
        progress: 100,
        total: 9,
        completed: 9,
        status: "Completada",
        date: "10/07/2025",
        url: "https://codigofacilito.com/cursos/sql-fundamentos"
    },
    {
        title: "Despliegue de aplicaciones web en Azure",
        progress: 0,
        total: 1,
        completed: 0,
        status: "Pendiente",
        date: "10/07/2025",
        url: "https://codigofacilito.com/cursos/azure-despliegue"
    },
    {
        title: "Fundamentos de la nube de AWS - Módulo 2",
        progress: 0,
        total: 1,
        completed: 0,
        status: "En proceso",
        date: "10/07/2025",
        url: "https://skillbuilder.aws/learn/94T2BEN85A"
    },
    {
        title: "React: De cero a experto (Hooks y MERN)",
        progress: 0,
        total: 1,
        completed: 0,
        status: "Pendiente",
        date: "12/07/2025",
        url: "https://www.udemy.com/course/react-cero-experto/"
    },
    {
        title: "Git+GitHub: Sistema de control de versiones",
        progress: 2,
        total: 116,
        completed: 2,
        status: "En proceso",
        date: "31/07/2025",
        url: "https://www.udemy.com/course/git-github-sistema-control-versiones/"
    },
    {
        title: "Fundamentos de ciberseguridad",
        progress: 22,
        total: 170,
        completed: 38,
        status: "En proceso",
        date: "01/08/2025",
        url: "https://skills.yourlearning.ibm.com/activity/PLAN-4FB8400F05FC"
    }
];

// Función para verificar la contraseña
function checkPassword() {
    const passwordInput = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('password-error');
    const passwordPrompt = document.getElementById('password-prompt');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');

    if (passwordInput === CORRECT_PASSWORD) {
        localStorage.setItem('agendaAuthenticated', 'true');
        passwordPrompt.style.display = 'none';
        mainContent.style.display = 'block';
        footer.style.display = 'block';
        renderCourses();
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('password-input').value = '';
    }
}

// Verificar si el usuario ya está autenticado
document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = localStorage.getItem('agendaAuthenticated');
    if (isAuthenticated === 'true') {
        document.getElementById('password-prompt').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('footer').style.display = 'block';
        renderCourses();
    }
});

// Permitir autenticación con la tecla Enter
document.getElementById('password-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Función para renderizar los cursos
function renderCourses() {
    const courseList = document.getElementById('courses');
    courseList.innerHTML = '';

    courses.forEach(course => {
        const progressPercent = course.progress;
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <div class="course-info">
                <p>Progreso: ${course.completed}/${course.total} (${progressPercent}%)</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <p>Estado: <span class="status-${course.status.toLowerCase().replace(' ', '-')}">${course.status}</span></p>
                <p>Fecha: ${course.date}</p>
                ${course.url ? `<p><a href="${course.url}" target="_blank">Ver curso</a></p>` : ''}
            </div>
        `;
        courseList.appendChild(courseCard);
    });

    // Actualizar resumen
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.status === 'Completada').length;
    const inProgressCourses = courses.filter(c => c.status === 'En proceso').length;
    const pendingCourses = courses.filter(c => c.status === 'Pendiente').length;

    document.getElementById('total-courses').textContent = totalCourses;
    document.getElementById('completed-courses').textContent = completedCourses;
    document.getElementById('in-progress-courses').textContent = inProgressCourses;
    document.getElementById('pending-courses').textContent = pendingCourses;
}