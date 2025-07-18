document.querySelectorAll('.toggle-code').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const codeBlock = document.getElementById(targetId);
    codeBlock.classList.toggle('hidden');
    button.textContent = codeBlock.classList.contains('hidden') ? 'Ver Código' : 'Ocultar Código';
  });
});