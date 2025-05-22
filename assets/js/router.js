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
  const { modulePath, params } = matchRoute(window.location.pathname)
  const module = await import(modulePath)
  if (typeof module.default === 'function') {
    await module.default(params)
  }
}
