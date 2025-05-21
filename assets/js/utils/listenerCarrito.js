export function iniciarListenerCarrito() {
  document.addEventListener('cantidad-cambiada', (e) => {
    const { id, cantidad } = e.detail

    const item = document.querySelector(`.item-carrito[data-id="${id}"]`)
    if (!item) return

    if (cantidad > 0) {
      const pCantidad = item.querySelector('p:nth-of-type(2)')
      if (pCantidad) pCantidad.textContent = `Cantidad: ${cantidad}`
    } else {
      item.remove()
    }

    // Recalcular el total
    const productos = Array.from(document.querySelectorAll('.item-carrito'))
    const total = productos.reduce((acc, item) => {
      const precio = parseFloat(
        item.querySelector('p').textContent.replace('$', '')
      )
      const cantidad = parseInt(
        item.querySelector('p:nth-of-type(2)').textContent.replace(/\D/g, '')
      )
      return acc + precio * cantidad
    }, 0)

    const resumen = document.querySelector('.pagina-carrito > p:last-of-type')
    if (resumen) resumen.textContent = `Total: $${total.toFixed(2)}`

    // Si ya no quedan productos, mostrar mensaje vacío
    if (!productos.length) {
      const section = document.querySelector('.pagina-carrito')
      section.innerHTML = '<h1>Tu carrito</h1><p>Tu carrito está vacío.</p>'
    }
  })
}
