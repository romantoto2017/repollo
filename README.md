# Kydos — Landing page

Landing de una sola página para **Kydos**, estudio uruguayo de branding y marketing.
HTML, CSS y JavaScript sin dependencias ni build step: se abre `index.html` y funciona.

## Estructura

```
index.html                 Página completa (3 secciones + nav + footer)
assets/css/styles.css      Sistema de diseño y estilos
assets/js/main.js          Nav móvil, scroll suave, scrollspy y animaciones de entrada
404.html                   Página de error
assets/img/kydos-mark-silver.png  Isotipo plateado, fondo transparente
assets/img/kydos-word-silver.png  Wordmark plateado, fondo transparente
assets/img/source/         Capturas originales de ambos logos
assets/img/favicon-32.png  Favicon 32 px (isotipo plateado)
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

Tokens en tres capas dentro de `:root` (`styles.css`): primitivas → semánticas →
componentes. La paleta se muestreó del propio archivo del logo.

| Token | Hex | Uso |
|---|---|---|
| `--void-900` | `#040113` | Fondo. Es el negro sobre el que vive el isotipo |
| `--chrome-200` | `#E3E5D7` | Plata principal del cromado |
| `--chrome-400` | `#969BA8` | Sombra media del metal |
| `--halo-400` | `#5CC8F5` | Acento frío: el brillo especular |

**Tipografía** — DM Sans, con `display=swap` para que el texto no desaparezca
mientras carga. Escala fluida con `clamp()`.

**Modo claro y oscuro** vía `prefers-color-scheme`. Oscuro es el modo nativo de
la marca; en claro los paneles que sostienen el logo se mantienen oscuros,
porque el cromado no se lee sobre fondo claro.

**Movimiento** — `--t-hover: 200ms` en todo hover, `--t-slow: 620ms` en
revelados y transiciones largas.

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

### Metodología de desarrollo (superpowers)

Las 14 skills de [obra/superpowers](https://github.com/obra/superpowers) (MIT,
licencia en `.claude/skills/LICENSE-superpowers`): brainstorming, escritura y
ejecución de planes, TDD, debugging sistemático, code review, git worktrees y
verificación antes de dar algo por terminado.

No se incluyó su hook de `SessionStart`. Lo único que hace es inyectar el texto
de `using-superpowers` al arrancar, y esa skill ya se carga sola como skill de
proyecto. Agregarlo implicaría ejecutar un script en cada sesión de cualquiera
que abra el repo, así que se dejó afuera por defecto.

### Exploración y auditoría (claude-mem)

5 skills de [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
(Apache 2.0, licencia en `.claude/skills/LICENSE-claude-mem`): `design-is`
(auditoría contra los diez principios de Dieter Rams), `learn-codebase`,
`pathfinder`, `what-the` y `babysit`.

Son 5 de las 19 del plugin. Las otras 14 quedaron afuera a propósito: 12
dependen de la base `~/.claude-mem/claude-mem.db`, que vive en el home de un
contenedor efímero y no sobrevive entre sesiones — cargarían bien y devolverían
vacío siempre. Las otras 2 (`make-plan`, `do`) duplican `writing-plans` y
`executing-plans` de superpowers. Las referencias a esas dos dentro de las 5
instaladas se redirigieron a los equivalentes de superpowers.

La memoria persistente entre sesiones, que es lo que claude-mem resuelve, la
cubre `CLAUDE.md`: se commitea al repo y se carga sola en cada sesión.

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
