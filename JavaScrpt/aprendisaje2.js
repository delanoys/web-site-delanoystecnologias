const cursos = [
  "AvanzaTech Desarrollo de sitios para la web",
  "AvanzaTech AWS",
  "AvanzaTech IA",
  "Udemy Python Total",
  "Git y GitHub",
  "JavaScript",
  "CSS3 Maestría",
  "React",
  "Google Cloud",
  "Claude IA",
  "Java"
];

const listaCursos = document.getElementById('curso-lista');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function getEstadoGuardado() {
  const guardado = localStorage.getItem('estadoCursos');
  return guardado ? JSON.parse(guardado) : cursos.map(() => false);
}

function guardarEstado(estado) {
  localStorage.setItem('estadoCursos', JSON.stringify(estado));
}

function actualizarProgreso(estado) {
  const completados = estado.filter(Boolean).length;
  const total = estado.length;
  const porcentaje = Math.round((completados / total) * 100);
  progressBar.style.width = `${porcentaje}%`;
  progressBar.textContent = `${porcentaje}%`;
  progressText.textContent = `${porcentaje}% completado`;
}

function renderLista(estado) {
  listaCursos.innerHTML = "";
  cursos.forEach((curso, index) => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex align-items-center";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "form-check-input me-2";
    checkbox.checked = estado[index];

    checkbox.addEventListener('change', () => {
      estado[index] = checkbox.checked;
      guardarEstado(estado);
      actualizarProgreso(estado);
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(curso));
    listaCursos.appendChild(li);
  });
}

const estadoCursos = getEstadoGuardado();
renderLista(estadoCursos);
actualizarProgreso(estadoCursos);
