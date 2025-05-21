import { agregarAlCarrito, carrito } from '../state.js'
import { mostrarControlesCantidad } from '../utils/controlesCantidad.js'

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
    btn.onclick = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${p.id}`)
      const producto = await res.json()
      agregarAlCarrito(producto)
      mostrarControlesCantidad(btn, producto.id)
    }

    card.appendChild(img)
    card.appendChild(link)
    card.appendChild(price)
    card.appendChild(btn)

    const yaEncarrito = carrito.some((item) => item.id === p.id)
    if (yaEncarrito) {
      mostrarControlesCantidad(btn, p.id)
    }

    grid.appendChild(card)
  })

  container.appendChild(grid)
  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(container)
  document.addEventListener('cantidad-cambiada', (e) => {
    const { id, cantidad } = e.detail

    // Buscar el control que tenga data-id igual al producto
    const card = document.querySelector(`.card[data-id="${id}"]`)
    if (!card) return

    const span = card.querySelector('.controles-cantidad .cantidad')
    if (span) {
      if (cantidad > 0) {
        span.textContent = cantidad
      } else {
        // Volver al botón original si la cantidad llega a 0
        const contenedor = span.parentElement.parentElement // .controles-cantidad
        contenedor.innerHTML = ''

        const btn = document.createElement('button')
        btn.classList.add('primary-btn', 'add-to-cart-btn')
        btn.textContent = 'Agregar al carrito'
        btn.onclick = async () => {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`)
          const producto = await res.json()
          agregarAlCarrito(producto)
          mostrarControlesCantidad(btn, producto.id)
        }

        contenedor.appendChild(btn)
      }
    }
  })
}
