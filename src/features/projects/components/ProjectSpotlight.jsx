const ProjectSpotlight = ({ project }) => {
  if (!project) {
    return null
  }

  return (
    <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:grid-cols-[1.5fr_1fr]">
      <div>
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-200/70">
          Featured project
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white">{project.title}</h2>
        <p className="max-w-2xl text-white/75">{project.description}</p>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-amber-200/20 bg-amber-100/10 px-3 py-1 text-sm text-amber-50"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default ProjectSpotlight
