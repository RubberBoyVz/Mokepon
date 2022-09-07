/* FUNCION INICIAR JUEGO */
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

/* FUNCION SELECCIONAR MASCOTA JUGADOR */
let mascotaJugador;

/* */
let numAleatorio;
let mascotaEnemigo;
let ataqueJugador, ataqueEnemigo;
let vidasJugador = 3,
    vidasEnemigo = 3;
let mokepones = [];
let opcionDeAtaques;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let secuenciaAtaquesJugador = [];
let secuenciaAtaquesEnemigo = [];
let ataquesMokeponEnemigo;

/* ELEMENTOS PRIMERA PANTALLA */
const sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const botonMascotaJugador = document.getElementById("boton-mascota");

/* ELEMENTOS SEGUNDA PANTALLA */
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const tarjetasAtaques = document.getElementById("tarjetas-ataques");
const divInfoCombate = document.getElementById("informacion-combate");
const sectionMensajes = document.getElementById("mensajes");
const parrafoResultado = document.getElementById("resultado");
const sectionReiniciar = document.getElementById("reiniciar");
const botonReiniciar = document.getElementById("boton-reiniciar");

const divInfoVidas = document.getElementById("informacion-vidas");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const divAtaquesJugador = document.getElementById("ataques-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const divAtaquesEnemigo = document.getElementById("ataques-enemigo");

/* CLASE Y OBJETOS MOKEPON */
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon("Hipodoge", "img/squirtle.png", 5);
let capipepo = new Mokepon("Capipepo", "img/bullbasaur.png", 5);
let ratigueya = new Mokepon("Ratigueya", "img/charmander.png", 5);

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
    });

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    divInfoCombate.style.marginBottom = "unset";
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = "flex";
    sectionSeleccionarMascota.style.display = "none";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = hipodoge.nombre;
        mascotaJugador = hipodoge;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = capipepo.nombre;
        mascotaJugador = capipepo;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = ratigueya.nombre;
        mascotaJugador = ratigueya;
    } else {
        alert("No has elegido mascota");
        //contenedorTarjetas.innerHTML = "";
        location.reload();
        //sectionSeleccionarMascota.style.display = "flex";
    }

    ataquesMokeponJugador = extraerAtaques(mascotaJugador.nombre);
    mostrarAtaques(ataquesMokeponJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(nombreMascota) {
    let ataques;
    mokepones.forEach((mokepon) => {
        if (mokepon.nombre == nombreMascota) {
            ataques = mokepon.ataques;
        }
    });

    return ataques;
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button id=${ataque.id} class="tarjeta ataque BAtaque">${ataque.nombre}</button>
        `;

        tarjetasAtaques.innerHTML += opcionDeAtaques;
    });

    botonAgua = document.getElementById("boton-agua");
    botonFuego = document.getElementById("boton-fuego");
    botonTierra = document.getElementById("boton-tierra");

    botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "🔥") {
                secuenciaAtaquesJugador.push("FUEGO");
                boton.style.background = "white";
            } else if (e.target.textContent == "💧") {
                secuenciaAtaquesJugador.push("AGUA");
                boton.style.background = "white";
            } else {
                secuenciaAtaquesJugador.push("TIERRA");
                boton.style.background = "white";
            }
            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo() {
    numAleatorio = aleatorio(0, mokepones.length - 1);
    mascotaEnemigo = mokepones[numAleatorio];

    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
    ataquesMokeponEnemigo = extraerAtaques(mascotaEnemigo.nombre);

    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    numAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    let ataqueAleatorio = ataquesMokeponEnemigo[numAleatorio];

    if (ataqueAleatorio.nombre == "🔥") {
        secuenciaAtaquesEnemigo.push("FUEGO");
    } else if (ataqueAleatorio.nombre == "💧") {
        secuenciaAtaquesEnemigo.push("AGUA");
    } else {
        secuenciaAtaquesEnemigo.push("TIERRA");
    }
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

/* FUNCIÓN PARA CREAR UN NÚMERO ALEATORIO ENTRE DOS RANGOS */
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
