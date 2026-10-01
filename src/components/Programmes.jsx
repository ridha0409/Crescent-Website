import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import { featuredProgrammes } from '../data/programmes.js'
import ProgrammeGrid from './ProgrammeGrid.jsx'

export default function Programmes() {
  const { ref, className } = useReveal()

  return (
    <section id="programmes" ref={ref} className={`container-xl py-16 ${className}`}>
      <h2 className="text-3xl font-bold text-center text-navy-800 mb-10">
        Our Online Programmes
        <span className="block w-14 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </h2>

      {/* Three only — the rest are behind View All Programmes. */}
      <ProgrammeGrid items={featuredProgrammes} />

      <div className="text-center mt-8">
        <Link
          to="/programmes"
          onMouseDown={createRipple}
          className="glass-btn text-navy-800 px-6 py-2.5"
        >
          View All Programmes
        </Link>
      </div>
    </section>
  )
}