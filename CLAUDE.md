# Kydos — landing page

Estudio uruguayo de branding y marketing. Sitio estático de una página:
HTML, CSS y JS sin dependencias ni build step. Se abre `index.html` y anda.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página completa: nav, hero, servicios, planes, contacto, footer |
| `assets/css/styles.css` | Sistema de diseño (sección `1. TOKENS`) y todos los estilos |
| `assets/js/main.js` | Nav móvil, scroll suave, scrollspy, revelados |
| `404.html` | Página de error, mismo sistema visual |
| `assets/img/kydos-spin.webp` | Logo 3D girando en loop, el del hero |
| `assets/img/kydos-spin-static.webp` | Frame fijo, para `prefers-reduced-motion` |
| `assets/img/kydos-mark-silver@2x.{webp,png}` | Isotipo plateado, respaldo |
| `assets/img/kydos-word-silver@2x.{webp,png}` | Wordmark plateado, el que se sirve |
| `assets/img/*-silver.{webp,png}` | Versiones al tamaño original, de respaldo |
| `assets/img/kydos-mark-beige.png` | Isotipo beige, del que salen los favicons |
| `assets/img/favicon-{16,32,180}.png` | Favicons, generados del isotipo beige |
| `assets/img/source/` | Las capturas originales de todos ellos |

## Reglas del proyecto

**Los colores salen de los tokens en `:root`, nunca hardcodeados.** El sistema
tiene tres capas: primitivas (`--void-*`, `--chrome-*`, `--halo-*`), semánticas
(`--bg`, `--text`, `--surface`, `--border`, `--accent`) y componentes. Tocar
siempre la capa semántica, no la primitiva.

**La paleta sale del propio logo.** Fondo `#040113` (el negro azulado sobre el
que vive el isotipo plateado) y rampa cromada `#FFFFFF → #E3E5D7 → #6E7385`
muestreada del archivo. Acento frío `#5CC8F5`, que es el brillo especular del
metal. No inventar colores fuera de esa lógica.

**El cromado necesita fondo oscuro para leerse.** Por eso el sitio es oscuro por
defecto y, en `prefers-color-scheme: light`, los paneles que sostienen el logo
(`.scene__card`, `.brand img`, `.footer__brand img`) se mantienen oscuros. Es
deliberado: no "arreglarlo" aclarándolos.

**El texto cromado usa `.chrome`** (degradado + `background-clip: text`). Tiene
fallback con `@supports` para navegadores sin soporte; no quitarlo.

**Todos los botones son el mismo componente `.btn`.** La textura de hover —el
relleno que sube desde abajo— vive en `.btn::before`. Las variantes
(`--primary`, `--ghost`, `--plan`) solo redefinen colores. Nunca escribir un
botón nuevo desde cero: agregar una variante.

**Contraste mínimo 4.5:1 en texto, verificado en los dos modos.** Ojo con una
trampa: `getComputedStyle().backgroundColor` devuelve transparente cuando el
fondo es un `linear-gradient`, y eso da falsas fallas. Para elementos sobre
gradiente hay que muestrear píxeles reales de una captura.

**Hover a 200ms** (`--t-hover`). Es el ritmo de toda la página.

**Mobile-first.** Una columna es la base; los breakpoints (`40rem`, `60rem`,
`75rem`) solo agregan columnas. Probar siempre desde 320 px.

**Respetar `prefers-reduced-motion`.** Ya está implementado, incluido el
apagado del tilt 3D de las tarjetas. No romperlo.

**El hero lleva el logo 3D girando en loop** (`kydos-spin.webp`), servido con
`<picture>`: la primera `<source>` tiene `media="(prefers-reduced-motion: reduce)"`
y entrega el frame fijo. La animación llena la tarjeta de vidrio de borde a
borde (`padding: 0` + `overflow: hidden` + `border-radius: inherit`), y la
tarjeta usa `aspect-ratio: 800 / 636`, la proporción real del recorte. **No
rellenar la animación para hacerla cuadrada:** el relleno plano choca con el
viñeteado del original y deja una costura visible; y recortarla a cuadrado
corta el logo, que en algunos frames de la rotación llega a los bordes.

**El hero no se mueve con el cursor y no lleva anillos.** Se quitaron a pedido:
la escena es una tarjeta de vidrio con el logo, y nada más. No reintroducirlos.

## Cómo verificar cambios

Hay Chromium con Playwright en el entorno. Antes de decir que algo funciona,
renderizarlo y mirarlo:

```bash
node -e "const{chromium}=require('playwright-core');(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('file:///home/user/repollo/index.html',{waitUntil:'networkidle'});
await p.waitForTimeout(2000); await p.screenshot({path:'/tmp/shot.png',fullPage:true});
await b.close();})()"
```

Chequear siempre: sin scroll horizontal en 320/390/768/1024, sin errores de
consola, y los hovers renderizando de verdad.

## Decisiones tomadas (no volver a discutirlas sin motivo)

- **El logo plateado nace de capturas chicas** (131×72 y 252×91 px, en
  `assets/img/source/`). Los `@2x` son un reescalado por etapas con Lanczos más
  un realce leve: eso da bordes más limpios en pantallas retina, pero **no
  inventa detalle que no existe**. Comparadas lado a lado, la versión ampliada y
  el original estirado se parecen mucho. Para un salto real de calidad hacen
  falta los archivos originales.
- **El favicon es el isotipo en beige `#E6EBE0` sobre el fondo de marca
  `#040113`.** La forma sale del vectorial del PDF de identidad
  (`assets/img/source/isotipo-vectorial-pdf.png`), que tiene alfa limpio, y el
  beige es el de la propia identidad. Va sobre fondo oscuro y no transparente
  porque el beige es muy claro: transparente desaparecería en las pestañas
  claras de Chrome.
- **El PDF de identidad trae texto de plantilla sin reemplazar.** El isotipo
  vectorial es en realidad un lockup: la marca más las palabras "NOVA STAR"
  debajo (filas 227-247 del archivo original). Al generar el favicon hay que
  recortar SOLO el bloque de la marca (filas ~55-215). Se detectó porque el
  favicon de 180 px lo mostraba; a 16 px habría pasado desapercibido y se
  habría publicado con el nombre de otra marca.
- **`Logo Tienda Ecológica Minimalista Beige.png` no se puede usar.** Está en
  `assets/img/source/logo-beige-blanco-sobre-blanco.png`. El trazo es blanco
  puro sobre fondo blanco puro, visible solo por una sombra desplazada. Un
  relleno por inundación devuelve un único componente y 0 % encerrado: no hay
  forma geométrica de separar marca y fondo. La sombra tampoco sirve de
  silueta, porque un drop shadow solo aparece de un lado del trazo.
- **Las imágenes se sirven en WebP con fallback PNG** vía `<picture>`. El WebP
  del isotipo pesa 48 KB contra 179 del PNG; con gradientes la diferencia es
  enorme. `picture { display: contents }` mantiene el `img` como hijo directo
  del flex/grid.
- **El fondo transparente se sacó con relleno por inundación desde los bordes**,
  no con recorte por color: el fondo `#040113` y las zonas oscuras del cromado
  son casi iguales, y un keying por color se come partes del logo.
- **El GIF original tenía marca de agua y bordes.** `Wink` arriba a la
  izquierda, más 42 px de banda blanca arriba y abajo. El recorte
  `(0, 122, 800, 758)` saca las tres cosas: 42 de borde más 80 para la marca.
  Verificado midiendo el mínimo sobre los 200 frames, no a ojo sobre uno solo.
- **El GIF pesaba 8,9 MB; el WebP animado pesa 463 KB.** 20 veces menos, con
  100 frames a 66 ms en vez de 200 a 33. El original queda en
  `assets/img/source/kydos-spin-original.gif`.
- **Los planes no llevan precio.** No fueron especificados. Los CTA van a contacto.
- **El fondo es `#040113`,** tomado del archivo del logo, no elegido a ojo.
- **La estética anterior (turquesa/coral/beige) quedó descartada** al adoptar el
  logo plateado. No volver a mezclarlas.

## Pendientes

- Precios de los planes (Starter / Premium / Gold).
- Revisar los textos de servicios y planes: son un punto de partida, escritos en
  tono rioplatense, no validados con el cliente.
- En la raíz hay un PDF de identidad de marca que todavía no se usó.
- Conseguir los logos plateados en alta resolución (hoy son capturas chicas).
- La rama por defecto del repo sigue siendo la rama de trabajo, no `main`.

## Skills disponibles

En `.claude/skills/` hay 26 skills vendorizadas (ver README). Las relevantes acá:

- `ui-ux-pro-max` — bases consultables de estilos, paletas, tipografías y UX.
  Consulta: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <dominio>`
- `design`, `design-system`, `brand`, `ui-styling` — diseño e identidad.
- `test-driven-development`, `systematic-debugging`, `writing-plans`,
  `verification-before-completion` — metodología (superpowers).

Están vendorizadas y no instaladas como plugins porque este entorno corre con
`SKIP_PLUGIN_MARKETPLACE=true` y no carga plugins. Las skills a nivel proyecto
sí se cargan desde el repo. **No intentar instalarlas con `/plugin`: no va a
funcionar acá.**
