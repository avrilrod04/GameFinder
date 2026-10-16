# 🎮 GameFinder

GameFinder es una página web sencilla que funciona como catálogo de videojuegos para PC. Su objetivo es ayudar a los usuarios a descubrir videojuegos que se adapten a sus gustos.

Es mi proyecto final para mis estudios de programación.

## 🛠️ Tecnologías utilizadas

- **HTML**: estructura de la página.
- **CSS**: estilos y diseño visual.
- **JavaScript**: interacciones sencillas.

No se usan librerías ni herramientas externas.

## ✨ Qué incluye la página

- Una cabecera con el nombre del proyecto y un menú de navegación.
- Un catálogo con tarjetas de videojuegos (Minecraft, GTA V y FIFA), cada una con su género y una breve descripción.
- Un campo para buscar juegos.
- Una sección de chatbot: al tocar el botón "Abrir chatbot" aparece un mensaje de bienvenida del asistente gamer.
- Un diseño oscuro con tarjetas y botones que reaccionan al pasar el mouse.

## 📁 Estructura del proyecto

```
GameFinder/
├── index.html   → estructura de la página
├── style.css    → estilos visuales
├── script.js    → código JavaScript
└── README.md    → explicación del proyecto
```

## ▶️ Cómo usar el proyecto

1. Descargá el repositorio desde GitHub (botón verde **Code** → **Download ZIP**) y extraelo en tu computadora.
2. Abrí la carpeta del proyecto.
3. Hacé doble clic en el archivo `index.html`.
4. La página se abre en tu navegador y ya podés recorrerla.

No hace falta instalar nada.

## 📝 Registro de cambios

### [2026-10-16] Diseño responsive para móvil, tablet y laptop

- **Descripción**: Se añadió diseño responsive mediante media queries CSS para adaptar la página a distintos tamaños de pantalla.
- **Archivos modificados**: `style.css`
- **Motivo**: Solicitud de hacer la página responsive para mobile, tablets y laptops.
- **Detalles**:
  - Añadido `box-sizing: border-box` global
  - Mejorada navegación con mejor comportamiento
  - Ajustado ancho de contenedores (`main`, `section`) para adaptarse a viewport
  - Móvil (≤480px): tarjetas en columna, padding reducido, nav flexible, tipografías ajustadas
  - Tablet (481px–991px): tarjetas en 2 columnas, espaciados optimizados
  - Laptop/Escritorio (≥992px): se mantiene estructura coherente
- **Pruebas**: Revisión de sintaxis CSS (aprobada). Pruebas visuales en navegador (pendientes - no ejecutables en entorno actual). No se detectaron errores.

## 🚀 Posibles mejoras a futuro

- Que el buscador filtre los juegos del catálogo.
- Agregar más videojuegos y géneros.
- Hacer que los botones "Ver juego" muestren más información.
- Que el chatbot pueda responder preguntas.

## 👩‍💻 Autora

Avril Rodríguez  
GitHub: [avrilrod04](https://github.com/avrilrod04)
