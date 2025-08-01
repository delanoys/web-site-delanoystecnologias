document.querySelectorAll('.collapsible').forEach(section => {
  const btn = section.querySelector('.toggle-btn');
  const content = section.querySelector('.section-content');

  btn.addEventListener('click', () => {
    content.classList.toggle('open');
    btn.textContent = content.classList.contains('open') ? '▲' : '▼';
  });
});
