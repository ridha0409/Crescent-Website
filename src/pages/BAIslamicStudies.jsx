import { BookOpenText } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/islamic-studies.jpg'

const baIslamicStudies = {
  icon: BookOpenText,
  title: 'Bachelor of Arts in Islamic Studies',
  short: 'BA Islamic Studies',
  level: 'UG',
  detailsKey: 'ba-islamic-studies',
  tagline: 'BA Islamic Studies',
  image: programmeImage,
  duration: '3 Years',
  approvals: 'UGC',
  fees: '₹ 15,000 / Year',
  eligibility: 'A pass in 10+2 (Higher Secondary) or its equivalent from a recognized board.',
  highlights: [
    'Structured curriculum covering Islamic history, theology, and jurisprudence',
    'Guidance from qualified subject-matter faculty',
    'Flexible, fully online learning format',
    'UGC entitled degree',
  ],
}

export default function BAIslamicStudies() {
  return <ProgrammeDetail programme={baIslamicStudies} />
}
