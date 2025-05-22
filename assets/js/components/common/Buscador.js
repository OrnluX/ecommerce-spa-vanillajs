/**
 * Crea un input de búsqueda reutilizable.
 * @param {Function} onBuscar - Callback que recibe el texto actual del input.
 * @returns {HTMLElement} - Nodo contenedor con el input.
 */
export function crearBuscador(onBuscar) {
  const input = document.createElement('input')
  input.type = 'search'
  input.placeholder = 'Buscar producto...'
  input.className = 'buscador-productos'

  input.addEventListener('input', () => {
    const valor = input.value.toLowerCase().trim()
    onBuscar(valor)
  })

  return input
}
