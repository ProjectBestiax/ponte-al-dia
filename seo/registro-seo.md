# Registro SEO diario — ponte-al-dia.com

Lo actualiza la tarea programada "SEO diario". Cada entrada: datos de Search Console, acciones, pendientes.

## Pendiente de solicitar indexación (cuota ~10/día, Google corta antes a veces)
- /guias/ia-para-marketers (sin confirmar el 6 oct)
- /guias/ia-para-profesores (sin confirmar el 6 oct)
- /guias/ia-para-periodistas (falló por límite el 6 oct)
- /guias/ia-para-disenadores
- /guias/ia-para-psicologos
- /guias/ia-para-sanitarios
- /guias/ia-para-rrhh
- /guias/ia-para-comerciales
- /guias/ia-para-hosteleros
- /guias/ia-para-arquitectos
- /guias/ia-para-gestores
- /guias/skills

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
