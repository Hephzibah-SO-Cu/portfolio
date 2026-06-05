import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Experience from "@/components/sections/Experience";
import TechMarquee from "@/components/sections/TechMarquee";
import BeyondCode from "@/components/sections/BeyondCode";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <TechMarquee />
      <Projects />
      <Experience />
      <BeyondCode />
      <Contact />
      <Footer />
    </main>
  );
}