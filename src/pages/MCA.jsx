import { Users } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/mca.svg'

const mca = {
  icon: Users,
  title: 'Master of Computer Applications',
  short: 'MCA',
  level: 'PG',
  detailsKey: 'mca',
  tagline: 'MCA',
  image: programmeImage,
  duration: '2 Years',
  approvals: 'AICTE / UGC',
  fees: '₹ 30,000 / Semester',
  eligibility:
    "A bachelor's degree with Mathematics as one of the subjects at 10+2 level or graduation, from a recognized university.",
  highlights: [
    'Hands-on training in modern programming languages and frameworks',
    'Access to LMS and recorded lectures 24/7',
    'Experienced faculty from the computer science domain',
    'UGC entitled, AICTE approved degree',
  ],
}

export default function MCA() {
  return <ProgrammeDetail programme={mca} />
}
