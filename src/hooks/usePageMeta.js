import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * Per-page <title>, description and link-preview (Open Graph) tags.
 *
 * This is a single-page app, so index.html carries one set of defaults and
 * every page overwrites them as it opens. PageHeader calls this for the inner
 * pages; Home, the programme pages and the faculty profiles call it directly.
 */

export const SITE_URL = 'https://online.crescent-institute.edu.in'
export const SITE_NAME = 'Crescent Online — CDOE, B.S. Abdur Rahman Crescent Institute of Science & Technology'
const DEFAULT_TITLE = 'Crescent Institute of Science & Technology | Online Programmes'
const DEFAULT_DESCRIPTION =
  'UGC-entitled online MBA, MCA and BA / MA programmes from the Centre for Distance and Online Education (CDOE), B.S. Abdur Rahman Crescent Institute of Science & Technology, Chennai.'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Plain text from a title / lede that may be a string or a React node. */
function asText(value) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

export default function usePageMeta({ title, description } = {}) {
  const { pathname } = useLocation()
  const titleText = asText(title).trim()
  const descText = asText(description).replace(/\s+/g, ' ').trim()

  useEffect(() => {
    const fullTitle = titleText ? `${titleText} | Crescent Online` : DEFAULT_TITLE
    const desc = (descText || DEFAULT_DESCRIPTION).slice(0, 300)
    const url = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setCanonical(url)
  }, [titleText, descText, pathname])
}
