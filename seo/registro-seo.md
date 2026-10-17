# Registro SEO diario — ponte-al-dia.com

Lo actualiza la tarea programada "SEO diario". Cada entrada: datos de Search Console, acciones, pendientes.

## Estado de las guías (actualizado 2026-10-17)
| URL | Estado | Último rastreo |
|---|---|---|
| /guias/n8n | Rastreada: sin indexar | 7 oct (comprobado 17 oct) |
| /guias/skills | Rastreada: sin indexar | 12 oct (comprobado 17 oct) |
| /guias/ia-para-abogados | Rastreada: sin indexar | 6 oct (pedida 6 oct) |
| /guias/ia-para-marketers | Rastreada: sin indexar | 7 oct |
| /guias/ia-para-community-managers | Rastreada: sin indexar | 13 ago (pedida 6 oct) |
| /guias/ia-para-sanitarios | Rastreada: sin indexar | 28 jul |
| /guias/ia-para-comerciales | Rastreada: sin indexar | 27 jul |
| /guias, /guias/ia-para-desarrolladores | Pedidas 6 oct | sin comprobar |
| resto de guías | Sin comprobar | — |

**Conclusión:** el problema ya no es que Google no las encuentre, sino que las rastrea y decide no indexarlas. Pedir indexación de nuevo no sirve (ninguna guía ha cambiado desde su último rastreo); hay que subir valor percibido y autoridad (contenido único, autoría real, enlaces internos y externos). El contenido profundo ya está en las PRs #4/#5/#6 pendientes de merge.

## 2026-10-17
**Search Console — Rendimiento (28 días):** 0 clics, 7 impresiones, CTR 0 %. Prácticamente plano; todas las impresiones las captan la home y posts /p/ de bots, ninguna guía.

**Rendimiento (3 meses, 52 consultas):** 1 clic en total.
- "midudev twitter": 1 clic, 5 impr, CTR 20 %, pos. 14,8 (único clic del trimestre).
- "n8n que es": 7 impr, pos. 72,7 · "n8n español": 6 impr, pos. 69,7 → la guía /guias/n8n ya está desplegada pero rankea muy abajo.
- "sakana" (9 impr, pos. 64,9), "midudev" (5 impr, pos. 54) y una larga cola de papers/repos (foresight, meshflow, eventvla, gpt_academic) que capturan los posts /p/ de los bots.
- Páginas con impresiones: solo la home (7 impr, pos. 24,3) y /p/paper-chartwalker… (1 impr, pos. 2). **Ninguna /guias/** aparece en la tabla de páginas.
- Sigue sin haber ni una sola consulta "IA para [profesión]".

**Indexación:** 16 indexadas (17 el 7 oct, 22 el 6 oct → sigue bajando poco a poco). No indexadas por motivo: Rastreada: sin indexar **118** (107 el 7 oct), Descubierta: sin indexar 18 (14), Excluida por noindex 23 (intencional: /out, /u/…), Alternativa con canónica adecuada 3 (nuestras canónicas funcionando), Redirección 3, Bloqueada por robots.txt 2, Duplicada sin canónica 1.

**Inspección de URLs:** /guias/n8n → "Rastreada: sin indexar", último rastreo 7 oct. /guias/skills → "Rastreada: sin indexar", último rastreo 12 oct. Ambas rastreadas DESPUÉS de su despliegue (PR #3) y sin cambios desde entonces.

**Indexación solicitada:** ninguna. Ni una sola guía ha cambiado desde su último rastreo (las PRs de contenido #4/#5/#6 no están mergeadas), así que pedir indexación no aportaría nada y gastaría cupo. Es un problema de calidad/autoridad, no de descubrimiento.

**Verificación técnica (en vivo):** las guías están impecables — robots `index, follow`, canónica correcta y JSON-LD rico (Article + HowTo + FAQPage en /guias/n8n; Article + FAQPage + BreadcrumbList en las de profesión; CollectionPage + ItemList + BreadcrumbList en /guias). No hay defecto técnico que explique el "rastreada sin indexar".

**Acciones (PR de hoy):**
- Nuevo bloque "Guías de herramientas" en la barra lateral derecha (`RightSidebar.tsx`) con enlaces internos a /guias/skills y /guias/n8n. Hasta hoy esas dos páginas solo recibían enlaces desde dentro de otras guías; ahora las enlazan también la home, /top, /populares, /debates y /tendencias (las superficies que Google más rastrea). Son justo las dos guías con impresiones propias y "rastreadas sin indexar", así que es donde un empujón de autoridad interna puede moverlas. Fichero no tocado por las PRs #4/#5/#6, sin conflicto.

**Pendiente / ideas para mañana:**
- **Mergear las PRs #4/#5/#6** (casos prácticos, Article JSON-LD completo, guías relacionadas, FAQPage en el hub). Es el contenido que puede cambiar la percepción de calidad; hasta que no se despliegue, pedir indexación no sirve. Tras el merge: pedir indexación de las guías cambiadas.
- Autoría real / E-E-A-T (nombre, foto, LinkedIn de Marcos + Person schema) — sigue pendiente de aprobación de Marcos.
- Enlaces externos (directorios de IA en español, asociaciones profesionales, comunidades) — fuera del código.
- Valorar noindex en posts /p/ finos y listados filtrados que inflan "Rastreada: sin indexar" (118) y diluyen el presupuesto de rastreo.

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
