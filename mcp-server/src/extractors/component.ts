import { readFileSync, statSync } from "fs";
import { parse } from "@vue/compiler-sfc";
import { parseJsDoc } from "./jsdoc.js";
import { extractProps, extractDefaults } from "./props.js";
import { extractEvents } from "./events.js";
import { extractTemplateSlots } from "./slots.js";
import type { ComponentMetadata } from "../types.js";

const cache = new Map<string, { mtime: number; data: ComponentMetadata }>();

export function extractComponent(filePath: string, category: string): ComponentMetadata {
  const stat = statSync(filePath);
  const cached = cache.get(filePath);
  if (cached && cached.mtime === stat.mtimeMs) {
    return cached.data;
  }

  const content = readFileSync(filePath, "utf-8");
  const { descriptor } = parse(content);

  const scriptContent = descriptor.scriptSetup?.content ?? descriptor.script?.content ?? "";
  const templateContent = descriptor.template?.content ?? "";

  // Extract JSDoc metadata
  const jsdoc = parseJsDoc(scriptContent);

  // Extract props
  const props = extractProps(scriptContent);
  const defaults = extractDefaults(scriptContent);

  // Merge defaults into props
  for (const prop of props) {
    if (defaults[prop.name] && !prop.default) {
      prop.default = defaults[prop.name];
    }
  }

  // Extract events
  const events = extractEvents(scriptContent);

  // Extract slots from template, merge with JSDoc slots
  const templateSlots = extractTemplateSlots(templateContent);
  const jsdocSlotMap = new Map(jsdoc.slots.map(s => [s.name, s]));
  const mergedSlots = templateSlots.map(ts => {
    const jsdocSlot = jsdocSlotMap.get(ts.name);
    return {
      ...ts,
      description: jsdocSlot?.description ?? ts.description,
    };
  });
  // Add JSDoc-only slots not found in template
  for (const js of jsdoc.slots) {
    if (!mergedSlots.find(s => s.name === js.name)) {
      mergedSlots.push(js);
    }
  }

  // Derive component name from JSDoc or filename
  const fileBasename = filePath.split("/").pop()?.replace(".vue", "") ?? "";
  const componentName = jsdoc.component || fileBasename;

  const metadata: ComponentMetadata = {
    name: componentName,
    description: jsdoc.description,
    filePath: filePath.replace(/.*\/submodules\/alt-ui\//, ""),
    category,
    props,
    events,
    slots: mergedSlots,
    cssClasses: jsdoc.cssClasses,
    cssVars: jsdoc.cssVars,
    examples: jsdoc.examples,
    dependencies: jsdoc.dependencies,
    expose: jsdoc.expose,
  };

  cache.set(filePath, { mtime: stat.mtimeMs, data: metadata });
  return metadata;
}
