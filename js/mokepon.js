let ataqueJugador, ataqueEnemigo;

let vidasJugador = 3,
    vidasEnemigo = 3;

let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
let sectionMensajes = document.getElementById("mensajes");
let sectionReiniciar = document.getElementById("reiniciar");
let botonMascotaJugador = document.getElementById("boton-mascota");
let divInfoCombate = document.getElementById("informacion-combate");
let botonReiniciar = document.getElementById("boton-reiniciar");

let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
let inputHipodoge = document.getElementById("hipodoge");
let inputCapipepo = document.getElementById("capipepo");
let inputRatigueya = document.getElementById("ratigueya");
let spanMascotaJugador = document.getElementById("mascota-jugador");

let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

let botonFuego = document.getElementById("boton-fuego");
let botonAgua = document.getElementById("boton-agua");
let botonTierra = document.getElementById("boton-tierra");

let spanVidasJugador = document.getElementById("vidas-jugador");
let spanVidasEnemigo = document.getElementById("vidas-enemigo");

let divAtaquesJugador = document.getElementById("ataques-jugador");
let divAtaquesEnemigo = document.getElementById("ataques-enemigo");
let parrafoResultado = document.getElementById("resultado");

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
    } else if (vidasJugador == 0) {
        divInfoCombate.style.marginBottom = "50px";
        crearMensajeFinal("FIN DEL JUEGO: ¡Perdiste!");
    }
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener("load", iniciarJuego);
