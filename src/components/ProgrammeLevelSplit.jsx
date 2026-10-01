import { Link } from 'react-router-dom'
import { BookOpenText, GraduationCap, ArrowRight, Check } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import { ugProgrammes, pgProgrammes } from '../data/programmes.js'
// CDOE photographs, web-sized into src/assets/site.
import ugImage from '../assets/site/ug.jpg'
import pgImage from '../assets/site/pg.jpg'

const levels = [
  {
    key: 'ug',
    to: '/programmes/ug',
    icon: BookOpenText,
    title: 'UG Programmes',
    desc: 'Undergraduate degrees built for learners starting their academic journey — flexible, UGC-entitled and career focused.',
    count: ugProgrammes.length,
    image: ugImage,
  },
  {
    key: 'pg',
    to: '/programmes/pg',
    icon: GraduationCap,
    title: 'PG Programmes',
    desc: 'Postgraduate degrees for working professionals looking to specialise, upskill and accelerate their careers.',
    count: pgProgrammes.length,
    image: pgImage,
  },
]

export default function ProgrammeLevelSplit() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {levels.map(({ key, to, icon: Icon, title, desc, count, image }) => (
        <div key={key} className="glass-card overflow-hidden flex flex-col">
          <div className="relative h-48">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy-900/40" />
            <div className="absolute top-5 left-5 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-navy-800">
              <Icon size={22} />
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-navy-800 mb-2">
              {title}
              <span className="block w-12 h-1 bg-gold mt-3 rounded-full" />
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">{desc}</p>

            <ul className="text-sm text-slate-600 space-y-1.5 mb-6">
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{count} programme{count !== 1 ? 's' : ''} available</span>
              </li>
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>UGC / AICTE approved</span>
              </li>
              <li className="flex gap-2">
                <Check size={15} className="text-gold shrink-0 mt-0.5" />
                <span>100% online learning</span>
              </li>
            </ul>

            <Link
              to={to}
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid mt-auto py-2.5 justify-center"
            >
              Explore Programmes <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}