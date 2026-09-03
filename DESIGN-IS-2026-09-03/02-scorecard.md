# Scorecard

1. **Innovative — 1/3**
   Evidencia: orden de secciones hero → servicios → planes → contacto; ningún
   patrón ausente en productos pares.
   Justificación: ejecuta bien formas conocidas, no adelanta ninguna. Regla de
   desempate aplicada a la baja frente a un posible 2.

2. **Useful — 3/3**
   Evidencia: 3 canales de contacto directo, cada uno a un toque; CTA fijo en la
   nav desde cualquier punto del scroll.
   Justificación: la tarea primaria se completa en un clic sin acciones señuelo.

3. **Aesthetic — 2/3**
   Evidencia: sistema de tokens real, pero 8 hex fuera de `:root`
   (`styles.css:582,695-697,741-743,895`).
   Justificación: dos grupos de inconsistencia, no cinco.

4. **Understandable — 3/3**
   Evidencia: nav Inicio/Servicios/Planes/Contacto; botones "Ver qué hacemos",
   "Escribinos", "Quiero el Starter"; canales rotulados.
   Justificación: sin jerga; cada control se nombra solo.

5. **Unobtrusive — 1/3**
   Evidencia: 5 animaciones `infinite` simultáneas en reposo
   (`styles.css:181,504,512,537,562`).
   Justificación: la decoración compite con el contenido; nada las disparó.

6. **Honest — 1/3**
   Evidencia: "Respuesta en 24 h" (`index.html:105`) y "Más elegido"
   (tarjeta Premium).
   Justificación: dos afirmaciones sin respaldo; una es prueba social inventada.

7. **Long-lasting — 1/3**
   Evidencia: sello circular giratorio, marquesina inclinada, blobs con blur.
   Justificación: tres marcadores de tendencia 2020-2023 identificables.

8. **Thorough — 3/3**
   Evidencia: focus-visible, hover y active presentes; reduced-motion, skip
   link, alt, landmarks. Sin formularios ni datos remotos, así que
   empty/loading/error/success no aplican.
   Justificación: completo para lo que la pieza efectivamente es.

9. **Environmentally friendly — 2/3**
   Evidencia: 4 KB de JS, 100 KB de assets, 6 requests, reduced-motion
   respetado; pero 5 animaciones en reposo y sin modo oscuro.
   Justificación: el ancla de 3 exige cero animación en reposo.

10. **As little design as possible — 1/3**
    Evidencia: marquesina, sello, 3 blobs y grilla de fondo son removibles sin
    romper la tarea.
    Justificación: 4–5 elementos prescindibles.

**TOTAL: 18/30**
