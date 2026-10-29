import Hero from '../components/Hero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import LearnAnywhere from '../components/LearnAnywhere.jsx'
import Programmes from '../components/Programmes.jsx'
import About from '../components/About.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Facilities from '../components/Facilities.jsx'
import InaugurationCurtain from '../components/InaugurationCurtain.jsx'

export default function Home() {
  usePageMeta()  // the site-wide default title and description
  return (
    <>
      <InaugurationCurtain />
      <Hero />
      <LearnAnywhere />
      <Programmes />
      <About />
      <Testimonials />
      <Facilities />
    </>
  )
}
