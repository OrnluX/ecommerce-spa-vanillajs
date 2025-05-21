const routes = [
  { path: '/', module: './pages/Home.js' },
  { path: '/carrito', module: './pages/Carrito.js' },
  {
    path: /^\/producto\/(\d+)$/, //Captura la ruta de producto con el id
    module: './pages/ProductDetail.js',
    isDynamic: true,
  },
]

function matchRoute(pathname) {
  const matchedRoute = routes.find((route) => {
    if (typeof route.path === 'string') {
      return route.path === pathname
    } else if (route.path instanceof RegExp) {
      return route.path.test(pathname)
    }
    return false
  })

  if (!matchedRoute) {
    return { modulePath: './pages/NotFound.js', params: {} }
  }

  if (typeof matchedRoute.path === 'string') {
    return { modulePath: matchedRoute.module, params: {} }
  }

  const match = pathname.match(matchedRoute.path)
  return {
    modulePath: matchedRoute.module,
    params: { id: match?.[1] },
  }
}

export async function router() {
  const { modulePath, params } = matchRoute(window.location.pathname)
  const module = await import(modulePath)
  if (typeof module.default === 'function') {
    await module.default(params)
  }
}
