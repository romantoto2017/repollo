# Veredicto: REDESIGN

**18/30.** La regla de la Fase 3 es mecánica: total < 20 → REDESIGN. No se
reescalan puntajes para llegar a un veredicto preferido.

Conviene leer el número con precisión, porque no dice lo que parece. Los dos
principios que sostienen la pieza —**Useful (3/3)** y **Understandable
(3/3)**— están intactos, y **Thorough (3/3)** también. La estructura funciona
y la tarea se completa en un clic.

Lo que falla es una sola cosa expresada de cinco maneras: **la capa decorativa
y las afirmaciones sin respaldo**. Los cinco unos —innovative, unobtrusive,
honest, long-lasting, as-little-design— apuntan todos al mismo lugar: cinco
animaciones corriendo sin que nadie las pida, tres marcadores de tendencia
fechados, y dos claims que nadie validó. No es ruido disperso: es un hallazgo
coherente.

Así que el veredicto es REDESIGN, pero su blanco es específico: se rediseña el
vocabulario decorativo y el copy, no la arquitectura de información.

## Movimientos de mayor palanca

1. **#6 Honest** — Sacar "Más elegido" del plan Premium y "Respuesta en 24 h"
   del hero, o respaldarlos. Evidencia: `index.html:105` y tarjeta Premium.
   Es el único hallazgo con consecuencia fuera de la pantalla: son promesas
   que el negocio queda obligado a cumplir.

2. **#5 Unobtrusive / #9** — Bajar de 5 animaciones en reposo a 1.
   Evidencia: `styles.css:181,504,512,537,562`. Candidata a quedarse: la
   marquesina. A eliminar: sello giratorio, flotación de tarjeta y blobs,
   punto pulsante.

3. **Contraste (transversal a #3 y #8)** — Corregir las 3 fallas medidas:
   `.mark-hl` 2.54/3.0, `.hero__meta` 4.26/4.5, `.card__num` 4.49/4.5.
   Causa raíz única: el cambio de fondo a `#E6EBE0` invalidó verificaciones
   hechas contra el fondo anterior.

4. **#7 Long-lasting** — Reemplazar los tres marcadores fechados (sello
   circular giratorio, marquesina inclinada, blobs con blur) por recursos que
   no fechen la pieza en 2021-2023.

5. **#3 Aesthetic** — Mover los 8 hex hardcodeados a tokens de `:root`.
   Evidencia: `styles.css:582,695-697,741-743,895`. Hoy contradicen la regla
   escrita en el propio `CLAUDE.md` del proyecto.

## Fuera de alcance
Arquitectura de información, orden de secciones, copy de servicios y planes
más allá de los dos claims señalados, y el componente `.btn` con su textura.
