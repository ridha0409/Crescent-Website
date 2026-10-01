import { NavLink, useLocation } from 'react-router-dom'
import { Landmark, Eye, Workflow, Users, Building2 } from 'lucide-react'

/*
 * ABOUT SIDEBAR
 * ---------------------------------------------------------------------------
 * Mirrors the About Us dropdown on the official CDOE site:
 *
 *   About Crescent · Visionary Team · Execution Team · CDOE Team · Facilities
 *
 * CDOE Team is a single entry here. Its Faculty / Technical Team / Non-Teaching
 * split lives on the page itself (as tabs) and in the navbar submenu — putting
 * it in this rail as well repeated the same three links twice on screen. The
 * rail is a fixed 264px wide and a fixed minimum height on every About route.
 */

const links = [
  { to: '/about', label: 'About Crescent', icon: Landmark, end: true },
  { to: '/about/visionary-team', label: 'Visionary Team', icon: Eye },
  { to: '/about/execution-team', label: 'Execution Team', icon: Workflow },
  { to: '/about/cdoe-team', label: 'CDOE Team', icon: Users, matchPrefix: true },
  { to: '/about/facilities', label: 'Facilities', icon: Building2 },
]

const itemBase =
  'relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ' +
  'cursor-pointer pointer-events-auto select-none leading-snug ' +
  'transition-colors duration-350'

const activeItem = 'text-white bg-navy-800/90 shadow-glow-navy'
const idleItem = 'text-slate-600 hover:bg-white/50 hover:text-navy-800'

export default function AboutSidebar() {
  const { pathname } = useLocation()

  // CDOE Team also owns /about/cdoe-team/:slug (a faculty profile), so it stays
  // highlighted there too — NavLink alone would drop the highlight.
  const onCdoe = pathname.startsWith('/about/cdoe-team')

  return (
    <aside
      className="w-full lg:w-[264px] lg:shrink-0 lg:grow-0 lg:basis-[264px]
                 lg:sticky lg:top-24 lg:self-start relative z-10"
    >
      <div className="glass-strong rounded-[22px] p-3 sm:p-4 lg:min-h-[452px] flex flex-col">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">
          About Us
        </p>

        <nav className="rail-nav relative z-10">
          {links.map(({ to, label, icon: Icon, end, matchPrefix }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${itemBase} ${(matchPrefix ? onCdoe : isActive) ? activeItem : idleItem}`
              }
            >
              <Icon size={16} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
