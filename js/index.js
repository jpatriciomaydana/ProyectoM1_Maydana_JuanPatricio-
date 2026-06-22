function generarcolorhsl() {
    const h = Math.round(Math.random() * 360);
    return "hsl(" + h + ", 70%, 60%)";
}

const paleta = [];

for (let i = 0; i < 5; i++) {
    const color = generarcolorhsl();
    paleta.push(color);
}

console.log(paleta);






