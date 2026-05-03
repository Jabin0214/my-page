export function buildHeroFacts(hero, location) {
  return [
    { label: hero.factLabels.base, value: location },
    { label: hero.factLabels.focus, value: hero.factValues.focus },
    { label: hero.factLabels.style, value: hero.factValues.style },
  ]
}

export function getFeaturedProjects(projects, limit = 3) {
  return projects.slice(0, limit)
}

export function getExperienceHighlights(items, limit = 3) {
  return items.slice(0, limit)
}
