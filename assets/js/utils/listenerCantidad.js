import { agregarAlCarrito } from '../state.js'
import { mostrarControlesCantidad } from './controlesCantidad.js'

export function iniciarListenerCantidad(productos) {
  document.addEventListener('cantidad-cambiada', (e) => {
    const { id, cantidad } = e.detail

    const card = document.querySelector(`.card[data-id="${id}"]`)
    if (!card) return

    const span = card.querySelector('.controles-cantidad .cantidad')
    if (cantidad > 0 && span) {
      span.textContent = cantidad
    } else {
      // Eliminar los controles
      const wrapper = card.querySelector('.controles-cantidad')
      if (wrapper) wrapper.remove()

      // Eliminar cualquier botón previo
      const botones = card.querySelectorAll('.add-to-cart-btn')
      botones.forEach((b) => b.remove())

      // Crear el nuevo botón
      const btn = document.createElement('button')
      btn.classList.add('primary-btn', 'add-to-cart-btn')
      btn.textContent = 'Agregar al carrito'
      btn.onclick = () => {
        const producto = productos.find((p) => p.id === id)
        if (producto) {
          agregarAlCarrito(producto)
          mostrarControlesCantidad(btn, producto.id)
        }
      }

      card.appendChild(btn)
    }
  })
}
