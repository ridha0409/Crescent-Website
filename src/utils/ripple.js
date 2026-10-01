// Lightweight click-ripple effect for glass buttons.
// Attach as onMouseDown={createRipple} on any element with position:relative + overflow:hidden.
export function createRipple(event) {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const span = document.createElement('span')

  span.className = 'ripple-effect'
  span.style.width = `${size}px`
  span.style.height = `${size}px`
  span.style.left = `${event.clientX - rect.left - size / 2}px`
  span.style.top = `${event.clientY - rect.top - size / 2}px`

  target.appendChild(span)
  window.setTimeout(() => span.remove(), 700)
}
