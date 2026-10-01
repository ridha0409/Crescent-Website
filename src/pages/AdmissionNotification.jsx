import { Link } from 'react-router-dom'
import { FileText, Download, IndianRupee, ArrowRight, CheckCircle2 } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import AdmissionSidebar from '../components/AdmissionSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { notificationDocId, notificationHighlights } from '../data/admission.js'
import { documentUrl } from '../data/documents.js'

export default function AdmissionNotification() {
  const { ref, className } = useReveal()
  const { applicationFee, programmes } = notificationHighlights
  // Bundled with the site — the button opens the PDF itself in a new tab.
  const notificationUrl = documentUrl(notificationDocId)

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <AdmissionSidebar />

        <div className="flex-1 min-w-0">
          <PageHeader
            eyebrow="CDOE · Admission"
            title="Admission Notification"
            lede="Eligibility and application details for the online and open distance learning programmes, as published in the official admission notification."
            className="mb-8"
          />

          {/* Official document */}
          <div className="glass-strong rounded-[24px] p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-crimson-600 shrink-0">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-navy-800">
                Admission Notification — AY 2023
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Official PDF issued by the Centre for Distance and Online Education.
              </p>
            </div>
            {notificationUrl ? (
              <a
                href={notificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseDown={createRipple}
                className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
              >
                View PDF <Download size={15} />
              </a>
            ) : (
              /* File not in src/assets/PDF yet — placeholder "#", click inert. */
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                onMouseDown={createRipple}
                className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
              >
                View PDF <Download size={15} />
              </a>
            )}
          </div>

          {/* Application fee */}
          <div className="glass rounded-2xl p-5 mb-8 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full glass-strong flex items-center justify-center text-navy-800 shrink-0">
              <IndianRupee size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Application fee
              </p>
              <p className="text-xl font-bold text-navy-800 tabular-nums">
                {applicationFee}
              </p>
            </div>
          </div>

          {/* Eligibility by programme */}
          <h2 className="text-xl font-bold text-navy-800 mb-4">Eligibility</h2>

          <div className="space-y-4 mb-10">
            {programmes.map(({ name, eligibility, selection }) => (
              <div key={name} className="glass-card p-5 sm:p-6">
                <h3 className="font-semibold text-navy-800 mb-3">{name}</h3>

                <p className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-crimson-600 shrink-0 mt-0.5" />
                  <span>{eligibility}</span>
                </p>

                {selection && (
                  <p className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed mt-2.5">
                    <CheckCircle2 size={16} className="text-crimson-600 shrink-0 mt-0.5" />
                    <span>{selection}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admission/how-to-apply"
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid px-6 py-3"
            >
              How to apply <ArrowRight size={16} />
            </Link>
            <Link
              to="/programmes"
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-6 py-3"
            >
              Browse programmes <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
