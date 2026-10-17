# Registro SEO diario — ponte-al-dia.com

Lo actualiza la tarea programada "SEO diario". Cada entrada: datos de Search Console, acciones, pendientes.

## Estado de las guías (actualizado 2026-10-15)
| URL | Estado | Último rastreo |
|---|---|---|
| /guias/skills | ✅ **Indexada** | 12 oct |
| /guias/ia-para-rrhh | Rastreada: sin indexar | 13 oct (pedida 13 oct; antes desconocida) |
| /guias/ia-para-arquitectos | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-disenadores | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-desarrolladores | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-gestores | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-hosteleros | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-periodistas | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-profesores | Rastreada: sin indexar | 12 oct |
| /guias/ia-para-psicologos | Rastreada: sin indexar | 12 oct |
| /guias/n8n | Rastreada: sin indexar | 7 oct (comprobado 15 oct) |
| /guias | Rastreada: sin indexar | 6 oct |
| /guias/ia-para-abogados | Rastreada: sin indexar | 6 oct |
| /guias/ia-para-marketers | Rastreada: sin indexar | 7 oct |
| /guias/ia-para-community-managers | Rastreada: sin indexar | 13 ago |
| /guias/ia-para-sanitarios | Rastreada: sin indexar | 28 jul |
| /guias/ia-para-comerciales | Rastreada: sin indexar | 27 jul |

**Conclusión:** Google ya conoce las 14 guías por profesión y las 14 están en "Rastreada: sin indexar". Es un problema de calidad percibida y autoridad, no de rastreo. No se vuelve a pedir indexación hasta que cambie el contenido en producción (PRs #4, #5 y la de hoy).

## 2026-10-15
**Search Console (rendimiento, 28 días):** 0 clics, 7 impresiones, CTR 0 %, posición 24,3. Igual que el 12 y el 13 oct: los datos siguen llegando hasta ~11 oct. Única consulta: "ponte al dia" (1 impresión).

**Indexación** (informe del 9 oct, sin actualizar): 16 indexadas, 160 sin indexar (rastreada sin indexar 111, descubierta sin indexar 19, noindex 19, redirección 3, canónica alternativa 3, duplicada sin canónica 3, robots.txt 2).

**Inspecciones:** /guias/ia-para-rrhh pasa de "Google no reconoce esta URL" a "Rastreada: actualmente sin indexar" (rastreo 13 oct, 11:50). /guias/n8n sigue igual (rastreo 7 oct).

**URLs con indexación pedida:** ninguna. Todas las guías son conocidas y el contenido en producción no ha cambiado desde el 7 oct (las PRs #4 y #5 siguen sin mergear).

**Cambios (PR `seo/2026-10-15`) — /guias deja de ser una página fina:**
- El hub /guias era un H1, dos líneas y tarjetas. Ahora tiene contenido propio (~600 palabras más): qué trae cada guía, por dónde empezar si nunca has usado IA en el trabajo (3 pasos), tres reglas que valen para cualquier profesión (responsabilidad, verificar datos, privacidad) y 4 preguntas frecuentes con **FAQPage JSON-LD**, más enlace a /debates.
- "casos reales" → "casos prácticos" en la meta descripción, OG y la entradilla (coherente con la PR #5).
- Solo toca `src/app/guias/page.tsx` y este registro: sin conflictos de código con #4/#5. En `seo/registro-seo.md` sí habrá conflicto con #4/#5 (las entradas del 12 y 13 oct viven en esas ramas): al resolver, conservar las tres entradas y la tabla de estado de hoy.

**Ideas para mañana:**
- Contenido diferencial por guía (normativa y límites propios de cada profesión: secreto profesional, RGPD de datos de salud, uso en el aula). Mejor hacerlo cuando se mergee la PR #5, que toca los 14 ficheros de datos, para no generar conflictos.
- Autoría real (nombre, foto, bio, LinkedIn + `Person` schema): sigue pendiente de que Marcos lo apruebe.
- Cuando se desplieguen #4, #5 y esta PR: pedir indexación de /guias y de 2-3 guías por profesión con más cambios.
- Enlaces externos de calidad hacia las guías (depende de Marcos).

## 2026-10-13
**Search Console (rendimiento, 28 días):** 0 clics, 7 impresiones, CTR 0 %, posición 24,3. Sin cambios frente a ayer (los datos llegan hasta ~10 oct). Única consulta visible: "ponte al dia" (1 impresión).

**Indexación** (informe del 9 oct, sin actualizar): 16 indexadas, 160 sin indexar. Mismos motivos que ayer (rastreada sin indexar 111, descubierta sin indexar 19, noindex 19…).

**Inspecciones:** las 8 guías pedidas ayer (arquitectos, diseñadores, desarrolladores, gestores, hosteleros, periodistas, profesores, psicólogos) pasan de "Google no reconoce esta URL" a **"Rastreada: actualmente sin indexar"** (rastreo 12 oct, 20:01-20:16). No se pide de nuevo.

**URLs con indexación pedida (1):** /guias/ia-para-rrhh ("Google no reconoce esta URL") → "Se ha solicitado la indexación".

**Cambios (PR `seo/2026-10-13`) — confianza y calidad en las 14 guías:**
- **"Caso real" → "Caso práctico"** en el título de los 14 casos y en el índice, con una nota visible: ejemplo ilustrativo, tiempos orientativos. Los casos no se pueden verificar (no hay persona ni fuente); presentarlos como reales resta confianza (E-E-A-T) y choca con la regla de no inventar casos.
- **Bug visible corregido:** en 8 guías (abogados, arquitectos, desarrolladores, diseñadores, gestores, profesores, RRHH, sanitarios) se leía "Antes: Antes: …" y "Después: Después: …" porque el dato repetía la etiqueta que ya pone la plantilla.
- **Article JSON-LD más completo:** `publisher` (Organization con logo), `mainEntityOfPage`, `inLanguage: es-ES`, `url` del autor.
- Nota: esta PR parte de main y lleva el registro con la entrada del 12 oct (PR #4); si se mergea #4 antes, el conflicto en `seo/registro-seo.md` se resuelve quedándose con esta versión.

**Ideas para mañana:**
- Contenido diferencial por guía (la palanca real ahora): una sección propia de cada profesión con normativa/limitaciones concretas (p. ej. secreto profesional en abogados y psicólogos, RGPD en datos de pacientes, uso en el aula). Empezar por las 2-3 guías con más interés previsible (abogados, marketers, profesores).
- Autoría real (nombre, foto, bio y LinkedIn de Marcos + `Person` schema): sigue pendiente de que Marcos lo apruebe; es probablemente la mejora E-E-A-T con más impacto.
- Revisar la entrada de /guias (hub): texto introductorio propio y más largo, no solo tarjetas.
- Enlaces externos de calidad hacia las guías (comunidades, colegios profesionales) — depende de Marcos.

## 2026-10-12
**Search Console (rendimiento):**
- 28 días: 0 clics, 7 impresiones, CTR 0 %, posición media 24,3. Caída fuerte: casi todas las impresiones de los 90 días son anteriores a mediados de septiembre.
- 90 días: 3 clics, 604 impresiones (6 oct: 4 clics / 718), CTR 0,5 %, posición 18,6. Consultas: "midudev twitter" (1 clic), "skills", "n8n que es", "n8n español", "que es skill" (pos. 16,5), "qué es una skill" (pos. 16,3) y nombres de papers/repos de los posts de bots.
- Hipótesis de la caída (sin confirmar): los posts /p/ de bots que daban impresiones por nombres de papers se perdieron con la migración de la DB de octubre. Las consultas que nos interesan (skills, n8n) siguen con pocas impresiones.

**Indexación** (actualizado 9 oct): 16 indexadas (7 oct: 17), 160 sin indexar (7 oct: 150). Rastreada sin indexar 111 (43 /p/, 11 /out, 10 /guias…), Descubierta sin indexar 19, noindex 19, redirección 3, canónica alternativa 3, duplicada sin canónica 3, bloqueada por robots 2.
- **Buena noticia:** /guias/skills (versión nueva) rastreada hoy e **indexada**.

**URLs con indexación pedida (8, cupo del día):** /guias/ia-para-arquitectos, -disenadores, -desarrolladores (2.ª vez), -gestores, -hosteleros, -periodistas, -profesores, -psicologos. Todas "Google no reconoce esta URL". No se pidió para n8n, marketers, abogados, etc. (rastreadas hace <7 días sin cambios).

**Cambios (PR `seo/2026-10-12`):**
- Bloque "Guías relacionadas" al final de cada guía por profesión: 3 guías afines elegidas a mano (con icono y tagline) + enlaces de texto al resto de guías y a /guias/skills y /guias/n8n. Cada guía pasa de enlazar 1-2 guías a 15. Objetivo: que Google descubra las 8 guías desconocidas desde las que ya rastrea y repartir autoridad entre ellas.

**Ideas para mañana:**
- Pedir indexación de /guias/ia-para-rrhh y volver a mirar si las 8 pedidas ya son conocidas.
- Revisar en Rendimiento → Páginas qué URLs perdieron impresiones en septiembre para confirmar la hipótesis de la DB.
- Seguir con valor/autoridad: autoría real (pendiente de que Marcos apruebe datos), casos concretos por profesión, enlaces externos.
- Valorar noindex en posts /p/ de bots sin interacción (43 en "Rastreada sin indexar").

## 2026-10-07
**Search Console:** el informe de indexación se ha actualizado: 17 indexadas (antes 22), 150 sin indexar (antes 270). "Descubierta: sin indexar" baja de 139 a 14 (Google procesó la cola); "Rastreada: sin indexar" 107.
- En "Rastreada: sin indexar": 44 posts /p/, 11 URLs /out?… (página intermedia con anuncio), 6 de /guias (incluidas variantes con query), 8 de /u/, listados con filtros.

**Acciones (PR #3, pendiente de merge):**
- /guias/skills ampliada (~1.250 palabras, Article + FAQPage + Breadcrumb) para "qué es una skill" (pos. 9-16).
- Nueva /guias/n8n (~1.150 palabras, Article + HowTo + FAQPage) para "n8n que es" / "n8n español".
- Sitemap con fechas reales por guía (antes cambiaban en cada lectura) y /guias/n8n.
- /out → noindex, nofollow; enlaces a /out → nofollow.
- Canónica en /guias, /debates, /herramientas; 16 títulos sin marca duplicada.
- La ejecución programada de hoy se quedó bloqueada esperando un permiso desde las 9:42; se paró y su trabajo está incluido en la PR #3.

**Ideas para próximos días:**
- Autoría real en guías (nombre, foto, LinkedIn de Marcos + Person schema) — pendiente de que Marcos lo apruebe.
- Diferenciar las 14 guías: comparten estructura y frases; añadir ejemplos y casos específicos de cada profesión.
- Enlaces externos: directorios de IA en español, colegios y asociaciones profesionales, comunidades (sin spam).
- Valorar noindex en /herramientas (lista corta de afiliados).

## 2026-10-06 (primera revisión)
**Search Console (90 días):** 4 clics, 718 impresiones, CTR 0,6 %, posición media 18,3.
- Consultas con impresiones: "que es skill"/"skills"/"qué es una skill" (pos. 9-83), n8n ("n8n que es", "n8n español", pos. ~70), y nombres de papers/repos que publican los bots.
- Ninguna consulta "IA para [profesión]" todavía.

**Indexación:** 22 indexadas / 270 sin indexar.
- 139 "Descubierta: sin indexar" + 108 "Rastreada: sin indexar" → casi todo posts /p/ de bots (contenido fino que enlaza fuera).
- Indexadas páginas basura: /u/ada/siguiendo, /ranking?tab=…, /tendencias?categoria=…, /top?categoria=…, /populares?categoria=…
- **Ninguna guía indexada.** Inspección de /guias/ia-para-abogados: "Google no reconoce esta URL" (aunque están en el sitemap, leído el 5 oct con 25 URLs).

**Acciones:**
- Solicitada indexación: /guias/ia-para-abogados, /guias, /guias/ia-para-community-managers, /guias/ia-para-desarrolladores.
- Código (sin commit, pendiente de aprobar):
  - Canónica en /tendencias, /top, /populares, /ranking (los filtros por query param eran duplicados) + títulos sin la marca duplicada ("Subiendo | Ponte al dIA").
  - `noindex, follow` en /u/[handle]/siguiendo y /seguidores.
  - Bloque "Guías de IA por profesión" en la barra lateral derecha con enlaces a las 14 guías (antes solo se llegaba a ellas por /guias).

**Ideas para próximos días:**
- Guía nueva "Qué es n8n" / "n8n en español" (ya hay impresiones sin página dedicada).
- Reforzar /guias/skills para "qué es una skill" (pos. 9-16, cerca del top 10).
- Valorar `noindex` en posts /p/ de bots sin comentarios ni votos para concentrar el rastreo.
