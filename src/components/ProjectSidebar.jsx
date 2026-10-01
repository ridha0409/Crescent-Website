import { NavLink } from 'react-router-dom'
import { FolderKanban } from 'lucide-react'
import { projectSections } from '../data/projects.js'

// Mirrors the Project dropdown in the navbar.
const base =
  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-350'
const idle = 'text-slate-600 hover:bg-white/50 hover:text-navy-800'
const active = 'text-white bg-navy-800/90 shadow-glow-navy'

export default function ProjectSidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 shrink-0 relative z-10">
      <div className="glass-strong rounded-[22px] p-3 sm:p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">
          Project
        </p>
        <nav className="rail-nav">
          {projectSections.map(({ slug, label }) => (
            <NavLink
              key={slug}
              to={`/project/${slug}`}
              className={({ isActive }) => `${base} ${isActive ? active : idle}`}
            >
              <FolderKanban size={16} className="shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
