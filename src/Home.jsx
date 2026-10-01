import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Programmes from "../components/Programmes";
import WhyChoose from "../components/WhyChoose";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Facilities from "../components/Facilities";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Programmes />
      <WhyChoose />
      <About />
      <Testimonials />
      <Facilities />
    </>
  );
}