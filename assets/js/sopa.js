// Palabras objetivo (mostrar con acentos/espacios), pero validar sin tildes ni espacios.
const DISPLAY_WORDS = [
  "Respeto","Lealtad","Confianza","Honestidad","Generosidad","Tolerancia",
  "Empatía","Sinceridad","Solidaridad","Perdón","Paciencia","Compasión",
  "Aprecio","Humildad","Fidelidad","Responsabilidad","Cortesía",
  "Escucha activa","Agradecimiento","Apoyo incondicional"
];

// Utilidades
const normalize = (s) => s.toUpperCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g,"") // quitar tildes
  .replace(/\s+/g,""); // quitar espacios

const TARGET_WORDS = DISPLAY_WORDS.map(w => normalize(w));

const byId = (id) => document.getElementById(id);
const gridEl = byId("grid");
const listEl = byId("wordList");
const foundCountEl = byId("foundCount");
const toastEl = byId("toast");
const sizeSel = byId("size");
const btnNew = byId("newGame");
const btnSolution = byId("showSolution");

let GRID_SIZE = parseInt(sizeSel.value, 10);
let grid = [];          // matriz de letras
let placedWords = [];   // { word, norm, path: [cells] }
let selecting = false;
let selectionPath = []; // [{x,y,el}]
let timerInterval = null;
let seconds = 0;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 1400);
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  const update = () => {
    seconds++;
    const m = String(Math.floor(seconds/60)).padStart(2,"0");
    const s = String(seconds%60).padStart(2,"0");
    byId("timer").textContent = `${m}:${s}`;
  };
  update();
  timerInterval = setInterval(update, 1000);
}

function randomInt(n){ return Math.floor(Math.random()*n); }
function directions(){
  return [
    {dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1},
    {dx:1,dy:1},{dx:-1,dy:-1},{dx:1,dy:-1},{dx:-1,dy:1},
  ].sort(() => Math.random()-0.5);
}

function emptyGrid(n){
  return Array.from({length:n},()=>Array.from({length:n},()=>''));
}

function canPlace(word, x,y, dx,dy, g){
  const n = word.length;
  let cx=x, cy=y;
  for(let i=0;i<n;i++){
    if(cx<0||cy<0||cx>=GRID_SIZE||cy>=GRID_SIZE) return false;
    const ch = g[cy][cx];
    if(ch!=='' && ch!==word[i]) return false;
    cx+=dx; cy+=dy;
  }
  return true;
}

function placeWord(word, g){
  // intenta varias posiciones y direcciones
  const tries = GRID_SIZE*GRID_SIZE*6;
  for(let t=0;t<tries;t++){
    const dirs = directions();
    for(const {dx,dy} of dirs){
      const x = randomInt(GRID_SIZE);
      const y = randomInt(GRID_SIZE);
      if(!canPlace(word, x,y,dx,dy,g)) continue;
      // coloca
      const path = [];
      let cx=x, cy=y;
      for(let i=0;i<word.length;i++){
        g[cy][cx] = word[i];
        path.push({x:cx, y:cy});
        cx+=dx; cy+=dy;
      }
      return path;
    }
  }
  return null;
}

function fillRandom(g){
  for(let y=0;y<GRID_SIZE;y++){
    for(let x=0;x<GRID_SIZE;x++){
      if(g[y][x]===''){
        g[y][x] = String.fromCharCode(65 + Math.floor(Math.random()*26));
      }
    }
  }
}

function renderList(){
  listEl.innerHTML = "";
  placedWords.forEach((pw, idx) => {
    const li = document.createElement("li");
    li.dataset.norm = pw.norm;
    li.innerHTML = `<span>${pw.display}</span><span class="status">⏳</span>`;
    listEl.appendChild(li);
  });
}

function renderGrid(){
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  for(let y=0;y<GRID_SIZE;y++){
    for(let x=0;x<GRID_SIZE;x++){
      const d = document.createElement("div");
      d.className = "cell";
      d.setAttribute("role","gridcell");
      d.dataset.x = x; d.dataset.y = y;
      d.textContent = grid[y][x];
      gridEl.appendChild(d);
    }
  }
}

function clearSelection(){
  selectionPath.forEach(c => c.el?.classList.remove("selected"));
  selectionPath = [];
}

function cellsBetween(a,b){
  const dx = Math.sign(b.x - a.x);
  const dy = Math.sign(b.y - a.y);
  const len = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) + 1;
  // Verificar línea recta (misma fila/col/diagonal)
  if(!((dx===0 || dy===0) || Math.abs(b.x - a.x) === Math.abs(b.y - a.y))) return [];
  const cells = [];
  for(let i=0;i<len;i++){
    const x = a.x + dx*i;
    const y = a.y + dy*i;
    const el = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    cells.push({x,y,el});
  }
  return cells;
}

function wordFromCells(cells){
  return cells.map(c => grid[c.y][c.x]).join("");
}

function markFound(cells, norm){
  cells.forEach(c => c.el.classList.add("found"));
  const li = listEl.querySelector(`li[data-norm="${norm}"]`);
  if(li && !li.classList.contains("found")){
    li.classList.add("found");
    li.querySelector(".status").textContent = "✅";
    updateProgress();
  }
}

function updateProgress(){
  const found = listEl.querySelectorAll("li.found").length;
  foundCountEl.textContent = found;
  if(found === placedWords.length){
    showToast("¡Excelente! Encontraste todos los valores 🎉");
    clearInterval(timerInterval);
  }
}

function generate(){
  GRID_SIZE = parseInt(sizeSel.value, 10);
  grid = emptyGrid(GRID_SIZE);
  placedWords = [];

  // Copia y baraja palabras por longitud (largas primero)
  const order = DISPLAY_WORDS
    .map((display, i) => ({display, norm: TARGET_WORDS[i], raw: TARGET_WORDS[i]}))
    .sort((a,b) => b.raw.length - a.raw.length);

  for(const w of order){
    const path = placeWord(w.raw, grid);
    if(path){
      placedWords.push({display: w.display, norm: w.norm, path});
    }else{
      console.warn("No se pudo ubicar:", w.display);
    }
  }
  fillRandom(grid);
  renderGrid();
  renderList();
  attachEvents();
  startTimer();
  foundCountEl.textContent = listEl.querySelectorAll("li.found").length;
}

function attachEvents(){
  // Interacción: arrastrar o click-inicio -> click-fin
  gridEl.onmousedown = (e) => {
    const cell = e.target.closest(".cell");
    if(!cell) return;
    selecting = true;
    clearSelection();
    selectionPath = [{ x:+cell.dataset.x, y:+cell.dataset.y, el:cell }];
    cell.classList.add("selected");
    e.preventDefault();
  };
  gridEl.onmousemove = (e) => {
    if(!selecting) return;
    const cell = e.target.closest(".cell");
    if(!cell) return;
    const last = selectionPath[0];
    const current = { x:+cell.dataset.x, y:+cell.dataset.y, el:cell };
    clearSelection();
    if(last && (last.x!==current.x || last.y!==current.y)){
      selectionPath = cellsBetween(last, current);
    }else{
      selectionPath = [current];
    }
    selectionPath.forEach(c => c.el.classList.add("selected"));
  };
  window.onmouseup = () => {
    if(!selecting) return;
    selecting = false;
    if(selectionPath.length){
      validateSelection(selectionPath);
    }
    clearSelection();
  };

  // Alternativa por clic: primero y segundo clic
  let pending = null;
  gridEl.onclick = (e) => {
    const cell = e.target.closest(".cell");
    if(!cell) return;
    if(!pending){
      pending = { x:+cell.dataset.x, y:+cell.dataset.y, el:cell };
      cell.classList.add("selected");
    }else{
      const cells = cellsBetween(pending, { x:+cell.dataset.x, y:+cell.dataset.y, el:cell });
      validateSelection(cells);
      pending.el.classList.remove("selected");
      pending = null;
      clearSelection();
    }
  };

  btnNew.onclick = () => { generate(); showToast("Nueva sopa creada"); };
  btnSolution.onclick = () => { showSolution(); };
  sizeSel.onchange = () => { generate(); };
}

function validateSelection(cells){
  if(!cells.length) { showToast("La selección debe ser en línea recta"); return; }
  const w = wordFromCells(cells);
  const norm = normalize(w);
  // ¿corresponde a alguna palabra?
  const hit = placedWords.find(pw => {
    const a = wordFromCells(pw.path);
    const b = a.split("").reverse().join("");
    return norm === normalize(a) || norm === normalize(b);
  });
  if(hit){
    // Evitar marcar dos veces
    const already = hit.path.every(c => document.querySelector(`.cell[data-x="${c.x}"][data-y="${c.y}"]`).classList.contains("found"));
    if(already){ showToast("Esa palabra ya fue encontrada"); return; }
    const realCells = hit.path.map(c => ({...c, el: document.querySelector(`.cell[data-x="${c.x}"][data-y="${c.y}"]`) }));
    markFound(realCells, hit.norm);
    showToast(`¡Bien! Encontraste: ${hit.display}`);
  }else{
    showToast("Sigue intentando 😉");
  }
}

function showSolution(){
  placedWords.forEach(pw => {
    const cells = pw.path.map(c => ({...c, el: document.querySelector(`.cell[data-x="${c.x}"][data-y="${c.y}"]`) }));
    markFound(cells, pw.norm);
  });
  showToast("Solución mostrada");
}

// Inicializar
generate();
