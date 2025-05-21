import { router } from './router.js'

export let carrito = JSON.parse(localStorage.getItem('carrito')) || []

//Agregar producto al carrito
export function agregarAlCarrito(producto) {
  const index = carrito.findIndex((item) => item.id === producto.id)
  if (index !== -1) {
    carrito[index].quantity += 1
  } else {
    carrito.push({ ...producto, quantity: 1 })
  }
  guardarCarrito()
  mostrarToast(`"${producto.title}" añadido al carrito`, 'agregado')
  renderPanel()
}

//Eliminar producto del carrito
export async function eliminarProducto(id) {
  const producto = carrito.find((item) => item.id === id)
  const li = document.querySelector(`li[data-id="${id}"]`)

  const eliminar = () => {
    carrito = carrito.filter((item) => item.id !== id)
    guardarCarrito()
    if (producto) mostrarToast(`"${producto.title}" eliminado`, 'eliminado')
    renderPanel()
    document.dispatchEvent(
      new CustomEvent('cantidad-cambiada', {
        detail: { id, cantidad: 0 },
      })
    )
  }

  if (li) {
    li.classList.add('eliminando')
    return new Promise((resolve) => {
      setTimeout(() => {
        eliminar()
        // resolve()
      }, 300)
    })
  } else {
    eliminar()
    return Promise.resolve()
  }
}

//Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  actualizarContador()
}

//Actualizar contador del carrito
export function actualizarContador() {
  const total = carrito.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById('contador-carrito').textContent = total
}

// Inicializar el panel del carrito
export function initPanelCarrito() {
  const btnAbrir = document.getElementById('carrito-boton')
  const panel = document.getElementById('carrito-panel')
  const btnCerrar = document.getElementById('cerrar-carrito')

  btnAbrir?.addEventListener('click', () => {
    panel.classList.add('visible')
    panel.classList.remove('oculto')
    renderPanel()
  })

  btnCerrar?.addEventListener('click', () => {
    panel.classList.remove('visible')
  })
}

//Sumar cantidad
export function sumarCantidad(id) {
  const item = carrito.find((p) => p.id === id)
  if (item) item.quantity += 1
  guardarCarrito()
  renderPanel()
  document.dispatchEvent(
    new CustomEvent('cantidad-cambiada', {
      detail: { id, cantidad: item.quantity },
    })
  )
}

//Restar cantidad

export async function restarCantidad(id) {
  const item = carrito.find((p) => p.id === id)
  if (!item) return

  item.quantity -= 1

  if (item.quantity <= 0) {
    carrito = carrito.filter((p) => p.id !== id)
  }

  guardarCarrito()
  renderPanel()
  document.dispatchEvent(
    new CustomEvent('cantidad-cambiada', {
      detail: { id, cantidad: item.quantity },
    })
  )
}

//Renderizar el panel del carrito

function renderPanel() {
  const lista = document.getElementById('carrito-lista')
  const total = document.getElementById('total-carrito')
  const vacio = document.getElementById('carrito-vacio')
  const botonesCarrito = document.querySelectorAll('.carrito-btn')

  lista.innerHTML = '' // Limpiar la lista antes de renderizar

  if (carrito.length === 0) {
    vacio.style.display = 'block'
    total.classList.add('oculto')
    botonesCarrito.forEach((btn) => btn.classList.add('oculto'))
    total.textContent = 'Total: $0.00'
  } else {
    vacio.style.display = 'none'
    total.classList.remove('oculto')
    botonesCarrito.forEach((btn) => btn.classList.remove('oculto'))

    let suma = 0

    carrito.forEach((producto) => {
      suma += producto.price * producto.quantity

      const li = document.createElement('li')
      li.className = 'carrito-item'
      li.setAttribute('data-id', producto.id)

      const img = document.createElement('img')
      img.src = producto.image
      img.alt = producto.title
      img.className = 'miniatura'

      const detalles = document.createElement('div')
      detalles.className = 'carrito-detalles'

      const nombre = document.createElement('a')
      nombre.className = 'nombre'
      nombre.href = `/producto/${producto.id}`
      nombre.setAttribute('data-link', '')
      nombre.textContent = producto.title

      const precio = document.createElement('p')
      precio.className = 'precio'
      precio.textContent = `$${producto.price.toFixed(2)}`

      const controles = document.createElement('div')
      controles.className = 'controles-cantidad'

      // Botón restar o eliminar
      const btnRestar = document.createElement('button')
      btnRestar.className = 'btn-cantidad restar'
      btnRestar.setAttribute('aria-label', 'Restar cantidad')
      const iconoRestar = document.createElement('i')
      iconoRestar.className =
        producto.quantity > 1 ? 'fa-solid fa-square-minus' : 'fas fa-trash-alt'
      btnRestar.appendChild(iconoRestar)
      btnRestar.onclick = () => {
        producto.quantity > 1
          ? restarCantidad(producto.id)
          : eliminarProducto(producto.id)
      }

      const cantidad = document.createElement('span')
      cantidad.className = 'cantidad'
      cantidad.textContent = producto.quantity

      const btnSumar = document.createElement('button')
      btnSumar.className = 'btn-cantidad sumar'
      btnSumar.setAttribute('aria-label', 'Sumar cantidad')
      const iconoSumar = document.createElement('i')
      iconoSumar.className = 'fa-solid fa-square-plus'
      btnSumar.appendChild(iconoSumar)
      btnSumar.onclick = () => sumarCantidad(producto.id)

      controles.appendChild(btnRestar)
      controles.appendChild(cantidad)
      controles.appendChild(btnSumar)

      detalles.appendChild(nombre)
      detalles.appendChild(precio)
      detalles.appendChild(controles)

      const btnEliminar = document.createElement('button')
      btnEliminar.className = 'btn-cantidad eliminar'
      btnEliminar.setAttribute('aria-label', 'Eliminar producto')
      const iconoEliminar = document.createElement('i')
      iconoEliminar.className = 'fas fa-trash-alt'
      btnEliminar.appendChild(iconoEliminar)
      btnEliminar.onclick = () => eliminarProducto(producto.id)

      li.appendChild(img)
      li.appendChild(detalles)
      li.appendChild(btnEliminar)

      lista.appendChild(li)
    })

    total.textContent = `Total: $${suma.toFixed(2)}`
  }
}

// Notificación toast
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

// Exponer para los botones dinámicos
window.eliminarDelCarrito = eliminarProducto
