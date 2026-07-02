document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  const progreso = document.getElementById("progreso");
  const porcentaje = document.getElementById("porcentaje");

  checkboxes.forEach(chk => {
    const saved = localStorage.getItem(chk.dataset.id);
    if (saved === "true") chk.checked = true;
  });

  function actualizarProgreso() {
    const total = checkboxes.length;
    const marcados = document.querySelectorAll("input[type=checkbox]:checked").length;
    const percent = Math.round((marcados / total) * 100);
    progreso.style.width = percent + "%";
    porcentaje.textContent = percent + "%";
    checkboxes.forEach(chk => {
      localStorage.setItem(chk.dataset.id, chk.checked);
    });
  }

  checkboxes.forEach(chk => {
    chk.addEventListener("change", actualizarProgreso);
  });

  actualizarProgreso();
});