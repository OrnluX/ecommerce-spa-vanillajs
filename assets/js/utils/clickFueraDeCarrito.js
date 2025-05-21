export function initCerrarCarritoAlClickAfuera() {
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('carrito-panel')
    const boton = document.getElementById('carrito-boton')

    if (!panel || !boton) return

    const path = e.composedPath() // Captura todo el camino del evento

    const clickedInsidePanel = path.includes(panel)
    const clickedOnToggleButton = path.includes(boton)
    const clickedEnAgregar = e.target.closest('.add-to-cart-btn')

    const isPanelVisible = panel.classList.contains('visible')

    if (
      !clickedInsidePanel &&
      !clickedOnToggleButton &&
      !clickedEnAgregar &&
      isPanelVisible
    ) {
      panel.classList.remove('visible')
      panel.classList.add('oculto')
    }
  })
}
