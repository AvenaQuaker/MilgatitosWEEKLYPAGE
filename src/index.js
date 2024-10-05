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
        //ProgramarEvento(celda);
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
    let Ultimo = false;
    Duracion = objeto.Duracion;
    console.log(Duracion);

    if (CeldasSeleccionadas[indiceCelda + Duracion] === undefined) {
        if (CeldasSeleccionadas[indiceCelda + 1] === undefined) {
            console.log("ES LA ULTIMA CELDA");
            Ultimo = true;
        }

        if (!Ultimo) {
            for (let i = 1; i < Duracion; i++) {
                if (
                    CeldasSeleccionadas[indiceCelda + i].classList.contains(
                        "SELECTED"
                    ) ||
                    CeldasSeleccionadas[indiceCelda].classList.contains(
                        "SELECTED"
                    )
                ) {
                    console.log("YA HAY UNO PNDJ");
                    bandera = false;
                    break;
                }
            }
        }

        if (bandera) {
            celda.classList.add("bg-slate-500");
            celda.classList.add("SELECTED");

            if (!Ultimo) {
                celda.classList.add(`row-span-${Duracion}`);
                for (let i = 1; i < Duracion; i++) {
                    celda.parentNode.removeChild(
                        CeldasSeleccionadas[indiceCelda + i]
                    );
                }
            }
        }
    }
}
