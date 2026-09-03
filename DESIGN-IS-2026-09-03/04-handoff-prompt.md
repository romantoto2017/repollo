# Handoff

```
/writing-plans Redesign la capa decorativa y el copy de la landing de Kydos.
La auditoría Rams dio 18/30, con fallas en los principios #1 innovative,
#5 unobtrusive, #6 honest, #7 long-lasting y #10 as-little-design.

Veredicto:
> 18/30. Los principios que sostienen la pieza —Useful 3/3 y Understandable
> 3/3— están intactos; la estructura funciona y la tarea se completa en un
> clic. Lo que falla es una sola cosa expresada de cinco maneras: la capa
> decorativa y las afirmaciones sin respaldo. El rediseño apunta al
> vocabulario decorativo y al copy, no a la arquitectura de información.

Por qué redesign y no refine: el total quedó bajo 20. Ningún principio
load-bearing sacó 0 (#2, #4 y #6 no están en cero), pero cinco principios en
1 sobre la misma causa indican un problema de vocabulario, no de detalles.

Preservar del diseño actual:
- Arquitectura de información y orden de secciones (index.html) — #2 y #4 en 3/3.
- El componente .btn y su textura de relleno ascendente (styles.css, sección 5).
- La capa de tokens en :root (styles.css, sección 1).
- Accesibilidad ya resuelta: skip link, landmarks, focus-visible,
  prefers-reduced-motion — #8 en 3/3.

Descartar:
- Las 5 animaciones en reposo. Evidencia: styles.css:181,504,512,537,562.
  Causaron la falla en #5 y bajaron #9.
- Sello circular giratorio, marquesina inclinada y blobs con blur como
  vocabulario visual. Causaron la falla en #7.
- "Más elegido" en el plan Premium y "Respuesta en 24 h" en el hero.
  Evidencia: index.html:105. Causaron la falla en #6.

Movimientos, en orden:
1. #6 Honest: sacar o respaldar "Más elegido" y "Respuesta en 24 h".
   Evidencia: index.html:105 y tarjeta Premium.
2. #5 Unobtrusive: de 5 animaciones en reposo a 1 como máximo.
   Evidencia: styles.css:181,504,512,537,562.
3. Contraste: corregir .mark-hl (2.54 vs 3.0), .hero__meta (4.26 vs 4.5) y
   .card__num (4.49 vs 4.5). Causa raíz: el fondo pasó a #E6EBE0 y las
   verificaciones previas eran contra el fondo anterior.
4. #7 Long-lasting: reemplazar los tres marcadores de tendencia.
5. #3 Aesthetic: mover 8 hex a tokens. Evidencia:
   styles.css:582,695-697,741-743,895.

Entregables del plan:
- Por cada movimiento: archivos objetivo, cambio exacto, paso de verificación.
- Re-medición de contraste tras cualquier cambio de fondo, con alfa compuesto.
- Checklist de regresión para lo preservado: que #2, #4 y #8 sigan en 3/3.
- Criterio de corte: qué animación sobrevive y por qué.

Guardarse de:
- Portar la decoración vieja bajo estilos nuevos.
- Tocar la arquitectura de información, que ya puntúa 3/3.
- Rediseñar siguiendo otra tendencia en vez de los principios.
- Dejar los claims sin resolver por ser "solo copy": es el hallazgo con
  consecuencia fuera de la pantalla.
```
