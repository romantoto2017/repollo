# Kydos — landing page

Estudio uruguayo de branding y marketing. Sitio estático de una página:
HTML, CSS y JS sin dependencias ni build step. Se abre `index.html` y anda.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página completa: nav, hero, servicios, planes, contacto, footer |
| `assets/css/styles.css` | Sistema de diseño (sección `1. TOKENS`) y todos los estilos |
| `assets/js/main.js` | Nav móvil, scroll suave, scrollspy, revelados |
| `assets/img/kydos-logo.png` | Isotipo original, fondo transparente |

## Reglas del proyecto

**Los colores salen de los tokens en `:root`, nunca hardcodeados.** Paleta de
marca: turquesa `#36C9C6` y coral `#ED6A5A` como principales, beige alabastro
`#E6EBE0` de fondo, amarillo `#F4F1BB` y ópalo `#9BC1BC` en detalles. Tinta
`#12302E` para texto y secciones oscuras.

**Todos los botones son el mismo componente `.btn`.** La textura de hover —el
relleno que sube desde abajo— vive en `.btn::before`. Las variantes
(`--primary`, `--ghost`, `--light`, `--plan`) solo redefinen colores vía custom
properties. Nunca escribir un botón nuevo desde cero: agregar una variante.

**Contraste mínimo 4.5:1 en texto.** En las tarjetas de planes los fondos son
saturados y el texto va en tinta, no en blanco: es lo que permite que los
colores sean brillantes sin perder legibilidad. Verificar antes de cambiar un
fondo.

**Mobile-first.** Una columna es la base; los breakpoints (`40rem`, `60rem`,
`75rem`) solo agregan columnas. Probar siempre desde 320 px.

**Respetar `prefers-reduced-motion`.** Ya está implementado; no romperlo.

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

- **El logo es un PNG, no un SVG.** El original venía sin canal alfa; se le sacó
  el fondo con un relleno por inundación desde los bordes. Un recorte por color
  no sirve: el relleno menta interior de la K (`#F9FFF4`) está a 11 de blanco y
  se borra.
- **Los planes no llevan precio.** No fueron especificados. Los CTA van a contacto.
- **El fondo es `#E6EBE0`,** no un blanco inventado. Salió de la paleta de marca.
- **La tarjeta de "Asesoramiento visual integral" va sin brillo:** fondo plano,
  sin degradado y sin el resplandor radial que siguen las otras tarjetas.

## Pendientes

- Precios de los planes (Starter / Premium / Gold).
- Revisar los textos de servicios y planes: son un punto de partida, escritos en
  tono rioplatense, no validados con el cliente.
- En la raíz hay un PDF de identidad de marca y dos capturas que subió el dueño
  del repo y todavía no se usaron.
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
