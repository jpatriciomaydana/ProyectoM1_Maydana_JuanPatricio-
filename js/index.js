

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

function crearswatch(colorhsl, colorhex, nombre) {
    const swatch = document.createElement("article");
    swatch.className = "swatch";

    const color = document.createElement("div");
    color.className = "swatch__color";
    color.style.background = colorhsl;

    const info = document.createElement("div");
    info.className = "swatch__info";

    const elnombre = document.createElement("p");
    elnombre.className = "swatch__nombre";
    elnombre.textContent = nombre;

    const elcodigo = document.createElement("p");
    elcodigo.className = "swatch__codigo";
    elcodigo.textContent = colorhsl + " · " + colorhex;

    info.append(elnombre, elcodigo);
    swatch.append(color, info);

    return swatch;
}

function generarcolor() {
    const h = Math.round(Math.random() * 360);
    const hsl = "hsl(" + h + ", 70%, 60%)";
    const hex = hslToHex(h, 70, 60);

    return { hsl, hex };
}


const galeria = document.getElementById("galeria");

function renderpaleta(cantidad) {
    galeria.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        const color = generarcolor();
        const swatch = crearswatch(color.hsl, color.hex, "color " + (i + 1));
        galeria.appendChild(swatch);
    }
}

const boton = document.getElementById("generar"); 
const selector = document.getElementById("cantidad");

if (boton) {
    boton.addEventListener("click", function () {
        const cantidad = Number(selector.value);
        renderpaleta(cantidad);
    });
} else {
  console.log("no encontre el boton generar");
}

renderpaleta(6);
