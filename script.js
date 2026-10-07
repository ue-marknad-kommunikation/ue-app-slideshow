const slides = [
  {
    title: 'Få snabb överblick',
    text: 'Se användning, fakturor och viktiga genvägar direkt på startsidan.',
    light: 'assets/light-home.jpg',
    dark: 'assets/dark-home.jpg',
  },
  {
    title: 'Följ din användning',
    text: 'Håll koll på el och fjärrvärme för aktuell månad.',
    light: 'assets/light-current-month.jpg',
    dark: 'assets/dark-current-month.jpg',
  },
  {
    title: 'Se hur anläggningen arbetar',
    text: 'Följ fjärrvärmen över tid och jämför utvecklingen månad för månad.',
    light: 'assets/light-heating.jpg',
    dark: 'assets/dark-heating.jpg',
  },
  {
    title: 'Jämför över tid',
    text: 'Se hur din användning står sig mot tidigare perioder och liknande hushåll.',
    light: 'assets/light-comparison.jpg',
    dark: 'assets/dark-comparison.jpg',
  },
  {
    title: 'Samla fakturorna',
    text: 'Få överblick över betalda och obetalda fakturor på ett ställe.',
    light: 'assets/light-invoices.jpg',
    dark: 'assets/dark-invoices.jpg',
  },
  {
    title: 'Hantera konto och avtal',
    text: 'Byt konto, justera inställningar och hitta hjälp när du behöver det.',
    light: 'assets/light-more.jpg',
    dark: 'assets/dark-more.jpg',
  },
]

const root = document.documentElement
const track = document.querySelector('#screen-track')
const phoneShell = document.querySelector('#phone-shell')
const count = document.querySelector('#slide-count')
const title = document.querySelector('#slide-title')
const text = document.querySelector('#slide-text')
const themeInputs = [...document.querySelectorAll('input[name="theme"]')]
const themeOptions = [...document.querySelectorAll('.theme-option')]

let index = 0
let theme = getInitialTheme()
let pointerStartX = 0
let pointerStartY = 0
let isPointerDown = false

function getInitialTheme() {
  try {
    const saved = window.sessionStorage.getItem('ue-app-slideshow-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // sessionStorage can be unavailable inside some iframe contexts.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function setTheme(nextTheme, shouldPersist = true) {
  theme = nextTheme
  root.removeAttribute('data-theme')
  root.setAttribute('data-app-theme', theme)

  themeInputs.forEach((input) => {
    input.checked = input.value === theme
  })

  themeOptions.forEach((option) => {
    option.classList.toggle('is-active', option.dataset.themeOption === theme)
  })

  track.querySelectorAll('img').forEach((image, slideIndex) => {
    image.src = slides[slideIndex][theme]
  })

  if (shouldPersist) {
    try {
      window.sessionStorage.setItem('ue-app-slideshow-theme', theme)
    } catch {
      // Ignore storage errors in locked-down embeds.
    }
  }
}

function renderSlides() {
  track.innerHTML = slides
    .map((slide, slideIndex) => {
      return `
        <div class="screen-slide" role="group" aria-label="${slideIndex + 1} av ${slides.length}">
          <img src="${slide[theme]}" alt="${slide.title}">
        </div>
      `
    })
    .join('')
}

function updateSlide() {
  const slide = slides[index]
  track.style.setProperty('--slide-index', index)
  count.textContent = `${index + 1}/${slides.length}`
  title.textContent = slide.title
  text.textContent = slide.text

  const activeSlide = track.children[index]
  if (activeSlide) activeSlide.scrollTop = 0
}

function goTo(nextIndex) {
  index = (nextIndex + slides.length) % slides.length
  updateSlide()
}

function goNext() {
  goTo(index + 1)
}

function goPrev() {
  goTo(index - 1)
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]')
  if (!button) return

  if (button.dataset.action === 'next') goNext()
  if (button.dataset.action === 'prev') goPrev()
})

themeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) setTheme(input.value)
  })
})

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key === 'ArrowRight') goNext()
  if (event.key === 'ArrowLeft') goPrev()
})

phoneShell.addEventListener('pointerdown', (event) => {
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  isPointerDown = true
})

phoneShell.addEventListener('pointerup', (event) => {
  if (!isPointerDown) return
  isPointerDown = false

  const deltaX = event.clientX - pointerStartX
  const deltaY = event.clientY - pointerStartY
  if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return

  if (deltaX < 0) goNext()
  else goPrev()
})

phoneShell.addEventListener('pointercancel', () => {
  isPointerDown = false
})

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
systemTheme.addEventListener('change', (event) => {
  let saved = null
  try {
    saved = window.sessionStorage.getItem('ue-app-slideshow-theme')
  } catch {
    // Ignore storage errors.
  }

  if (saved !== 'light' && saved !== 'dark') {
    setTheme(event.matches ? 'dark' : 'light', false)
  }
})

renderSlides()
setTheme(theme, false)
updateSlide()
