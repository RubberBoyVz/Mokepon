let ataqueJugador, ataqueEnemigo;

let vidasJugador = 3,
    vidasEnemigo = 3;

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionMensajes = document.getElementById("mensajes");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const divInfoCombate = document.getElementById("informacion-combate");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const divAtaquesJugador = document.getElementById("ataques-jugador");
const divAtaquesEnemigo = document.getElementById("ataques-enemigo");
const parrafoResultado = document.getElementById("resultado");

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionMensajes.style.display = "none";
    sectionReiniciar.style.display = "none";

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    divInfoCombate.style.marginBottom = "unset";
    combate();
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";

    sectionSeleccionarMascota.style.display = "none";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("No has elegido mascota");
        iniciarJuego();
        sectionSeleccionarMascota.style.display = "flex";
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3);

    if (mascotaAleatorio == 1) {
        let mascotaEnemigo = "Hipodoge";
        spanMascotaEnemigo.innerHTML = mascotaEnemigo;
    } else if (mascotaAleatorio == 2) {
        // Capipepo
        let mascotaEnemigo = "Capipepo";
        spanMascotaEnemigo.innerHTML = mascotaEnemigo;
    } else if (mascotaAleatorio == 3) {
        //Ratigueya
        let mascotaEnemigo = "Patigueya";
        spanMascotaEnemigo.innerHTML = mascotaEnemigo;
    }
}

function combate() {
    botonFuego.addEventListener("click", ataqueFuego);
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
}

function ataqueFuego() {
    ataqueJugador = "Fuego 🔥";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "Agua 💧";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "Tierra 🌱";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Fuego 🔥";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Agua 💧";
    } else {
        ataqueEnemigo = "Tierra 🌱";
    }

    resultadoCombate();
}

function resultadoCombate() {
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador == "Fuego 🔥" && ataqueEnemigo == "Tierra 🌱") ||
        (ataqueJugador == "Tierra 🌱" && ataqueEnemigo == "Agua 💧") ||
        (ataqueJugador == "Agua 💧" && ataqueEnemigo == "Fuego 🔥")
    ) {
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        crearMensaje("RONDA GANADA");
    } else {
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        crearMensaje("RONDA PERDIDA");
    }

    revisarVidas();
}

function crearMensaje(resultado) {
    let parrafoAtaquesJugador = document.createElement("p");
    let parrafoAtaquesEnemigo = document.createElement("p");

    sectionMensajes.style.display = "flex";

    parrafoResultado.innerHTML = resultado;
    parrafoAtaquesJugador.innerHTML = ataqueJugador;
    parrafoAtaquesEnemigo.innerHTML = ataqueEnemigo;

    divAtaquesJugador.appendChild(parrafoAtaquesJugador);
    divAtaquesEnemigo.appendChild(parrafoAtaquesEnemigo);
}

function crearMensajeFinal(mensajeFinal) {
    parrafoResultado.innerHTML = mensajeFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionReiniciar.style.display = "block";
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        divInfoCombate.style.marginBottom = "50px";
        crearMensajeFinal("FIN DEL JUEGO: ¡Ganaste!");
        botonAgua.style.display = "none";
        botonFuego.style.display = "none";
        botonTierra.style.display = "none";
    } else if (vidasJugador == 0) {
        divInfoCombate.style.marginBottom = "50px";
        crearMensajeFinal("FIN DEL JUEGO: ¡Perdiste!");
        botonAgua.style.display = "none";
        botonFuego.style.display = "none";
        botonTierra.style.display = "none";
    }
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener("load", iniciarJuego);
