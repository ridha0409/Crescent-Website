import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import studioImage from '../assets/site/studio.jpg'
import lmsImage from '../assets/site/lms.jpg'
import datacenterImage from '../assets/site/datacenter.jpg'

const facilities = [
  {
    title: 'Studio',
    desc: 'State-of-the-art studio for high-quality content development.',
    image: studioImage,
  },
  {
    title: 'LMS',
    desc: 'Advanced Learning Management System for seamless learning.',
    image: lmsImage,
  },
  {
    title: 'Datacenter',
    desc: 'Robust datacenter ensuring secure and uninterrupted learning.',
    image: datacenterImage,
  },
]

export default function Facilities() {
  const { ref, className } = useReveal()

  return (
    <section id="facilities" ref={ref} className={`container-xl py-16 ${className}`}>
      <h2 className="text-3xl font-bold text-center text-navy-800 mb-10">
        Our World-Class Facilities
        <span className="block w-14 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <div key={f.title} className="glass-card overflow-hidden">
            <img src={f.image} alt={f.title} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h3 className="font-semibold text-navy-800 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{f.desc}</p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 py-1.5 min-h-[32px] text-sm font-semibold text-navy-800 hover:text-crimson-600 transition-colors duration-350"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}