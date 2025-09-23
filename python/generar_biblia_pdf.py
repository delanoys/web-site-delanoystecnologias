from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

# Datos de la Biblia
estructura = {
    "Antiguo Testamento": [
        ("Génesis", "Moisés", "Génesis 1:1"),
        ("Éxodo", "Moisés", "Éxodo 3:14"),
        ("Levítico", "Moisés", "Levítico 19:2"),
        ("Números", "Moisés", "Números 6:24-26"),
        ("Deuteronomio", "Moisés", "Deuteronomio 6:5"),
        ("Josué", "Josué", "Josué 1:9"),
        ("Jueces", "Samuel (trad.)", "Jueces 21:25"),
        ("Rut", "Samuel (trad.)", "Rut 1:16"),
        ("1 Samuel", "Samuel/Natán/Gad", "1 Samuel 16:7"),
        ("2 Samuel", "Natán/Gad", "2 Samuel 7:16"),
        ("1 Reyes", "Jeremías (trad.)", "1 Reyes 3:9"),
        ("2 Reyes", "Jeremías (trad.)", "2 Reyes 17:13"),
        ("1 Crónicas", "Esdras (trad.)", "1 Crónicas 16:11"),
        ("2 Crónicas", "Esdras (trad.)", "2 Crónicas 7:14"),
        ("Esdras", "Esdras", "Esdras 7:10"),
        ("Nehemías", "Nehemías", "Nehemías 8:10"),
        ("Ester", "Mardoqueo (trad.)", "Ester 4:14"),
        ("Job", "Desconocido", "Job 19:25"),
        ("Salmos", "David y otros", "Salmos 23:1"),
        ("Proverbios", "Salomón", "Proverbios 1:7"),
        ("Eclesiastés", "Salomón", "Eclesiastés 3:1"),
        ("Cantares", "Salomón", "Cantares 2:16"),
        ("Isaías", "Isaías", "Isaías 9:6"),
        ("Jeremías", "Jeremías", "Jeremías 29:11"),
        ("Lamentaciones", "Jeremías", "Lamentaciones 3:22-23"),
        ("Ezequiel", "Ezequiel", "Ezequiel 36:26"),
        ("Daniel", "Daniel", "Daniel 6:10"),
        ("Oseas", "Oseas", "Oseas 6:6"),
        ("Joel", "Joel", "Joel 2:28"),
        ("Amós", "Amós", "Amós 5:24"),
        ("Abdías", "Abdías", "Abdías 1:15"),
        ("Jonás", "Jonás", "Jonás 2:2"),
        ("Miqueas", "Miqueas", "Miqueas 6:8"),
        ("Nahúm", "Nahúm", "Nahúm 1:7"),
        ("Habacuc", "Habacuc", "Habacuc 2:4"),
        ("Sofonías", "Sofonías", "Sofonías 3:17"),
        ("Hageo", "Hageo", "Hageo 2:9"),
        ("Zacarías", "Zacarías", "Zacarías 4:6"),
        ("Malaquías", "Malaquías", "Malaquías 3:10"),
    ],
    "Nuevo Testamento": [
        ("Mateo", "Mateo", "Mateo 5:16"),
        ("Marcos", "Marcos", "Marcos 10:45"),
        ("Lucas", "Lucas", "Lucas 19:10"),
        ("Juan", "Juan", "Juan 3:16"),
        ("Hechos", "Lucas", "Hechos 1:8"),
        ("Romanos", "Pablo", "Romanos 1:16"),
        ("1 Corintios", "Pablo", "1 Corintios 13:13"),
        ("2 Corintios", "Pablo", "2 Corintios 5:17"),
        ("Gálatas", "Pablo", "Gálatas 5:22-23"),
        ("Efesios", "Pablo", "Efesios 2:8-9"),
        ("Filipenses", "Pablo", "Filipenses 4:13"),
        ("Colosenses", "Pablo", "Colosenses 3:23"),
        ("1 Tesalonicenses", "Pablo", "1 Tesalonicenses 5:16-18"),
        ("2 Tesalonicenses", "Pablo", "2 Tesalonicenses 3:3"),
        ("1 Timoteo", "Pablo", "1 Timoteo 4:12"),
        ("2 Timoteo", "Pablo", "2 Timoteo 3:16"),
        ("Tito", "Pablo", "Tito 2:11-12"),
        ("Filemón", "Pablo", "Filemón 1:6"),
        ("Hebreos", "Desconocido (trad. Pablo)", "Hebreos 11:1"),
        ("Santiago", "Santiago", "Santiago 1:5"),
        ("1 Pedro", "Pedro", "1 Pedro 5:7"),
        ("2 Pedro", "Pedro", "2 Pedro 3:9"),
        ("1 Juan", "Juan", "1 Juan 4:8"),
        ("2 Juan", "Juan", "2 Juan 1:6"),
        ("3 Juan", "Juan", "3 Juan 1:11"),
        ("Judas", "Judas", "Judas 1:21"),
        ("Apocalipsis", "Juan", "Apocalipsis 21:4"),
    ]
}

# Crear PDF
doc = SimpleDocTemplate("estructura_biblia_estudio.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []

story.append(Paragraph("📖 Estructura de la Biblia", styles['Title']))
story.append(Spacer(1, 12))

for testamento, libros in estructura.items():
    story.append(Paragraph(testamento, styles['Heading1']))
    for libro, autor, cita in libros:
        story.append(Paragraph(f"<b>{libro}</b> — Autor: {autor} — Referencia: {cita}", styles['Normal']))
        story.append(Spacer(1, 6))

doc.build(story)
print("PDF generado: estructura_biblia_estudio.pdf")
# Instrucciones para instalar reportlab si no está instalado:
# pip install reportlab 