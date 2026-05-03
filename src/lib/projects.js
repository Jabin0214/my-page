export function buildProjectShowcase(projects, labelPrefix) {
  return projects.map((project, index) => ({
    ...project,
    sequenceLabel: `${labelPrefix} ${String(index + 1).padStart(2, '0')}`,
    mediaSide: index % 2 === 0 ? 'left' : 'right',
  }))
}
