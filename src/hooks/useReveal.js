import { useEffect, useRef, useState } from 'react'

// Adds a fade-in-on-scroll effect. Attach `ref` to a section and spread
// `className` (or merge it with your own) — becomes visible once the
// element enters the viewport. Purely visual, no effect on layout/logic.
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible, className: `reveal ${visible ? 'reveal-visible' : ''}` }
}
