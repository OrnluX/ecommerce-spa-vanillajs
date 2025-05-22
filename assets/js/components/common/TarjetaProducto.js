import { mostrarControlesCantidad } from '../../utils/controlesCantidad.js'
import { agregarAlCarrito, carrito } from '../../state.js'
import { abrirModalProducto } from '../common/ModalProducto.js'

export function crearTarjetaProducto(producto, index = 0) {
  const card = document.createElement('div')
  card.className = 'card'
  card.setAttribute('data-id', producto.id)
  card.style.animationDelay = `${index * 0.05}s`

  const img = document.createElement('img')
  img.src = producto.image
  img.alt = producto.title

  const link = document.createElement('a')
  link.href = '#'
  link.className = 'card-link'
  link.onclick = (e) => {
    e.preventDefault()
    abrirModalProducto(producto.id)
  }

  const h3 = document.createElement('h3')
  h3.textContent = producto.title
  link.appendChild(h3)

  const price = document.createElement('p')
  price.className = 'price'
  price.textContent = producto.price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })

  const btn = document.createElement('button')
  btn.classList.add('primary-btn', 'add-to-cart-btn')
  btn.textContent = 'Agregar al carrito'
  btn.onclick = () => {
    agregarAlCarrito(producto)
    mostrarControlesCantidad(btn, producto.id)
  }

  card.appendChild(img)
  card.appendChild(link)
  card.appendChild(price)
  card.appendChild(btn)

  const yaEnCarrito = carrito.some((item) => item.id === producto.id)
  if (yaEnCarrito) {
    mostrarControlesCantidad(btn, producto.id)
  }

  return card
}
