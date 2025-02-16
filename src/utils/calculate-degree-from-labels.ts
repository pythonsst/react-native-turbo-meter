export function calculateDegreeFromLabels(
  degree: number,
  labels: { name: string }[]
): number {
  return labels.length > 0 ? degree / labels.length : 0;
}
