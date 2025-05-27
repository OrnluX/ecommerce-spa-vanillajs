export function initScrollTopButton() {
  const btnTop = document.getElementById('btn-top')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('visible')
    } else {
      btnTop.classList.remove('visible')
    }
  })

  btnTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}
