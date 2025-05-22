import { carrito, agregarAlCarrito } from '../state.js'

export default async function ProductDetail({ id }, contenedorExterno = null) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)

  const destino = contenedorExterno || document.getElementById('app')
  destino.innerHTML = ''

  if (!res.ok) {
    const error = document.createElement('p')
    error.textContent = 'Producto no encontrado.'
    destino.appendChild(error)
    return
  }

  const producto = await res.json()

  const container = document.createElement('section')
  container.className = 'producto-detalle'

  const contenido = document.createElement('div')
  contenido.className = 'detalle-contenido'

  const img = document.createElement('img')
  img.src = producto.image
  img.alt = producto.title
  img.className = 'detalle-imagen'

  const info = document.createElement('div')
  info.className = 'detalle-info'

  const h1 = document.createElement('h1')
  h1.textContent = producto.title

  const descripcion = document.createElement('p')
  descripcion.className = 'detalle-descripcion'
  descripcion.textContent = producto.description

  const precio = document.createElement('p')
  precio.className = 'detalle-precio'
  precio.innerHTML = `<strong>$${producto.price}</strong>`

  const btnAgregar = document.createElement('button')
  btnAgregar.className = 'primary-btn'
  btnAgregar.id = 'btn-agregar'
  btnAgregar.textContent = 'Agregar al carrito'

  btnAgregar.addEventListener('click', () => {
    agregarAlCarrito(producto)

    const productoEnCarrito = carrito.find((p) => p.id === producto.id)
    const cantidad = productoEnCarrito?.quantity || 1

    const evento = new CustomEvent('cantidad-cambiada', {
      detail: { id: producto.id, cantidad },
    })
    document.dispatchEvent(evento)
  })

  info.appendChild(h1)
  info.appendChild(descripcion)
  info.appendChild(precio)
  info.appendChild(btnAgregar)

  // Si es modal, agregamos botón cerrar
  if (contenedorExterno) {
    const btnCerrar = document.createElement('button')
    btnCerrar.className = 'primary-btn cerrar-modal'
    btnCerrar.textContent = 'Cerrar'
    btnCerrar.addEventListener('click', () => {
      const modal = document.getElementById('modal-producto')
      if (modal) {
        modal.classList.add('oculto')
        modal.querySelector('.modal-contenido').innerHTML = ''
      }
    })
    info.appendChild(btnCerrar)
  }

  contenido.appendChild(img)
  contenido.appendChild(info)
  container.appendChild(contenido)
  destino.appendChild(container)
}
