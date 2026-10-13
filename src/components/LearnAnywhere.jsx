import { CheckCircle2, GraduationCap } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'

const perks = ['Industry Relevant Curriculum', 'Expert Faculty Support', 'Flexible & Accessible Learning']

export default function LearnAnywhere() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl -mt-8 relative z-20 ${className}`}>
      <div className="glass-strong rounded-[26px] px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-full glass-btn-solid text-white shrink-0">
            <GraduationCap size={20} />
          </div>
          <p className="font-semibold text-lg text-navy-800">Learn Anytime, Anywhere</p>
        </div>
        <ul className="flex flex-col sm:flex-row sm:flex-wrap md:justify-around gap-x-8 gap-y-2 flex-1">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
