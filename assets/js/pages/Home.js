import { iniciarListenerCantidad } from '../utils/listenerCantidad.js'
import {
  aplicarFiltrosYOrden,
  renderizarProductos,
} from '../utils/filtrosYOrden.js'

export default async function Home() {
  const [productos, categorias] = await Promise.all([
    fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    fetch('https://fakestoreapi.com/products/categories').then((res) =>
      res.json()
    ),
  ])

  const productosOriginales = [...productos]

  const container = document.createElement('section')
  const title = document.createElement('h1')
  title.textContent = 'Productos'
  container.appendChild(title)

  // Contenedor de filtros
  const filtrosContainer = document.createElement('div')
  filtrosContainer.className = 'filtros-container'

  // Filtro por categoría
  const filtroCategoria = document.createElement('select')
  filtroCategoria.className = 'filtro-categoria'

  const todasOption = document.createElement('option')
  todasOption.value = 'todos'
  todasOption.textContent = 'Todas las categorías'
  filtroCategoria.appendChild(todasOption)

  categorias.forEach((cat) => {
    const opt = document.createElement('option')
    opt.value = cat
    opt.textContent = cat[0].toUpperCase() + cat.slice(1)
    filtroCategoria.appendChild(opt)
  })

  // Selector de orden
  const ordenSelect = document.createElement('select')
  ordenSelect.className = 'orden-select'

  const opcionesOrden = [
    { value: 'relevancia', label: 'Relevancia' },
    { value: 'menor', label: 'Precio: menor a mayor' },
    { value: 'mayor', label: 'Precio: mayor a menor' },
  ]

  opcionesOrden.forEach((opt) => {
    const option = document.createElement('option')
    option.value = opt.value
    option.textContent = opt.label
    ordenSelect.appendChild(option)
  })

  filtrosContainer.appendChild(filtroCategoria)
  filtrosContainer.appendChild(ordenSelect)
  container.appendChild(filtrosContainer)

  // Grid de productos
  const grid = document.createElement('div')
  grid.className = 'productos-grid'
  container.appendChild(grid)

  // Aplicar filtros y orden
  function manejarCambios() {
    const categoria = filtroCategoria.value
    const orden = ordenSelect.value
    const listaFiltrada = aplicarFiltrosYOrden(
      productosOriginales,
      categoria,
      orden
    )
    renderizarProductos(listaFiltrada, grid)
  }

  filtroCategoria.addEventListener('change', manejarCambios)
  ordenSelect.addEventListener('change', manejarCambios)

  // Primer render
  renderizarProductos(productosOriginales, grid)

  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(container)

  iniciarListenerCantidad()
}
