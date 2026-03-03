import type { PropMetadata } from "../types.js";

/**
 * Extract props from Vue <script setup> content.
 * Handles both TypeScript interface + defineProps<T>() and runtime defineProps({}).
 */
export function extractProps(scriptContent: string): PropMetadata[] {
  // Try TypeScript interface pattern first
  const tsProps = extractTypescriptProps(scriptContent);
  if (tsProps.length > 0) return tsProps;

  // Fall back to runtime defineProps
  return extractRuntimeProps(scriptContent);
}

function extractTypescriptProps(content: string): PropMetadata[] {
  const props: PropMetadata[] = [];

  // Find defineProps<InterfaceName>() and get the interface name
  const definePropsMatch = content.match(/defineProps<(\w+)>/);
  if (!definePropsMatch) {
    // Try inline defineProps<{ ... }>()
    const inlineMatch = content.match(/defineProps<\{([\s\S]*?)\}>\s*\(\)/);
    if (inlineMatch) {
      return parseInterfaceBody(inlineMatch[1]);
    }
    return [];
  }

  const interfaceName = definePropsMatch[1];

  // Find the interface definition
  const interfaceRegex = new RegExp(
    `(?:export\\s+)?interface\\s+${interfaceName}\\s*(?:extends\\s+[\\w<>, ]+)?\\s*\\{([\\s\\S]*?)\\}`,
  );
  const interfaceMatch = content.match(interfaceRegex);
  if (!interfaceMatch) return [];

  return parseInterfaceBody(interfaceMatch[1]);
}

function parseInterfaceBody(body: string): PropMetadata[] {
  const props: PropMetadata[] = [];
  const lines = body.split("\n");

  let currentComment = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Collect JSDoc line comments
    if (trimmed.startsWith("/**") || trimmed.startsWith("*")) {
      const commentText = trimmed.replace(/^\/?\*+\s?/, "").replace(/\*\/$/, "").trim();
      if (commentText && !commentText.startsWith("@default")) {
        currentComment += (currentComment ? " " : "") + commentText;
      }
      continue;
    }

    // Parse property line: name?: Type;
    const propMatch = trimmed.match(/^(\w+)(\?)?:\s*(.+?);?\s*$/);
    if (propMatch) {
      const [, name, optional, type] = propMatch;
      props.push({
        name,
        type: type.replace(/;$/, "").trim(),
        required: !optional,
        description: currentComment,
      });
      currentComment = "";
      continue;
    }

    // Reset comment if we hit a non-comment, non-prop line
    if (trimmed && !trimmed.startsWith("//")) {
      currentComment = "";
    }
  }

  return props;
}

function extractRuntimeProps(content: string): PropMetadata[] {
  const props: PropMetadata[] = [];

  // Match defineProps({ ... })
  const definePropsMatch = content.match(/defineProps\(\{([\s\S]*?)\}\)/);
  if (!definePropsMatch) return [];

  const body = definePropsMatch[1];

  // Match each prop definition
  const propRegex = /(\w+):\s*\{([^}]*)\}/g;
  let match;

  while ((match = propRegex.exec(body)) !== null) {
    const [, name, config] = match;
    const typeMatch = config.match(/type:\s*(\w+(?:\s+as\s+[^,\n]+)?)/);
    const defaultMatch = config.match(/default:\s*([^,\n}]+)/);
    const requiredMatch = config.match(/required:\s*(true|false)/);

    props.push({
      name,
      type: typeMatch ? typeMatch[1].trim() : "unknown",
      required: requiredMatch ? requiredMatch[1] === "true" : false,
      default: defaultMatch ? defaultMatch[1].trim() : undefined,
      description: "",
    });
  }

  // Also handle simple type props: propName: Type
  const simpleRegex = /(\w+):\s*\{\s*type:\s*(\w+)\s*\}/g;
  // Already captured above

  return props;
}

/**
 * Extract withDefaults values
 */
export function extractDefaults(scriptContent: string): Record<string, string> {
  const defaults: Record<string, string> = {};

  const defaultsMatch = scriptContent.match(/withDefaults\s*\([\s\S]*?,\s*\{([\s\S]*?)\}\s*\)/);
  if (!defaultsMatch) return defaults;

  const body = defaultsMatch[1];
  const propRegex = /(\w+):\s*([^,\n}]+)/g;
  let match;

  while ((match = propRegex.exec(body)) !== null) {
    defaults[match[1]] = match[2].trim();
  }

  return defaults;
}
