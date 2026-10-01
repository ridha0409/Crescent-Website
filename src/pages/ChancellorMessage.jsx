import { useState } from 'react'
import { Quote, UserRound } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import AboutLayout from '../components/AboutLayout.jsx'

/*
 * CHANCELLOR'S MESSAGE — About Us › Chancellor's Message
 * ---------------------------------------------------------------------------
 * The message and the portrait are the ones the Institute publishes for the
 * Chancellor on its Visionary Team page:
 *   https://online.crescent-institute.edu.in/visionary-team
 */

const chancellor = {
  name: 'Mrs. Qurrath Jameela',
  designation: 'Chancellor',
  photo: `${import.meta.env.BASE_URL}img/visionary/Chancellor%20(1).jpg`,
  message: [
    'B S Abdur Rahman Crescent Institute of Science and Technology, an Institute with a profound legacy is committed to futuristic education, women empowerment and societal upliftment. Embracing the digital age, this renowned institution aims to provide holistic education and ensure that students are armed with the expertise and skills needed to flourish in a dynamic global landscape.',
    'Our mission is to achieve comprehensive growth by fostering an inclusive environment where diversity is celebrated and sustained development is realized.',
  ],
}

function Portrait({ photo, name }) {
  // A remote portrait can fail — fall back to the icon rather than a broken image.
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

export default function ChancellorMessage() {
  const { ref, className } = useReveal()

  return (
    <AboutLayout
      title="Chancellor's Message"
      lede="A note from the Chancellor of B.S. Abdur Rahman Crescent Institute of Science & Technology."
      contentRef={ref}
      contentClassName={className}
    >
      <article className="glass-strong rounded-[26px] p-5 sm:p-7">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-[200px_1fr] items-start">
          <Portrait photo={chancellor.photo} name={chancellor.name} />

          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-red-700 uppercase tracking-[0.15em]">
              {chancellor.designation}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mt-2 leading-tight">
              {chancellor.name}
            </h2>
            <span className="block w-12 h-[3px] bg-gold rounded-full mt-4" />

            <Quote className="text-gold mt-5" size={26} />

            <div className="mt-3 space-y-3.5">
              {chancellor.message.map((p, i) => (
                <p key={i} className="text-sm text-slate-600 leading-[1.8] max-w-[68ch]">
                  {p}
                </p>
              ))}
            </div>

            <p className="font-semibold text-navy-800 text-sm mt-6">{chancellor.name}</p>
            <p className="text-xs text-slate-500">
              {chancellor.designation}, B.S. Abdur Rahman Crescent Institute of Science
              &amp; Technology
            </p>
          </div>
        </div>
      </article>
    </AboutLayout>
  )
}
