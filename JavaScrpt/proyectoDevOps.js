const phases = [
  {
    title: "Fase 1 – Fundamentos & Control de Versiones",
    items: [
      "Tema: Git & GitHub",
      "Habilidad: ramas, merges, PRs, flujos GitFlow",
      "Ejercicio: crear un repo con ramas feature/dev/main y flujo de integración"
    ]
  },
  {
    title: "Fase 2 – Virtualización",
    items: [
      "Tema: VirtualBox y Vagrant",
      "Habilidad: levantar entornos reproducibles",
      "Ejercicio: provisionar 2 VMs con Vagrant (servidor y cliente)"
    ]
  },
  {
    title: "Fase 3 – Contenedores",
    items: [
      "Tema: Docker",
      "Habilidad: imágenes, volúmenes, redes, docker-compose",
      "Ejercicio: dockerizar una app Python + MySQL"
    ]
  },
  {
    title: "Fase 4 – Orquestación",
    items: [
      "Tema: Kubernetes",
      "Habilidad: pods, deployments, services, ingress",
      "Ejercicio: desplegar la app dockerizada en Kubernetes (minikube o GKE)"
    ]
  },
  {
    title: "Fase 5 – CI/CD",
    items: [
      "Tema: Jenkins + GitHub",
      "Habilidad: pipelines declarativos, integración con Docker/K8s",
      "Ejercicio: pipeline que compile, testee y despliegue en K8s"
    ]
  },
  {
    title: "Fase 6 – Infraestructura como Código",
    items: [
      "Tema: Ansible",
      "Habilidad: playbooks, roles, configuración automática",
      "Ejercicio: aprovisionar servidor con Ansible para instalar Docker y desplegar tu app"
    ]
  },
  {
    title: "Fase 7 – Cloud Computing",
    items: [
      "Tema: AWS (EC2, S3, IAM, EKS)",
      "Habilidad: lanzar instancias, permisos, balanceadores",
      "Ejercicio: desplegar tu app en EKS (Kubernetes en AWS)"
    ]
  },
  {
    title: "Fase 8 – Automatización con IA",
    items: [
      "Tema: ChatGPT aplicado a DevOps",
      "Habilidad: generar scripts, documentación, debugging",
      "Ejercicio: usar ChatGPT para crear un script Ansible o Jenkinsfile"
    ]
  }
];

const roadmap = document.getElementById("roadmap");

function loadProgress() {
  return JSON.parse(localStorage.getItem("devops-progress") || "{}");
}

function saveProgress(progress) {
  localStorage.setItem("devops-progress", JSON.stringify(progress));
}

function renderPhases() {
  const saved = loadProgress();
  roadmap.innerHTML = "";

  phases.forEach((phase, i) => {
    const div = document.createElement("div");
    div.className = "phase";

    const title = document.createElement("h2");
    title.textContent = phase.title;
    div.appendChild(title);

    const ul = document.createElement("ul");
    ul.className = "checklist";

    let completed = 0;

    phase.items.forEach((item, j) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `phase-${i}-item-${j}`;
      checkbox.checked = saved[checkbox.id] || false;

      checkbox.addEventListener("change", () => {
        saved[checkbox.id] = checkbox.checked;
        saveProgress(saved);
        updateProgress();
      });

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = item;

      li.appendChild(checkbox);
      li.appendChild(label);
      ul.appendChild(li);

      if (checkbox.checked) completed++;
    });

    div.appendChild(ul);

    const progressText = document.createElement("div");
    progressText.className = "phase-progress";
    const percent = Math.round((completed / phase.items.length) * 100);
    progressText.textContent = `Progreso fase: ${percent}%`;
    div.appendChild(progressText);

    roadmap.appendChild(div);
  });

  updateProgress();
}

function updateProgress() {
  const checkboxes = document.querySelectorAll(".checklist input");
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter(c => c.checked).length;
  const percent = Math.round((completed / total) * 100);

  document.getElementById("total-progress").textContent = `${percent}%`;
  document.getElementById("total-progress-bar").style.width = `${percent}%`;

  renderPhases(); // refrescar porcentajes de fases
}

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres resetear todo el progreso?")) {
    localStorage.removeItem("devops-progress");
    renderPhases();
  }
});

document.getElementById("export").addEventListener("click", () => {
  const data = localStorage.getItem("devops-progress");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "progreso_devops.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("import").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    localStorage.setItem("devops-progress", e.target.result);
    renderPhases();
  };
  reader.readAsText(file);
});

renderPhases();
