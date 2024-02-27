export function addUnit(value: number | string, unit?: string) {
  if (!unit) return value;

  if (typeof value === "number") return `${value}${unit}`;
  if (typeof value === "string") {
    if (value.endsWith(unit)) return value;
    return `${value}${unit}`;
  }

  return value;
}
