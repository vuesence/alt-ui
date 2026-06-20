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
  const topLevelEntries = splitTopLevel(body, ";");

  for (const rawEntry of topLevelEntries) {
    const entry = rawEntry.trim();
    if (!entry) {
      continue;
    }

    const commentMatch = entry.match(/\/\*\*([\s\S]*?)\*\//);
    const description = commentMatch
      ? commentMatch[1]
        .split("\n")
        .map(line => line.replace(/^\s*\*\s?/, "").trim())
        .filter(line => line && !line.startsWith("@default"))
        .join(" ")
      : "";

    const withoutComment = commentMatch
      ? entry.replace(commentMatch[0], "").trim()
      : entry;

    const propMatch = withoutComment.match(/^(\w+)(\?)?:\s*([\s\S]+)$/);
    if (!propMatch) {
      continue;
    }

    const [, name, optional, type] = propMatch;
    props.push({
      name,
      type: type.trim(),
      required: !optional,
      description,
    });
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

  const withDefaultsIndex = scriptContent.indexOf("withDefaults(");
  if (withDefaultsIndex === -1) {
    return defaults;
  }

  const openParenIndex = scriptContent.indexOf("(", withDefaultsIndex);
  const closeParenIndex = findMatchingBracket(
    scriptContent,
    openParenIndex,
    "(",
    ")",
  );
  if (openParenIndex === -1 || closeParenIndex === -1) {
    return defaults;
  }

  const argsBody = scriptContent.slice(openParenIndex + 1, closeParenIndex);
  const args = splitTopLevel(argsBody, ",");
  if (args.length < 2) {
    return defaults;
  }

  const defaultsArg = args.slice(1).join(",").trim();
  if (!defaultsArg.startsWith("{") || !defaultsArg.endsWith("}")) {
    return defaults;
  }

  const objectBody = defaultsArg.slice(1, -1);
  const entries = splitTopLevel(objectBody, ",");
  for (const entryRaw of entries) {
    const entry = entryRaw.trim();
    if (!entry) {
      continue;
    }

    const separatorIndex = entry.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1).trim();
    if (!key) {
      continue;
    }

    defaults[key] = value;
  }

  return defaults;
}

function splitTopLevel(input: string, separator: string): string[] {
  const parts: string[] = [];
  let buffer = "";
  let curlyDepth = 0;
  let squareDepth = 0;
  let parenDepth = 0;
  let angleDepth = 0;
  let stringQuote: "'" | "\"" | null = null;
  let escaped = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (stringQuote) {
      buffer += char;
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === stringQuote) {
        stringQuote = null;
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      stringQuote = char;
      buffer += char;
      continue;
    }

    if (char === "{") {
      curlyDepth += 1;
    } else if (char === "}") {
      curlyDepth -= 1;
    } else if (char === "[") {
      squareDepth += 1;
    } else if (char === "]") {
      squareDepth -= 1;
    } else if (char === "(") {
      parenDepth += 1;
    } else if (char === ")") {
      parenDepth -= 1;
    } else if (char === "<") {
      angleDepth += 1;
    } else if (char === ">") {
      angleDepth = Math.max(0, angleDepth - 1);
    }

    if (
      char === separator &&
      curlyDepth === 0 &&
      squareDepth === 0 &&
      parenDepth === 0 &&
      angleDepth === 0
    ) {
      parts.push(buffer);
      buffer = "";
      continue;
    }

    buffer += char;
  }

  if (buffer.trim()) {
    parts.push(buffer);
  }

  return parts;
}

function findMatchingBracket(
  input: string,
  startIndex: number,
  openBracket: string,
  closeBracket: string,
): number {
  if (startIndex < 0 || input[startIndex] !== openBracket) {
    return -1;
  }

  let depth = 1;
  for (let index = startIndex + 1; index < input.length; index += 1) {
    const char = input[index];
    if (char === openBracket) {
      depth += 1;
    } else if (char === closeBracket) {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}
