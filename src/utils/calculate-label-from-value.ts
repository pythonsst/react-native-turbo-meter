import type { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

export function calculateLabelFromValue(
  value: number,
  labels: { name: string }[],
  minValue: number,
  maxValue: number
): {
  [x: string]: ColorValue | undefined; name: string 
} {
  if (labels.length === 0) return { name: '' };
  const currentValue = (value - minValue) / (maxValue - minValue);
  const currentIndex = Math.round((labels.length - 1) * currentValue);
  return labels[currentIndex] ?? { name: '' };
}
