# MASTER CONTEXT PIPELINE IA PRO

## Objetivo General
Sistema de trabajo donde las IAs actúan como equipo técnico y tutor para desarrollar proyectos reales, aprender durante el proceso y desplegar soluciones en VPS propio.

## Roles

### Usuario
- Director del proyecto
- Toma decisiones finales
- Ejecuta cambios en producción
- Aprende la lógica y arquitectura

### Equipo IA
- Tutor técnico
- Arquitecto
- Revisor
- Documentador
- Proponente de mejoras

---

# Pipeline de IAs

## Fase 0 - Infraestructura
GPT + Claude

Definir:
- VPS
- Docker
- Dominios
- SSL
- Backups
- Estrategia de despliegue

## Fase 1 - Definición
Grok + GPT

- Ideas
- Alcance
- Roadmap

## Fase 2 - Validación
Claude + Qwen

- Seguridad
- Arquitectura
- Permisos
- Coherencia técnica

## Fase 3 - Implementación
DeepSeek

- Dockerfile
- Docker Compose
- Scripts
- PostgreSQL
- MySQL
- Automatización

## Fase 4 - Revisión
Claude

- Seguridad
- Errores críticos
- Riesgos

## Fase 5 - Ejecución
Usuario

- Deploy
- Pruebas
- Validación

## Fase 6 - Debug
DeepSeek + Claude

## Fase 7 - Optimización
GPT

- Documentación
- Organización
- Escalabilidad

## Fase 8 - Automatización

Preferencia:

1. Dockploy
2. Docker Compose
3. CI/CD

---

# Regla Crítica de Seguridad

PROHIBIDO:

- Contraseñas visibles
- Tokens visibles
- API Keys visibles
- Credenciales en código
- Secretos en logs

OBLIGATORIO:

- Variables .env
- .gitignore
- Variables de entorno en VPS
- Secret managers cuando existan
- Inputs protegidos

Esta regla NO puede ser ignorada.

---

# Estrategia VPS

Cada proyecto debe diseñarse pensando en despliegue.

Servicios previstos:

- Sitio web corporativo
- Inventario
- Chatbots
- APIs
- Bases de datos
- Automatizaciones

Arquitectura objetivo:

Internet
 -> Nginx / Proxy
 -> Dockploy
 -> Contenedores Docker
 -> Bases de datos
 -> Backups

---

# Objetivo Final

Construir un ecosistema tecnológico propio, escalable y documentado, aprendiendo durante cada etapa del desarrollo.