import { Link } from 'react-router-dom'
import { createRipple } from '../utils/ripple.js'

const tabs = [
  { to: '/programmes/mba', label: 'MBA' },
  { to: '/programmes/mca', label: 'MCA' },
  { to: '/programmes/ba-islamic-studies', label: 'BA Islamic Studies' },
]

export default function ProgrammeQuickTabs() {
  return (
    <>
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          onMouseDown={createRipple}
          className="btn-shine glass-btn-solid text-sm tracking-wide px-2 py-4
                     rounded-l-2xl rounded-r-none [writing-mode:vertical-rl] hover:pr-3"
        >
          {tab.label}
        </Link>
      ))}
    </>
  )
}