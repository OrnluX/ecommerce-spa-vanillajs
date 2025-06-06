import {
  carrito,
  restarCantidad,
  eliminarProducto,
  sumarCantidad,
} from '../state.js'

/**
 * @function renderPanel
 * @returns {void}
 * @description Renderiza el panel del carrito en la página
 */
export function renderPanel() {
  const lista = document.getElementById('carrito-lista')
  const total = document.getElementById('total-carrito')
  const vacio = document.getElementById('carrito-vacio')
  const botonesCarrito = document.querySelectorAll('.carrito-btn')

  lista.replaceChildren() // Limpia la lista antes de renderizar
  lista.setAttribute('aria-live', 'polite')

  if (carrito.length === 0) {
    vacio.style.display = 'block'
    total.classList.add('btn-oculto')
    botonesCarrito.forEach((btn) => btn.classList.add('btn-oculto'))
    total.textContent = 'Total: $0.00'
  } else {
    vacio.style.display = 'none'
    total.classList.remove('btn-oculto')
    botonesCarrito.forEach((btn) => btn.classList.remove('btn-oculto'))

    let suma = 0

    carrito.forEach((producto) => {
      suma += producto.price * producto.quantity

      const li = document.createElement('li')
      li.className = 'carrito-item'
      li.setAttribute('data-id', producto.id)

      const img = document.createElement('img')
      img.src = producto.image
      img.alt = producto.title
      img.className = 'miniatura'

      const detalles = document.createElement('div')
      detalles.className = 'carrito-detalles'

      const nombre = document.createElement('a')
      nombre.className = 'nombre'
      nombre.href = `/producto/${producto.id}`
      nombre.setAttribute('data-link', '')
      nombre.textContent = producto.title

      const precio = document.createElement('p')
      precio.className = 'precio'
      precio.textContent = `$${producto.price.toFixed(2)}`

      const controles = document.createElement('div')
      controles.className = 'controles-cantidad'

      const btnRestar = document.createElement('button')
      btnRestar.className = 'btn-cantidad restar'
      btnRestar.setAttribute('aria-label', 'Restar cantidad')
      const iconoRestar = document.createElement('i')
      iconoRestar.setAttribute('aria-hidden', 'true')
      iconoRestar.className =
        producto.quantity > 1 ? 'fa-solid fa-square-minus' : 'fas fa-trash-alt'
      btnRestar.appendChild(iconoRestar)
      btnRestar.onclick = () => {
        producto.quantity > 1
          ? restarCantidad(producto.id)
          : eliminarProducto(producto.id)
      }

      const cantidad = document.createElement('span')
      cantidad.className = 'cantidad'
      cantidad.textContent = producto.quantity

      const btnSumar = document.createElement('button')
      btnSumar.className = 'btn-cantidad sumar'
      btnSumar.setAttribute('aria-label', 'Sumar cantidad')
      const iconoSumar = document.createElement('i')
      iconoSumar.className = 'fa-solid fa-square-plus'
      iconoSumar.setAttribute('aria-hidden', 'true')
      btnSumar.appendChild(iconoSumar)
      btnSumar.onclick = () => sumarCantidad(producto.id)

      controles.appendChild(btnRestar)
      controles.appendChild(cantidad)
      controles.appendChild(btnSumar)

      detalles.appendChild(nombre)
      detalles.appendChild(precio)
      detalles.appendChild(controles)

      const btnEliminar = document.createElement('button')
      btnEliminar.className = 'btn-cantidad eliminar'
      btnEliminar.setAttribute('aria-label', 'Eliminar producto')
      const iconoEliminar = document.createElement('i')
      iconoEliminar.className = 'fas fa-trash-alt'
      iconoEliminar.setAttribute('aria-hidden', 'true')
      btnEliminar.appendChild(iconoEliminar)
      btnEliminar.onclick = () => eliminarProducto(producto.id)

      li.appendChild(img)
      li.appendChild(detalles)
      li.appendChild(btnEliminar)

      lista.appendChild(li)
    })

    total.textContent = `Total: $${suma.toFixed(2)}`
  }
}
