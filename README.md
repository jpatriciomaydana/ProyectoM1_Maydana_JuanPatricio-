# Colorfly Studio — Generador de Paletas de Color

Colorfly Studio es una aplicación web ligera para crear combinaciones de colores de forma instantánea, directamente en el navegador. Desarrollada puramente con tecnologías web estándar, no requiere backend ni dependencias externas, todo corre en el navegador.

## Descripción general

Es una app generadora de paletas de color aleatorias hecho con HTML, CSS y JavaScript puro. Podés elegir cuántos colores querés, bloquear los que te gustan para que no cambien al regenerar, guardar tus paletas favoritas y copiar cualquier código HEX con un click.

Demo en línea: https://jpatriciomaydana.github.io/ProyectoM1_Maydana_JuanPatricio-/

## ¿Cómo se usa?

Cuando abrís la app vas a ver una barra de controles y una galería de tarjetas de color. Desde ahí podés:

- Elegir entre 6, 8 o 9 colores con el selector
- Hacer clic en **Generar Paleta** para crear una combinación nueva
- Bloquear los colores que te gusten con el candado 🔓 — al regenerar esos se quedan
- Usar **Ver HEX** para alternar entre el formato HSL y HEX en todas las tarjetas
- Hacer clic en cualquier tarjeta para copiar su código HEX al portapapeles
- Guardar la combinación con **Guardar paleta** — queda en la sección *Mi paleta guardada*
- Limpiar el historial con **Limpiar historial** si querés empezar de cero

Cada acción muestra una notificación breve en pantalla para confirmar que se ejecutó.

---

## Decisiones que tomé

Generé los colores en formato HSL porque me resultó más fácil controlar la saturación y luminosidad para que todos los colores se vean bien juntos, variando solo el hue de forma aleatoria:

```javascript
const h = Math.round(Math.random() * 360);
const hsl = "hsl(" + h + ", 70%, 60%)";
```

Para convertir a HEX escribí la función `hslToHex` sin librerías externas:

```javascript
function hslToHex(h, s, l) {
    l = l / 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = function (n) {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return "#" + f(0) + f(8) + f(4);
}
```

Para el bloqueo de colores guardé cada tarjeta bloqueada antes de limpiar el DOM y la reinserté después:

```javascript
const bloqueados = [...galeria.querySelectorAll(".color__tarjeta.is-locked")];
galeria.innerHTML = "";
bloqueados.forEach(t => galeria.appendChild(t));
```

Para persistir las paletas elegí localStorage porque no necesitaba backend. Los datos los serializo con `JSON.stringify` al guardar y los recupero con `JSON.parse` al leer:

```javascript
const guardadas = JSON.parse(localStorage.getItem("paletas") || "[]");
guardadas.push({ id: Date.now(), colores: colores });
localStorage.setItem("paletas", JSON.stringify(guardadas));
```

Para los eventos usé delegación — un solo listener en la galería en lugar de uno por tarjeta, porque las tarjetas se generan dinámicamente:

```javascript
galeria.addEventListener("click", (event) => {
    const lockBtn = event.target.closest(".lock-btn");
    if (lockBtn) { ... return; }
    const tarjeta = event.target.closest(".color__tarjeta");
    if (tarjeta) { ... }
});
```

---

## Estructura del proyecto

```
ProyectoM1_Maydana_JuanPatricio/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── index.js
├── Capturas/
│   └── demo.gif
└── Doc IA/
    └── capturas del proceso con IA
```

## Cómo ejecutarlo en tu computadora

Cloná el repositorio:

```bash
git clone https://github.com/jpatriciomaydana/ProyectoM1_Maydana_JuanPatricio-.git
```

Abrí la carpeta en VS Code, hacé clic derecho en `index.html` y seleccioná **Open with Live Server**.

Si no tenés Git podés descargar el ZIP desde el botón **Code** en GitHub.

---

## Cómo desplegarlo

La app es estática así que funciona directo en GitHub Pages:

1. Subí el proyecto a GitHub
2. Andá a **Settings → Pages**
3. En Source seleccioná rama `main` y carpeta `/root`
4. Guardá — en unos segundos tenés la URL

---

## Cómo usé la IA

Durante el desarrollo usé Claude (Anthropic) como asistente. No lo usé para generar código de golpe, sino para resolver problemas concretos a medida que aparecían y entender conceptos antes de implementarlos.

### Proceso de trabajo con IA

Cuando implementé el bloqueo de colores no sabía cómo hacer para que las tarjetas bloqueadas sobrevivieran al regenerar. Le expliqué el problema, entendí la lógica y la apliqué. Lo mismo con localStorage: primero entendí cómo funciona `JSON.stringify` y `JSON.parse` y después lo implementé.

También usé la IA para entender conceptos puntuales como el operador spread `...`, la diferencia entre `dataset` y `textContent`, y por qué tener dos `return` en una función hace que el segundo nunca se ejecute.

### Áreas donde se utilizó IA

- Implementación del bloqueo de colores con clase `is-locked`
- Sistema de guardado con localStorage
- Toast para microfeedback
- Función de copiar HEX al portapapeles
- Alternancia entre formatos HSL y HEX
- Responsive design con media queries
- Ordenamiento y documentación del CSS

Las capturas del proceso están en la carpeta `/Doc IA`.

## Demo

![Demo Colorfly Studio](./Capturas/DemoGif.gif)
