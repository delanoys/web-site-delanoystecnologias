const cursos = [
  { nombre: "AvanzaTech Python", completado: false },
  { nombre: "AvanzaTech AWS", completado: false },
  { nombre: "AvanzaTech IA", completado: false },
  { nombre: "Python Total", completado: false },
  { nombre: "Git y GitHub", completado: false },
  { nombre: "JavaScript", completado: false },
  { nombre: "CSS3 Maestría", completado: false },
  { nombre: "React", completado: false },
  { nombre: "Google Cloud", completado: false },
  { nombre: "Claude IA", completado: false },
  { nombre: "Java", completado: false }
];

const listaCursos = document.getElementById('curso-lista');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function actualizarProgreso() {
  const completados = cursos.filter(c => c.completado).length;
  const total = cursos.length;
  const porcentaje = Math.round((completados / total) * 100);

  progressBar.style.width = `${porcentaje}%`;
  progressBar.textContent = `${porcentaje}%`;
  progressText.textContent = `${porcentaje}% completado`;
}

cursos.forEach((curso, index) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `curso-${index}`;
  checkbox.checked = curso.completado;
  checkbox.addEventListener('change', () => {
    curso.completado = checkbox.checked;
    actualizarProgreso();
  });

  const label = document.createElement('label');
  label.htmlFor = `curso-${index}`;
  label.textContent = curso.nombre;

  li.appendChild(checkbox);
  li.appendChild(label);
  listaCursos.appendChild(li);
});

actualizarProgreso();
