import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import ApplyNow from './ApplyNow.jsx'
import crescentLogo from '../assets/logos/crescent-logo.png'
import { campus, admissionContacts, admissionEmails } from '../data/contact.js'

/*
 * Footer — deliberately compact.
 * Earlier this ran to four columns with a Portals list and a separate
 * Grievances block, which made it nearly a full screen tall on desktop and an
 * endless scroll on phones. It is now three columns: who and where, where to
 * go, and how to reach someone. Everything dropped from here is one click away
 * in the navigation.
 *
 * The brand block carries the Institute's own logo — the same file the navbar
 * uses. The lockup is navy and crimson artwork, which would disappear against
 * this crimson footer, so `brightness-0 invert` renders it as a clean white
 * mark instead of shipping a second colourway of the same file.
 */

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'How to apply', to: '/admission/how-to-apply' },
  { label: 'Project', to: '/project' },
  { label: 'Students Corner', to: '/students/affairs' },
  { label: 'Student Grievance', to: '/students/complaint-form' },
  { label: 'UGC Corner', to: '/ugc-corner' },
  { label: "FAQ's", to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const accreditations = ['UGC Entitled', 'AICTE Approved', 'Deemed to be University']

const footerBg = {
  background: 'linear-gradient(160deg, rgba(159,2,15,0.9), rgba(77,15,16,0.94))',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.25)',
  boxShadow: '0 20px 60px -12px rgba(77,15,16,0.55), inset 0 1px 0 0 rgba(255,255,255,0.15)',
}

const linkClass =
  'inline-flex items-center gap-2 min-h-[26px] hover:text-white transition-colors duration-350'

export default function Footer() {
  return (
    <footer
      id="footer"
      style={footerBg}
      // pb-28 on phones is clearance for the floating Events / Enquire pills,
      // which would otherwise sit on top of the last line of the footer.
      className="text-white pt-10 pb-28 sm:pb-5 mt-8 rounded-t-[36px]"
    >
      {/* Two columns on a tablet rather than three — three squeezed the
          contact column until the email address broke mid-word. */}
      <div className="container-xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Who and where */}
        <div>
          <Link to="/" className="inline-block">
            <img
              src={crescentLogo}
              alt="B.S. Abdur Rahman Crescent Institute of Science &amp; Technology"
              className="h-11 w-auto object-contain brightness-0 invert"
            />
          </Link>

          <p className="text-xs text-white/70 mt-2">
            {campus.centre}
          </p>

          <p className="flex items-start gap-2 text-xs text-white/80 leading-relaxed mt-3">
            <MapPin size={13} className="shrink-0 mt-0.5" />
            <span>{campus.addressLines.join(', ')}</span>
          </p>

          <ApplyNow className="!px-5 !py-2 text-xs mt-4" icon="external" />
        </div>

        {/* Where to go */}
        <div>
          <p className="text-white font-semibold mb-2 text-sm">Quick Links</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-white/85">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* How to reach someone */}
        <div>
          <p className="text-white font-semibold mb-2 text-sm">Get in touch</p>
          <ul className="space-y-1 text-sm text-white/85">
            {admissionContacts.map(({ programme, phone, tel }) => (
              <li key={programme}>
                <a href={`tel:${tel}`} className={`${linkClass} tabular-nums`}>
                  <Phone size={13} className="shrink-0" />
                  {phone}
                  <span className="text-white/60">({programme})</span>
                </a>
              </li>
            ))}
            {/* The grievance helpline is deliberately not repeated here — it
                lives on the Contact page and on the Student Grievance form,
                both one click away in Quick Links above. */}
            <li>
              <a
                href={`mailto:${admissionEmails.enquiry}`}
                className={`${linkClass} break-words`}
              >
                <Mail size={13} className="shrink-0" />
                {admissionEmails.enquiry}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-xl flex flex-wrap items-center justify-between gap-3 border-t border-white/15 mt-7 pt-4">
        <p className="text-xs text-white/75">
          © {new Date().getFullYear()} B.S. Abdur Rahman Crescent Institute of Science
          &amp; Technology
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/90">
          {accreditations.map((item) => (
            <span key={item} className="px-2.5 py-1 rounded-full glass">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
