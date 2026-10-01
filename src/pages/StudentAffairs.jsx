import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  UserRound,
  LogIn,
  ArrowRight,
  FilePenLine,
} from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import StudentsCornerSidebar from '../components/StudentsCornerSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import {
  studentLinks,
  grievanceCell,
  grievanceChannels,
  studentDocuments,
} from '../data/studentsCorner.js'
import { documentUrl } from '../data/documents.js'

/** The Nodal Officer's portrait, falling back to an icon if it fails to load. */
function NodalOfficerPhoto({ photo, name }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden glass ring-1 ring-white/70 shadow-card flex items-center justify-center text-navy-800 shrink-0">
      {photo && !failed ? (
        <img
          src={photo}
          alt={name}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <UserRound size={28} />
      )}
    </div>
  )
}

export default function StudentAffairs() {
  const { ref, className } = useReveal()
  const { nodalOfficer } = grievanceCell

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <StudentsCornerSidebar />

        <div className="flex-1 min-w-0">
          <PageHeader
            eyebrow="CDOE · Students Corner"
            title="Students Grievance Redressal Cell"
            lede="Every learner has a named officer to go to, and four ways to reach them. Academic grievances are redressed as quickly as the nature of the issue allows."
            className="mb-8"
          />

          {/* Nodal Officer */}
          <div className="glass-strong rounded-[24px] p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <NodalOfficerPhoto photo={nodalOfficer.photo} name={nodalOfficer.name} />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Nodal Officer
              </p>
              <h2 className="font-semibold text-navy-800">{nodalOfficer.name}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{nodalOfficer.designation}</p>
            </div>
            <a
              href={`tel:${grievanceCell.tel}`}
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-5 py-2.5 text-sm shrink-0 tabular-nums"
            >
              <Phone size={15} /> {grievanceCell.phone}
            </a>
          </div>

          {/* The official statement, quoted */}
          <blockquote className="glass rounded-2xl p-5 mb-10 border-l-4 border-crimson-600">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              &ldquo;{grievanceCell.statement}&rdquo;
            </p>
          </blockquote>

          {/* Four channels */}
          <h2 className="text-xl font-bold text-navy-800 mb-1">
            How to raise a grievance
          </h2>
          <p className="text-slate-500 text-sm mb-5">
            Use whichever channel suits you — all four reach the same officer.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {grievanceChannels.map(({ title, body, action }) => (
              <div key={title} className="glass-card p-5 flex flex-col">
                <h3 className="font-semibold text-navy-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{body}</p>

                {action?.mailto && (
                  <a
                    href={`mailto:${grievanceCell.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-crimson-600 hover:underline mt-4 break-all"
                  >
                    <Mail size={14} className="shrink-0" />
                    {action.label}
                  </a>
                )}

                {/* Routed internally — the form is a page on this site now. */}
                {action?.href === 'complaintForm' && (
                  <Link
                    to={studentLinks.complaintForm}
                    onMouseDown={createRipple}
                    className="glass-btn text-navy-800 px-5 py-2 text-sm mt-4 self-start"
                  >
                    {action.label} <FilePenLine size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Documents — the href is the bundled PDF itself, so a click opens
              it directly in a new tab. The heading is skipped entirely while
              the list is empty rather than leaving a bare "Documents" over
              nothing. */}
          {studentDocuments.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-navy-800 mb-5">Documents</h2>

              <div className="space-y-3 mb-10">
                {studentDocuments.map(({ title, description, doc }) => (
                  <a
                    key={title}
                    href={documentUrl(doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center text-crimson-600 shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-navy-800">{title}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{description}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 shrink-0 group-hover:text-navy-800 transition-colors duration-350"
                    />
                  </a>
                ))}
              </div>
            </>
          )}

          {/* LMS */}
          <div className="glass-strong rounded-[24px] p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-navy-800 shrink-0">
              <LogIn size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-navy-800">Learning Management System</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Course material, recorded lectures, assignments and results.
              </p>
            </div>
            <a
              href={studentLinks.lmsLogin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={createRipple}
              className="btn-shine glass-btn-solid px-5 py-2.5 text-sm shrink-0"
            >
              LMS Login <ArrowRight size={15} />
            </a>
          </div>

          {/* Contact */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <p className="flex items-start gap-3 text-sm text-slate-600">
              <Phone size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span>
                Grievance redressal for learners:{' '}
                <a
                  href={`tel:${grievanceCell.tel}`}
                  className="text-navy-800 font-medium hover:underline tabular-nums"
                >
                  {grievanceCell.phone}
                </a>
              </span>
            </p>

            <p className="flex items-start gap-3 text-sm text-slate-600">
              <Mail size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span className="break-all">
                Grievances:{' '}
                <a
                  href={`mailto:${grievanceCell.email}`}
                  className="text-navy-800 font-medium hover:underline"
                >
                  {grievanceCell.email}
                </a>
                <br />
                Student support:{' '}
                <a
                  href={`mailto:${grievanceCell.supportEmail}`}
                  className="text-navy-800 font-medium hover:underline"
                >
                  {grievanceCell.supportEmail}
                </a>
              </span>
            </p>

            <p className="flex items-start gap-3 text-sm text-slate-600">
              <MapPin size={16} className="text-crimson-600 shrink-0 mt-0.5" />
              <span>{grievanceCell.location}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
