/* ===========================
   Utilidades de UI & Estado
=========================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
  nivel: localStorage.getItem("nivel") || "A2",
  semana: parseInt(localStorage.getItem("semana") || "1", 10),
  progreso: JSON.parse(localStorage.getItem("progreso") || "{}"), // { "1-1": true, ... }
  stats: JSON.parse(localStorage.getItem("stats") || '{"dias":0,"chunks":0,"calidad":0}'),
  voz: localStorage.getItem("voz") || "",
  voces: [],
  // para módulos
  idxChunk: 0,
  srs: {}, // spaced repetition {chunkKey:{ease,interval,due}}
  pronIndex: 0,
  dictIndex: 0,
  lecturaIndex: 0,
  escrituraIndex: 0,
};

function save() {
  localStorage.setItem("nivel", state.nivel);
  localStorage.setItem("semana", String(state.semana));
  localStorage.setItem("progreso", JSON.stringify(state.progreso));
  localStorage.setItem("stats", JSON.stringify(state.stats));
  localStorage.setItem("voz", state.voz);
  localStorage.setItem("srs", JSON.stringify(state.srs));
}

/* ===========================
   Contenido (4 semanas)
=========================== */
const contenido = {
  metas: {
    1: "Base sólida: rutina, present simple, fonemas clave /ɪ/ vs /iː/, /æ/, /θ/.",
    2: "Pasado simple, 15 verbos irregulares, dictados y chunks de interacción.",
    3: "Present Perfect para experiencias, conectores (already, yet, ever, never).",
    4: "Phrasal verbs y fluidez: opinión–razón–ejemplo; mini-proyecto de escritura.",
  },
  agenda: {
    1: [
      "Día 1: Saludos, Present Simple, 8 chunks de cortesía.",
      "Día 2: Rutinas; pronunciación: /ɪ/ vs /iː/ (ship/sheep).",
      "Día 3: Listening con frases cortas + shadowing.",
      "Día 4: Preguntas con do/does; dictado guiado.",
      "Día 5: Preposiciones in/on/at; lectura breve.",
      "Día 6: Revisión + conversación libre.",
      "Día 7: Repaso activo y evaluación."
    ],
    2: [
      "Día 1: Past Simple (regulares) + 5 irregulares.",
      "Día 2: Storytelling: ayer / last weekend.",
      "Día 3: Dictados y conectores (then, after that).",
      "Día 4: Pronunciación: /ð/ (this, that) y schwa /ə/.",
      "Día 5: Lectura con preguntas.",
      "Día 6: Juegos de phrasal get up/turn on/look for.",
      "Día 7: Repaso activo y evaluación."
    ],
    3: [
      "Día 1: Present Perfect: have/has + V3",
      "Día 2: Experiencias: ever/never, already/yet.",
      "Día 3: Listening + transformaciones (I’ve been / I went).",
      "Día 4: Pronunciación de terminaciones (-ed).",
      "Día 5: Lectura y resumen.",
      "Día 6: Debate corto: pros/cons.",
      "Día 7: Repaso activo y evaluación."
    ],
    4: [
      "Día 1: Phrasal verbs: take off, bring up, figure out.",
      "Día 2: Fluidez: opinión–razón–ejemplo.",
      "Día 3: Dictados con velocidad mayor.",
      "Día 4: Pronunciación conectada (linking).",
      "Día 5: Lectura de opinión.",
      "Día 6: Escritura de mini-ensayo (120–150 palabras).",
      "Día 7: Proyecto final + feedback."
    ],
  },
  chunks: [
    { en:"As you probably know", es:"Como probablemente ya sabes" },
    { en:"I’d like to", es:"Me gustaría" },
    { en:"It depends on", es:"Depende de" },
    { en:"At the end of the day", es:"Al final del día" },
    { en:"I’m looking forward to", es:"Estoy deseando" },
    { en:"Can you give me a hand?", es:"¿Puedes echarme una mano?" },
    { en:"That makes sense", es:"Tiene sentido" },
    { en:"Let me think for a second", es:"Déjame pensar un segundo" },
  ],
  pronTargets: [
    "This is former US President Barack Obama.",
    "She sells sea shells by the sea shore.",
    "Think about this thing on Thursday.",
    "I really need to read more regularly."
  ],
  dictados: [
    { en:"I usually wake up at seven and make coffee.", hint:"Rutina diaria" },
    { en:"We visited my grandparents last weekend.", hint:"Pasado simple" },
    { en:"Have you ever tried Korean food?", hint:"Present Perfect" },
    { en:"Please turn on the lights and close the door.", hint:"Phrasal + imperativos" }
  ],
  lecturas: [
    {
      texto: "Maria works in a small bakery. She loves the smell of fresh bread every morning.",
      q: "Where does Maria work?",
      opciones: ["In a school","In a bakery","In a library"],
      correcta: 1
    },
    {
      texto: "Last year, Tom traveled to Japan and learned basic phrases to order food.",
      q: "What did Tom learn?",
      opciones: ["How to drive","Basic phrases to order food","Japanese history"],
      correcta: 1
    },
  ],
  escrituraPrompts: [
    "Describe tu rutina de la mañana en 5–6 oraciones (usa present simple).",
    "Cuenta una experiencia pasada corta (usa past simple, 60–80 palabras).",
    "Escribe sobre un lugar que te gustaría visitar y por qué (usa would like to).",
    "Escribe una opinión con razón y ejemplo sobre estudiar online."
  ],
  checklist: [
    "Empieza con mayúscula, termina con punto.",
    "Usa conectores: and, but, because.",
    "Incluye al menos 2 verbos en pasado o present perfect según el tema.",
    "Revisa ortografía básica (I, the, because).",
    "Longitud: 80–120 palabras (si aplica)."
  ]
};

/* ===========================
   TTS (Text-to-Speech)
=========================== */
const vozSelect = $("#vozSelect");
function cargarVoces() {
  state.voces = speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
  vozSelect.innerHTML = '<option value="">(Auto)</option>' + state.voces.map(v => {
    const sel = v.name === state.voz ? "selected" : "";
    return `<option ${sel} value="${v.name}">${v.name} – ${v.lang}</option>`;
  }).join("");
}
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = cargarVoces;
  setTimeout(cargarVoces, 300);
}
function speak(text) {
  if (!("speechSynthesis" in window)) return alert("Tu navegador no admite síntesis de voz.");
  const u = new SpeechSynthesisUtterance(text);
  const voz = state.voces.find(v => v.name === state.voz);
  if (voz) u.voice = voz;
  u.rate = 0.95;
  u.pitch = 1;
  speechSynthesis.speak(u);
}

/* ===========================
   Spaced Repetition (simple)
=========================== */
function todayKey() {
  const d = new Date(); return d.toISOString().slice(0,10);
}
function srsGet(key) {
  const srs = JSON.parse(localStorage.getItem("srs") || "{}");
  return srs[key] || { ease:2.5, interval:0, due: todayKey() };
}
function srsUpdate(key, grade) {
  // grade: 5 (lo sé), 2 (fallo)
  let card = srsGet(key);
  const q = grade >= 4 ? 1 : 0; // correcto/incorrecto
  card.ease = Math.max(1.3, card.ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
  if (card.interval === 0) {
    card.interval = q ? 1 : 0;
  } else {
    card.interval = q ? Math.round(card.interval * card.ease) : 1;
  }
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + card.interval);
  card.due = dueDate.toISOString().slice(0,10);
  state.srs[key] = card;
  save();
}
function dueInfo(key) {
  const card = srsGet(key);
  return `Próximo repaso: ${card.due} · Intervalo: ${card.interval} día(s)`;
}

/* ===========================
   Módulo: Chunks (Flashcards)
=========================== */
const idxSafe = (i, arr) => ((i % arr.length) + arr.length) % arr.length;
function renderChunk() {
  const c = contenido.chunks[idxSafe(state.idxChunk, contenido.chunks)];
  $("#chunkText").textContent = c.en;
  $("#chunkTraduccion").textContent = c.es;
  $("#chunkTraduccion").classList.add("hidden");
  $("#spacedInfo").textContent = dueInfo(c.en);
}
$("#btnSiguienteChunk").addEventListener("click", () => {
  state.idxChunk++; renderChunk();
});
$("#btnEscucharChunk").addEventListener("click", () => {
  const c = contenido.chunks[idxSafe(state.idxChunk, contenido.chunks)];
  speak(c.en);
});
$("#btnVerTraduccion").addEventListener("click", () => {
  $("#chunkTraduccion").classList.toggle("hidden");
});
$("#btnConozco").addEventListener("click", () => {
  const c = contenido.chunks[idxSafe(state.idxChunk, contenido.chunks)];
  srsUpdate(c.en, 5);
  state.stats.chunks++; save();
  renderChunk();
});
$("#btnNoConozco").addEventListener("click", () => {
  const c = contenido.chunks[idxSafe(state.idxChunk, contenido.chunks)];
  srsUpdate(c.en, 2);
  renderChunk();
});

/* ===========================
   Módulo: Pronunciación (ASR)
=========================== */
const ASR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;
if (ASR) {
  recog = new ASR();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.maxAlternatives = 1;
  recog.onresult = (e) => {
    const txt = e.results[0][0].transcript;
    $("#pronTranscripcion").value = txt;
    const objetivo = $("#pronObjetivo").textContent.trim().toLowerCase();
    const score = similarity(objectivo, txt.toLowerCase());
    $("#pronScore").textContent = Math.round(score * 100) + "%";
    state.stats.calidad = Math.round((state.stats.calidad + score * 100) / 2);
    save();
  };
  recog.onstart = () => $("#estadoASR").textContent = "ASR: grabando…";
  recog.onend = () => $("#estadoASR").textContent = "ASR: listo";
} else {
  $("#estadoASR").textContent = "ASR no disponible en este navegador.";
}
function renderPronObjetivo() {
  const t = contenido.pronTargets[idxSafe(state.pronIndex, contenido.pronTargets)];
  $("#pronObjetivo").textContent = t;
}
$("#btnCambiarObjetivo").addEventListener("click", () => {
  state.pronIndex++; renderPronObjetivo();
});
$("#btnEscucharObjetivo").addEventListener("click", () => {
  speak($("#pronObjetivo").textContent);
});
$("#btnGrabar").addEventListener("click", () => {
  if (!recog) return alert("Tu navegador no admite reconocimiento de voz.");
  recog.start();
});

/* String similarity (Levenshtein) */
function similarity(a,b){
  if (!a.length && !b.length) return 1;
  const dp = Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
  for (let i=0;i<=a.length;i++) dp[i][0]=i;
  for (let j=0;j<=b.length;j++) dp[0][j]=j;
  for (let i=1;i<=a.length;i++){
    for (let j=1;j<=b.length;j++){
      const cost = a[i-1]===b[j-1]?0:1;
      dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost);
    }
  }
  const dist = dp[a.length][b.length];
  const maxLen = Math.max(a.length,b.length);
  return (maxLen - dist)/maxLen;
}

/* ===========================
   Módulo: Dictado
=========================== */
function renderDictado() {
  const d = contenido.dictados[idxSafe(state.dictIndex, contenido.dictados)];
  $("#dictadoInput").value = "";
  $("#dictadoFeedback").textContent = "";
  $("#btnDictar").onclick = () => speak(d.en);
  $("#btnMostrarPista").onclick = () => {
    $("#dictadoFeedback").textContent = "Pista: " + d.hint;
  };
  $("#btnComprobarDictado").onclick = () => {
    const user = $("#dictadoInput").value.trim();
    const score = similarity(d.en.toLowerCase(), user.toLowerCase());
    const pct = Math.round(score * 100);
    $("#dictadoFeedback").textContent = `Coincidencia aproximada: ${pct}%`;
    state.stats.calidad = Math.round((state.stats.calidad + pct)/2);
    if (pct >= 85) desbloquearLogro("📝 Oído fino", "Dictado ≥85%");
    save();
  };
}

/* ===========================
   Módulo: Lectura
=========================== */
let lecturaRespuesta = null;
function renderLectura() {
  const L = contenido.lecturas[idxSafe(state.lecturaIndex, contenido.lecturas)];
  $("#lecturaTexto").textContent = L.texto;
  const cont = $("#lecturaPregunta");
  cont.innerHTML = `
    <p class="muted">${L.q}</p>
    ${L.opciones.map((op,i)=>`
      <label class="radio">
        <input type="radio" name="lectura" value="${i}"> ${op}
      </label>
    `).join("")}
  `;
  $("#lecturaFeedback").textContent = "";
  lecturaRespuesta = L.correcta;
}
$("#btnComprobarLectura").addEventListener("click", () => {
  const sel = document.querySelector('input[name="lectura"]:checked');
  if (!sel) return alert("Selecciona una opción.");
  const ok = parseInt(sel.value,10) === lecturaRespuesta;
  $("#lecturaFeedback").textContent = ok ? "¡Correcto! 🎉" : "Revisa el texto y vuelve a intentarlo.";
  if (ok) desbloquearLogro("📖 Comprensión", "Respuesta de lectura correcta");
  const newIdx = state.lecturaIndex + 1;
  state.lecturaIndex = newIdx % contenido.lecturas.length;
  save();
});

/* ===========================
   Módulo: Escritura
=========================== */
function renderEscritura() {
  const p = contenido.escrituraPrompts[idxSafe(state.escrituraIndex, contenido.escrituraPrompts)];
  $("#promptEscritura").textContent = p;
  $("#textoEscritura").value = "";
  $("#listaChecklist").classList.add("hidden");
  $("#escrituraFeedback").textContent = "";
}
$("#btnChecklist").addEventListener("click", () => {
  const ul = $("#listaChecklist");
  ul.innerHTML = contenido.checklist.map(item => `<li><label><input type="checkbox"> ${item}</label></li>`).join("");
  ul.classList.toggle("hidden");
});
$("#btnEvaluarEscritura").addEventListener("click", () => {
  const txt = $("#textoEscritura").value.trim();
  if (!txt) return alert("Escribe tu respuesta primero.");
  // Métrica simple: longitud, frases, palabras frecuentes básicas
  const palabras = txt.split(/\s+/).filter(Boolean);
  const len = palabras.length;
  const frases = txt.split(/[.!?]+/).filter(s=>s.trim().length>0).length;
  const basicas = ["the","a","I","and","but","because","to","in","on","at"];
  const tieneBasicas = basicas.some(w => txt.toLowerCase().includes(w.toLowerCase()));
  let puntos = 50;
  if (len>=60) puntos += 10;
  if (frases>=4) puntos += 15;
  if (tieneBasicas) puntos += 10;
  puntos = Math.min(100, puntos);
  $("#escrituraFeedback").textContent = `Evaluación rápida: ${puntos}/100`;
  state.stats.calidad = Math.round((state.stats.calidad + puntos)/2);
  if (puntos>=80) desbloquearLogro("✍️ Pluma ágil","Escritura ≥80/100");
  save();
});

/* ===========================
   Semana, Agenda y Progreso
=========================== */
function renderSemana(num = state.semana) {
  state.semana = num;
  $("#tituloSemana").textContent = `Semana ${num}`;
  $("#metaSemana").textContent = contenido.metas[num];
  const ul = $("#agendaLista");
  ul.innerHTML = "";
  contenido.agenda[num].forEach((item, idx) => {
    const key = `${num}-${idx+1}`;
    const done = !!state.progreso[key];
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" ${done ? "checked":""} data-key="${key}" />
        ${item}
      </label>
    `;
    ul.appendChild(li);
  });
  calcularProgresoTotal();
}
$("#agendaLista").addEventListener("change", (e) => {
  if (e.target && e.target.dataset.key) {
    state.progreso[e.target.dataset.key] = e.target.checked;
    save();
    calcularProgresoTotal();
    if (e.target.checked) {
      state.stats.dias = Object.values(state.progreso).filter(Boolean).length;
      desbloquearLogro("✅ Constancia", "Marcaste un día como completado");
      save();
    }
  }
});
$("#btnCompletarDia").addEventListener("click", () => {
  // Marca el primer día pendiente de la semana actual
  const list = $$("#agendaLista input[type=checkbox]");
  const pendiente = list.find(cb => !cb.checked);
  if (pendiente) { pendiente.checked = true; pendiente.dispatchEvent(new Event("change")); $("#diaEstado").textContent = "¡Día marcado!"; }
  else $("#diaEstado").textContent = "Todos los días ya están completados.";
  setTimeout(()=> $("#diaEstado").textContent = "", 2000);
});

function calcularProgresoTotal() {
  const totalDias = Object.values(contenido.agenda).flat().length;
  const done = Object.values(state.progreso).filter(Boolean).length;
  const pct = Math.round((done / totalDias) * 100);
  $("#progresoTotal").style.width = pct + "%";
  $("#progresoTexto").textContent = `Progreso total: ${pct}%`;
  $("#statDias").textContent = done;
  $("#statPalabras").textContent = state.stats.chunks;
  $("#statPuntuacion").textContent = (state.stats.calidad || 0) + "%";
}

/* ===========================
   Logros
=========================== */
function desbloquearLogro(nombre,desc){
  const key = `logro:${nombre}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, "1");
  const li = document.createElement("li");
  li.textContent = `${nombre}`;
  $("#logrosLista").appendChild(li);
  // toast simple
  const t = document.createElement("div");
  t.textContent = `🎉 Logro: ${nombre} — ${desc}`;
  Object.assign(t.style,{position:"fixed",bottom:"16px",right:"16px",background:"#0e1533",border:"1px solid #2a397a",padding:"10px 12px",borderRadius:"12px",zIndex:9999});
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 2500);
}
function renderLogros(){
  $("#logrosLista").innerHTML = "";
  Object.keys(localStorage).filter(k=>k.startsWith("logro:")).forEach(k=>{
    const li = document.createElement("li");
    li.textContent = k.replace("logro:","");
    $("#logrosLista").appendChild(li);
  });
}

/* ===========================
   Nivel, Voz & Tabs
=========================== */
$("#nivel").addEventListener("change", (e)=>{
  state.nivel = e.target.value; save();
  // adaptar dificultad (simple): mover índices iniciales
  if (state.nivel==="A1"){ state.pronIndex=0; state.dictIndex=0; }
  if (state.nivel==="A2"){ state.pronIndex=1; state.dictIndex=1; }
  if (state.nivel==="B1"){ state.pronIndex=2; state.dictIndex=2; }
  renderPronObjetivo(); renderDictado();
});

$("#vozSelect").addEventListener("change",(e)=>{
  state.voz = e.target.value; save();
});
$("#revisarProgreso").addEventListener("click", ()=>{
  alert(`Días completados: ${Object.values(state.progreso).filter(Boolean).length}\nChunks aprendidos: ${state.stats.chunks}\nCalidad media: ${state.stats.calidad || 0}%`);
});
$("#resetProgreso").addEventListener("click", ()=>{
  if (confirm("¿Seguro que quieres borrar todo el progreso?")) {
    localStorage.clear();
    location.reload();
  }
});

$$(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    $$(".tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderSemana(parseInt(btn.dataset.week,10));
  });
});

/* ===========================
   Init
=========================== */
window.addEventListener("DOMContentLoaded", ()=>{
  // cargar estado previo
  const srs = localStorage.getItem("srs");
  if (srs) state.srs = JSON.parse(srs);
  $("#nivel").value = state.nivel;

  renderSemana(state.semana);
  renderChunk();
  renderPronObjetivo();
  renderDictado();
  renderLectura();
  renderEscritura();
  renderLogros();
  cargarVoces();
});
