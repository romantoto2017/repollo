# Evidencia

## Estructural
- 22 elementos interactivos: 4 `.nav__link`, 7 `.btn`, 3 `.channel`, resto enlaces.
- Profundidad máxima de anidado: 10.
- 4 secciones con `id`; 5 tarjetas de servicio; 3 tarjetas de plan.
- 8 hex hardcodeados fuera de `:root` — viola la regla del propio proyecto
  (`CLAUDE.md`: "los colores salen de los tokens, nunca hardcodeados"):
  `styles.css:582, 695, 696, 697, 741, 742, 743, 895`.

## Visual
- Escala tipográfica observada: 9, 13, 15, 16, 17, 20, 21, 28, 40, 60, 78 px.
- Escala de espaciado observada: 18 valores distintos (2–140 px).
- Colores distintos renderizados: 27.
- Animaciones en reposo: **5**, todas `infinite`, sin disparo del usuario —
  `styles.css:181` (punto pulsante), `:504` y `:512` (flotación de tarjeta y
  blobs), `:537` (sello giratorio), `:562` (marquesina).

## Contraste (compuesto sobre el fondo real, alfa incluido)
| Elemento | Ratio | Requerido | Estado |
|---|---|---|---|
| `.mark-hl` "reconocimiento" | **2.54** | 3.0 | **FALLA** |
| `.hero__meta` | **4.26** | 4.5 | **FALLA** |
| `.card__num` | **4.49** | 4.5 | **FALLA** |
| `.lede` | 7.10 | 4.5 | pasa |
| `.hero__title` | 11.64 | 3.0 | pasa |
| `.tag` (clara / oscura) | 7.82 / 7.68 | 4.5 | pasa |
| `.plan__tagline` | 6.21 | 4.5 | pasa |
| `.channel__label` / `__value` | 5.21 / 11.38 | 4.5 / 3.0 | pasa |
| `.footer p` | 5.79 | 4.5 | pasa |
| `.nav__link` | 11.64 | 4.5 | pasa |

**Causa raíz de las 3 fallas:** el fondo de página pasó de `#FBFCF9` a
`#E6EBE0`. Los tres valores se habían verificado contra el fondo viejo, más
claro, y nadie los volvió a medir después del cambio de paleta.

## Accesibilidad
- 11 landmarks; skip link presente; 1 solo `h1`; orden de encabezados válido.
- 16 elementos enfocables, 0 sin nombre accesible; 0 `img` sin `alt`.
- `:focus-visible` 6 reglas, `:hover` 23, `:active` 2. `:disabled` ausente
  (no existen controles deshabilitados).
- `prefers-reduced-motion` implementado (`styles.css`, sección 12).

## Copy y honestidad
- Afirmaciones sin respaldo: "Respuesta en 24 h" y "100 % remoto"
  (`index.html:105`), un compromiso de servicio que nadie validó; y
  **"Más elegido"** en el plan Premium (`index.html:~300`), prueba social sobre
  un negocio del que no se conocen clientes.
- Patrones oscuros (escasez falsa, cuenta regresiva, confirmshaming): **0**.
- Superlativos de marketing: **0**.

## Peso y fricción
- JS inicial 4.075 bytes; CSS 27.636; HTML 23.735; PNG del logo 56.467.
- Total de assets: 100 KB. 6 requests. 0 modales o badges al cargar.
- Sin modo oscuro.
