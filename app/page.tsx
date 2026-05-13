import Hero from '@/components/Hero'
import About from '@/components/About'
import CaseStudy from '@/components/CaseStudy'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <CaseStudy />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
