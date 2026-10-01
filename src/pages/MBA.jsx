import { GraduationCap } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/mba.jpg'

const mba = {
  icon: GraduationCap,
  title: 'Master of Business Administration',
  short: 'MBA',
  level: 'PG',
  detailsKey: 'mba',
  tagline: 'MBA',
  image: programmeImage,
  duration: '2 Years',
  approvals: 'AICTE / UGC',
  fees: '₹ 40,000 / Semester',
  eligibility:
    "A bachelor's degree in any discipline from a recognized university with a minimum of 50% aggregate marks.",
  highlights: [
    'Live interactive online classes with recorded backup access',
    'Industry-relevant curriculum across finance, marketing, HR, and operations',
    'Dedicated placement support and career guidance',
    'UGC entitled, AICTE approved degree',
  ],
}

export default function MBA() {
  return <ProgrammeDetail programme={mba} />
}
