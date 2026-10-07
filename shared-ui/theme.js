/**
 * theme.js – Lättviktig temahanterare för shared-ui
 *
 * Hanterar light/dark/auto tema med localStorage-persistens.
 *
 * Användning:
 *   import { initTheme, setTheme, getTheme, toggleTheme } from './theme.js'
 *   initTheme()  // Läser sparad preferens eller använder systeminställning
 */

const STORAGE_KEY = 'shared-ui-theme'

/**
 * Returnerar aktuellt tema: 'light', 'dark', eller 'auto'
 */
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'auto'
}

/**
 * Returnerar det faktiskt aktiva temat (aldrig 'auto')
 */
export function getActiveTheme() {
  const theme = getTheme()
  if (theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

/**
 * Sätter tema: 'light', 'dark', eller 'auto'
 */
export function setTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // localStorage kan vara otillgänglig
  }
  document.dispatchEvent(new CustomEvent('theme-change', { detail: { theme, active: getActiveTheme() } }))
}

/**
 * Växlar mellan light och dark (hoppar auto)
 */
export function toggleTheme() {
  setTheme(getActiveTheme() === 'dark' ? 'light' : 'dark')
}

/**
 * Växlar mellan light → dark → auto → light …
 */
export function cycleTheme() {
  const current = getTheme()
  const order = ['light', 'dark', 'auto']
  const next = order[(order.indexOf(current) + 1) % order.length]
  setTheme(next)
}

/**
 * Initierar tema vid sidladdning.
 * Läser sparad preferens från localStorage, annars auto.
 */
export function initTheme() {
  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  } catch {
    // localStorage kan vara otillgänglig
  }

  if (saved === 'light' || saved === 'dark') {
    setTheme(saved)
  } else {
    setTheme('auto')
  }
}
