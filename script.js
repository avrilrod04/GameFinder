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

// Los 6 juegos del catálogo con sus palabras clave.
const juegosChat = [
    { nombre: "GTA V", genero: "Acción", frase: "Explorá Los Santos y viví diferentes aventuras.", color: "#D9A05B", claves: ["mundo abierto", "gta", "ciudad", "auto"] },
    { nombre: "Counter-Strike 2", genero: "Acción", frase: "Competí en equipo en partidas rápidas y tácticas.", color: "#D98577", claves: ["accion", "disparo", "tiro", "competitivo", "equipo", "amigo", "juntos", "grupo"] },
    { nombre: "Minecraft", genero: "Aventura", frase: "Explorá, construí y sobreviví.", color: "#6FAF7A", claves: ["constru", "crear", "bloque", "mina", "explorar", "aventura"] },
    { nombre: "FIFA", genero: "Deportes", frase: "Disfrutá del fútbol y armá tu equipo.", color: "#6FAFD0", claves: ["futbol", "deporte", "pelota", "fifa"] },
    { nombre: "The Witcher 3", genero: "Rol", frase: "Viví una aventura épica como cazador de monstruos.", color: "#A895D6", claves: ["rol", "historia", "epic", "monstruo", "fantasia", "brujo"] },
    { nombre: "Age of Empires II", genero: "Estrategia", frase: "Construí tu imperio y conquistá a tus rivales.", color: "#CDBB78", claves: ["estrategia", "imperio", "medieval", "conquista", "pensar"] }
];

// Busca el primer juego que coincida con lo que escribió la persona.
function buscarJuego(texto) {
    const t = normalizar(texto);

    for (const juego of juegosChat) {
        for (const clave of juego.claves) {
            if (t.includes(clave)) {
                return juego;
            }
        }
    }
    return null;
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

// Arma la tarjeta de recomendación dentro de una burbuja del asistente.
function agregarTarjeta(juego) {
    const burbuja = document.createElement("div");
    burbuja.className = "mensaje bot tarjeta-juego";

    const franja = document.createElement("span");
    franja.className = "tarjeta-franja";
    franja.style.backgroundColor = juego.color;
    franja.setAttribute("aria-hidden", "true");

    const nombre = document.createElement("p");
    nombre.className = "tarjeta-nombre";
    nombre.textContent = juego.nombre;

    const dato = document.createElement("p");
    dato.className = "tarjeta-dato";
    dato.textContent = juego.genero + ": " + juego.frase;

    const link = document.createElement("a");
    link.className = "tarjeta-link";
    link.href = "#catalogo";
    link.textContent = "Ver juego →";
    link.addEventListener("click", cerrarChat);

    burbuja.append(franja, nombre, dato, link);
    chatMensajes.appendChild(burbuja);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Responde con 600ms de "escribiendo..." en el medio.
function responderAlUsuario(textoUsuario) {
    const escribiendo = mostrarEscribiendo();
    setTimeout(function () {
        escribiendo.remove();
        const juego = buscarJuego(textoUsuario);
        if (juego) {
            agregarTarjeta(juego);
        } else {
            agregarMensaje("Mmm, no entendí bien. Probá con los botones de arriba: acción, equipo o construir.", "bot");
        }
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

// ===== Formulario de contacto =====
// Simulación: como no hay servidor, el mensaje no se envía a ningún lado.
const formularioContacto = document.getElementById("formulario-contacto");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoMensaje = document.getElementById("mensaje");
const mensajeExito = document.getElementById("mensaje-exito");

// Muestra el error debajo del campo y lo marca como inválido.
function mostrarError(campo, idError, texto) {
    const error = document.getElementById(idError);
    error.textContent = texto;
    error.hidden = false;
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", idError);
}

// Limpia el error de un campo.
function limpiarError(campo, idError) {
    const error = document.getElementById(idError);
    error.textContent = "";
    error.hidden = true;
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
}

formularioContacto.addEventListener("submit", function (evento) {
    evento.preventDefault(); // No recarga la página.

    const nombre = campoNombre.value.trim();
    const email = campoEmail.value.trim();
    const mensaje = campoMensaje.value.trim();
    let primerError = null;

    limpiarError(campoNombre, "error-nombre");
    limpiarError(campoEmail, "error-email");
    limpiarError(campoMensaje, "error-mensaje");
    mensajeExito.hidden = true;

    if (nombre === "") {
        mostrarError(campoNombre, "error-nombre", "Escribí tu nombre.");
        primerError = primerError || campoNombre;
    }

    // Formato básico de email: algo@algo.algo
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        mostrarError(campoEmail, "error-email", "Escribí un email válido.");
        primerError = primerError || campoEmail;
    }

    if (mensaje.length < 10) {
        mostrarError(campoMensaje, "error-mensaje", "El mensaje tiene que tener al menos 10 caracteres.");
        primerError = primerError || campoMensaje;
    }

    // Si hay errores, lleva el foco al primero y no sigue.
    if (primerError) {
        primerError.focus();
        return;
    }

    // Todo bien: vacía el formulario y muestra el saludo.
    formularioContacto.reset();
    mensajeExito.textContent = "¡Gracias, " + nombre + "! Recibimos tu mensaje.";
    mensajeExito.hidden = false;
});
