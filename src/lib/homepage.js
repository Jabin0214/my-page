export function getFeaturedProjects(projects, limit = 3) {
  return projects.slice(0, limit)
}

export function getExperienceHighlights(items, limit = 3) {
  return items.slice(0, limit)
}
