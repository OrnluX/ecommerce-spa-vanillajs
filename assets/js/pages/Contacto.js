// export default function Contacto() {
//   const app = document.getElementById('app')

//   const seccion = document.createElement('section')
//   seccion.className = 'contacto-seccion'

//   const header = document.createElement('div')
//   header.className = 'contacto-header'

//   const titulo = document.createElement('h1')
//   titulo.textContent = 'Contacto'

//   const descripcion = document.createElement('p')
//   descripcion.textContent =
//     '¿Tenés dudas, consultas o sugerencias? ¡Escribinos! Estamos para ayudarte.'

//   header.appendChild(titulo)
//   header.appendChild(descripcion)

//   const formulario = document.createElement('form')
//   formulario.className = 'contacto-formulario'

//   const campos = [
//     { label: 'Nombre completo', type: 'text', name: 'nombre' },
//     { label: 'Correo electrónico', type: 'email', name: 'email' },
//     { label: 'Asunto', type: 'text', name: 'asunto' },
//     { label: 'Mensaje', type: 'textarea', name: 'mensaje' },
//   ]

//   campos.forEach(({ label, type, name }) => {
//     const group = document.createElement('label')

//     const span = document.createElement('span')
//     span.textContent = label

//     let input
//     if (type === 'textarea') {
//       input = document.createElement('textarea')
//       input.rows = 5
//     } else {
//       input = document.createElement('input')
//       input.type = type
//     }

//     input.name = name
//     input.className = 'form-control'

//     group.appendChild(span)
//     group.appendChild(input)
//     formulario.appendChild(group)
//   })

//   const boton = document.createElement('button')
//   boton.type = 'submit'
//   boton.textContent = 'Enviar mensaje'
//   boton.className = 'primary-btn'
//   formulario.appendChild(boton)

//   formulario.addEventListener('submit', (e) => {
//     e.preventDefault()
//     alert('Formulario enviado. (Simulado)')
//     formulario.reset()
//   })

//   seccion.appendChild(header)
//   seccion.appendChild(formulario)
//   app.appendChild(seccion)
// }
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
    input.className = 'form-control'

    // Validación en vivo
    input.addEventListener('input', () => {
      input.classList.remove('input-error')
      input.setCustomValidity('')
      const msg = input.parentElement.querySelector('.mensaje-error')
      if (msg) msg.remove()
    })

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

    const data = {
      nombre: formulario.nombre.value.trim(),
      email: formulario.email.value.trim(),
      asunto: formulario.asunto.value.trim(),
      mensaje: formulario.mensaje.value.trim(),
    }

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

    let esValido = true

    Object.keys(data).forEach((key) => {
      const input = formulario[key]
      const valor = data[key]
      const { valid, msg } = reglas[key]

      input.classList.remove('input-error')
      input.setCustomValidity('')
      const msgAnterior = input.parentElement.querySelector('.mensaje-error')
      if (msgAnterior) msgAnterior.remove()

      if (!valid(valor)) {
        esValido = false
        input.classList.add('input-error')
        input.setCustomValidity(msg)
        input.reportValidity()

        const error = document.createElement('div')
        error.className = 'mensaje-error'
        error.textContent = msg
        input.parentElement.appendChild(error)
      }
    })

    if (!esValido) return

    const exito = document.createElement('div')
    exito.className = 'mensaje-exito'
    exito.textContent = '¡Mensaje enviado con éxito!'
    formulario.after(exito)
    setTimeout(() => exito.remove(), 4000)

    formulario.reset()
  })

  seccion.appendChild(header)
  seccion.appendChild(formulario)
  app.appendChild(seccion)
}
