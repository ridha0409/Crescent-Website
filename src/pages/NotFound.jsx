import { Link } from 'react-router-dom'
import { Home, BookOpenText, FileText, LifeBuoy } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { createRipple } from '../utils/ripple.js'

/*
 * NOT FOUND — the catch-all page
 * ---------------------------------------------------------------------------
 * Without this, react-router matched nothing for an unknown URL and the app
 * rendered an empty shell: no heading, no way back, just the header and footer
 * around a blank strip. A mistyped or stale link now lands here instead, with
 * the four places people are actually trying to reach.
 *
 * Registered as <Route path="*"> inside the Layout route in App.jsx, so it
 * keeps the site chrome.
 */

const shortcuts = [
  {
    to: '/programmes',
    icon: BookOpenText,
    title: 'Programmes',
    desc: 'Every UGC-entitled UG and PG programme offered by CDOE.',
  },
  {
    to: '/admission/how-to-apply',
    icon: FileText,
    title: 'How to apply',
    desc: 'The application process from registration through to payment.',
  },
  {
    to: '/ugc-corner',
    icon: LifeBuoy,
    title: 'UGC Corner',
    desc: 'Approvals, compliance documents and annual reports.',
  },
  {
    to: '/contact',
    icon: Home,
    title: 'Contact',
    desc: 'Reach the admission help desk or the CDOE office.',
  },
]

export default function NotFound() {
  return (
    <section className="container-xl py-10">
      <div>
        <PageHeader
          eyebrow="Error 404"
          title="We can't find that page"
          lede="The link may be out of date, or the address may have been mistyped. Nothing has gone wrong with your application — try one of these instead."
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-3xl">
          {shortcuts.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              onMouseDown={createRipple}
              className="glass-card p-5 flex gap-4 items-start hover:bg-white/60 transition-colors duration-350 group"
            >
              <div className="w-11 h-11 rounded-full glass text-navy-800 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-900 transition-colors duration-350">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy-800">{title}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/"
          onMouseDown={createRipple}
          className="btn-shine glass-btn-gold inline-flex px-5 py-2.5 text-sm mt-8"
        >
          Back to the home page
        </Link>
      </div>
    </section>
  )
}
