export function crearSlider(imagenes = []) {
  const slider = document.createElement('div')
  slider.className = 'slider'

  const pista = document.createElement('div')
  pista.className = 'slider-pista'

  imagenes.forEach((src, index) => {
    const slide = document.createElement('div')
    slide.className = 'slider-slide'
    const img = document.createElement('img')
    img.src = src
    img.alt = `Slide ${index + 1}`
    img.loading = 'lazy'
    slide.appendChild(img)
    pista.appendChild(slide)
  })

  slider.appendChild(pista)

  // Controles
  const btnPrev = document.createElement('button')
  btnPrev.className = 'slider-btn prev'
  btnPrev.innerHTML = '&#10094;'

  const btnNext = document.createElement('button')
  btnNext.className = 'slider-btn next'
  btnNext.innerHTML = '&#10095;'

  slider.appendChild(btnPrev)
  slider.appendChild(btnNext)

  // Indicadores
  const indicadores = document.createElement('div')
  indicadores.className = 'slider-indicadores'

  imagenes.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'slider-dot'
    if (i === 0) dot.classList.add('activo')
    indicadores.appendChild(dot)
  })

  slider.appendChild(indicadores)

  let indiceActual = 0
  let timeout

  function mostrarSlide(n) {
    if (n >= imagenes.length) n = 0
    if (n < 0) n = imagenes.length - 1
    pista.style.transform = `translateX(-${n * 100}%)`
    ;[...indicadores.children].forEach((dot, i) => {
      dot.classList.toggle('activo', i === n)
    })
    indiceActual = n
    reiniciarAutoplay()
  }

  function siguiente() {
    mostrarSlide(indiceActual + 1)
  }

  function anterior() {
    mostrarSlide(indiceActual - 1)
  }

  function reiniciarAutoplay() {
    clearTimeout(timeout)
    timeout = setTimeout(siguiente, 3000)
  }

  btnPrev.addEventListener('click', anterior)
  btnNext.addEventListener('click', siguiente)
  ;[...indicadores.children].forEach((dot, i) => {
    dot.addEventListener('click', () => mostrarSlide(i))
  })

  mostrarSlide(0) // inicializar
  return slider
}
