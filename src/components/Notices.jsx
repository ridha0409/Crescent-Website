import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bell, CalendarDays, X } from 'lucide-react'
import { createRipple } from '../utils/ripple.js'
import {
  examSchedule,
  generalNotices,
  isPast,
  upcomingCount,
  formatRange,
} from '../data/notices.js'

/*
 * EVENTS — the yellow sticky tab
 * ---------------------------------------------------------------------------
 * Sits directly above Enquire Now on the right edge and behaves exactly the
 * same way: a vertical tab on desktop, a pill at the bottom-left on phones,
 * opening a panel. The colour is the marquee yellow, so the two tabs read as a
 * pair rather than as two unrelated widgets.
 *
 * The panel's job is exam dates. Content lives in src/data/notices.js.
 *
 * NOTE: every entry in that file is currently a placeholder and renders a
 * "SAMPLE" badge until the real date replaces it.
 */

function Badge() {
  return (
    <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[9px] font-extrabold tracking-widest uppercase">
      Sample
    </span>
  )
}

function ExamRow({ entry }) {
  const past = isPast(entry)

  return (
    <li
      className={`glass rounded-2xl p-4 flex gap-3 ${past ? 'opacity-55' : ''}`}
    >
      <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-navy-800 shrink-0">
        <CalendarDays size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-crimson-600">
            {entry.programme}
          </span>
          {entry.placeholder && <Badge />}
          {past && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Completed
            </span>
          )}
        </div>

        <p className="text-sm font-semibold text-navy-800 leading-snug mt-1">{entry.title}</p>

        <p className="text-sm font-bold text-navy-900 mt-1.5 tabular-nums">
          {formatRange(entry.date, entry.endDate)}
        </p>
        {entry.session && <p className="text-xs text-slate-500 mt-0.5">{entry.session}</p>}
        {entry.note && (
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{entry.note}</p>
        )}
      </div>
    </li>
  )
}

function NoticeRow({ entry }) {
  const past = isPast(entry)

  return (
    <li className={`glass rounded-2xl p-4 ${past ? 'opacity-55' : ''}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-bold uppercase tracking-wider text-crimson-600">
          {entry.tag}
        </span>
        {entry.placeholder && <Badge />}
      </div>
      <p className="text-sm font-semibold text-navy-800 leading-snug mt-1">{entry.title}</p>
      <p className="text-xs font-semibold text-navy-900 mt-1 tabular-nums">
        {formatRange(entry.date)}
      </p>
      {entry.body && (
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{entry.body}</p>
      )}
    </li>
  )
}

/*
 * AUTO-SCROLL
 * ---------------------------------------------------------------------------
 * The panel body drifts downward on its own so a visitor sees every dated
 * entry without reaching for the scrollbar — the same idea as the announcement
 * marquee, only vertical. It runs on requestAnimationFrame rather than a
 * setInterval so the speed is tied to real time, not to frame rate.
 *
 * It stops the moment the visitor takes over: hover, focus, a wheel, a touch
 * or a key all pause it, and it resumes a few seconds after they stop. At the
 * bottom it eases back to the top and starts again. Anyone who has asked for
 * reduced motion never gets it at all.
 */
const SCROLL_SPEED = 18 // pixels per second — slow enough to read while it moves
const RESUME_DELAY = 2500 // ms of stillness before it picks itself back up

function useAutoScroll(enabled) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (reduced?.matches) return

    let frame = 0
    let resumeTimer = 0
    let paused = false
    let last = 0
    // Carried as a float: at 18px/s a frame moves ~0.3px, and rounding every
    // frame to the integer scrollTop would floor it to zero and never move.
    let position = el.scrollTop

    const step = (now) => {
      frame = requestAnimationFrame(step)
      if (!last) last = now
      const elapsed = now - last
      last = now
      if (paused) return

      const limit = el.scrollHeight - el.clientHeight
      if (limit <= 1) return // nothing to scroll — the list fits

      position += (SCROLL_SPEED * elapsed) / 1000
      if (position >= limit) position = 0 // wrap back to the first entry
      el.scrollTop = position
    }

    const pause = () => {
      paused = true
      clearTimeout(resumeTimer)
    }

    // After a manual scroll the visitor's position is the new starting point,
    // otherwise the next frame would yank the panel back to where it was.
    const scheduleResume = () => {
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => {
        position = el.scrollTop
        paused = false
      }, RESUME_DELAY)
    }

    const release = () => {
      scheduleResume()
    }

    const interrupt = () => {
      pause()
      scheduleResume()
    }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', release)
    el.addEventListener('focusin', pause)
    el.addEventListener('focusout', release)
    el.addEventListener('wheel', interrupt, { passive: true })
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', release, { passive: true })
    el.addEventListener('keydown', interrupt)

    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resumeTimer)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', release)
      el.removeEventListener('focusin', pause)
      el.removeEventListener('focusout', release)
      el.removeEventListener('wheel', interrupt)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', release)
      el.removeEventListener('keydown', interrupt)
    }
  }, [enabled])

  return ref
}

export default function Notices() {
  const [open, setOpen] = useState(false)
  const count = upcomingCount()
  const scrollRef = useAutoScroll(open)

  // Escape closes; the page behind the panel must not scroll while it is up.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  // Soonest first, and anything already finished drops to the bottom.
  const exams = [...examSchedule].sort((a, b) => {
    if (isPast(a) !== isPast(b)) return isPast(a) ? 1 : -1
    return (a.date || '').localeCompare(b.date || '')
  })
  const notices = [...generalNotices].sort((a, b) => {
    if (isPast(a) !== isPast(b)) return isPast(a) ? 1 : -1
    return (a.date || '').localeCompare(b.date || '')
  })

  return (
    <>
      {/* The tab. Shape matches Enquire Now exactly; only the colour differs. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseDown={createRipple}
        aria-label={`Open events${count ? ` — ${count} upcoming` : ''}`}
        className="btn-shine relative overflow-hidden
                   font-semibold text-sm tracking-wide transition-all duration-350 ease-in-out
                   cursor-pointer px-4 py-2.5 rounded-full
                   sm:px-2 sm:py-4 sm:rounded-full sm:rounded-l-2xl sm:rounded-r-none
                   sm:[writing-mode:vertical-rl] sm:hover:pr-3"
        style={{
          // The announcement-marquee yellow. Navy text: white on amber fails contrast.
          color: '#0b2e6b',
          background: 'linear-gradient(160deg, #fcd34d, #f5a623)',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow: '0 8px 28px -6px rgba(245,166,35,0.6), inset 0 1px 0 0 rgba(255,255,255,0.5)',
        }}
      >
        Events
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] bg-navy-950/50 backdrop-blur-sm flex items-center justify-end sm:justify-center p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Events"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-md rounded-[26px] overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh]"
            >
              <div
                className="px-5 py-4 flex items-center justify-between shrink-0"
                style={{ background: 'linear-gradient(135deg, #fcd34d, #f5a623)' }}
              >
                <div className="flex items-center gap-2.5 text-navy-900">
                  <Bell size={18} className="shrink-0" />
                  <div>
                    <p className="font-bold leading-none">Events</p>
                    <p className="text-xs text-navy-900/70 mt-1">
                      Examination dates and announcements
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close events"
                  className="text-navy-900/70 hover:text-navy-900 transition-colors duration-350"
                >
                  <X size={18} />
                </button>
              </div>

              {/* tabIndex: the panel scrolls itself, so it has to be reachable
                  by keyboard for someone who cannot use a pointer. */}
              <div ref={scrollRef} tabIndex={0} className="p-5 overflow-y-auto">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Examination dates
                </p>
                {exams.length ? (
                  <ul className="space-y-3">
                    {exams.map((entry, i) => (
                      <ExamRow key={`${entry.programme}-${entry.date}-${i}`} entry={entry} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">
                    No examination dates have been published yet.
                  </p>
                )}

                {notices.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-6 mb-3">
                      Announcements
                    </p>
                    <ul className="space-y-3">
                      {notices.map((entry, i) => (
                        <NoticeRow key={`${entry.tag}-${entry.date}-${i}`} entry={entry} />
                      ))}
                    </ul>
                  </>
                )}

                <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
                  Dates are also published on the LMS. If a date here differs from the
                  LMS, the LMS is the one to follow.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
