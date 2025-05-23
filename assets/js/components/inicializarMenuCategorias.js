/**
 * Inyecta un submenú desplegable de categorías en el contenedor `.menu-categorias`
 * ya presente en el HTML, y emite un evento personalizado para filtrar productos.
 */
export async function inicializarMenuCategorias() {
  const wrapper = document.querySelector('.menu-categorias')
  const enlace = wrapper?.querySelector('#btn-categorias')
  if (!wrapper || !enlace) return

  const submenu = document.createElement('ul')
  submenu.className = 'submenu-categorias'

  // Opción "Todas"
  const todas = document.createElement('li')
  const aTodas = document.createElement('a')
  aTodas.href = '#'
  aTodas.textContent = 'Todas'
  aTodas.onclick = (e) => {
    e.preventDefault()
    document.dispatchEvent(
      new CustomEvent('categoria-seleccionada', {
        detail: { categoria: 'todos' },
      })
    )
  }
  todas.appendChild(aTodas)
  submenu.appendChild(todas)

  try {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const categorias = await res.json()

    categorias.forEach((cat) => {
      const item = document.createElement('li')
      const a = document.createElement('a')
      a.href = '#'
      a.textContent = cat[0].toUpperCase() + cat.slice(1)
      a.onclick = (e) => {
        e.preventDefault()
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
  enlace.addEventListener('click', (e) => {
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
