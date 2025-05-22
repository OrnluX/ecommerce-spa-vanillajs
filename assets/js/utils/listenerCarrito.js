/**
 * @function iniciarListenerCarrito
 * @description Inicia el listener para los cambios en el carrito.
 */
export function iniciarListenerCarrito() {
  document.addEventListener('cantidad-cambiada', (e) => {
    const { id, cantidad } = e.detail

    const item = document.querySelector(`.item-carrito[data-id="${id}"]`)
    if (!item) return

    // Actualizar cantidad entre los botones
    const span = item.querySelector('.controles-cantidad .cantidad')
    if (span) span.textContent = cantidad

    // Actualizar texto "Cantidad: X"
    const pResumen = item.querySelector('.resumen-cantidad')
    if (pResumen) pResumen.textContent = `Cantidad: ${cantidad}`

    // Actualizar ícono del botón restar
    const btnMenos = item.querySelector('.btn-cantidad.restar')
    const iconoMenos = btnMenos?.querySelector('i')
    if (btnMenos && iconoMenos) {
      iconoMenos.className =
        cantidad === 1 ? 'fas fa-trash-alt' : 'fa-solid fa-square-minus'
      btnMenos.setAttribute(
        'aria-label',
        cantidad === 1 ? 'Eliminar producto' : 'Restar cantidad'
      )
    }

    // Eliminar el producto visualmente si se borró
    if (cantidad <= 0) {
      item.remove()
    }

    // Recalcular el total
    const productos = Array.from(document.querySelectorAll('.item-carrito'))
    const total = productos.reduce((acc, item) => {
      const precio = parseFloat(
        item.querySelector('p').textContent.replace('$', '')
      )
      const cantidad = parseInt(
        item.querySelector('.controles-cantidad .cantidad')?.textContent || '0'
      )
      return acc + precio * cantidad
    }, 0)

    const resumen = document.querySelector('.pagina-carrito > p:last-of-type')
    if (resumen) resumen.textContent = `Total: $${total.toFixed(2)}`

    // Si el carrito queda vacío
    if (!productos.length) {
      const section = document.querySelector('.pagina-carrito')
      section.innerHTML = '<h1>Tu carrito</h1><p>Tu carrito está vacío.</p>'
    }
  })
}
