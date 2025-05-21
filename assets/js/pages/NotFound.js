export default function NotFound() {
  const section = document.createElement('section')
  section.className = 'not-found'

  const emoji = document.createElement('div')
  emoji.textContent = '🧐'
  emoji.style.fontSize = '4rem'
  emoji.style.marginBottom = '1rem'

  const title = document.createElement('h1')
  title.textContent = '404 - Página no encontrada'

  const message = document.createElement('p')
  message.textContent = 'La ruta que estás buscando no existe.'

  const link = document.createElement('a')
  link.href = '/'
  link.setAttribute('data-link', '')
  link.className = 'primary-btn'
  link.textContent = 'Volver al inicio'

  section.appendChild(emoji)
  section.appendChild(title)
  section.appendChild(message)
  section.appendChild(link)

  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(section)
}
