// ================================================
//  PORTAFOLIO — Fabian Marca Colque

//  1. BOTÓN DE CAMBIO DE TEMA (claro / oscuro)
// ──────────────────────────────────────────────

// Seleccio el botón por id
var botonTema = document.getElementById("btn-tema");

// Variable que guarda el estado actual del tema
// Empieza en false porque el modo oscuro está desactivado
var modoOscuroActivo = false;

// Función que cambia el tema al hacer clic
function cambiarTema() {

    if (modoOscuroActivo === false) {
        // Si el modo oscuro no está activo, lo activamos
        document.body.classList.add("modo-oscuro");
        botonTema.textContent = "☀️";  // cambia el ícono al sol
        modoOscuroActivo = true;
    } else {
        // Si ya está activo, lo desactivamos
        document.body.classList.remove("modo-oscuro");
        botonTema.textContent = "🌙";  // vuelve a la luna
        modoOscuroActivo = false;
    }
}

// Escuchamos el evento "click" en el botón y llamamos a la función
botonTema.addEventListener("click", cambiarTema);


// ──────────────────────────────────────────────
//  2. BOTÓN DE SALUDO EN LA SECCIÓN CONTACTO
// ──────────────────────────────────────────────

// Seleccionamos el botón y el párrafo donde mostraremos el mensaje
var botonSaludo = document.getElementById("btn-saludo");
var mensajeSaludo = document.getElementById("mensaje-saludo");

// Variable para saber si el mensaje ya está visible
var mensajeVisible = false;

// Función que muestra u oculta el mensaje de saludo
function mostrarSaludo() {

    if (mensajeVisible === false) {
        // Mostramos el mensaje
        mensajeSaludo.textContent = "👋 ¡Gracias por visitar mi portafolio! Si tienes algún proyecto o propuesta, no dudes en escribirme.";
        mensajeSaludo.style.display = "block";  // lo hacemos visible
        botonSaludo.textContent = "✖ Cerrar mensaje";
        mensajeVisible = true;
    } else {
        // Ocultamos el mensaje
        mensajeSaludo.style.display = "none";
        botonSaludo.textContent = "👋 Enviar saludo";
        mensajeVisible = false;
    }
}

// Escuchamos el clic en el botón de saludo
botonSaludo.addEventListener("click", mostrarSaludo);

//  3. RESALTAR EL ENLACE DEL MENÚ ACTIVO
//     según la sección visible en pantalla

// Obtenemos todos los enlaces del menú
var enlacesMenu = document.querySelectorAll(".nav-links a");

// Función que marca como activo el enlace correspondiente
function marcarEnlaceActivo() {

    // Recorremos cada enlace del menú
    for (var i = 0; i < enlacesMenu.length; i++) {

        var enlace = enlacesMenu[i];

        // Obtenemos el id de la sección a la que apunta el enlace
        // El href es algo como "#proyectos", quitamos el "#" con slice(1)
        var idSeccion = enlace.getAttribute("href").slice(1);

        // Buscamos la sección con ese id en el HTML
        var seccion = document.getElementById(idSeccion);

        if (seccion) {
            // getBoundingClientRect nos dice la posición del elemento en pantalla
            var posicion = seccion.getBoundingClientRect();

            // Si la sección está en la parte superior de la pantalla
            if (posicion.top <= 100 && posicion.bottom >= 100) {
                enlace.style.color = "#ffffff";
                enlace.style.fontWeight = "700";
            } else {
                enlace.style.color = "";      // restaura el color original
                enlace.style.fontWeight = ""; // restaura el peso original
            }
        }
    }
}

// Escuchamos el evento scroll de la página
window.addEventListener("scroll", marcarEnlaceActivo);
