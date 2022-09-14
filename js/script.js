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
let contador = 0;
let contadorVictorias = 0;
let contadorDerrotas = 0;
let contadorEmpates = 0;

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
const pVidasJugador = document.getElementById("puntos-jugador");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const divAtaquesJugador = document.getElementById("ataques-jugador");
const pVidasEnemigo = document.getElementById("puntos-enemigo");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const divAtaquesEnemigo = document.getElementById("ataques-enemigo");

const hSubtitulo = document.getElementById("subtitulo");

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
        location.reload();
    }

    ataquesMokeponJugador = extraerAtaques(mascotaJugador.nombre);
    mostrarAtaques(ataquesMokeponJugador);
    seleccionarMascotaEnemigo();
    secuenciaAtaque();
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
    divInfoCombate.style.display = "flex";
    divInfoVidas.style.display = "grid";

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
                boton.style.display = "none";
            } else if (e.target.textContent == "💧") {
                secuenciaAtaquesJugador.push("AGUA");
                boton.style.display = "none";
            } else {
                secuenciaAtaquesJugador.push("TIERRA");
                boton.style.display = "none";
            }
            ataqueAleatorioEnemigo();
            if (
                secuenciaAtaquesJugador.length == 5 &&
                secuenciaAtaquesEnemigo.length == 5
            ) {
                mostrarSecuenciasAtaques();
            }
        });
    });
}

function seleccionarMascotaEnemigo() {
    numAleatorio = aleatorio(0, mokepones.length - 1);
    mascotaEnemigo = mokepones[numAleatorio];

    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
    ataquesMokeponEnemigo = extraerAtaques(mascotaEnemigo.nombre);
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

function mostrarSecuenciasAtaques() {
    hSubtitulo.innerHTML = "Resultado del combate";

    secuenciaAtaquesJugador.forEach((ataque) => {
        let parrafoAtaqueJugador = document.createElement("p");
        parrafoAtaqueJugador.innerHTML = ataque;
        divAtaquesJugador.appendChild(parrafoAtaqueJugador);
    });

    secuenciaAtaquesEnemigo.forEach((ataque) => {
        let parrafoAtaquesEnemigo = document.createElement("p");
        parrafoAtaquesEnemigo.innerHTML = ataque;
        divAtaquesEnemigo.appendChild(parrafoAtaquesEnemigo);
    });

    resultadoCombate();
}

function resultadoCombate() {
    while (contador < 5) {
        if (
            (secuenciaAtaquesJugador[contador] == "FUEGO" &&
                secuenciaAtaquesEnemigo[contador] == "TIERRA") ||
            (secuenciaAtaquesJugador[contador] == "TIERRA" &&
                secuenciaAtaquesEnemigo[contador] == "AGUA") ||
            (secuenciaAtaquesJugador[contador] == "AGUA" &&
                secuenciaAtaquesEnemigo[contador] == "FUEGO")
        ) {
            contadorVictorias++;
        } else if (
            secuenciaAtaquesJugador[contador] ==
            secuenciaAtaquesEnemigo[contador]
        ) {
            contadorEmpates++;
        } else {
            contadorDerrotas++;
        }

        pVidasJugador.innerHTML = contadorVictorias;
        pVidasEnemigo.innerHTML = contadorDerrotas;

        contador++;
    }

    if (contadorVictorias > contadorDerrotas) {
        parrafoResultado.innerHTML = "¡FELICIDADES! ¡GANASTE!";
    } else if (contadorDerrotas > contadorVictorias) {
        parrafoResultado.innerHTML = "¡LO SIENTO! ¡PERDISTE!";
    } else {
        parrafoResultado.innerHTML = "EMPATE";
    }

    sectionMensajes.style.display = "flex";
    sectionReiniciar.style.display = "block";
    tarjetasAtaques.style.marginBottom = "unset";
}

function reiniciarJuego() {
    location.reload();
}

/* FUNCIÓN PARA CREAR UN NÚMERO ALEATORIO ENTRE DOS RANGOS */
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
