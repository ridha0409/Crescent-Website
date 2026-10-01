import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileText, FileWarning } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import { createRipple } from '../utils/ripple.js'
import { getDocument } from '../data/documents.js'

/*
 * DOCUMENT VIEWER — /document/:id
 * ---------------------------------------------------------------------------
 * Every PDF on the site opens here rather than on the Institute's servers. The
 * file is bundled with the site (src/assets/PDF, see data/documents.js), so the
 * visitor stays on this domain, keeps the header and footer around them, and
 * has a Back link to the page they came from.
 *
 * The PDF is embedded with <object>. Every current desktop browser renders it
 * inline with its own toolbar. Where it cannot — some mobile browsers refuse to
 * embed PDFs at all — <object> shows its children instead, so those visitors
 * get an explicit "Open the PDF" button rather than an empty grey rectangle.
 */

export default function DocumentViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ref, className } = useReveal()
  const doc = getDocument(id)

  const goBack = () => {
    // Prefer the page they came from; fall back to the UGC Corner index for a
    // link opened cold (a shared URL, a bookmark).
    if (window.history.length > 1) navigate(-1)
    else navigate('/ugc-corner')
  }

  if (!doc) {
    return (
      <section ref={ref} className={`container-xl py-10 ${className}`}>
        <PageHeader
          title="Document not found"
          lede="That document does not exist. It may have been renamed or withdrawn."
          className="mb-8"
        />
        <Link to="/ugc-corner" onMouseDown={createRipple} className="glass-btn text-navy-800 px-5 py-2.5">
          <ArrowLeft size={15} /> Back to UGC Corner
        </Link>
      </section>
    )
  }

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <button
        type="button"
        onClick={goBack}
        onMouseDown={createRipple}
        className="glass-btn text-navy-800 px-5 py-2 text-sm mb-6"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <PageHeader eyebrow="CDOE · Document" title={doc.title} className="mb-6" />

      {doc.url ? (
        <>
          <div className="glass-strong rounded-[24px] p-2 mb-5">
            <object
              data={doc.url}
              type="application/pdf"
              title={doc.title}
              className="w-full h-[70vh] min-h-[420px] rounded-[18px] bg-white"
            >
              {/* Shown only when the browser will not embed a PDF. */}
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 p-8">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-navy-800">
                  <FileText size={24} />
                </div>
                <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                  Your browser cannot display a PDF inside the page. Open it in its own
                  tab instead — it is still served from this site.
                </p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine glass-btn-solid px-5 py-2.5 text-sm"
                >
                  Open the PDF <FileText size={15} />
                </a>
              </div>
            </object>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={doc.url}
              download={doc.file}
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid px-5 py-2.5 text-sm"
            >
              Download <Download size={15} />
            </a>
            <p className="text-xs text-slate-400">
              Served from this site — nothing opens on an external server.
            </p>
          </div>
        </>
      ) : (
        /* Registered but the file is not in src/assets/PDF yet. */
        <div className="glass-strong rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-crimson-600 shrink-0">
            <FileWarning size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-navy-800">Yet to be published</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              This document has not been published yet. Please check back, or contact CDOE
              support at{' '}
              <a
                href="mailto:cdoesupport@crescent.education"
                className="text-crimson-600 font-medium hover:underline break-all"
              >
                cdoesupport@crescent.education
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
