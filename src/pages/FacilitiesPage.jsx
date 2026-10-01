import { MonitorPlay, Video, Server, Check } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import AboutLayout from '../components/AboutLayout.jsx'

/**
 * FACILITIES — About Us › Facilities
 * ---------------------------------------------------------------------------
 * The official CDOE site carries Facilities inside the About Us dropdown:
 *   https://online.crescent-institute.edu.in/facilities
 *
 * Three facilities, in the order the Institute lists them, with the feature
 * points published under each one. The home page also has a short Facilities
 * strip — that one is a teaser; this is the full page the menu points at.
 *
 * PHOTOGRAPHS: each facility carries its own photo from the CDOE library, and
 * every one is shown whole. The frame takes the file's own aspect ratio rather
 * than a fixed height, so nothing is cropped — which matters most for the LMS
 * photo, a composite of platform screenshots whose small text and window edges
 * are the content. Update `aspect` if a photo is replaced with a different size.
 */

const facilities = [
  {
    icon: MonitorPlay,
    title: 'Learning Management System (LMS)',
    body: [
      'The Centre runs an advanced Learning Management System built around the individual learner. It offers unmatched customizability, powerful analytics that track progress and surface where a learner needs support, and instructional material that stays accessible whenever and wherever it is needed.',
      'Collaborative features let cohorts work together rather than in isolation, and the platform is backed by security controls and round-the-clock support.',
    ],
    features: [
      'Customizability',
      'Analytics',
      'Instructional materials',
      'Accessibility',
      'Collaborative features',
    ],
    image: {
      src: `${import.meta.env.BASE_URL}img/facilities/lms.jpeg`,
      alt: 'Screens from the CDOE Learning Management System — learner dashboard, course catalogue, video tutorials, flipbook study material and self-study questions',
      aspect: '1400 / 677',
      caption: 'The Learning Management System — dashboard, course catalogue and study material.',
    },
  },
  {
    icon: Video,
    title: 'In-House Studio',
    body: [
      'Course content is produced in the Institute’s own studio, which keeps production quality professional and the material interactive rather than a recorded lecture.',
      'Producing in-house also keeps costs down and content confidential, and lets every module be tailored to the Institute’s own academic goals — which is what keeps student engagement and the Crescent identity consistent across programmes.',
    ],
    features: [
      'Professional quality',
      'Interactivity',
      'Cost-effectiveness',
      'Confidentiality',
    ],
    image: {
      src: `${import.meta.env.BASE_URL}img/facilities/studio.jpeg`,
      alt: 'The Institute’s in-house recording studio — green screen, lighting rig and camera, with the editing suite alongside',
      aspect: '1400 / 788',
      caption: 'The in-house studio where course content is recorded.',
    },
  },
  {
    icon: Server,
    title: 'Data Center',
    body: [
      'A dedicated data center serves the online education department: lightning-fast delivery, robust security around sensitive academic records, and the headroom to scale as programmes and cohorts grow.',
      'It is configured to the Centre’s own requirements and supported round the clock, so learning material and assessments stay available without interruption.',
    ],
    features: [
      'Lightning-fast speed',
      'Robust security',
      'Scalability',
      'Customizability',
      'Reliability',
      '24/7 support',
    ],
    image: {
      src: `${import.meta.env.BASE_URL}img/facilities/Server.jpg`,
      alt: 'The CDOE data centre — server racks behind the department’s own entrance',
      aspect: '1400 / 943',
      caption: 'The data centre serving the online education department.',
    },
  },
]

function FacilityCard({ facility, index }) {
  const { icon: Icon, title, body, features, image } = facility

  return (
    <article className="glass-strong rounded-[26px] p-5 sm:p-7">
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass text-navy-800 flex items-center justify-center shrink-0">
          <Icon size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-red-700 uppercase tracking-[0.15em]">
            Facility {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-navy-900 mt-1.5 leading-tight">
            {title}
          </h2>
          <span className="block w-12 h-[3px] bg-gold rounded-full mt-4" />

          <div className="mt-5 space-y-3.5">
            {body.map((p, i) => (
              <p key={i} className="text-sm text-slate-600 leading-[1.8] max-w-[68ch]">
                {p}
              </p>
            ))}
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <Check size={15} className="text-crimson-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* The facility's photograph, shown whole. The frame carries the
              file's own aspect ratio, so the height follows the width and the
              image is never cropped — and the space is reserved before it
              loads, so nothing shifts. */}
          {image && (
            <figure className="mt-6">
              <div className="glass rounded-[20px] p-2">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{ aspectRatio: image.aspect }}
                  className="w-full h-auto rounded-[14px] object-contain bg-white/60"
                />
              </div>
              {image.caption && (
                <figcaption className="text-[11px] text-slate-400 mt-2 px-1">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </article>
  )
}

export default function FacilitiesPage() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="Facilities"
      lede="What the Centre for Distance and Online Education runs behind every online programme — the platform learners log into, the studio the course material is made in, and the infrastructure that keeps both running."
      contentRef={ref}
      contentClassName={className}
    >
      {/* Overview banner — the single photograph the official Facilities page
          carries. It is a collage, so it keeps its own 16/9 shape instead of a
          fixed height that would crop the panels at the edges. */}
      <div className="glass-strong rounded-[28px] overflow-hidden p-2 mb-8">
        <img
          src={`${import.meta.env.BASE_URL}img/facilities/overview.jpeg`}
          alt="CDOE facilities overview — data centre, recording studio, editing suite and the learning platform"
          loading="lazy"
          style={{ aspectRatio: '1400 / 788' }}
          className="w-full h-auto object-contain rounded-[20px]"
        />
      </div>

      <p className="text-sm text-slate-600 leading-[1.8] max-w-[68ch] mb-8">
        The online MBA and MCA programmes follow the UGC (Open and Distance Learning
        Programmes and Online Programmes) Regulations 2020. The curriculum matches the
        on-campus programmes and is delivered through state-of-the-art IT infrastructure
        and web-based technologies.
      </p>

      <div className="space-y-6">
        {facilities.map((facility, i) => (
          <FacilityCard key={facility.title} facility={facility} index={i} />
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-8 leading-relaxed max-w-2xl">
        These facilities support the online MBA, MCA and BA Islamic Studies programmes,
        which follow the UGC (Open and Distance Learning Programmes and Online
        Programmes) Regulations 2020 and deliver the same curriculum as the on-campus
        programmes through web-based technologies.
      </p>
    </AboutLayout>
  )
}
