import { agregarAlCarrito } from '../state.js'

export default async function ProductDetail({ id }) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)

  if (!res.ok) {
    document.getElementById('app').innerHTML = '<p>Producto no encontrado.</p>'
    return
  }

  const producto = await res.json()

  const container = document.createElement('section')
  container.className = 'producto-detalle'

  container.innerHTML = `
    <div class="detalle-contenido">
      <img src="${producto.image}" alt="${producto.title}" class="detalle-imagen" />
      <div class="detalle-info">
        <h1>${producto.title}</h1>
        <p class="detalle-descripcion">${producto.description}</p>
        <p class="detalle-precio"><strong>$${producto.price}</strong></p>
        <button class="primary-btn" id="btn-agregar">Agregar al carrito</button>
      </div>
    </div>
  `

  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(container)

  document.getElementById('btn-agregar').addEventListener('click', () => {
    agregarAlCarrito(producto)
  })
}
