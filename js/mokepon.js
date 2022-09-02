let ataqueJugador, ataqueEnemigo;

let vidasJugador = 3,
    vidasEnemigo = 3;

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
    let sectionSeleccionarAtaque =
        document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";

    let sectionMensajes = document.getElementById("mensajes");
    sectionMensajes.style.display = "none";

    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "none";

    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    let divInfoCombate = document.getElementById("informacion-combate");
    divInfoCombate.style.marginBottom = "unset";
    combate();

    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarAtaque =
        document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "flex";

    let sectionSeleccionarMascota = document.getElementById(
        "seleccionar-mascota"
    );
    sectionSeleccionarMascota.style.display = "none";

    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");

    let spanMascotaJugador = document.getElementById("mascota-jugador");

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
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

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
    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("boton-tierra");
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
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador == "Fuego 🔥" && ataqueEnemigo == "Tierra 🌱") ||
        (ataqueJugador == "Tierra 🌱" && ataqueEnemigo == "Agua 💧") ||
        (ataqueJugador == "Agua 💧" && ataqueEnemigo == "Fuego 🔥")
    ) {
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        crearMensaje("GANASTE 🎉");
    } else {
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        crearMensaje("PERDISTE 😈");
    }

    revisarVidas();
}

function crearMensaje(resultado) {
    let divAtaquesJugador = document.getElementById("ataques-jugador");
    let divAtaquesEnemigo = document.getElementById("ataques-enemigo");

    let parrafoResultado = document.getElementById("resultado");
    let parrafoAtaquesJugador = document.createElement("p");
    let parrafoAtaquesEnemigo = document.createElement("p");

    let sectionMensajes = document.getElementById("mensajes");
    sectionMensajes.style.display = "flex";

    parrafoResultado.innerHTML = resultado;
    parrafoAtaquesJugador.innerHTML = ataqueJugador;
    parrafoAtaquesEnemigo.innerHTML = ataqueEnemigo;

    divAtaquesJugador.appendChild(parrafoAtaquesJugador);
    divAtaquesEnemigo.appendChild(parrafoAtaquesEnemigo);
}

function crearMensajeFinal(mensajeFinal) {
    let parrafoResultado = document.getElementById("resultado");

    parrafoResultado.innerHTML = mensajeFinal;

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.disabled = true;
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.disabled = true;
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.disabled = true;

    let sectionReiniciar = document.getElementById("reiniciar");
    sectionReiniciar.style.display = "block";
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        let divInfoCombate = document.getElementById("informacion-combate");
        divInfoCombate.style.marginBottom = "50px";
        crearMensajeFinal("Felicitaciones! Ganaste!");
    } else if (vidasJugador == 0) {
        let divInfoCombate = document.getElementById("informacion-combate");
        divInfoCombate.style.marginBottom = "50px";
        crearMensajeFinal("Lo siento! Perdiste!");
    }
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener("load", iniciarJuego);
