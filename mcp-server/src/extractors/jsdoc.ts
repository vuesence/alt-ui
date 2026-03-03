import type { CssClassMetadata, CssVarMetadata, SlotMetadata } from "../types.js";

interface JsDocBlock {
  component: string;
  description: string;
  cssClasses: CssClassMetadata[];
  cssVars: CssVarMetadata[];
  slots: SlotMetadata[];
  examples: string[];
  dependencies: string[];
  expose: string[];
}

export function parseJsDoc(scriptContent: string): JsDocBlock {
  const result: JsDocBlock = {
    component: "",
    description: "",
    cssClasses: [],
    cssVars: [],
    slots: [],
    examples: [],
    dependencies: [],
    expose: [],
  };

  const jsdocMatch = scriptContent.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) return result;

  const block = jsdocMatch[1];
  const lines = block.split("\n").map(l => l.replace(/^\s*\*\s?/, "").trim());

  let currentTag = "";
  let currentContent = "";

  function flushTag() {
    if (currentTag === "example") {
      result.examples.push(currentContent.trim());
    }
    currentTag = "";
    currentContent = "";
  }

  for (const line of lines) {
    const tagMatch = line.match(/^@(\w+)\s*(.*)/);

    if (tagMatch) {
      flushTag();
      const [, tag, rest] = tagMatch;

      switch (tag) {
        case "component":
          result.component = rest.trim();
          break;
        case "description":
          result.description = rest.trim();
          break;
        case "cssclass": {
          const parts = rest.split(" - ");
          result.cssClasses.push({
            name: parts[0]?.trim() ?? "",
            description: parts.slice(1).join(" - ").trim(),
          });
          break;
        }
        case "cssvar": {
          const parts = rest.split(" - ");
          result.cssVars.push({
            name: parts[0]?.trim() ?? "",
            description: parts.slice(1).join(" - ").trim(),
          });
          break;
        }
        case "slot": {
          const parts = rest.split(" - ");
          result.slots.push({
            name: parts[0]?.trim() ?? "",
            description: parts.slice(1).join(" - ").trim(),
          });
          break;
        }
        case "expose":
          result.expose.push(rest.trim());
          break;
        case "dependency": {
          const dep = rest.split(" - ")[0]?.trim() ?? "";
          if (dep && dep !== "none") {
            result.dependencies.push(dep);
          }
          break;
        }
        case "example":
          currentTag = "example";
          currentContent = rest ? rest + "\n" : "";
          break;
        default:
          break;
      }
    } else if (currentTag === "example") {
      currentContent += line + "\n";
    } else if (!result.description && line && !line.startsWith("@")) {
      // Multi-line description
      result.description += (result.description ? " " : "") + line;
    }
  }

  flushTag();
  return result;
}
