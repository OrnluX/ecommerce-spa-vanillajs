import ProductDetail from '../pages/ProductDetail.js'

export async function abrirModalProducto(id) {
  let modal = document.getElementById('modal-producto')
  let contenido = modal?.querySelector('.modal-contenido')

  // Crear modal si no existe
  if (!modal) {
    modal = document.createElement('div')
    modal.id = 'modal-producto'
    modal.className = 'modal'

    contenido = document.createElement('div')
    contenido.className = 'modal-contenido'

    modal.appendChild(contenido)
    document.body.appendChild(modal)
  }

  modal.classList.remove('oculto')
  contenido.innerHTML = '<p class="cargando">Cargando...</p>'

  // Renderizar detalle del producto en el modal
  await ProductDetail({ id }, contenido)

  // Cerrar modal al hacer clic fuera
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('oculto')
      contenido.innerHTML = ''
    }
  }
}
