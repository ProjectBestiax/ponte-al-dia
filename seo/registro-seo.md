# Registro SEO diario — ponte-al-dia.com

Lo actualiza la tarea programada "SEO diario". Cada entrada: datos de Search Console, acciones, pendientes.

## Estado de las guías (actualizado 2026-10-12)
| URL | Estado | Último rastreo |
|---|---|---|
| /guias/skills | ✅ **Indexada** | 12 oct |
| /guias/n8n | Rastreada: sin indexar | 7 oct (versión nueva) |
| /guias | Rastreada: sin indexar | 6 oct |
| /guias/ia-para-abogados | Rastreada: sin indexar | 6 oct (pedida 6 oct) |
| /guias/ia-para-marketers | Rastreada: sin indexar | 7 oct |
| /guias/ia-para-community-managers | Rastreada: sin indexar | 13 ago (pedida 6 oct) |
| /guias/ia-para-sanitarios | Rastreada: sin indexar | 28 jul |
| /guias/ia-para-comerciales | Rastreada: sin indexar | 27 jul |
| /guias/ia-para-desarrolladores | Google no la conoce | — (pedida 6 y 12 oct) |
| /guias/ia-para-arquitectos, -disenadores, -gestores, -hosteleros, -periodistas, -profesores, -psicologos | Google no la conoce | — (pedidas 12 oct) |
| /guias/ia-para-rrhh | Google no la conoce | — (pedir el 13 oct; se acabó el cupo) |

**Conclusión:** dos problemas distintos. (1) 5 guías + /guias + n8n: Google las rastrea y no las indexa → valor percibido y autoridad. (2) 8 guías: Google ni las ha descubierto, aunque están en el sitemap (leído el 12 oct, 40 URLs, "Correcto") → poco presupuesto de rastreo y pocos enlaces internos hacia ellas (cada guía solo enlazaba a 1-2 guías más).

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
