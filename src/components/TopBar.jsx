import { Phone, Mail } from 'lucide-react'
import { primaryAdmissionPhone, admissionEmails, applyNowUrl } from '../data/admission.js'
import { studentLinks } from '../data/studentsCorner.js'

export default function TopBar() {
  return (
    <div className="glass-dark text-white text-xs sm:text-sm relative z-[60]">
      <div className="container-xl flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="hidden sm:inline text-white/70">Contact Admission :</span>

          {/* One number here by design — the programme-wise helplines are on
              the Contact and How to Apply pages. */}
          <a
            href={`tel:${primaryAdmissionPhone.tel}`}
            className="flex items-center gap-1.5 py-1.5 min-h-[32px] hover:text-crimson-300 transition-colors duration-350 tabular-nums"
          >
            <Phone size={13} /> {primaryAdmissionPhone.phone}
          </a>

          <a
            href={`mailto:${admissionEmails.enquiry}`}
            className="hidden md:flex items-center gap-1.5 py-1.5 min-h-[32px] hover:text-crimson-300 transition-colors duration-350"
          >
            <Mail size={13} /> {admissionEmails.enquiry}
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Apply Now — goes straight to the admission application form.
              The destination is applyNowUrl in src/data/admission.js, the same
              single source every other Apply CTA on the site reads. */}
          <a
            href={applyNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 min-h-[32px] flex items-center font-semibold text-amber-300 hover:text-amber-200 transition-colors duration-350"
          >
            Apply Now
          </a>
          <span className="text-white/30">|</span>
          <a
            href={studentLinks.lmsLogin}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 min-h-[32px] flex items-center hover:text-crimson-300 transition-colors duration-350"
          >
            LMS Login
          </a>
        </div>
      </div>
    </div>
  )
}
