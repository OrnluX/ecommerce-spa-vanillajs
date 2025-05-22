/**
 * @function mostrarToast
 * @param {string} msg - El mensaje a mostrar
 * @param {string} tipo - El tipo de mensaje (info, agregado, eliminado)
 * @description Muestra un toast con el mensaje y tipo especificado
 */
export function mostrarToast(msg, tipo = 'info') {
  const cont = document.getElementById('toast-container')

  const toast = document.createElement('div')
  toast.className = `toast ${tipo}`

  // Crear ícono
  const icon = document.createElement('i')
  icon.classList.add('toast-icon', 'fa-solid')

  // Estilo según tipo
  switch (tipo) {
    case 'agregado':
      icon.classList.add('fa-check-circle')
      break
    case 'eliminado':
      icon.classList.add('fa-trash')
      break
    default:
      icon.classList.add('fa-info-circle')
  }

  // Texto
  const text = document.createElement('span')
  text.textContent = msg

  // Composición
  toast.appendChild(icon)
  toast.appendChild(text)
  cont.appendChild(toast)

  setTimeout(() => toast.remove(), 3000)
}
