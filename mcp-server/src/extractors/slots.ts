import type { SlotMetadata } from "../types.js";

/**
 * Extract slots from Vue template content.
 * Looks for <slot> elements and their name/props.
 */
export function extractTemplateSlots(templateContent: string): SlotMetadata[] {
  const slots: SlotMetadata[] = [];
  const seen = new Set<string>();

  const slotRegex = /<slot\s*([^>]*?)(?:\/>|>([\s\S]*?)<\/slot>)/g;
  let match;

  while ((match = slotRegex.exec(templateContent)) !== null) {
    const attrs = match[1];
    const nameMatch = attrs.match(/name="([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : "default";

    if (seen.has(name)) continue;
    seen.add(name);

    // Extract scoped slot props
    const propsMatches: string[] = [];
    const propRegex = /:(\w+)="[^"]+"/g;
    let propMatch;
    while ((propMatch = propRegex.exec(attrs)) !== null) {
      propsMatches.push(propMatch[1]);
    }

    slots.push({
      name,
      description: "",
      props: propsMatches.length > 0 ? propsMatches.join(", ") : undefined,
    });
  }

  return slots;
}
