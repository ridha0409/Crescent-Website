import {
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import AdmissionSidebar from '../components/AdmissionSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import {
  applySteps,
  admissionContacts,
  admissionEmails,
  grievanceHelpline,
  campusAddress,
  paymentModes,
  admissionLinks,
} from '../data/admission.js'

export default function HowToApply() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <AdmissionSidebar />

        <div className="flex-1 min-w-0">
          <PageHeader
            eyebrow="CDOE · Admission"
            title="How to Apply"
            lede="Admission to every online programme is completed entirely online, in four steps — register, log in, fill the form, pay the fee."
            className="mb-8"
          />

          {/* Steps — numbered because the order is mandatory, not decorative */}
          <ol className="space-y-4 mb-10 list-none p-0">
            {applySteps.map((step, i) => (
              <li key={step.title} className="glass-card p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-full glass-btn-solid text-white text-sm font-bold tabular-nums">
                    {i + 1}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold text-navy-800 mb-1.5">{step.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>

                    {step.note && (
                      <p className="mt-3 flex items-start gap-2 text-sm text-crimson-600 bg-crimson-50 border border-crimson-100 rounded-xl px-3 py-2">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{step.note}</span>
                      </p>
                    )}

                    {step.action && (
                      <a
                        href={step.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseDown={createRipple}
                        className="glass-btn text-navy-800 px-5 py-2 text-sm mt-4"
                      >
                        {step.action.label} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Payment modes */}
          <div className="glass rounded-2xl p-5 mb-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-800 mb-3">
              <CreditCard size={18} className="text-crimson-600" />
              Accepted payment modes
            </h2>
            <div className="flex flex-wrap gap-2">
              {paymentModes.map((mode) => (
                <span
                  key={mode}
                  className="text-xs font-medium text-slate-600 bg-white/60 border border-white/70 rounded-full px-3.5 py-1.5"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>

          {/* Primary CTA pair */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={admissionLinks.newRegistration}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid px-6 py-3"
            >
              Start a new registration <ArrowRight size={16} />
            </a>
            <a
              href={admissionLinks.applicantLogin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-6 py-3"
            >
              Applicant login <ExternalLink size={15} />
            </a>
          </div>

          {/* Admission helplines */}
          <h2 className="text-xl font-bold text-navy-800 mb-1">Admission helpline</h2>
          <p className="text-slate-500 text-sm mb-5">
            Programme-wise numbers — call the one for the course you are applying to.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {admissionContacts.map(({ programme, phone, tel }) => (
              <a
                key={programme}
                href={`tel:${tel}`}
                className="glass-card p-5 block hover:text-navy-800"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  {programme}
                </p>
                <p className="flex items-center gap-2 font-semibold text-navy-800 tabular-nums">
                  <Phone size={15} className="text-crimson-600 shrink-0" />
                  {phone}
                </p>
              </a>
            ))}
          </div>

          <div className="glass rounded-2xl p-5 space-y-3">
            <p className="flex items-start gap-3 text-sm text-slate-600">
              <Mail size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span>
                General enquiries:{' '}
                <a
                  href={`mailto:${admissionEmails.enquiry}`}
                  className="text-navy-800 font-medium hover:underline"
                >
                  {admissionEmails.enquiry}
                </a>
                <br />
                Admissions:{' '}
                <a
                  href={`mailto:${admissionEmails.admissions}`}
                  className="text-navy-800 font-medium hover:underline"
                >
                  {admissionEmails.admissions}
                </a>
              </span>
            </p>

            <p className="flex items-start gap-3 text-sm text-slate-600">
              <AlertCircle size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span className="min-w-0 break-words">
                Grievance redressal for learners:{' '}
                <a
                  href={`tel:${grievanceHelpline.tel}`}
                  className="text-navy-800 font-medium hover:underline tabular-nums"
                >
                  {grievanceHelpline.phone}
                </a>{' '}
                ·{' '}
                <a
                  href={`mailto:${admissionEmails.grievances}`}
                  className="text-navy-800 font-medium hover:underline"
                >
                  {admissionEmails.grievances}
                </a>
              </span>
            </p>

            <p className="flex items-start gap-3 text-sm text-slate-600">
              <MapPin size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span>{campusAddress}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
