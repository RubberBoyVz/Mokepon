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

const sectionVerMapa = document.getElementById("ver-mapa");
/** @type {CanvasRenderingContext2D} */
const canvasMapa = document.getElementById("mapa");

let jugadorId = null;

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
let mokeponesEnemigos = [];
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

let lienzo = canvasMapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./img/mokemap.png";

let alturaBuscada;
let anchoMapa = window.innerWidth - 20;
const anchoMaxMapa = 500;

if (anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 20;
}

alturaBuscada = (anchoMapa * 600) / 800;

mapa.width = anchoMapa;
mapa.height = alturaBuscada;

/* CLASE Y OBJETOS MOKEPON */
class Mokepon {
    constructor(nombre, foto, vida, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 80;
        this.alto = 80;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = foto;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

let hipodoge = new Mokepon("Hipodoge", "img/squirtle.png", 5);
let capipepo = new Mokepon("Capipepo", "img/bullbasaur.png", 5);
let ratigueya = new Mokepon("Ratigueya", "img/charmander.png", 5);

const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
];

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
];

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";
    sectionVerMapa.style.display = "none";

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

    unirseAlJuego();
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse").then(function (res) {
        if (res.ok) {
            res.text().then(function (respuesta) {
                console.log(respuesta);
                jugadorId = respuesta;
            });
        }
    });
}

function seleccionarMascotaJugador() {
    // sectionSeleccionarAtaque.style.display = "flex";
    sectionSeleccionarMascota.style.display = "none";
    sectionVerMapa.style.display = "flex";

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

    seleccionarMokepon(mascotaJugador.nombre);

    ataquesMokeponJugador = extraerAtaques(mascotaJugador.nombre, mokepones);
    //seleccionarMascotaEnemigo();

    iniciarMapa();
    pintarCanvas();
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mokepon: mascotaJugador,
        }),
    });
}

function extraerAtaques(nombreMascota, arreglo) {
    let ataques;
    arreglo.forEach((mokepon) => {
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
    numAleatorio = aleatorio(0, mokeponesEnemigos.length - 1);
    mascotaEnemigo = mokeponesEnemigos[numAleatorio];

    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
    ataquesMokeponEnemigo = extraerAtaques(
        mascotaEnemigo.nombre,
        mokeponesEnemigos
    );
}

function ataqueAleatorioEnemigo() {
    numAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    let ataqueAleatorio = ataquesMokeponEnemigo[numAleatorio];

    if (ataqueAleatorio.nombre == "🔥") {
        secuenciaAtaquesEnemigo.push("FUEGO");
        ataquesMokeponEnemigo.splice(numAleatorio, 1);
    } else if (ataqueAleatorio.nombre == "💧") {
        secuenciaAtaquesEnemigo.push("AGUA");
        ataquesMokeponEnemigo.splice(numAleatorio, 1);
    } else {
        secuenciaAtaquesEnemigo.push("TIERRA");
        ataquesMokeponEnemigo.splice(numAleatorio, 1);
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

function iniciarMapa() {
    intervalo = setInterval(pintarCanvas, 20);

    window.addEventListener("keydown", presionarTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function pintarCanvas() {
    mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX;
    mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mascotaJugador.mapaFoto,
        mascotaJugador.x,
        mascotaJugador.y,
        mascotaJugador.ancho,
        mascotaJugador.alto
    );

    mascotaJugador.pintarMokepon();

    enviarPosicion(mascotaJugador.x, mascotaJugador.y);

    if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
        revisarColision();
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ x, y }),
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                console.log(enemigos);

                enemigos.forEach((enemigo) => {
                    const mokeponNombre = enemigo.mokepon.nombre || "";
                    if (mokeponNombre == "Hipodoge") {
                        mascotaEnemigo = new Mokepon(
                            "Hipodoge",
                            "img/squirtle.png",
                            5
                        );
                    } else if (mokeponNombre == "Capipepo") {
                        mascotaEnemigo = new Mokepon(
                            "Capipepo",
                            "img/bullbasaur.png",
                            5
                        );
                    } else if (mokeponNombre == "Ratigueya") {
                        mascotaEnemigo = new Mokepon(
                            "Ratigueya",
                            "img/charmander.png",
                            5
                        );
                    }

                    mascotaEnemigo.x = enemigo.x;
                    mascotaEnemigo.y = enemigo.y;

                    mascotaEnemigo.pintarMokepon();
                });
            });
        }
    });
}

function moverArriba() {
    mascotaJugador.velocidadY = -5;
}

function moverDerecha() {
    mascotaJugador.velocidadX = 5;
}

function moverAbajo() {
    mascotaJugador.velocidadY = 5;
}

function moverIzquierda() {
    mascotaJugador.velocidadX = -5;
}

function detenerMovimiento() {
    mascotaJugador.velocidadX = 0;
    mascotaJugador.velocidadY = 0;
}

function presionarTecla(evento) {
    switch (evento.key) {
        case "ArrowUp":
            moverArriba();
            break;
        case "ArrowRight":
            moverDerecha();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        default:
            break;
    }
}

function revisarColision() {
    const arribaEnemigo = mascotaEnemigo.y;
    const abajoEnemigo = mascotaEnemigo.y + mascotaEnemigo.alto;
    const derechaEnemigo = mascotaEnemigo.x + mascotaEnemigo.ancho;
    const izquierdaEnemigo = mascotaEnemigo.x;

    const arribaJugador = mascotaJugador.y;
    const abajoJugador = mascotaJugador.y + mascotaJugador.alto;
    const derechaJugador = mascotaJugador.x + mascotaJugador.ancho;
    const izquierdaJugador = mascotaJugador.x;

    if (
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    alert("EMPIEZA EL COMBATE");
    sectionVerMapa.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    mostrarAtaques(ataquesMokeponJugador);
    secuenciaAtaque();
}

/* FUNCIÓN PARA CREAR UN NÚMERO ALEATORIO ENTRE DOS RANGOS */
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
