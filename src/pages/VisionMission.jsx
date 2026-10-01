import { Compass, Target } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import AboutLayout from '../components/AboutLayout.jsx'

export default function VisionMission() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="Vision & Mission"
      lede="The principles that guide Crescent Institute of Science & Technology."
      contentRef={ref}
      contentClassName={className}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="w-12 h-12 rounded-full glass text-navy-800 flex items-center justify-center mb-4">
            <Compass size={22} />
          </div>
          <h2 className="font-semibold text-navy-800 mb-2">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To be a globally recognised centre of academic excellence that
            empowers learners with knowledge, values and skills to serve
            society and shape the future.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 rounded-full glass text-navy-800 flex items-center justify-center mb-4">
            <Target size={22} />
          </div>
          <h2 className="font-semibold text-navy-800 mb-2">Our Mission</h2>
          <ul className="text-sm text-slate-600 leading-relaxed space-y-2 list-disc pl-4">
            <li>Deliver quality, industry-relevant education across UG, PG and online programmes.</li>
            <li>Foster research, innovation and lifelong learning.</li>
            <li>Provide accessible education to working professionals and distance learners.</li>
            <li>Build graduates of strong character and social responsibility.</li>
          </ul>
        </div>
      </div>
    </AboutLayout>
  )
}
