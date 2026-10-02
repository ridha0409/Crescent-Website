import { Scale } from 'lucide-react'
import ProgrammeDetail from './ProgrammeDetail.jsx'
import programmeImage from '../assets/site/ba-public-policy.svg'

const baPublicPolicy = {
  icon: Scale,
  title: 'Bachelor of Arts in Public Policy',
  short: 'BA Public Policy',
  level: 'UG',
  detailsKey: 'ba-public-policy',
  tagline: 'BA Public Policy',
  image:
    programmeImage,
  duration: '3 Years',
  approvals: 'UGC',
  fees: '₹ 15,000 / Year',
  eligibility:
    'A pass in 10+2 (Higher Secondary) or its equivalent from a recognized board.',
  highlights: [
    'Grounding in governance, political economy and the Indian constitutional framework',
    'Policy analysis and evidence-based decision making',
    'Flexible, fully online learning format',
    'UGC entitled degree',
  ],
}

export default function BAPublicPolicy() {
  return <ProgrammeDetail programme={baPublicPolicy} />
}
