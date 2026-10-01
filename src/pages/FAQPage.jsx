import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, Mail, Phone, ArrowRight } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import PageHeader from '../components/PageHeader.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import { faqs, faqSearchText } from '../data/faq.js'
import { admissionEmails, primaryAdmissionPhone } from '../data/admission.js'

/*
 * FAQ PAGE — /faq
 * ---------------------------------------------------------------------------
 * Every question the Institute publishes on its own FAQ page, in its order:
 *   https://online.crescent-institute.edu.in/faq
 *
 * The search box filters the same list rather than replacing it — with ten
 * questions a filter is a convenience, not navigation, so nothing is hidden
 * behind it and clearing the box restores the full set.
 */
export default function FAQPage() {
  const { ref, className } = useReveal()
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((item) => faqSearchText(item).includes(q))
  }, [query])

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="CDOE"
          title="Frequently Asked Questions"
          lede="Everything applicants most often ask about the online MBA and MCA programmes at the Centre for Distance and Online Education."
          align="center"
          className="mb-8"
        />

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the FAQs — fees, eligibility, exams…"
            aria-label="Search frequently asked questions"
            className="w-full glass rounded-full pl-11 pr-11 py-3 text-sm text-navy-800
                       placeholder:text-slate-400 outline-none
                       focus:ring-2 focus:ring-navy-800/20 transition-shadow duration-350"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400
                         hover:text-navy-800 transition-colors duration-350"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-4" aria-live="polite">
          {query
            ? `${visible.length} of ${faqs.length} questions match "${query}"`
            : `${faqs.length} questions`}
        </p>

        {/* No defaultOpenIndex — every question starts collapsed, so the page
            opens as a scannable list of questions rather than with one answer
            already pushing the rest down. */}
        <FaqAccordion items={visible} className="space-y-3" />

        {/* Still stuck — the two routes out of this page */}
        <div className="glass-strong rounded-[24px] p-6 mt-10">
          <h2 className="font-semibold text-navy-800 mb-1.5">Still have a question?</h2>
          <p className="text-sm text-slate-600 mb-5">
            The CDOE admissions team answers enquiries on every working day.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href={`tel:${primaryAdmissionPhone.tel}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350"
            >
              <Phone size={14} className="shrink-0" />
              {primaryAdmissionPhone.phone}
            </a>
            <a
              href={`mailto:${admissionEmails.enquiry}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-800 transition-colors duration-350"
            >
              <Mail size={14} className="shrink-0" />
              {admissionEmails.enquiry}
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/contact"
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-5 py-2 text-sm"
            >
              Contact us <ArrowRight size={14} />
            </Link>
            <Link
              to="/admission/how-to-apply"
              onMouseDown={createRipple}
              className="glass-btn text-navy-800 px-5 py-2 text-sm"
            >
              How to apply <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
