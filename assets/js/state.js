import { renderPanel } from './utils/renderPanelCarrito.js'
import { mostrarToast } from './components/common/Toast.js'

export let carrito = JSON.parse(localStorage.getItem('carrito')) || []

/**
 * @function agregarAlCarrito
 * @param {Object} producto - El producto a agregar al carrito
 * @returns {void}
 * @description Agrega un producto al carrito. Si el producto ya existe, aumenta la cantidad.
 */
export function agregarAlCarrito(producto) {
  const index = carrito.findIndex((item) => item.id === producto.id)
  if (index !== -1) {
    carrito[index].quantity += 1
  } else {
    carrito.push({ ...producto, quantity: 1 })
  }
  guardarCarrito()
  mostrarToast(`"${producto.title}" añadido al carrito`, 'agregado')
  renderPanel()
}

/**
 * @function eliminarProducto
 * @param {number} id - El ID del producto a eliminar
 * @returns {Promise<void>}
 * @description Elimina un producto del carrito. Si el producto no existe, no hace nada.
 */
export async function eliminarProducto(id) {
  const producto = carrito.find((item) => item.id === id)
  const li = document.querySelector(`li[data-id="${id}"]`)
  const eliminar = () => {
    carrito = carrito.filter((item) => item.id !== id)
    guardarCarrito()
    if (producto) mostrarToast(`"${producto.title}" eliminado`, 'eliminado')
    renderPanel()
    document.dispatchEvent(
      new CustomEvent('cantidad-cambiada', {
        detail: { id, cantidad: 0 },
      })
    )
  }

  if (li) {
    li.classList.add('eliminando')
    return new Promise((resolve) => {
      setTimeout(() => {
        eliminar()
        // resolve()
      }, 300)
    })
  } else {
    eliminar()
    return Promise.resolve()
  }
}

/**
 * @function guardarCarrito
 * @returns {void}
 * @description Guarda el carrito en el localStorage y actualiza el contador
 * No exporta la función, ya que se usa solo dentro de este módulo
 */
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  actualizarContador()
}

/**
 * @function actualizarContador
 * @returns {void}
 * @description Actualiza el contador de productos en el carrito
 */
export function actualizarContador() {
  const total = carrito.reduce((sum, item) => sum + item.quantity, 0)
  // document.getElementById('contador-carrito').textContent = total
  const contador = document.getElementById('contador-carrito')
  if (!contador) return

  contador.textContent = total
  contador.classList.add('animado')

  setTimeout(() => {
    contador.classList.remove('animado')
  }, 200)
}

/**
 * @function initPanelCarrito
 * @returns {void}
 * @description Inicializa el panel del carrito
 */
export function initPanelCarrito() {
  const btnAbrir = document.getElementById('carrito-boton')
  const panel = document.getElementById('carrito-panel')
  const btnCerrar = document.getElementById('cerrar-carrito')

  btnAbrir?.addEventListener('click', () => {
    panel.classList.add('visible')
    panel.classList.remove('oculto')
    renderPanel()
  })

  btnCerrar?.addEventListener('click', () => {
    panel.classList.remove('visible')
  })
}

/**
 * @function cerrarPanelCarrito
 * @returns {void}
 * @description Cierra el panel del carrito
 */
export function sumarCantidad(id) {
  const item = carrito.find((p) => p.id === id)
  if (item) item.quantity += 1
  guardarCarrito()
  renderPanel()
  document.dispatchEvent(
    new CustomEvent('cantidad-cambiada', {
      detail: { id, cantidad: item.quantity },
    })
  )
}

/**
 * @function restarCantidad
 * @param {number} id - El ID del producto a restar
 * @returns {Promise<void>}
 * @description Resta una unidad a la cantidad de un producto en el carrito. Si la cantidad llega a 0, elimina el producto del carrito.
 */
export async function restarCantidad(id) {
  const item = carrito.find((p) => p.id === id)
  if (!item) return

  item.quantity -= 1

  if (item.quantity <= 0) {
    await eliminarProducto(id)
    return
  }

  guardarCarrito()
  renderPanel()
  document.dispatchEvent(
    new CustomEvent('cantidad-cambiada', {
      detail: { id, cantidad: item.quantity },
    })
  )
}

// Exponer para los botones dinámicos
window.eliminarDelCarrito = eliminarProducto
