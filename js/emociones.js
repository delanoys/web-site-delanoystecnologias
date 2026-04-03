// Base de datos de Inteligencia Emocional - Proverbios 31/31
const dataEmociones = {
    "Ira": { v: "Prov. 15:1", t: "La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.", a: "IE: No reacciones al calor del momento. Una respuesta calmada desarma conflictos antes de que escalen." },
    "Impaciencia": { v: "Prov. 19:2", t: "El alma sin ciencia no es buena, y el que se apresura con los pies, peca.", a: "IE: Correr sin dirección no es progreso. La paciencia te permite evaluar los riesgos antes de actuar impulsivamente." },
    "Venganza": { v: "Prov. 20:22", t: "No digas: Yo me vengaré; espera a Jehová, y él te salvará.", a: "IE: El rencor drena tu energía. Soltar la ofensa es una decisión estratégica para mantener tu enfoque y paz mental." },
    "Orgullo": { v: "Prov. 11:2", t: "Cuando viene la soberbia, viene también la deshonra; mas con los humildes está la sabiduría.", a: "IE: La arrogancia cierra puertas. La humildad profesional te permite aprender de otros y crecer constantemente." },
    "Necedad": { v: "Prov. 12:15", t: "El camino del necio es derecho en su opinión; mas el que obedece al consejo es sabio.", a: "IE: No te encierres en tu propia verdad. Escuchar perspectivas diferentes es la base de una toma de decisiones brillante." },
    "Ansiedad": { v: "Prov. 12:25", t: "La congoja en el corazón del hombre lo abate; mas la buena palabra lo alegra.", a: "IE: El estrés crónico bloquea la creatividad. Busca un mentor; una conversación honesta puede cambiar tu día." },
    "Tristeza": { v: "Prov. 17:22", t: "El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.", a: "IE: Tu estado de ánimo afecta tu salud física. Cultiva la gratitud como un antídoto contra el desánimo profundo." },
    "Miedo": { v: "Prov. 29:25", t: "El temor del hombre pondrá lazo; mas el que confía en Jehová será levantado.", a: "IE: El miedo al 'qué dirán' es una trampa. Tu seguridad debe nacer de tu identidad, no de la aprobación externa." },
    "Agotamiento": { v: "Prov. 3:24", t: "Cuando te acuestes, no tendrás temor... y tu sueño será grato.", a: "IE: El descanso no es ocio, es mantenimiento. Un líder cansado toma malas decisiones." },
    "Frustración": { v: "Prov. 19:11", t: "La cordura del hombre detiene su furor, y su honra es pasar por alto la ofensa.", a: "IE: No dejes que los obstáculos arruinen tu carácter. La madurez se demuestra al ignorar ofensas menores." },
    "Envidia": { v: "Prov. 14:30", t: "El corazón apacible es vida de la carne; mas la envidia es carcoma de los huesos.", a: "IE: El éxito ajeno no es tu fracaso. Aprende a colaborar en lugar de competir de forma tóxica." },
    "Soledad": { v: "Prov. 18:24", t: "El hombre que tiene amigos ha de mostrarse amigo; y amigo hay más unido que un hermano.", a: "IE: El aislamiento debilita. Invierte tiempo en construir relaciones genuinas; da antes de recibir." },
    "Chisme": { v: "Prov. 16:28", t: "El hombre perverso levanta contienda, y el chismoso aparta a los mejores amigos.", a: "IE: La integridad es tu mayor activo. Mantener la confidencialidad te hace respetado." },
    "Rechazo": { v: "Prov. 27:6", t: "Fieles son las heridas del que ama; pero importunos los besos del que aborrece.", a: "IE: A veces la crítica es el mejor espejo. Aprende a distinguir el feedback constructivo." },
    "Deslealtad": { v: "Prov. 25:19", t: "Como diente roto y pie descoyuntado es la confianza en el prevaricador en tiempo de angustia.", a: "IE: Cumplir tu palabra es vital. La coherencia construye una marca personal sólida." },
    "Pereza": { v: "Prov. 6:6", t: "Ve a la hormiga, oh perezoso, mira sus caminos, y sé sabio.", a: "IE: Empieza con pequeñas acciones; la motivación suele llegar después de haber iniciado el trabajo." },
    "Codicia": { v: "Prov. 15:16", t: "Mejor es lo poco con el temor de Jehová, que el gran tesoro donde hay turbación.", a: "IE: No sacrifiques tu paz por dinero. La verdadera prosperidad incluye bienestar emocional." },
    "Indecisión": { v: "Prov. 3:5", t: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", a: "IE: Cuando la lógica no baste, confía en tus valores fundamentales. La fe da valor para el primer paso." },
    "Confusión": { v: "Prov. 4:26", t: "Examina la senda de tus pies, y todos tus caminos sean rectos.", a: "IE: Detente y analiza. La claridad mental viene de evaluar tus metas con tus principios éticos." },
    "Distracción": { v: "Prov. 4:25", t: "Tus ojos miren lo recto, y diríjanse tus párpados a lo que tienes delante.", a: "IE: El enfoque es un superpoder moderno. Protege tu atención de lo trivial." },
    "Culpa": { v: "Prov. 28:13", t: "El que encubre sus pecados no prosperará; mas el que los confiesa y se aparta alcanzará misericordia.", a: "IE: Errar es humano, ocultarlo es necio. La responsabilidad sana tu mente y reputación." },
    "Inseguridad": { v: "Prov. 3:26", t: "Porque Jehová será tu confianza, y él preservará tu pie de quedar preso.", a: "IE: Tu valor no depende de tus logros. Camina con la seguridad de que tienes un propósito mayor." },
    "Presunción": { v: "Prov. 27:2", t: "Alábete el extraño, y no tu propia boca; el ajeno, y no los labios tuyos.", a: "IE: Deja que tus resultados hablen por ti. La marca personal más fuerte es la que otros validan." },
    "Injusticia": { v: "Prov. 21:3", t: "Hacer justicia y juicio es a Jehová más agradable que sacrificio.", a: "IE: La integridad profesional no es negociable. Actuar correctamente define tu éxito a largo plazo." },
    "Desánimo": { v: "Prov. 24:10", t: "Si fueres flojo en el día de trabajo, tu fuerza será reducida.", a: "IE: La resiliencia se entrena en la crisis. No te rindas cuando el camino se ponga difícil." },
    "Gratitud": { v: "Prov. 15:15", t: "El de corazón alegre tiene un banquete continuo.", a: "IE: La gratitud cambia tu percepción de la realidad y atrae más oportunidades." },
    "Curiosidad": { v: "Prov. 18:15", t: "El corazón del prudente adquiere sabiduría; y el oído de los sabios busca la ciencia.", a: "IE: Mantén una mentalidad de aprendiz permanente. Quien busca saber más, lidera mejor." },
    "Generosidad": { v: "Prov. 11:25", t: "El alma generosa será prosperada; y el que saciare, él también será saciado.", a: "IE: Ayudar a otros a crecer es la mejor forma de crecer tú mismo." },
    "Optimismo": { v: "Prov. 13:12", t: "Árbol de vida es el deseo cumplido.", a: "IE: Mantén la visión clara. La esperanza activa te da la energía necesaria para persistir." },
    "Integridad": { v: "Prov. 10:9", t: "El que camina en integridad camina confiado.", a: "IE: Nada da más paz que no tener nada que esconder. Es el fundamento de una carrera sólida." },

        "Ira": { v: "Prov. 15:1", t: "La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.", a: "No reacciones al calor del momento. Una respuesta calmada desarma conflictos antes de que escalen." },
        "Ansiedad": { v: "Prov. 12:25", t: "La congoja en el corazón del hombre lo abate; mas la buena palabra lo alegra.", a: "El estrés bloquea la creatividad. Busca un mentor o amigo; una conversación honesta puede cambiar tu día." },
        "Orgullo": { v: "Prov. 11:2", t: "Cuando viene la soberbia, viene también la deshonra; mas con los humildes está la sabiduría.", a: "La arrogancia cierra puertas. La humildad profesional te permite aprender de otros y crecer constantemente." },
        "Impaciencia": { v: "Prov. 19:2", t: "El alma sin ciencia no es buena, y el que se apresura con los pies, peca.", a: "Correr sin dirección no es progreso. Evalúa los riesgos antes de actuar impulsivamente." },
        "Miedo": { v: "Prov. 29:25", t: "El temor del hombre pondrá lazo; mas el que confía en Jehová será levantado.", a: "El miedo al 'qué dirán' es una trampa. Tu seguridad debe nacer de tu identidad, no de la aprobación externa." },
        "Tristeza": { v: "Prov. 17:22", t: "El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.", a: "Tu estado de ánimo afecta tu salud física. Cultiva la gratitud como un antídoto contra el desánimo." },
        "Pereza": { v: "Prov. 6:6", t: "Ve a la hormiga, oh perezoso, mira sus caminos, y sé sabio.", a: "La autogestión es clave. Empieza con pequeñas acciones hoy mismo." },
        "Frustración": { v: "Prov. 19:11", t: "La cordura del hombre detiene su furor, y su honra es pasar por alto la ofensa.", a: "No dejes que los obstáculos arruinen tu carácter. La madurez ignora ofensas menores." },
        "Envidia": { v: "Prov. 14:30", t: "La envidia es carcoma de los huesos.", a: "El éxito ajeno no es tu fracaso. Colaborar en lugar de competir potenciará tu carrera." },
        "Soledad": { v: "Prov. 18:24", t: "El hombre que tiene amigos ha de mostrarse amigo.", a: "El aislamiento debilita. Invierte tiempo en construir relaciones genuinas dando antes de recibir." },
        "Confusión": { v: "Prov. 4:26", t: "Examina la senda de tus pies, y todos tus caminos sean rectos.", a: "Detente y analiza. La claridad mental viene de evaluar tus metas con tus principios éticos." },
        "Inseguridad": { v: "Prov. 3:26", t: "Porque Jehová será tu confianza.", a: "Tu valor real no depende de tus logros. Camina con la seguridad de tu propósito." },
        "Venganza": { v: "Prov. 20:22", t: "No digas: Yo me vengaré; espera a Jehová.", a: "El rencor drena tu energía. Soltar la ofensa es una decisión estratégica para tu paz." },
        "Chisme": { v: "Prov. 16:28", t: "El chismoso aparta a los mejores amigos.", a: "La integridad es tu mayor activo. Mantener la confidencialidad te hace respetado." },
        "Codicia": { v: "Prov. 15:16", t: "Mejor es lo poco con temor de Jehová, que gran tesoro con turbación.", a: "No sacrifiques tu paz por dinero. La verdadera prosperidad incluye bienestar emocional." },
        "Indecisión": { v: "Prov. 3:5", t: "Fíate de Jehová... no te apoyes en tu propia prudencia.", a: "Cuando la lógica no baste, confía en tus valores fundamentales para dar el primer paso." },
        "Agotamiento": { v: "Prov. 3:24", t: "Cuando te acuestes... tu sueño será grato.", a: "El descanso es mantenimiento. Un líder cansado toma malas decisiones. ¡Duerme tranquilo!" },
        "Necedad": { v: "Prov. 12:15", t: "El que obedece al consejo es sabio.", a: "No te encierres en tu opinión. Escuchar a otros es la base de decisiones brillantes." },
        "Distracción": { v: "Prov. 4:25", t: "Tus ojos miren lo recto.", a: "El enfoque es un superpoder. Protege tu atención de lo trivial para lo importante." },
        "Culpa": { v: "Prov. 28:13", t: "El que confiesa y se aparta alcanzará misericordia.", a: "Errar es humano. La responsabilidad (accountability) sana tu mente y reputación." },
        "Rechazo": { v: "Prov. 27:6", t: "Fieles son las heridas del que ama.", a: "Aprende a distinguir entre un ataque personal y un feedback que te hará mejorar." },
        "Presunción": { v: "Prov. 27:2", t: "Alábete el extraño, y no tu propia boca.", a: "Deja que tus resultados hablen por ti. La marca personal más fuerte la validan otros." },
        "Injusticia": { v: "Prov. 21:3", t: "Hacer justicia y juicio es agradable a Jehová.", a: "La integridad no es negociable. Actuar bien aunque nadie mire define tu éxito." },
        "Desánimo": { v: "Prov. 24:10", t: "Si fueres flojo en el día de trabajo, tu fuerza será reducida.", a: "La resiliencia se entrena en la crisis. No te rindas cuando el camino se ponga difícil." },
        "Gratitud": { v: "Prov. 15:15", t: "El de corazón alegre tiene un banquete continuo.", a: "La gratitud cambia tu percepción de la realidad. Enfocarte en lo que tienes atrae más." },
        "Curiosidad": { v: "Prov. 18:15", t: "El oído de los sabios busca la ciencia.", a: "Mantén mentalidad de aprendiz permanente. Quien busca saber más, lidera mejor." },
        "Generosidad": { v: "Prov. 11:25", t: "El alma generosa será prosperada.", a: "Ayudar a otros a crecer es la mejor forma de crecer tú mismo. Crea redes de apoyo." },
        "Optimismo": { v: "Prov. 13:12", t: "Árbol de vida es el deseo cumplido.", a: "Mantén la visión clara. La esperanza activa te da la energía para persistir." },
        "Integridad": { v: "Prov. 10:9", t: "El que camina en integridad camina confiado.", a: "Nada da más paz que no tener nada que esconder. Es el fundamento de tu carrera." },
        "Deslealtad": { v: "Prov. 25:19", t: "Como diente roto es la confianza en el prevaricador.", a: "Cumplir tu palabra es vital para construir una reputación sólida a largo plazo." }

};
    // Función principal para generar los botones
    function inicializarEmociones() {
        const grid = document.getElementById('gridEmociones');
        if (!grid) return;

        grid.innerHTML = ""; // Limpiar por si acaso

        for (let em in dataEmociones) {
            const btn = document.createElement('button');
            btn.className = 'emotion-btn';
            btn.innerHTML = `<i class="fas fa-heart" style="font-size:0.7em; color:var(--accent);"></i> ${em}`;
            
            btn.onclick = function() {
                const display = document.getElementById('result-display');
                const item = dataEmociones[em];

                document.getElementById('view-emotion').innerText = em.toUpperCase();
                document.getElementById('view-verse').innerText = `${item.v}: "${item.t}"`;
                document.getElementById('view-advice').innerText = item.a;

                display.style.display = 'block';
                display.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            
            grid.appendChild(btn);
        }
    }

    // Ejecutar al cargar la ventana
    window.addEventListener('load', inicializarEmociones);