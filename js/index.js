

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

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("color__tarjeta");
    tarjeta.style.background = colorhsl;
    tarjeta.dataset.hsl = colorhsl;
    tarjeta.dataset.hex = colorhex;
    tarjeta.dataset.nombre = nombre;

    const lockbtn = document.createElement("button");
    lockbtn.classList.add("lock-btn");
    lockbtn.innerText = "🔓";

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
    tarjeta.append(lockbtn, swatch);

    return tarjeta;

    
}

function generarcolor() {
    const h = Math.round(Math.random() * 360);
    const hsl = "hsl(" + h + ", 70%, 60%)";
    const hex = hslToHex(h, 70, 60);

    return { hsl, hex };
}


const galeria = document.getElementById("galeria");

function renderpaleta(cantidad) {    
    const bloqueados = [...galeria.querySelectorAll(".color__tarjeta.is-locked")];
    galeria.innerHTML = "";
    bloqueados.forEach(t => galeria.appendChild(t));
    const faltan = cantidad - bloqueados.length;
        for (let i = 0; i < faltan; i++) {
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

galeria.addEventListener("click", (event) => {
    
    const lockBtn = event.target.closest(".lock-btn");
    
    if (lockBtn) {
        const tarjeta = lockBtn.closest(".color__tarjeta");        
        const isLocked = tarjeta.classList.toggle("is-locked");        
        lockBtn.innerText = isLocked ? "🔒" : "🔓";
    }
});


function guardarpaleta() {
    // con esto agarramos las tarjetas que hay en pantalla //
    const tarjetas = [...galeria.querySelectorAll(".color__tarjeta.is-locked")];
    
    const colores = tarjetas.map(t => ({
        hsl: t.dataset.hsl,
        hex: t.dataset.hex,
        nombre: t.dataset.nombre
    }));

    // Traer las que ya hay guardadas, o un array vacío si no hay ninguna?//
    const guardadas = JSON.parse(localStorage.getItem("paletas") || "[]");
    
    
    guardadas.push({
        id: Date.now(),
        colores: colores
    });

    // Guardar todo de vuelta en localStorage//
    localStorage.setItem("paletas", JSON.stringify(guardadas));

    alert("¡Paleta guardada!");
    mostrarguardadas()
}

// Con esto se conecta el botón guardar //
const botonguardar = document.getElementById("guardar");
if (botonguardar) {
    botonguardar.addEventListener("click", guardarpaleta);
}

function mostrarguardadas() {
    const contenedor = document.getElementById("lista-guardadas");
    const guardadas = JSON.parse(localStorage.getItem("paletas") || "[]");

    if (guardadas.length === 0) {
        contenedor.innerHTML = "<p>No hay paletas guardadas todavía.</p>";
        return;
    }

    contenedor.innerHTML = "";

    guardadas.forEach(paleta => {
        const fila = document.createElement("div");
        fila.classList.add("paleta-guardada");

        paleta.colores.forEach(color => {
            const chip = document.createElement("div");
            chip.classList.add("color-chip");
            chip.style.background = color.hsl;
            chip.title = color.hex;
            fila.appendChild(chip);
        });

        contenedor.appendChild(fila);
    });
}

mostrarguardadas();

const botonlimpiar = document.getElementById("limpiar");
if (botonlimpiar) {
    botonlimpiar.addEventListener("click", function() {
        localStorage.removeItem("paletas");
        mostrarguardadas();
    });
}