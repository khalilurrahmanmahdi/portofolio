"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const stacks = [
  "/stack/laragon.svg",
  "/stack/mysql.svg",
  "/stack/javascript.svg",
  "/stack/css.svg",
  "/stack/html5.svg",
  "/stack/filament.svg",
  "/stack/tailwindcss.svg",
  "/stack/laravel.svg",
]

export default function StackOrbit() {

  const radius = 110

  return (
    <div className="relative flex h-[300px] w-[300px] items-center justify-center">

      {/* CENTER */}
      <div className="absolute flex h-[80px] w-[80px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <span className="text-xs text-white/70">Tech</span>
      </div>

      {/* ORBIT */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear"
        }}
        className="absolute h-full w-full"
      >

        {stacks.map((logo, i) => {

          const angle = (i / stacks.length) * 360

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(-${angle}deg)
                `
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
              >
                <Image
                  src={logo}
                  alt="stack"
                  width={36}
                  height={36}
                  className="brightness-0 invert opacity-80"
                />
              </motion.div>
            </div>
          )
        })}

      </motion.div>

    </div>
  )
}