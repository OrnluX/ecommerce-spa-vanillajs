import { iniciarListenerCantidad } from '../utils/listenerCantidad.js'
import {
  aplicarFiltrosYOrden,
  renderizarProductos,
} from '../utils/filtrosYOrden.js'
import { crearFiltrosOrden } from '../components/common/FiltrosOrden.js'
import { crearBuscador } from '../components/common/Buscador.js'
import { crearSlider } from '../components/common/Slider.js'
import { crearFooter } from '../components/common/Footer.js'

export default function Home() {
  const app = document.getElementById('app')

  const imagenesSlider = [
    'https://placehold.co/800x300/9c6ade/fff?text=Promo+1',
    'https://placehold.co/800x300/8d5cbe/fff?text=Promo+2',
    'https://placehold.co/800x300/6c4aad/fff?text=Promo+3',
  ]

  const slider = crearSlider(imagenesSlider)

  // Cargamos solo el slider por ahora
  app.replaceChildren(slider)

  // Iniciamos la carga real del contenido debajo del slider
  setTimeout(() => cargarProductos(app), 0)
}

async function cargarProductos(app) {
  const container = document.createElement('section')
  container.className = 'productos-container'

  // Loader dentro del contenedor
  const loader = document.createElement('div')
  loader.className = 'loader'

  const icon = document.createElement('i')
  icon.className = 'fas fa-spinner fa-spin'

  const texto = document.createElement('span')
  texto.textContent = 'Cargando productos...'

  loader.appendChild(icon)
  loader.appendChild(texto)
  container.appendChild(loader)

  app.appendChild(container)

  const [productos, categorias] = await Promise.all([
    fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    fetch('https://fakestoreapi.com/products/categories').then((res) =>
      res.json()
    ),
  ])

  const productosOriginales = [...productos]
  const params = new URLSearchParams(window.location.search)
  let textoBusqueda = params.get('busqueda') || ''
  let resultadosAnteriores = []

  // Limpiar loader y empezar a armar contenido real
  container.innerHTML = ''

  const header = document.createElement('div')
  header.className = 'productos-header'

  const title = document.createElement('h1')
  title.textContent = 'Nuestros Productos'

  const input = crearBuscador((valor) => {
    textoBusqueda = valor
    actualizarURL()
    manejarCambios()
  })
  input.value = textoBusqueda

  header.appendChild(title)
  header.appendChild(input)
  container.appendChild(header)

  const {
    contenedor: filtrosContainer,
    filtroCategoria,
    ordenSelect,
  } = crearFiltrosOrden(categorias)

  container.appendChild(filtrosContainer)

  // Aplicar valores de la URL después de renderizar opciones
  setTimeout(() => {
    filtroCategoria.value = params.get('categoria') || ''
    ordenSelect.value = params.get('orden') || ''
    manejarCambios()
  }, 0)

  const grid = document.createElement('div')
  grid.className = 'productos-grid'
  container.appendChild(grid)

  function actualizarURL() {
    const query = new URLSearchParams()
    if (textoBusqueda) query.set('busqueda', textoBusqueda)
    if (filtroCategoria.value) query.set('categoria', filtroCategoria.value)
    if (ordenSelect.value) query.set('orden', ordenSelect.value)

    const nuevaURL = `${window.location.pathname}?${query.toString()}`
    history.replaceState(null, '', nuevaURL)
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
      grid.replaceChildren()
      const mensaje = document.createElement('p')
      mensaje.className = 'sin-resultados'
      mensaje.textContent = '😔 No se encontraron productos con ese nombre.'
      grid.appendChild(mensaje)
      resultadosAnteriores = []
      return
    }

    const nuevosIds = listaFiltrada.map((p) => p.id).join(',')
    const anterioresIds = resultadosAnteriores.map((p) => p.id).join(',')

    if (nuevosIds === anterioresIds) return

    resultadosAnteriores = [...listaFiltrada]
    renderizarProductos(listaFiltrada, grid)
  }

  filtroCategoria.addEventListener('change', () => {
    actualizarURL()
    manejarCambios()
  })

  ordenSelect.addEventListener('change', () => {
    actualizarURL()
    manejarCambios()
  })

  document.addEventListener('categoria-seleccionada', (e) => {
    const { categoria } = e.detail
    filtroCategoria.value = categoria
    if (filtroCategoria.selectedIndex === -1) {
      filtroCategoria.selectedIndex = 0
    }
    actualizarURL()
    manejarCambios()
  })

  renderizarProductos(productosOriginales, grid)
  iniciarListenerCantidad(productosOriginales)
  document.getElementById('footer').replaceChildren(crearFooter())
}
