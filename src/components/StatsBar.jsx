import { Trophy, BookOpen, Building2, Users } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { headlineStats } from '../data/institute.js'

// Figures come from src/data/institute.js so the hero, this bar and the About
// page can never disagree. Icons are matched to the labels by position.
const icons = [Trophy, BookOpen, Building2, Users]
const stats = headlineStats.map((s, i) => ({ ...s, icon: icons[i] }))

export default function StatsBar() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl -mt-8 relative z-20 ${className}`}>
      <div className="glass-strong rounded-[26px] grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/40">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 justify-center py-6 px-3">
            <div className="w-11 h-11 rounded-full glass-btn-solid text-white shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800 leading-none">{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}