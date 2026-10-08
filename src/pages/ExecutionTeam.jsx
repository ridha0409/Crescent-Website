import { useState } from 'react'
import { UserRound, ChevronDown } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import AboutLayout from '../components/AboutLayout.jsx'
import photoThowseaf from '../assets/faculty/dr-s-thowseaf.jpg'
import photoSharonPriya from '../assets/faculty/dr-s-sharon-priya.jpg'
import photoSabinBegum from '../assets/faculty/dr-r-sabin-begum.jpg'

// Photos served from public/img/. Prefixed with the site's base path so they
// load under /Crescent-Website/ on GitHub Pages, not from the domain root.
const SITE = import.meta.env.BASE_URL

// Director — the only entry on this page that carries a message.
const director = {
  name: 'Dr. A. Jaya',
  designation: 'Professor & Director',
  photo: `${SITE}img/mca/people/jaya.jpg`,
  message: [],
}

const groups = [
  {
    heading: 'CDOE Team',
    people: [
      {
        name: 'Dr. W. Aisha Banu',
        designation: 'Professor & HOD, CSE',
        photo: `${SITE}img/execution/DR.AISHABANU.jpg`,
      },
      // Ordered by office: Deputy Director first, then the Assistant Directors.
      {
        name: 'Dr. S. Sharon Priya',
        designation: 'Deputy Director, CDOE',
        photo: photoSharonPriya,
      },
      {
        name: 'Dr. R. Sabin Begum',
        designation: 'Assistant Director, CDOE',
        photo: photoSabinBegum,
      },
      {
        name: 'Dr. S. Thowseaf',
        designation: 'Assistant Professor / Assistant Director, CDOE',
        photo: photoThowseaf,
      },
    ],
  },
  {
    heading: 'Planning & Monitoring Committee',
    people: [
      {
        name: 'Dr. Latha Tamilselvan',
        designation: 'Professor & Director, MIS',
        photo: `${SITE}img/execution/DR.LATHATAMILSELVAN.jpg`,
      },
      {
        name: 'Dr. C. Tharini',
        designation: 'Professor & Dean, SECS',
        photo: `${SITE}img/execution/Dr.C.Tharini.jpg`,
      },
      {
        name: 'Dr. Sharmila Sankar',
        designation: 'Professor & Dean, SCIMS',
        photo: `${SITE}img/execution/DR.SHARMILASANKAR.jpg`,
      },
      {
        name: 'Dr. Aisha Banu',
        designation: 'Professor & HOD, CSE',
        photo: `${SITE}img/execution/DR.AISHABANU.jpg`,
      },
    ],
  },
  {
    heading: 'Former Director',
    people: [
      {
        name: 'Dr. V. Rhymend Uthariaraj',
        designation: 'Former Director, CDOE (2021 – 2023)',
        photo: `${SITE}img/execution/director.jpg`,
      },
    ],
  },
]

function Photo({ photo, name, className }) {
  // Remote photos can fail — fall back to the icon rather than a broken image.
  const [failed, setFailed] = useState(false)

  if (!photo || failed) {
    return (
      <div className={`${className} bg-navy-50 flex items-center justify-center`}>
        <UserRound size={34} className="text-navy-200" />
      </div>
    )
  }

  return (
    <img
      src={photo}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-cover object-top`}
    />
  )
}

function PersonCard({ person }) {
  return (
    <div className="glass-strong rounded-[22px] p-5 h-full flex flex-col items-center text-center transition-transform duration-350 hover:-translate-y-1">
      <Photo
        photo={person.photo}
        name={person.name}
        className="w-24 h-24 rounded-full overflow-hidden mb-4 shrink-0"
      />
      <h3 className="font-semibold text-navy-900 text-sm">{person.name}</h3>
      <p className="text-xs text-red-700 font-medium mt-1 leading-snug">
        {person.designation}
      </p>
    </div>
  )
}

function DirectorBlock({ person }) {
  const [open, setOpen] = useState(false)
  const hasMessage = person.message.length > 0
  const clampable = person.message.join(' ').length > 320

  return (
    <article className="director-card rounded-[26px] p-5 sm:p-7 mb-8">
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-[200px_1fr] items-start">
        {/* Designation sits under the photo, not above the name. */}
        <figure className="w-full max-w-[200px] mx-auto sm:mx-0">
          <Photo
            photo={person.photo}
            name={person.name}
            className="w-full aspect-[4/5] rounded-[18px] overflow-hidden ring-1 ring-white/25"
          />
          <figcaption className="mt-3 text-center text-[11px] font-semibold text-gold-light uppercase tracking-[0.15em] leading-snug">
            {person.designation}
          </figcaption>
        </figure>

        <div className="min-w-0">
          <span className="director-badge">Director</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 leading-tight">
            {person.name}
          </h2>
          <span className="block w-12 h-[3px] bg-gold rounded-full mt-4" />

          {hasMessage ? (
            <>
              {open ? (
                <div className="mt-5 space-y-3.5">
                  {person.message.map((p, i) => (
                    <p key={i} className="text-sm text-white/80 leading-[1.8] max-w-[68ch]">
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <p
                  className="mt-5 text-sm text-white/80 leading-[1.8] max-w-[68ch] overflow-hidden
                             [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]"
                >
                  {person.message.join(' ')}
                </p>
              )}

              {clampable && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white
                             hover:text-gold-light transition-colors duration-350"
                >
                  {open ? 'Show Less' : 'Read More'}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-350 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </>
          ) : (
            <p className="mt-5 text-sm text-white/75 leading-relaxed max-w-[68ch]">
              The Centre for Distance and Online Education aims to deliver quality education
              through online and distance modes, with programmes designed around the needs
              and learning styles of a diverse student body.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ExecutionTeam() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="Execution Team"
      lede="The Centre for Distance and Online Education is committed to providing quality education through online and distance mode — steered by the Director's office, the CDOE team and the Planning & Monitoring Committee."
      contentRef={ref}
      contentClassName={className}
    >
      <DirectorBlock person={director} />

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 className="text-sm font-bold text-navy-800 mb-4">{group.heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {group.people.map((person) => (
                <PersonCard key={`${group.heading}-${person.name}`} person={person} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AboutLayout>
  )
}
