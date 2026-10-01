import { NavLink } from 'react-router-dom'
import { ClipboardList, UserPlus, LogIn, FileText, ExternalLink } from 'lucide-react'
import { admissionLinks } from '../data/admission.js'

// Mirrors the Admission dropdown in the navbar. Two of the four destinations
// live on the institute's admission server, so they open in a new tab and are
// marked with an external-link icon rather than being routed internally.
const links = [
  { to: '/admission/how-to-apply', label: 'How to apply', icon: ClipboardList, end: true },
  { href: admissionLinks.newRegistration, label: 'New Registration', icon: UserPlus },
  { href: admissionLinks.applicantLogin, label: 'Applicant Login', icon: LogIn },
  { to: '/admission/notification', label: 'Notification', icon: FileText },
]

const base =
  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-350'
const idle = 'text-slate-600 hover:bg-white/50 hover:text-navy-800'
const active = 'text-white bg-navy-800/90 shadow-glow-navy'

export default function AdmissionSidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 shrink-0 relative z-10">
      <div className="glass-strong rounded-[22px] p-3 sm:p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">
          Admission
        </p>
        <nav className="rail-nav">
          {links.map(({ to, href, label, icon: Icon, end }) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} ${idle} justify-between`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="shrink-0" />
                  {label}
                </span>
                <ExternalLink size={13} className="shrink-0 text-slate-400" />
              </a>
            ) : (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) => `${base} ${isActive ? active : idle}`}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </aside>
  )
}
