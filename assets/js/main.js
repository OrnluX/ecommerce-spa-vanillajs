import { router } from './router.js'
import { actualizarContador } from './state.js'
import { initThemeToggle } from './utils/theme.js'
import { initPanelCarrito } from './state.js'
import { initMobileMenu } from './utils/mobileMenu.js'
import { initCerrarCarritoAlClickAfuera } from './utils/clickFueraDeCarrito.js'
import { initEnlaceVerCarrito } from './utils/enlaceVerCarrito.js'

const path = window.location.pathname

if (path === '/index.html' || path === '/index') {
  history.replaceState(null, '', '/')
}

//Ejecucion del router
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]')
    if (link) {
      e.preventDefault()
      history.pushState(null, '', link.href)
      router()
    }
  })

  window.addEventListener('popstate', router)
  actualizarContador()
  initPanelCarrito()
  router()
  initThemeToggle(document.getElementById('theme-toggle'))
  initMobileMenu()
  initCerrarCarritoAlClickAfuera()
  initEnlaceVerCarrito()
})
