import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Navigation,
  LifeBuoy,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import { createRipple } from '../utils/ripple.js'
import {
  campus,
  mapEmbedUrl,
  mapDirectionsUrl,
  contactEmails,
  admissionContacts,
  admissionEmails,
  grievanceHelpline,
} from '../data/contact.js'
import { admissionLinks } from '../data/admission.js'

export default function Contact() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <PageHeader
        title="Contact"
        lede="Every programme has its own admission helpline, and learners have a dedicated grievance line. Reach the one that fits — they are answered by different desks."
        className="mb-10"
      />

      {/* Programme helplines */}
      <h2 className="text-xl font-bold text-navy-800 mb-1">Admission helpline</h2>
      <p className="text-slate-500 text-sm mb-5">
        Call the number for the programme you are applying to.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {admissionContacts.map(({ programme, phone, tel }) => (
          <a key={programme} href={`tel:${tel}`} className="glass-card p-5 block">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2">
              {programme}
            </p>
            <p className="flex items-center gap-2 font-semibold text-navy-800 tabular-nums">
              <Phone size={15} className="text-crimson-600 shrink-0" />
              {phone}
            </p>
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        {/* Address */}
        <div className="glass-strong rounded-[24px] p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-800 mb-4">
            <MapPin size={18} className="text-crimson-600" />
            Campus address
          </h2>

          <p className="text-sm font-medium text-navy-800">{campus.centre}</p>
          <p className="text-sm text-slate-600 mt-1">{campus.institute}</p>
          <address className="not-italic text-sm text-slate-600 leading-relaxed mt-3">
            {campus.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={createRipple}
            className="glass-btn text-navy-800 px-5 py-2.5 text-sm mt-5"
          >
            Get directions <Navigation size={14} />
          </a>
        </div>

        {/* Emails */}
        <div className="glass-strong rounded-[24px] p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-800 mb-4">
            <Mail size={18} className="text-crimson-600" />
            Email us
          </h2>

          <ul className="space-y-4">
            {contactEmails.map(({ label, email }) => (
              <li key={email}>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  {label}
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-navy-800 hover:underline break-all"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grievance line */}
      <div className="glass rounded-2xl p-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-11 h-11 rounded-full glass-strong flex items-center justify-center text-crimson-600 shrink-0">
          <LifeBuoy size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy-800">
            Grievance redressal for learners
          </p>
          <p className="text-sm text-slate-500 mt-0.5 break-all">
            {admissionEmails.grievances}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={`tel:${grievanceHelpline.tel}`}
            className="glass-btn text-navy-800 px-5 py-2.5 text-sm tabular-nums"
          >
            <Phone size={14} /> {grievanceHelpline.phone}
          </a>
          <Link
            to="/students/affairs"
            className="glass-btn text-navy-800 px-5 py-2.5 text-sm"
          >
            Grievance cell <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Map */}
      <h2 className="text-xl font-bold text-navy-800 mb-5">Find us</h2>
      <div className="glass-strong rounded-[26px] p-2 mb-10">
        <iframe
          title="B.S. Abdur Rahman Crescent Institute — campus location"
          src={mapEmbedUrl}
          className="w-full h-72 sm:h-96 rounded-[20px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Portals */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href={admissionLinks.newRegistration}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 block"
        >
          <p className="font-semibold text-navy-800 mb-1">New Registration</p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Create an applicant account <ExternalLink size={13} />
          </p>
        </a>
        <a
          href={admissionLinks.applicantLogin}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 block"
        >
          <p className="font-semibold text-navy-800 mb-1">Applicant Login</p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Continue an application <ExternalLink size={13} />
          </p>
        </a>
        <a
          href={admissionLinks.lmsLogin}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 block"
        >
          <p className="font-semibold text-navy-800 mb-1">LMS Login</p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            For enrolled learners <ExternalLink size={13} />
          </p>
        </a>
      </div>
    </section>
  )
}
