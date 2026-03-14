"use client"

import { projects } from "@/lib/projectData"
import ProjectCard from "./ProjectCard"

export default function AllProjects() {
  return (
    <section className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212px]">

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tech={project.tech}
            repo={project.repo}
            projectLink={project.linkProject}
          />
        ))}
      </div>

    </section>
  )
}