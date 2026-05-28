const courseData = [
    { id: 1, title: "Fundamentos de Computación", date: "Feb 2-8", file: "semana1.html" },
    { id: 2, title: "Entrada y Salida de Datos", date: "Feb 9-15", file: "semana2.html" },
    { id: 3, title: "Lógica Básica (if)", date: "Feb 16-22", file: "semana3.html" },
    { id: 4, title: "Estructuras Selectivas", date: "Feb 23-Mar 1", file: "semana4.html" },
    { id: 5, title: "Primer Parcial", date: "Mar 2-8", file: "semana5.html" },
    { id: 6, title: "Iteraciones y Ciclos", date: "Mar 9-15", file: "semana6.html" },
    { id: 7, title: "Listas", date: "Mar 16-22", file: "semana7.html" },
    { id: 8, title: "Tuplas", date: "Mar 23-29", file: "semana8.html" },
    { id: 9, title: "Conjuntos", date: "Abr 6-12", file: "semana9.html" },
    { id: 10, title: "Segundo Parcial", date: "Abr 13-19", file: "semana10.html" },
    { id: 11, title: "Diccionarios", date: "Abr 20-26", file: "semana11.html" },
    { id: 12, title: "Funciones y Modularidad", date: "Abr 27-May 3", file: "semana12.html" },
    { id: 13, title: "Archivos (I/O)", date: "May 4-10", file: "semana13.html" },
    { id: 14, title: "Ordenamiento de Datos", date: "May 11-17", file: "semana14.html" },
    { id: 15, title: "Técnicas Iterativas y Búsqueda", date: "May 18-24", file: "semana15.html" },
    { id: 16, title: "Tercer Parcial", date: "May 25-31", file: "semana16.html" }
];

function generateTabs() {
    const container = document.getElementById('week-tabs');
    container.innerHTML = '';
    
    courseData.forEach(week => {
        const tab = document.createElement('button');
        tab.className = `tab ${week.id === 1 ? 'active' : ''}`;
        tab.textContent = `Semana ${week.id}`;
        tab.onclick = () => {
            window.location.href = week.file;
        };
        container.appendChild(tab);
    });
}

window.onload = generateTabs;