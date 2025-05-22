import { iniciarListenerCantidad } from '../utils/listenerCantidad.js'
import {
  aplicarFiltrosYOrden,
  renderizarProductos,
} from '../utils/filtrosYOrden.js'
import { crearFiltrosOrden } from '../components/common/FiltrosOrden.js'
import { crearBuscador } from '../components/common/Buscador.js'

export default async function Home() {
  const [productos, categorias] = await Promise.all([
    fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    fetch('https://fakestoreapi.com/products/categories').then((res) =>
      res.json()
    ),
  ])

  const productosOriginales = [...productos]

  const container = document.createElement('section')

  // Encabezado con título y buscador
  const header = document.createElement('div')
  header.className = 'productos-header'

  const title = document.createElement('h1')
  title.textContent = 'Productos'

  let textoBusqueda = ''
  const buscador = crearBuscador((valor) => {
    textoBusqueda = valor
    manejarCambios()
  })

  header.appendChild(title)
  header.appendChild(buscador)
  container.appendChild(header)

  // Filtros
  const {
    contenedor: filtrosContainer,
    filtroCategoria,
    ordenSelect,
  } = crearFiltrosOrden(categorias)

  container.appendChild(filtrosContainer)

  // Grid de productos
  const grid = document.createElement('div')
  grid.className = 'productos-grid'
  container.appendChild(grid)

  // Lógica de renderizado con filtros + búsqueda
  function manejarCambios() {
    const categoria = filtroCategoria.value
    const orden = ordenSelect.value

    let listaFiltrada = aplicarFiltrosYOrden(
      productosOriginales,
      categoria,
      orden
    )

    if (textoBusqueda.trim() !== '') {
      listaFiltrada = listaFiltrada.filter((p) =>
        p.title.toLowerCase().includes(textoBusqueda)
      )
    }

    renderizarProductos(listaFiltrada, grid)
  }

  filtroCategoria.addEventListener('change', manejarCambios)
  ordenSelect.addEventListener('change', manejarCambios)

  renderizarProductos(productosOriginales, grid)

  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(container)

  iniciarListenerCantidad(productosOriginales)
}
