import { carrito, eliminarProducto } from '../state.js'
import { iniciarListenerCarrito } from '../utils/listenerCarrito.js'
import { crearControlesCantidadCarrito } from '../components/ControlesCantidadCarrito.js'

export default function CarritoPage() {
  const section = document.createElement('section')
  section.className = 'pagina-carrito'
  section.setAttribute('aria-live', 'polite')

  const title = document.createElement('h1')
  title.textContent = 'Tu carrito'
  section.appendChild(title)

  if (carrito.length === 0) {
    const vacio = document.createElement('p')
    vacio.textContent = 'Tu carrito está vacío.'
    section.appendChild(vacio)
  } else {
    const lista = document.createElement('ul')
    lista.className = 'lista-carrito'

    let total = 0

    carrito.forEach((producto) => {
      const li = document.createElement('li')
      li.className = 'item-carrito'
      li.setAttribute('data-id', producto.id)

      const img = document.createElement('img')
      img.src = producto.image
      img.alt = producto.title
      img.className = 'miniatura'

      const info = document.createElement('div')
      info.className = 'carrito-info'

      const nombre = document.createElement('a')
      nombre.href = `/producto/${producto.id}`
      nombre.setAttribute('data-link', '')
      nombre.textContent = producto.title

      const precio = document.createElement('p')
      precio.textContent = `$${producto.price.toFixed(2)}`

      const textoCantidad = document.createElement('p')
      textoCantidad.className = 'resumen-cantidad'
      textoCantidad.textContent = `Cantidad: ${producto.quantity}`

      const controles = crearControlesCantidadCarrito(producto)

      const btnEliminar = document.createElement('button')
      btnEliminar.className = 'primary-btn eliminar'
      btnEliminar.setAttribute('aria-label', 'Eliminar producto')
      const iconoEliminar = document.createElement('i')
      iconoEliminar.className = 'fas fa-trash-alt'
      iconoEliminar.setAttribute('aria-hidden', 'true')
      btnEliminar.appendChild(iconoEliminar)
      btnEliminar.onclick = async () => {
        await eliminarProducto(producto.id)
      }

      info.appendChild(nombre)
      info.appendChild(precio)
      info.appendChild(textoCantidad)
      info.appendChild(controles)

      li.appendChild(img)
      li.appendChild(info)
      li.appendChild(btnEliminar)

      lista.appendChild(li)

      total += producto.price * producto.quantity
    })

    const resumen = document.createElement('p')
    resumen.textContent = `Total: $${total.toFixed(2)}`

    section.appendChild(lista)
    section.appendChild(resumen)
  }

  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(section)

  iniciarListenerCarrito()
}
