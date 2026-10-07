# Registro SEO diario — ponte-al-dia.com

Lo actualiza la tarea programada "SEO diario". Cada entrada: datos de Search Console, acciones, pendientes.

## Estado de las guías (actualizado 2026-10-07)
| URL | Estado | Último rastreo |
|---|---|---|
| /guias/ia-para-abogados | Rastreada: sin indexar | 6 oct (pedida 6 oct) |
| /guias/ia-para-marketers | Rastreada: sin indexar | 7 oct |
| /guias/ia-para-community-managers | Rastreada: sin indexar | 13 ago (pedida 6 oct) |
| /guias/ia-para-sanitarios | Rastreada: sin indexar | 28 jul |
| /guias/ia-para-comerciales | Rastreada: sin indexar | 27 jul |
| /guias/skills | Rastreada: sin indexar (versión antigua) | 5 jul — pedir tras desplegar la versión nueva |
| /guias/n8n | Nueva — pedir tras desplegar | — |
| /guias, /guias/ia-para-desarrolladores | Pedidas 6 oct | sin comprobar |
| resto de guías | Sin comprobar | — |

**Conclusión:** el problema ya no es que Google no las encuentre, sino que las rastrea y decide no indexarlas. Pedir indexación de nuevo no sirve; hay que subir valor percibido y autoridad (contenido único, autoría real, enlaces externos).

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
