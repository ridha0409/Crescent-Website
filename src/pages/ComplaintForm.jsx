import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Mail,
  Phone,
  Send,
} from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import StudentsCornerSidebar from '../components/StudentsCornerSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { grievanceCell } from '../data/studentsCorner.js'
import { programmes } from '../data/programmes.js'

/*
 * ONLINE COMPLAINT FORM — Students Corner › Students Affairs
 * ---------------------------------------------------------------------------
 * This used to be a link out to the Institute's own complaint page. It is now
 * a real form on this site, so a learner never leaves mid-grievance.
 *
 * HOW A SUBMISSION IS DELIVERED
 * Every complaint goes to CDOE support (COMPLAINT_INBOX). This is a static
 * front end with no server of its own, so the form posts the answers to
 * FormSubmit (formsubmit.co), which emails them to that inbox as a table with
 * the learner's address set as reply-to — the learner never leaves the page.
 *
 * FormSubmit needs a one-time activation: the very first submission sends a
 * confirmation link to COMPLAINT_INBOX, and nothing is delivered until someone
 * on that inbox clicks it. Until then (or if the request fails for any other
 * reason) the form falls back to the learner's own mail client, addressed to
 * the same inbox, so no complaint is ever lost. The success screen also offers
 * the whole text on the clipboard.
 *
 * WHEN A BACKEND EXISTS: replace the body of `deliver()` with the API call.
 * Everything else — validation, the reference number, the success screen —
 * stays exactly as it is.
 */

/** Where every complaint is sent. */
const COMPLAINT_INBOX = grievanceCell.supportEmail
const COMPLAINT_ENDPOINT = `https://formsubmit.co/ajax/${COMPLAINT_INBOX}`

const CATEGORIES = [
  'Academic — teaching, course material or classes',
  'Examination — results, revaluation or hall ticket',
  'Admission or registration',
  'Fees and payments',
  'LMS or technical access',
  'Certificates and documents',
  'Harassment or discrimination',
  'Other',
]

const EMPTY = {
  name: '',
  registerNo: '',
  programme: '',
  email: '',
  phone: '',
  category: '',
  subject: '',
  message: '',
  consent: false,
}

/** A short, human-readable reference: CDOE-<yymmdd>-<4 chars>. */
function makeReference() {
  const now = new Date()
  const stamp =
    String(now.getFullYear()).slice(2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `CDOE-${stamp}-${suffix}`
}

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!values.programme) errors.programme = 'Please select your programme.'

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }

  // Phone is optional, but if given it must be a plausible number.
  if (values.phone.trim() && !/^[+\d][\d\s-]{7,17}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a phone number of 8–18 digits, or leave it blank.'
  }

  if (!values.category) errors.category = 'Please choose the type of grievance.'
  if (!values.subject.trim()) errors.subject = 'Please give your grievance a subject.'

  if (values.message.trim().length < 30) {
    errors.message =
      'Please describe your grievance in at least 30 characters so it can be acted on.'
  }

  if (!values.consent) {
    errors.consent = 'Please confirm the details above are true to your knowledge.'
  }

  return errors
}

/** The plain-text body handed to the mail client / clipboard. */
function composeBody(values, reference) {
  return [
    `Reference: ${reference}`,
    '',
    `Name: ${values.name.trim()}`,
    `Register / Application No: ${values.registerNo.trim() || '—'}`,
    `Programme: ${values.programme}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || '—'}`,
    `Category: ${values.category}`,
    `Subject: ${values.subject.trim()}`,
    '',
    'Grievance',
    '--------',
    values.message.trim(),
    '',
    `Submitted on ${new Date().toLocaleString('en-IN')} via the CDOE online complaint form.`,
  ].join('\n')
}

/* ------------------------------------------------------------------ */
/* Field primitives                                                    */
/* ------------------------------------------------------------------ */

const fieldBase =
  'w-full rounded-xl bg-white/70 border px-4 py-2.5 text-sm text-navy-900 ' +
  'placeholder:text-slate-400 outline-none transition-colors duration-350 ' +
  'focus:bg-white focus:border-navy-500'

function Field({ id, label, error, required, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy-800 mb-1.5">
        {label}
        {required && <span className="text-crimson-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400 mt-1.5">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-crimson-600 mt-1.5">
          <AlertCircle size={13} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ComplaintForm() {
  const { ref, className } = useReveal()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const errorSummaryRef = useRef(null)

  const programmeOptions = useMemo(() => programmes.map((p) => p.short), [])

  const setField = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues((v) => ({ ...v, [name]: value }))
    // Clear a field's error as soon as the learner starts fixing it.
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
  }

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: setField(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `${fieldBase} ${errors[name] ? 'border-crimson-600' : 'border-white/70'}`,
  })

  /**
   * Deliver the complaint to COMPLAINT_INBOX. Resolves to 'sent' when it was
   * emailed directly, or 'mail-client' when it fell back to a mailto: link.
   * Swap the fetch for the real API when the grievance backend exists — the
   * rest of the page does not care how it is sent.
   */
  const deliver = async (reference, body) => {
    const subject = `[${reference}] Grievance — ${values.subject.trim()}`

    try {
      const response = await fetch(COMPLAINT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _replyto: values.email.trim(),
          _template: 'table',
          _captcha: 'false',
          Reference: reference,
          Name: values.name.trim(),
          'Register / Application No': values.registerNo.trim() || '—',
          Programme: values.programme,
          Email: values.email.trim(),
          Phone: values.phone.trim() || '—',
          Category: values.category,
          Subject: values.subject.trim(),
          Grievance: values.message.trim(),
        }),
      })
      const result = await response.json().catch(() => ({}))
      // FormSubmit reports success as the string "true".
      if (response.ok && String(result.success) === 'true') return 'sent'
    } catch {
      // Network failure — fall through to the mail client below.
    }

    window.location.href =
      `mailto:${COMPLAINT_INBOX}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
    return 'mail-client'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      // Move focus to the summary so a screen reader announces what is wrong.
      errorSummaryRef.current?.focus()
      return
    }

    const reference = makeReference()
    const body = composeBody(values, reference)
    setSending(true)
    const via = await deliver(reference, body)
    setSending(false)
    setSubmitted({ reference, body, via, replyTo: values.email.trim() })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(submitted.body)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <StudentsCornerSidebar />

        <div className="flex-1 min-w-0">
          <PageHeader
            eyebrow="CDOE · Students Corner"
            title="Online Complaint Form"
            lede="Raise an academic or administrative grievance with the Students Grievance Redressal Cell. Every field marked with an asterisk is required."
            className="mb-8"
          />

          {submitted ? (
            /* ---------------- Success ---------------- */
            <div className="glass-strong rounded-[24px] p-6 sm:p-8">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-emerald-600 mb-5">
                <CheckCircle2 size={26} />
              </div>

              {submitted.via === 'sent' ? (
                <>
                  <h2 className="text-xl font-bold text-navy-800 mb-2">
                    Your complaint has been submitted
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    It has been emailed to {COMPLAINT_INBOX}. Replies will come to{' '}
                    {submitted.replyTo}.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-navy-800 mb-2">
                    Your complaint is ready to send
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    It could not be sent from this page, so your mail application should have
                    opened with the complaint filled in and addressed to {COMPLAINT_INBOX} —
                    press send there to submit it.
                  </p>
                </>
              )}

              <div className="glass rounded-2xl p-4 mb-5">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Your reference number
                </p>
                <p className="text-lg font-bold text-navy-800 tracking-wide tabular-nums">
                  {submitted.reference}
                </p>
                <p className="text-xs text-slate-500 mt-1.5">
                  Quote this in any follow-up about the same grievance.
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {submitted.via === 'sent'
                  ? 'Keep a copy for your records, or email it again to '
                  : 'If nothing opened, copy the complaint below and email it to '}
                <a
                  href={`mailto:${COMPLAINT_INBOX}`}
                  className="text-crimson-600 font-medium hover:underline break-all"
                >
                  {COMPLAINT_INBOX}
                </a>
                .
              </p>

              <pre className="glass rounded-2xl p-4 text-xs text-slate-600 whitespace-pre-wrap break-words mb-5 max-h-72 overflow-y-auto">
                {submitted.body}
              </pre>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  onMouseDown={createRipple}
                  className="glass-btn text-navy-800 px-5 py-2.5 text-sm"
                >
                  <Copy size={15} /> {copied ? 'Copied' : 'Copy complaint'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(null)
                    setValues(EMPTY)
                    setErrors({})
                  }}
                  onMouseDown={createRipple}
                  className="glass-btn text-navy-800 px-5 py-2.5 text-sm"
                >
                  <ArrowLeft size={15} /> Raise another grievance
                </button>

                <Link
                  to="/students/affairs"
                  onMouseDown={createRipple}
                  className="btn-shine glass-btn-solid px-5 py-2.5 text-sm"
                >
                  Back to Students Affairs
                </Link>
              </div>
            </div>
          ) : (
            /* ---------------- Form ---------------- */
            <form onSubmit={handleSubmit} noValidate className="glass-strong rounded-[24px] p-5 sm:p-7">
              {/* Error summary — focused on a failed submit */}
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                aria-live="polite"
                className={errorCount ? 'mb-6 outline-none' : 'sr-only'}
              >
                {errorCount > 0 && (
                  <div className="glass rounded-2xl p-4 border-l-4 border-crimson-600">
                    <p className="flex items-center gap-2 text-sm font-semibold text-crimson-600">
                      <AlertCircle size={16} className="shrink-0" />
                      {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} your attention
                    </p>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field id="name" label="Full name" error={errors.name} required>
                  <input type="text" autoComplete="name" placeholder="As it appears on your records" {...inputProps('name')} />
                </Field>

                <Field
                  id="registerNo"
                  label="Register / Application number"
                  error={errors.registerNo}
                  hint="Leave blank if you have not been allotted one yet."
                >
                  <input type="text" placeholder="e.g. 24CDOE0123" {...inputProps('registerNo')} />
                </Field>

                <Field id="programme" label="Programme" error={errors.programme} required>
                  <select {...inputProps('programme')}>
                    <option value="">Select your programme</option>
                    {programmeOptions.map((short) => (
                      <option key={short} value={short}>
                        {short}
                      </option>
                    ))}
                    <option value="Not yet enrolled">Not yet enrolled</option>
                  </select>
                </Field>

                <Field id="email" label="Email address" error={errors.email} required>
                  <input type="email" autoComplete="email" placeholder="you@example.com" {...inputProps('email')} />
                </Field>

                <Field id="phone" label="Phone number" error={errors.phone} hint="Optional — helps the cell reach you faster.">
                  <input type="tel" autoComplete="tel" placeholder="+91 9XXXXXXXXX" {...inputProps('phone')} />
                </Field>

                <Field id="category" label="Type of grievance" error={errors.category} required>
                  <select {...inputProps('category')}>
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5 space-y-5">
                <Field id="subject" label="Subject" error={errors.subject} required>
                  <input type="text" placeholder="One line summarising the issue" {...inputProps('subject')} />
                </Field>

                <Field
                  id="message"
                  label="Describe your grievance"
                  error={errors.message}
                  required
                  hint={`Include dates, course codes and anyone you have already spoken to. ${values.message.trim().length}/30 characters minimum.`}
                >
                  <textarea rows={7} placeholder="Set out what happened, when, and what you would like done about it." {...inputProps('message')} />
                </Field>

                <div>
                  <label htmlFor="consent" className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={values.consent}
                      onChange={setField('consent')}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-300 accent-navy-800"
                    />
                    <span>
                      I confirm the details given above are true to the best of my knowledge, and
                      I consent to the grievance cell contacting me about this complaint.
                      <span className="text-crimson-600 ml-0.5">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="flex items-center gap-1.5 text-xs text-crimson-600 mt-1.5">
                      <AlertCircle size={13} className="shrink-0" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-7">
                <button
                  type="submit"
                  disabled={sending}
                  onMouseDown={createRipple}
                  className="btn-shine glass-btn-solid px-6 py-3 text-sm disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? 'Submitting…' : 'Submit grievance'} <Send size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY)
                    setErrors({})
                  }}
                  className="text-sm text-slate-500 hover:text-navy-800 transition-colors duration-350"
                >
                  Clear form
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Your complaint is emailed to {COMPLAINT_INBOX}. Your grievance is redressed as
                quickly as the nature of the issue allows.
              </p>
            </form>
          )}

          {/* Other ways to reach the cell */}
          <div className="glass rounded-2xl p-5 mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-sm font-semibold text-navy-800">Prefer to talk to someone?</p>
            <a
              href={`tel:${grievanceCell.tel}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350 tabular-nums"
            >
              <Phone size={14} /> {grievanceCell.phone}
            </a>
            <a
              href={`mailto:${grievanceCell.email}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350 break-all"
            >
              <Mail size={14} /> {grievanceCell.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
