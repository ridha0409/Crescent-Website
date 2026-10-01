import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Users2,
  Award,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import AboutLayout from '../components/AboutLayout.jsx'
import { glanceStats, institute } from '../data/institute.js'
import campusPhoto from '../assets/site/academic-block.jpg'

// Accreditation / character badges — qualitative only.
// Anything numeric belongs in `highlights` below, so the two blocks
// can never repeat each other.
const facts = [
  { icon: GraduationCap, label: 'Deemed to be University' },
  { icon: ShieldCheck, label: 'UGC Entitled' },
  { icon: Award, label: 'AICTE Approved' },
  { icon: Users2, label: 'Expert Faculty' },
]

// Numbers come from src/data/institute.js — the one place they are defined.
const highlights = glanceStats

const cards = [
  {
    title: 'Visionary Team',
    body: 'The Founder, President, Chancellor, Pro-Chancellor, Vice-Chancellor and Registrar whose vision shapes every programme we offer.',
    to: '/about/visionary-team',
  },
  {
    title: 'Execution Team',
    body: 'The Director, the CDOE team and the Planning & Monitoring Committee who run the Centre day to day.',
    to: '/about/execution-team',
  },
  {
    title: 'CDOE Team',
    body: 'The faculty, technical team and non-teaching staff behind every online programme.',
    to: '/about/cdoe-team',
  },
]

export default function About() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="About Crescent"
      lede={institute.tagline}
      contentRef={ref}
      contentClassName={className}
    >
      <div className="glass-strong rounded-[28px] overflow-hidden p-2 mb-8">
        <img
          src={campusPhoto}
          alt="B.S. Abdur Rahman Crescent Institute of Science & Technology campus"
          className="w-full h-64 sm:h-80 object-cover rounded-[20px]"
        />
      </div>

      <h2 className="text-xl font-bold text-navy-800 mb-3">
        B.S. Abdur Rahman Crescent Institute of Science &amp; Technology
      </h2>

      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        Since 1984, B.S. Abdur Rahman Crescent Institute of Science and Technology
        is a renowned Quality Leadership Institution located at the greenest spot of
        Chennai near Tambaram.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        Through our long history of excellence, the Institution has offered access
        to a wide range of academic opportunities — 55 programmes grouped under 12
        different Schools, comprising 30 Undergraduate programmes, 25 Postgraduate
        programmes, and Ph.D.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        This institution is an intellectual destination that challenges conventional
        thinking and stimulates passion to redefine learning. The distinctive
        teaching at this institution makes the students and scholars to compete with
        themselves and each other. Apart from providing top-notch education, our
        green campus and well-planned student life are solely dedicated to making
        students utilize the ambiance to the fullest.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-8">
        Through our wide array of educational programmes and unique clubs to foster
        student development activities, we provide opportunities and experiences
        that build community, help you grow personally and professionally, and
        create a place that you can call home now and throughout your life.
      </p>

      {/* At a glance — the ONLY numbers block on this page */}
      <div className="glass-strong rounded-[24px] p-5 sm:p-6 mb-6">
        <p className="text-xs font-semibold text-crimson-600 uppercase tracking-wide mb-5">
          At a glance
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-5 gap-x-4">
          {highlights.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-navy-800 leading-none tabular-nums">
                {value}
              </p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations — qualitative badges, no numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ title, body, to }) => (
          <div key={to} className="glass-card p-6 flex flex-col">
            <h3 className="font-semibold text-navy-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 mb-4 flex-1">{body}</p>
            <Link
              to={to}
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-5 py-2 text-sm self-start"
            >
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </AboutLayout>
  )
}
