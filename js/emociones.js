// Base de datos de Inteligencia Emocional - Proverbios 31/31 con Emojis
const dataEmociones = {
    // --- VIRTUDES Y ESTADOS POSITIVOS ---
    "Paz": { v: "Prov. 3:17", t: "Sus caminos son deleitosos, y todas sus veredas paz.", a: "La paz interior es el indicador de que tus decisiones están alineadas con tus valores. Protégela.", e: "🕊️" },
    "Valentía": { v: "Prov. 28:1", t: "El justo está confiado como un león.", a: "La seguridad nace de la integridad. No temas tomar riesgos calculados cuando tu ética es sólida.", e: "🦁" },
    "Entusiasmo": { v: "Prov. 15:30", t: "La luz de los ojos alegra el corazón.", a: "Tu energía es contagiosa. Una actitud positiva eleva el rendimiento de todo tu equipo.", e: "⚡" },
    "Humildad": { v: "Prov. 22:4", t: "Riquezas, honra y vida son la remuneración de la humildad.", a: "Ser humilde es tener la capacidad de reconocer que siempre puedes aprender algo de los demás.", e: "🍃" },
    "Diligencia": { v: "Prov. 22:29", t: "¿Has visto hombre solicitado en su trabajo? Delante de los reyes estará.", a: "La excelencia en los detalles te abre puertas que el talento solo no puede abrir.", e: "🏆" },
    "Sabiduría": { v: "Prov. 8:11", t: "Porque mejor es la sabiduría que las piedras preciosas.", a: "La verdadera inteligencia es saber aplicar el conocimiento en el momento justo.", e: "💎" },
    "Compasión": { v: "Prov. 14:21", t: "El que tiene misericordia de los pobres es bienaventurado.", a: "La empatía es la base de las relaciones. Ayudar a otros te convierte en un líder real.", e: "❤️" },
    "Honestidad": { v: "Prov. 12:22", t: "Los que hacen verdad son su deleite.", a: "La transparencia genera confianza. Ser alguien de palabra te hace destacar profesionalmente.", e: "🤝" },
    "Prudencia": { v: "Prov. 14:15", t: "El avisado mira bien sus pasos.", a: "Pensar antes de actuar te ahorra arrepentimientos. Analiza, escucha y luego decide.", e: "🧭" },
    "Disciplina": { v: "Prov. 12:1", t: "El que ama la instrucción ama la sabiduría.", a: "El éxito es la suma de pequeños hábitos diarios. Amar la disciplina es amar tu crecimiento.", e: "💪" },

    // --- GESTIÓN DE EMOCIONES DESAFIANTES ---
    "Ira": { v: "Prov. 15:1", t: "La blanda respuesta quita la ira.", a: "Controla tu reacción. Una palabra suave apaga incendios antes de que quemen tus relaciones.", e: "🔥" },
    "Ansiedad": { v: "Prov. 12:25", t: "La congoja en el corazón del hombre lo abate.", a: "El estrés bloquea tu visión. Habla con un mentor y recupera el enfoque hoy.", e: "😰" },
    "Orgullo": { v: "Prov. 16:18", t: "Antes del quebrantamiento es la soberbia.", a: "La arrogancia es el principio del fin. Escucha consejos para evitar caídas innecesarias.", e: "👑" },
    "Impaciencia": { v: "Prov. 19:2", t: "El que se apresura con los pies, peca.", a: "No fuerces resultados. El tiempo es un aliado cuando actúas con estrategia.", e: "⏳" },
    "Miedo": { v: "Prov. 29:25", t: "El temor del hombre pondrá lazo.", a: "No dejes que la opinión de otros te encarcele. Confía en tu propósito.", e: "🛡️" },
    "Tristeza": { v: "Prov. 17:22", t: "El corazón alegre constituye buen remedio.", a: "La alegría es una decisión diaria que sana tu cuerpo y tu mente.", e: "🌧️" },
    "Pereza": { v: "Prov. 6:6", t: "Ve a la hormiga, oh perezoso.", a: "La procrastinación es el ladrón del destino. Empieza con algo pequeño ahora.", e: "💤" },
    "Envidia": { v: "Prov. 14:30", t: "La envidia es carcoma de los huesos.", a: "Celebrar el éxito ajeno libera tu propia creatividad.", e: "🐍" },
    "Soledad": { v: "Prov. 18:24", t: "El hombre que tiene amigos ha de mostrarse amigo.", a: "Para romper el aislamiento, toma la iniciativa de servir a alguien más.", e: "👤" },
    "Confusión": { v: "Prov. 4:26", t: "Examina la senda de tus pies.", a: "Cuando no sepas qué hacer, vuelve a tus principios básicos y rectifica el rumbo.", e: "🌀" },
    "Venganza": { v: "Prov. 20:22", t: "No digas: Yo me vengaré.", a: "Soltar la ofensa es recuperar tu poder personal. No le des tu paz a otro.", e: "🗡️" },
    "Chisme": { v: "Prov. 16:28", t: "El chismoso aparta a los mejores amigos.", a: "Tu reputación se basa en tu silencio sobre los errores ajenos.", e: "🤫" },
    "Codicia": { v: "Prov. 15:16", t: "Mejor es lo poco con paz.", a: "El éxito material sin paz interior es una quiebra espiritual.", e: "💰" },
    "Indecisión": { v: "Prov. 3:5", t: "Fíate de Jehová de todo tu corazón.", a: "Cuando la lógica se agote, deja que tus valores guíen el siguiente paso.", e: "⚖️" },
    "Agotamiento": { v: "Prov. 3:24", t: "Tu sueño será grato.", a: "El descanso estratégico es productividad. No es una pérdida de tiempo.", e: "🔋" },
    "Culpa": { v: "Prov. 28:13", t: "El que confiesa y se aparta alcanzará misericordia.", a: "No cargues con el pasado. Aprende la lección, pide perdón y sigue adelante.", e: "⚓" },
    "Inseguridad": { v: "Prov. 3:26", t: "Jehová será tu confianza.", a: "Tu valor es intrínseco, no depende de tus seguidores ni de tu dinero.", e: "🔍" },
    "Injusticia": { v: "Prov. 21:3", t: "Hacer justicia es mejor que sacrificio.", a: "Haz lo correcto siempre, especialmente cuando nadie te está mirando.", e: "⚖️" },
    "Desánimo": { v: "Prov. 24:10", t: "Si fueres flojo en el día de trabajo, tu fuerza será reducida.", a: "La persistencia es el músculo que se entrena cuando todo parece ir mal.", e: "🧗" },
    "Integridad": { v: "Prov. 10:9", t: "El que camina en integridad camina confiado.", a: "La coherencia entre lo que piensas, dices y haces es la base de la libertad.", e: "💎" }
};

function inicializarEmociones() {
    const grid = document.getElementById('gridEmociones');
    if (!grid) return;
    grid.innerHTML = "";

    for (let em in dataEmociones) {
        const btn = document.createElement('button');
        btn.className = 'emotion-btn';
        const item = dataEmociones[em];
        // Insertamos el emoji antes del nombre de la emoción
        btn.innerHTML = `<span>${item.e}</span> ${em}`;
        
        btn.onclick = function() {
            const display = document.getElementById('result-display');
            document.getElementById('view-emotion').innerText = `${item.e} ${em.toUpperCase()}`;
            document.getElementById('view-verse').innerText = `${item.v}: "${item.t}"`;
            document.getElementById('view-advice').innerText = item.a;
            display.style.display = 'block';
            display.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        grid.appendChild(btn);
    }
}

window.addEventListener('load', inicializarEmociones);