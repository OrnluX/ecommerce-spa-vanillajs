export default function Nosotros() {
  const app = document.getElementById('app')

  const seccion = document.createElement('section')
  seccion.className = 'nosotros-seccion'

  const titulo = document.createElement('h1')
  titulo.textContent = 'Quiénes somos'
  seccion.appendChild(titulo)

  const parrafo = document.createElement('p')
  parrafo.className = 'nosotros-descripcion'
  parrafo.textContent =
    'Somos una tienda comprometida con ofrecerte los mejores productos al mejor precio. Creemos en el diseño simple, la funcionalidad y una atención cercana.'

  seccion.appendChild(parrafo)

  const grid = document.createElement('div')
  grid.className = 'nosotros-grid'

  const bloques = [
    {
      titulo: 'Nuestra misión',
      texto:
        'Brindar productos de calidad con una experiencia de compra ágil, moderna y centrada en el cliente.',
    },
    {
      titulo: 'Nuestra visión',
      texto:
        'Ser líderes en comercio electrónico local, destacando por diseño, servicio y confianza.',
    },
    {
      titulo: 'Nuestro compromiso',
      texto:
        'Atender cada consulta con empatía, claridad y compromiso real con tu satisfacción.',
    },
  ]

  bloques.forEach(({ titulo, texto }) => {
    const card = document.createElement('div')
    card.className = 'nosotros-card'

    const h3 = document.createElement('h3')
    h3.textContent = titulo

    const p = document.createElement('p')
    p.textContent = texto

    card.appendChild(h3)
    card.appendChild(p)
    grid.appendChild(card)
  })

  seccion.appendChild(grid)
  app.appendChild(seccion)
}
