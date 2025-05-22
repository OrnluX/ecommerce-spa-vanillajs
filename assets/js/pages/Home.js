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
  let textoBusqueda = ''
  let resultadosAnteriores = []

  const container = document.createElement('section')

  // Encabezado con título y buscador
  const header = document.createElement('div')
  header.className = 'productos-header'

  const title = document.createElement('h1')
  title.textContent = 'Productos'

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

  // Lógica principal de render
  function manejarCambios() {
    const categoria = filtroCategoria.value
    const orden = ordenSelect.value

    let listaFiltrada = aplicarFiltrosYOrden(
      productosOriginales,
      categoria,
      orden
    )

    if (textoBusqueda.trim()) {
      listaFiltrada = listaFiltrada.filter((p) =>
        p.title.toLowerCase().includes(textoBusqueda)
      )
    }

    if (listaFiltrada.length === 0) {
      grid.innerHTML = ''
      const mensaje = document.createElement('p')
      mensaje.className = 'sin-resultados'
      mensaje.textContent = '😔 No se encontraron productos con ese nombre.'
      grid.appendChild(mensaje)
      resultadosAnteriores = []
      return
    }

    const nuevosIds = listaFiltrada.map((p) => p.id).join(',')
    const anterioresIds = resultadosAnteriores.map((p) => p.id).join(',')

    if (nuevosIds === anterioresIds) {
      return // No cambios, evitar render
    }

    resultadosAnteriores = [...listaFiltrada]
    renderizarProductos(listaFiltrada, grid)
  }

  filtroCategoria.addEventListener('change', manejarCambios)
  ordenSelect.addEventListener('change', manejarCambios)

  renderizarProductos(productosOriginales, grid)

  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(container)

  iniciarListenerCantidad(productosOriginales)
}
