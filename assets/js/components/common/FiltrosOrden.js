export function crearFiltrosOrden(categorias = []) {
  const contenedor = document.createElement('div')
  contenedor.className = 'filtros-container'

  // Select de categoría
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

  // Select de orden
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

  contenedor.appendChild(filtroCategoria)
  contenedor.appendChild(ordenSelect)

  return {
    contenedor,
    filtroCategoria,
    ordenSelect,
  }
}
