import { mostrarControlesCantidad } from './controlesCantidad.js'
import { carrito, agregarAlCarrito } from '../state.js'

/**
 * Escucha el evento 'cantidad-cambiada' y actualiza las tarjetas de producto.
 * @param {Array} productos - Lista original de productos para reusar datos.
 */
export function iniciarListenerCantidad(productos) {
  document.addEventListener('cantidad-cambiada', (e) => {
    const { id, cantidad } = e.detail

    const card = document.querySelector(`.card[data-id="${id}"]`)
    if (!card) return

    const span = card.querySelector('.controles-cantidad .cantidad')

    if (cantidad > 0) {
      if (span) {
        // Actualiza número
        span.textContent = cantidad

        // Cambia ícono del botón restar si existe
        const icono = card.querySelector('.btn-cantidad.restar i')
        if (icono) {
          icono.className =
            cantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'

          const btnMenos = icono.closest('button')
          if (btnMenos) {
            btnMenos.setAttribute(
              'aria-label',
              cantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
            )
          }
        }
      } else {
        // No hay controles aún → reemplazar botón "Agregar" por controles
        const btn = card.querySelector('.add-to-cart-btn')
        if (btn) {
          const producto = carrito.find((p) => p.id === id)
          if (producto) {
            mostrarControlesCantidad(btn, producto.id)
          }
        }
      }
    } else {
      // cantidad es 0 → eliminar controles y mostrar botón original
      const wrapper = card.querySelector('.controles-cantidad')
      if (wrapper) wrapper.remove()

      const botones = card.querySelectorAll('.add-to-cart-btn')
      botones.forEach((b) => b.remove())

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
