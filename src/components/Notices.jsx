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
 * AUTO-SCROLL — a vertical ticker
 * ---------------------------------------------------------------------------
 * The panel body scrolls upward on its own, continuously, the way the
 * announcement marquee scrolls sideways. The list is rendered twice, one copy
 * under the other, and the track is moved with a transform; when the first
 * copy has scrolled fully out of view the offset wraps back by one copy's
 * height, so the loop is seamless.
 *
 * Because it does not rely on the list overflowing its box, it moves on every
 * screen — a tall desktop where all the entries fit would otherwise have
 * nothing to scroll and stand still.
 *
 * The visitor can still take over: hover, focus or a touch pauses it, the
 * wheel, a finger drag and the arrow keys move it by hand, and it picks itself
 * back up a moment after they stop. With reduced motion it never drifts on its
 * own, but the manual controls still work.
 */
const SCROLL_SPEED = 22 // pixels per second — slow enough to read while it moves
const RESUME_DELAY = 2500 // ms of stillness before it picks itself back up

function useTicker(enabled) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!enabled || !viewport || !track) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    let frame = 0
    let resumeTimer = 0
    let paused = Boolean(reduced)
    let last = 0
    let offset = 0
    let touchY = null

    // One copy's height — the track holds two identical copies.
    const loopHeight = () => track.scrollHeight / 2

    const render = () => {
      const h = loopHeight()
      if (h > 0) offset = ((offset % h) + h) % h
      track.style.transform = `translate3d(0, ${-offset}px, 0)`
    }

    const step = (now) => {
      frame = requestAnimationFrame(step)
      if (!last) last = now
      const elapsed = Math.min(now - last, 100) // no jump after a background tab
      last = now
      if (paused) return
      offset += (SCROLL_SPEED * elapsed) / 1000
      render()
    }

    const pause = () => {
      paused = true
      clearTimeout(resumeTimer)
    }

    const release = () => {
      clearTimeout(resumeTimer)
      if (reduced) return
      resumeTimer = setTimeout(() => {
        paused = false
      }, RESUME_DELAY)
    }

    const nudge = (delta) => {
      pause()
      offset += delta
      render()
      release()
    }

    const onWheel = (e) => {
      e.preventDefault() // the ticker moves instead of the page behind it
      nudge(e.deltaY)
    }
    const onTouchStart = (e) => {
      pause()
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (touchY === null) return
      e.preventDefault()
      const y = e.touches[0].clientY
      offset += touchY - y
      touchY = y
      render()
    }
    const onTouchEnd = () => {
      touchY = null
      release()
    }
    const onKey = (e) => {
      const delta = { ArrowDown: 40, ArrowUp: -40, PageDown: 200, PageUp: -200 }[e.key]
      if (delta === undefined) return
      e.preventDefault()
      nudge(delta)
    }

    viewport.addEventListener('mouseenter', pause)
    viewport.addEventListener('mouseleave', release)
    viewport.addEventListener('focusin', pause)
    viewport.addEventListener('focusout', release)
    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchmove', onTouchMove, { passive: false })
    viewport.addEventListener('touchend', onTouchEnd, { passive: true })
    viewport.addEventListener('touchcancel', onTouchEnd, { passive: true })
    viewport.addEventListener('keydown', onKey)

    render()
    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resumeTimer)
      viewport.removeEventListener('mouseenter', pause)
      viewport.removeEventListener('mouseleave', release)
      viewport.removeEventListener('focusin', pause)
      viewport.removeEventListener('focusout', release)
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('touchstart', onTouchStart)
      viewport.removeEventListener('touchmove', onTouchMove)
      viewport.removeEventListener('touchend', onTouchEnd)
      viewport.removeEventListener('touchcancel', onTouchEnd)
      viewport.removeEventListener('keydown', onKey)
    }
  }, [enabled])

  return { viewportRef, trackRef }
}

/* The panel's list. Rendered twice inside the ticker track. */
function EventsList({ exams, notices }) {
  return (
    <div className="p-5">
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
  )
}

export default function Notices() {
  const [open, setOpen] = useState(false)
  const count = upcomingCount()
  const { viewportRef, trackRef } = useTicker(open)

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

              {/* The ticker window: a fixed share of the screen on every
                  device, so the panel never runs off a short phone screen.
                  tabIndex lets keyboard users focus it and use the arrow keys. */}
              <div
                ref={viewportRef}
                tabIndex={0}
                aria-label="Examination dates and announcements, scrolling"
                className="relative overflow-hidden h-[min(28rem,calc(85dvh-5rem))] outline-none
                           focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-800/30"
                style={{ touchAction: 'none' }}
              >
                <div ref={trackRef} className="will-change-transform">
                  <EventsList exams={exams} notices={notices} />
                  {/* Second copy for the seamless loop — hidden from screen readers. */}
                  <div aria-hidden="true">
                    <EventsList exams={exams} notices={notices} />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
