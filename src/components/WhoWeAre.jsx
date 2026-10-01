import { Landmark, ShieldCheck, Users2, Award } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import convocationPhoto from '../assets/site/convocation.jpg'

const facts = [
  { icon: Landmark, label: 'Established 1984' },
  { icon: ShieldCheck, label: 'UGC Entitled' },
  { icon: Users2, label: 'Expert Faculty' },
  { icon: Award, label: 'AICTE Approved' },
]

export default function WhoWeAre() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="glass-strong rounded-[28px] p-6 sm:p-10 grid lg:grid-cols-[1.1fr,1.4fr] gap-8 items-center">
        <div className="rounded-[20px] overflow-hidden">
          <img
            src={convocationPhoto}
            alt="Crescent Institute campus"
            className="w-full h-56 sm:h-64 lg:h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-1">
            Who We Are?
            <span className="block w-14 h-1 bg-gold mt-3 rounded-full" />
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6 max-w-2xl">
            B.S. Abdur Rahman Crescent Institute of Science &amp; Technology was
            established in 1984 under the aegis of B.S. Abdur Rahman Crescent
            Educational &amp; Charitable Trust. With decades of academic excellence,
            we offer UGC-entitled undergraduate and postgraduate online
            programmes designed for working professionals and lifelong learners.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {facts.map(({ icon: Icon, label }) => (
              <div key={label} className="glass rounded-2xl py-3 px-2 text-center">
                <div className="w-10 h-10 rounded-full glass-strong text-navy-800 flex items-center justify-center mx-auto mb-2">
                  <Icon size={16} />
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}