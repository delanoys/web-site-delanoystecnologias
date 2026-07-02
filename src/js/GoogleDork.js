// script.js
// Menú responsive
document.getElementById('menu-btn').addEventListener('click', () => {
document.getElementById('menu').classList.toggle('hidden');
});


// Función buscar
function buscar(){
const q = document.getElementById('query').value;
if(q) window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank');
}


// Función copiar
function copiar(){
const q = document.getElementById('query').value;
navigator.clipboard.writeText(q);
alert('Consulta copiada al portapapeles');
}


// Dark Mode Toggle con persistencia
const body = document.getElementById('body');
const btn = document.getElementById('darkmode-btn');


if(localStorage.getItem('darkmode') === 'true'){
body.classList.add('dark','bg-gray-900','text-gray-200');
btn.textContent = '☀️';
}


btn.addEventListener('click', () => {
body.classList.toggle('dark');
body.classList.toggle('bg-gray-900');
body.classList.toggle('text-gray-200');


if(body.classList.contains('dark')){
localStorage.setItem('darkmode', 'true');
btn.textContent = '☀️';
} else {
localStorage.setItem('darkmode', 'false');
btn.textContent = '🌙';
}
});


// Animación de aparición al hacer scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
}, { threshold: 0.2 });


faders.forEach(fade => {
observer.observe(fade);
});