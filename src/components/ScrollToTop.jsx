import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * ---------------------------------------------------------------------------
 * React Router keeps the current scroll position when the route changes. That
 * made links near the bottom of a page look broken: clicking "Know More About
 * Us" at the foot of the home page did navigate to /about, but the viewport
 * stayed down by the footer, so nothing appeared to happen.
 *
 * Mounted once in Layout, this resets the scroll to the top on every
 * navigation — except when the URL carries a #hash, where the browser's own
 * anchor behaviour is the right thing.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}
