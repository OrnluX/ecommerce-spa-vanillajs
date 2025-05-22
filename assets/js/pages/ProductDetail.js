// import { agregarAlCarrito } from '../state.js'

// export default async function ProductDetail({ id }) {
//   const res = await fetch(`https://fakestoreapi.com/products/${id}`)

//   if (!res.ok) {
//     document.getElementById('app').innerHTML = '<p>Producto no encontrado.</p>'
//     return
//   }

//   const producto = await res.json()

//   const container = document.createElement('section')
//   container.className = 'producto-detalle'

//   container.innerHTML = `
//     <div class="detalle-contenido">
//       <img src="${producto.image}" alt="${producto.title}" class="detalle-imagen" />
//       <div class="detalle-info">
//         <h1>${producto.title}</h1>
//         <p class="detalle-descripcion">${producto.description}</p>
//         <p class="detalle-precio"><strong>$${producto.price}</strong></p>
//         <button class="primary-btn" id="btn-agregar">Agregar al carrito</button>
//       </div>
//     </div>
//   `

//   const app = document.getElementById('app')
//   app.innerHTML = ''
//   app.appendChild(container)

//   document.getElementById('btn-agregar').addEventListener('click', () => {
//     agregarAlCarrito(producto)
//   })
// }

import { agregarAlCarrito } from '../state.js'

export default async function ProductDetail({ id }, contenedorExterno = null) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)

  if (!res.ok) {
    const destino = contenedorExterno || document.getElementById('app')
    destino.innerHTML = '<p>Producto no encontrado.</p>'
    return
  }

  const producto = await res.json()

  const container = document.createElement('section')
  container.className = 'producto-detalle'

  container.innerHTML = `
    <div class="detalle-contenido">
      <img src="${producto.image}" alt="${
    producto.title
  }" class="detalle-imagen" />
      <div class="detalle-info">
        <h1>${producto.title}</h1>
        <p class="detalle-descripcion">${producto.description}</p>
        <p class="detalle-precio"><strong>$${producto.price}</strong></p>
        <button class="primary-btn" id="btn-agregar">Agregar al carrito</button>
        ${
          contenedorExterno
            ? '<button class="primary-btn cerrar-modal">Cerrar</button>'
            : ''
        }
      </div>
    </div>
  `

  const destino = contenedorExterno || document.getElementById('app')
  destino.innerHTML = ''
  destino.appendChild(container)

  container.querySelector('#btn-agregar').addEventListener('click', () => {
    agregarAlCarrito(producto)
  })

  // Cierre del modal si aplica
  if (contenedorExterno) {
    container.querySelector('.cerrar-modal').addEventListener('click', () => {
      const modal = document.getElementById('modal-producto')
      if (modal) {
        modal.classList.add('oculto')
        modal.querySelector('.modal-contenido').innerHTML = ''
      }
    })
  }
}
