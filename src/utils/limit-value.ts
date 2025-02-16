export function limitValue(
  value: number,
  minValue: number,
  maxValue: number,
  allowedDecimals?: number
): number {
  let currentValue = !isNaN(value) ? value : minValue;
  if (allowedDecimals !== undefined && allowedDecimals > 0) {
    currentValue = parseFloat(
      currentValue.toFixed(Math.min(allowedDecimals, 4))
    );
  } else {
    currentValue = Math.floor(currentValue);
  }
  return Math.min(Math.max(currentValue, minValue), maxValue);
}
