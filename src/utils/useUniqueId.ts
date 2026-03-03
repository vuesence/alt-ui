/**
 * Generates unique IDs for component instances.
 * Useful for linking label/input pairs via id/for attributes.
 *
 * @example
 * const id = useUniqueId("input"); // "alt-input-1"
 * const id2 = useUniqueId("input"); // "alt-input-2"
 */
let counter = 0;

export function useUniqueId(prefix = "alt"): string {
  counter++;
  return `${prefix}-${counter}`;
}
