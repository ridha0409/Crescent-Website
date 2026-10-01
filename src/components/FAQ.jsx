import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { createRipple } from '../utils/ripple.js'
import FaqAccordion from './FaqAccordion.jsx'
import { featuredFaqs, faqs } from '../data/faq.js'

/*
 * FAQ TEASER — the block on the home page.
 * ---------------------------------------------------------------------------
 * Shows the first six of the Institute's published questions and links to the
 * full page for the rest. Questions and answers come from src/data/faq.js, the
 * same file /faq reads, so the two can never disagree.
 */
export default function FAQ() {
  const { ref, className } = useReveal()
  const remaining = faqs.length - featuredFaqs.length

  return (
    <section id="faq" ref={ref} className={`container-xl py-16 ${className}`}>
      <h2 className="text-3xl font-bold text-center text-navy-800 mb-10">
        Frequently Asked Questions
        <span className="block w-14 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </h2>

      <FaqAccordion items={featuredFaqs} className="grid lg:grid-cols-2 gap-4 items-start" />

      <div className="text-center mt-8">
        <Link to="/faq" onMouseDown={createRipple} className="glass-btn text-navy-800 px-6 py-2.5">
          View All FAQs
          {remaining > 0 && (
            <span className="text-slate-400 font-normal"> ({remaining} more)</span>
          )}
        </Link>
      </div>
    </section>
  )
}
