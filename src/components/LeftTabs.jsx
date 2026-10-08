import { createPortal } from 'react-dom'
import ApplyGuideTab from './ApplyGuideTab.jsx'

/*
 * LEFT TABS — the sticky rail that carries the Apply Guide.
 * (The Courses tab was removed at the client's request.)
 *
 * Mirrors SideTabs.jsx on the right edge: one container owns the position for
 * both tabs so they stack instead of each pinning itself to the middle of the
 * viewport and overlapping. Portalled to <body> so no page's stacking context
 * or overflow can clip it. Desktop only — the tab is hidden below lg.
 */
export default function LeftTabs() {
  return createPortal(
    <div className="floating-rail fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-1.5 pointer-events-none">
      <ApplyGuideTab />
    </div>,
    document.body
  )
}
