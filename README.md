# 🎮 GameFinder

GameFinder es una página web sencilla que funciona como catálogo de videojuegos para PC. Su objetivo es ayudar a los usuarios a descubrir videojuegos que se adapten a sus gustos.

Es mi proyecto final para mis estudios de programación.

## 🛠️ Tecnologías utilizadas

- **HTML**: estructura de la página.
- **CSS**: estilos y diseño visual.
- **JavaScript**: interacciones (buscador, filtros y chatbot).
- **Google Fonts**: tipografías Chakra Petch (títulos) y DM Sans (texto), con fuente de respaldo `sans-serif` si no hay internet.

No se usan librerías, frameworks ni herramientas externas. La única excepción externa son las tipografías de Google Fonts.

## ✨ Qué incluye la página

- Una cabecera con el logo "GameFinder" y menú de navegación (Inicio, Juegos, Géneros, Contacto).
- Una portada con etiqueta, título, buscador con botón "Buscar" y un recuadro con datos reales (juegos en el catálogo, géneros para filtrar y asistente gamer, calculados con JS).
- Botones de género tipo pastilla (Todos, Aventura, Acción, Deportes, Rol, Estrategia) que filtran en conjunto con el buscador.
- Un catálogo de 6 juegos (Minecraft, GTA V, FIFA, The Witcher 3, Counter-Strike 2 y Age of Empires II), cada tarjeta con su portada de color, género, descripción y botón "Ver juego".
- Un mensaje cuando la búsqueda no tiene resultados.
- Una sección de chatbot con panel de chat: mensaje de bienvenida, respuestas rápidas y cajita para escribir, con recomendaciones de juegos del catálogo.
- Una sección de contacto con el mail como link y un pie de página.
- Un diseño oscuro y sobrio, responsive (celular, tablet y escritorio) y con accesibilidad básica (etiquetas, contraste y botones de 44px).

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

### [2026-10-16] Rediseño de GameFinder (rama rediseno-gamefinder)

- **Descripción**: Se rediseñó la página con estilo oscuro moderno y sobrio, manteniendo los mismos textos y funciones.
- **Archivos modificados**: `index.html`, `style.css`, `script.js`
- **Motivo**: Proyecto final: dejar la página funcional, simple, ordenada y lista para presentar, sin frameworks ni imágenes externas.
- **Detalles**:
  - Paleta de colores como variables CSS y tipografías Chakra Petch + DM Sans (con respaldo `sans-serif`)
  - Cabecera con logo a la izquierda y menú a la derecha, con línea inferior sutil
  - Portada en dos columnas con buscador, botón "Buscar" y recuadro de datos (números calculados con JS desde las tarjetas reales)
  - Botones de género tipo pastilla con estado activo
  - Tarjetas en grilla con portada de color, inicial y etiqueta de género, más atributo `data-genero`
  - Buscador y filtro por género combinados (sin pisarse), con mensaje "No encontramos juegos con esa búsqueda"
  - Chatbot con panel de chat, respuestas rápidas y recomendaciones de juegos del catálogo (reemplaza al `alert`)
  - Contacto con mail `mailto:` y pie con © 2026 GameFinder
  - Responsive: 1 columna en celular, 2 en tablet, contenido centrado de 1280px en escritorio, sin scroll horizontal
  - Accesibilidad: etiquetas para el buscador y el chat, foco visible, botones de 44px y buen contraste
- **Pruebas**: Revisión de sintaxis JS con `node --check` (aprobada). Revisión de HTML y CSS por lectura (aprobada, sin errores evidentes). Pruebas visuales y funcionales en navegador (pendientes - Avril las valida abriendo `index.html` y refrescando con Ctrl + F5).

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

- Agregar más videojuegos y géneros.
- Hacer que los botones "Ver juego" muestren más información.

## 👩‍💻 Autora

Avril Rodríguez  
GitHub: [avrilrod04](https://github.com/avrilrod04)
