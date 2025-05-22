import {
  carrito,
  eliminarProducto,
  sumarCantidad,
  restarCantidad,
} from '../state.js'
import { iniciarListenerCarrito } from '../utils/listenerCarrito.js'

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

      const controles = document.createElement('div')
      controles.className = 'controles-cantidad'

      // Botón restar
      const btnMenos = document.createElement('button')
      btnMenos.className = 'btn-cantidad restar'
      const iconoMenos = document.createElement('i')
      iconoMenos.className =
        producto.quantity === 1
          ? 'fas fa-trash-alt'
          : 'fa-solid fa-square-minus'
      iconoMenos.setAttribute('aria-hidden', 'true')
      btnMenos.setAttribute(
        'aria-label',
        producto.quantity === 1 ? 'Eliminar producto' : 'Restar cantidad'
      )
      btnMenos.appendChild(iconoMenos)

      btnMenos.onclick = async () => {
        if (producto.quantity > 1) {
          restarCantidad(producto.id)
        } else {
          await eliminarProducto(producto.id)
        }
      }

      // Span cantidad entre botones
      const spanCantidad = document.createElement('span')
      spanCantidad.className = 'cantidad'
      spanCantidad.textContent = producto.quantity

      // Botón sumar
      const btnMas = document.createElement('button')
      btnMas.className = 'btn-cantidad sumar'
      btnMas.setAttribute('aria-label', 'Sumar cantidad')
      const iconoMas = document.createElement('i')
      iconoMas.className = 'fa-solid fa-square-plus'
      iconoMas.setAttribute('aria-hidden', 'true')
      btnMas.appendChild(iconoMas)

      btnMas.onclick = () => {
        sumarCantidad(producto.id)
      }

      controles.appendChild(btnMenos)
      controles.appendChild(spanCantidad)
      controles.appendChild(btnMas)

      // Botón eliminar completo
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

      const item = carrito.find((p) => p.id === producto.id)
      const cantidad = item?.quantity || 1
      total += producto.price * cantidad
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
