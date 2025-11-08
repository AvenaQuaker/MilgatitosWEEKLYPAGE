let celdas = document.querySelectorAll(".celda");
let eventador = document.getElementById("eventador");
let Cerrar = document.querySelectorAll(".btnCerrar");
let Cancelar = document.getElementById("Cancelar");
let celdaActual;
let Duracion = -1;
let EventosProgramados = [];
let EventosHoy = [];

let Dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
];

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

eventador.querySelector("button").addEventListener("click", (e) => {
    eventador.classList.add("opacity-0");
    eventador.classList.add("pointer-events-none");

    let tipo = document.getElementById("tipoEvento").value;
    let duracion = document.getElementById("duraEvento").value;
    let mensaje = document.getElementById("msg").value;
    let variado = document.getElementById("eventoVariado").value;

    let objeto;
    if (variado == "") {
        objeto = {
            Tipo: variado,
            Duracion: duracion,
            Mensaje: mensaje,
        };
    } else {
        objeto = {
            Tipo: tipo,
            Duracion: duracion,
            Mensaje: mensaje,
        };
    }

    let celda = celdaActual;
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

    let indiceDia = Array.from(celda.parentNode.parentNode.children).indexOf(
        celda.parentNode
    );

    let DiaSeleccionado = Dias[indiceDia];

    if (bandera) {
        AnadirEvento(
            celda,
            objeto,
            duracionFinal,
            DiaSeleccionado,
            indiceCelda,
            CeldasSeleccionadas
        );
    } else {
        console.log("Algunas de las celdas están ocupadas.");
    }
});

Cancelar.querySelector("button").addEventListener("click", () => {
    CerrarElemento(Cancelar);
    let indiceHora = Array.from(celdaActual.parentNode.children).indexOf(
        celdaActual
    );
    let indiceDia = Array.from(
        celdaActual.parentNode.parentNode.children
    ).indexOf(celdaActual.parentNode);
    let dia = Dias[indiceDia];

    // Filtramos los eventos para eliminar el evento correspondiente a la hora y día
    EventosProgramados = EventosProgramados.filter((evento) => {
        return !(evento.Dia === dia);
    });

    let CeldasSemana = Array.from(celdaActual.parentNode.children);
    CeldasSemana.forEach((celdaActual) => {
        if (celdaActual.classList.contains("SELECTED")) {
            let contador = parseInt(celdaActual.querySelector("p").textContent);

            celdaActual.classList.remove("SELECTED");
            celdaActual.style = "";
            celdaActual.classList = "celda";
            celdaActual.innerHTML = "";

            let celdaSiguiente = celdaActual.nextSibling.nextElementSibling;

            while (contador > 1) {
                let caja = document.createElement("div");
                caja.classList.add("celda");
                caja.addEventListener("click", () => {
                    let Seleccionado = false;
                    if (caja.classList.contains("SELECTED"))
                        Seleccionado = true;

                    ActivarForma(caja, Seleccionado);
                });

                if (celdaSiguiente) {
                    celdaActual.parentNode.insertBefore(caja, celdaSiguiente);
                } else {
                    celdaActual.parentNode.append(caja);
                }
                contador -= 1;
            }
        }
    });
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

function obtenerRecrusos(Tipo) {
    let Recursos = {
        Fondo: "",
        GIF: "",
    };

    switch (Tipo) {
        case "ONIXIA":
            Recursos.Fondo = "./Resources/Onixia.webp"
            Recursos.GIF = "./Resources/Onixia.gif";
            break;
        case "MC":
            Recursos.Fondo = "./Resources/MC.jpg"
            Recursos.GIF = "./Resources/MC.gif";
            break;
        case "KARA":
            Recursos.Fondo = "./Resources/Kara.jpg"
            Recursos.GIF = "./Resources/Kara.gif";
            break;
        case "BWL":
            Recursos.Fondo = "./Resources/BWL.webp"
            Recursos.GIF = "./Resources/BWL.gif";
            break;
        case "ZG":
            Recursos.Fondo = "./Resources/ZG.jpg"
            Recursos.GIF = "./Resources/ZG.gif";
            break;
        case "SE":
            Recursos.Fondo = "./Resources/SE.JPG"
            Recursos.GIF = "./Resources/SE.gif";
            break;
        case "AQ20":
            Recursos.Fondo = "./Resources/AQ20.JPG"
            Recursos.GIF = "./Resources/AQ20.PNG";
            break;
        case "AQ40":
            Recursos.Fondo = "./Resources/AQ40.JPG"
            Recursos.GIF = "./Resources/AQ401.JPG";
            break;
        default:
            Recursos.Fondo = "./Resources/VariadoBG.png";
            Recursos.GIF = "./Resources/Webada.gif";
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

function AnadirEvento(
    celda,
    objeto,
    duracionFinal,
    DiaSeleccionado,
    indiceCelda,
    CeldasSeleccionadas
) {
    let Tipo = objeto.Tipo;
    let Recursos = obtenerRecrusos(Tipo);

    celda.classList.add("bg-cover", "SELECTED");
    celda.style.backgroundImage = `url('${Recursos.Fondo}')`;
    celda.style.background;
    celda.style.gridRow = `span ${duracionFinal}`;

    let Asunto = document.createElement("h1");
    let Mensaje = document.createElement("h2");
    let horas = document.createElement("p");

    Asunto.textContent = Tipo;
    Mensaje.textContent = objeto.Mensaje;
    horas.textContent = `${duracionFinal}`;

    horas.classList.add("hidden");
    Asunto.classList.add("Asunto");
    Mensaje.classList.add("Mensaje");

    celda.append(horas);
    celda.append(Asunto);
    celda.append(Mensaje);

    EventosProgramados.push({
        Dia: DiaSeleccionado,
        indice: indiceCelda,
        Tipo: Tipo,
        Mensaje: objeto.Mensaje,
        Duracion: duracionFinal,
    });

    // Eliminar las celdas que se "cubrieron" con la expansión
    for (let i = 1; i < duracionFinal; i++) {
        celda.parentNode.removeChild(CeldasSeleccionadas[indiceCelda + 1]);
    }
}

function EventosDeHoy(eventos) {
    let Eventos = eventos;

    let Tabla = document.querySelector("#tablaHoy");

    Eventos.forEach((evento, index) => {
        let Elemento = document.createElement("tr");
        Elemento.classList.add("hoy");
        Elemento.innerHTML = `
            <td>${index + 1}. ${evento.Tipo}</td>
            <td>${evento.Mensaje}</td>
        `;

        const objeto = obtenerRecrusos(evento.Tipo);
        Elemento.style.setProperty("--img", `url(${objeto.GIF})`);
        Tabla.appendChild(Elemento);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const hoy = new Date();
    const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    const Dia = diasSemana[hoy.getDay()];

    $.ajax({
        url: "https://api.jsonbin.io/v3/b/6709e7c0ad19ca34f8b6fd9b/latest",
        method: "GET",
        headers: {
            "X-Master-Key":
                "$2a$10$VEuGsqK6LbSVlHXblkpfQOutAo4.UGmKGbL5i41xcrs1f2FBFJkQC",
        },
        success: function (response) {
            console.log("Recursos cargados correctamente:", response);
            let Recibidos = response.record.EventosProgramados;
            let horario = celdas[0].parentNode.parentNode;

            // Cargar los recursos en las celdas
            Recibidos.forEach((recurso) => {
                let dia = Dias.indexOf(recurso.Dia);
                let celda = horario.children[dia].children[recurso.indice];

                let CeldasSeleccionadas = celda.parentNode.children;
                let indiceCelda =
                    Array.from(CeldasSeleccionadas).indexOf(celda);
                let bandera = true;
                Duracion = parseInt(recurso.Duracion);

                // Calcular cuántas celdas hay disponibles
                let celdasDisponibles =
                    CeldasSeleccionadas.length - indiceCelda;
                let duracionFinal = Math.min(Duracion, celdasDisponibles);

                // Revisar si las celdas en el rango están ocupadas
                for (let i = 0; i < duracionFinal; i++) {
                    if (
                        CeldasSeleccionadas[indiceCelda + i].classList.contains(
                            "SELECTED"
                        )
                    ) {
                        bandera = false; // Si alguna está ocupada, no se puede seleccionar
                        break;
                    }
                }

                let indiceDia = Array.from(
                    celda.parentNode.parentNode.children
                ).indexOf(celda.parentNode);

                let DiaSeleccionado = Dias[indiceDia];

                if (bandera) {
                    AnadirEvento(
                        celda,
                        recurso,
                        duracionFinal,
                        DiaSeleccionado,
                        indiceCelda,
                        CeldasSeleccionadas
                    );
                }

                if (recurso.Dia == Dia) {
                    EventosHoy.push(recurso);
                }
            });

            EventosDeHoy(EventosHoy);
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar recursos:", error);
        },
    });
});

document.getElementById("btnGuardar").addEventListener("click", () => {
    $.ajax({
        url: "https://api.jsonbin.io/v3/b/6709e7c0ad19ca34f8b6fd9b",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
                "$2a$10$VEuGsqK6LbSVlHXblkpfQOutAo4.UGmKGbL5i41xcrs1f2FBFJkQC",
        },
        data: JSON.stringify({ EventosProgramados: EventosProgramados }), // Guardar los eventos programados
        success: function (response) {
            console.log(
                "Eventos guardados correctamente en JSONBin:",
                response
            );
            alert("Eventos guardados correctamente.");
        },
        error: function (xhr, status, error) {
            console.error("Error al guardar eventos:", error);
            alert("Error al guardar eventos.");
        },
    });
});
