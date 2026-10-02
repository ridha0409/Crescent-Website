import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  IndianRupee,
  ScrollText,
  BookOpen,
  FileDown,
  ExternalLink,
  FileText,
  Globe,
} from 'lucide-react'
import { documentUrl, getDocument } from '../data/documents.js'

/**
 * ProgrammeTabs — the five-panel card on a programme page.
 *
 * Mirrors the per-programme submenu on the official CDOE site:
 *   People · Eligibility & Fee Structure · Regulations · Syllabus · Brochure
 *
 * People and Eligibility are rendered in place. Regulations and Brochure are
 * PDFs bundled with this site — the button opens the file directly in a new tab,
 * never on an external server and never via an interstitial page. The Syllabus
 * is published by the Institute as a web page rather than a document, so that
 * one panel is still an outbound link.
 */

/*
 * The tab strip is deliberately neutral: soft grey while idle, dark grey once
 * selected. It used to give each tab its own colour (blue / green / amber /
 * violet / rose), which fought with the page rather than framing it.
 */
const TAB_IDLE =
  'bg-slate-100/70 text-slate-600 border-slate-200 hover:bg-slate-200/70 hover:text-navy-800'
const TAB_ACTIVE = 'bg-slate-700 text-white border-slate-700 shadow-card'

const TABS = [
  { id: 'people', label: 'People', icon: Users },
  { id: 'eligibility', label: 'Eligibility & Fee Structure', icon: IndianRupee },
  { id: 'regulations', label: 'Regulations', icon: ScrollText },
  { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
  { id: 'brochure', label: 'Brochure', icon: FileDown },
]

function FeeTable({ title, rows }) {
  if (!rows?.length) return null

  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
        {title}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map(({ item, amount }) => (
              <tr key={item} className="border-b border-white/60 last:border-0">
                <td className="py-2.5 pr-4 text-slate-600">{item}</td>
                <td className="py-2.5 text-right font-semibold text-navy-800 tabular-nums whitespace-nowrap">
                  {amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * One person, laid out like the Institute's own people pages: portrait above,
 * name, then designation.
 *
 * Portraits that are bundled with the site always load. The rest are served
 * from the Institute's own host and some of them do not resolve — the BA
 * Islamic Studies faculty in particular had no portrait rendering at all. So a
 * missing or failing portrait falls back to a designed navy avatar carrying the
 * person's initials, which reads as intentional instead of as a broken image.
 * Dropping the real JPG into src/assets/faculty and importing it in
 * data/programmeDetails.js is all it takes to replace an avatar with a photo.
 */
function PersonCard({ name, role, photo }) {
  const [failed, setFailed] = useState(false)

  const initials = name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Moulavi)\s*/gi, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[^A-Za-z]/g, ''))
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const showPhoto = Boolean(photo) && !failed

  return (
    <div className="glass rounded-2xl p-4 text-center flex flex-col items-center">
      <div
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 mb-3
                   ring-1 ring-white/70 shadow-card flex items-center justify-center
                   bg-gradient-to-br from-navy-600 to-navy-900"
      >
        {showPhoto ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Designed fallback avatar — initials on the brand navy gradient. */
          <span
            aria-hidden="true"
            className="w-full h-full flex items-center justify-center
                       text-white font-bold text-xl sm:text-2xl tracking-wide select-none"
          >
            {initials || <Users size={24} />}
          </span>
        )}
      </div>

      <p className="font-medium text-navy-800 text-sm leading-snug text-balance">{name}</p>
      <p className="text-xs text-slate-500 mt-1 leading-snug">{role}</p>
    </div>
  )
}

/**
 * Regulations / Syllabus / Brochure. Each of these is a document the Institute
 * hosts, so the panel says what the document is and links out to it. A document
 * the Institute has not published yet renders as a clearly-marked note rather
 * than a dead button.
 */
/**
 * Regulations / Syllabus / Brochure.
 *
 * `doc` is a registry id (src/data/documents.js): a PDF bundled with this site,
 * opened in the site's own viewer. `href` is the escape hatch for the Syllabus,
 * which the Institute publishes as a page on its own site.
 */
function DocumentPanel({ title, description, doc, href, cta, download = false }) {
  const localUrl = doc ? documentUrl(doc) : null
  // Brochures save straight to the visitor's device under their real name.
  const downloadName = download && doc ? getDocument(doc)?.file : undefined

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-navy-800">{title}</h3>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{description}</p>

        <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
          {href && !localUrl ? (
            <>
              <Globe size={13} className="shrink-0" />
              Opens on the Institute site in a new tab
            </>
          ) : (
            <>
              <FileText size={13} className="shrink-0" />
              {downloadName ? 'PDF · downloads to your device' : 'PDF · opens in a new tab, served from this site'}
            </>
          )}
        </p>
      </div>

      {localUrl && downloadName ? (
        <a
          href={localUrl}
          download={downloadName}
          className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
        >
          {cta} <FileDown size={14} />
        </a>
      ) : localUrl ? (
        <a
          href={localUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
        >
          {cta} <FileText size={14} />
        </a>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
        >
          {cta} <ExternalLink size={14} />
        </a>
      ) : (
        /* File not in src/assets/PDF yet — a placeholder "#" that goes nowhere,
           with the jump-to-top suppressed so the click is simply inert. */
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
        >
          {cta} <FileText size={14} />
        </a>
      )}
    </div>
  )
}

export default function ProgrammeTabs({ details, programmeName }) {
  const [active, setActive] = useState('people')
  const tabRefs = useRef({})

  if (!details) return null

  const { people, eligibility, selection, fees, documents } = details

  // Left/Right/Home/End move between tabs, the way a tablist is expected to.
  const onTabKeyDown = (event) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 }
    let nextIndex = null
    const current = TABS.findIndex((t) => t.id === active)

    if (event.key in keys) {
      nextIndex = (current + keys[event.key] + TABS.length) % TABS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = TABS.length - 1
    }

    if (nextIndex === null) return
    event.preventDefault()
    const nextId = TABS[nextIndex].id
    setActive(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <div className="glass-strong rounded-[24px] overflow-hidden mb-10">
      {/* Tab strip — scrolls sideways on phones instead of wrapping into a mess */}
      <div
        role="tablist"
        aria-label={`${programmeName} information`}
        onKeyDown={onTabKeyDown}
        className="flex gap-2 p-2 overflow-x-auto scrollbar-hide"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el
              }}
              id={`tab-${id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium whitespace-nowrap
                          transition-colors duration-350 ${isActive ? TAB_ACTIVE : TAB_IDLE}`}
            >
              <Icon size={15} className="shrink-0" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="p-5 sm:p-6 border-t border-slate-200">
        {active === 'people' && (
          <div
            id="panel-people"
            role="tabpanel"
            aria-labelledby="tab-people"
            tabIndex={0}
          >
            {people?.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {people.map(({ name, role, photo }) => (
                  <PersonCard key={name} name={name} role={role} photo={photo} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                The faculty list for this programme will be published shortly.
              </p>
            )}
          </div>
        )}

        {active === 'eligibility' && (
          <div
            id="panel-eligibility"
            role="tabpanel"
            aria-labelledby="tab-eligibility"
            tabIndex={0}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold text-navy-800 mb-2">Eligibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{eligibility}</p>
            </div>

            {selection && (
              <div>
                <h3 className="font-semibold text-navy-800 mb-2">Selection</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selection}</p>
              </div>
            )}

            {fees && (
              <div>
                <h3 className="font-semibold text-navy-800 mb-3">Fee structure</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FeeTable title="Indian Nationals" rows={fees.indian} />
                  <FeeTable title="Foreign Nationals" rows={fees.foreign} />
                </div>

                {documents?.brochure && documentUrl(documents.brochure) && (
                  <p className="text-xs text-slate-400 mt-4">
                    The complete fee schedule is set out in the{' '}
                    <a
                      href={documentUrl(documents.brochure)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-crimson-600 font-medium hover:underline"
                    >
                      programme brochure
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {active === 'regulations' && (
          <div
            id="panel-regulations"
            role="tabpanel"
            aria-labelledby="tab-regulations"
            tabIndex={0}
          >
            <DocumentPanel
              title="Programme regulations"
              description="The academic regulations governing this programme — attendance, assessment, credit requirements and the award of the degree."
              doc={documents?.regulations}
              cta="View regulations"
            />
          </div>
        )}

        {active === 'syllabus' && (
          <div
            id="panel-syllabus"
            role="tabpanel"
            aria-labelledby="tab-syllabus"
            tabIndex={0}
          >
            <DocumentPanel
              title="Syllabus"
              description="The full semester-by-semester course structure, with course codes, credits and electives."
              href={documents?.syllabusHref}
              cta="View syllabus"
            />
          </div>
        )}

        {active === 'brochure' && (
          <div
            id="panel-brochure"
            role="tabpanel"
            aria-labelledby="tab-brochure"
            tabIndex={0}
          >
            <DocumentPanel
              title="Programme brochure"
              description="The printable brochure covering the programme at a glance — structure, fees, eligibility and how to apply."
              doc={documents?.brochure}
              cta="Download brochure"
              download
            />
          </div>
        )}
      </div>
    </div>
  )
}
