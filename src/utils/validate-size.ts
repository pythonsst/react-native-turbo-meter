export function validateSize(
  current: number | undefined,
  original: number
): number {
  return current !== undefined && !isNaN(current)
    ? Math.floor(current)
    : original;
}
