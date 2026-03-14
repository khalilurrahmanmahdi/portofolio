import AllProjects from "@/components/projects/AllProjects"

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-background pt-24">

      {/* Header */}
      <section className="mx-auto w-[90%] max-w-[1200px] text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          My Projects
        </h1>

        <p className="text-lg text-foreground/60 max-w-[700px] mx-auto">
          Berikut beberapa project yang pernah saya kerjakan,
          mulai dari website sistem informasi hingga aplikasi
          modern menggunakan teknologi terbaru.
        </p>
      </section>

      {/* Semua Project */}
      <AllProjects />

      {/* CTA */}
      <section className="text-center mt-24 pb-24">
        <p className="text-lg text-foreground/60 mb-6">
          Tertarik bekerja sama?
        </p>

        <a
          href="/#contact"
          className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-80 transition"
        >
          Contact Me
        </a>
      </section>

    </main>
  )
}