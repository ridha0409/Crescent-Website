import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { createRipple } from '../utils/ripple.js'

export default function ProgrammeGrid({ items }) {
  if (!items.length) {
    return (
      <p className="text-center text-slate-500 py-10">
        No programmes found in this category yet.
      </p>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <div key={p.short} className="glass-card overflow-hidden flex flex-col">
          <div className="relative h-40">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy-900/40" />
            <div className="absolute top-4 left-4 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-navy-800">
              <p.icon size={20} />
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-semibold text-navy-800 leading-snug">{p.title}</h3>
            <p className="text-gold font-semibold text-sm mb-3">{p.short}</p>

            <ul className="text-sm text-slate-600 space-y-1.5 mb-5">
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>Duration : {p.duration}</span>
              </li>
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>Approvals : {p.approvals}</span>
              </li>
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>Fees : {p.fees}</span>
              </li>
            </ul>

            <Link
              to={p.path}
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid mt-auto py-2.5"
            >
              View Programme <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}