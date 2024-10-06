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
    celda.addEventListener("click", () => {
        if (!celda.classList.contains("SELECTED")) ActivarForma(celda);
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
        let Tipo = objeto.Tipo;
        let Recursos = obtenerRecrusos(Tipo);
        // Expandir la primera celda para cubrir el rango
        celda.classList.add("bg-cover", "SELECTED");
        celda.style.backgroundImage = `url('${Recursos.Fondo}')`;
        celda.style.gridRow = `span ${duracionFinal}`;

        let imagenSuper = document.createElement("img");
        imagenSuper.src = Recursos.Logo;
        imagenSuper.classList.add("imgSuper");
        celda.append(imagenSuper);

        // Eliminar las celdas que se "cubrieron" con la expansión
        for (let i = 1; i < duracionFinal; i++) {
            celda.parentNode.removeChild(CeldasSeleccionadas[indiceCelda + 1]);
        }
    } else {
        console.log("Algunas de las celdas están ocupadas.");
    }
}

function obtenerRecrusos(Tipo) {
    let Recursos = {
        Fondo: "",
        Logo: "",
        Video: "",
    };

    switch (Tipo) {
        case "HOTS":
            Recursos.Fondo = "./Resources/HotsBG.jpg";
            Recursos.Logo = "./Resources/HotsLogo.png";
            Recursos.Video = "hots_video.mp4";
            break;
        case "IRL":
            Recursos.Fondo = "./Resources/IRLBG.jpg";
            Recursos.Logo = "./Resources/IRLLogo.png";
            Recursos.Video = "irl_video.mp4";
            break;
        case "Anime":
            Recursos.Fondo = "./Resources/AnimeBG.png";
            Recursos.Logo = "./Resources/AnimeLogo.png";
            Recursos.Video = "anime_video.mp4";
            break;
        case "Hearthstone":
            Recursos.Fondo = "./Resources/HearthstoneBG.png";
            Recursos.Logo = "./Resources/HearthstoneLogo.png";
            Recursos.Video = "hs_video.mp4";
            break;
        case "Minecraft":
            Recursos.Fondo = "./Resources/MinecraftBG.jpg";
            Recursos.Logo = "./Resources/MinecraftLogo.png";
            Recursos.Video = "mc_video.mp4";
            break;
        default:
            console.log("Tipo de evento no válido.");
            break;
    }

    return Recursos;
}
