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
| `assets/img/kydos-mark-silver.png` | Isotipo plateado, fondo transparente |
| `assets/img/kydos-word-silver.png` | Wordmark plateado, fondo transparente |
| `assets/img/source/` | Las capturas originales de las que salen ambos |

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
apagado del tilt 3D. No romperlo.

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

- **El logo plateado es un PNG chico.** Las fuentes son capturas de 131×72 y
  252×91 px, guardadas en `assets/img/source/`. Por eso el hero se apoya en
  tipografía cromada y no en un logo gigante: ampliarlo se pixela. Si aparecen
  los originales en alta, reemplazar los dos PNG manteniendo el nombre.
- **El fondo transparente se sacó con relleno por inundación desde los bordes**,
  no con recorte por color: el fondo `#040113` y las zonas oscuras del cromado
  son casi iguales, y un keying por color se come partes del logo.
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
