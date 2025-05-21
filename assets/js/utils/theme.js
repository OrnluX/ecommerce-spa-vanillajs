export function initThemeToggle(toggle) {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark')
    toggle.checked = true
  }
  toggle.addEventListener('change', () => {
    const isDark = toggle.checked
    document.body.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  })
}
