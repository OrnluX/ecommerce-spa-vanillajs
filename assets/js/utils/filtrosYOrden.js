import { crearTarjetaProducto } from '../components/common/TarjetaProducto.js'

export function aplicarFiltrosYOrden(productos, categoria, orden) {
  let lista = [...productos]

  if (categoria && categoria !== 'todos') {
    lista = lista.filter((p) => p.category === categoria)
  }

  if (orden === 'menor') {
    lista.sort((a, b) => a.price - b.price)
  } else if (orden === 'mayor') {
    lista.sort((a, b) => b.price - a.price)
  }

  return lista
}

export function renderizarProductos(productos, grid) {
  grid.innerHTML = ''
  productos.forEach((p, index) => {
    const card = crearTarjetaProducto(p, index)
    grid.appendChild(card)
  })
}
