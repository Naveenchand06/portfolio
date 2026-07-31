import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { useLenis } from '@/lib/useLenis'
import { isStatic } from '@/lib/flags'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Pipeline from './components/Pipeline'
import Domains from './components/Domains'
import Work from './components/Work'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(isStatic)
  useLenis()

  const onDone = useCallback(() => setReady(true), [])

  return (
    // reducedMotion="user" makes Framer honour the OS setting; the CSS
    // override in index.css only reaches CSS transitions, not JS animations.
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-ink">
        {!isStatic && <Preloader onDone={onDone} />}
        <Cursor />
        <Nav />

        <main>
          <Hero ready={ready} />
          <Marquee />
          <About />
          <Pipeline />
          <Domains />
          <Work />
          <Experience />
          <Stack />
        </main>

        <Contact />
      </div>
    </MotionConfig>
  )
}
