import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Send, Loader2 } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'

// Enquiries are emailed to CDOE support through FormSubmit (formsubmit.co), the
// same service the complaint form uses. FormSubmit needs a one-time activation:
// the first submission sends an "Activate Form" link to ENQUIRY_INBOX, and
// nothing is delivered until someone on that inbox clicks it.
const ENQUIRY_INBOX = 'cdoesupport@crescent.education'
const ENQUIRY_ENDPOINT = `https://formsubmit.co/ajax/${ENQUIRY_INBOX}`

export default function EnquireNow() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New enquiry from ${form.name.trim() || 'the website'}`,
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
          Name: form.name,
          Phone: form.phone,
          Email: form.email,
          Message: form.message,
        }),
      })
      const result = await res.json().catch(() => ({}))

      // FormSubmit reports success as the string "true".
      if (!res.ok || String(result.success) !== 'true') {
        throw new Error(result.message || 'Failed to send enquiry')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setOpen(false)
        setForm({ name: '', phone: '', email: '', message: '' })
      }, 1800)
    } catch (err) {
      setError(
        'We could not send that just now. Please call MBA +91 97909 53750, MCA +91 94444 37309 or BA Islamic Studies +91 86675 30226, or email cdoesupport@crescent.education.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/*
        The enquiry tab. Its position is owned by SideTabs, which holds both this
        and the Notice tab on one rail — desktop: vertical tabs on the right edge;
        phones: pills at the bottom-left, clear of the hero copy and of the chat
        bubble in the bottom-right.
      */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseDown={createRipple}
        aria-label="Open enquiry form"
        className="btn-shine relative overflow-hidden text-white
                   font-semibold text-sm tracking-wide transition-all duration-350 ease-in-out
                   cursor-pointer px-4 py-2.5 rounded-full
                   sm:px-2 sm:py-4 sm:rounded-full sm:rounded-l-2xl sm:rounded-r-none
                   sm:[writing-mode:vertical-rl] sm:hover:pr-3"
        style={{
          background: 'linear-gradient(160deg, rgba(220,38,38,0.85), rgba(153,27,27,0.9))',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 8px 28px -6px rgba(153,27,27,0.55), inset 0 1px 0 0 rgba(255,255,255,0.15)',
        }}
      >
        Enquire Now
      </button>

      {/* Overlay + modal — portalled so it escapes the rail's stacking context */}
      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-[70] bg-navy-950/50 backdrop-blur-sm flex items-center justify-end sm:justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-sm rounded-[26px] overflow-hidden animate-fade-in-up"
          >
            {/* Header */}
            <div className="glass-dark text-white px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold leading-none">Quick Enquiry</p>
                <p className="text-xs text-white/60 mt-1">We'll get back to you shortly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close enquiry form"
                className="text-white/70 hover:text-white transition-colors duration-350"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form / success state */}
            <div className="p-5">
              {submitted ? (
                <div className="text-center py-6">
                  <p className="text-emerald-600 font-semibold mb-1">Thank you!</p>
                  <p className="text-sm text-slate-500">Your enquiry has been received.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full text-sm px-4 py-2.5 rounded-full glass outline-none
                               focus:ring-2 focus:ring-navy-800/20 transition-all duration-350 ease-in-out"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full text-sm px-4 py-2.5 rounded-full glass outline-none
                               focus:ring-2 focus:ring-navy-800/20 transition-all duration-350 ease-in-out"
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full text-sm px-4 py-2.5 rounded-full glass outline-none
                               focus:ring-2 focus:ring-navy-800/20 transition-all duration-350 ease-in-out"
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Which programme are you interested in?"
                    className="w-full text-sm px-4 py-2.5 rounded-2xl glass outline-none resize-none
                               focus:ring-2 focus:ring-navy-800/20 transition-all duration-350 ease-in-out"
                  />
                  {error && (
                    <p className="text-xs text-red-600 text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    onMouseDown={createRipple}
                    className="btn-shine glass-btn-solid w-full py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        Sending <Loader2 size={15} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Submit Enquiry <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>,
          document.body
        )}
    </>
  )
}
