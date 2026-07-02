// ===== Datos del curso =====
const ROADMAP = [
  {
    id: 'que-es-backend',
    title: 'Entiende qué es el Backend',
    chips: ['HTTP', 'Request/Response'],
    desc: 'Cómo funciona el servidor y el ciclo petición-respuesta.',
    action: 'Desde tu frontend, haz un fetch() a una API pública y observa headers, cuerpo y códigos.',
    outcome: 'Explicas qué hace el backend y diferenciarías 200/201/400/404/500.'
  },
  {
    id: 'fundamentos-backend',
    title: 'Fundamentos del Backend',
    chips: ['JSON', 'Rutas', 'Estados'],
    desc: 'JSON, endpoints, diseño básico de respuestas y errores.',
    action: 'Diseña en papel una API de notas: rutas, ejemplos de respuesta y códigos de error.',
    outcome: 'Definir rutas y respuestas consistentes para un CRUD.'
  },
  {
    id: 'node-express',
    title: 'Node.js + Express.js',
    chips: ['Node', 'Express'],
    desc: 'Tu primer servidor con Express.',
    action: 'Crea un server con Express que responda en "/" y "/api/salud".',
    outcome: 'Levantas un servidor local que responde HTML/JSON.'
  },
  {
    id: 'apis-rest',
    title: 'APIs REST (CRUD)',
    chips: ['GET', 'POST', 'PUT', 'DELETE'],
    desc: 'Endpoints que devuelven JSON y manejan CRUD.',
    action: 'Implementa /api/tareas con listado, creación, edición y borrado en memoria.',
    outcome: 'Tu API devuelve JSON bien formado y valida inputs.'
  },
  {
    id: 'bases-datos',
    title: 'Bases de Datos',
    chips: ['SQLite', 'PostgreSQL', 'ORM'],
    desc: 'Persistencia con SQL/ORM y migraciones.',
    action: 'Conecta tu API a SQLite/Postgres; crea tabla tareas y persiste el CRUD.',
    outcome: 'Consultas básicas y migraciones iniciales.'
  },
  {
    id: 'auth-seguridad',
    title: 'Autenticación y Seguridad',
    chips: ['JWT', 'bcrypt', 'CORS'],
    desc: 'Autenticación con tokens y buenas prácticas de seguridad.',
    action: 'Crea /auth/login que genere JWT; protege /api/tareas/* con middleware.',
    outcome: 'Controlas acceso y proteges endpoints.'
  },
  {
    id: 'devops-basico',
    title: 'DevOps básico',
    chips: ['Docker', 'Deploy'],
    desc: 'Contenedores y despliegue inicial.',
    action: 'Dockeriza tu API y súbela a Render/Railway; configura variables de entorno.',
    outcome: 'Tu API corre en la nube con logs visibles.'
  },
  {
    id: 'proyecto-final',
    title: 'Proyecto final: API de Tareas',
    chips: ['Pruebas', 'Observabilidad'],
    desc: 'Integra todo con pruebas y trazas mínimas.',
    action: 'Agrega pruebas (Jest), logs estructurados y paginación; publica README.',
    outcome: 'Proyecto completo de portafolio listo para compartir.'
  },
];

const MODULES = [
  {
    id: 'mod-fund',
    title: 'Fundamentos de la Web',
    level: 'básico',
    time: '3h',
    lessons: [
      { id:'l1', title: 'Modelo cliente-servidor y HTTP', code: `GET /recursos HTTP/1.1
Host: ejemplo.com
Accept: application/json` },
      { id:'l2', title: 'JSON, estado y códigos de error', code: `HTTP/1.1 201 Created
Content-Type: application/json

{"id": 7, "status": "ok"}` },
      { id:'l3', title: 'Git esencial (commit, branch, merge)', code: `git init
git checkout -b feature/api
git merge main` },
    ]
  },
  {
    id: 'mod-api',
    title: 'Diseño de APIs REST',
    level: 'intermedio',
    time: '4h',
    lessons: [
      { id:'l4', title: 'Rutas y recursos', code: `GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/{id}` },
      { id:'l5', title: 'Paginación, filtros y sort', code: `GET /v1/tasks?page=2&limit=20&sort=-created_at` },
      { id:'l6', title: 'Errores y validaciones', code: `HTTP/1.1 422 Unprocessable Entity
{"errors":[{"field":"title","msg":"obligatorio"}]}` },
    ]
  },
  {
    id: 'mod-auth',
    title: 'Autenticación y Autorización',
    level: 'intermedio',
    time: '3h',
    lessons: [
      { id:'l7', title: 'JWT y refresco de tokens', code: `Authorization: Bearer <jwt>
{
 "sub":"123","exp":1699999999,"scope":["tasks:read"]
}` },
      { id:'l8', title: 'OAuth2 y terceros', code: `GET /oauth/authorize?client_id=...&response_type=code` },
      { id:'l9', title: 'RBAC y permisos', code: `role: "admin"
permissions: ["users:read","users:write"]` },
    ]
  },
  {
    id: 'mod-db',
    title: 'Persistencia y Bases de Datos',
    level: 'intermedio',
    time: '5h',
    lessons: [
      { id:'l10', title: 'Modelado relacional', code: `CREATE TABLE tasks(
  id serial PRIMARY KEY,
  title text NOT NULL,
  user_id int REFERENCES users(id)
);` },
      { id:'l11', title: 'Índices y consultas', code: `CREATE INDEX idx_tasks_user ON tasks(user_id);
SELECT * FROM tasks WHERE user_id=42;` },
      { id:'l12', title: 'NoSQL y trade-offs', code: `# Documento en una colección
{ "_id": "t1", "title": "Aprender", "user": 42 }` },
    ]
  },
  {
    id: 'mod-ops',
    title: 'DevOps, Docker y CI/CD',
    level: 'avanzado',
    time: '4h',
    lessons: [
      { id:'l13', title: 'Dockerizar un servicio', code: `FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm i --omit=dev
CMD ["node","server.js"]` },
      { id:'l14', title: 'Pipelines CI', code: `on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test` },
      { id:'l15', title: 'Despliegue', code: `kubectl apply -f deployment.yaml` },
    ]
  }
];

const QUIZ = [
  { q: '¿Qué código de estado representa "Creado"?', options: ['200', '201', '204', '404'], a: 1 },
  { q: '¿Qué significa idempotencia?', options: [
      'La operación aumenta el rendimiento',
      'Ejecutar varias veces produce el mismo efecto',
      'Es un algoritmo de hashing',
      'Evita la latencia'
    ], a: 1 },
  { q: '¿Qué patrón ayuda a evitar fallos en cascada?', options: ['Repository', 'Circuit Breaker', 'Observer', 'Strategy'], a: 1 },
  { q: '¿Qué comando crea un índice en SQL?', options: ['ADD INDEX', 'MAKE INDEX', 'CREATE INDEX', 'INDEX NEW'], a: 2 }
];

// ===== Utilidades =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const LS = {
  get: (k, fallback=null) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback } catch { return fallback } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(k),
};

function toast(msg){
  const t = $('#toast'); t.textContent = msg;
  t.classList.add('show'); setTimeout(()=> t.classList.remove('show'), 1800);
}
function updateYear(){ $('#year').textContent = new Date().getFullYear() }

// ===== Navegación SPA =====
function initRouting(){
  function show(hash){
    const id = (hash || '#inicio').replace('#','');
    $$('.view').forEach(v => v.classList.remove('visible'));
    $('#'+id)?.classList.add('visible');
    $$('#navList a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    $('#sidebar').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
  }
  window.addEventListener('hashchange', ()=> show(location.hash));
  show(location.hash || '#inicio');
}

// ===== Sidebar & tema =====
function initShell(){
  const sidebar = $('#sidebar');
  const menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  const theme = LS.get('theme', 'dark');
  if(theme === 'light') document.documentElement.classList.add('light');
  $('#themeToggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    LS.set('theme', isLight ? 'light' : 'dark');
  });

  $('#resetProgress').addEventListener('click', () => {
    LS.del('progress'); LS.del('checks'); LS.del('quizBest');
    renderProgress();
    $$('.complete-btn').forEach(b => b.classList.remove('done'));
    $$('input[type=checkbox][data-check]').forEach(c => c.checked = false);
    toast('Progreso reiniciado');
  });
}

// ===== Roadmap (NUEVA presentación con objetivo/acción/resultado) =====
function renderRoadmap(){
  const ul = $('#roadmapList');
  ul.innerHTML = '';
  const progress = LS.get('progress', {});

  ROADMAP.forEach(step => {
    const done = !!progress[`roadmap:${step.id}`];
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${step.title}</h3>
      <p class="muted">${step.desc}</p>
      <div class="meta">
        ${step.chips.map(c=>`<span class="badge">${c}</span>`).join('')}
      </div>
      <details>
        <summary>Ver objetivo y acción</summary>
        <p><strong>🎯 Objetivo:</strong> ${step.desc}</p>
        <p><strong>🧪 Acción práctica:</strong> ${step.action}</p>
        <p><strong>✅ Criterio de dominio:</strong> ${step.outcome}</p>
      </details>
      <button class="btn small ${done?'subtle':''}" data-roadmap="${step.id}">
        ${done?'Completado ✓':'Marcar como completado'}
      </button>
    `;
    ul.appendChild(li);
  });

  ul.addEventListener('click', (e) => {
    const id = e.target?.dataset?.roadmap;
    if(!id) return;
    const progress = LS.get('progress', {});
    progress[`roadmap:${id}`] = !(progress[`roadmap:${id}`]);
    LS.set('progress', progress);
    renderRoadmap();
    renderProgress();
    toast('Hito actualizado');
  });
}

// ===== Módulos =====
function renderModules(){
  const wrap = $('#modulesContainer');
  wrap.innerHTML = '';

  MODULES.forEach(mod => {
    const details = document.createElement('details');
    details.innerHTML = `
      <summary>${mod.title}</summary>
      <div class="meta">
        <span class="badge">Nivel: ${mod.level}</span>
        <span class="badge">Duración: ${mod.time}</span>
      </div>
      ${mod.lessons.map(lesson => `
        <div class="lesson">
          <label><input type="checkbox" data-lesson="${lesson.id}"> ${lesson.title}</label>
          <button class="btn small" data-copy="${lesson.id}">Copiar código</button>
        </div>
        <pre><code>${lesson.code.replace(/</g,'&lt;')}</code></pre>
      `).join('')}
    `;
    wrap.appendChild(details);
  });

  const progress = LS.get('progress', {});
  $$('input[type=checkbox][data-lesson]').forEach(chk => {
    const id = chk.dataset.lesson;
    chk.checked = !!progress[`lesson:${id}`];
    chk.addEventListener('change', () => {
      const p = LS.get('progress', {});
      p[`lesson:${id}`] = chk.checked;
      LS.set('progress', p);
      renderProgress();
    });
  });

  wrap.addEventListener('click', (e) => {
    const id = e.target?.dataset?.copy;
    if(!id) return;
    const lesson = MODULES.flatMap(m=>m.lessons).find(l => l.id===id);
    if(lesson){ navigator.clipboard.writeText(lesson.code); toast('Código copiado ✔'); }
  });

  $('#searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    $$('#modulesContainer details').forEach(d => {
      const text = d.querySelector('summary').textContent.toLowerCase() + ' ' + d.textContent.toLowerCase();
      d.style.display = text.includes(q) ? '' : 'none';
    })
  });
}

// ===== Prácticas =====
function initPractices(){
  $$('.complete-btn').forEach(btn => {
    const id = btn.dataset.id;
    const p = LS.get('progress', {});
    if(p[`practice:${id}`]) btn.classList.add('done');
    btn.addEventListener('click', () => {
      const progress = LS.get('progress', {});
      const newVal = !(progress[`practice:${id}`]);
      progress[`practice:${id}`] = newVal;
      LS.set('progress', progress);
      btn.classList.toggle('done', newVal);
      renderProgress();
      toast('Práctica actualizada');
    });
  });

  const checks = LS.get('checks', {});
  $$('input[type=checkbox][data-check]').forEach(c => {
    c.checked = !!checks[c.dataset.check];
    c.addEventListener('change', () => {
      const ch = LS.get('checks', {});
      ch[c.dataset.check] = c.checked;
      LS.set('checks', ch);
    });
  });
}

// ===== Quiz =====
function initQuiz(){
  const startBtn = $('#startQuiz');
  const cont = $('#quizContainer');
  const res = $('#quizResult');
  let timerId = null, secs = 0;

  function renderTimer(){
    const m = String(Math.floor(secs/60)).padStart(2,'0');
    const s = String(secs%60).padStart(2,'0');
    $('#timer').textContent = `${m}:${s}`;
  }
  function startTimer(){ secs = 0; renderTimer(); timerId = setInterval(()=>{ secs++; renderTimer() }, 1000); }
  function stopTimer(){ clearInterval(timerId); timerId = null; }

  function renderQuiz(){
    cont.innerHTML = '';
    QUIZ.forEach((q, i) => {
      const div = document.createElement('div');
      div.className = 'q';
      div.innerHTML = `<h4>${i+1}. ${q.q}</h4>` +
        q.options.map((opt, idx) =>
          `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label>`
        ).join('');
      cont.appendChild(div);
    });
  }

  startBtn.addEventListener('click', () => {
    cont.classList.remove('hidden'); res.textContent = '';
    renderQuiz(); startTimer();
  });

  cont.addEventListener('change', () => {
    const done = QUIZ.every((q, i) => cont.querySelector(`input[name="q${i}"]:checked`));
    if(done){
      stopTimer();
      let score = 0;
      QUIZ.forEach((q, i) => {
        const v = Number(cont.querySelector(`input[name="q${i}"]:checked`).value);
        if(v === q.a) score++;
      });
      const pct = Math.round((score / QUIZ.length) * 100);
      const best = LS.get('quizBest', 0);
      if(pct > best){ LS.set('quizBest', pct) }
      res.textContent = `Resultado: ${pct}% • Mejor marca: ${Math.max(pct, best)}%`;
      renderProgress();
      toast('Quiz finalizado ✅');
    }
  });
}

// ===== Progreso global =====
function renderProgress(){
  const progress = LS.get('progress', {});
  const doneLessons = Object.keys(progress).filter(k => k.startsWith('lesson:') && progress[k]).length;
  const totalLessons = MODULES.reduce((acc, m)=> acc + m.lessons.length, 0);
  const doneRoadmap = Object.keys(progress).filter(k => k.startsWith('roadmap:') && progress[k]).length;
  const totalRoadmap = ROADMAP.length;
  const donePractices = Object.keys(progress).filter(k => k.startsWith('practice:') && progress[k]).length;
  const totalPractices = 2;
  const quizBest = LS.get('quizBest', 0);

  const pctLessons = totalLessons ? (doneLessons/totalLessons) : 0;
  const pctRoadmap = totalRoadmap ? (doneRoadmap/totalRoadmap) : 0;
  const pctPractices = totalPractices ? (donePractices/totalPractices) : 0;
  const pctQuiz = quizBest/100;

  const global = Math.round((pctLessons*0.45 + pctRoadmap*0.2 + pctPractices*0.2 + pctQuiz*0.15)*100);
  $('#globalProgress').style.width = `${global}%`;
  $('#progressText').textContent = `${global}% completado`;
}

// ===== Inicio =====
document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  initShell();
  initRouting();
  renderRoadmap();   // <- Ruta actualizada
  renderModules();
  initPractices();
  initQuiz();
  renderProgress();
});
