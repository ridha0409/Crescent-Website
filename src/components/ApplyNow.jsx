import { ArrowRight, ExternalLink } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import { applyNowUrl } from '../data/admission.js'

/**
 * The one and only Apply Now button.
 *
 * Every "Apply" call to action on the site renders this component, so the
 * destination is defined once (applyNowUrl in src/data/admission.js) and can
 * never drift between the hero, the navbar, the footer and the programme
 * pages. It opens the Institute's official admission portal in a new tab so
 * the applicant does not lose the page they were reading.
 *
 * Props
 *   label    button text (default "Apply Now")
 *   variant  'solid' (default) · 'ghost' · 'light' · 'gold'
 *   full     stretch to the container width
 *   icon     'arrow' (default) · 'external' · 'none'
 */

const variants = {
  solid: 'btn-shine glass-btn-solid',
  ghost: 'glass-btn text-navy-800',
  light: 'btn-shine glass-btn text-navy-800 bg-white/90',
  // The marquee yellow — see .glass-btn-gold in src/index.css.
  gold: 'btn-shine glass-btn-gold',
}

const icons = {
  arrow: ArrowRight,
  external: ExternalLink,
  none: null,
}

export default function ApplyNow({
  label = 'Apply Now',
  variant = 'solid',
  full = false,
  icon = 'arrow',
  className = '',
}) {
  const Icon = icons[icon]

  return (
    <a
      href={applyNowUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseDown={createRipple}
      aria-label={`${label} — opens the Crescent admission portal in a new tab`}
      className={`${variants[variant] || variants.solid} px-6 py-3 ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      {label}
      {Icon && <Icon size={16} />}
    </a>
  )
}
