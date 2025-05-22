import { mostrarControlesCantidad } from './controlesCantidad.js'
import { agregarAlCarrito, carrito } from '../state.js'
import { abrirModalProducto } from '../components/modalProducto.js'

export function aplicarFiltrosYOrden(productos, categoria, orden) {
  let lista = [...productos]

  if (categoria && categoria !== 'todos') {
    lista = lista.filter((p) => p.category === categoria)
  }

  if (orden === 'menor') {
    lista.sort((a, b) => a.price - b.price)
  } else if (orden === 'mayor') {
    lista.sort((a, b) => b.price - a.price)
  }

  return lista
}

// export function renderizarProductos(productos, grid) {
//   grid.innerHTML = ''
//   productos.forEach((p, index) => {
//     const card = document.createElement('div')
//     card.className = 'card'
//     card.setAttribute('data-id', p.id)
//     card.style.animationDelay = `${index * 0.05}s`

//     const img = document.createElement('img')
//     img.src = p.image
//     img.alt = p.title

//     const link = document.createElement('a')
//     link.href = `/producto/${p.id}`
//     link.setAttribute('data-link', '')
//     link.className = 'card-link'

//     const h3 = document.createElement('h3')
//     h3.textContent = p.title
//     link.appendChild(h3)

//     const price = document.createElement('p')
//     price.className = 'price'
//     price.textContent = p.price.toLocaleString('es-AR', {
//       style: 'currency',
//       currency: 'ARS',
//     })

//     const btn = document.createElement('button')
//     btn.classList.add('primary-btn', 'add-to-cart-btn')
//     btn.textContent = 'Agregar al carrito'
//     btn.onclick = () => {
//       agregarAlCarrito(p)
//       mostrarControlesCantidad(btn, p.id)
//     }

//     card.appendChild(img)
//     card.appendChild(link)
//     card.appendChild(price)
//     card.appendChild(btn)

//     const yaEnCarrito = carrito.some((item) => item.id === p.id)
//     if (yaEnCarrito) {
//       mostrarControlesCantidad(btn, p.id)
//     }

//     grid.appendChild(card)
//   })
// }
export function renderizarProductos(productos, grid) {
  grid.innerHTML = ''
  productos.forEach((p, index) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', p.id)
    card.style.animationDelay = `${index * 0.05}s`

    const img = document.createElement('img')
    img.src = p.image
    img.alt = p.title

    const link = document.createElement('a')
    link.href = '#'
    link.className = 'card-link'
    link.onclick = (e) => {
      e.preventDefault()
      abrirModalProducto(p.id)
    }

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

    const yaEnCarrito = carrito.some((item) => item.id === p.id)
    if (yaEnCarrito) {
      mostrarControlesCantidad(btn, p.id)
    }

    grid.appendChild(card)
  })
}
