import { Link, useParams } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import UgcCornerSidebar from '../components/UgcCornerSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { ugcSections, getUgcSection, ugcDocumentCount } from '../data/ugcCorner.js'
import { documentUrl } from '../data/documents.js'

/*
 * One document row. The href is the bundled PDF itself, so a click opens the
 * document straight away in a new tab — no interstitial page, and this page
 * stays put behind it. The file is served from this site, never an external
 * server.
 *
 * A document whose file is not in src/assets/PDF yet renders as a placeholder
 * "#" link — the same row, same styling, but it goes nowhere. The default jump
 * to the top of the page is suppressed so a click is simply inert.
 */
function DocumentCard({ title, meta, doc }) {
  const url = documentUrl(doc)

  const body = (
    <>
      <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center shrink-0 text-crimson-600">
        <FileText size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-navy-800">{title}</p>
        {meta && <p className="text-sm text-slate-500 mt-0.5">{meta}</p>}
      </div>
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 shrink-0 group-hover:text-navy-800 transition-colors duration-350">
        PDF
      </span>
    </>
  )

  if (!url) {
    return (
      <a href="#" onClick={(e) => e.preventDefault()} className="glass-card p-5 flex items-center gap-4 group">
        {body}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-5 flex items-center gap-4 group"
    >
      {body}
    </a>
  )
}

/** The seven sections as cards — shared by the landing view and the fallback. */
function SectionGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
        {ugcSections.map(({ slug, label, blurb, documents }) => (
          <Link key={slug} to={`/ugc-corner/${slug}`} className="glass-card p-5 flex flex-col">
            <h2 className="font-semibold text-navy-800 mb-2">{label}</h2>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{blurb}</p>
            <p className="flex items-center gap-2 text-sm font-medium text-crimson-600 mt-4">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
              <ArrowRight size={14} />
            </p>
          </Link>
        ))}
    </div>
  )
}

/** Landing view: an intro plus every section. */
function Overview() {
  return (
    <>
      <PageHeader
        title="UGC Corner"
        lede={`Approvals, notifications, compliance filings and admission lists published for the Institute's online programmes — ${ugcDocumentCount} documents in ${ugcSections.length} sections.`}
        className="mb-8"
      />

      <SectionGrid />
    </>
  )
}

/** Section view: the documents of one dropdown item. */
function Section({ section }) {
  const { heading, blurb, documents, grouped } = section

  // Admission lists are published per admission cycle, so they render under
  // year headings; every other section is a flat list.
  const groups = grouped
    ? documents.reduce((acc, item) => {
        const key = item.group || 'Other'
        ;(acc[key] = acc[key] || []).push(item)
        return acc
      }, {})
    : null

  return (
    <>
      <PageHeader
        eyebrow="CDOE · UGC Corner"
        title={heading}
        lede={blurb}
        className="mb-8"
      />

      {grouped ? (
        <div className="space-y-8">
          {Object.entries(groups).map(([year, docs]) => (
            <div key={year}>
              <h2 className="text-sm font-semibold text-navy-800 uppercase tracking-wide mb-3 pb-2 border-b border-white/60">
                {year}
              </h2>
              <div className="space-y-3">
                {docs.map((item) => (
                  <DocumentCard key={item.doc} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((item) => (
            <DocumentCard key={item.doc} {...item} />
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-8">
        Documents are served from this site and open directly in a new tab — nothing
        links out to an external server.
      </p>
    </>
  )
}

export default function UGCCorner() {
  const { section: slug } = useParams()
  const { ref, className } = useReveal()
  const section = slug ? getUgcSection(slug) : null

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <UgcCornerSidebar />

        <div className="flex-1 min-w-0">
          {slug && !section ? (
            <>
              <PageHeader
                title="Section not found"
                lede="That UGC Corner section doesn't exist. Pick one from the list below."
                className="mb-8"
              />
              <SectionGrid />
            </>
          ) : section ? (
            <Section section={section} />
          ) : (
            <Overview />
          )}
        </div>
      </div>
    </section>
  )
}
