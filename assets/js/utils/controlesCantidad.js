import { restarCantidad, sumarCantidad, carrito } from '../state.js'

export function mostrarControlesCantidad(btn, productoId) {
  const contenedor = btn.parentElement

  contenedor.removeChild(btn)

  const wrapper = document.createElement('div')
  wrapper.className = 'controles-cantidad'

  // Botón restar
  const btnMenos = document.createElement('button')
  btnMenos.className = 'btn-cantidad restar'
  btnMenos.setAttribute('aria-label', 'Restar cantidad')
  const iconoMenos = document.createElement('i')
  iconoMenos.className = 'fa-solid fa-square-minus'
  btnMenos.appendChild(iconoMenos)

  btnMenos.onclick = async () => {
    await restarCantidad(productoId)

    const sigueEnCarrito = carrito.some((p) => p.id === productoId)

    if (!sigueEnCarrito) {
      wrapper.remove()
      return
    }
    cantidad.textContent = obtenerCantidadActual(productoId)
  }

  //Cantidad
  const cantidad = document.createElement('span')
  cantidad.className = 'cantidad'
  cantidad.textContent = obtenerCantidadActual(productoId)

  // Botón sumar
  const btnMas = document.createElement('button')
  btnMas.className = 'btn-cantidad sumar'
  btnMas.setAttribute('aria-label', 'Sumar cantidad')
  const iconoMas = document.createElement('i')
  iconoMas.className = 'fa-solid fa-square-plus'
  btnMas.appendChild(iconoMas)

  btnMas.onclick = () => {
    sumarCantidad(productoId)
    cantidad.textContent = obtenerCantidadActual(productoId)
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
