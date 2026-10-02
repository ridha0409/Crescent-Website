import { Landmark } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/ma-islamic-studies.svg'

const maIslamicStudies = {
  icon: Landmark,
  title: 'Master of Arts in Islamic Studies',
  short: 'MA Islamic Studies',
  level: 'PG',
  detailsKey: 'ma-islamic-studies',
  tagline: 'MA Islamic Studies',
  image:
    programmeImage,
  duration: '2 Years',
  approvals: 'UGC',
  fees: 'As per notification',
  eligibility:
    'A Bachelor degree of minimum three years duration from a recognized university, in Islamic Studies or an allied discipline.',
  highlights: [
    'Advanced study of Islamic theology, jurisprudence and intellectual history',
    'Research methods and primary-source reading in the original languages',
    'Taught by the same faculty who teach the subject on campus',
    'UGC entitled degree',
  ],
}

export default function MAIslamicStudies() {
  return <ProgrammeDetail programme={maIslamicStudies} />
}
