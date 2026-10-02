import { Check, Compass, Target } from 'lucide-react'
import ProgrammeSidebar from '../components/ProgrammeSidebar.jsx'
import ProgrammeTabs from '../components/ProgrammeTabs.jsx'
import useReveal from '../hooks/useReveal.js'
import ApplyNow from '../components/ApplyNow.jsx'
import { getProgrammeDetails } from '../data/programmeDetails.js'
import { institute } from '../data/institute.js'

export default function ProgrammeDetail({ programme }) {
  const {
    icon: Icon,
    title,
    short,
    tagline,
    image,
    duration,
    approvals,
    fees,
    eligibility,
    highlights,
    level,
    detailsKey,
  } = programme
  const { ref, className } = useReveal()

  // People / fees / documents / overview for this programme, mirrored from the
  // official per-programme pages. Absent for a programme not yet covered, in
  // which case the tab card and the sections below it simply don't render.
  const details = getProgrammeDetails(detailsKey)

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* `level` keeps the sidebar list in sync with this programme
            (UG page -> UG list, PG page -> PG list). */}
        <ProgrammeSidebar level={level} />

        <div className="flex-1 min-w-0">
          {/* Banner */}
          {/* The illustration already carries the course name, so it is shown
              whole beside the title rather than cropped behind a dark overlay. */}
          <div className="programme-card rounded-[26px] overflow-hidden mb-8 glass-strong p-1.5">
            <div className="grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center rounded-[20px] overflow-hidden bg-white/60">
              <div className="programme-card-media aspect-[760/434]">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white mb-3 shadow-card">
                  <Icon size={22} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 leading-tight">{title}</h1>
                <p className="text-gold font-semibold mt-1">{tagline}</p>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Duration</p>
              <p className="font-semibold text-navy-800">{duration}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Approvals</p>
              <p className="font-semibold text-navy-800">{approvals}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Fees</p>
              <p className="font-semibold text-navy-800">{fees}</p>
            </div>
          </div>

          {/* The five panels that mirror the official per-programme submenu */}
          <ProgrammeTabs details={details} programmeName={title} />

          {/* Overview */}
          <div className="glass rounded-2xl p-5 sm:p-6 mb-6">
            <h2 className="text-lg font-bold text-navy-800 mb-2">Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {details?.overview || eligibility}
            </p>
          </div>

          {/* What the programme prepares you for */}
          {details?.outcomes && (
            <div className="glass rounded-2xl p-5 sm:p-6 mb-6">
              <h2 className="text-lg font-bold text-navy-800 mb-3">
                What you will be able to do
              </h2>
              <ul className="space-y-2">
                {details.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-crimson-600 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Programme highlights */}
          <div className="glass rounded-2xl p-5 sm:p-6 mb-6">
            <h2 className="text-lg font-bold text-navy-800 mb-3">Programme Highlights</h2>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={16} className="text-crimson-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Institute vision & mission — the same statements as the About section */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="w-10 h-10 rounded-full glass-strong text-navy-800 flex items-center justify-center mb-3">
                <Compass size={18} />
              </div>
              <h2 className="font-semibold text-navy-800 mb-2">Our Vision</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be a globally recognised centre of academic excellence that empowers
                learners with knowledge, values and skills to serve society and shape
                the future.
              </p>
            </div>

            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="w-10 h-10 rounded-full glass-strong text-navy-800 flex items-center justify-center mb-3">
                <Target size={18} />
              </div>
              <h2 className="font-semibold text-navy-800 mb-2">Our Mission</h2>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-1.5 list-disc pl-4">
                <li>Deliver quality, industry-relevant education across UG, PG and online programmes.</li>
                <li>Foster research, innovation and lifelong learning.</li>
                <li>Provide accessible education to working professionals and distance learners.</li>
                <li>Build graduates of strong character and social responsibility.</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            {institute.name} — {institute.centre}
          </p>

          <ApplyNow label={`Apply for ${short}`} />
        </div>
      </div>
    </section>
  )
}
