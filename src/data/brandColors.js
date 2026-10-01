/**
 * CRESCENT BRAND COLOURS
 * ---------------------------------------------------------------------------
 * Every hex below was sampled pixel-for-pixel from the official
 * bsauniv.ac.in screenshot. Use this file when you need a colour in JS
 * (inline styles, canvas, charts, SVG props) — for anything in JSX markup,
 * prefer the Tailwind classes, which are generated from these same values.
 *
 *   Tailwind class            hex        where it came from
 *   ------------------------  ---------  --------------------------------------
 *   bg-navy-800  / bg-brand-navy         #1C315E  primary navy band + cards
 *   bg-navy-900                          #18305E  crescent logo navy
 *   bg-navy-500  / bg-brand-navy-panel   #454E70  secondary split panel
 *   bg-steel-700 / bg-brand-steel        #3E4C57  top header + mega-nav bar
 *   bg-crimson-600 / btn-crimson         #A02022  "MADURAI CAMPUS" button
 *   tab-crimson (gradient)               #9F020F → #D80B1C  side tabs
 *   bg-mist                              #F5F5F5  page background
 *   border-line                          #C6C6C6  hairline / inactive dot
 *   text-ink                             #000000  active carousel dot
 */

export const brand = {
  // --- Navy family -----------------------------------------------------------
  navy: '#1C315E', // EXACT — primary navy (section bands, cards, VIEW MORE fill)
  navyLogo: '#18305E', // EXACT — crescent logo navy
  navyPanel: '#454E70', // EXACT — secondary navy panel / VIEW ALL PROGRAMMES
  navyDeep: '#0E1C37', // derived — deepest shade, for gradients & shadows

  // --- Header / neutral chrome ----------------------------------------------
  steel: '#3E4C57', // EXACT — top header bar + mega-nav strip

  // --- Crimson family --------------------------------------------------------
  crimson: '#A02022', // EXACT — MADURAI CAMPUS button (primary brand red)
  crimsonTabFrom: '#9F020F', // EXACT — side-tab gradient start
  crimsonTabTo: '#D80B1C', // EXACT — side-tab gradient end
  crimsonTab: '#B30513', // EXACT — side-tab average (flat fallback)

  // --- Neutrals --------------------------------------------------------------
  mist: '#F5F5F5', // EXACT — page background
  line: '#C6C6C6', // EXACT — hairline border / inactive carousel dot
  ink: '#000000', // EXACT — active carousel dot
  white: '#FFFFFF', // EXACT — nav text, button labels, outlines
}

/** Ready-made gradients matching the screenshot exactly. */
export const brandGradients = {
  crimsonTab: `linear-gradient(180deg, ${brand.crimsonTabFrom} 0%, ${brand.crimsonTabTo} 100%)`,
  navySplit: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyPanel} 100%)`,
}

/** rgba() helper — e.g. rgba(brand.navy, 0.4) => 'rgba(28, 49, 94, 0.4)' */
export function rgba(hex, alpha = 1) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default brand
