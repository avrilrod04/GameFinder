// ===== Chatbot con panel (sin alert) =====
const botonChatbot = document.getElementById("boton-chatbot");
const panelChat = document.getElementById("panel-chat");
const chatMensajes = document.getElementById("chat-mensajes");
const chatInput = document.getElementById("chat-input");
const chatEnviar = document.getElementById("chat-enviar");
const botonesRapidos = document.querySelectorAll(".chat-rapidas button");

// Respuestas sacadas de los juegos del catálogo.
const respuestasChat = {
    accion: "Si querés acción, probá GTA V: explorá Los Santos y viví diferentes aventuras. Y si te gusta competir, Counter-Strike 2 tiene partidas rápidas y tácticas.",
    equipo: "Para jugar en equipo te recomiendo Counter-Strike 2: competí en equipo en partidas rápidas y tácticas. También podés armar tu equipo en FIFA.",
    construir: "Si te gusta construir, Minecraft es para vos: explorá, construí y sobreviví.",
    deportes: "Si te gusta el deporte, probá FIFA: disfrutá del fútbol y armá tu equipo.",
    historia: "Si querés una historia épica, jugá The Witcher 3: viví una aventura épica como cazador de monstruos.",
    estrategia: "Si te gusta pensar cada jugada, Age of Empires II es ideal: construí tu imperio y conquistá a tus rivales."
};

const respuestaGenerica = "Mmm, no entendí bien, pero te tiro una idea: si te gusta explorar y construir, probá Minecraft. Contame si preferís acción, equipo, deportes o estrategia y te recomiendo mejor.";

// Agrega un mensaje al panel de chat.
function agregarMensaje(texto, tipo) {
    const p = document.createElement("p");
    p.className = "mensaje " + tipo;
    p.textContent = texto;
    chatMensajes.appendChild(p);
}

// Elige la respuesta según lo que escribió la persona.
function responderChat(texto) {
    const t = normalizar(texto);

    if (t.includes("accion") || t.includes("tiro") || t.includes("aventura")) {
        return respuestasChat.accion;
    }
    if (t.includes("equipo") || t.includes("amigo") || t.includes("juntos") || t.includes("grupo")) {
        return respuestasChat.equipo;
    }
    if (t.includes("constru") || t.includes("crear") || t.includes("mina") || t.includes("bloque")) {
        return respuestasChat.construir;
    }
    if (t.includes("futbol") || t.includes("deporte") || t.includes("pelota")) {
        return respuestasChat.deportes;
    }
    if (t.includes("historia") || t.includes("rol") || t.includes("epic") || t.includes("monstruo")) {
        return respuestasChat.historia;
    }
    if (t.includes("estrategia") || t.includes("imperio") || t.includes("pensar")) {
        return respuestasChat.estrategia;
    }
    return respuestaGenerica;
}

if (botonChatbot && panelChat) {
    // Muestra u oculta el panel de chat.
    botonChatbot.addEventListener("click", function () {
        const abierto = panelChat.hidden === false;
        panelChat.hidden = abierto;
        botonChatbot.textContent = abierto ? "Abrir chatbot" : "Cerrar chatbot";
        botonChatbot.setAttribute("aria-expanded", String(!abierto));
    });
}

botonesRapidos.forEach(function (boton) {
    boton.addEventListener("click", function () {
        agregarMensaje(boton.textContent, "user");
        agregarMensaje(respuestasChat[boton.dataset.respuesta] || respuestaGenerica, "bot");
    });
});

function enviarMensajeChat() {
    const texto = chatInput.value.trim();
    if (texto === "") {
        return;
    }
    agregarMensaje(texto, "user");
    agregarMensaje(responderChat(texto), "bot");
    chatInput.value = "";
}

if (chatEnviar && chatInput) {
    chatEnviar.addEventListener("click", enviarMensajeChat);
    chatInput.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            enviarMensajeChat();
        }
    });
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
