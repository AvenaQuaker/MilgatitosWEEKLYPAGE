let celdas = document.querySelectorAll(".celda");
let eventador = document.getElementById("eventador");
let Cerrar = document.querySelectorAll(".btnCerrar");
let Cancelar = document.getElementById("Cancelar");
let celdaActual;
let Duracion;

celdas.forEach((celda) => {
    celda.addEventListener("click", () => {
        let Seleccionado = false;
        if (celda.classList.contains("SELECTED")) Seleccionado = true;

        ActivarForma(celda, Seleccionado);
    });
});

Cerrar.forEach((cerrar) => {
    cerrar.addEventListener("click", () => {
        let Padre = cerrar.parentNode;
        CerrarElemento(Padre);
    });
});

document.addEventListener("click", (e) => {
    if (
        !e.target.classList.contains("celda") &&
        !eventador.contains(e.target)
    ) {
        CerrarElemento(eventador);
    }
});

eventador.querySelector("button").addEventListener("click", () => {
    eventador.classList.add("opacity-0");
    eventador.classList.add("pointer-events-none");

    let Datos = new FormData(eventador);
    let objeto = {};
    Datos.forEach((entries, key) => {
        objeto[key] = entries;
    });

    ProgramarEvento(celdaActual, objeto);
});

Cancelar.querySelector("button").addEventListener("click", () => {
    CerrarElemento(Cancelar);

    contador = parseInt(celdaActual.querySelector("p").textContent);
    while (contador > 1) {
        let caja = document.createElement("div");
        caja.classList.add("celda");
        celdaActual.parentNode.append(caja);
        contador -= 1;
    }

    celdaActual.classList.remove("SELECTED");
    celdaActual.style = "";
    celdaActual.classList = "celda";
    celdaActual.innerHTML = "";
});

function ActivarForma(celda, Seleccionado) {
    if (!Seleccionado) {
        eventador.classList.remove("opacity-0");
        eventador.classList.remove("pointer-events-none");
    } else {
        Cancelar.classList.remove("opacity-0");
        Cancelar.classList.remove("pointer-events-none");
    }

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
        let Asunto = document.createElement("h1");
        let Mensaje = document.createElement("h2");
        let horas = document.createElement("p");
        imagenSuper.src = Recursos.Logo;

        Asunto.textContent = Tipo;
        Mensaje.textContent = objeto.Mensaje;
        horas.textContent = `${duracionFinal}`;

        imagenSuper.classList.add("imgSuper");
        horas.classList.add("hidden");
        Asunto.classList.add("Asunto");
        Mensaje.classList.add("Mensaje");

        celda.append(horas);
        celda.append(imagenSuper);
        celda.append(Asunto);
        celda.append(Mensaje);

        // Eliminar las celdas que se "cubrieron" con la expansión
        for (let i = 1; i < duracionFinal; i++) {
            celda.parentNode.removeChild(CeldasSeleccionadas[indiceCelda + 1]);
        }
    } else {
        console.log("Algunas de las celdas están ocupadas.");
    }
}

function obtenerRecrusos(Tipo) {
    const HotsFondos = [
        "./Resources/HotsBG.jpg",
        "./Resources/HotsBG2.jpg",
        "./Resources/HotsBG3.jpg",
    ];

    const IRLFondos = [
        "./Resources/IRLBG.jpg",
        "./Resources/IRLBG2.png",
        "./Resources/IRLBG3.jpg",
    ];

    const AnimeFondos = [
        "./Resources/AnimeBG.png",
        "./Resources/AnimeBG2.png",
        "./Resources/AnimeBG3.png",
    ];

    const HearthstoneFondos = [
        "./Resources/HearthstoneBG.png",
        "./Resources/HearthstoneBG2.png",
        "./Resources/HearthstoneBG3.png",
    ];

    const MinecraftFondos = [
        "./Resources/MinecraftBG.png",
        "./Resources/MinecraftBG2.png",
        "./Resources/MinecraftBG3.png",
    ];

    let Recursos = {
        Fondo: "",
        Logo: "",
    };

    switch (Tipo) {
        case "HOTS":
            Recursos.Fondo = HotsFondos[ObtenerIndice(HotsFondos)];
            Recursos.Logo = "./Resources/HotsLogo.png";
            break;
        case "IRL":
            Recursos.Fondo = IRLFondos[ObtenerIndice(IRLFondos)];
            Recursos.Logo = "./Resources/IRLLogo.png";
            break;
        case "Anime":
            Recursos.Fondo = AnimeFondos[ObtenerIndice(AnimeFondos)];
            Recursos.Logo = "./Resources/AnimeLogo.png";
            break;
        case "Hearthstone":
            Recursos.Fondo =
                HearthstoneFondos[ObtenerIndice(HearthstoneFondos)];
            Recursos.Logo = "./Resources/HearthstoneLogo.png";
            break;
        case "Minecraft":
            Recursos.Fondo = MinecraftFondos[ObtenerIndice(MinecraftFondos)];
            Recursos.Logo = "./Resources/MinecraftLogo.png";
            break;
        default:
            console.log("Tipo de evento no válido.");
            break;
    }

    return Recursos;
}

function ObtenerIndice(Arreglo) {
    const indice = Math.floor(Math.random() * Arreglo.length);
    return indice;
}

function CerrarElemento(elemento) {
    elemento.classList.add("opacity-0");
    elemento.classList.add("pointer-events-none");
}
