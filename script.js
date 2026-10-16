// ===== Chatbot =====
function chatbot() {
    alert("🤖 Hola, soy tu asistente gamer. Te puedo ayudar a encontrar un juego.");
}

// ===== Normaliza texto: minúsculas y sin tildes =====
function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ===== Buscador + filtro por género (funcionan juntos) =====
const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("boton-buscar");
const juegos = document.querySelectorAll("section article");
const botonesGenero = document.querySelectorAll("#generos button");
const mensajeSinResultados = document.getElementById("sin-resultados");

let generoElegido = "todos";

// Muestra una tarjeta solo si cumple el texto Y el género.
function aplicarFiltros() {
    const texto = normalizar(buscador.value.trim());
    let visibles = 0;

    juegos.forEach(function (juego) {
        const titulo = normalizar(juego.querySelector("h3").textContent);
        const genero = normalizar((juego.dataset.genero || "").trim());

        const coincideTexto = titulo.includes(texto);
        const coincideGenero = generoElegido === "todos" || genero === generoElegido;
        const mostrar = coincideTexto && coincideGenero;

        juego.style.display = mostrar ? "" : "none";
        if (mostrar) {
            visibles++;
        }
    });

    // Muestra el aviso solo cuando no hay resultados.
    mensajeSinResultados.hidden = visibles > 0;
}

buscador.addEventListener("input", aplicarFiltros);

if (botonBuscar) {
    botonBuscar.addEventListener("click", aplicarFiltros);
}

botonesGenero.forEach(function (boton) {
    boton.addEventListener("click", function () {
        generoElegido = normalizar(boton.textContent.trim());

        // Marca el botón activo y desmarca los demás.
        botonesGenero.forEach(function (b) {
            b.classList.remove("activo");
        });
        boton.classList.add("activo");

        aplicarFiltros();
    });
});

// ===== Números de la portada (se calculan solos) =====
const totalJuegos = document.getElementById("total-juegos");
if (totalJuegos) {
    totalJuegos.textContent = juegos.length;
}

const totalGeneros = document.getElementById("total-generos");
if (totalGeneros) {
    const generosUnicos = new Set();
    juegos.forEach(function (juego) {
        generosUnicos.add(normalizar((juego.dataset.genero || "").trim()));
    });
    generosUnicos.delete("");
    totalGeneros.textContent = generosUnicos.size;
}

aplicarFiltros();
