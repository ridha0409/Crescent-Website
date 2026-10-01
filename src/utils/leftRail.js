import { useEffect, useRef } from 'react'

/*
 * LEFT RAIL — one flyout at a time
 * ---------------------------------------------------------------------------
 * Courses and Apply Guide sit one above the other on the left edge and each
 * opens a panel centred on its own tab, so two open panels would overlap.
 * Opening one therefore tells the other to close, over a DOM custom event —
 * no shared store, no prop drilling through the portal in LeftTabs.jsx.
 */

const EVENT = 'left-rail:open'

/** Call when a tab opens. `me` is the id of the tab that is opening. */
export function closeOtherLeftTabs(me) {
  document.dispatchEvent(new CustomEvent(EVENT, { detail: me }))
}

/** Close this tab whenever a different one in the rail opens. */
export function useCloseOnOtherLeftTab(me, close) {
  // Held in a ref so an inline arrow at the call site doesn't re-subscribe the
  // listener on every render.
  const latest = useRef(close)
  latest.current = close

  useEffect(() => {
    const onOpen = (e) => {
      if (e.detail !== me) latest.current()
    }
    document.addEventListener(EVENT, onOpen)
    return () => document.removeEventListener(EVENT, onOpen)
  }, [me])
}
