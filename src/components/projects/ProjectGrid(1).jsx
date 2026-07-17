import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
