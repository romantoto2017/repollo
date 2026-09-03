# Kydos — Landing page

Landing de una sola página para **Kydos**, estudio uruguayo de branding y marketing.
HTML, CSS y JavaScript sin dependencias ni build step: se abre `index.html` y funciona.

## Estructura

```
index.html                 Página completa (3 secciones + nav + footer)
assets/css/styles.css      Sistema de diseño y estilos
assets/js/main.js          Nav móvil, scroll suave, scrollspy y animaciones de entrada
assets/img/kydos-logo.png  Isotipo original (K + estrella), con fondo transparente
assets/img/favicon-32.png  Favicon 32 px
assets/img/favicon-180.png Favicon 180 px / apple-touch-icon
```

## Secciones

1. **Hero** — logo, headline, propuesta de valor y CTAs hacia servicios y contacto.
2. **Servicios** — asesoramiento visual integral, marketing y campañas, redes sociales,
   diseño y desarrollo web, y reconocimiento de marca.
3. **Planes** — Starter, Premium (destacado) y Gold, en tarjetas de color saturado.
   No llevan precio: el CTA de cada uno lleva a la sección de contacto.
4. **Contacto** — Instagram, email y WhatsApp.

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

**Botones** — un solo componente `.btn` con el relleno que sube desde abajo (`.btn::before`).
Las variantes (`--primary`, `--ghost`, `--light`, `--plan`) solo redefinen colores y sombras
vía custom properties, así que todos los botones comparten la misma textura de hover.

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

`assets/img/kydos-logo.png` es el isotipo original con el fondo blanco convertido
en transparente, para que apoye sobre cualquier color. Lo referencian el nav, el
hero, la sección de contacto y los metadatos.

Los favicons (`favicon-32.png` y `favicon-180.png`) se derivan del mismo archivo,
con un recorte más ajustado para que la K llene el ícono de la pestaña. Si cambiás
el logo, regeneralos recortando el margen transparente y exportando a 32 y 180 px.

## Publicar

Es un sitio estático: sirve cualquier hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
No hay que compilar nada; se sube la carpeta tal cual.

## Skills de diseño

`.claude/skills/` contiene las 7 skills del repositorio
[ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
v2.13.0 (MIT, licencia en `.claude/skills/LICENSE`):

| Skill | Para qué |
|---|---|
| `ui-ux-pro-max` | Estilos, paletas, tipografías, guías de UX y charts para 22 stacks |
| `design` | Logos, identidad corporativa, banners, iconos, imágenes para redes |
| `design-system` | Tokens en tres capas (primitive→semantic→component) y specs de componentes |
| `brand` | Voz de marca, identidad visual, consistencia, guías de estilo |
| `ui-styling` | shadcn/ui, Tailwind, layouts accesibles, dark mode |
| `banner-design` | Banners para redes, ads, web y print |
| `slides` | Presentaciones HTML con Chart.js |

Se cargan solas al iniciar la sesión y se activan cuando la tarea lo pide.
Los scripts corren con Python 3 y Node, sin dependencias externas.

Las funciones de **generación de imágenes** (logos, iconos, mockups) piden
claves de API que este repo no incluye: `GEMINI_API_KEY`, `ATLASCLOUD_API_KEY`,
`MUAPI_API_KEY`, `GOOGLE_FONTS_API_KEY`. Todo lo demás —las bases de datos
consultables, los tokens, los validadores— funciona sin claves.

Está como skill de proyecto y no instalada como plugin porque las sesiones de
Claude Code en la web corren con `SKIP_PLUGIN_MARKETPLACE=true` y no cargan
plugins, mientras que las skills a nivel proyecto sí se cargan desde el repo.
Los detalles y cómo actualizarla están al pie de su `SKILL.md`.

Consulta directa, sin dependencias más allá de Python 3:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "creative agency" --domain color
```
