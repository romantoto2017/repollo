# Ejecución del handoff

Los 5 movimientos se aplicaron. Hechos medidos, antes → después:

| Métrica | Antes | Después |
|---|---|---|
| Fallas de contraste | 3 | **0** |
| Animaciones en reposo | 5 | **1** (la marquesina, que lleva contenido) |
| Hex fuera de `:root` | 8 | **0** |
| Marcadores de tendencia fechados | 3 | **0** |
| Afirmaciones sin respaldo | 3 | **0** |
| Keyframes huérfanos | — | 0 |

## Cambios

**#6 Honest.** "Más elegido" → "Nuestra recomendación": deja de ser una
estadística inventada sobre otros clientes y pasa a ser una opinión propia,
que es verificable como tal. Se eliminó `.hero__meta` entero, que contenía
"Respuesta en 24 h" (un compromiso de servicio que nadie acordó) y
"100 % remoto".

**#5 Unobtrusive / #9.** De 5 animaciones en reposo a 1. Se eliminaron el punto
pulsante, la flotación de la tarjeta, los 3 blobs y el sello giratorio.
Sobrevive la marquesina porque lleva contenido, no decoración.

**Contraste.** `.mark-hl` pasa de `--coral` a `--coral-700`: 2.54 → **4.13**
(requiere 3.0). `--ink-3` de `#55736F` a `#4A6663`. La tercera falla,
`.card__num` de la tarjeta destacada, era una regla aparte:
`rgba(241,251,244,.5)` → `.6`, 4.49 → **5.79**. Se eligieron valores con
margen, no al filo, precisamente porque la causa raíz original fue un cambio
de fondo que invalidó verificaciones que estaban justo en el límite.

**#7 Long-lasting.** Sello circular giratorio y blobs con blur: eliminados.
Marquesina: se le quitó la inclinación (`rotate(-1.4deg) scale(1.06)`), que era
la parte fechada; un ticker recto es un recurso de larga data.

**#3 Aesthetic.** Los 8 hex pasaron a tokens en `:root`: `--butter-050`,
`--butter-ink`, `--teal-wash`, y los 6 de planes con sus 3 halos.

## Regresión (lo que puntuaba 3/3)

Verificado tras los cambios: skip link presente, 14 landmarks, 1 solo `h1`,
0 imágenes sin `alt`, 4 enlaces de nav, 3 canales, 7 botones, 3 planes,
5 tarjetas, scrollspy respondiendo, 0 errores de JS, y sin scroll horizontal
en 320/390/768/1024 px.

## Nota sobre el puntaje

No se declara un total nuevo. Los deltas de arriba están medidos, pero
re-puntuar sin volver a correr la auditoría completa sería exactamente la
inflación de puntaje que la skill advierte evitar. Para un número nuevo hay
que volver a correr `design-is`.
