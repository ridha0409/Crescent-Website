import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  BadgeCheck,
  ScrollText,
  Megaphone,
  ClipboardCheck,
  FileStack,
  BookMarked,
  ListChecks,
} from 'lucide-react'
import { ugcSections } from '../data/ugcCorner.js'

// One icon per section slug, so the sidebar stays in sync with the data file
// even if a section is added or reordered there.
const icons = {
  approval: BadgeCheck,
  'degree-equi': ScrollText,
  notification: Megaphone,
  compliance: ClipboardCheck,
  application: FileStack,
  annual: BookMarked,
  admission: ListChecks,
}

const base =
  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-350'
const idle = 'text-slate-600 hover:bg-white/50 hover:text-navy-800'
const active = 'text-white bg-navy-800/90 shadow-glow-navy'

export default function UgcCornerSidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 shrink-0 relative z-10">
      <div className="glass-strong rounded-[22px] p-3 sm:p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">
          UGC Corner
        </p>
        <nav className="rail-nav">
          <NavLink
            to="/ugc-corner"
            end
            className={({ isActive }) => `${base} ${isActive ? active : idle}`}
          >
            <LayoutGrid size={16} className="shrink-0" />
            All Documents
          </NavLink>

          {ugcSections.map(({ slug, label }) => {
            const Icon = icons[slug] || FileStack
            return (
              <NavLink
                key={slug}
                to={`/ugc-corner/${slug}`}
                className={({ isActive }) => `${base} ${isActive ? active : idle}`}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
