let ataqueJugador, ataqueEnemigo;

let vidasJugador = 3,
    vidasEnemigo = 3;

let mokepones = [];

let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionMensajes = document.getElementById("mensajes");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const divInfoCombate = document.getElementById("informacion-combate");
const divInfoVidas = document.getElementById("informacion-vidas");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);

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

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon("Hipodoge", "img/squirtle.png", 5);
let capipepo = new Mokepon("Capipepo", "img/charmander.png", 5);
let ratigueya = new Mokepon("Ratigueya", "img/bullbasaur.png", 5);

hipodoge.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" }
);

capipepo.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionMensajes.style.display = "none";
    sectionReiniciar.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img class="imagen-mokepon" src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `;

        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
    });

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    divInfoCombate.style.marginBottom = "unset";
    combate();
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";

    sectionSeleccionarMascota.style.display = "none";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
    } else {
        alert("No has elegido mascota");
        contenedorTarjetas.innerHTML = "";
        iniciarJuego();
        sectionSeleccionarMascota.style.display = "flex";
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
}

function combate() {
    divInfoVidas.style.display = "none";
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
    divInfoVidas.style.display = "grid";

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
