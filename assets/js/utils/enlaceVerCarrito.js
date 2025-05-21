import { router } from '../router.js'

export function initEnlaceVerCarrito() {
  const btn = document.getElementById('ver-carrito')
  if (!btn) return

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState(null, '', '/carrito')
    router()

    document.getElementById('carrito-panel')?.classList.remove('visible')
    document.getElementById('carrito-panel')?.classList.add('oculto')
  })
}
