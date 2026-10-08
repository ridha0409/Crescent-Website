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
      {items.map((p, i) => (
        <div key={p.short} className="programme-card glass-card overflow-hidden flex flex-col" style={{ '--i': i }}>
          <div className="programme-card-media aspect-[760/434]">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            <div className="programme-card-badge">
              <p.icon size={20} />
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-navy-900 leading-snug">{p.title}</h3>
            <p className="text-gold font-bold text-base mt-1 mb-4">{p.short}</p>

            <ul className="text-[15px] font-semibold text-slate-800 space-y-2 mb-6">
              <li className="flex gap-2">
                <Check size={17} className="text-gold shrink-0 mt-0.5" />
                <span>Duration : {p.duration}</span>
              </li>
              <li className="flex gap-2">
                <Check size={17} className="text-gold shrink-0 mt-0.5" />
                <span>Approvals : {p.approvals}</span>
              </li>
              <li className="flex gap-2">
                <Check size={17} className="text-gold shrink-0 mt-0.5" />
                <span>Fees : {p.fees}</span>
              </li>
            </ul>

            <Link
              to={p.path}
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid mt-auto py-3 text-[15px]"
            >
              View Programme <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}