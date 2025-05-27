const routes = [
  { path: '/', module: './pages/Home.js' },
  { path: '/carrito', module: './pages/Carrito.js' },
]

function matchRoute(pathname) {
  const matchedRoute = routes.find((route) => route.path === pathname)

  if (!matchedRoute) {
    return { modulePath: './pages/NotFound.js', params: {} }
  }

  return { modulePath: matchedRoute.module, params: {} }
}

export async function router() {
  const app = document.getElementById('app')

  // Animación de salida
  app.classList.add('saliendo')

  // Esperar la transición
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Limpiar contenido y renderizar
  app.innerHTML = ''
  const { modulePath, params } = matchRoute(window.location.pathname)
  const module = await import(modulePath)

  if (typeof module.default === 'function') {
    await module.default(params)
  }

  // Quitar animación para hacer fade-in
  requestAnimationFrame(() => {
    app.classList.remove('saliendo')
  })
}
