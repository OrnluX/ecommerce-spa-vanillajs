import { agregarAlCarrito, carrito } from '../state.js'
import { mostrarControlesCantidad } from '../utils/controlesCantidad.js'
import { iniciarListenerCantidad } from '../utils/listenerCantidad.js'

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products')
  const productos = await res.json()

  const container = document.createElement('section')
  const title = document.createElement('h1')
  title.textContent = 'Productos'
  container.appendChild(title)

  const grid = document.createElement('div')
  grid.className = 'productos-grid'

  productos.forEach((p, index) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', p.id)
    card.style.animationDelay = `${index * 0.05}s`

    const img = document.createElement('img')
    img.src = p.image
    img.alt = p.title

    const link = document.createElement('a')
    link.href = `/producto/${p.id}`
    link.setAttribute('data-link', '')
    link.className = 'card-link'

    const h3 = document.createElement('h3')
    h3.textContent = p.title
    link.appendChild(h3)

    const price = document.createElement('p')
    price.className = 'price'
    price.textContent = p.price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    })

    const btn = document.createElement('button')
    btn.classList.add('primary-btn', 'add-to-cart-btn')
    btn.textContent = 'Agregar al carrito'
    btn.onclick = () => {
      agregarAlCarrito(p)
      mostrarControlesCantidad(btn, p.id)
    }

    card.appendChild(img)
    card.appendChild(link)
    card.appendChild(price)
    card.appendChild(btn)

    // Si ya está en el carrito, mostrar controles
    const yaEnCarrito = carrito.some((item) => item.id === p.id)
    if (yaEnCarrito) {
      mostrarControlesCantidad(btn, p.id)
    }

    grid.appendChild(card)
  })

  container.appendChild(grid)
  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(container)

  iniciarListenerCantidad(productos)
}
