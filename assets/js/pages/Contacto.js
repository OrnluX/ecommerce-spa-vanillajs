export default function Contacto() {
  const app = document.getElementById('app')

  const seccion = document.createElement('section')
  seccion.className = 'contacto-seccion'

  const titulo = document.createElement('h1')
  titulo.textContent = 'Contacto'
  seccion.appendChild(titulo)

  const header = document.createElement('div')
  header.className = 'contacto-header'

  const descripcion = document.createElement('p')
  descripcion.textContent =
    '¿Tenés dudas, consultas o sugerencias? ¡Escribinos! Estamos para ayudarte.'
  header.appendChild(descripcion)

  const formulario = document.createElement('form')
  formulario.className = 'contacto-formulario'

  const campos = [
    { label: 'Nombre completo', type: 'text', name: 'nombre' },
    { label: 'Correo electrónico', type: 'email', name: 'email' },
    { label: 'Asunto', type: 'text', name: 'asunto' },
    { label: 'Mensaje', type: 'textarea', name: 'mensaje' },
  ]

  campos.forEach(({ label, type, name }) => {
    const group = document.createElement('label')
    group.setAttribute('for', name)

    const span = document.createElement('span')
    span.textContent = label

    let input
    if (type === 'textarea') {
      input = document.createElement('textarea')
      input.rows = 5
    } else {
      input = document.createElement('input')
      input.type = type
    }

    input.name = name
    input.id = name
    input.className = 'form-control'

    group.appendChild(span)
    group.appendChild(input)
    formulario.appendChild(group)
  })

  const boton = document.createElement('button')
  boton.type = 'submit'
  boton.textContent = 'Enviar mensaje'
  boton.className = 'primary-btn'
  formulario.appendChild(boton)

  formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = {}
    const reglas = {
      nombre: {
        valid: (v) => v.length >= 2,
        msg: 'El nombre debe tener al menos 2 caracteres.',
      },
      email: {
        valid: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
        msg: 'El correo electrónico no es válido.',
      },
      asunto: {
        valid: (v) => v !== '',
        msg: 'El asunto es obligatorio.',
      },
      mensaje: {
        valid: (v) => v.length >= 10,
        msg: 'El mensaje debe tener al menos 10 caracteres.',
      },
    }

    // Limpieza previa
    formulario.querySelectorAll('.mensaje-error').forEach((el) => el.remove())
    formulario
      .querySelectorAll('.form-control')
      .forEach((input) => input.classList.remove('input-error'))

    let esValido = true

    Object.keys(reglas).forEach((key) => {
      const input = formulario[key]
      const valor = input.value.trim()
      data[key] = valor

      const { valid, msg } = reglas[key]

      if (!valid(valor)) {
        esValido = false
        input.classList.add('input-error')

        const error = document.createElement('div')
        error.className = 'mensaje-error'
        error.setAttribute('aria-live', 'polite')
        error.textContent = msg
        input.parentElement.appendChild(error)
      }
    })

    if (!esValido) return

    const exito = document.createElement('div')
    exito.className = 'mensaje-exito'
    exito.setAttribute('aria-live', 'polite')
    exito.textContent = '¡Mensaje enviado con éxito!'
    formulario.after(exito)
    setTimeout(() => exito.remove(), 4000)

    formulario.reset()
  })

  seccion.appendChild(header)
  seccion.appendChild(formulario)
  app.appendChild(seccion)
}
