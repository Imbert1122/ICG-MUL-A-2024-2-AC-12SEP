class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function esConvexo(puntos) {
    const n = puntos.length;
    if (n < 3) return false; // Un polígono necesita al menos 3 puntos
    
    let signo = null;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const producto = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

        if (producto !== 0) {
            if (signo === null) {
                signo = producto > 0;
            } else {
                if (signo !== (producto > 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function trazarPoligono(puntos) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.beginPath();
    ctx.moveTo(puntos[0].x + 50, puntos[0].y + 50); // Mover al primer punto

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x + 50, puntos[i].y + 50); // Dibujar líneas entre puntos
    }
    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
    ctx.fill();
    ctx.stroke();
}

// Ejemplo de uso
const puntos = [
    new Punto(50, 50),
    new Punto(200, 50),
    new Punto(250, 200),
    new Punto(150, 250),
    new Punto(100, 200)
];

const resultado = esConvexo(puntos) ? "El polígono es convexo." : "El polígono es cóncavo.";
document.getElementById("resultado").textContent = resultado;

trazarPoligono(puntos);