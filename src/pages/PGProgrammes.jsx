import useReveal from '../hooks/useReveal.js'
import { pgProgrammes } from '../data/programmes.js'
import ProgrammeGrid from '../components/ProgrammeGrid.jsx'
import ProgrammeCategorySidebar from '../components/ProgrammeCategorySidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function PGProgrammes() {
  const { ref, className } = useReveal()

  return (
    <section ref={ref} className={`container-xl py-10 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <ProgrammeCategorySidebar />

        <div className="flex-1 min-w-0">
          <PageHeader eyebrow="CDOE · Programmes" title="PG Programmes" lede="Postgraduate programmes offered at Crescent." className="mb-10" />

          <ProgrammeGrid items={pgProgrammes} />
        </div>
      </div>
    </section>
  )
}