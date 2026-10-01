import useReveal from '../hooks/useReveal.js'
import PageHeader from '../components/PageHeader.jsx'
import ProgrammeLevelSplit from '../components/ProgrammeLevelSplit.jsx'

export default function ProgrammesOffered() {
  const { ref, className } = useReveal()

  // Note: this page used to end with a "Who We Are" block that repeated the
  // About Us content word for word. It was removed — the About page is the one
  // place that story is told.
  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <PageHeader
        eyebrow="CDOE · Programmes"
        title="Programmes Offered"
        lede="Choose a category to explore the full list of programmes under it."
        align="center"
        className="mb-10"
      />

      <ProgrammeLevelSplit />
    </section>
  )
}
