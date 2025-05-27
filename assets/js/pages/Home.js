import { iniciarListenerCantidad } from '../utils/listenerCantidad.js'
import {
  aplicarFiltrosYOrden,
  renderizarProductos,
} from '../utils/filtrosYOrden.js'
import { crearFiltrosOrden } from '../components/common/FiltrosOrden.js'
import { crearBuscador } from '../components/common/Buscador.js'

export default function Home() {
  const app = document.getElementById('app')

  const loader = document.createElement('div')
  loader.className = 'loader'

  const icon = document.createElement('i')
  icon.className = 'fas fa-spinner fa-spin'

  const texto = document.createElement('span')
  texto.textContent = 'Cargando productos...'

  loader.appendChild(icon)
  loader.appendChild(texto)

  app.replaceChildren(loader)

  // Ejecutar la carga real después de que el loader se pinte
  setTimeout(() => cargarProductos(app), 0)
}

async function cargarProductos(app) {
  const [productos, categorias] = await Promise.all([
    fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    fetch('https://fakestoreapi.com/products/categories').then((res) =>
      res.json()
    ),
  ])

  const productosOriginales = [...productos]
  let textoBusqueda = ''
  let productosMostrados = []

  const container = document.createElement('section')

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

  const {
    contenedor: filtrosContainer,
    filtroCategoria,
    ordenSelect,
  } = crearFiltrosOrden(categorias)

  container.appendChild(filtrosContainer)

  const grid = document.createElement('div')
  grid.className = 'productos-grid'
  container.appendChild(grid)

  function mostrarMensajeSinResultados() {
    grid.replaceChildren()
    const mensaje = document.createElement('p')
    mensaje.className = 'sin-resultados'
    mensaje.textContent = '😔 No se encontraron productos con ese nombre.'
    grid.appendChild(mensaje)
    productosMostrados = []
  }

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
      mostrarMensajeSinResultados()
      return
    }

    const nuevosIds = listaFiltrada.map((p) => p.id).join(',')
    const anterioresIds = productosMostrados.map((p) => p.id).join(',')

    if (nuevosIds === anterioresIds) return

    productosMostrados = [...listaFiltrada]
    renderizarProductos(listaFiltrada, grid)
  }

  filtroCategoria.addEventListener('change', manejarCambios)
  ordenSelect.addEventListener('change', manejarCambios)

  function manejarSeleccionCategoria(e) {
    const { categoria } = e.detail
    filtroCategoria.value = categoria
    manejarCambios()
  }

  document.removeEventListener(
    'categoria-seleccionada',
    manejarSeleccionCategoria
  )
  document.addEventListener('categoria-seleccionada', manejarSeleccionCategoria)

  renderizarProductos(productosOriginales, grid)
  app.replaceChildren(container)
  iniciarListenerCantidad(productosOriginales)
}
