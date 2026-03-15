// ================================================
//  PORTAFOLIO — Fabian Marca Colque
//  script.js
// ================================================


// ── SELECCIÓN DE ELEMENTOS ──────────────────────
// Guardamos referencias a los elementos que vamos a usar

var botonTema = document.getElementById("btn-tema");
var botonSaludo = document.getElementById("btn-saludo");
var mensajeSaludo = document.getElementById("mensaje-saludo");
var contenedorProyectos = document.getElementById("contenedor-proyectos");


// ── DATOS DE PROYECTOS ──────────────────────────
// Arreglo con la información de cada proyecto.
// JavaScript leerá este arreglo y creará las tarjetas en el HTML.

var proyectos = [
    {
        tag: "IA · WordPress",
        titulo: "Plugin WordPress con IA",
        descripcion: "Plugin para WordPress LMS con sistema de respuesta basado en inteligencia artificial, mejorando la atención e interacción con usuarios."
    },
    {
        tag: "PLC · Automatización",
        titulo: "PLC – Planta de Agua JASAP",
        descripcion: "Lógica de control para automatización en una planta de tratamiento de agua en Villa Tunari, con programación de PLC y monitoreo de variables."
    },
    {
        tag: "Robótica · Control",
        titulo: "Robot 4 GDL – Control y Programación",
        descripcion: "Programación del sistema de control de un robot manipulador de 4 grados de libertad para aplicaciones académicas e industriales."
    }
];


// ── MANEJO DEL TEMA ─────────────────────────────
// Usa classList.toggle() para agregar o quitar la clase "modo-oscuro"
// Usa classList.contains() para saber qué tema está activo

function cambiarTema() {

    // toggle() agrega "modo-oscuro" si no existe, o la quita si ya existe
    document.body.classList.toggle("modo-oscuro");

    // contains() devuelve true si la clase está presente en este momento
    if (document.body.classList.contains("modo-oscuro")) {
        botonTema.textContent = "☀️";
        localStorage.setItem("temaPreferido", "oscuro"); // guardar en localStorage
    } else {
        botonTema.textContent = "🌙";
        localStorage.setItem("temaPreferido", "claro");  // guardar en localStorage
    }
}

botonTema.addEventListener("click", cambiarTema);


// ── PERSISTENCIA CON LOCALSTORAGE ───────────────
// Al cargar la página revisamos si el usuario guardó una preferencia de tema.
// localStorage guarda datos que persisten aunque se recargue o cierre el navegador.

function aplicarTemaGuardado() {

    var temaGuardado = localStorage.getItem("temaPreferido"); // leer valor guardado

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo-oscuro"); // aplicar clase CSS
        botonTema.textContent = "☀️";
    } else {
        document.body.classList.remove("modo-oscuro");
        botonTema.textContent = "🌙";
    }
}


// ── GENERACIÓN DINÁMICA DE PROYECTOS ────────────
// Recorremos el arreglo "proyectos" y creamos una tarjeta HTML por cada uno.
// Esto evita repetir código HTML manualmente.

function mostrarProyectos() {

    contenedorProyectos.innerHTML = ""; // limpiar el contenedor antes de llenar

    for (var i = 0; i < proyectos.length; i++) {

        var proyecto = proyectos[i];

        // Crear el elemento <article>
        var tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta", "proyecto-card");

        // Rellenar el HTML interno de la tarjeta
        tarjeta.innerHTML =
            "<span class='tarjeta-tag'>" + proyecto.tag + "</span>" +
            "<h3>" + proyecto.titulo + "</h3>" +
            "<p>" + proyecto.descripcion + "</p>";

        // Insertar la tarjeta en el contenedor
        contenedorProyectos.appendChild(tarjeta);
    }
}


// ── DELEGACIÓN DE EVENTOS EN PROYECTOS ──────────

function iniciarEventosProyectos() {

    contenedorProyectos.addEventListener("click", function (evento) {

        // closest() busca el ancestro más cercano con esa clase
        var tarjetaClickeada = evento.target.closest(".proyecto-card");

        // Si el clic fue dentro de una tarjeta
        if (tarjetaClickeada) {

            // Primero quitamos la clase "seleccionada" de todas las tarjetas
            var todasLasTarjetas = contenedorProyectos.querySelectorAll(".proyecto-card");
            for (var j = 0; j < todasLasTarjetas.length; j++) {
                todasLasTarjetas[j].classList.remove("proyecto-seleccionada");
            }

            // Luego marcamos solo la tarjeta clickeada
            tarjetaClickeada.classList.add("proyecto-seleccionada");
        }
    });
}


// ── BOTÓN DE SALUDO ─────────────────────────────
// Muestra u oculta un mensaje al hacer clic en "Enviar saludo"

var mensajeVisible = false;

function manejarSaludo() {

    if (!mensajeVisible) {
        mensajeSaludo.textContent = "👋 ¡Gracias por visitar mi portafolio! Si tienes algún proyecto o propuesta, no dudes en escribirme.";
        mensajeSaludo.style.display = "block";
        botonSaludo.textContent = "✖ Cerrar mensaje";
        mensajeVisible = true;
    } else {
        mensajeSaludo.style.display = "none";
        botonSaludo.textContent = "👋 Enviar saludo";
        mensajeVisible = false;
    }
}

botonSaludo.addEventListener("click", manejarSaludo);


// ── RESALTAR ENLACE DEL MENÚ ACTIVO ─────────────
// Al hacer scroll, marcamos el enlace del menú que corresponde a la sección visible.

var enlacesMenu = document.querySelectorAll(".nav-links a");

function marcarEnlaceActivo() {

    for (var i = 0; i < enlacesMenu.length; i++) {

        var enlace = enlacesMenu[i];
        var idSeccion = enlace.getAttribute("href").slice(1); // quita el "#"
        var seccion = document.getElementById(idSeccion);

        if (seccion) {
            var posicion = seccion.getBoundingClientRect();

            if (posicion.top <= 100 && posicion.bottom >= 100) {
                enlace.style.color = "#ffffff";
                enlace.style.fontWeight = "700";
            } else {
                enlace.style.color = "";
                enlace.style.fontWeight = "";
            }
        }
    }
}

window.addEventListener("scroll", marcarEnlaceActivo);


// ── INICIALIZACIÓN ──────────────────────────────
// Estas funciones se ejecutan automáticamente cuando carga la página.

aplicarTemaGuardado();      // 1. Restaurar el tema guardado en localStorage
mostrarProyectos();          // 2. Generar las tarjetas de proyectos con JS
iniciarEventosProyectos();   // 3. Activar delegación de eventos en proyectos
