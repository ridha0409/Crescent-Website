import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, UserRound, Mail, ExternalLink, ChevronRight } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import { getFacultyBySlug } from '../data/cdoeTeam.js'

/* ------------------------------------------------------------------ */
/* which tab a section belongs to                                      */
/* ------------------------------------------------------------------ */

function tabFor(title) {
  const t = title.toLowerCase()
  if (/skill/.test(t)) return 'overview'
  if (
    /executed|conducted|organiz|attended|fdp|workshop|seminar|webinar|quiz|certificat|resource person|reviewer|session chair|guest lecture|achievement|refresher|award|membership|delivered/.test(
      t,
    )
  )
    return 'activities'
  if (/publication|journal|book|patent|conference|paper|scopus|ieee|project/.test(t))
    return 'publications'
  if (/responsibilit|examination|curriculum/.test(t)) return 'experience'
  return 'activities'
}

const RAIL_RE = /^(\d{1,4}|various)$/i

/* ------------------------------------------------------------------ */
/* presentation primitives                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({ children }) {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-5">
      {children}
    </h2>
  )
}

function Tag({ children }) {
  return (
    <span className="inline-block rounded bg-navy-50/80 text-navy-700 text-[11px] font-medium px-2 py-[3px]">
      {children}
    </span>
  )
}

/**
 * The single record row used everywhere — education, experience,
 * publications, conferences. Left rail carries the year / number,
 * then a bold title, a quiet meta line, and short values as tags.
 */
function Record({ rail, railWidth = '3.5rem', title, meta, tags = [] }) {
  return (
    <li
      className="grid gap-x-6 gap-y-1 py-4 border-b border-navy-900/[0.06] last:border-0 first:pt-0 sm:grid-cols-[var(--rail)_1fr]"
      style={{ '--rail': railWidth }}
    >
      {rail ? (
        <span className="text-[12px] font-semibold text-slate-400 tabular-nums leading-6">
          {rail}
        </span>
      ) : (
        <span className="hidden sm:block" />
      )}
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-navy-900 leading-[1.45]">{title}</p>
        {meta && (
          <p className="text-[13px] text-slate-500 leading-relaxed mt-1">{meta}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

function RecordList({ children }) {
  return <ol className="divide-y-0">{children}</ol>
}

/* Key–value pairs (Technical Skills, profile details) */
function DefinitionList({ rows, labelWidth = '13rem' }) {
  return (
    <dl className="divide-y divide-navy-900/[0.06]">
      {rows.map(([label, ...rest], i) => (
        <div
          key={i}
          className="grid gap-x-6 gap-y-0.5 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[var(--l)_1fr]"
          style={{ '--l': labelWidth }}
        >
          <dt className="text-[13px] font-semibold text-navy-900">{label}</dt>
          <dd className="text-[13px] text-slate-600 leading-relaxed">
            {rest.filter(Boolean).join(' · ')}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* Plain prose list — numbered rail keeps it scannable */
function ProseList({ items }) {
  return (
    <RecordList>
      {items.map((item, i) => (
        <Record key={i} rail={String(i + 1).padStart(2, '0')} railWidth="2.5rem" title={item} />
      ))}
    </RecordList>
  )
}

/* A table from the data file, rendered as records instead of a grid */
function TableAsRecords({ columns, rows }) {
  const railed = rows.every((r) => RAIL_RE.test(String(r[0]).trim()))

  if (!railed) return <DefinitionList rows={rows} />

  const numbering = rows.every((r) => /^\d{1,3}$/.test(String(r[0]).trim()))

  return (
    <RecordList>
      {rows.map((row, i) => {
        const [first, title, ...rest] = row
        const values = rest
          .map((v, j) => ({ v: String(v ?? '').trim(), label: columns[j + 2] }))
          .filter((x) => x.v && x.v !== '–' && x.v !== '-')
        const meta = values.filter((x) => x.v.length > 34).map((x) => x.v).join(' · ')
        const tags = values
          .filter((x) => x.v.length <= 34)
          // a bare number tells the reader nothing — keep its column label
          .map((x) => (/^[\d.]+$/.test(x.v) && x.label ? `${x.label} ${x.v}` : x.v))
        return (
          <Record
            key={i}
            rail={numbering ? String(first).padStart(2, '0') : first}
            railWidth={numbering ? '2.5rem' : '3.5rem'}
            title={title}
            meta={meta}
            tags={tags}
          />
        )
      })}
    </RecordList>
  )
}

function SectionBody({ section }) {
  if (section.type === 'table') {
    return <TableAsRecords columns={section.columns} rows={section.rows} />
  }
  if (section.type === 'groups') {
    return (
      <div className="space-y-8">
        {section.groups.map((g) => (
          <div key={g.heading}>
            <h3 className="text-[12px] font-semibold text-navy-800 mb-3">{g.heading}</h3>
            <ProseList items={g.items} />
          </div>
        ))}
      </div>
    )
  }
  if (section.type === 'text') {
    return (
      <div className="space-y-3">
        {section.body.map((p, i) => (
          <p key={i} className="text-[14px] text-slate-600 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    )
  }
  return <ProseList items={section.items} />
}

function Block({ title, children }) {
  return (
    <section className="pt-10 first:pt-0">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

const TAB_ORDER = [
  ['overview', 'Overview'],
  ['experience', 'Experience'],
  ['publications', 'Publications'],
  ['activities', 'Activities'],
]

export default function FacultyProfile() {
  const { slug } = useParams()
  const member = getFacultyBySlug(slug)

  const grouped = useMemo(() => {
    const g = { overview: [], experience: [], publications: [], activities: [] }
    ;(member?.sections || []).forEach((s) => g[tabFor(s.title)].push(s))
    return g
  }, [member])

  const available = useMemo(() => {
    if (!member) return []
    return TAB_ORDER.filter(([key]) => {
      if (key === 'overview') return true
      if (key === 'experience')
        return member.experience?.length > 0 || grouped.experience.length > 0
      return grouped[key].length > 0
    })
  }, [member, grouped])

  const [tab, setTab] = useState('overview')

  useEffect(() => {
    setTab('overview')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!member) {
    return (
      <div className="container-xl py-24 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-3">Profile not found</h1>
        <p className="text-slate-500 text-sm mb-6">
          We couldn’t find the faculty profile you were looking for.
        </p>
        <Link
          to="/about/cdoe-team"
          onMouseDown={createRipple}
          className="glass-btn text-navy-800 px-5 py-2 text-sm"
        >
          <ArrowLeft size={14} /> Back to CDOE Team
        </Link>
      </div>
    )
  }

  const details = [
    ['Designation', member.designation],
    member.role && ['Additional Role', member.role],
    ['Programme', `${member.programme} (Online)`],
    ['Nature of Employment', member.employment],
    ['Qualification', member.qualification],
  ].filter(Boolean)

  return (
    <div className="container-xl py-8 sm:py-12">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-6">
        <Link to="/about" className="hover:text-navy-800 transition-colors duration-350">
          About Us
        </Link>
        <ChevronRight size={13} />
        <Link to="/about/cdoe-team" className="hover:text-navy-800 transition-colors duration-350">
          CDOE Team
        </Link>
        <ChevronRight size={13} />
        <span className="text-navy-800 font-medium truncate">{member.name}</span>
      </nav>

      <article className="glass-strong rounded-[24px] px-6 sm:px-10 lg:px-14 py-9 sm:py-12">
        {/* ---------------- masthead ---------------- */}
        <header className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="min-w-0 order-2 sm:order-1">
            <p className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">
              {member.programme} Programme · Faculty
            </p>
            <h1 className="text-[30px] sm:text-[40px] font-bold text-navy-900 tracking-tight leading-[1.1] mt-3">
              {member.name}
            </h1>
            <span className="block w-12 h-[3px] bg-gold rounded-full mt-5" />

            <p className="text-[15px] text-slate-600 mt-5">
              {member.designation}
              {member.role && <span className="text-slate-400"> · {member.role}</span>}
            </p>
            <p className="text-[13px] text-slate-400 mt-1.5">{member.qualification}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-[13px] text-navy-700 hover:text-navy-900 underline-offset-4 hover:underline transition-colors duration-350"
                >
                  <Mail size={14} /> {member.email}
                </a>
              )}
              {member.profileLink && (
                <a
                  href={member.profileLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-navy-700 hover:text-navy-900 underline-offset-4 hover:underline transition-colors duration-350"
                >
                  <ExternalLink size={14} /> {member.profileLink.label}
                </a>
              )}
            </div>
          </div>

          <div className="order-1 sm:order-2 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-navy-50 flex items-center justify-center shrink-0 ring-1 ring-navy-900/[0.06]">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <UserRound size={44} className="text-navy-200" />
            )}
          </div>
        </header>

        {/* ---------------- key figures ---------------- */}
        {member.stats?.length > 0 && (
          <div className="mt-9 pt-7 border-t border-navy-900/[0.07] grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap">
            {member.stats.map(([value, label], i) => (
              <div
                key={label}
                className={`sm:pr-10 ${
                  i > 0 ? 'sm:pl-10 sm:border-l sm:border-navy-900/[0.07]' : ''
                }`}
              >
                <p className="text-[22px] sm:text-2xl font-bold text-navy-900 leading-none tabular-nums">
                  {value}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- tabs ---------------- */}
        <div className="relative mt-9 border-b border-navy-900/[0.09]">
          {/* fade hints that the tab row scrolls on narrow screens */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/90 to-transparent sm:hidden"
          />
          <div className="flex gap-5 sm:gap-9 overflow-x-auto scrollbar-hide">
            {available.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative -mb-px shrink-0 pb-3.5 text-[12.5px] sm:text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors duration-350 ${
                  tab === key
                    ? 'text-navy-900 border-gold'
                    : 'text-slate-400 border-transparent hover:text-navy-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- tab panels ---------------- */}
        <div className="pt-9">
          {tab === 'overview' && (
            <>
              {member.summary && (
                <p className="text-[15px] text-slate-600 leading-relaxed max-w-3xl mb-10">
                  {member.summary}
                </p>
              )}

              <Block title="Profile Details">
                <DefinitionList rows={details} />
              </Block>

              {member.education?.length > 0 && (
                <Block title="Educational Background">
                  <RecordList>
                    {member.education.map(([degree, discipline, year, university], i) => (
                      <Record
                        key={i}
                        rail={year}
                        railWidth="5.5rem"
                        title={`${degree} — ${discipline}`}
                        meta={university}
                      />
                    ))}
                  </RecordList>
                </Block>
              )}

              {member.research?.length > 0 && (
                <Block title="Area of Research Interest">
                  <div className="flex flex-wrap gap-2">
                    {member.research.map((r) => (
                      <span
                        key={r}
                        className="rounded-md bg-navy-50/80 text-navy-800 text-[12.5px] font-medium px-3 py-1.5"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </Block>
              )}

              {member.courses?.length > 0 && (
                <Block title="Lecture Courses Delivered">
                  <p className="text-[14px] text-slate-600 leading-[1.85] max-w-3xl">
                    {member.courses.join(' · ')}
                  </p>
                </Block>
              )}

              {grouped.overview.map((s) => (
                <Block key={s.title} title={s.title}>
                  <SectionBody section={s} />
                </Block>
              ))}

              {member.note && (
                <p className="text-[13px] text-slate-500 leading-relaxed mt-10">{member.note}</p>
              )}
            </>
          )}

          {tab === 'experience' && (
            <>
              {member.experience?.length > 0 && (
                <Block title="Work Experience">
                  <RecordList>
                    {member.experience.map(([role, place, duration], i) => (
                      <Record
                        key={i}
                        rail={duration}
                        railWidth="11rem"
                        title={role}
                        meta={place}
                      />
                    ))}
                  </RecordList>
                </Block>
              )}
              {grouped.experience.map((s) => (
                <Block key={s.title} title={s.title}>
                  <SectionBody section={s} />
                </Block>
              ))}
            </>
          )}

          {tab === 'publications' &&
            grouped.publications.map((s) => (
              <Block key={s.title} title={s.title}>
                <SectionBody section={s} />
              </Block>
            ))}

          {tab === 'activities' &&
            grouped.activities.map((s) => (
              <Block key={s.title} title={s.title}>
                <SectionBody section={s} />
              </Block>
            ))}
        </div>

        {/* ---------------- footer ---------------- */}
        <footer className="mt-12 pt-6 border-t border-navy-900/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-lg">
            Profile published by the Centre for Distance and Online Education, B.S. Abdur
            Rahman Crescent Institute of Science and Technology.
          </p>
          <Link
            to="/about/cdoe-team"
            onMouseDown={createRipple}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-700 hover:text-navy-900 underline-offset-4 hover:underline transition-colors duration-350 shrink-0"
          >
            <ArrowLeft size={14} /> Back to CDOE Team
          </Link>
        </footer>
      </article>
    </div>
  )
}
