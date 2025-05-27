export function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle')
  const menuIcon = document.getElementById('menu-icon')
  const navLinks = document.getElementById('nav-links')
  const categoriesLink = document.getElementById('btn-categorias')

  if (!menuToggle || !menuIcon || !navLinks) return

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active')

    const isOpen = navLinks.classList.contains('active')
    menuIcon.src = isOpen
      ? 'assets/icons/icons8-close.svg'
      : 'assets/icons/icons8-menu.svg'
    menuIcon.alt = isOpen ? 'Cerrar menú' : 'Abrir menú'
  })

  // Cerrar menú móvil al hacer clic en un link
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target !== categoriesLink) {
      navLinks.classList.remove('active')
      menuIcon.src = 'assets/icons/icons8-menu.svg'
      menuIcon.alt = 'Abrir menú'
    }
  })
}
