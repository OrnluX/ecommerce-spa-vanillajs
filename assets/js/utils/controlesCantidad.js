import { restarCantidad, sumarCantidad, carrito } from '../state.js'

export function mostrarControlesCantidad(btn, productoId) {
  const contenedor = btn.parentElement
  contenedor.removeChild(btn)

  const wrapper = document.createElement('div')
  wrapper.className = 'controles-cantidad'

  const cantidadActual = obtenerCantidadActual(productoId)

  // Botón restar o eliminar
  const btnMenos = document.createElement('button')
  btnMenos.className = 'btn-cantidad restar'
  btnMenos.setAttribute(
    'aria-label',
    cantidadActual === 1 ? 'Eliminar producto' : 'Restar cantidad'
  )

  const iconoMenos = document.createElement('i')
  iconoMenos.className =
    cantidadActual === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
  iconoMenos.setAttribute('aria-hidden', 'true')
  btnMenos.appendChild(iconoMenos)

  btnMenos.onclick = async () => {
    await restarCantidad(productoId)

    const sigueEnCarrito = carrito.some((p) => p.id === productoId)

    if (!sigueEnCarrito) {
      wrapper.remove()
      return
    }

    const nuevaCantidad = obtenerCantidadActual(productoId)
    cantidad.textContent = nuevaCantidad

    // Actualizar ícono dinámicamente
    iconoMenos.className =
      nuevaCantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
    btnMenos.setAttribute(
      'aria-label',
      nuevaCantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
    )
  }

  //Cantidad
  const cantidad = document.createElement('span')
  cantidad.className = 'cantidad'
  cantidad.textContent = cantidadActual

  // Botón sumar
  const btnMas = document.createElement('button')
  btnMas.className = 'btn-cantidad sumar'
  btnMas.setAttribute('aria-label', 'Sumar cantidad')
  const iconoMas = document.createElement('i')
  iconoMas.className = 'fa-solid fa-square-plus'
  iconoMas.setAttribute('aria-hidden', 'true')
  btnMas.appendChild(iconoMas)

  btnMas.onclick = () => {
    sumarCantidad(productoId)
    const nuevaCantidad = obtenerCantidadActual(productoId)
    cantidad.textContent = nuevaCantidad

    // 🔁 Por si pasa de 1 a más (volver a ícono "menos")
    iconoMenos.className =
      nuevaCantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
    btnMenos.setAttribute(
      'aria-label',
      nuevaCantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
    )
  }

  wrapper.appendChild(btnMenos)
  wrapper.appendChild(cantidad)
  wrapper.appendChild(btnMas)

  contenedor.appendChild(wrapper)
}

export function obtenerCantidadActual(id) {
  const item = carrito.find((p) => p.id === id)
  return item?.quantity || 1
}
