// Utility function to check if a value can be converted to a number
export function isNumeric(value: string | number | undefined): boolean {
  if (value === undefined) {
    return false;
  }
  if (typeof value === "number") {
    return true;
  }
  return (
    !Number.isNaN(Number.parseFloat(String(value))) &&
    Number.isFinite(Number(value))
  );
}
