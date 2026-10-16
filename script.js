// ===== Chatbot =====
function chatbot() {
    alert("🤖 Hola, soy tu asistente gamer. Te puedo ayudar a encontrar un juego.");
}

// ===== Buscador de juegos =====
const buscador = document.getElementById("buscador");
const juegos = document.querySelectorAll("section article");

buscador.addEventListener("input", function () {
    const texto = buscador.value.toLowerCase();

    juegos.forEach(function (juego) {
        const titulo = juego.querySelector("h3").textContent.toLowerCase();

        // Muestra solo los títulos que coinciden.
        juego.style.display = titulo.includes(texto) ? "" : "none";
    });
});

// ===== Filtro por género =====
const botonesGenero = document.querySelectorAll("#generos button");

botonesGenero.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const genero = boton.textContent.toLowerCase();

        // Limpia el buscador para que no se mezclen los filtros.
        buscador.value = "";

        juegos.forEach(function (juego) {
            // El primer <p> de cada tarjeta dice "Género: ..."
            const textoGenero = juego.querySelector("p").textContent.toLowerCase();

            // Muestra la tarjeta si el botón es "Todos" o si el género coincide.
            juego.style.display = (genero === "todos" || textoGenero.includes(genero)) ? "" : "none";
        });
    });
});