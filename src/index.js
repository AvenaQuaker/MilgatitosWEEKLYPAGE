let celdas = document.querySelectorAll(".celda");
let eventador = document.getElementById("eventador");
let btncerrar = document.getElementById("btncerrar");
let btnProgramar = document.getElementById("btnProgramar");
let celdaActual;
let Duracion;
let Arrastrando = false;
let offsetX = 0,
    offsetY = 0;

celdas.forEach((celda) => {
    celda.addEventListener("click", (e) => {
        ActivarForma(celda);
    });
});

document.addEventListener("click", (e) => {
    if (
        !e.target.classList.contains("celda") &&
        !eventador.contains(e.target)
    ) {
        eventador.classList.add("opacity-0");
        eventador.classList.add("pointer-events-none");
    }
});

btncerrar.addEventListener("click", () => {
    eventador.classList.add("opacity-0");
    eventador.classList.add("pointer-events-none");
});

btnProgramar.addEventListener("click", () => {
    eventador.classList.add("opacity-0");
    eventador.classList.add("pointer-events-none");

    let Datos = new FormData(eventador);
    let objeto = {};
    Datos.forEach((entries, key) => {
        objeto[key] = entries;
    });

    ProgramarEvento(celdaActual, objeto);
});

function ActivarForma(celda) {
    eventador.classList.remove("opacity-0");
    eventador.classList.remove("pointer-events-none");

    celdaActual = celda;
}

function ProgramarEvento(celda, objeto) {
    let CeldasSeleccionadas = celda.parentNode.children;
    let indiceCelda = Array.from(CeldasSeleccionadas).indexOf(celda);
    let bandera = true;
    Duracion = parseInt(objeto.Duracion);

    // Calcular cuántas celdas hay disponibles
    let celdasDisponibles = CeldasSeleccionadas.length - indiceCelda;
    let duracionFinal = Math.min(Duracion, celdasDisponibles);

    // Revisar si las celdas en el rango están ocupadas
    for (let i = 0; i < duracionFinal; i++) {
        if (
            CeldasSeleccionadas[indiceCelda + i].classList.contains("SELECTED")
        ) {
            bandera = false; // Si alguna está ocupada, no se puede seleccionar
            break;
        }
    }

    if (bandera) {
        // Expandir la primera celda para cubrir el rango
        celda.classList.add("bg-slate-500", "SELECTED");
        celda.classList.add(`row-span-${duracionFinal}`);

        // Eliminar las celdas que se "cubrieron" con la expansión
        for (let i = 1; i < duracionFinal; i++) {
            celda.parentNode.removeChild(CeldasSeleccionadas[indiceCelda + 1]);
        }
    } else {
        console.log("Algunas de las celdas están ocupadas.");
    }
}
