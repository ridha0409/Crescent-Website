import { NavLink, useLocation } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { programmes, ugProgrammes, pgProgrammes } from '../data/programmes.js'

// Sidebar shown on a single programme's detail page.
//
// It must list the programmes that belong to the SAME level as the programme
// currently being viewed (a UG page shows UG programmes, a PG page shows PG
// programmes). The level is resolved in this order:
//   1. an explicit `level` prop, when a page wants to force it
//   2. the level of the programme whose route matches the current URL
//   3. fallback: show every level, grouped — never a wrong single list
const LEVEL_META = {
  UG: { heading: 'UG Programmes', listPath: '/programmes/ug', items: ugProgrammes },
  PG: { heading: 'PG Programmes', listPath: '/programmes/pg', items: pgProgrammes },
}

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-350 ${
    isActive
      ? 'text-white bg-navy-800/90 shadow-glow-navy'
      : 'text-slate-600 hover:bg-white/50 hover:text-navy-800'
  }`

export default function ProgrammeSidebar({ level }) {
  const { pathname } = useLocation()

  const currentProgramme = programmes.find((p) => p.path === pathname)
  const resolvedLevel = level || currentProgramme?.level

  // Only render levels that actually have programmes in them.
  const levels = (resolvedLevel ? [resolvedLevel] : ['UG', 'PG']).filter(
    (key) => LEVEL_META[key]?.items.length > 0
  )

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 shrink-0">
      <div className="glass-strong rounded-[22px] p-3 sm:p-4">
        {levels.map((key, index) => {
          const { heading, listPath, items } = LEVEL_META[key]

          return (
            <div key={key} className={index > 0 ? 'mt-5' : ''}>
              <NavLink
                to={listPath}
                className="block text-xs font-semibold text-slate-400 hover:text-navy-800 uppercase tracking-wide px-2 mb-2 transition-colors duration-350"
              >
                {heading}
              </NavLink>

              <nav className="rail-nav">
                {items.map(({ path, short, icon: Icon }) => (
                  <NavLink key={path} to={path} className={linkClass}>
                    <Icon size={16} className="shrink-0" />
                    {short}
                  </NavLink>
                ))}
              </nav>
            </div>
          )
        })}

        <div className="mt-5 pt-4 border-t border-white/40">
          <NavLink to="/programmes" end className={linkClass}>
            <LayoutGrid size={16} className="shrink-0" />
            All Programmes
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
