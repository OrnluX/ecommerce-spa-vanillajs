import {
  sumarCantidad,
  restarCantidad,
  eliminarProducto,
  carrito,
} from '../state.js'

export function crearControlesCantidadCarrito(producto) {
  const wrapper = document.createElement('div')
  wrapper.className = 'controles-cantidad'

  const btnMenos = document.createElement('button')
  btnMenos.className = 'btn-cantidad restar'

  const iconoMenos = document.createElement('i')
  iconoMenos.className =
    producto.quantity === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
  iconoMenos.setAttribute('aria-hidden', 'true')
  btnMenos.setAttribute(
    'aria-label',
    producto.quantity === 1 ? 'Eliminar producto' : 'Restar cantidad'
  )
  btnMenos.appendChild(iconoMenos)

  const spanCantidad = document.createElement('span')
  spanCantidad.className = 'cantidad'
  spanCantidad.textContent = producto.quantity

  const btnMas = document.createElement('button')
  btnMas.className = 'btn-cantidad sumar'
  btnMas.setAttribute('aria-label', 'Sumar cantidad')

  const iconoMas = document.createElement('i')
  iconoMas.className = 'fa-solid fa-square-plus'
  iconoMas.setAttribute('aria-hidden', 'true')
  btnMas.appendChild(iconoMas)

  btnMenos.onclick = async () => {
    if (producto.quantity > 1) {
      restarCantidad(producto.id)
    } else {
      await eliminarProducto(producto.id)
    }

    const actualizado = carrito.find((p) => p.id === producto.id)
    const nuevaCantidad = actualizado?.quantity || 0

    spanCantidad.textContent = nuevaCantidad

    iconoMenos.className =
      nuevaCantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
    btnMenos.setAttribute(
      'aria-label',
      nuevaCantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
    )
  }

  btnMas.onclick = () => {
    sumarCantidad(producto.id)

    const actualizado = carrito.find((p) => p.id === producto.id)
    const nuevaCantidad = actualizado?.quantity || 1

    spanCantidad.textContent = nuevaCantidad

    iconoMenos.className =
      nuevaCantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
    btnMenos.setAttribute(
      'aria-label',
      nuevaCantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
    )
  }

  wrapper.appendChild(btnMenos)
  wrapper.appendChild(spanCantidad)
  wrapper.appendChild(btnMas)

  return wrapper
}
