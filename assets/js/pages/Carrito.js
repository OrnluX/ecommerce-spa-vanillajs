import {
  carrito,
  eliminarProducto,
  sumarCantidad,
  restarCantidad,
} from '../state.js'

export default function CarritoPage() {
  const section = document.createElement('section')
  section.className = 'pagina-carrito'

  const title = document.createElement('h1')
  title.textContent = 'Tu carrito'
  section.appendChild(title)

  if (carrito.length === 0) {
    const vacio = document.createElement('p')
    vacio.textContent = 'Tu carrito está vacío.'
    section.appendChild(vacio)
  } else {
    const lista = document.createElement('ul')
    lista.className = 'lista-carrito'

    let total = 0

    carrito.forEach((producto) => {
      const li = document.createElement('li')
      li.className = 'item-carrito'
      li.setAttribute('data-id', producto.id)

      const img = document.createElement('img')
      img.src = producto.image
      img.alt = producto.title
      img.className = 'miniatura'

      const info = document.createElement('div')

      const nombre = document.createElement('a')
      nombre.href = `/producto/${producto.id}`
      nombre.setAttribute('data-link', '')
      nombre.textContent = producto.title

      const precio = document.createElement('p')
      precio.textContent = `$${producto.price.toFixed(2)}`

      const cantidad = document.createElement('p')
      cantidad.textContent = `Cantidad: ${producto.quantity}`

      const controles = document.createElement('div')

      const btnMenos = document.createElement('button')
      btnMenos.textContent = '-'
      btnMenos.onclick = async () => {
        producto.quantity > 1
        if (producto.quantity > 1) {
          restarCantidad(producto.id)
        } else {
          await eliminarProducto(producto.id)
        }
      }

      const btnMas = document.createElement('button')
      btnMas.textContent = '+'
      btnMas.onclick = () => {
        sumarCantidad(producto.id)
      }

      const btnEliminar = document.createElement('button')
      btnEliminar.textContent = 'Eliminar'
      btnEliminar.onclick = async () => {
        await eliminarProducto(producto.id)
      }

      controles.appendChild(btnMenos)
      controles.appendChild(btnMas)
      controles.appendChild(btnEliminar)

      info.appendChild(nombre)
      info.appendChild(precio)
      info.appendChild(cantidad)
      info.appendChild(controles)

      li.appendChild(img)
      li.appendChild(info)
      lista.appendChild(li)

      total += producto.price * producto.quantity
    })

    const resumen = document.createElement('p')
    resumen.textContent = `Total: $${total.toFixed(2)}`

    section.appendChild(lista)
    section.appendChild(resumen)
  }

  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(section)
}
