import { NavLink } from 'react-router-dom'
import { LayoutGrid, GraduationCap, BookOpenText } from 'lucide-react'

const categories = [
  { to: '/programmes', label: 'All Programmes', icon: LayoutGrid, end: true },
  { to: '/programmes/ug', label: 'UG Programmes', icon: BookOpenText },
  { to: '/programmes/pg', label: 'PG Programmes', icon: GraduationCap },
]

export default function ProgrammeCategorySidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 shrink-0">
      <div className="glass-strong rounded-[22px] p-3 sm:p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">
          Browse Programmes
        </p>
        <nav className="rail-nav">
          {categories.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-350 ${
                  isActive
                    ? 'text-white bg-navy-800/90 shadow-glow-navy'
                    : 'text-slate-600 hover:bg-white/50 hover:text-navy-800'
                }`
              }
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}