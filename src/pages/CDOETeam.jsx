import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FileText, UserRound, Mail, Phone } from 'lucide-react'
import AboutLayout from '../components/AboutLayout.jsx'
import { createRipple } from '../utils/ripple.js'
import {
  facultyLevels,
  facultyProgrammeById,
  getFacultyForProgramme,
  technicalTeam,
  nonTeaching,
} from '../data/cdoeTeam.js'

/*
 * CDOE TEAM — About Us › CDOE Team
 * ---------------------------------------------------------------------------
 * The official site splits this into three pages hanging off the About Us
 * dropdown — Faculty, Technical Team and Non-Teaching. Here they are three
 * tabs on one page, and the tab is driven by the URL (?tab=faculty /
 * ?tab=technical / ?tab=non-teaching) so the navbar submenu can link straight
 * to any of them and a tab can be bookmarked or shared.
 *
 * Faculty is split two levels further: first UG Programmes / PG Programmes,
 * then one tab per programme inside that level, so only that programme's
 * faculty is on screen at a time. Both choices ride in the URL
 * (?tab=faculty&level=pg&programme=mca), so a programme tab is just as linkable
 * as a top-level one — and an older ?programme= link with no ?level= still
 * resolves, because the programme id implies its level.
 */

const TABS = [
  { id: 'faculty', label: 'Faculty' },
  { id: 'technical', label: 'Technical Team' },
  { id: 'non-teaching', label: 'Non-Teaching' },
]

function Avatar({ photo, name }) {
  // A remote photo can fail (offline, moved file) — fall back to the icon
  // rather than showing a broken image.
  const [failed, setFailed] = useState(false)

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden bg-navy-100 flex items-center justify-center mb-4 shrink-0">
      {photo && !failed ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <UserRound size={36} className="text-navy-400" />
      )}
    </div>
  )
}

function FacultyCard({ member }) {
  return (
    <div className="glass-strong rounded-[22px] p-5 h-full flex flex-col items-center text-center transition-transform duration-350 hover:-translate-y-1">
      <Avatar photo={member.photo} name={member.name} />
      <h3 className="font-semibold text-navy-900 text-sm">{member.name}</h3>
      <p className="text-xs text-red-700 font-medium mt-1 leading-snug">{member.designation}</p>
      {member.role && <p className="text-[11px] text-slate-500 mt-0.5">{member.role}</p>}

      {/* Only the faculty with a converted profile document get a Read More
          link — the rest show the card alone rather than a dead route. */}
      {member.slug && (
        <Link
          to={`/about/cdoe-team/${member.slug}`}
          onMouseDown={createRipple}
          className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-navy-800 transition-colors duration-350"
        >
          <FileText size={13} />
          Read More
        </Link>
      )}
    </div>
  )
}

function StaffCard({ member }) {
  return (
    <div className="glass-strong rounded-[22px] p-5 flex flex-col items-center text-center transition-transform duration-350 hover:-translate-y-1">
      <Avatar photo={member.photo} name={member.name} />
      <h3 className="font-semibold text-navy-900 text-sm">{member.name}</h3>
      <p className="text-xs text-red-700 font-medium mt-1 leading-snug">{member.designation}</p>
    </div>
  )
}

export default function CDOETeam() {
  const [searchParams, setSearchParams] = useSearchParams()

  // An unknown or missing ?tab= falls back to Faculty rather than an empty page.
  const requested = (searchParams.get('tab') || '').toLowerCase()
  const activeTab = TABS.some((t) => t.id === requested) ? requested : 'faculty'

  // Faculty's own UG / PG level and programme tab, resolved the same way.
  // A known ?programme= settles the level on its own, so links written before
  // the UG / PG split (?tab=faculty&programme=mca) still land correctly.
  const requestedLevel = (searchParams.get('level') || '').toLowerCase()
  const requestedProgramme = (searchParams.get('programme') || '').toLowerCase()
  const programmeFromUrl = facultyProgrammeById[requestedProgramme]

  const activeLevelId =
    programmeFromUrl?.level ??
    (facultyLevels.some((l) => l.id === requestedLevel) ? requestedLevel : 'pg')

  const activeLevel = facultyLevels.find((l) => l.id === activeLevelId) ?? facultyLevels[1]

  // Switching level lands on that level's first programme.
  const activeProgramme =
    programmeFromUrl?.level === activeLevel.id ? programmeFromUrl : activeLevel.programmes[0]

  const facultyList = getFacultyForProgramme(activeProgramme)

  // Switching to Faculty keeps whichever programme was last open; every other
  // tab drops the parameters so they do not linger in the URL.
  const selectTab = (id) =>
    setSearchParams(
      id === 'faculty'
        ? { tab: id, level: activeLevel.id, programme: activeProgramme.id }
        : { tab: id },
    )

  const selectLevel = (level) =>
    setSearchParams({ tab: 'faculty', level: level.id, programme: level.programmes[0].id })

  const selectProgramme = (id) =>
    setSearchParams({ tab: 'faculty', level: activeLevel.id, programme: id })

  return (
    <AboutLayout
      title="CDOE Team"
      lede="The faculty, technical team and non-teaching staff of the Centre for Distance and Online Education."
    >
      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="CDOE Team"
        className="inline-flex flex-wrap glass-strong rounded-full p-1 mb-8"
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => selectTab(id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-350 ${
              activeTab === id
                ? 'bg-navy-800/90 text-white shadow-glow-navy'
                : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Faculty — UG / PG first, then one programme at a time within the level */}
      {activeTab === 'faculty' && (
        <div>
          {/* Level: UG Programmes / PG Programmes */}
          <div
            role="tablist"
            aria-label="Faculty by level"
            className="inline-flex flex-wrap gap-1 glass rounded-full p-1 mb-4"
          >
            {facultyLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                role="tab"
                aria-selected={activeLevel.id === level.id}
                onClick={() => selectLevel(level)}
                className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors duration-350 ${
                  activeLevel.id === level.id
                    ? 'bg-navy-800/90 text-white'
                    : 'text-slate-600 hover:text-navy-800 hover:bg-white/50'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>

          {/* Programmes inside the chosen level */}
          <div
            role="tablist"
            aria-label={`${activeLevel.label} — faculty by programme`}
            className="flex flex-wrap gap-2 mb-6"
          >
            {activeLevel.programmes.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeProgramme.id === id}
                onClick={() => selectProgramme(id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-350 ${
                  activeProgramme.id === id
                    ? 'border-transparent bg-gold/90 text-navy-900'
                    : 'border-white/70 glass text-slate-600 hover:text-navy-800 hover:bg-white/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {facultyList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {facultyList.map((member) => (
                <FacultyCard key={member.slug ?? member.name} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Faculty for {activeProgramme.label} will be listed here shortly.
            </p>
          )}
        </div>
      )}

      {activeTab === 'technical' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {technicalTeam.map((member) => (
            <StaffCard key={member.name} member={member} />
          ))}
        </div>
      )}

      {activeTab === 'non-teaching' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {nonTeaching.map((member) => (
            <StaffCard key={member.name} member={member} />
          ))}
        </div>
      )}

      {/* CDOE support */}
      <div className="glass-card mt-10 p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <p className="text-sm font-semibold text-navy-800 min-h-[32px] py-1">CDOE Support</p>
        <a
          href="tel:+919790953750"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350"
        >
          <Phone size={14} /> +91 97909 53750
        </a>
        <a
          href="mailto:cdoesupport@crescent.education"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350"
        >
          <Mail size={14} /> cdoesupport@crescent.education
        </a>
      </div>
    </AboutLayout>
  )
}
