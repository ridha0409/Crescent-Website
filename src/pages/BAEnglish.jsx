import { Languages } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/ba-english.svg'

const baEnglish = {
  icon: Languages,
  title: 'Bachelor of Arts in English',
  short: 'BA English',
  level: 'UG',
  detailsKey: 'ba-english',
  tagline: 'BA English',
  image:
    programmeImage,
  duration: '3 Years',
  approvals: 'UGC',
  fees: '₹ 15,000 / Year',
  eligibility:
    'A pass in 10+2 (Higher Secondary) or its equivalent from a recognized board.',
  highlights: [
    'British, American and Indian writing in English across poetry, fiction and drama',
    'Literary criticism, theory and academic writing',
    'Flexible, fully online learning format',
    'UGC entitled degree',
  ],
}

export default function BAEnglish() {
  return <ProgrammeDetail programme={baEnglish} />
}
