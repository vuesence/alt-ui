import type { EventMetadata } from "../types.js";

/**
 * Extract emitted events from defineEmits in Vue SFC script content.
 */
export function extractEvents(scriptContent: string): EventMetadata[] {
  const events: EventMetadata[] = [];

  // Pattern 1: defineEmits<{ eventName: [payload] }>()
  const typedEmitsMatch = scriptContent.match(/defineEmits<\{([\s\S]*?)\}>/);
  if (typedEmitsMatch) {
    const body = typedEmitsMatch[1];

    // Match: eventName: [PayloadType] or (e: "eventName", value: Type): void
    const callSignatureRegex = /\(\s*e:\s*"([^"]+)"(?:,\s*(\w+):\s*([^)]+))?\):\s*void/g;
    let match;
    while ((match = callSignatureRegex.exec(body)) !== null) {
      events.push({
        name: match[1],
        payload: match[3]?.trim() ?? "void",
        description: "",
      });
    }

    // Match: "event-name": [Type, Type]
    const tupleRegex = /"?([\w-]+)"?\s*:\s*\[([^\]]*)\]/g;
    while ((match = tupleRegex.exec(body)) !== null) {
      events.push({
        name: match[1],
        payload: match[2].trim() || "void",
        description: "",
      });
    }

    return events;
  }

  // Pattern 2: defineEmits(["event1", "event2"])
  const arrayEmitsMatch = scriptContent.match(/defineEmits\(\[([^\]]*)\]\)/);
  if (arrayEmitsMatch) {
    const eventNames = arrayEmitsMatch[1].match(/"([^"]+)"|'([^']+)'/g);
    if (eventNames) {
      for (const name of eventNames) {
        events.push({
          name: name.replace(/['"]/g, ""),
          payload: "unknown",
          description: "",
        });
      }
    }
  }

  // Check for defineModel
  const modelRegex = /defineModel<(\w+)>\s*\((?:"(\w+)")?\)/g;
  let modelMatch;
  while ((modelMatch = modelRegex.exec(scriptContent)) !== null) {
    const modelName = modelMatch[2] || "modelValue";
    events.push({
      name: `update:${modelName}`,
      payload: modelMatch[1],
      description: `v-model binding for ${modelName}`,
    });
  }

  return events;
}
