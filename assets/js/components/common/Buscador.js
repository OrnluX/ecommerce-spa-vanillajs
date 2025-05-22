import { debounce } from '../../utils/debounce.js'

/**
 * Crea un input de búsqueda con debounce incluido.
 * @param {Function} onBuscar - Callback que recibe el texto buscado.
 * @param {number} delay - Tiempo de espera tras última tecla (por defecto 300ms).
 * @returns {HTMLInputElement} - Elemento input de tipo search.
 */
export function crearBuscador(onBuscar, delay = 300) {
  const input = document.createElement('input')
  input.type = 'search'
  input.placeholder = 'Buscar producto...'
  input.className = 'buscador-productos'

  const manejadorDebounced = debounce(onBuscar, delay)

  input.addEventListener('input', () => {
    manejadorDebounced(input.value.toLowerCase().trim())
  })

  return input
}
