// ===== Chatbot flotante: abrir y cerrar =====
const botonFlotante = document.getElementById("boton-chat-flotante");
const ventanaChat = document.getElementById("ventana-chat");
const botonCerrarChat = document.getElementById("chat-cerrar");
const botonAbrirChat = document.getElementById("boton-chatbot");
const chatInput = document.getElementById("chat-input");
const chatGlobito = document.getElementById("chat-globito");

// Esconde el globito para siempre (no vuelve a aparecer).
function ocultarGlobito() {
    if (chatGlobito) {
        chatGlobito.hidden = true;
    }
}

// El globito se va solo a los 8 segundos.
setTimeout(ocultarGlobito, 8000);

// Abre la ventana y lleva el foco a la caja de texto.
function abrirChat() {
    ventanaChat.hidden = false;
    botonFlotante.setAttribute("aria-expanded", "true");
    botonFlotante.setAttribute("aria-label", "Cerrar chat");
    ocultarGlobito();
    chatInput.focus();
}

// Cierra la ventana y devuelve el foco al botón flotante.
function cerrarChat() {
    ventanaChat.hidden = true;
    botonFlotante.setAttribute("aria-expanded", "false");
    botonFlotante.setAttribute("aria-label", "Abrir chat");
    botonFlotante.focus();
}

botonFlotante.addEventListener("click", function () {
    if (ventanaChat.hidden) {
        abrirChat();
    } else {
        cerrarChat();
    }
});

// El botón de la sección también abre la ventana flotante.
botonAbrirChat.addEventListener("click", abrirChat);

botonCerrarChat.addEventListener("click", cerrarChat);

// La tecla Escape cierra la ventana si está abierta.
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !ventanaChat.hidden) {
        cerrarChat();
    }
});

// ===== Chat: envío de mensajes =====
const chatMensajes = document.getElementById("chat-mensajes");
const chatEnviar = document.getElementById("chat-enviar");
const botonesRapidos = document.querySelectorAll(".chat-rapidas button");

// Respuestas en texto simple (en el paso 7 llegan las tarjetas de juegos).
const respuestasChat = {
    accion: "Si querés acción, probá GTA V: explorá Los Santos y viví diferentes aventuras.",
    equipo: "Para jugar en equipo te recomiendo Counter-Strike 2: partidas rápidas y tácticas.",
    construir: "Si te gusta construir, Minecraft es para vos: explorá, construí y sobreviví."
};

const respuestaGenerica = "Mmm, no entendí bien. Probá con los botones de arriba o contame si preferís acción, equipo o construir.";

// Elige la respuesta según lo que escribió la persona.
function responderChat(texto) {
    const t = normalizar(texto);

    if (t.includes("accion") || t.includes("tiro")) {
        return respuestasChat.accion;
    }
    if (t.includes("equipo") || t.includes("amigo") || t.includes("juntos")) {
        return respuestasChat.equipo;
    }
    if (t.includes("constru") || t.includes("crear")) {
        return respuestasChat.construir;
    }
    return respuestaGenerica;
}

// Agrega un mensaje y baja el scroll hasta el final.
function agregarMensaje(texto, tipo) {
    const p = document.createElement("p");
    p.className = "mensaje " + tipo;
    p.textContent = texto;
    chatMensajes.appendChild(p);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Muestra los puntitos de "escribiendo..." (después se saca).
function mostrarEscribiendo() {
    const p = document.createElement("p");
    p.className = "mensaje bot escribiendo";
    p.setAttribute("aria-hidden", "true");
    p.innerHTML = "<span></span><span></span><span></span>";
    chatMensajes.appendChild(p);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
    return p;
}

// Responde con 600ms de "escribiendo..." en el medio.
function responderAlUsuario(textoUsuario) {
    const escribiendo = mostrarEscribiendo();
    setTimeout(function () {
        escribiendo.remove();
        agregarMensaje(responderChat(textoUsuario), "bot");
    }, 600);
}

function enviarMensajeChat() {
    const texto = chatInput.value.trim();
    if (texto === "") {
        return;
    }
    agregarMensaje(texto, "user");
    chatInput.value = "";
    responderAlUsuario(texto);
}

chatEnviar.addEventListener("click", enviarMensajeChat);

chatInput.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        enviarMensajeChat();
    }
});

botonesRapidos.forEach(function (boton) {
    boton.addEventListener("click", function () {
        agregarMensaje(boton.textContent, "user");
        responderAlUsuario(boton.textContent);
    });
});

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
