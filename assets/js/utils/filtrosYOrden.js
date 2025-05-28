import { crearTarjetaProducto } from '../components/common/TarjetaProducto.js'

export function renderizarProductos(productos, grid) {
  grid.innerHTML = ''
  productos.forEach((p, index) => {
    const card = crearTarjetaProducto(p, index)
    grid.appendChild(card)
  })
}
export function aplicarFiltrosYOrden(productos, categoria, orden) {
  let filtrados = categoria
    ? productos.filter((p) => p.category === categoria)
    : [...productos]

  switch (orden) {
    case 'precio-asc':
      filtrados.sort((a, b) => a.price - b.price)
      break
    case 'precio-desc':
      filtrados.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }

  return filtrados
}
