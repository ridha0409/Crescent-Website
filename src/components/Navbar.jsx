import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, ExternalLink, Menu, X } from 'lucide-react'
import ApplyNow from './ApplyNow.jsx'
import crescentLogo from '../assets/logos/crescent-online-logo.png'
import { admissionLinks } from '../data/admission.js'
import { studentLinks } from '../data/studentsCorner.js'

// Menu structure mirrors the official CDOE site.
// An item with `to` is routed internally by React Router; an item with
// `href` + `external: true` is a real portal on another host and opens in a
// new tab. External URLs live in src/data/admission.js, never inline here.
const links = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/#about',
    to: '/about',
    dropdown: [
      { label: 'About Crescent', to: '/about' },
      { label: 'Visionary Team', to: '/about/visionary-team' },
      { label: 'Execution Team', to: '/about/execution-team' },
      {
        // The official site splits CDOE Team into three pages; here they are
        // three tabs on one page, addressed by ?tab=.
        label: 'CDOE Team',
        to: '/about/cdoe-team',
        submenu: [
          { label: 'Faculty', to: '/about/cdoe-team?tab=faculty' },
          { label: 'Technical Team', to: '/about/cdoe-team?tab=technical' },
          { label: 'Non-Teaching', to: '/about/cdoe-team?tab=non-teaching' },
        ],
      },
      { label: 'Facilities', to: '/about/facilities' },
    ],
  },
  {
    label: 'Programmes Offered',
    href: '/#programmes',
    to: '/programmes',
    dropdown: [
      {
        label: 'UG Programme',
        to: '/programmes/ug',
        submenu: [
          { label: 'BA Islamic Studies', to: '/programmes/ba-islamic-studies' },
          { label: 'BA Public Policy', to: '/programmes/ba-public-policy' },
          { label: 'BA English', to: '/programmes/ba-english' },
        ],
      },
      {
        label: 'PG Programme',
        to: '/programmes/pg',
        submenu: [
          { label: 'MBA', to: '/programmes/mba' },
          { label: 'MCA', to: '/programmes/mca' },
          { label: 'MA Islamic Studies', to: '/programmes/ma-islamic-studies' },
        ],
      },
    ],
  },
  {
    label: 'Admission',
    href: '/#admission',
    to: '/admission/how-to-apply',
    dropdown: [
      { label: 'How to apply', to: '/admission/how-to-apply' },
      {
        label: 'New Registration',
        href: admissionLinks.newRegistration,
        external: true,
      },
      {
        label: 'Applicant Login',
        href: admissionLinks.applicantLogin,
        external: true,
      },
      { label: 'Notification', to: '/admission/notification' },
    ],
  },
  {
    label: 'Students Corner',
    href: '/#students-corner',
    to: '/students/affairs',
    dropdown: [
      { label: 'LMS Login', href: studentLinks.lmsLogin, external: true },
      { label: 'Students Affairs', to: '/students/affairs' },
      { label: 'Complaint Form', to: '/students/complaint-form' },
    ],
  },
  {
    label: 'UGC Corner',
    href: '/#ugc-corner',
    to: '/ugc-corner',
    // Labels and order mirror the official UGC Corner menu; every slug maps to
    // a section in src/data/ugcCorner.js.
    dropdown: [
      { label: 'AICTE Approval', to: '/ugc-corner/approval' },
      { label: 'Degree Equivalence', to: '/ugc-corner/degree-equi' },
      { label: 'UGC Notification', to: '/ugc-corner/notification' },
      { label: 'Compliance', to: '/ugc-corner/compliance' },
      { label: 'UGC Applications', to: '/ugc-corner/application' },
      { label: 'Annual Reports', to: '/ugc-corner/annual' },
      { label: 'Admission List', to: '/ugc-corner/admission' },
    ],
  },
  { label: "FAQ's", href: '/#faq', to: '/faq' },
  { label: 'Contact', href: '/contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSub, setActiveSub] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  // While the mobile menu is open the floating rails (Events / Enquire pills
  // and the chat bubble) would sit on top of the last menu entries, so the
  // body carries a flag that hides them — see `body.nav-open` in index.css.
  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen)
    return () => document.body.classList.remove('nav-open')
  }, [mobileOpen])

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-5 lg:px-0">
      {/* Below lg the header supplies the gutter; from lg up the navbar lines
          up with the page content (and clears the side tabs). */}
      <div className="container-xl max-lg:!px-0">
        <div className="glass-strong rounded-[24px] px-4 sm:px-6 lg:px-4 xl:px-6 flex items-center gap-4 py-2.5">
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="B.S. Abdur Rahman Crescent Institute of Science & Technology — home"
          >
            <img
              src={crescentLogo}
              alt="Crescent Online — Centre for Distance and Online Education"
              width={1193}
              height={428}
              decoding="async"
              className="h-12 sm:h-14 lg:h-12 xl:h-16 w-auto object-contain object-left select-none"
            />
          </Link>

          <nav className="hidden lg:flex items-center ml-auto gap-2.5 xl:gap-7">
            {links.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setOpen(link.label)}
                onMouseLeave={() => {
                  if (link.dropdown) {
                    setOpen(false)
                    setActiveSub(null)
                  }
                }}
                /* Keyboard parity with the mouse: React's onFocus/onBlur are
                   focusin/focusout, so they fire for anything inside the
                   wrapper. Without these the dropdowns opened on hover only
                   and a keyboard user could never reach the sub-pages. */
                onFocus={() => link.dropdown && setOpen(link.label)}
                onBlur={(e) => {
                  if (link.dropdown && !e.currentTarget.contains(e.relatedTarget)) {
                    setOpen(false)
                    setActiveSub(null)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && link.dropdown) {
                    setOpen(false)
                    setActiveSub(null)
                  }
                }}
              >
                {link.to ? (
                  <Link
                    to={link.to}
                    aria-haspopup={link.dropdown ? 'true' : undefined}
                    aria-expanded={link.dropdown ? open === link.label : undefined}
                    className={`nav-link flex items-center gap-1 text-[13px] xl:text-sm font-medium text-slate-700 py-2 whitespace-nowrap ${open === link.label ? 'is-open' : ''}`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} />}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    aria-haspopup={link.dropdown ? 'true' : undefined}
                    aria-expanded={link.dropdown ? open === link.label : undefined}
                    className={`nav-link flex items-center gap-1 text-[13px] xl:text-sm font-medium text-slate-700 py-2 whitespace-nowrap ${open === link.label ? 'is-open' : ''}`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} />}
                  </a>
                )}

                {link.dropdown && open === link.label && (
                  <div className="absolute top-full left-0 pt-3 w-56 animate-fade-in-up">
                    <div className="glass-strong rounded-2xl py-2 shadow-glass-lg">
                      {link.dropdown.map((item) =>
                        item.submenu ? (
                          <div
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => setActiveSub(item.label)}
                            onFocus={() => setActiveSub(item.label)}
                          >
                            {item.to ? (
                              <Link
                                to={item.to}
                                className="flex items-center justify-between nav-drop-link px-4 py-2 text-sm text-slate-600 hover:bg-white/60 transition-colors duration-350"
                              >
                                {item.label}
                                <ChevronRight size={14} />
                              </Link>
                            ) : (
                              <div className="flex items-center justify-between nav-drop-link px-4 py-2 text-sm text-slate-600 hover:bg-white/60 transition-colors duration-350 cursor-default">
                                {item.label}
                                <ChevronRight size={14} />
                              </div>
                            )}

                            {activeSub === item.label && (
                              <div className="absolute top-0 left-full pl-2 w-52 animate-fade-in-up">
                                <div className="glass-strong rounded-2xl py-2 shadow-glass-lg">
                                  {item.submenu.map((sub) => (
                                    <Link
                                      key={sub.to}
                                      to={sub.to}
                                      className="block nav-drop-link px-4 py-2 text-sm text-slate-600 hover:bg-white/60 transition-colors duration-350"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : item.external ? (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 nav-drop-link px-4 py-2 text-sm text-slate-600 hover:bg-white/60 transition-colors duration-350"
                          >
                            {item.label}
                            <ExternalLink size={13} className="shrink-0 text-slate-400" />
                          </a>
                        ) : (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="block nav-drop-link px-4 py-2 text-sm text-slate-600 hover:bg-white/60 transition-colors duration-350"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="lg:hidden ml-auto -mr-1 grid h-11 w-11 place-items-center rounded-xl text-navy-800 transition-colors duration-350 hover:bg-white/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl px-5 py-4 space-y-3 animate-fade-in-up max-h-[min(75vh,calc(100dvh-9rem))] overflow-y-auto overscroll-contain">
            {links.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-sm font-medium text-slate-700 mb-1 block"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 mb-1">{link.label}</p>
                  )}
                  <div className="pl-3 space-y-2">
                    {link.dropdown.map((item) =>
                      item.submenu ? (
                        <div key={item.label}>
                          {item.to ? (
                            <Link
                              to={item.to}
                              className="text-sm text-slate-600 block"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <p className="text-sm text-slate-600">{item.label}</p>
                          )}
                          <div className="pl-3 space-y-1">
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                className="block text-sm text-slate-500 py-1"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-slate-500 py-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                          <ExternalLink size={12} className="shrink-0" />
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="block text-sm text-slate-500 py-1"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-sm font-medium text-slate-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className="block text-sm font-medium text-slate-700">
                  {link.label}
                </a>
              )
            )}
            <ApplyNow full className="!px-5 !py-2.5 text-sm" />
          </div>
        )}
      </div>
    </header>
  )
}