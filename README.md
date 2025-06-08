# 📂 Ecommerce SPA Vanilla JS

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Vanilla SPA](https://img.shields.io/badge/SPA-VanillaJS-blue?style=flat-square)](https://es.wikipedia.org/wiki/Aplicaci%C3%B3n_web_de_una_sola_p%C3%A1gina)

Aplicación de ecommerce desarrollada como una **Single Page Application (SPA)** usando JavaScript puro (Vanilla JS), con ruteo manual, carrito de compras persistente y soporte para temas oscuro/claro.

Este proyecto fue desarrollado como **trabajo final** de la materia _Programación Estática y Laboratorio Web_ de la **Tecnicatura Universitaria en Desarrollo Web** de la **Universidad Nacional del Comahue (UNCo)**.

---

## 🧱 Tecnologías usadas

- HTML5 + CSS3 (Flexbox, grid, modo oscuro)
- JavaScript moderno (módulos ES6)
- LocalStorage para persistencia de carrito y tema
- SPA sin frameworks: router propio, estado global manual

---

## 📂 Estructura del Proyecto

| Carpeta / Archivo                    | Descripción                                            |
|--------------------------------------|----------------------------------------------------------|
| `index.html`                         | HTML principal. Contenedor base para SPA (`#app`)        |
| `assets/css/style.css`              | Estilos globales, responsivos y con soporte para darkmode|
| `assets/js/main.js`                 | Entry point. Inicia router y eventos globales            |
| `assets/js/router.js`               | Ruteo SPA manual con soporte para rutas dinámicas        |
| `assets/js/pages/`                  | Vistas principales (Home, Carrito, Contacto, etc.)       |
| `assets/js/components/`            | Componentes reutilizables (modal, buscador, footer, etc.)|
| `assets/js/utils/`                 | Lógica de soporte: debounce, listeners, almacenamiento   |
| `assets/icons/`                     | Íconos usados en la interfaz                           |

---

## 📸 Vista previa

<!-- Reemplazá estos comentarios con capturas reales si querés -->
<!-- ![Captura del home](screenshots/home.png) -->
<!-- ![Captura del carrito](screenshots/carrito.png) -->

---

## ⚙️ Requisitos

- Navegador moderno compatible con ES6
- No requiere backend ni servidor: puede ejecutarse localmente
- Opcional: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de VSCode para desarrollo en caliente

---

## 🚀 Ejecución local

1. Cloná o descargá el repositorio
2. Abrí el archivo `index.html` en tu navegador

```bash
# Clonar el repositorio
https://github.com/usuario/ecommerce-spa-vanillajs.git

# Abrir el archivo manualmente
file:///ruta/a/ecommerce-spa-vanillajs/index.html
```

### ✨ O usando Live Server en VSCode

1. Instalá la extensión **Live Server** desde el marketplace
2. Abrí la carpeta del proyecto en VSCode
3. Click derecho sobre `index.html` > **Open with Live Server**

---

## 🧰 Componentes principales

- `TarjetaProducto`: renderiza cada producto con imagen, precio, y controles
- `ControlesCantidad`: incrementa/disminuye unidades desde múltiples vistas
- `ModalProducto`: muestra detalle del producto + agregar o modificar cantidad
- `Slider`: galeria automática en portada
- `Toast`: notificaciones suaves al agregar productos
- `Buscador` y `FiltrosOrden`: permiten filtrar y ordenar productos

---

## ♿ Accesibilidad & Mejores prácticas

- Navegación por teclado funcional
- Contraste adecuado en tema claro y oscuro
- Imágenes con `alt` descriptivo
- HTML semántico (`main`, `section`, `button`, etc.)

---

## 💡 Ideas futuras y mejoras

- ✅ Agregar paginación de productos
- ✅ Migrar a Web Components o React
- ✅ Conexión con API REST para productos reales
- ✅ Tests con Vitest o Jest + jsdom
- ✅ Mejora de performance con virtual scroll

---

## 👨‍💻 Autor

**Ivan Tarquini**  
GitHub: [@OrnluX](https://github.com/OrnluX)

---

## 📟 Licencia

Distribuido bajo la licencia MIT.  
¡Libre para usar, mejorar y compartir! 🙌
