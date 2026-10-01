import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ChevronDown,
  CircleCheckBig,
  ExternalLink,
  Flag,
  Route,
  X,
} from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import { closeOtherLeftTabs, useCloseOnOtherLeftTab } from '../utils/leftRail.js'
import { admissionLinks, paymentModes, notificationHighlights } from '../data/admission.js'

/*
 * APPLY GUIDE — the red sticky tab on the left edge
 * ---------------------------------------------------------------------------
 * Sits directly under the Courses tab in the left rail (see LeftTabs.jsx): a
 * vertical tab on desktop that opens a flyout panel beside it, exactly like
 * the Courses tab above — same slide-and-scale sweep out of the left edge,
 * same outside-tap-to-close. It borrows the Enquire Now red so the two "do
 * something" tabs read as a pair.
 *
 * The panel draws the application process as a top-to-bottom flow chart, so an
 * applicant can see the whole journey — register, activate, log in, fill, pay
 * — before starting it. The flow is longer than the viewport, so the panel is
 * capped at 80vh and scrolls inside itself; the header stays put.
 *
 * Every step mirrors "How to apply" on the official CDOE site; the portal URLs
 * and the fee come from src/data/admission.js so there is one source of truth.
 */

const fee = notificationHighlights.applicationFee

const flow = [
  {
    kind: 'start',
    title: 'Choose your programme',
    body: 'MBA, MCA or BA Islamic Studies — check the eligibility in the Admission Notification before you begin.',
  },
  {
    title: 'New Registration',
    body: 'Create an account with a username, a password and a valid email ID.',
    link: { label: 'Register now', href: admissionLinks.newRegistration },
  },
  {
    title: 'Activate the account',
    body: 'An activation link is sent to that email address. Click it to activate the account before logging in.',
  },
  {
    title: 'Applicant Login',
    body: 'Sign in with the credentials you just created to reach your application dashboard.',
    link: { label: 'Applicant login', href: admissionLinks.applicantLogin },
  },
  {
    title: 'Fill the application form',
    body: 'Click Apply Here, complete every required field and upload your documents in the prescribed format and size.',
  },
  {
    title: 'View & Submit',
    body: 'Check everything under View & Submit Application, then confirm the application.',
    warn: 'Once submitted, the form can no longer be edited.',
  },
  {
    title: `Pay the application fee (${fee})`,
    body: `Select Payment, then Pay now. Payable by ${paymentModes.join(', ')}.`,
  },
  {
    kind: 'end',
    title: 'Application number generated',
    body: 'On successful payment your application number is generated and the confirmation can be downloaded.',
  },
]

function Connector() {
  return (
    <li className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="w-px h-4 bg-navy-200" />
      <ChevronDown size={14} className="text-navy-300 -mt-1" />
    </li>
  )
}

function Node({ step, index }) {
  const start = step.kind === 'start'
  const end = step.kind === 'end'

  return (
    <li
      className={`glass rounded-2xl p-3.5 flex gap-3 w-full ${
        end ? 'ring-1 ring-gold/60' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
          start || end ? 'bg-brand-navy text-white' : 'glass-strong text-navy-800'
        }`}
      >
        {start ? <Flag size={14} /> : end ? <CircleCheckBig size={15} /> : index}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-navy-900 leading-snug">{step.title}</p>
        <p className="text-[11px] text-slate-600 leading-relaxed mt-1">{step.body}</p>

        {step.warn && (
          <p className="mt-2 flex items-start gap-1.5 text-[11px] font-medium text-red-700">
            <AlertTriangle size={13} className="shrink-0 mt-px" />
            <span>{step.warn}</span>
          </p>
        )}

        {step.link && (
          <a
            href={step.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-navy-800 hover:text-navy-900 transition-colors duration-350"
          >
            {step.link.label} <ExternalLink size={12} />
          </a>
        )}
      </div>
    </li>
  )
}

export default function ApplyGuideTab() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const toggleOnClick = () => {
    setOpen((v) => {
      if (!v) closeOtherLeftTabs('apply-guide')
      return !v
    })
  }

  // Only one flyout in the rail at a time — Courses closes this, and vice versa.
  useCloseOnOtherLeftTab('apply-guide', () => setOpen(false))

  // Close on outside tap — mainly for touch devices, which have no hover.
  useEffect(() => {
    if (!open) return
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Steps are numbered 1..n, skipping the start and end markers.
  let n = 0

  return (
    <div
      ref={containerRef}
      /* pointer-events-none: this wrapper is an invisible box over the left edge
         of the page, so it must not swallow clicks meant for the content
         underneath. Children opt back in below. Position is owned by
         LeftTabs.jsx, which stacks this under the Courses tab. */
      className="hidden lg:flex relative items-center pointer-events-none"
    >
      <button
        type="button"
        onClick={toggleOnClick}
        onMouseDown={createRipple}
        aria-label="Open the apply guide"
        aria-expanded={open}
        /* The Enquire Now red, so the two action tabs read as a pair. */
        /* The label reads top-to-bottom: plain vertical-rl, no rotate-180. */
        className="btn-shine relative overflow-hidden pointer-events-auto text-white
                   inline-flex items-center justify-center
                   font-semibold text-sm tracking-wide px-2 py-4
                   rounded-r-2xl rounded-l-none
                   [writing-mode:vertical-rl]
                   transition-[padding] duration-500 ease-out hover:pl-3"
        style={{
          background: 'linear-gradient(160deg, rgba(220,38,38,0.85), rgba(153,27,27,0.9))',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 8px 28px -6px rgba(153,27,27,0.55), inset 0 1px 0 0 rgba(255,255,255,0.15)',
        }}
      >
        Apply Guide
      </button>

      {/* Flyout panel — same sweep as the Courses tab above */}
      <div
        role="dialog"
        aria-label="Apply guide"
        className={`absolute left-full top-1/2 -translate-y-1/2 ml-2
                    glass-reading rounded-[22px] w-[21rem] origin-left
                    max-h-[80vh] flex flex-col overflow-hidden
                    transition-all duration-500 ease-out
                    ${open
                      ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                      : 'opacity-0 -translate-x-3 scale-95 pointer-events-none'}`}
      >
        <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-brand-navy text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <Route size={17} className="shrink-0" />
            <div className="min-w-0">
              <p className="font-bold leading-none text-sm">Apply Guide</p>
              <p className="text-[11px] text-white/70 mt-1 truncate">
                The application process, start to finish
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the apply guide"
            className="text-white/70 hover:text-white transition-colors duration-350 shrink-0"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <ol className="flex flex-col items-stretch">
            {flow.map((step, i) => {
              if (!step.kind) n += 1
              return (
                <Fragment key={step.title}>
                  <Node step={step} index={n} />
                  {i < flow.length - 1 && <Connector />}
                </Fragment>
              )
            })}
          </ol>

          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={admissionLinks.newRegistration}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={createRipple}
              className="btn-shine glass-btn-gold px-3.5 py-2 text-[11px]"
            >
              Start the application <ExternalLink size={12} />
            </a>
            <Link
              to="/admission/how-to-apply"
              onClick={() => setOpen(false)}
              className="glass-btn px-3.5 py-2 text-[11px] text-navy-800"
            >
              Read the full guide
            </Link>
          </div>

          <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
            Steps follow the official CDOE "How to apply" process. Keep the email ID you
            register with — every admission update is sent to it.
          </p>
        </div>
      </div>
    </div>
  )
}
