import { Link, useParams } from 'react-router-dom'
import { ArrowRight, FileText, Mail, Phone } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import ProjectSidebar from '../components/ProjectSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { projectSections, getProjectSection } from '../data/projects.js'
import { documentUrl } from '../data/documents.js'
import { admissionEmails, admissionContacts } from '../data/admission.js'

/*
 * PROJECT — /project, /project/mba, /project/mca
 * ---------------------------------------------------------------------------
 * The Project menu on the official CDOE site is two document pages, one per
 * programme. Same here, with one difference: every PDF is served from this site
 * and opens in this site's viewer rather than on the Institute's server.
 */

/*
 * A document row. The href is the bundled PDF itself, so a click opens it
 * straight away in a new tab and this page stays put.
 *
 * A file that is not in src/assets/PDF yet renders as a placeholder "#" link —
 * identical row, goes nowhere, and the click is swallowed so the page does not
 * jump to the top.
 */
function DocumentRow({ doc, title, meta, description }) {
  const url = documentUrl(doc)

  const body = (
    <>
      <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center shrink-0 text-crimson-600">
        <FileText size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-navy-800">{title}</p>
        {meta && <p className="text-sm text-slate-500 mt-0.5">{meta}</p>}
        {description && (
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{description}</p>
        )}
      </div>
      <span className="text-xs font-medium text-slate-400 shrink-0 group-hover:text-navy-800 transition-colors duration-350">
        PDF
      </span>
    </>
  )

  if (!url) {
    return (
      <a href="#" onClick={(e) => e.preventDefault()} className="glass-card p-5 flex items-start gap-4 group">
        {body}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-5 flex items-start gap-4 group"
    >
      {body}
    </a>
  )
}

/** Landing view at /project — both programmes as cards. */
function Overview() {
  return (
    <>
      <PageHeader
        eyebrow="CDOE · Project"
        title="Project"
        lede="The project work carried out in the final stage of the MBA and MCA programmes — guidelines, review formats and the prescribed report format."
        className="mb-8"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {projectSections.map(({ slug, label, blurb, documents }) => (
          <Link key={slug} to={`/project/${slug}`} className="glass-card p-5 flex flex-col">
            <h2 className="font-semibold text-navy-800 mb-2">{label}</h2>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{blurb}</p>
            <p className="flex items-center gap-2 text-sm font-medium text-crimson-600 mt-4">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
              <ArrowRight size={14} />
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}

function Section({ section }) {
  const { heading, blurb, documents, label, programmePath } = section
  const helpline = admissionContacts.find((c) => c.programme === label)

  return (
    <>
      <PageHeader eyebrow="CDOE · Project" title={heading} lede={blurb} className="mb-8" />

      <div className="space-y-3 mb-8">
        {documents.map((item) => (
          <DocumentRow key={item.doc} {...item} />
        ))}
      </div>

      <p className="text-xs text-slate-400 mb-8">
        Documents are served from this site and open directly in a new tab — nothing
        links out to an external server.
      </p>

      <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <p className="text-sm font-semibold text-navy-800">Questions about your project?</p>
        {helpline && (
          <a
            href={`tel:${helpline.tel}`}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350 tabular-nums"
          >
            <Phone size={14} /> {helpline.phone}
          </a>
        )}
        <a
          href={`mailto:${admissionEmails.enquiry}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350 break-all"
        >
          <Mail size={14} /> {admissionEmails.enquiry}
        </a>
      </div>

      <Link
        to={programmePath}
        className="inline-flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-crimson-600 transition-colors duration-350 mt-6"
      >
        About the {label} programme <ArrowRight size={14} />
      </Link>
    </>
  )
}

export default function Project() {
  const { section: slug } = useParams()
  const { ref, className } = useReveal()
  const section = slug ? getProjectSection(slug) : null

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <ProjectSidebar />

        <div className="flex-1 min-w-0">
          {slug && !section ? (
            <>
              <PageHeader
                title="Project page not found"
                lede="That project page doesn't exist. Pick a programme below."
                className="mb-8"
              />
              <Overview />
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
