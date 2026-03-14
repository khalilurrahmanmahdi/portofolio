"use client"

import {
  GithubIcon,
  ExternalLinkIcon,
  ArrowUpRightIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string | string[]
  tech: string[]
  repo: string
  projectLink: string
}

export default function ProjectCard({
  title,
  description,
  image,
  tech,
  repo,
  projectLink,
}: ProjectCardProps) {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const ctrls = useAnimation()

  const [hovered, setHovered] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const images = Array.isArray(image) ? image : [image]

  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    if (isInView) ctrls.start("visible")
  }, [ctrls, isInView])

  return (
    <>
      {/* CARD */}
      <motion.div
        ref={ref}
        onClick={() => setOpenModal(true)}
        animate={ctrls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: 48, scale: 0.97 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative z-10 h-[480px] w-full overflow-hidden rounded-[28px] cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >

        {/* IMAGE */}
        <motion.div
          animate={{
            y: hovered ? -12 : 0,
            scale: hovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="absolute right-0 w-[58%] md:w-[50%]"
          style={{ transformOrigin: "bottom right", bottom: "10%" }}
        >
          <div className="relative overflow-hidden rounded-xl">
            <Image
              width={1000}
              height={700}
              src={images[0]}
              alt={title}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </motion.div>

        {/* TEXT */}
        <div className="absolute left-6 top-[100px] max-w-[46%] lg:left-8 lg:top-[130px]">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            {title}
          </h3>

          <p className="mt-3 text-[13px] text-white/50 line-clamp-3">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <span
                key={i}
                className="rounded-full px-2.5 py-1 text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Link
              href={projectLink}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "rgba(129,140,248,0.8)" }}
            >
              View project
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl md:max-w-2xl rounded-2xl p-5 md:p-7"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
              }}
            >

              {/* CLOSE */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute right-4 top-4 text-white/60 hover:text-white"
              >
                ✕
              </button>

              {/* IMAGE SLIDER */}
              <div className="relative mb-4 overflow-hidden rounded-lg">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image
                      src={images[currentImage]}
                      alt={title}
                      width={1200}
                      height={700}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg"
                    >
                      ‹
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* TITLE */}
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                {description}
              </p>

              {/* TECH */}
              <div className="mt-5 flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[10px] md:text-xs rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <div className="mt-6 flex gap-3">
                <Link
                  href={repo}
                  target="_blank"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
                >
                  Github
                </Link>

                <Link
                  href={projectLink}
                  target="_blank"
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
                >
                  Live Project
                </Link>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}