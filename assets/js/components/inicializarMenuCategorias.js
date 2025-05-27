import { router } from '../router.js'

/**
 * Inyecta un submenú desplegable de categorías en el contenedor `.menu-categorias`
 * ya presente en el HTML, y emite un evento personalizado para filtrar productos.
 */
export async function inicializarMenuCategorias() {
  const wrapper = document.querySelector('.menu-categorias')
  const botonCategoria = wrapper?.querySelector('#btn-categorias')

  if (!wrapper || !botonCategoria) return

  const submenu = document.createElement('ul')
  submenu.className = 'submenu-categorias'

  // Opción "Todas"
  const todas = document.createElement('li')
  const aTodas = document.createElement('a')
  aTodas.className = 'submenu-categorias__enlace'
  aTodas.href = '#'
  aTodas.textContent = 'Todas'
  aTodas.onclick = async (e) => {
    e.preventDefault()
    wrapper.classList.remove('abierto')

    if (window.location.pathname === '/') {
      document.dispatchEvent(
        new CustomEvent('categoria-seleccionada', {
          detail: { categoria: todas },
        })
      )
    } else {
      history.pushState({}, '', '/')
      await router()
    }
  }
  todas.appendChild(aTodas)
  submenu.appendChild(todas)

  // Cargar categorías desde la API y crear enlaces
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const categorias = await res.json()

    categorias.forEach((cat) => {
      const item = document.createElement('li')
      const a = document.createElement('a')
      a.className = 'submenu-categorias__enlace'
      a.href = '#'
      a.textContent = cat[0].toUpperCase() + cat.slice(1)
      a.onclick = async (e) => {
        e.preventDefault()
        wrapper.classList.remove('abierto')

        if (window.location.pathname !== '/') {
          history.pushState({}, '', '/')
          await router() // Esperar a que se renderice Home
        }

        document.dispatchEvent(
          new CustomEvent('categoria-seleccionada', {
            detail: { categoria: cat },
          })
        )
      }
      item.appendChild(a)
      submenu.appendChild(item)
    })
  } catch (err) {
    console.error('Error al cargar categorías:', err)
  }

  wrapper.appendChild(submenu)

  // Toggle con clic
  botonCategoria.addEventListener('click', (e) => {
    e.preventDefault()
    wrapper.classList.toggle('abierto')
  })

  // Cerrar si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('abierto')
    }
  })
}
