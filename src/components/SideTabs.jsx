import { createPortal } from 'react-dom'
import EnquireNow from './EnquireNow.jsx'
import Notices from './Notices.jsx'

/*
 * SIDE TABS — the sticky rail that carries Events and Enquire Now.
 *
 * One container owns the position for both, so they stack cleanly instead of
 * each pinning itself to the middle of the viewport and overlapping. It is
 * portalled to <body> so no page's stacking context or overflow can clip it.
 *
 *   Desktop  vertical tabs on the right edge, Events above Enquire Now.
 *   Phones   pills side by side at the bottom-left — a vertical tab there sat
 *            over the hero headline, and the bottom-right is the chat bubble.
 */
export default function SideTabs() {
  return createPortal(
    <div
      className="floating-rail fixed z-[65] pointer-events-auto flex gap-2
                 safe-bottom left-4 flex-row items-end
                 max-w-[calc(100vw-6.5rem)]
                 sm:bottom-auto sm:left-auto sm:top-1/2 sm:right-0 sm:-translate-y-1/2
                 sm:max-w-none sm:flex-col sm:items-end sm:gap-1.5"
    >
      <Notices />
      <EnquireNow />
    </div>,
    document.body
  )
}
