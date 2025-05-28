export function crearFiltrosOrden(categorias) {
  const contenedor = document.createElement('div')
  contenedor.className = 'filtros-container'

  const filtroCategoria = document.createElement('select')
  filtroCategoria.className = 'filtro-categoria'

  const opcionTodas = document.createElement('option')
  opcionTodas.value = ''
  opcionTodas.textContent = 'Todas'
  filtroCategoria.appendChild(opcionTodas)

  categorias.forEach((cat) => {
    const opcion = document.createElement('option')
    opcion.value = cat
    opcion.textContent = cat
    filtroCategoria.appendChild(opcion)
  })

  const ordenSelect = document.createElement('select')
  ordenSelect.className = 'orden-select'

  const opcionRelevancia = document.createElement('option')
  opcionRelevancia.value = ''
  opcionRelevancia.textContent = 'Relevancia'
  ordenSelect.appendChild(opcionRelevancia)

  const opcionesOrden = [
    { value: 'precio-asc', text: 'Precio: menor a mayor' },
    { value: 'precio-desc', text: 'Precio: mayor a menor' },
  ]

  opcionesOrden.forEach(({ value, text }) => {
    const opt = document.createElement('option')
    opt.value = value
    opt.textContent = text
    ordenSelect.appendChild(opt)
  })

  contenedor.appendChild(filtroCategoria)
  contenedor.appendChild(ordenSelect)

  return {
    contenedor,
    filtroCategoria,
    ordenSelect,
  }
}
