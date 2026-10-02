import { GraduationCap, Users, BookOpenText, Scale, Landmark, Languages } from 'lucide-react'

// Card illustrations: each one shows the course name with objects from that
// subject. See src/assets/site/SOURCES.md.
import mbaImage from '../assets/site/mba.svg'
import mcaImage from '../assets/site/mca.svg'
import islamicStudiesImage from '../assets/site/ba-islamic-studies.svg'
import publicPolicyImage from '../assets/site/ba-public-policy.svg'
import maIslamicImage from '../assets/site/ma-islamic-studies.svg'
import englishImage from '../assets/site/ba-english.svg'

// Single source of truth for every programme on the site.
// `level` drives the UG / PG filtered listing pages + the navbar dropdown.
// `featured` picks the three shown on the home page — the full list stays on
// /programmes behind "View All Programmes". Flip the flag here to change which
// three appear; no component needs touching.
export const programmes = [
  {
    icon: GraduationCap,
    title: 'Master of Business Administration',
    short: 'MBA',
    featured: true,
    path: '/programmes/mba',
    level: 'PG',
    image:
      mbaImage,
    duration: '2 Years',
    approvals: 'AICTE / UGC',
    fees: '₹ 40,000 / Semester',
  },
  {
    icon: Users,
    title: 'Master of Computer Applications',
    short: 'MCA',
    featured: true,
    path: '/programmes/mca',
    level: 'PG',
    image:
      mcaImage,
    duration: '2 Years',
    approvals: 'AICTE / UGC',
    fees: '₹ 30,000 / Semester',
  },
  {
    icon: BookOpenText,
    title: 'Bachelor of Arts in Islamic Studies',
    short: 'BA Islamic Studies',
    featured: true,
    path: '/programmes/ba-islamic-studies',
    level: 'UG',
    image:
      islamicStudiesImage,
    duration: '3 Years',
    approvals: 'UGC',
    fees: '₹ 15,000 / Year',
  },
  {
    icon: Scale,
    title: 'Bachelor of Arts in Public Policy',
    short: 'BA Public Policy',
    path: '/programmes/ba-public-policy',
    level: 'UG',
    image:
      publicPolicyImage,
    duration: '3 Years',
    approvals: 'UGC',
    // Same undergraduate fee structure as BA Islamic Studies — charged per
    // year, not per semester. See data/programmeDetails.js.
    fees: '₹ 15,000 / Year',
  },
  {
    icon: Languages,
    title: 'Bachelor of Arts in English',
    short: 'BA English',
    path: '/programmes/ba-english',
    level: 'UG',
    image:
      englishImage,
    duration: '3 Years',
    approvals: 'UGC',
    fees: '₹ 15,000 / Year',
  },
  {
    icon: Landmark,
    title: 'Master of Arts in Islamic Studies',
    short: 'MA Islamic Studies',
    path: '/programmes/ma-islamic-studies',
    level: 'PG',
    image:
      maIslamicImage,
    duration: '2 Years',
    approvals: 'UGC',
    fees: 'As per notification',
  },
]

export const featuredProgrammes = programmes.filter((p) => p.featured)
export const ugProgrammes = programmes.filter((p) => p.level === 'UG')
export const pgProgrammes = programmes.filter((p) => p.level === 'PG')
