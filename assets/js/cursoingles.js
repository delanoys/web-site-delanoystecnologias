// Plan detallado con temas y recursos
const plan = [
    {
        title: "Semana 1: Pronunciación básica y frases comunes",
        topics: [
            "Sonidos /θ/, /ð/, /æ/, /ʌ/, schwa /ə/",
            "Saludos y presentaciones",
            "Estructura básica: Sujeto + Verbo + Objeto"
        ],
        videos: [
            { name: "Pronunciation Basics", url: "https://www.youtube.com/watch?v=dXJ2CI9jmxo" },
            { name: "Greetings and Introductions", url: "https://www.youtube.com/watch?v=tCw41K2y-XY" }
        ],
        tools: [
            { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" },
            { name: "BBC Learning English - Pronunciation", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation" }
        ]
    },
    {
        title: "Semana 2: Vocabulario cotidiano y tiempos presentes",
        topics: [
            "Present Simple y Present Continuous",
            "Vocabulario de casa, trabajo y transporte",
            "Expresiones para el día a día"
        ],
        videos: [
            { name: "Present Simple vs Continuous", url: "https://www.youtube.com/watch?v=rmYSP-q7m1c" },
            { name: "Daily Routine Vocabulary", url: "https://www.youtube.com/watch?v=rpH4M1FY5rQ" }
        ],
        tools: [
            { name: "LingQ - Lecturas graduadas", url: "https://www.lingq.com/" },
            { name: "Duolingo", url: "https://www.duolingo.com/" }
        ]
    },
    {
        title: "Semana 3: Pasado simple y vocabulario de viajes",
        topics: [
            "Past Simple (verbos regulares e irregulares)",
            "Phrasal verbs básicos (get up, look for, turn on)",
            "Vocabulario de viajes y turismo"
        ],
        videos: [
            { name: "Past Simple Explanation", url: "https://www.youtube.com/watch?v=2eMBwQOdq3Q" },
            { name: "Travel Vocabulary", url: "https://www.youtube.com/watch?v=YJ5M6rTz1XU" }
        ],
        tools: [
            { name: "Perfect English Grammar", url: "https://www.perfect-english-grammar.com/" },
            { name: "BBC Learning English - The English We Speak", url: "https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak" }
        ]
    },
    {
        title: "Semana 4: Present Perfect y conversaciones fluidas",
        topics: [
            "Present Perfect con already, yet, ever, never",
            "Expresiones avanzadas para opiniones y debates",
            "Práctica integral: hablar, escribir, escuchar"
        ],
        videos: [
            { name: "Present Perfect Tense", url: "https://www.youtube.com/watch?v=I1v2m0z7hYk" },
            { name: "Fluency Tips", url: "https://www.youtube.com/watch?v=tgF1Enrgo2g" }
        ],
        tools: [
            { name: "EngVid - Lessons", url: "https://www.engvid.com/" },
            { name: "BBC 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english" }
        ]
    }
];

const weeksContainer = document.getElementById("weeks");

plan.forEach((week, index) => {
    const div = document.createElement("div");
    div.classList.add("week-card");
    div.innerHTML = `
        <h3>${week.title}</h3>
        <h4>Temas:</h4>
        <ul>${week.topics.map(t => `<li>${t}</li>`).join("")}</ul>
        <h4>Videos recomendados:</h4>
        <ul>${week.videos.map(v => `<li><a href="${v.url}" target="_blank">${v.name}</a></li>`).join("")}</ul>
        <h4>Herramientas:</h4>
        <div class="resources">
            ${week.tools.map(tool => `<a href="${tool.url}" target="_blank">${tool.name}</a>`).join(" | ")}
        </div>
    `;
    weeksContainer.appendChild(div);
});

// Pronunciación
document.getElementById("speakBtn").addEventListener("click", () => {
    const text = document.getElementById("wordInput").value;
    if (!text) return alert("Escribe algo en inglés para pronunciar.");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
});

// Escritura
const prompts = [
    { en: "Describe your favorite hobby.", es: "Describe tu pasatiempo favorito." },
    { en: "What did you do yesterday?", es: "¿Qué hiciste ayer?" }
];
const writingPrompt = prompts[Math.floor(Math.random() * prompts.length)];
document.getElementById("writingPrompt").innerText = `${writingPrompt.en} (${writingPrompt.es})`;

document.getElementById("checkWriting").addEventListener("click", () => {
    const userText = document.getElementById("writingArea").value.trim();
    const feedback = document.getElementById("writingFeedback");
    if (userText.length < 5) {
        feedback.innerText = "Intenta escribir una respuesta más completa.";
    } else {
        feedback.innerText = "¡Buen trabajo! Sigue practicando para mejorar tu gramática.";
    }
});

// Escucha
const audioSentences = [
    "This is a simple English sentence.",
    "I like learning new languages."
];
let currentAudio = audioSentences[Math.floor(Math.random() * audioSentences.length)];

document.getElementById("playAudio").addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(currentAudio);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
});

document.getElementById("checkListening").addEventListener("click", () => {
    const answer = document.getElementById("listeningAnswer").value.trim().toLowerCase();
    const feedback = document.getElementById("listeningFeedback");
    if (answer === currentAudio.toLowerCase()) {
        feedback.innerText = "¡Correcto! Excelente comprensión auditiva.";
    } else {
        feedback.innerText = `Incorrecto. La frase era: "${currentAudio}"`;
    }
});
