import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import { institute } from '../data/institute.js'
import ApplyNow from './ApplyNow.jsx'
import heroCampus from '../assets/site/hero-campus.jpg'

const badges = ['Live Interactive Classes', 'AICTE / UGC Approved', 'Placement Support']

export default function Hero() {
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    const node = glowRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    node.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-br from-navy-800 via-navy-800 to-navy-950 overflow-hidden rounded-b-[40px] sm:rounded-b-[56px]"
    >
      {/* organic curve backdrop */}
      <div
        className="absolute -left-24 -top-24 w-[70%] h-[140%] bg-navy-700/40 rounded-[45%] blur-sm"
        aria-hidden="true"
      />
      <div className="blob w-[380px] h-[380px] top-10 right-10 bg-gold/20 animate-float" aria-hidden="true" />
      <div ref={glowRef} className="mouse-glow" aria-hidden="true" />

      <div className="container-xl relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center py-10 sm:py-14 lg:py-20">
        <div className="relative z-10 text-white">
          <p className="text-crimson-300 font-semibold tracking-wide text-sm mb-3">
            Since {institute.established} · Centre for Distance and Online Education
          </p>
          <h1 className="text-[clamp(2rem,7vw,3.25rem)] font-extrabold leading-[1.1] mb-4 tracking-tight">
            UGC Entitled
            <br /> Online Programmes
          </h1>
          <p className="text-gold font-semibold text-lg mb-6">MBA | MCA | BA Islamic Studies</p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-white/90 glass-dark rounded-full px-3 py-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" /> {b}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <ApplyNow variant="gold" />
            <Link
              to="/programmes"
              onMouseDown={createRipple}
              className="glass-btn text-white px-6 py-3"
            >
              Explore Programmes <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <div className="glass-strong rounded-[28px] overflow-hidden p-2">
            <div className="rounded-[20px] overflow-hidden">
              <img
                src={heroCampus}
                alt="Campus building"
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}