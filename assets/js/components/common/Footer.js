export function crearFooter() {
  const footer = document.createElement('footer')
  footer.className = 'footer'

  // NAV
  const nav = document.createElement('nav')
  nav.className = 'footer-nav'

  const enlaces = [
    { href: '/', texto: 'Inicio' },
    { href: '/carrito', texto: 'Carrito' },
    { href: '/contacto', texto: 'Contacto' },
    { href: '/nosotros', texto: 'Nosotros' },
  ]

  enlaces.forEach(({ href, texto }) => {
    const link = document.createElement('a')
    link.href = href
    link.textContent = texto
    link.setAttribute('data-link', '')
    nav.appendChild(link)
  })

  // INFO CONTACTO
  const info = document.createElement('p')
  info.className = 'footer-info'
  info.textContent = '📧 contacto@ejemplo.com — 📞 +54 11 1234 5678'

  // REDES
  const redes = document.createElement('div')
  redes.className = 'footer-social'

  const iconos = [
    { href: '#', clase: 'fab fa-instagram' },
    { href: '#', clase: 'fab fa-facebook' },
    { href: '#', clase: 'fab fa-x-twitter' },
  ]

  iconos.forEach(({ href, clase }) => {
    const a = document.createElement('a')
    a.href = href
    const i = document.createElement('i')
    i.className = clase
    a.appendChild(i)
    redes.appendChild(a)
  })

  footer.appendChild(nav)
  footer.appendChild(info)
  footer.appendChild(redes)

  return footer
}
