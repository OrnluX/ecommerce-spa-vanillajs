// const routes = [
//   { path: '/', module: './pages/Home.js' },
//   { path: '/carrito', module: './pages/Carrito.js' },
//   { path: '/contacto', module: './pages/Contacto.js' },
//   { path: '/nosotros', module: './pages/Nosotros.js' },
//   {
//     path: /^\/producto\/(\d+)$/, // Ruta dinámica
//     module: './pages/ProductDetail.js',
//     isDynamic: true,
//   },
// ]

// function matchRoute(pathname) {
//   const matchedRoute = routes.find((route) => {
//     if (typeof route.path === 'string') return route.path === pathname
//     if (route.path instanceof RegExp) return route.path.test(pathname)
//     return false
//   })

//   if (!matchedRoute) {
//     return { modulePath: './pages/NotFound.js', params: {} }
//   }

//   if (typeof matchedRoute.path === 'string') {
//     return { modulePath: matchedRoute.module, params: {} }
//   }

//   const match = pathname.match(matchedRoute.path)
//   return {
//     modulePath: matchedRoute.module,
//     params: { id: match?.[1] }, // Captura dinámica del ID
//   }
// }

// export async function router() {
//   const app = document.getElementById('app')

//   // Animación de salida
//   app.classList.add('saliendo')

//   // Esperar la transición
//   await new Promise((resolve) => setTimeout(resolve, 300))

//   // Limpiar contenido y renderizar
//   app.innerHTML = ''
//   const { modulePath, params } = matchRoute(window.location.pathname)
//   const module = await import(modulePath)

//   if (typeof module.default === 'function') {
//     await module.default(params)
//   }

//   // Quitar animación para hacer fade-in
//   requestAnimationFrame(() => {
//     app.classList.remove('saliendo')
//   })
// }
const routes = [
  { path: '/', module: './pages/Home.js' },
  { path: '/carrito', module: './pages/Carrito.js' },
  { path: '/contacto', module: './pages/Contacto.js' },
  { path: '/nosotros', module: './pages/Nosotros.js' },
  {
    path: /^\/producto\/(\d+)$/, // Ruta dinámica
    module: './pages/ProductDetail.js',
    isDynamic: true,
  },
]

function matchRoute(pathname) {
  const matchedRoute = routes.find((route) => {
    if (typeof route.path === 'string') return route.path === pathname
    if (route.path instanceof RegExp) return route.path.test(pathname)
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
    params: { id: match?.[1] }, // Captura dinámica del ID
  }
}

function marcarLinkActivo() {
  const links = document.querySelectorAll('nav a[data-link]')
  const actual = window.location.pathname

  links.forEach((link) => {
    const href = new URL(link.href).pathname
    link.classList.toggle('activo', href === actual)
  })
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

  marcarLinkActivo()

  // Quitar animación para hacer fade-in
  requestAnimationFrame(() => {
    app.classList.remove('saliendo')
  })
}
