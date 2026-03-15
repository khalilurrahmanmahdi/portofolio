"use client"

import About from "@/components/about/About"
import Contact from "@/components/contact/Contact"
import Hero from "@/components/hero/Hero"
import Nav from "@/components/navbar/Nav"
import Preload from "@/components/preload/Preload"
import Projects from "@/components/projects/Projects"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState<boolean>(true)

  const handleComplete = () => {
    setLoadingPreloader(false)
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={true}>
        {loadingPreloader && (
          <Preload onComplete={handleComplete} />
        )}
      </AnimatePresence>

      {!loadingPreloader && (
        <>
          <Nav />
          <main data-scroll-container className="flex flex-col items-center">
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}
