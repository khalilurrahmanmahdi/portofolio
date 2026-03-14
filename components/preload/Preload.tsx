"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const wordVariants = {
  hidden: { y: "110%", skewY: 4 },
  visible: (i: number) => ({
    y: "0%",
    skewY: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (i: number) => ({
    y: "-110%",
    skewY: -3,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

const WORDS = ["HAI", "SELAMAT", "DATANG"]

export default function KhalilDevLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "welcome" | "exit">("loading")
  const [gone, setGone] = useState(false)
  const startRef = useRef<number | null>(null)
  const ctrl = useAnimation()

  const khalilCtrl = useAnimation()
  const devCtrl = useAnimation()

  useEffect(() => {
    ctrl.start("visible")
  }, [ctrl])

  useEffect(() => {
    const duration = 2500
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const tick = async (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const raw = Math.min((ts - startRef.current) / duration, 1)
      setProgress(Math.round(ease(raw) * 100))

      if (raw < 1) {
        requestAnimationFrame(tick)
      } else {
        await new Promise((r) => setTimeout(r, 400))
        await ctrl.start("exit")
        setPhase("welcome")

        khalilCtrl.start({
          y: "0%",
          skewY: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
        })
        devCtrl.start({
          y: "0%",
          skewY: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 },
        })

        // --- BAGIAN DURASI JEDA ---
        setTimeout(() => {
          setPhase("exit")
          setTimeout(() => {
            setGone(true)
            onComplete?.()
          }, 800)
        }, 5000) // <--- UBAH DI SINI: 5000 berarti 5 detik. Ganti ke 8000 jika mau lebih lama lagi.
      }
    }

    requestAnimationFrame(tick)
  }, [ctrl, khalilCtrl, devCtrl, onComplete])

  if (gone) return null

  const isLoading = phase === "loading"
  const isWelcome = phase === "welcome"
  const isExit = phase === "exit"

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: "#080808" }}
      animate={isExit ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* PHASE 1: LOADING */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        <div className="flex items-center justify-between px-8 pt-8 w-full">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/50">
            &lt;/&gt; CODING WITH KHALIL
          </div>
          <div className="font-mono text-[11px] text-white/40">{progress}%</div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 md:px-16">
          {WORDS.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={ctrl}
                className="text-white font-black leading-[0.85]"
                style={{
                  fontSize: "clamp(50px, 15vw, 180px)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between px-8 pb-8">
          <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
            Samarinda / ID
          </div>
          <div className="h-[60px] w-px bg-white/10 relative">
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-white"
              style={{ height: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* PHASE 2: WELCOME (KHALIL DEV) */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16"
        style={{
          opacity: isWelcome ? 1 : 0,
          pointerEvents: isWelcome ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isWelcome ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4"
        >
          Welcome
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", skewY: 4 }}
            animate={khalilCtrl}
            className="text-white font-black leading-none"
            style={{ fontSize: "clamp(60px, 12vw, 150px)" }}
          >
            KHALIL
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", skewY: 4 }}
            animate={devCtrl}
            className="text-white font-black leading-none"
            style={{ fontSize: "clamp(60px, 12vw, 150px)" }}
          >
            DEV
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isWelcome ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="h-px bg-white/20 w-full mt-6 origin-left"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isWelcome ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40"
        >
          Creative Fullstack Developer
        </motion.p>
      </div>
    </motion.div>
  )
}