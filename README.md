# Kydos — Landing page

Landing de una sola página para **Kydos**, estudio uruguayo de branding y marketing.
HTML, CSS y JavaScript sin dependencias ni build step: se abre `index.html` y funciona.

## Estructura

```
index.html                 Página completa (3 secciones + nav + footer)
assets/css/styles.css      Sistema de diseño y estilos
assets/js/main.js          Nav móvil, scroll suave, scrollspy y animaciones de entrada
assets/img/kydos-mark.svg  Isotipo (K + estrella)
assets/img/favicon.svg     Favicon
```

## Secciones

1. **Hero** — logo, headline, propuesta de valor y CTAs hacia servicios y contacto.
2. **Servicios** — asesoramiento visual integral, marketing y campañas, redes sociales,
   diseño y desarrollo web, y reconocimiento de marca.
3. **Contacto** — Instagram, email y WhatsApp.

## Sistema de diseño

Todos los valores viven como custom properties en `:root` (sección `1. TOKENS` de `styles.css`).

**Paleta**

| Token | Hex | Uso |
|---|---|---|
| `--teal` | `#36C9C6` | Color de marca principal (viene del logo) |
| `--coral` | `#ED6A5A` | Acento y llamadas a la acción |
| `--butter` | `#F4F1BB` | Subrayados y fondos suaves |
| `--opal` | `#9BC1BC` | Detalles y fondos |
| `--alabaster` | `#E6EBE0` | Fondos de sección |
| `--ink` | `#12302E` | Texto y secciones oscuras |

**Tipografía** — Space Grotesk para títulos, Outfit para texto (Google Fonts).
Escala fluida con `clamp()`, de `--fs-xs` a `--fs-hero`.

**Espaciado** — escala de 4 px (`--sp-1` … `--sp-12`) más `--section-y` y `--gutter` fluidos.

**Movimiento** — duraciones (`--dur-1/2/3`) y curvas (`--ease`, `--ease-soft`) compartidas
por todos los componentes, para que hovers y transiciones se sientan iguales en toda la página.

## Detalles de implementación

- **Mobile-first**: un layout de una columna es la base; los breakpoints (`40rem`, `60rem`, `75rem`)
  solo agregan columnas. Verificado sin scroll horizontal desde 320 px.
- **Hover en todos los botones**: relleno que sube desde abajo, elevación y sombra de color.
  Cada canal de contacto usa su propio acento.
- **Animaciones de entrada** con `IntersectionObserver` y retardos escalonados vía `--delay`.
- **Accesibilidad**: skip link, landmarks semánticos, `aria-expanded` en el menú, cierre con
  `Escape`, foco visible y contraste de texto ≥ 4.5:1.
- **`prefers-reduced-motion`**: desactiva parallax, marquesina y revelados para quien lo pida.

## Cambiar el logo

`assets/img/kydos-mark.svg` es una reconstrucción vectorial del isotipo.
Para usar el archivo original, reemplazá ese SVG manteniendo el mismo nombre —
lo referencian el nav, el hero, la sección de contacto y los metadatos.

## Publicar

Es un sitio estático: sirve cualquier hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
No hay que compilar nada; se sube la carpeta tal cual.
