import Image from "next/image"
import { motion } from "framer-motion"

import AboutGlobeAnimate from "./AboutGlobeAnimate"
import AnimateBody from "./AnimateBody"
import AnimateHeading from "./AnimateHeading"
import AnimateParagraph from "./AnimateParagraph"
import AnimateTitle from "./AnimateTitle"
import Spotify from "./Spotify"

export default function About() {

  const stacks = [
    { name: "Laragon", logo: "/stack/laragon.svg" },
    { name: "MySQL", logo: "/stack/mysql.svg" },
    { name: "JavaScript", logo: "/stack/javascript.svg" },
    { name: "CSS", logo: "/stack/css.svg" },
    { name: "HTML5", logo: "/stack/html5.svg" },
    { name: "Filament", logo: "/stack/filament.svg" },
    { name: "TailwindCSS", logo: "/stack/tailwindcss.svg" },
    { name: "Laravel", logo: "/stack/laravel.svg" },
  ]

  return (
    <section
      id="about"
      className="relative mb-10 flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="mx-auto flex w-[90%] flex-col items-start justify-center lg:max-w-[1212.8px]">

        {/* TITLE */}
        <div className="mb-10 flex w-full items-center justify-between gap-x-2 md:mb-16">
          <AnimateTitle
            title={"About me"}
            className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
            wordSpace="mr-[14px]"
            charSpace="mr-[0.0001em]"
          />
          <AboutGlobeAnimate />
        </div>

        <div className="mx-auto flex w-full flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">

          {/* LEFT SIDE */}
          <div className="flex w-full flex-col gap-6 lg:max-w-[90%]">

            {/* STACK LOGOS */}
            <div className="grid grid-cols-4 gap-5 max-w-[320px] mb-6">

              {stacks.map((stack, i) => (
                <motion.div
                  key={i}

                  animate={{ y: [0, -10, 0] }}

                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}

                  whileHover={{
                    scale: 1.18,
                    y: -6
                  }}

                  className="group flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 transition-all"
                >

                  <Image
                    src={stack.logo}
                    alt={stack.name}
                    width={42}
                    height={42}
                    className="brightness-0 invert opacity-80 transition duration-300 group-hover:opacity-100"
                  />

                  {/* glow */}
                  <div className="absolute h-12 w-12 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-60 transition duration-300" />

                </motion.div>
              ))}

            </div>

            {/* PARAGRAPH */}
            <div className="flex flex-col gap-4 text-[18px] font-medium leading-relaxed tracking-wide md:gap-6 md:text-[20px] lg:text-base">

              <AnimateParagraph
                paragraph="Perjalanan saya di dunia teknologi dimulai dari rasa penasaran tentang bagaimana sebuah website bisa bekerja. Dari situ saya mulai belajar pemrograman web, khususnya menggunakan Laravel dan Tailwind CSS."
                delay={1.5}
              />

              <AnimateParagraph
                paragraph="Saat ini saya fokus mengembangkan berbagai aplikasi web dan sistem digital seperti sistem administrasi, manajemen dokumen, dan platform layanan online. Saya selalu tertarik untuk belajar teknologi baru dan menciptakan solusi digital yang bermanfaat."
                delay={1.8}
              />

              <AnimateParagraph
                paragraph="Bagi saya, membangun aplikasi bukan hanya soal kode, tetapi juga tentang bagaimana teknologi dapat membantu mempermudah pekerjaan dan kehidupan banyak orang."
                delay={2}
              />

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="mb-24 flex w-full flex-col gap-4 leading-relaxed tracking-wide sm:mb-32 md:mb-40 md:gap-6 lg:mb-16 lg:max-w-[90%]">

            <div className="flex flex-col gap-4 md:gap-3">
              <AnimateHeading title="Frontend Tools" delay={0.5} />

              <AnimateBody
                text="Saya menggunakan HTML, Tailwind CSS, dan JavaScript untuk membangun tampilan website yang modern, responsif, dan interaktif sehingga memberikan pengalaman pengguna yang nyaman."
                delay={1}
                className="text-sm"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-3">
              <AnimateHeading title="Backend Tools" delay={1.4} />

              <AnimateBody
                text="Untuk pengembangan sistem dan logika aplikasi, saya menggunakan Laravel sebagai framework utama untuk membangun backend yang terstruktur, aman, dan mudah dikembangkan."
                delay={1.5}
                className="text-sm"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-3">
              <AnimateHeading title="Database Tools" delay={1.6} />

              <AnimateBody
                text="Saya menggunakan MySQL untuk mengelola database aplikasi, mulai dari penyimpanan data hingga pengolahan informasi agar sistem berjalan stabil dan efisien."
                delay={2}
                className="text-sm"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-3">
              <AnimateHeading title="Design Tools" delay={2.2} />

              <AnimateBody
                text="Untuk merancang tampilan dan pengalaman pengguna sebelum proses pengembangan dimulai, saya menggunakan Figma untuk membuat wireframe dan desain antarmuka yang lebih terstruktur."
                delay={2.4}
                className="text-sm"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}