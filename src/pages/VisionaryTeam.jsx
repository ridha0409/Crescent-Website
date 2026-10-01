import { useState } from 'react'
import { UserRound, ChevronDown } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import AboutLayout from '../components/AboutLayout.jsx'

// Photos are served from the institute's own site.
const IMG = `${import.meta.env.BASE_URL}img/visionary/`

const leaders = [
  {
    name: 'Alhaj Dr. B.S. Abdur Rahman',
    designation: 'Founder',
    photo: `${IMG}founder.jpg`,
    message: [
      'A visionary who always trusted that education can be the crucial factor in improving the socio economic status of people, went ahead in proving it by establishing many educational organizations for the poor and women. He Founded the Seethakathi Trust, Est. 1967 and All India Islamic Foundation (AIIF) Est. 1979 to ensure the poor and deprived are benefited in the form of education. A total of 12 Educational Institutions comprising of a leading Engineering University, a Women’s College, an Arabic college for men, 2 boys schools, 3 girls schools, a women nursing college, a teachers training institute, B.Ed college for women and 2 hospitals and orphanages in both urban and rural areas in the State of Tamil Nadu are his contribution to the society with the only motive of providing quality education to the poor.',
    ],
  },
  {
    name: 'Mr. BSA Arif Buhary Rahman',
    designation: 'President',
    photo: `${IMG}chancellor.jpg`,
    message: [
      'The educational institutions have a great responsibility of creating holistic human beings, who have learned enough skills to earn, life ethics and social responsibility. B. S. Abdur Rahman Crescent Institute of Science and Technology being in the education arena for more than three decades has been successful in creating graduates with good technical skills, exhibiting great leadership skills and socially responsible citizens. The limitation was that the university was not able to extend this expertise to people around the globe and people who could not attend regular classes. The initiative of offering programmes through online and distance mode will help us overcome this barrier and spread our wings across the globe. Apart from degree programmes, certification programmes of international standards will help students from rural India learn technologies that are of great demand globally.',
    ],
  },
  {
    name: 'Mrs. Qurrath Jameela',
    designation: 'Chancellor',
    photo: `${IMG}Chancellor%20(1).jpg`,
    message: [
      'B S Abdur Rahman Crescent Institute of Science and Technology, an Institute with a profound legacy is committed to futuristic education, women empowerment and societal upliftment. Embracing the digital age, this renowned institution aims to provide holistic education and ensure that students are armed with the expertise and skills needed to flourish in a dynamic global landscape.',
      'Our mission is to achieve comprehensive growth by fostering an inclusive environment where diversity is celebrated and sustained development is realized.',
    ],
  },
  {
    name: 'Mr. Abdul Qadir Abdul Rahman Buhari',
    designation: 'Pro-Chancellor',
    photo: `${IMG}prochancellor.png`,
    message: [
      'The physical presence of students in a classroom is not the only way to learn anymore. Online learning has created a disruption in today’s education revolution. More than the degree the skills of an individual is very imperative in the industry today. The change in technology every day necessitates unlearning and relearning to be an integral part of every learner. The Online and Distance education programmes are a boon to the people who would upskill and always be relevant in the Industry. The sharing of knowledge has become global. This gives the learner an edge to be a global competitor. The Online and distance education of BSACIST will be a big player in creating employable graduates and also help in upgrading their skills.',
    ],
  },
  {
    name: 'Dr. A. Peer Mohamed',
    designation: 'Vice-Chancellor i/c',
    photo: `${IMG}VC-1.jpg`,
    message: [
      'An educationist for more than three decades, I believe that there is a big need for adapting to new technologies. The Online Distance education programme is an advantage to the learners both to upgrade their skill set and also to improve the qualification. This enhances the chances of better employment opportunities. This also gives a greater flexibility of learning whenever you can and wherever you are. The online and distance education courses at BSAUCIST are tailored to cater to people who are willing to upgrade their skills and seek better employment and also for people who are more willing to increase their academic qualification.',
    ],
  },
  {
    name: 'Dr. N. Raja Hussain',
    designation: 'Registrar',
    photo: `${IMG}additional-registrar.jpg`,
    message: [
      'The introduction of flexible learning technologies, the online education market is expected to grow multifold in the next few years. Adapting to the technological disruptions is very vital to all the educational institutions. The foresight of the institution in starting the online and distance education department is an exemplary achievement. The strength of the leading team and faculty are important in making all new initiatives a success. BSAUCIST has unarguably the best team and leaders which will make learning a great experience. The mentoring skills of our faculty would help every learner to have a unique experience while upgrading their qualifications and improving their knowledge.',
    ],
  },
]

function Portrait({ photo, name }) {
  const [failed, setFailed] = useState(false)

  if (!photo || failed) {
    return (
      <div className="w-full aspect-[4/5] rounded-[18px] bg-navy-50 flex items-center justify-center">
        <UserRound size={48} className="text-navy-200" />
      </div>
    )
  }

  return (
    <img
      src={photo}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full aspect-[4/5] object-cover object-top rounded-[18px]"
    />
  )
}

function LeaderRow({ leader, index }) {
  const flipped = index % 2 === 1
  const [open, setOpen] = useState(false)
  // every message here runs well past four lines, but guard anyway so a short
  // one does not get a pointless toggle
  const clampable = leader.message.join(' ').length > 320

  return (
    <article className="glass-strong rounded-[26px] p-5 sm:p-7">
      {/* one grid-cols class only — two conflicting ones would fight in the
          cascade and the wrong column would win */}
      <div
        className={`grid gap-6 sm:gap-8 items-start ${
          flipped ? 'sm:grid-cols-[1fr_200px]' : 'sm:grid-cols-[200px_1fr]'
        }`}
      >
        <div className={flipped ? 'sm:order-2' : ''}>
          <Portrait photo={leader.photo} name={leader.name} />
        </div>

        <div className={`min-w-0 ${flipped ? 'sm:order-1' : ''}`}>
          <p className="text-[11px] font-semibold text-red-700 uppercase tracking-[0.15em]">
            {leader.designation}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mt-2 leading-tight">
            {leader.name}
          </h2>
          <span className="block w-12 h-[3px] bg-gold rounded-full mt-4" />

          {open ? (
            <div className="mt-5 space-y-3.5">
              {leader.message.map((p, i) => (
                <p key={i} className="text-sm text-slate-600 leading-[1.8] max-w-[68ch]">
                  {p}
                </p>
              ))}
            </div>
          ) : (
            /* clamped to 4 lines — written as explicit properties so it does not
               depend on the Tailwind line-clamp plugin being present */
            <p
              className="mt-5 text-sm text-slate-600 leading-[1.8] max-w-[68ch] overflow-hidden
                         [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]"
            >
              {leader.message.join(' ')}
            </p>
          )}

          {clampable && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-3 inline-flex items-center gap-1.5 min-h-[32px] py-1 text-xs font-semibold text-navy-800
                         hover:text-crimson-600 transition-colors duration-350"
            >
              {open ? 'Show Less' : 'Read More'}
              <ChevronDown
                size={14}
                className={`transition-transform duration-350 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default function VisionaryTeam() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="Visionary Team"
      lede="The leadership of B.S. Abdur Rahman Crescent Institute of Science and Technology — whose vision shapes our on-campus and online programmes alike."
      contentRef={ref}
      contentClassName={className}
    >
      <div className="space-y-6">
        {leaders.map((leader, i) => (
          <LeaderRow key={leader.name} leader={leader} index={i} />
        ))}
      </div>
    </AboutLayout>
  )
}
